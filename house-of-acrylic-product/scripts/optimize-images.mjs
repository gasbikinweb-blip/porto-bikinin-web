// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/.
// sharp TIDAK menyalin metadata (EXIF/GPS) kecuali diminta, jadi hasilnya bersih.
// File asli tidak ditimpa. Jalankan: npm run optimize-images
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public';
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
  const isBrand = parts[0] === 'brand';

  if (!(await isFresh(file, target))) {
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file)
      .rotate() // terapkan orientasi EXIF sebelum metadata dibuang
      .resize({ width: isBrand ? 256 : MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(target);
    count++;
    console.log(`✓ ${rel} -> ${target}`);
  }
}

// Gambar pratinjau link (WhatsApp/medsos) dalam JPG 1200x630
const ogSource = path.join(SRC, 'portfolio', 'neon-box-asia-croffle', '01.jpg');
const ogTarget = path.join(OUT, 'og.jpg');
if (!(await isFresh(ogSource, ogTarget))) {
  await sharp(ogSource)
    .rotate()
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(ogTarget);
  count++;
}
console.log(`Selesai: ${count} gambar diproses.`);
