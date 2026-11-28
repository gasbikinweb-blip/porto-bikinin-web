# Olah aset Instagram @ruangmebelfurniture -> public/projects (foto WebP) & public/stories (video MP4 + poster).
# Pemakaian: python scripts/ruang-mebel-assets/build.py "assets ruang-mebel-furniture"
# Postingan dengan caption sama = satu produk. EXIF/GPS terbuang karena foto disimpan ulang.
import json
import os
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageOps

sys.path.insert(0, os.path.dirname(__file__))
from manifest import P  # noqa: E402

SRC = sys.argv[1]
PHOTO_OUT = 'public/projects'
VIDEO_OUT = 'public/stories'
HERE = os.path.dirname(__file__)
# Foto sampul pilihan (nomor foto 1-based) bila foto pertama hanya close-up
COVER = {
    'bufet-tv-pamela': 2,
    'nakas-tinggi-rak-buku': 5,
    'bufet-scandinavian': 2,
    'coffee-table-oval-fluted': 4,
}


def read_posts():
    posts = []
    for d in sorted(x for x in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, x))):
        p = os.path.join(SRC, d)
        t = open(os.path.join(p, 'caption.txt'), encoding='utf-8', errors='ignore').read()
        body = t.split('-' * 20, 1)[-1].strip().lstrip('-').strip()
        lines = [l.strip() for l in body.splitlines() if l.strip()]
        posts.append({
            'folder': d,
            'key': ' '.join(lines[:2])[:90].lower(),
            'body': body,
            'jpg': sorted(f for f in os.listdir(p) if f.endswith('.jpg')),
            'mp4': sorted(f for f in os.listdir(p) if f.endswith('.mp4')),
        })
    groups, order = {}, []
    for po in posts:
        if po['key'] not in groups:
            groups[po['key']] = []
            order.append(po['key'])
        groups[po['key']].append(po)
    return [groups[k] for k in order]


def parse(body):
    price = dim = mat = fin = None
    m = re.search(r'Rp\s?([\d.,]+)', body)
    if m:
        digits = re.sub(r'[^\d]', '', m.group(1))
        price = int(digits) if digits else None
    m = re.search(r'(\d{2,3}(?:[.,]\d)?)\s*(?:cm)?\s*[xX×]\s*(\d{2,3}(?:[.,]\d)?)\s*(?:cm)?\s*[xX×]\s*(\d{2,3}(?:[.,]\d)?)', body)
    if m:
        dim = f'{m.group(1)} x {m.group(2)} x {m.group(3)} cm'
    else:
        m = re.search(r'P[:.]?\s*(\d+)\s*x\s*L[:.]?\s*(\d+)\s*x\s*T[:.]?\s*(\d+)', body)
        if m:
            dim = f'{m.group(1)} x {m.group(2)} x {m.group(3)} cm'
    m = re.search(r'Material\s*:\s*([^\n]+)', body)
    if m:
        mat = m.group(1).strip()
    elif re.search(r'mango', body, re.I):
        mat = 'Kayu mango solid, anyaman rotan'
    elif re.search(r'walnut', body, re.I):
        mat = 'Veneer walnut, rangka besi'
    elif re.search(r'jati|teak', body, re.I):
        mat = 'Kayu Jati Solid'
    m = re.search(r'(?:Finishing|Warna)\s*[:;]\s*([^\n]+)', body)
    if m:
        fin = m.group(1).strip()
    return price, dim, mat, fin


def photo(job):
    src, dst = job
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    im.thumbnail((1400, 1400))
    im.save(dst, 'WEBP', quality=78, method=6)


def video(job):
    src, slug = job
    mp4 = os.path.join(VIDEO_OUT, f'{slug}.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-t', '20',
                    '-vf', 'scale=540:-2', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '30',
                    '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', mp4], check=True)
    poster = os.path.join(VIDEO_OUT, f'{slug}.jpg')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '1', '-i', mp4, '-frames:v', '1', poster], check=True)
    Image.open(poster).convert('RGB').save(poster[:-4] + '.webp', 'WEBP', quality=75)
    os.remove(poster)
    audio = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index',
                            '-of', 'csv=p=0', mp4], capture_output=True, text=True).stdout.strip()
    return slug, bool(audio)


groups = read_posts()
assert len(groups) == len(P), (len(groups), len(P))

products, photo_jobs, video_jobs = [], [], []
for meta, g in zip(P, groups):
    if meta is None:
        # Caption tanpa judul: gabung ke produk sebelumnya
        products[-1]['_posts'].extend(g)
        continue
    slug, name, cat = meta
    products.append({'slug': slug, 'name': name, 'cat': cat, '_posts': list(g)})

for d in (PHOTO_OUT, VIDEO_OUT):
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d)

out = []
for pr in products:
    posts = pr.pop('_posts')
    body = next((p['body'] for p in posts if len(p['body']) > 40), posts[0]['body'])
    price, dim, mat, fin = parse(body)
    os.makedirs(os.path.join(PHOTO_OUT, pr['slug']))
    n = 0
    for po in posts:
        for f in po['jpg']:
            n += 1
            photo_jobs.append((os.path.join(SRC, po['folder'], f),
                               os.path.join(PHOTO_OUT, pr['slug'], f'{n:02d}.webp')))
    c = COVER.get(pr['slug'])
    if c:
        jobs = [j for j in photo_jobs if f"/{pr['slug']}/" in j[1].replace(os.sep, '/')]
        a, b = jobs[0], jobs[c - 1]
        ia, ib = photo_jobs.index(a), photo_jobs.index(b)
        photo_jobs[ia], photo_jobs[ib] = (b[0], a[1]), (a[0], b[1])
    vids = [os.path.join(SRC, po['folder'], f) for po in posts for f in po['mp4']]
    vslugs = []
    for i, v in enumerate(vids):
        vs = pr['slug'] if i == 0 else f"{pr['slug']}-{i + 1}"
        video_jobs.append((v, vs))
        vslugs.append(vs)
    out.append({**pr, 'n': n, 'videos': vslugs, 'price': price, 'dim': dim, 'mat': mat, 'fin': fin,
                'date': posts[0]['folder'][:10]})

with ThreadPoolExecutor(8) as ex:
    list(ex.map(photo, photo_jobs))
with ThreadPoolExecutor(4) as ex:
    sound = dict(ex.map(video, video_jobs))
for o in out:
    o['sound'] = [sound[v] for v in o['videos']]

json.dump(out, open(os.path.join(HERE, 'out.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(out), 'produk,', len(photo_jobs), 'foto,', len(video_jobs), 'video')
