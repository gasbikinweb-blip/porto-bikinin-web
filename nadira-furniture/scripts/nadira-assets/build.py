import os, sys, json
from PIL import Image, ImageOps
sys.path.insert(0, os.path.dirname(__file__))
from manifest import P
src, out = sys.argv[1], sys.argv[2]
folders = sorted(d for d in os.listdir(src) if os.path.isdir(os.path.join(src, d)))
res = []
for code, slug, name, cat, files in P:
    m = [d for d in folders if d[11:].startswith(code)]
    assert len(m) == 1, (code, m)
    d = m[0]
    os.makedirs(os.path.join(out, slug), exist_ok=True)
    for i, f in enumerate(files):
        im = ImageOps.exif_transpose(Image.open(os.path.join(src, d, f + '.jpg'))).convert('RGB')
        im.thumbnail((1600, 1600))
        im.save(os.path.join(out, slug, f'{i+1:02d}.webp'), 'WEBP', quality=80, method=6)
    res.append({'slug': slug, 'name': name, 'cat': cat, 'n': len(files), 'date': d[:10], 'folder': d})
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'out.json'), 'w'), indent=1)
print(len(res), sum(r['n'] for r in res))
