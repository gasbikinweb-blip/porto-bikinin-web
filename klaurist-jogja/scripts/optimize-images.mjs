// Mengolah aset dari assets/ menjadi WebP di public/images/ (maks 1200px + thumbnail 500px).
// File asli TIDAK ditimpa. Metadata EXIF/GPS dibuang (sharp tidak menyalinnya).
// Nama penerima di foto papan DISAMARKAN (blur) sampai ada izin pemilik & pelanggan.
// Jalankan: npm run optimize-images
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.env.ASSETS_DIR ?? 'assets';
const OUT = path.join('public', 'images');

// Foto yang dipakai. `crop` = potong dari poster [kiri, atas, lebar, tinggi];
// `blur` = kotak yang disamarkan (nama orang). Semua koordinat dalam piksel foto asli.
const TS = 'klaurist.akrilik/2026-06-09_DZX0TsMthng/01.jpg'; // poster harga papan
const VO = 'klaurist.akrilik/2026-06-09_DZX0VoeNrAJ/01.jpg'; // poster bucket spesial
const RD = 'klaurist.akrilik/2026-06-16_DZpY5F5GNW2/01.jpg'; // poster round daisy
const BL = 'klaurist.akrilik/2026-06-16_DZpZC1oGBEB/01.jpg'; // poster Klaurist Bloom (satuan)
const PK = 'klaurist.akrilik/2026-06-16_DZpZItbmOGX/01.jpg'; // poster paket 6 tangkai
const NB1 = 'klaurist.akrilik/2026-07-14_Daxtv1pFDki/01.jpg'; // koleksi papan baru
const NB2 = 'klaurist.akrilik/2026-07-14_Daxtv1pFDki/02.jpg';
const bloomCols = [111, 450, 765];
const bloomRows = [400, 715, 1045];
const bloom = ['mawar', 'tulip', 'lili-2-warna', 'sunflower', 'lily', 'peony', 'mini-daisy', 'gerbera', 'lavender'];

const photos = [
  {
    slug: 'papan-round-wisuda',
    file: 'klaurist.akrilik/DeqhDmBH3Sd/03.jpg',
    // Nama wisudawan, ucapan, dan nama pengirim di papan
    blur: [[760, 1900, 820, 360]],
  },
  { slug: 'papan-round', file: TS, crop: [60, 50, 200, 430] },
  { slug: 'papan-kubah', file: TS, crop: [270, 40, 185, 440] },
  { slug: 'standing-akrilik', file: TS, crop: [480, 30, 180, 450] },
  { slug: 'papan-wave', file: NB1, crop: [375, 405, 540, 555] },
  // Foto kecil di poster: wajah & nama di papan disamarkan
  { slug: 'papan-wave-acara', file: NB2, crop: [180, 270, 495, 450] },
  { slug: 'velvet-maroon', file: VO, crop: [130, 90, 250, 280] },
  { slug: 'blue-ocean', file: VO, crop: [140, 395, 230, 250] },
  { slug: 'blue-round-daisy', file: VO, crop: [140, 690, 250, 290] },
  { slug: 'round-daisy', file: RD, crop: [760, 950, 300, 340] },
  { slug: 'paket-lilu', file: PK, crop: [144, 270, 246, 300] },
  { slug: 'paket-limaw', file: PK, crop: [720, 850, 240, 310] },
  ...bloom.map((n, i) => ({
    slug: `satuan-${n}`,
    file: BL,
    crop: [bloomCols[i % 3] + 5, bloomRows[Math.floor(i / 3)], 160, 180],
  })),
  // Poster asli untuk galeri pricelist (poster "Coming Soon" tidak dipakai)
  ...[
    ['poster-kenapa', 'klaurist.akrilik/2026-06-09_DZX0bmgSIYF/01.jpg'],
    ['poster-papan', TS],
    ['poster-bucket', VO],
    ['poster-round-daisy', RD],
    ['poster-bloom', BL],
    ['poster-paket', PK],
    ['poster-papan-baru-1', NB1],
    ['poster-papan-baru-2', NB2],
  ].map(([slug, file]) => ({ slug, file })),
];

await mkdir(OUT, { recursive: true });

for (const p of photos) {
  // Putar sesuai EXIF dulu ke buffer, baru dipotong/diblur
  let img = await sharp(path.join(SRC, p.file)).rotate().toBuffer();
  if (p.crop) {
    const [left, top, width, height] = p.crop;
    img = await sharp(img).extract({ left, top, width, height }).toBuffer();
  }
  for (const [left, top, width, height] of p.blur ?? []) {
    const patch = await sharp(img).extract({ left, top, width, height }).blur(28).toBuffer();
    img = await sharp(img)
      .composite([{ input: patch, left, top }])
      .toBuffer();
  }
  for (const [suffix, width] of [
    ['', 1200],
    ['-thumb', 500],
  ]) {
    await sharp(img)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${p.slug}${suffix}.webp`));
  }
  const meta = await sharp(img).resize({ width: 1200, withoutEnlargement: true }).toBuffer({ resolveWithObject: true });
  console.log(`✓ ${p.slug} (${meta.info.width}x${meta.info.height})`);
}

// Logo: dipotong bulat, untuk header/footer dan ikon
const logoSrc = path.join(SRC, 'logo.jpg');
const { width: lw = 320 } = await sharp(logoSrc).metadata();
const r = Math.floor(lw / 2) - 2;
const mask = Buffer.from(
  `<svg width="${lw}" height="${lw}"><circle cx="${lw / 2}" cy="${lw / 2}" r="${r}"/></svg>`,
);
const round = await sharp(logoSrc)
  .rotate()
  .resize(lw, lw)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(round).resize(256).webp({ quality: 88 }).toFile(path.join(OUT, 'logo.webp'));
await sharp(round)
  .resize(192)
  .png()
  .toFile(path.join('src', 'app', 'icon.png'));
await sharp(round)
  .resize(180)
  .flatten({ background: '#fbf6f2' })
  .png()
  .toFile(path.join('src', 'app', 'apple-icon.png'));
if (lw < 512) console.warn(`! Logo hanya ${lw}px, minta versi lebih besar ke pemilik.`);

// Gambar pratinjau link (OG) 1200x630 JPG
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbf6f2"/>
  <circle cx="1050" cy="80" r="220" fill="#f4dcdc"/>
  <circle cx="120" cy="600" r="180" fill="#e7ede3"/>
  <text x="80" y="250" font-family="Georgia, serif" font-size="74" fill="#3f2a33">Klaurist Jogja</text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-size="34" fill="#9b4a63">Sewa Papan Akrilik &amp; Bucket Bunga Non-Fresh</text>
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="28" fill="#5d4650">Awet, aesthetic, ramah di kantong · Yogyakarta</text>
</svg>`);
await sharp(og)
  .composite([{ input: await sharp(round).resize(260).png().toBuffer(), left: 860, top: 250 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'));
console.log('✓ logo, ikon, og.jpg');
