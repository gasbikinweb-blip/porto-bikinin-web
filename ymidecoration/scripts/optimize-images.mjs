// Mengubah foto di assets/ menjadi WebP di public/images/acara/[slug]/ (galeri 1600px + thumbnail 600px).
// File asli TIDAK ditimpa. EXIF/GPS terbuang karena sharp tidak menyalin metadata.
// Frame video diambil dengan ffmpeg (harus terpasang) hanya untuk acara yang tidak punya foto.
// Jalankan: npm run optimize-images
import { execFileSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS = 'assets';
const OUT = 'public/images';
const GALLERY = 1600;
const THUMB = 600;
const HERO = 2000;

const F1 = 'Folder 1 - Isinya berhubungan semua';
const F2 = 'Folder 2 - Isinya berhubungan semua';
const F3 = 'Folder 3 - Isinya berhubungan semua';
const F4 = 'Folder 4 - Isinya berhubungan semua';
const F5 = 'Folder 5 - Isinya berhubungan semua';
const PUTRI = '2026-10-12_DeYK-MbCwuc/01.mp4';

// Urutan = urutan galeri; foto pertama = cover. `video` + `at` = frame video, `cutBottom` = buang tulisan di bawah.
const events = {
  'della-adil': [
    `${F1}/2026-10-26_De8ZfDOn8lO/02.jpg`,
    `${F1}/2026-10-26_De8ZfDOn8lO/01.jpg`,
    `${F1}/2026-10-26_De8ZfDOn8lO/03.jpg`,
    `${F1}/2026-10-26_De8b2FbH7iJ/01.jpg`,
    `${F1}/2026-10-26_De8b2FbH7iJ/02.jpg`,
    `${F1}/2026-10-26_De8b2FbH7iJ/03.jpg`,
    `${F1}/2026-10-26_De8ZfDOn8lO/05.jpg`,
    `${F1}/2026-10-26_De8ZfDOn8lO/04.jpg`,
  ],
  'berlin-aziz': [
    `${F2}/2026-10-19_DeqLF5mn0xJ/03.jpg`,
    `${F2}/2026-10-19_DeqLF5mn0xJ/01.jpg`,
    `${F2}/2026-10-19_DeqLF5mn0xJ/04.jpg`,
    `${F2}/2026-10-19_DeqLF5mn0xJ/02.jpg`,
  ],
  'shinta-aufar': [
    `${F3}/2025-07-26_DMj4XgRzg4R/02.jpg`,
    `${F3}/2025-07-26_DMj4XgRzg4R/01.jpg`,
    `${F3}/2025-07-26_DMj4XgRzg4R/03.jpg`,
    `${F3}/2025-07-26_DMj6u0ozEx9/01.jpg`,
    `${F3}/2025-07-26_DMj6u0ozEx9/02.jpg`,
    `${F3}/2025-07-26_DMj6u0ozEx9/03.jpg`,
    `${F3}/2025-07-26_DMj6u0ozEx9/04.jpg`,
    `${F3}/2025-07-26_DMj4x4fzlOI/01.jpg`,
    `${F3}/2025-07-26_DMj4x4fzlOI/02.jpg`,
  ],
  'dita-iqbal': [`${F4}/2024-04-26_C6NZYC8B7pK/01.jpg`, `${F4}/2024-04-26_C6NYlUHBkyg/01.jpg`],
  'nina-andre': [
    `${F5}/2023-09-01_Cwoa_s1vmIE/01.jpg`,
    `${F5}/2023-09-01_Cwoa_s1vmIE/02.jpg`,
    `${F5}/2023-09-01_CwoX1jkv5S2/01.jpg`,
  ],
  'putri-luthfi': [
    { video: PUTRI, at: 14.8, cutBottom: 0.12 },
    { video: PUTRI, at: 4.9, cutBottom: 0.12 },
    { video: PUTRI, at: 8.9, cutBottom: 0.12 },
  ],
};

// Frame dari video Highlight untuk kartu Tema & Inspirasi (bukan acara di portofolio).
// Disimpan di public/images/acara/inspirasi/ dengan urutan sesuai daftar ini.
const HANA = 'Hightlight/sorotan_Hana & felix_18196682200291916/04.mp4';
const KADA = 'Hightlight/sorotan_Kada & elen_18046673260670171/02.mp4';
events.inspirasi = [
  { video: HANA, at: 18.5 },
  { video: KADA, at: 8.8, cutBottom: 0.24 },
  { video: KADA, at: 11.3, cutBottom: 0.3 },
  { video: HANA, at: 5 },
  { video: `${F1}/2026-10-26_De8XjiMiw7P/01.mp4`, at: 1.2 },
  { video: `${F1}/2026-10-26_De8XjiMiw7P/01.mp4`, at: 18.5 },
  { video: `${F2}/2026-10-19_DeqJZeQC_yd/01.mp4`, at: 6.5 },
  { video: `${F4}/2024-04-26_C6NYpxoBm4L/01.mp4`, at: 16.5 },
];

// Foto hero (versi lebar 2000px)
const HERO_SRC = `${F1}/2026-10-26_De8ZfDOn8lO/01.jpg`;

async function load(src) {
  if (typeof src === 'string') return sharp(path.join(ASSETS, src)).rotate().toBuffer();
  const png = execFileSync(
    'ffmpeg',
    [
      '-v',
      'error',
      '-ss',
      String(src.at),
      '-i',
      path.join(ASSETS, src.video),
      '-frames:v',
      '1',
      '-f',
      'image2pipe',
      '-vcodec',
      'png',
      '-',
    ],
    { maxBuffer: 1e8 },
  );
  const meta = await sharp(png).metadata();
  const height = Math.round(meta.height * (1 - (src.cutBottom ?? 0)));
  return sharp(png).extract({ left: 0, top: 0, width: meta.width, height }).toBuffer();
}

await rm(OUT, { recursive: true, force: true });
const manifest = {};
const low = [];

for (const [slug, list] of Object.entries(events)) {
  const dir = path.join(OUT, 'acara', slug);
  await mkdir(dir, { recursive: true });
  manifest[slug] = [];
  for (const [i, src] of list.entries()) {
    const name = String(i + 1).padStart(2, '0');
    const input = await load(src);
    const full = await sharp(input)
      .resize({ width: GALLERY, height: GALLERY, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${name}.webp`));
    await sharp(input)
      .resize({ width: THUMB, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(path.join(dir, `${name}-thumb.webp`));
    if (Math.max(full.width, full.height) < 1000) low.push(`${slug}/${name}`);
    manifest[slug].push({
      src: `/images/acara/${slug}/${name}.webp`,
      thumb: `/images/acara/${slug}/${name}-thumb.webp`,
      width: full.width,
      height: full.height,
    });
  }
  console.log(`✓ ${slug}: ${list.length} foto`);
}

const hero = await sharp(path.join(ASSETS, HERO_SRC))
  .rotate()
  .resize({ width: HERO, withoutEnlargement: true })
  .webp({ quality: 78 })
  .toFile(path.join(OUT, 'hero.webp'));
await sharp(path.join(ASSETS, HERO_SRC))
  .rotate()
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'));
// Favicon dan monogram dibuat oleh scripts/make-monogram.mjs

await writeFile(
  'src/data/images.generated.json',
  `${JSON.stringify({ hero: { src: '/images/hero.webp', width: hero.width, height: hero.height }, events: manifest }, null, 2)}\n`,
);
console.log(`Selesai. Di bawah 1000px: ${low.join(', ') || 'tidak ada'}`);
