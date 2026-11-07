// Mengubah foto terpilih (lihat gallery.manifest.mjs) menjadi WebP di public/images/ + thumbnail.
// Entri dengan `at` (detik) mengambil frame langsung dari video (butuh ffmpeg).
// File asli TIDAK ditimpa. Metadata (EXIF/GPS) otomatis dibuang karena tidak memakai withMetadata().
// Ukuran gambar ditulis ke src/data/images.generated.json untuk width/height next/image (anti-CLS).
// Jalankan: npm run optimize-images   (folder sumber bisa diganti lewat env SOURCE_DIR)
import { execFileSync } from 'node:child_process';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { manifest } from './gallery.manifest.mjs';

const ROOT = process.env.SOURCE_DIR ?? '../sirait-printing';
const OUT = 'public/images';
const MAX_WIDTH = 1200;
const THUMB_WIDTH = 480;

async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

// Sumber video + `at` (detik): ambil satu frame resolusi penuh lewat ffmpeg (tanpa metadata)
function frameFromVideo(source, at) {
  return execFileSync('ffmpeg', [
    '-v',
    'error',
    '-ss',
    String(at),
    '-i',
    source,
    '-frames:v',
    '1',
    '-map_metadata',
    '-1',
    '-f',
    'image2pipe',
    '-vcodec',
    'png',
    '-',
  ]);
}

// Terapkan crop ringan (persen) bila ada
async function load(item, source) {
  const { crop } = item;
  const input = item.at === undefined ? source : frameFromVideo(source, item.at);
  const img = sharp(input).rotate();
  if (!crop) return img;
  const { width = 0, height = 0 } = await sharp(input).rotate().metadata();
  return img.extract({
    left: Math.round(crop.left * width),
    top: Math.round(crop.top * height),
    width: Math.round(crop.width * width),
    height: Math.round(crop.height * height),
  });
}

await mkdir(OUT, { recursive: true });
const sizes = {};
let count = 0;
for (const item of manifest) {
  const source = path.join(ROOT, item.src);
  const full = path.join(OUT, `${item.name}.webp`);
  const thumb = path.join(OUT, `${item.name}-thumb.webp`);
  for (const [target, width] of [
    [full, MAX_WIDTH],
    [thumb, THUMB_WIDTH],
  ]) {
    if (await isFresh(source, target)) continue;
    const img = await load(item, source);
    await img.resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
    count++;
  }
  const meta = await sharp(full).metadata();
  sizes[`/images/${item.name}.webp`] = { width: meta.width, height: meta.height };
  console.log(`✓ ${item.src} -> ${full}`);
}

// Gambar pratinjau link (WhatsApp/medsos) dari foto pertama, format JPG
const og = path.join(OUT, 'og.jpg');
const first = manifest[0];
if (first && !(await isFresh(path.join(ROOT, first.src), og))) {
  await sharp(path.join(ROOT, first.src))
    .rotate()
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(og);
  count++;
}

await writeFile('src/data/images.generated.json', `${JSON.stringify(sizes, null, 2)}\n`);
console.log(`Selesai: ${count} file baru diproses.`);
