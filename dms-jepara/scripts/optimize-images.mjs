// Mengubah foto Instagram di assets menjadi WebP di public/images/.
// File asli TIDAK ditimpa. EXIF/GPS terbuang karena sharp tidak menyalin metadata secara default.
// Slide teks (latar hampir putih polos) dilewati otomatis.
// Jalankan: npm run optimize-images
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('assets/dmsjeparafurniture');
const OUT = 'public/images';
const FULL = 1400;
const THUMB = 500;

// slug produk -> sumber foto. Format 'KODE' (semua foto) atau 'KODE:02,03' (foto tertentu).
// Slide promosi penuh teks sengaja tidak dipilih. Foto pertama jadi foto utama.
const products = {
  'sofa-luxury-ukir-klasik': ['DbIYv01FE6b:02,03,04,05,06,07'],
  'sofa-chesterfield-peach': ['DcK84HDmgm_:02,03,01'],
  'sofa-chesterfield-abu': ['DWbiqpPkuVu'],
  'sofa-set-living-luxury': ['DeucttSH-_4:02,03,04'],
  'sofa-dg-stainless': ['De3rXbKH6QW:02,03,04'],
  'sofa-scandinavian': ['DesR0zakuqb:02', 'DesRm0JErgW:04'],
  'sofa-scandinavian-klasik': ['DesRm0JErgW:02', 'DesRtKjkie1:02'],
  'sofa-tufting-modern': ['DceTEioSvs3'],
  'sofa-minimalis-bingkai-hitam': ['DesRvz8EtYH:03'],
  'sofa-putih-lengkung': ['DesRm0JErgW:03'],
  'sofa-l-cerelons': ['Df9hPDmSGwY'],
  'kursi-sofa-aerox': ['DdJo3ByS4Cw', 'DdJpL_3yaDH'],
  'lounge-chair-klasik': ['DesR2mHkkfC:02'],
  'meja-makan-sultan': ['Devq00yHz89:03,04,05'],
  'meja-makan-luxury-putih': ['Devq7Fqn6ZZ:02'],
  'meja-makan-klasik': ['DeucjDIn_bX:02'],
  'meja-makan-gold': ['DevqhbjyqJ5'],
  'coffee-table-marmer-carrara': ['DesToF2ys6_'],
  'meja-rias-modern': ['DWbih7wEuqR'],
  'meja-rias-lampu-cermin': ['DWbimyFFJUp:01,02'],
  'meja-rias-putih-klasik': ['Df9OfMRnzA7:05'],
  'meja-rias-eropa': ['Df9OOUGS7fh'],
  'credenza-luxury': ['DesRShOkjV3:02', 'DesRyFuksBk:02'],
  'meja-konsol-klasik': ['DesRbTSEo_9:04'],
  'buffet-tv-putih-klasik': ['DeucjDIn_bX:03'],
  'credenza-putih-ukir': ['DeucjDIn_bX:04'],
  'credenza-luxury-gold': ['De-L35lzmWD'],
  'bufet-ukir-putih': ['De-MB9cz4K7'],
  'lemari-pakaian-custom': ['DgHWyUtSklo'],
  'walk-in-wardrobe': ['DeucJMhya3L'],
  'bed-caroline-luxury': ['DfAo4CZk0Il:02'],
  'set-bed-tufting-abu': ['DfAo4CZk0Il:03'],
  'set-bed-wall-decor': ['DfAo4CZk0Il:05'],
  'bed-klasik-luxury': ['Df9OMP4yNhj'],
  'kamar-set-luxury': ['Devq9-5SenU'],
  'kitchen-set-luxury': ['DesRqo5EjxZ:02', 'DevrKxHH-bo:04,05'],
  'kitchen-island-bar': ['Devq7Fqn6ZZ:03,04'],
  'pintu-custom-luxury': ['DgHXyU3H5Ii:02,03,04'],
  'carport-kayu-jati': ['DcKqgc9S6kn'],
  'panel-dinding-dekorasi': ['DesRbTSEo_9:02'],
};
// Inspirasi ruangan untuk section Galeri
const gallery = ['DWbiMmhEq3y:01', 'DesRvz8EtYH:02', 'DesRbTSEo_9:03', 'DevqqEDSkAA:01'];

const folders = await readdir(ROOT);
const folderOf = (code) => {
  const f = folders.find((n) => n.endsWith(`_${code}`));
  if (!f) throw new Error(`Folder tidak ditemukan: ${code}`);
  return path.join(ROOT, f);
};

async function sources(codes) {
  const out = [];
  for (const entry of codes) {
    const [code, pick] = entry.split(':');
    const dir = folderOf(code);
    const all = (await readdir(dir)).filter((n) => /\.jpe?g$/i.test(n)).sort();
    const files = pick ? pick.split(',').map((n) => `${n}.jpg`) : all;
    for (const f of files) {
      if (!all.includes(f)) throw new Error(`Foto tidak ada: ${entry} -> ${f}`);
      const file = path.join(dir, f);
      if (!pick) {
        const { channels } = await sharp(file).stats();
        if (channels.slice(0, 3).every((c) => c.mean > 235)) continue;
      }
      out.push(file);
    }
  }
  return out;
}

async function convert(file, dir, name) {
  const img = sharp(file).rotate();
  const full = await img
    .clone()
    .resize({ width: FULL, height: FULL, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(dir, `${name}.webp`));
  await img
    .clone()
    .resize({ width: THUMB, withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(path.join(dir, `${name}-thumb.webp`));
  return { width: full.width, height: full.height };
}

await rm(OUT, { recursive: true, force: true });
const manifest = { products: {}, gallery: [] };
const low = [];

for (const [slug, codes] of Object.entries(products)) {
  const dir = path.join(OUT, 'produk', slug);
  await mkdir(dir, { recursive: true });
  const files = await sources(codes);
  if (!files.length) throw new Error(`Tanpa foto: ${slug}`);
  manifest.products[slug] = [];
  for (const [i, file] of files.entries()) {
    const name = String(i + 1).padStart(2, '0');
    const size = await convert(file, dir, name);
    if (Math.max(size.width, size.height) < 800) low.push(`${slug}/${name}`);
    manifest.products[slug].push({
      src: `/images/produk/${slug}/${name}.webp`,
      thumb: `/images/produk/${slug}/${name}-thumb.webp`,
      ...size,
    });
  }
  console.log(`✓ ${slug}: ${files.length} foto`);
}

const gdir = path.join(OUT, 'galeri');
await mkdir(gdir, { recursive: true });
for (const [i, code] of gallery.entries()) {
  const [file] = await sources([code]);
  const name = String(i + 1).padStart(2, '0');
  const size = await convert(file, gdir, name);
  manifest.gallery.push({
    src: `/images/galeri/${name}.webp`,
    thumb: `/images/galeri/${name}-thumb.webp`,
    ...size,
  });
}

// Gambar pratinjau link (WhatsApp/medsos)
const first = (await sources(products['sofa-luxury-ukir-klasik']))[0];
await sharp(first)
  .rotate()
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'));

await writeFile('src/data/images.generated.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Selesai. Foto di bawah 800px: ${low.join(', ') || 'tidak ada'}`);
