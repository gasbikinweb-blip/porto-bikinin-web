// Foto ../assets → WebP 4:5 di public/images/. Asli tidak ditimpa; metadata (EXIF/GPS) dibuang oleh sharp.
// Jalankan: npm run optimize-images
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { images } from './images.manifest.mjs';

const SRC = process.env.ASSETS_DIR ?? '../assets';
const OUT = 'public/images';
const sizes = { product: 1200, editorial: 1600 };
const dims = {};

for (const img of images) {
  const kind = img.kind ?? 'product';
  const input = sharp(path.join(SRC, img.src)).rotate();
  const { width, height } = await input.metadata();
  // Potong ke 4:5 dengan titik tengah vertikal y
  const cropH = Math.min(height, Math.round((width * 5) / 4));
  const cropW = Math.min(width, Math.round((cropH * 4) / 5));
  const top = Math.round(Math.min(Math.max((img.y ?? 0.5) * height - cropH / 2, 0), height - cropH));
  const left = Math.round((width - cropW) / 2);
  const base = sharp(path.join(SRC, img.src))
    .rotate()
    .extract({ left, top, width: cropW, height: cropH });

  await mkdir(path.join(OUT, img.dir), { recursive: true });
  const w = Math.min(sizes[kind], cropW);
  await base
    .clone()
    .resize({ width: w })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, img.dir, `${img.out}.webp`));
  await base
    .clone()
    .resize({ width: 500 })
    .webp({ quality: 74 })
    .toFile(path.join(OUT, img.dir, `${img.out}-thumb.webp`));
  dims[`${img.dir}/${img.out}`] = [w, Math.round((w * 5) / 4)];
  console.log('✓', img.dir, img.out, `${cropW}x${cropH}`);
}

// OG image 1200x630 dari foto hero
const hero = images.find((i) => i.out === 'hero');
await sharp(path.join(SRC, hero.src))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile('public/og.jpg');
await writeFile('scripts/.last-run.json', JSON.stringify(dims, null, 2));
console.log(`Selesai: ${images.length} foto`);
