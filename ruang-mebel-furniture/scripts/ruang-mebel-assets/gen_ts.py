# Tulis src/data/products.ts & src/data/stories.ts dari out.json (hasil build.py).
# Pemakaian: python scripts/ruang-mebel-assets/gen_ts.py
import json
import os
import re

HERE = os.path.dirname(__file__)
data = json.load(open(os.path.join(HERE, 'out.json'), encoding='utf-8'))

CATS = [
    ('nakas', 'Nakas', 'Meja samping tempat tidur dengan laci dan rak.'),
    ('bufet', 'Bufet & Credenza', 'Bufet, credenza, dan sideboard untuk ruang tamu & makan.'),
    ('meja-tv', 'Meja & Bufet TV', 'Meja TV dan bufet TV untuk ruang keluarga.'),
    ('meja-tamu', 'Meja Tamu', 'Coffee table, meja tamu, dan side table.'),
    ('meja-makan', 'Meja Makan', 'Meja makan bundar untuk ruang makan dan kafe.'),
    ('lemari', 'Lemari & Lainnya', 'Kabinet, dresser, rak sepatu, dan pelengkap rumah.'),
]
DESC = {
    'nakas': '{n} dari kayu jati solid, pas di samping tempat tidur untuk lampu, buku, dan barang kecil. Ukuran dan warna bisa custom.',
    'bufet': '{n} berbahan kayu jati dengan ruang simpan lega, cocok untuk ruang tamu, ruang makan, atau pemanis sudut rumah. Ukuran dan warna bisa custom.',
    'meja-tv': '{n} untuk ruang keluarga: menyimpan perangkat dan pernak-pernik dengan rapi. Dibuat dari kayu jati solid oleh pengrajin Jepara, ukuran bisa custom.',
    'meja-tamu': '{n} dari kayu solid yang jadi pusat ruang tamu yang hangat. Ukuran dan finishing bisa disesuaikan.',
    'meja-makan': '{n} dari kayu solid untuk ruang makan, sudut sarapan, atau kafe. Diameter dan finishing bisa custom.',
    'lemari': '{n} dari kayu pilihan untuk menyimpan barang dengan rapi. Ukuran dan model bisa custom.',
}
FEATURED = {'bufet-kinzy', 'meja-tv-anthony', 'nakas-retro-aesthetic', 'credenza-retro-rotan',
            'meja-tamu-mid-century', 'bufet-tv-ukiran'}


def q(x):
    return "'" + str(x).replace('\\', '\\\\').replace("'", "\\'") + "'"


def clean_color(fin):
    if not fin:
        return ['Natural', 'Bisa custom warna']
    fin = re.sub(r'\(.*?\)', '', fin).strip(' ,')
    parts = [p.strip() for p in re.split(r'[/,]', fin) if p.strip() and p.strip().lower() != 'custom']
    return (parts or ['Natural']) + ['Bisa custom warna']


items = []
for d in data:
    n = d['name']
    alts = [f'{n} Ruang Mebel'] + [f'{n}, foto {i}' for i in range(2, d['n'] + 1)]
    mat = d['mat'] or 'Kayu Jati Solid'
    mat = mat[0].upper() + mat[1:]
    dims = d['dim'] or 'Bisa custom sesuai kebutuhan'
    colors = ', '.join(q(c) for c in clean_color(d['fin']))
    price = f"\n    price: {d['price']}," if d['price'] else ''
    items.append(f"""  {{
    slug: {q(d['slug'])},
    name: {q(n)},
    category: {q(d['cat'])},
    year: {d['date'][:4]},
    description: {q(DESC[d['cat']].format(n=n))},
    images: gallery({q(d['slug'])}, {json.dumps(alts, ensure_ascii=False)}),
    specs: {{ material: {q(mat)}, dimensions: {q(dims)}, colors: [{colors}] }},{price}
    featured: {'true' if d['slug'] in FEATURED else 'false'},
  }},""")

cats = '\n'.join(f"  {{ slug: {q(s)}, name: {q(nm)}, description: {q(ds)} }}," for s, nm, ds in CATS)
cat_union = ' | '.join(q(s) for s, _, _ in CATS)

p = 'src/data/products.ts'
s = open(p, encoding='utf-8').read()
head_end = s.index('export interface Category')
tail_start = s.index('export function getAllProducts')
gal_start = s.index('// Pembuat daftar gambar')
gal_end = s.index('\n}\n', gal_start) + 3
gallery_fn = s[gal_start:gal_end]
types = s[head_end:s.index('// Kategori mengikuti')]
s = f"""// Data produk Ruang Mebel. Dibuat otomatis oleh scripts/ruang-mebel-assets/gen_ts.py dari caption
// Instagram @ruangmebelfurniture (nama, harga, ukuran, bahan). Foto di public/projects/<slug>/.
// TODO: konfirmasi harga & ukuran terbaru ke pemilik.

export type CategorySlug = {cat_union};

{types}export const categories: readonly Category[] = [
{cats}
];

{gallery_fn}
export const products: readonly Product[] = [
{chr(10).join(items)}
];

{s[tail_start:]}"""
open(p, 'w', encoding='utf-8').write(s)

# ---------- stories.ts: semua video ----------
tag_of = {s_: nm for s_, nm, _ in CATS}
rows = []
for d in data:
    for i, v in enumerate(d['videos']):
        title = d['name'] if i == 0 else f"{d['name']} ({i + 1})"
        rows.append(f"""  {{
    slug: {q(v)},
    product: {q(d['slug'])},
    tag: {q(tag_of[d['cat']])},
    title: {q(title)},
    video: true,
    sound: {'true' if d['sound'][i] else 'false'},
    alt: {q('Video ' + d['name'].lower() + ' Ruang Mebel')},
  }},""")
tags = ' | '.join(q(nm) for _, nm, _ in CATS)
st = f"""// Video produk dari Instagram @ruangmebelfurniture (semua video), dikompres ke public/stories/
// oleh scripts/ruang-mebel-assets/build.py. Poster di /stories/[slug].webp.

export type StoryTag = {tags};

export const storyTags: readonly StoryTag[] = [{', '.join(q(nm) for _, nm, _ in CATS)}];

export type Story = {{
  slug: string;
  /** Slug produk terkait (untuk tombol "Lihat produk") */
  product: string;
  tag: StoryTag;
  title: string;
  place?: string;
  /** true = ada /stories/[slug].mp4, poster di /stories/[slug].webp */
  video: boolean;
  /** true = video punya suara */
  sound: boolean;
  alt: string;
}};

export const stories: readonly Story[] = [
{chr(10).join(rows)}
];
"""
open('src/data/stories.ts', 'w', encoding='utf-8').write(st)
print(len(items), 'produk,', len(rows), 'video')
