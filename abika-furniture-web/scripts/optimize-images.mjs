// Mengubah foto Instagram di ../abika_furniture/assets menjadi WebP di public/images/.
// File asli TIDAK ditimpa. EXIF/GPS terbuang karena sharp tidak menyalin metadata secara default.
// Slide teks (latar hampir putih polos) dilewati otomatis.
// Jalankan: npm run optimize-images
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('../abika_furniture/assets');
const OUT = 'public/images';
const FULL = 1400;
const THUMB = 500;

// slug produk -> kode postingan sumber, foto pertama jadi foto utama
const products = {
  'sofa-l-natural': ['DL1bxB0TlaR', 'DLJihRHTkhY', 'DLjA0uyTcYR'],
  'sofa-l-walnut': ['DM_yrrTh1Wb', 'DMjmKZ8Tl3-', 'DMwM1HuTqj3'],
  'sofa-modular-walnut': ['DdDnjZFS-UH', 'Del998Ny17G', 'DevmZQqy0mH'],
  'sofa-l-abu': ['CullK5MLfL5'],
  'sofa-phai-rattan': ['Cux2FUrPuPM'],
  'sofa-bed-single': ['Cus3QS_L8F1'],
  'kursi-makan-jati-busa': ['DL6G0IETibN', 'DL_wx8ATSk_', 'DMEq8ZxTL1J'],
  'kursi-uvi': ['CuTA7bUPRWb'],
  'kursi-wei': ['CufzU-qywQ-'],
  'kursi-ulai': ['Cuna_Bfytgr'],
  'kursi-ulfa-rattan': ['CuqJxotvbS2'],
  'kursi-santai-rattan': ['Cva0jPEydXK'],
  'kursi-two': ['Cv4Svp1rkFB'],
  'wings-chair': ['CwSQhlCrXam'],
  'chair-yui': ['C5-A6-PLa-8'],
  'bangku-wood': ['Cv0-FoTrMiZ'],
  'meja-makan-marble': ['CuCDJybrLfA'],
  'set-meja-makan-marble-k4': ['CuJDEAvrrIQ'],
  'meja-makan-bulat-natural': ['DMWjOCozyEd', 'DMY2uuZTeRK', 'DMbx5i9zp2I'],
  'set-meja-bulat-gold': ['DNKzSjnB7G7', 'DNUD4ExSyIW'],
  'set-meja-makan-bench': ['DcslapyEl3P', 'DbFFdDpyCVN', 'DbpMuUXSIt4'],
  'coffee-table-pier': ['CuiW2bASUPX'],
  'coffee-table-marmer': ['C-nLziwyfzE'],
  'buffet-tv-treatment': ['Cu5f6s_yXi5'],
  'buffet-tv-natural-teak': ['DKEEqKGT-UP'],
  'cabinet-laci': ['DKa_pWizqez'],
  'buffet-rotan-jati-mahogany': ['DOR_Qa6kgo3', 'DOfJ7f0kvDA'],
  'laci-rotan-walnut': ['DfPL_VEyDqb'],
  'box-baby': ['CvGiJZtPvdi'],
  'dipan-rotan-hitam': ['DaXw7F2SqoX', 'DaaIL02S9CG', 'DafUEUbSn0R'],
  'dipan-rotan-natural': ['Dey1eUXSGbS', 'De1PGDTyK6q', 'De5hNpxSBrp'],
  'meja-rias-jati': ['B7u44deFKLI', 'B7u4pzeFE57', 'B7u4zt0Fgc7'],
};
// Foto proses produksi untuk section Galeri
// Dipilih yang fokus ke tangan & produk, menghindari wajah pekerja
const gallery = [
  'B7sFsEVFSgZ',
  'B7uzHhqFhM8',
  'B8D2vNUl7ar',
  'B9B3BBLlDbE',
  'B9B4i3tl2vG',
  'B8itb1KFISI',
];

const folders = await readdir(ROOT);
const folderOf = (code) => {
  const f = folders.find((n) => n.endsWith(`_${code}`));
  if (!f) throw new Error(`Folder tidak ditemukan: ${code}`);
  return path.join(ROOT, f);
};

async function sources(codes) {
  const out = [];
  for (const code of codes) {
    const dir = folderOf(code);
    for (const f of (await readdir(dir)).filter((n) => /\.jpe?g$/i.test(n)).sort()) {
      const file = path.join(dir, f);
      const { channels } = await sharp(file).stats();
      const plain = channels.slice(0, 3).every((c) => c.mean > 235);
      if (!plain) out.push(file);
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
const first = (await sources(products['sofa-l-natural']))[0];
await sharp(first)
  .rotate()
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'));

// Logo: potong bagian tulisan, tetap putih di latar hitam seperti aslinya
const LOGO = path.join(ROOT, 'Logo.jpg');
await sharp(LOGO)
  .extract({ left: 131, top: 470, width: 820, height: 120 })
  .webp({ quality: 90 })
  .toFile(path.join(OUT, 'logo.webp'));
// Favicon: huruf A dari logo, tulisan penuh tidak terbaca di ukuran kecil
await sharp(LOGO)
  .extract({ left: 168, top: 505, width: 52, height: 52 })
  .resize(128, 128)
  .png()
  .toFile('src/app/icon.png');

await writeFile('src/data/images.generated.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Selesai. Foto di bawah 800px: ${low.join(', ') || 'tidak ada'}`);
