// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/.
// File asli TIDAK ditimpa. Jalankan: npm run optimize-images
//
// Hasil per foto:
//   <nama>.webp     maks 1600px (lightbox, hero)
//   <nama>-sm.webp  maks 800px (kartu/grid; jauh lebih ringan di HP)
// Tambahan:
//   brand/*.png     -> WebP 256px dengan transparansi
//   og/og-default.jpg (1200x630) dari sampul OG_SOURCE untuk pratinjau link WhatsApp/medsos
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public';
const MAX_WIDTH = 1600;
const SMALL_WIDTH = 800;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
// Foto sampul untuk og:image (ganti bila ingin sampul lain)
const OG_SOURCE = 'assets-src/projects/spa-seminyak/02.jpg';

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
async function emit(source, target, pipeline) {
  if (await isFresh(source, target)) return;
  await mkdir(path.dirname(target), { recursive: true });
  await pipeline(sharp(source).rotate()).toFile(target);
  count++;
  console.log(`✓ ${source} -> ${target}`);
}

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const parts = rel.split(path.sep).map(slugify);
  const base = parts.pop().replace(/\.[^.]+$/, '');
  const dir = path.join(OUT, ...parts);

  if (parts[0] === 'brand') {
    // Logo lengkap (latar putih) hanya disimpan sebagai arsip, tidak dipakai di web
    if (base === 'logo-full') continue;
    await emit(file, path.join(dir, `${base}.webp`), (s) =>
      s.resize({ width: 256, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }),
    );
    continue;
  }

  await emit(file, path.join(dir, `${base}.webp`), (s) =>
    s.resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }),
  );
  await emit(file, path.join(dir, `${base}-sm.webp`), (s) =>
    s.resize({ width: SMALL_WIDTH, height: SMALL_WIDTH, fit: 'inside', withoutEnlargement: true }).webp({ quality: 72 }),
  );
}

// og:image JPG 1200x630 (WhatsApp tidak selalu menampilkan pratinjau WebP)
await emit(OG_SOURCE, path.join(OUT, 'og', 'og-default.jpg'), (s) =>
  s.resize({ width: 1200, height: 630, fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }),
);

console.log(`Selesai: ${count} gambar diproses.`);
