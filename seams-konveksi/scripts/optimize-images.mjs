// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/images/.
// - File asli TIDAK ditimpa
// - Metadata EXIF/GPS dibuang (sharp tidak menyalin metadata kecuali diminta)
// - Nama file dirapikan menjadi slug (huruf kecil, tanpa spasi)
// - Tiap foto menghasilkan versi besar (maks 1600px) dan thumbnail (600px, akhiran -thumb)
// Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = path.join('public', 'images');
const SIZES = [
  { suffix: '', width: 1600 },
  { suffix: '-thumb', width: 600 },
];
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
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
  const rel = path.relative(SRC, file);
  const dirs = path
    .dirname(rel)
    .split(path.sep)
    .filter((d) => d !== '.')
    .map(slugify);
  const base = slugify(path.basename(rel, path.extname(rel)));

  for (const { suffix, width } of SIZES) {
    const target = path.join(OUT, ...dirs, `${base}${suffix}.webp`);
    if (await isFresh(file, target)) continue;
    await mkdir(path.dirname(target), { recursive: true });
    const info = await sharp(file)
      .rotate() // ikuti orientasi EXIF sebelum metadata dibuang
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(target);
    count++;
    console.log(`✓ ${rel} -> ${target} (${info.width}x${info.height})`);
  }
}
console.log(`Selesai: ${count} gambar diproses. Catat width/height di src/data/*.ts.`);
