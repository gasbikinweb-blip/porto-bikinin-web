// Mengubah foto di assets-src/ menjadi WebP di public/images/ (EXIF/GPS otomatis dibuang).
//  - assets-src/produk/<slug>/<nama>.jpg -> public/images/produk/<slug>/<nama>.webp (maks 1200px)
//                                          + <nama>-thumb.webp (500px) untuk kartu katalog
//  - assets-src/galeri/<nama>.jpg       -> public/images/galeri/<nama>.webp (+ thumb)
// File asli TIDAK ditimpa. Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public/images';
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

async function fresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

let count = 0;
for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const base = rel.replace(/\.[^.]+$/, '');
  const big = path.join(OUT, `${base}.webp`);
  const thumb = path.join(OUT, `${base}-thumb.webp`);
  if (await fresh(file, big)) continue;
  await mkdir(path.dirname(big), { recursive: true });
  await sharp(file).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(big);
  await sharp(file).rotate().resize({ width: 500, height: 500, fit: 'cover' }).webp({ quality: 70 }).toFile(thumb);
  count++;
}
console.log(`Selesai: ${count} gambar diproses.`);
