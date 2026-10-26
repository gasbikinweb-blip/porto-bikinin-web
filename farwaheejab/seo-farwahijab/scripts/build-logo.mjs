// Logo: ../assets/logo/Logo.jpg (mocha di atas krem) → mask PNG transparan.
// Warna logo diatur lewat CSS (bg-current + mask), jadi satu file cocok untuk mode terang & gelap.
import sharp from 'sharp';

const SRC = '../assets/logo/Logo.jpg';
const BG = 241; // perkiraan luminans latar krem
const INK = 135; // perkiraan luminans tinta mocha

const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < data.length; i++) {
  const a = Math.round(Math.min(1, Math.max(0, (BG - data[i]) / (BG - INK))) * 255);
  rgba[i * 4 + 3] = a < 12 ? 0 : a;
}
const mask = () => sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });

// Monogram "fa" + daun, logo lengkap, dan tulisan "farwa" saja
const crops = {
  'logo-mark': { left: 330, top: 200, width: 390, height: 420 },
  'logo-full': { left: 190, top: 200, width: 710, height: 600 },
  'logo-word': { left: 190, top: 605, width: 710, height: 190 },
};
for (const [name, box] of Object.entries(crops)) {
  const buf = await mask().extract(box).png().toBuffer();
  const out = await sharp(buf).trim({ threshold: 0 }).png({ compressionLevel: 9 }).toFile(`public/brand/${name}.png`);
  console.log(name, out.width, out.height);
}

// Favicon: monogram mocha di atas krem
const mark = await sharp('public/brand/logo-mark.png').resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
const tinted = await sharp({ create: { width: 380, height: 380, channels: 4, background: '#4a3229' } })
  .composite([{ input: mark, blend: 'dest-in' }]).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#f6efe7' } })
  .composite([{ input: tinted, gravity: 'center' }]).png().toFile('src/app/icon.png');
console.log('icon.png');
