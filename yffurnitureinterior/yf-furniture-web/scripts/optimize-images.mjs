// Mengubah foto asli di assets/ menjadi WebP terkompresi di public/images/katalog/[slug]/.
// File asli TIDAK ditimpa. Metadata (EXIF/GPS) otomatis dibuang oleh sharp karena tidak memakai withMetadata().
// Ukuran setiap gambar ditulis ke src/data/images.generated.json untuk width/height next/image (anti-CLS).
// Jalankan: npm run optimize-images   (folder sumber bisa diganti lewat env ASSETS_DIR)
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { manifest } from './katalog.manifest.mjs';

const SRC = process.env.ASSETS_DIR ?? '../assets';
const OUT = 'public/images/katalog';
const MAX_WIDTH = 1600;
const THUMB_WIDTH = 640;

// Lewati kalau hasil sudah ada dan lebih baru dari file asli
async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

async function convert(source, target, width, format = 'webp') {
  if (await isFresh(source, target)) return false;
  const img = sharp(source).rotate().resize({ width, withoutEnlargement: true });
  await (
    format === 'jpg' ? img.jpeg({ quality: 78, mozjpeg: true }) : img.webp({ quality: 78 })
  ).toFile(target);
  return true;
}

const sizes = {};
let count = 0;
for (const work of manifest) {
  const dir = path.join(OUT, work.slug);
  await mkdir(dir, { recursive: true });
  for (const [i, file] of work.files.entries()) {
    const source = path.join(SRC, work.folder, file);
    const name = `${work.slug}-${i + 1}`;
    const full = path.join(dir, `${name}.webp`);
    if (await convert(source, full, MAX_WIDTH)) count++;
    if (await convert(source, path.join(dir, `${name}-thumb.webp`), THUMB_WIDTH)) count++;
    // Cover juga dibuat JPG kecil untuk pratinjau link WhatsApp/medsos (WebP tidak selalu didukung)
    if (i === 0 && (await convert(source, path.join(dir, 'og.jpg'), 1200, 'jpg'))) count++;
    const meta = await sharp(full).metadata();
    sizes[`/images/katalog/${work.slug}/${name}.webp`] = { width: meta.width, height: meta.height };
  }
  console.log(`✓ ${work.folder} -> ${dir} (${work.files.length} foto)`);
}

await writeFile('src/data/images.generated.json', `${JSON.stringify(sizes, null, 2)}\n`);

// Logo: lencana bulat (sudut hitam dibuat transparan) + favicon dari simbol tengah logo
const LOGO = path.join(SRC, 'Logo.jpg');
const brandDir = 'public/brand';
await mkdir(brandDir, { recursive: true });
const { width: lw = 1080 } = await sharp(LOGO).metadata();
const circle = Buffer.from(
  `<svg width="${lw}" height="${lw}"><circle cx="${lw / 2}" cy="${lw / 2}" r="${lw * 0.465}"/></svg>`,
);
const badge = await sharp(LOGO)
  .composite([{ input: circle, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(badge).resize(256).webp({ quality: 85 }).toFile(path.join(brandDir, 'logo.webp'));
await sharp(badge).resize(512).png().toFile(path.join(brandDir, 'logo-512.png'));
// Simbol (kotak merah + kaki hitam) dipotong dari tengah logo, sudah berlatar krem
const mark = {
  left: Math.round(lw * 0.345),
  top: Math.round(lw * 0.105),
  width: Math.round(lw * 0.31),
  height: Math.round(lw * 0.31),
};
await sharp(LOGO).extract(mark).resize(256).png().toFile('src/app/icon.png');
await sharp(LOGO).extract(mark).resize(180).png().toFile('src/app/apple-icon.png');
console.log('✓ Logo.jpg -> public/brand/, src/app/icon.png, src/app/apple-icon.png');
console.log(`Selesai: ${count} file baru diproses.`);
