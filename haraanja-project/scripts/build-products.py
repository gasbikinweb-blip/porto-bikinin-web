# Generator data produk dari folder Shopee (sekali jalan, hasil dicek manual).
# Menyalin foto ke assets-src/produk/<slug>/ (urutan: sampul dulu) dan menulis src/data/products.ts.
# Jalankan dari folder haraanja-project:  python scripts/build-products.py
import json, os, re, shutil

SRC = 'assets/shopee/haraanjaproject'
DST = 'assets-src/produk'
W = ['pernikahan', 'khitan', 'hajatan']  # momen umum

# (itemId, slug, nama, kategori, harga, priceNote, size, material, includedPackaging, minOrder,
#  customizable, occasions, seasonal, featured, cover, isPackaging)
P = [
 ('22349935335', 'tumbler-macaron-kaca', 'Tumbler Macaron Kaca 500 ml', 'tumbler', 11110, None, 'Ø6 × 22 cm, 500 ml', 'Kaca, lapisan luar silikon', None, None, False, W, None, True, '01', False),
 ('24583758101', 'gelas-kaca-beruang', 'Gelas Kaca Beruang', 'gelas', 6800, 'mulai dari', '10 × 13 cm, 450 ml', 'Kaca', 'Gelas, sendok, dan dus', None, False, W, None, True, '01', False),
 ('24676162194', 'mangkok-kaca-packing-box', 'Mangkok Kaca Packing Box', 'mangkok', 10300, 'mulai dari', None, 'Kaca', 'Kemas mika, tile, atau box', 50, True, W, None, False, '01', False),
 ('24867791757', 'botol-tumbler-kaca-420', 'Botol Tumbler Kaca 420 ml', 'tumbler', 7600, 'mulai dari', 'Tinggi 18,5 cm, 420 ml', 'Kaca, tutup stainless dengan tali', 'Kemas tile/box/mika + kartu terima kasih', 50, True, W, None, True, '04', False),
 ('24908940978', 'pouch-croco-doff', 'Pouch Croco Doff', 'tekstil', 7750, 'mulai dari', '19 × 14 cm', 'Kulit sintetis croco doff', 'Kemas plastik', 50, False, W, None, True, '02', False),
 ('24961208778', 'mangkok-kaca-bunga-box', 'Mangkok Kaca Bunga + Box', 'mangkok', 8000, None, 'Ø±15 cm', 'Kaca', 'Box + kartu terima kasih', 100, True, W, None, True, '01', False),
 ('25161949509', 'botol-kaca-diamond-crystal', 'Botol Kaca Diamond Crystal 450 ml', 'tumbler', 4950, None, 'Ø6 × 19,5 cm, 450 ml', 'Kaca', None, None, False, W, None, False, '02', False),
 ('25315074917', 'tumbler-gelas-kaca-aesthetic', 'Tumbler Gelas Kaca Aesthetic 400 ml', 'tumbler', 5850, 'mulai dari', '11 × 9 cm, 400 ml', 'Kaca, tutup PP, sedotan kaca', None, None, True, W, None, False, '02', False),
 ('25383938223', 'box-gelas-gorgeous', 'Box Gelas Gorgeous 10×10×11', 'kemasan', 2000, 'mulai dari', '10 × 10 × 11 cm', 'Ivory 260 gr', None, None, True, W, None, True, '01', True),
 ('25611161400', 'mangkok-twotone-sablon', 'Mangkok Twotone Keramik Sablon', 'mangkok', 9500, 'mulai dari', 'Ø14 × 6,8 cm', 'Keramik grade A', 'Kemas mika atau box', 50, True, W, None, True, '01', False),
 ('25661208433', 'mangkok-kaca-motif-mewah', 'Mangkok Kaca Motif Mewah + Box', 'mangkok', 9200, None, 'Ø±15 cm', 'Kaca', 'Box + kartu terima kasih', 100, True, W, None, False, '01', False),
 ('25935774204', 'sample-box', 'Sample Box (6 Box Acak)', 'kemasan', 25000, 'per paket', 'Ukuran acak', 'Sisa produksi', None, None, False, W, None, False, '01', True),
 ('25961167235', 'mangkok-twotone-grade-a', 'Mangkok Twotone Grade A', 'mangkok', 10850, None, 'Ø14,5 × 6,7 cm', 'Keramik grade A', None, None, False, W, None, False, '01', False),
 ('25961204506', 'mangkok-kaca-motif-bunga', 'Mangkok Kaca Motif Bunga + Box', 'mangkok', 9250, None, 'Ø±15 cm', 'Kaca', 'Box + kartu terima kasih', 100, True, W, None, False, '01', False),
 ('26354369352', 'handuk-kemas-tile', 'Handuk Kemas Tile', 'tekstil', 16600, None, '100 × 50 cm', 'Katun', 'Kemas tile + pita + kartu terima kasih', 25, False, W + ['haji-umroh'], 'haji-umroh', True, '01', False),
 ('26603853783', 'botol-doff-kemas-mika', 'Botol Doff 420 ml Kemas Mika', 'tumbler', 6500, None, 'Tinggi 18,5 cm, 420 ml', 'Kaca doff, tutup stainless', 'Kemas plastik + kartu + pita + sablon', None, True, W, None, True, '01', False),
 ('27202431373', 'botol-rabbit', 'Botol Rabbit 380 ml', 'tumbler', 6500, None, '15 × 8 × 8 cm, 380 ml', 'Kaca', None, None, False, W, None, True, '01', False),
 ('27289643206', 'box-kemas-custom', 'Box Kemas Custom', 'kemasan', 3950, None, None, 'Ivory 260 gr', None, None, True, W, None, False, '01', True),
 ('27396181972', 'box-piring-natal', 'Box & Paper Bag Piring Tema Natal', 'kemasan', 2650, None, '21 × 5 × 21 cm', 'Ivory', None, None, False, ['natal'], 'natal', False, '01', True),
 ('27520547708', 'paper-bag-piring-custom', 'Paper Bag Piring Custom', 'kemasan', 8000, None, '21 × 5 × 21 cm', 'Ivory, laminasi doff/glossy', None, None, True, W, None, False, '01', True),
 ('28152075867', 'box-custom-15x15x8', 'Box Custom 15×15×8', 'kemasan', 2000, 'mulai dari', '15 × 15 × 8 cm', 'Art carton 310 gr', None, 100, True, W, None, False, '01', True),
 ('28514109838', 'box-souvenir-10x10x10', 'Box Souvenir 10×10×10 Motif Simple', 'kemasan', 2250, 'mulai dari', '10 × 10 × 10 cm', 'Ivory', None, None, True, W, None, False, '01', True),
 ('28670066997', 'box-tatakan', 'Box dengan Tatakan', 'kemasan', 15000, None, None, 'Duplex + art paper, laminasi doff/glossy', None, None, True, W, None, False, '01', True),
 ('29806032319', 'gelas-beruang-box-nama', 'Gelas Beruang + Box Custom Nama', 'gelas', 13500, None, 'Box 10 × 10 × 10 cm', 'Kaca', 'Box + pita + sablon nama', None, True, W, None, False, '01', False),
 ('40001088610', 'box-souvenir-15x16x7', 'Box Souvenir 15×16×7', 'kemasan', 2250, 'mulai dari', '15 × 16 × 7 cm', 'Ivory', None, None, True, W, None, True, '04', True),
 ('40233018902', 'termos-sultan', 'Termos Sultan Vacuum Flask Set', 'termos', 35875, None, None, 'Stainless steel', 'Gift box + 2 cangkir', None, False, W + ['haji-umroh'], None, True, '01', False),
 ('40472930325', 'box-payung', 'Box Payung 6×6×27', 'kemasan', 6500, None, '6 × 6 × 27 cm', 'Ivory 260 gr', None, 30, True, W, None, False, '01', True),
 ('42001049881', 'sendok-garpu-gold-softbox', 'Sendok Garpu Gold + Softbox', 'peralatan-makan', 15000, 'mulai dari', 'Sendok & garpu 20 × 4 cm', 'Stainless', 'Softbox ivory 300 gr (jendela mika/tanpa)', 50, True, W, None, True, '01', False),
 ('42377025003', 'mangkok-cina-custom', 'Mangkok Cina Custom', 'mangkok', 28500, 'mulai dari', None, 'Keramik', 'Box dengan tatakan', 50, True, W, None, True, '01', False),
 ('43150994792', 'softbox-10x7', 'Softbox 10×7,5', 'kemasan', 1800, 'mulai dari', '10 × 7,5 cm', 'Ivory 260 gr', None, None, True, W, None, False, '01', True),
 ('43272831815', 'box-pouch', 'Box Pouch 18×19×3,5', 'kemasan', 5100, None, '18 × 19 × 3,5 cm', 'Ivory 260 gr', None, None, True, W, None, False, '01', True),
 ('44614925690', 'gelas-cola-sleeve', 'Gelas Cola Kaca + Sleeve Kulit', 'gelas', 10726, None, None, 'Kaca, sleeve kulit, sedotan kaca', None, None, False, W, None, False, '01', False),
 ('44714886848', 'gelas-kopi-pastel-flip', 'Gelas Kopi Kaca Pastel Tutup Flip', 'gelas', 9420, None, None, 'Kaca', None, None, False, W, None, True, '01', False),
 ('44806236509', 'box-piring-idul-fitri', 'Box Piring Tema Idul Fitri', 'kemasan', 3000, None, None, 'Ivory 260 gr', None, None, False, ['idul-fitri', 'haji-umroh', 'hajatan'], 'idul-fitri', False, '01', True),
 ('45214896715', 'tumbler-macaron-oval', 'Tumbler Macaron Oval', 'tumbler', 8760, None, None, 'Kaca', None, None, False, W, None, False, '01', False),
 ('45664895778', 'gelas-jepang', 'Gelas Jepang Premium', 'gelas', 10620, None, None, 'Kaca', None, None, False, W, None, True, '01', False),
 ('46114892526', 'gelas-gorgeous-sleeve', 'Gelas Gorgeous + Sleeve Kulit', 'gelas', 7746, None, None, 'Kaca, sleeve kulit sintetis, sedotan kaca', None, None, False, W, None, True, '01', False),
 ('46964890132', 'botol-kaca-nice', 'Botol Kaca Nice 400 ml', 'tumbler', 7080, None, '400 ml', 'Kaca', None, None, False, W, None, False, '01', False),
 ('47264475851', 'box-souvenir-12x7x7', 'Box Souvenir 12×7×7', 'kemasan', 2300, None, '12 × 7 × 7 cm', 'Ivory 260 gr', None, None, False, W, None, False, '01', True),
 ('48402646451', 'mangkok-cina-isi-1', 'Mangkok Cina Isi 1 + Box', 'mangkok', 13500, None, None, 'Keramik', 'Box', None, True, W, None, False, '01', False),
 ('48514454471', 'tumbler-smile', 'Tumbler Smile Bottle', 'tumbler', 7080, None, None, 'Kaca', None, None, False, W, None, True, '01', False),
 ('49014885430', 'botol-mug-jar', 'Botol Mug Jar Premium', 'tumbler', 8850, None, None, 'Kaca', None, None, False, W, None, False, '01', False),
 ('49051984094', 'botol-flower-daisy', 'Botol Flower Daisy 500 ml', 'tumbler', 14000, None, 'Ø6,5 cm, 500 ml', 'Kaca, lapisan luar silikon', None, None, False, W, None, False, '01', False),
 ('51550960573', 'cangkir-mahkota', 'Cangkir Mahkota 350 ml', 'gelas', 7200, None, '350 ml', 'Kaca', 'Cangkir + tutup + sendok', None, False, W, None, False, '01', False),
 ('51956211468', 'totebag-d300', 'Totebag D300', 'tekstil', 9750, 'mulai dari', '28 × 6 × 34 cm', 'Kain D300 waterproof, pegangan kulit', 'Kemas mika + pita', None, True, W, None, True, '01', False),
 ('53764906991', 'botol-smile-doff', 'Botol Smile Kaca Doff', 'tumbler', 8850, None, None, 'Kaca doff', None, None, False, W, None, False, '01', False),
 ('54450958119', 'botol-doff-bening-420', 'Botol Tumbler Doff/Bening 420 ml', 'tumbler', 5650, None, '19,7 × 6 cm, 420 ml', 'Kaca', None, None, False, W, None, False, '01', False),
 ('54814875218', 'botol-kaca-tali', 'Botol Kaca Tali', 'tumbler', 7670, None, None, 'Kaca, tali silikon', None, None, False, W, None, True, '01', False),
]

dirs = {d.split('_', 1)[0]: d for d in os.listdir(SRC)}
out = []
for (iid, slug, name, cat, price, note, size, mat, inc, minO, cust, occ, seas, feat, cover, pack) in P:
    src = os.path.join(SRC, dirs[iid])
    files = sorted(f for f in os.listdir(src) if f.endswith('.jpg'))
    main = sorted(f for f in files if not f.startswith('varian_'))
    var = [f for f in files if f.startswith('varian_')]
    order = [f'{cover}.jpg'] + [f for f in main if f != f'{cover}.jpg'] if f'{cover}.jpg' in main else main
    d = os.path.join(DST, slug); os.makedirs(d, exist_ok=True)
    images = []
    for i, f in enumerate(order[:8], 1):
        shutil.copy2(os.path.join(src, f), os.path.join(d, f'{i:02d}.jpg'))
        images.append(f'{i:02d}')
    variants = []
    for f in var[:24]:
        label = f[len('varian_'):-4]
        key = 'v-' + re.sub(r'[^a-z0-9]+', '-', label.lower()).strip('-')
        shutil.copy2(os.path.join(src, f), os.path.join(d, key + '.jpg'))
        variants.append((label, key))
    info = open(os.path.join(src, 'info.txt'), encoding='utf8').read()
    if not variants:
        for line in info.split('Spesifikasi:')[0].split('\n'):
            m = re.match(r'^(Warna|Motif|Variasi|Pilihan|Kemas|Laminasi|box|tatakan|Isi mangkok|VARIASI|PACKAGING|Motif box|Mangkok|harga)\s*:\s*(.+)$', line.strip())
            if m and m.group(1).lower() not in ('harga',):
                for v in m.group(2).split(','):
                    v = v.strip()
                    if v and v not in ('-',):
                        variants.append((v, None))
    out.append(dict(slug=slug, iid=iid, name=name, cat=cat, price=price, note=note, size=size, mat=mat, inc=inc,
                    minO=minO, cust=cust, occ=occ, seas=seas, feat=feat, pack=pack, images=images, variants=variants))

def js(v): return json.dumps(v, ensure_ascii=False)
L = ["// Data produk dari toko Shopee haraanjaproject (dibuat oleh scripts/build-products.py, lalu dicek manual).",
     "// Harga = harga per pcs di Shopee. Harga grosir, biaya sablon, dan ongkir dikonfirmasi admin.",
     "import type { Product } from './types';", "",
     "const img = (slug: string, file: string, alt: string) => ({",
     "  src: `/images/produk/${slug}/${file}.webp`,",
     "  thumb: `/images/produk/${slug}/${file}-thumb.webp`,",
     "  alt,", "  width: 1200,", "  height: 1200,", "});", "",
     "export const products: readonly Product[] = ["]
for p in out:
    s, n = p['slug'], p['name']
    imgs = ',\n      '.join(f"img({js(s)}, {js(f)}, {js(n + (' dari Haraanja Project' if k == 0 else f', foto {k+1}'))})" for k, f in enumerate(p['images']))
    vs = ''
    if p['variants']:
        vs = '\n    variants: [\n' + ''.join(
            f"      {{ label: {js(l)}" + (f", image: img({js(s)}, {js(k)}, {js(n + ' varian ' + l)})" if k else '') + " },\n"
            for l, k in p['variants']) + '    ],'
    opt = ''
    for key, field in [('note', 'priceNote'), ('size', 'size'), ('mat', 'material'), ('inc', 'includedPackaging'), ('minO', 'minOrder'), ('seas', 'seasonal')]:
        if p[key] is not None: opt += f"\n    {field}: {js(p[key])},"
    L.append(f"""  {{
    slug: {js(s)},
    shopeeItemId: {js(p['iid'])},
    name: {js(n)},
    category: {js(p['cat'])},
    occasions: {js(p['occ'])},
    isPackaging: {str(p['pack']).lower()},
    price: {p['price']},{opt}
    customizable: {str(p['cust']).lower()},
    featured: {str(p['feat']).lower()},
    images: [
      {imgs},
    ],{vs}
  }},""")
L.append("];")
L.append("")
L.append("export const productSlugs = new Set(products.map((p) => p.slug));")
L.append("export const getProduct = (slug: string) => products.find((p) => p.slug === slug);")
open('src/data/products.ts', 'w', encoding='utf8').write('\n'.join(L) + '\n')
print(len(out), sum(len(p['images']) + sum(1 for _, k in p['variants'] if k) for p in out))
