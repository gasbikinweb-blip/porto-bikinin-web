// Mengecilkan video Instagram di assets menjadi public/videos/[slug].mp4 + poster .webp, tanpa suara.
// Butuh ffmpeg terpasang. Jalankan: npm run optimize-videos
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

const videos = {
  'nasi-tumpeng': '2026-10-20_DetEPwdTgT-',
  'pempek-tampah': '2026-10-20_DetFKvuTG-w',
  'tumpeng-cenil': '2026-10-20_DetNFL7Tawa',
  'snack-besekan': '2026-10-20_DetOUy9Tir0',
  'rantang-jajanan-pasar': '2026-10-20_DetL6wNzMPL',
  'snack-cup': '2026-10-20_DetOucTzSzi',
};

const OUT = 'public/videos';
mkdirSync(OUT, { recursive: true });

for (const [slug, folder] of Object.entries(videos)) {
  const src = `assets/${folder}/01.mp4`;
  const mp4 = `${OUT}/${slug}.mp4`;
  // -map_metadata -1 membuang metadata, -an membuang suara
  execFileSync('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-i',
    src,
    '-an',
    '-map_metadata',
    '-1',
    '-vf',
    'scale=480:-2',
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
  execFileSync('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-ss',
    '2',
    '-i',
    src,
    '-frames:v',
    '1',
    '-map_metadata',
    '-1',
    '-vf',
    'scale=480:-2',
    '-q:v',
    '70',
    `${OUT}/${slug}.webp`,
  ]);
  console.log(`✓ ${slug}: ${(statSync(mp4).size / 1048576).toFixed(1)} MB`);
}
