// Mengubah foto produk (lihat products.manifest.mjs) menjadi WebP rasio 4:5 di public/images/produk/[slug]/
// + thumbnail. File asli TIDAK ditimpa. EXIF/GPS otomatis dibuang (tidak memakai withMetadata()).
// Ukuran gambar ditulis ke src/data/images.generated.json (warna swatch ada di src/data/colors.ts).
// Jalankan: npm run optimize-images   (folder sumber bisa diganti lewat env ASSETS_DIR)
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { manifest } from './products.manifest.mjs';

const SRC = process.env.ASSETS_DIR ?? '../assets';
const OUT = 'public/images/produk';
const FULL_W = 1080;
const THUMB_W = 480;
const RATIO = 5 / 4; // tinggi / lebar

// 'shopee:<id>/<file>' atau 'ig:<folder>/<file>' → path asli
const shopeeDirs = await readdir(path.join(SRC, 'shopee'));
function resolve(ref) {
  const [source, rest] = ref.split(':');
  const [dir, ...file] = rest.split('/');
  if (source === 'ig') return path.join(SRC, 'instagram', dir, ...file);
  const folder = shopeeDirs.find((d) => d.startsWith(`${dir}_`));
  if (!folder) throw new Error(`Folder Shopee ${dir} tidak ditemukan`);
  return path.join(SRC, 'shopee', folder, ...file);
}

// Nama file hasil: huruf kecil, tanpa spasi
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

// Crop ke 4:5 (posisi atas-tengah supaya kepala model & jatuhnya hijab aman), lalu resize
async function convert(source, target, width) {
  if (await isFresh(source, target)) return false;
  // Terapkan rotasi EXIF dulu, baru ukur (metadata() membaca ukuran sebelum rotasi)
  const { data, info } = await sharp(source).rotate().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const cropW = Math.min(w, Math.floor(h / RATIO));
  const cropH = Math.min(h, Math.floor(cropW * RATIO));
  await sharp(data)
    .extract({
      left: Math.floor((w - cropW) / 2),
      top: Math.floor((h - cropH) * 0.2),
      width: cropW,
      height: cropH,
    })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(target);
  return true;
}

const data = {};
let count = 0;
for (const p of manifest) {
  const dir = path.join(OUT, p.slug);
  await mkdir(dir, { recursive: true });
  const entries = [
    ...p.gallery.map((ref, i) => ({ ref, name: `${p.slug}-${i + 1}`, color: null })),
    ...Object.entries(p.colors).map(([color, ref]) => ({
      ref,
      name: `${p.slug}-${slugify(color)}`,
      color,
    })),
  ];
  for (const e of entries) {
    const source = resolve(e.ref);
    const full = path.join(dir, `${e.name}.webp`);
    if (await convert(source, full, FULL_W)) count++;
    if (await convert(source, path.join(dir, `${e.name}-thumb.webp`), THUMB_W)) count++;
    const meta = await sharp(full).metadata();
    data[`/images/produk/${p.slug}/${e.name}.webp`] = {
      width: meta.width,
      height: meta.height,
    };
  }
  console.log(`✓ ${p.slug}: ${entries.length} foto`);
}

await writeFile('src/data/images.generated.json', `${JSON.stringify(data, null, 2)}\n`);
console.log(`Selesai: ${count} file baru diproses.`);
