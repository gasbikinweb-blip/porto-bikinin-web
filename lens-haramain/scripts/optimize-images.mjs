// Mengubah foto asli di assets-src/ menjadi WebP terkompresi di public/.
// File asli TIDAK ditimpa. Jalankan: npm run optimize-images
//
// Struktur:
//   assets-src/stories/<slug>/01.jpg ...  -> public/stories/<slug>/01.webp (+ og.jpg dari 01)
//   assets-src/posters/<nama>.jpg         -> public/posters/<nama>.webp (sampul video)
//   assets-src/brand/logo.jpg             -> public/brand/logo-mark.png & logo-full.png (latar transparan)
// Video tidak diproses di sini (lihat README: bagian "Video").
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public';
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const WIDTH = { stories: 1600, posters: 720 };

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
const log = (from, to) => {
  count++;
  console.log(`✓ ${from} -> ${to}`);
};

for (const group of Object.keys(WIDTH)) {
  for await (const file of walk(path.join(SRC, group))) {
    const rel = path.relative(SRC, file);
    const parts = rel.split(path.sep);
    const base = parts.pop().replace(/\.[^.]+$/, '');
    const target = path.join(OUT, ...parts, `${base}.webp`);

    if (!(await isFresh(file, target))) {
      await mkdir(path.dirname(target), { recursive: true });
      await sharp(file)
        .rotate()
        .resize({ width: WIDTH[group], withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(target);
      log(rel, target);
    }

    // Sampul cerita versi JPG kecil untuk pratinjau link WhatsApp/medsos
    if (group === 'stories' && base === '01') {
      const og = path.join(OUT, ...parts, 'og.jpg');
      if (!(await isFresh(file, og))) {
        await sharp(file)
          .rotate()
          .resize({ width: 600, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(og);
        log(rel, og);
      }
    }
  }
}

// Logo: aslinya putih di atas hitam. Kecerahan dijadikan transparansi, sehingga logo
// bisa diwarnai lewat CSS (mask-image) dan tampil benar di mode terang maupun gelap.
const logo = path.join(SRC, 'brand', 'logo.jpg');
const brandOut = path.join(OUT, 'brand');
await mkdir(brandOut, { recursive: true });

async function whiteOnAlpha(region, target, width) {
  if (await isFresh(logo, target)) return;
  const { data, info } = await sharp(logo)
    .extract(region)
    .greyscale()
    .linear(1.6, -60)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const png = await sharp({ create: { width: w, height: h, channels: 3, background: '#ffffff' } })
    .joinChannel(data, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
  await sharp(png).resize({ width }).png({ compressionLevel: 9 }).toFile(target);
  log(logo, target);
}

// Koordinat untuk file logo 500x500: simbol di atas, tulisan di bawahnya
await whiteOnAlpha({ left: 196, top: 106, width: 108, height: 104 }, path.join(brandOut, 'logo-mark.png'), 160);
await whiteOnAlpha({ left: 68, top: 106, width: 364, height: 175 }, path.join(brandOut, 'logo-full.png'), 600);

// Gambar bagikan (Open Graph) 1200x630 dari foto sampul cerita pertama
const ogSrc = path.join(SRC, 'stories', 'senja-di-bukit-makkah', '01.jpg');
const ogOut = path.join(OUT, 'og.jpg');
if (!(await isFresh(ogSrc, ogOut))) {
  await sharp(ogSrc)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogOut);
  log(ogSrc, ogOut);
}

console.log(`Selesai: ${count} gambar diproses.`);
