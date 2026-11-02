// Kompres video Instagram toko dari "video ig/" menjadi MP4 ringan + poster WebP di public/videos/.
// Butuh ffmpeg di PATH. Metadata (lokasi, dll.) dibuang. Jalankan: npm run optimize-videos
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { videos } from './videos.manifest.mjs';

const SRC = process.env.VIDEO_DIR ?? 'video ig';
const OUT = path.join('public', 'videos');
mkdirSync(OUT, { recursive: true });

const fresh = (src, out) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

for (const v of videos) {
  const src = path.join(SRC, v.folder, '01.mp4');
  const mp4 = path.join(OUT, `${v.slug}.mp4`);
  const poster = path.join(OUT, `${v.slug}.webp`);
  if (!fresh(src, mp4)) {
    // Lebar 480px (video vertikal), H.264 + AAC agar jalan di semua HP, faststart agar cepat mulai
    execFileSync('ffmpeg', [
      '-v',
      'error',
      '-y',
      '-i',
      src,
      '-vf',
      'scale=480:-2',
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '30',
      '-c:a',
      'aac',
      '-b:a',
      '64k',
      '-movflags',
      '+faststart',
      '-map_metadata',
      '-1',
      mp4,
    ]);
    console.log(`✓ ${mp4} (${(statSync(mp4).size / 1e6).toFixed(1)} MB)`);
  }
  if (!fresh(src, poster)) {
    execFileSync('ffmpeg', [
      '-v',
      'error',
      '-y',
      '-ss',
      String(v.posterAt ?? 1),
      '-i',
      src,
      '-frames:v',
      '1',
      '-vf',
      'scale=480:-2',
      '-c:v',
      'libwebp',
      '-quality',
      '75',
      poster,
    ]);
    console.log(`✓ ${poster}`);
  }
}
