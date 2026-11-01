// Mengubah gambar di ../assets/ menjadi WebP di public/images/ (maks 1200px + thumbnail 400px).
// Metadata EXIF/GPS dibuang (sharp tidak menyalin metadata kecuali diminta).
// Folder referensi UI dilewati: gambar referensi TIDAK boleh dipakai di situs.
// Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('..', 'assets');
const OUT = path.resolve('public', 'images');
const SKIP = 'referensi website untuk UI dan UX nya';
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const SIZES = [
  { suffix: '', width: 1200 },
  { suffix: '-thumb', width: 400 },
];

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === SKIP) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

// Lewati kalau hasil sudah ada dan lebih baru dari file asli
async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

let count = 0;
for await (const file of walk(SRC)) {
  const parts = path.relative(SRC, file).split(path.sep);
  const base = parts.map((p) => slugify(p.replace(/\.[^.]+$/, ''))).join('-');
  await mkdir(OUT, { recursive: true });

  for (const { suffix, width } of SIZES) {
    const target = path.join(OUT, `${base}${suffix}.webp`);
    if (await isFresh(file, target)) continue;
    // rotate() dulu (ikuti orientasi EXIF) ke buffer, baru resize
    const rotated = await sharp(file).rotate().toBuffer();
    await sharp(rotated)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(target);
    count++;
    console.log(`✓ ${path.relative(SRC, file)} -> ${path.relative('.', target)}`);
  }
}
console.log(`Selesai: ${count} gambar diproses.`);

// Gambar pratinjau link (OG) 1200x630 berformat JPG, karena WhatsApp lebih andal dengan JPG
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fbf7ee"/><stop offset="1" stop-color="#dfeccb"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="300" font-family="Georgia, serif" font-size="60" font-weight="700" fill="#1f3a24">Sari Kacang Ijo Jogja</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="36" fill="#2f6b35">Tanpa pengawet · Tanpa pemanis buatan</text>
  <rect x="80" y="420" width="420" height="72" rx="36" fill="#f5c542"/>
  <text x="290" y="468" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#3d2e00">Free Ongkir se-Jogja</text>
</svg>`;
// Logo dipotong bulat agar sudut putih JPG tidak terlihat
const circle = Buffer.from(
  '<svg width="260" height="260"><circle cx="130" cy="130" r="128"/></svg>',
);
const logo = await sharp(path.join(SRC, 'Logo.jpg'))
  .rotate()
  .resize(260)
  .composite([{ input: circle, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(Buffer.from(ogSvg))
  .composite([{ input: logo, left: 870, top: 185 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.resolve('public', 'og.jpg'));
console.log('✓ public/og.jpg');
