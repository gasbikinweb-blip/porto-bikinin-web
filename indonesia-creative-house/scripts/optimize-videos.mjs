// Mengecilkan video Instagram di assets menjadi public/videos/[slug].mp4 + poster .webp, suara tetap ada.
// Butuh ffmpeg terpasang. Jalankan: npm run optimize-videos
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

// Video asli (pemilik memperlihatkan produknya), bukan slideshow foto
const videos = {
  'nasi-tumpeng': '2026-04-18_DXQZbqXE3BA',
  'snack-box': '2026-04-28_DXqGv3ek5sE',
  'hantaran-lamaran': '2026-04-18_DXQNtUIk4y0',
  'tampah-jajanan-pasar': '2026-03-05_DVfMsXMk0F5',
  'nampan-bambu': '2026-03-02_DVYLY-nk6Bc',
  'ayam-kodok': '2026-03-10_DVsPnCLkxen',
  'snack-cup': '2026-03-10_DVsjwQME_Je',
  'nasi-bakul': '2026-03-12_DVx9jPVk5N2',
};

const OUT = 'public/videos';
mkdirSync(OUT, { recursive: true });

for (const [slug, folder] of Object.entries(videos)) {
  const src = `assets/${folder}/01.mp4`;
  const mp4 = `${OUT}/${slug}.mp4`;
  // -map_metadata -1 membuang metadata; suara dikompres ke AAC
  execFileSync('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-i',
    src,
    '-c:a',
    'aac',
    '-b:a',
    '64k',
    '-map_metadata',
    '-1',
    '-vf',
    'scale=480:-2',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '30',
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
