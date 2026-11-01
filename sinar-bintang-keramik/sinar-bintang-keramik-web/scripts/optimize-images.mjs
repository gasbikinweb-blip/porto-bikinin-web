// Foto utama produk dari ../assets/Shopee Assets/ → WebP 1:1 di public/images/produk/.
// Hasil: [slug].webp (800px) + [slug]-thumb.webp (400px). File asli TIDAK ditimpa, EXIF/GPS dibuang.
// Jalankan: npm run optimize-images
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { productImages } from './products.manifest.mjs';

const SRC = process.env.ASSETS_DIR ?? '../assets/Shopee Assets';
const OUT = 'public/images/produk';
const SIZES = [
  { suffix: '', width: 800 },
  { suffix: '-thumb', width: 400 },
];

// Lewati kalau hasil sudah ada dan lebih baru dari file asli
async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

await mkdir(OUT, { recursive: true });
let count = 0;
for (const { slug, folder, image } of productImages) {
  const source = path.join(SRC, folder, image);
  for (const { suffix, width } of SIZES) {
    const target = path.join(OUT, `${slug}${suffix}.webp`);
    if (await isFresh(source, target)) continue;
    // rotate() mengikuti orientasi EXIF; metadata tidak ikut disalin (sharp default)
    await sharp(source)
      .rotate()
      .resize(width, width, { fit: 'cover', withoutEnlargement: false })
      .webp({ quality: suffix ? 70 : 78 })
      .toFile(target);
    count++;
  }
}
console.log(`✓ ${count} file gambar dibuat di ${OUT}`);
