// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/.
// File asli TIDAK ditimpa. Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public';
// Foto fashion portrait cukup 1200px; sharp otomatis membuang metadata EXIF (lokasi, kamera)
const MAX_WIDTH = 1200;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Ubah nama menjadi slug: huruf kecil, tanpa spasi/karakter aneh
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
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
  const parts = rel.split(path.sep).map(slugify);
  const base = parts.pop().replace(/\.[^.]+$/, '');
  const target = path.join(OUT, ...parts, `${base}.webp`);

  if (!(await isFresh(file, target))) {
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file)
      .rotate()
      // Logo cukup kecil; foto produk maksimal MAX_WIDTH
      .resize({ width: parts[0] === 'brand' ? 256 : MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(target);
    count++;
    console.log(`✓ ${rel} -> ${target}`);
  }

  // Sampul produk (01) juga dibuat versi JPG kecil untuk pratinjau link WhatsApp/medsos,
  // karena WhatsApp tidak selalu menampilkan pratinjau WebP
  if (parts[0] === 'products' && base === '01') {
    const og = path.join(OUT, ...parts, 'og.jpg');
    if (!(await isFresh(file, og))) {
      await sharp(file)
        .rotate()
        .resize({ width: 600, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(og);
      count++;
      console.log(`✓ ${rel} -> ${og}`);
    }
  }
}
console.log(`Selesai: ${count} gambar diproses.`);
