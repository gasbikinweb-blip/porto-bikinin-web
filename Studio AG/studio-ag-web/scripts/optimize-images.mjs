// Mengubah gambar sumber (assets/ Instagram + _pdf-extract/) menjadi WebP di public/images/.
// File asli TIDAK ditimpa. Metadata EXIF/GPS dibuang (sharp tidak menyalin metadata secara default).
// Juga menulis src/data/images.generated.ts berisi ukuran tiap gambar (anti-CLS).
// Jalankan: npm run optimize-images
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { manifest } from './image-manifest.mjs';

const ROOT = path.resolve('..'); // folder "Studio AG/"
const OUT = 'public/images';
const HERO_MAX = 2000;
const GALLERY_MAX = 1600;
const THUMB_MAX = 640;

// Putar sesuai EXIF ke buffer dulu, baru crop (metadata() memberi ukuran sebelum rotasi)
async function load(src, crop) {
  const { data, info } = await sharp(path.join(ROOT, src))
    .rotate()
    .toBuffer({ resolveWithObject: true });
  if (!crop) return sharp(data);
  const top = Math.min(crop.top, info.height - 1);
  const height = Math.min(crop.height, info.height - top);
  return sharp(await sharp(data).extract({ left: 0, top, width: info.width, height }).toBuffer());
}

async function write(img, max, target) {
  const { width, height } = await img
    .clone()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(target);
  return { width, height };
}

const generated = {};
let count = 0;
for (const [slug, items] of Object.entries(manifest)) {
  const isSite = slug === '_situs';
  const dir = isSite ? path.join(OUT, 'situs') : path.join(OUT, 'proyek', slug);
  await mkdir(dir, { recursive: true });
  generated[slug] = [];
  for (const [i, item] of items.entries()) {
    const name = item.name ?? `${String(i + 1).padStart(2, '0')}-${item.kind}`;
    const img = await load(item.src, item.crop);
    const max = name === 'hero' || i === 0 ? HERO_MAX : GALLERY_MAX;
    const size = await write(img, max, path.join(dir, `${name}.webp`));
    await write(img, THUMB_MAX, path.join(dir, `${name}-thumb.webp`));
    // Versi JPG kecil untuk pratinjau link (WhatsApp tidak selalu menampilkan WebP)
    if (i === 0) {
      await img
        .clone()
        .resize({ width: 1200, height: 630, fit: 'cover' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(dir, 'og.jpg'));
    }
    const base = `/${dir.replaceAll(path.sep, '/').replace(/^public\//, '')}/${name}`;
    generated[slug].push({
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      kind: item.kind,
      ...size,
    });
    count++;
  }
  console.log(`✓ ${slug}: ${items.length} gambar`);
}

// Logo resmi (assets/Logo.jpg, 1080×1080): wordmark untuk header/footer, simbol untuk favicon
const LOGO = path.join(ROOT, 'assets/Logo.jpg');
await mkdir('public/brand', { recursive: true });
await sharp(LOGO)
  .extract({ left: 60, top: 440, width: 960, height: 200 })
  .resize({ height: 96 })
  .webp({ quality: 90 })
  .toFile('public/brand/logo-wordmark.webp');
await sharp(LOGO)
  .extract({ left: 40, top: 40, width: 1000, height: 1000 })
  .resize(512)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/brand/logo.jpg');
const symbol = sharp(LOGO).extract({ left: 560, top: 420, width: 240, height: 240 });
await symbol.clone().resize(192).png().toFile('src/app/icon.png');
await sharp(LOGO)
  .extract({ left: 40, top: 40, width: 1000, height: 1000 })
  .resize(180)
  .png()
  .toFile('src/app/apple-icon.png');
console.log('✓ logo');

const ts = `// FILE OTOMATIS dari scripts/optimize-images.mjs — jangan diedit manual.
export type GeneratedImage = {
  src: string;
  thumb: string;
  kind: 'foto' | 'render' | 'before' | 'after' | 'workshop';
  width: number;
  height: number;
};

export const generatedImages: Record<string, GeneratedImage[]> = ${JSON.stringify(generated, null, 2)};
`;
await writeFile('src/data/images.generated.ts', ts);
console.log(`Selesai: ${count} gambar diproses.`);
