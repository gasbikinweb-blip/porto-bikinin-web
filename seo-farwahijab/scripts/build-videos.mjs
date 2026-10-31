// Kompres video terpilih (videos.manifest.mjs) ke public/videos/: H.264 lebar 540px, audio AAC
// hanya bila video sumber memang bersuara (kalau tidak, tetap tanpa audio),
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
// Cek apakah video sumber punya track audio (ffprobe ikut terpasang bersama ffmpeg)
const hasAudioTrack = (file) =>
  execFileSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'a',
    '-show_entries',
    'stream=index',
    '-of',
    'csv=p=0',
    file,
  ])
    .toString()
    .trim() !== '';

const tmp = mkdtempSync(path.join(tmpdir(), 'farwa-'));
const list = [];

for (const v of videos) {
  const source = path.join(ROOT, v.src);
  const mp4 = path.join(OUT, `${v.name}.mp4`);
  const poster = path.join(OUT, `${v.name}.webp`);
  const hasAudio = hasAudioTrack(source);
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
      ...(hasAudio ? ['-c:a', 'aac', '-b:a', '96k', '-ac', '2'] : ['-an']),
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
    hasAudio,
    sizeKb: Math.round(statSync(mp4).size / 1024),
  });
  console.log(
    `✓ ${v.src} -> ${mp4} (${list.at(-1).sizeKb} KB, ${hasAudio ? 'bersuara' : 'tanpa suara'})`,
  );
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync('src/data/videos.generated.json', `${JSON.stringify(list, null, 2)}\n`);
console.log(`Selesai: ${list.length} video.`);
