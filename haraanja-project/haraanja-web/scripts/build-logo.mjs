// Membuat logo transparan (terang & gelap) + favicon dari assets-src/logo/logo.jpg
import sharp from 'sharp';
const src = 'assets-src/logo/logo.jpg';
const { data, info } = await sharp(src)
  .extract({ left: 40, top: 440, width: 1000, height: 190 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const make = (dark) => {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const [r, g, b] = [out[i], out[i + 1], out[i + 2]];
    const min = Math.min(r, g, b);
    // putih → transparan (alpha dari kegelapan/saturasi)
    const a = Math.max(0, Math.min(255, (255 - min) * 1.6));
    out[i + 3] = a;
    const isText = Math.max(r, g, b) - min < 40; // teks abu gelap (bukan emas)
    if (isText) {
      const c = dark ? 0xf5 : 0x2b;
      out[i] = c; out[i + 1] = dark ? 0xee : 0x24; out[i + 2] = dark ? 0xe6 : 0x26;
    }
  }
  return sharp(out, { raw: info });
};
await make(false).trim().png().toFile('public/logo.png');
await make(true).trim().png().toFile('public/logo-dark.png');
await sharp(src).extract({ left: 40, top: 440, width: 1000, height: 190 }).toFile('scratch-check.png').catch(()=>{});
const m = await sharp('public/logo.png').metadata();
console.log(m.width, m.height);

// Favicon bulat: huruf "H" dari logo di tengah lingkaran putih bercincin emas
const S = 512;
const h = await make(false)
  .extract({ left: 107, top: 16, width: 58, height: 62 })
  .png()
  .toBuffer()
  .then((b) => sharp(b).trim().resize(260, 260, { fit: 'contain', background: '#0000' }).png().toBuffer());
const ring = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9a441"/><stop offset=".5" stop-color="#f6d77a"/><stop offset="1" stop-color="#c8862a"/></linearGradient></defs>
  <circle cx="256" cy="256" r="250" fill="#ffffff"/>
  <circle cx="256" cy="256" r="232" fill="none" stroke="url(#g)" stroke-width="16"/></svg>`);
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><circle cx="256" cy="256" r="250" fill="#fff"/></svg>`);
const icon = await sharp(ring)
  .composite([{ input: h, left: 126, top: 126 }, { input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(icon).toFile('src/app/icon.png');
await sharp(icon).flatten({ background: '#ffffff' }).resize(180, 180).toFile('src/app/apple-icon.png');
