// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/.
// File asli TIDAK ditimpa. Metadata EXIF/GPS dibuang (sharp tidak menyalin metadata kecuali diminta).
// Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public/img';
const MAX_WIDTH = 1600;
const THUMB_WIDTH = 640;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Foto yang juga dibuat versi JPG untuk pratinjau link (Open Graph / WhatsApp)
const OG_SOURCES = new Set(['rs-ruang-rawat-vinyl-biru-luas']);

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
async function make(source, target, build) {
  if (await isFresh(source, target)) return;
  await mkdir(path.dirname(target), { recursive: true });
  const info = await build(sharp(source).rotate()).toFile(target);
  count++;
  console.log(`✓ ${target} (${info.width}x${info.height})`);
}

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const parts = rel.split(path.sep).map(slugify);
  const base = parts.pop().replace(/\.[^.]+$/, '');
  const dir = path.join(OUT, ...parts);

  if (parts[0] === 'brand') {
    await make(file, path.join(dir, `${base}.png`), (s) =>
      s.resize({ width: 256, withoutEnlargement: true }).png(),
    );
    continue;
  }

  await make(file, path.join(dir, `${base}.webp`), (s) =>
    s.resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }),
  );
  await make(file, path.join(dir, `${base}-thumb.webp`), (s) =>
    s.resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 72 }),
  );
  if (OG_SOURCES.has(base)) {
    // 1200x630 sesuai rekomendasi Open Graph
    await make(file, path.join(OUT, 'og.jpg'), (s) =>
      s.resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }),
    );
  }
}
console.log(`Selesai: ${count} gambar diproses.`);
