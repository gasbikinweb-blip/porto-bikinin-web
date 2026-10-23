// Optimasi foto proyek: assets/[Nama Proyek]/* -> public/images/proyek/[slug]/*.webp
// - Tidak menimpa file asli
// - Metadata EXIF/GPS dibuang (sharp tidak menyalin metadata kecuali diminta)
// - Menghasilkan manifest src/data/images.generated.json (ukuran tiap gambar)
import { readdir, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import heicConvert from 'heic-convert';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'assets');
const OUT = path.join(ROOT, 'public', 'images', 'proyek');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');

const HERO_W = 2000; // cover (dipakai hero)
const GALLERY_W = 1600;
const THUMB_W = 720;
const MAX_H = 2000; // batasi foto portrait yang sangat tinggi

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/_s\b/g, 's') // "Mont_s" -> "monts"
    .replace(/['’]/g, '')
    .replace(/\b(at|the)\b/g, ' ')
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const isCover = (f) => /cover/i.test(f);

// sharp prebuilt tidak bisa membaca HEIC (foto iPhone), jadi diubah dulu ke JPEG di memori
async function load(input) {
  if (!/\.hei[cf]$/i.test(input)) return input;
  return Buffer.from(await heicConvert({ buffer: await readFile(input), format: 'JPEG', quality: 0.92 }));
}

async function processOne(input, outBase, maxW) {
  const img = sharp(await load(input), { failOn: 'error' }).rotate(); // rotate() = ikuti orientasi EXIF lalu buang
  const full = await img
    .clone()
    .resize({ width: maxW, height: MAX_H, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`${outBase}.webp`);
  await img
    .clone()
    .resize({ width: THUMB_W, height: Math.round(MAX_H / 2), fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(`${outBase}-thumb.webp`);
  return { width: full.width, height: full.height };
}

async function main() {
  const dirs = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory());
  const manifest = {};
  const skipped = [];

  for (const dir of dirs) {
    const slug = slugify(dir.name);
    const outDir = path.join(OUT, slug);
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });

    const files = (await readdir(path.join(SRC, dir.name)))
      .filter((f) => !f.startsWith('.'))
      .sort((a, b) => Number(isCover(b)) - Number(isCover(a)) || a.localeCompare(b, 'en', { numeric: true }));

    const images = [];
    let n = 0;
    for (const file of files) {
      const input = path.join(SRC, dir.name, file);
      const cover = isCover(file) && images.length === 0;
      const name = cover ? 'cover' : String(++n).padStart(2, '0');
      try {
        const size = await processOne(input, path.join(outDir, name), cover ? HERO_W : GALLERY_W);
        images.push({ file: name, source: file, ...size });
      } catch (err) {
        if (!cover) n--;
        skipped.push(`${dir.name}/${file} (${err.message.split('\n')[0]})`);
      }
    }
    manifest[slug] = { folder: dir.name, images };
    console.log(`✓ ${dir.name} -> ${slug} (${images.length} gambar)`);
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  if (skipped.length) {
    console.warn(`\n⚠ ${skipped.length} file dilewati (format tidak didukung):`);
    skipped.forEach((s) => console.warn('  - ' + s));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
