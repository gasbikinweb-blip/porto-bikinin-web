// Kompres video terpilih (videos.manifest.mjs) ke public/videos/: H.264 lebar 540px, tanpa audio,
// tanpa metadata, +faststart (bisa mulai diputar sebelum selesai diunduh). Juga membuat poster WebP.
// Daftar & ukuran ditulis ke src/data/videos.generated.json. Video asli tidak diubah.
// Butuh ffmpeg. Install di Windows: `winget install Gyan.FFmpeg`. Jalankan: npm run build-videos
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { videos } from './videos.manifest.mjs';

const ROOT = process.env.SOURCE_DIR ?? '../farwaheejab/assets';
const OUT = 'public/videos';
const WIDTH = 540;

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ffmpeg tidak ditemukan. Install dulu: winget install Gyan.FFmpeg');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), 'farwa-'));
const list = [];

for (const v of videos) {
  const source = path.join(ROOT, v.src);
  const mp4 = path.join(OUT, `${v.name}.mp4`);
  const poster = path.join(OUT, `${v.name}.webp`);
  const fresh = existsSync(mp4) && statSync(mp4).mtimeMs >= statSync(source).mtimeMs;

  if (!fresh) {
    execFileSync('ffmpeg', [
      '-v',
      'error',
      '-y',
      '-ss',
      String(v.start),
      '-t',
      String(v.duration),
      '-i',
      source,
      '-an',
      '-map_metadata',
      '-1',
      '-vf',
      `scale=${WIDTH}:-2`,
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '28',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      mp4,
    ]);
    const frame = path.join(tmp, `${v.name}.jpg`);
    execFileSync('ffmpeg', [
      '-v',
      'error',
      '-y',
      '-ss',
      String(v.poster),
      '-i',
      mp4,
      '-frames:v',
      '1',
      '-q:v',
      '2',
      frame,
    ]);
    await sharp(frame).webp({ quality: 75 }).toFile(poster);
  }

  const { width, height } = await sharp(poster).metadata();
  list.push({
    name: v.name,
    title: v.title,
    src: `/videos/${v.name}.mp4`,
    poster: `/videos/${v.name}.webp`,
    width,
    height,
    duration: v.duration,
    sizeKb: Math.round(statSync(mp4).size / 1024),
  });
  console.log(`✓ ${v.src} -> ${mp4} (${list.at(-1).sizeKb} KB)`);
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync('src/data/videos.generated.json', `${JSON.stringify(list, null, 2)}\n`);
console.log(`Selesai: ${list.length} video.`);
