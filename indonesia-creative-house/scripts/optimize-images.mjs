// Mengubah foto Instagram di assets menjadi WebP di public/images/menu/[slug]/.
// File asli TIDAK ditimpa. EXIF/GPS terbuang karena sharp tidak menyalin metadata secara default.
// Jalankan: npm run optimize-images
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('assets');
const OUT = 'public/images';
const FULL = 1400;
const THUMB = 500;
const MAX_PER_ITEM = 4;

// slug -> kode postingan sumber + porsi atas yang dipotong (membuang judul pink di foto)
const items = {
  'snack-box': { codes: ['DfB5xr4k0mG', 'DeN5FOEk3dc'], cut: 0.14 },
  'snack-besekan': { codes: ['DfL1y7rEzlh', 'DfG2mTkE9fD'], cut: 0.14 },
  'snack-cup': { codes: ['DeqvIXbE69-'], cut: 0.3 },
  'rantang-jajanan-pasar': { codes: ['DUpjGdmk7FC'], cut: 0 },
  'tampah-kue-jajanan-pasar': { codes: ['De_RQ9TE5IW', 'DebTtJDE13w'], cut: 0.3 },
  'tampah-merah-putih': { codes: ['DcC-W7nk_0E'], cut: 0 },
  'tampah-rebusan': { codes: ['DUphiQ5ExMX'], cut: 0 },
  'tampah-rujak': { codes: ['DUpi8QRE3EY'], cut: 0 },
  'nasi-tumpeng': { codes: ['Ded5jqlk3Um'], cut: 0.14 },
  'nasi-box': { codes: ['Ded6BJMEw5l'], cut: 0.14 },
  'nasi-besek': { codes: ['Ded5yi2EziS'], cut: 0.14 },
  'nasi-cup': { codes: ['Ded6vqkTRvS'], cut: 0.14 },
  'nasi-rantang': { codes: ['Ded6lmYzHrA'], cut: 0.14 },
  'nasi-bakul': { codes: ['Ded66ysTj0K'], cut: 0.14 },
  'tumpeng-cenil': { codes: ['DfOvxwRk4-k'], cut: 0.14 },
  'tampah-cenil-set': { codes: ['DeWOx5rk18E'], cut: 0.14 },
  'cenil-besek': { codes: ['DfOwO3qE3Z6'], cut: 0.14 },
  'cenil-cup': { codes: ['DfRKMrXE4C1'], cut: 0.14 },
  'pempek-tampah': { codes: ['DfTwjqME-BC'], cut: 0.14 },
  'pempek-besek': { codes: ['DfTw-ewE4f0'], cut: 0.2 },
  'pempek-rantang': { codes: ['DebRIJsky3f'], cut: 0.2 },
  'dimsum-tampah': { codes: ['DfRVMFKE4Cj'], cut: 0.14 },
  'dimsum-besek-cup': { codes: ['DfRVoycE9jr'], cut: 0.2 },
  'dimsum-rantang': { codes: ['DfRVxUoE1al'], cut: 0.14 },
  'tampah-bubur-kendil': { codes: ['DeLrMXxTUk1'], cut: 0.2 },
  'bubur-manis-cup': { codes: ['DeL6cunE363'], cut: 0.2 },
  'serabi-tart': { codes: ['DUpkw5XkyCI'], cut: 0 },
  'onde-tart': { codes: ['DUpk4AEkxW5'], cut: 0 },
  'lapis-legit': { codes: ['DUpfln6k_WP'], cut: 0 },
  'hantaran-rantang-cantik': { codes: ['DeikNwAk64v'], cut: 0.3 },
  'hantaran-lamaran': { codes: ['Dch0eo5E9P3'], cut: 0 },
  'hampers-takjil-ramadhan': { codes: ['DUsHrUwEzNX'], cut: 0 },
};

const folders = await readdir(ROOT);
const low = [];

await rm(OUT, { recursive: true, force: true });
const manifest = {};

for (const [slug, { codes, cut }] of Object.entries(items)) {
  const dir = path.join(OUT, 'menu', slug);
  await mkdir(dir, { recursive: true });
  const files = [];
  for (const code of codes) {
    const folder = folders.find((n) => n.endsWith(`_${code}`));
    if (!folder) throw new Error(`Folder tidak ditemukan: ${code}`);
    const names = (await readdir(path.join(ROOT, folder)))
      .filter((n) => /\.jpe?g$/i.test(n))
      .sort();
    files.push(...names.map((n) => path.join(ROOT, folder, n)));
  }
  manifest[slug] = [];
  for (const [i, file] of files.slice(0, MAX_PER_ITEM).entries()) {
    const name = String(i + 1).padStart(2, '0');
    const meta = await sharp(file).rotate().metadata();
    const top = Math.round(meta.height * cut);
    const cropped = await sharp(file)
      .rotate()
      .extract({ left: 0, top, width: meta.width, height: meta.height - top })
      .png()
      .toBuffer();
    const full = await sharp(cropped)
      .resize({ width: FULL, height: FULL, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${name}.webp`));
    await sharp(cropped)
      .resize({ width: THUMB })
      .webp({ quality: 76 })
      .toFile(path.join(dir, `${name}-thumb.webp`));
    if (Math.max(full.width, full.height) < 800) low.push(`${slug}/${name}`);
    manifest[slug].push({
      src: `/images/menu/${slug}/${name}.webp`,
      thumb: `/images/menu/${slug}/${name}-thumb.webp`,
      width: full.width,
      height: full.height,
    });
  }
  console.log(`✓ ${slug}: ${manifest[slug].length} foto`);
}

// Gambar pratinjau link (WhatsApp/medsos)
await sharp(path.join(OUT, 'menu', 'tampah-kue-jajanan-pasar', '01.webp'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'og.jpg'));

await writeFile('src/data/images.generated.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Selesai. Foto di bawah 800px: ${low.join(', ') || 'tidak ada'}`);
