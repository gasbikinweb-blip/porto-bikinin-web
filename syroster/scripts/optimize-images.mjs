// Optimasi gambar dengan sharp. File asli di assets-src/ TIDAK ditimpa.
// Jalankan: npm run optimize-images  (aman di Windows, tanpa perintah shell)
// Catatan: sharp tidak menyalin metadata (EXIF/GPS) kecuali diminta, jadi hasil sudah bersih.
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_GALLERY = 'assets-src/gallery';
const SRC_LOGO = 'assets-src/brand/logo.png';
const OUT_GALLERY = 'public/images/galeri';
const OUT_BRAND = 'public/brand';
const MAX_WIDTH = 1600;
const THUMB_WIDTH = 640;
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Slug: huruf kecil, tanpa spasi/kurung
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

await mkdir(OUT_GALLERY, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });

// ---------- Foto galeri ----------
for (const file of await readdir(SRC_GALLERY)) {
  if (!EXT.has(path.extname(file).toLowerCase())) continue;
  const src = path.join(SRC_GALLERY, file);
  const slug = slugify(file);
  const meta = await sharp(src).metadata();
  await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT_GALLERY, `${slug}.webp`));
  await sharp(src)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(path.join(OUT_GALLERY, `${slug}-thumb.webp`));
  console.log(`✓ ${file} (${meta.width}x${meta.height}) -> ${slug}.webp + thumb`);
}

// ---------- Foto produk (assets-src/products/<slug>/NN.jpg -> public/images/produk/<slug>/) ----------
const SRC_PRODUCTS = 'assets-src/products';
const OUT_PRODUCTS = 'public/images/produk';
for (const slug of await readdir(SRC_PRODUCTS).catch(() => [])) {
  const dir = path.join(SRC_PRODUCTS, slug);
  await mkdir(path.join(OUT_PRODUCTS, slug), { recursive: true });
  for (const file of await readdir(dir)) {
    if (!EXT.has(path.extname(file).toLowerCase())) continue;
    const src = path.join(dir, file);
    const name = slugify(file);
    await sharp(src)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT_PRODUCTS, slug, `${name}.webp`));
    await sharp(src)
      .rotate()
      .resize({ width: 560, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(path.join(OUT_PRODUCTS, slug, `${name}-thumb.webp`));
  }
  console.log(`✓ produk/${slug}`);
}

// ---------- Logo ----------
// Latar putih dibuat transparan (piksel hampir putih -> alpha 0, tepi dihaluskan).
// Desain logo tidak diubah: warna dan bentuk asli dipertahankan.
const { data, info } = await sharp(SRC_LOGO)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const LOW = 170; // di bawah ini (kanal terendah) = piksel logo penuh
const HIGH = 245; // di atas ini = latar putih
const colorCount = new Map();
for (let i = 0; i < data.length; i += 4) {
  const min = Math.min(data[i], data[i + 1], data[i + 2]);
  const alpha = min <= LOW ? 255 : min >= HIGH ? 0 : Math.round(((HIGH - min) / (HIGH - LOW)) * 255);
  data[i + 3] = alpha;
  if (alpha === 255) {
    // Kuantisasi kasar untuk analisis warna dominan
    const key = [data[i], data[i + 1], data[i + 2]].map((c) => Math.round(c / 16) * 16).join(',');
    colorCount.set(key, (colorCount.get(key) ?? 0) + 1);
  }
}
const transparent = sharp(data, { raw: info }).png();
const trimmedBuf = await transparent.toBuffer().then((b) => sharp(b).trim().toBuffer());
const trimmed = await sharp(trimmedBuf).metadata();

for (const w of [200, 400, 800]) {
  await sharp(trimmedBuf).resize({ width: w }).webp({ quality: 90 }).toFile(`${OUT_BRAND}/logo-${w}.webp`);
}
await sharp(trimmedBuf).resize({ width: 400 }).png({ compressionLevel: 9 }).toFile(`${OUT_BRAND}/logo-400.png`);

// Favicon & ikon: memakai bagian simbol atap (sisi kiri logo) agar tetap terbaca di ukuran kecil
const markWidth = Math.round(trimmed.height * 0.9);
const markBuf = await sharp(trimmedBuf)
  .extract({ left: 0, top: 0, width: Math.min(markWidth, trimmed.width), height: trimmed.height })
  .trim()
  .toBuffer();
const square = (size, bg) =>
  sharp(markBuf)
    .resize(Math.round(size * 0.8), Math.round(size * 0.8), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(size * 0.1),
      bottom: size - Math.round(size * 0.8) - Math.round(size * 0.1),
      left: Math.round(size * 0.1),
      right: size - Math.round(size * 0.8) - Math.round(size * 0.1),
      background: bg,
    });
await square(256, { r: 255, g: 255, b: 255, alpha: 1 }).png().toFile('src/app/icon.png');
await square(180, { r: 255, g: 255, b: 255, alpha: 1 }).png().toFile('src/app/apple-icon.png');

// Gambar OpenGraph 1200x630: logo di atas latar putih hangat
const ogLogo = await sharp(trimmedBuf).resize({ width: 900 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#faf8f4' } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(`${OUT_BRAND}/og-image.jpg`);

console.log(`✓ Logo asli ${info.width}x${info.height} -> dipotong ${trimmed.width}x${trimmed.height}, transparan`);
console.log('Warna dominan logo (kuantisasi 16):');
[...colorCount.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .forEach(([rgb, n]) => {
    const hex = '#' + rgb.split(',').map((c) => Math.min(255, +c).toString(16).padStart(2, '0')).join('');
    console.log(`  ${hex}  (${n} px)`);
  });
console.log('Selesai.');
