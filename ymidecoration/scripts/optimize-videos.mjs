// Memotong video Instagram di assets/ menjadi klip latar hero 10 detik tanpa suara + poster.
// Butuh ffmpeg terpasang. Jalankan: npm run optimize-videos
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

// start = detik mulai; tulisan "story by YMIDECORATION" di bawah dipotong lewat crop
const clips = {
  'della-adil': {
    src: 'Folder 1 - Isinya berhubungan semua/2026-10-26_De8XjiMiw7P/01.mp4',
    start: 8,
  },
  'putri-luthfi': { src: '2026-10-12_DeYK-MbCwuc/01.mp4', start: 4 },
  'berlin-aziz': {
    src: 'Folder 2 - Isinya berhubungan semua/2026-10-19_DeqJZeQC_yd/01.mp4',
    start: 4.5,
  },
  'dita-iqbal': {
    src: 'Folder 4 - Isinya berhubungan semua/2024-04-26_C6NYpxoBm4L/01.mp4',
    start: 0,
  },
};

const OUT = 'public/videos';
mkdirSync(OUT, { recursive: true });
const crop = 'crop=iw:ih*0.88:0:0';

for (const [slug, { src, start }] of Object.entries(clips)) {
  const input = `assets/${src}`;
  const mp4 = `${OUT}/${slug}.mp4`;
  // -an buang suara, -map_metadata -1 buang metadata
  execFileSync('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-ss',
    String(start),
    '-t',
    '10',
    '-i',
    input,
    '-an',
    '-map_metadata',
    '-1',
    '-vf',
    `${crop},scale=720:-2`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '27',
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
    String(start + 0.5),
    '-i',
    input,
    '-frames:v',
    '1',
    '-map_metadata',
    '-1',
    '-vf',
    `${crop},scale=720:-2`,
    '-q:v',
    '72',
    `${OUT}/${slug}.webp`,
  ]);
  console.log(`✓ ${slug}: ${(statSync(mp4).size / 1048576).toFixed(1)} MB`);
}
