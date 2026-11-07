// Membuat monogram "Ym" transparan dari assets/Logo.jpg untuk header dan favicon.
// Jalankan sekali: node scripts/make-monogram.mjs
import sharp from 'sharp';

const { data, info } = await sharp('assets/Logo.jpg')
  .extract({ left: 225, top: 140, width: 190, height: 200 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Piksel emas jauh lebih gelap dan lebih "kuning" dari latar cat air; jadikan alpha
const out = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
  const gold = Math.max(0, Math.min(255, (b - (r + g) / 2 + 60) * -4 + 255));
  const a = Math.max(0, Math.min(255, (230 - (r + g + b) / 3) * 3.2));
  out[i * 4] = 154;
  out[i * 4 + 1] = 115;
  out[i * 4 + 2] = 48;
  out[i * 4 + 3] = Math.min(a, gold);
}
const img = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim();
await img.clone().png().toFile('public/brand/monogram.png');
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({
    top: 18,
    bottom: 18,
    left: 18,
    right: 18,
    background: { r: 251, g: 248, b: 243, alpha: 1 },
  })
  .flatten({ background: '#fbf8f3' })
  .resize(256, 256)
  .png()
  .toFile('src/app/icon.png');
console.log('monogram selesai');
