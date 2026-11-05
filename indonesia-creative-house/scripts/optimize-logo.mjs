// Logo ICH dari assets/logo-ich.jpg: dipotong bulat agar latar anyaman hilang, EXIF dibuang.
// Jalankan: node scripts/optimize-logo.mjs
import sharp from 'sharp';

const SIZE = 1080;
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="540" cy="540" r="532"/></svg>`,
);
const round = await sharp('assets/logo-ich.jpg')
  .rotate()
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(round).resize(256).webp({ quality: 85 }).toFile('public/images/logo.webp');
await sharp(round).resize(192).png().toFile('src/app/icon.png');
await sharp(round)
  .resize(180)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('src/app/apple-icon.png');
console.log('✓ logo selesai');
