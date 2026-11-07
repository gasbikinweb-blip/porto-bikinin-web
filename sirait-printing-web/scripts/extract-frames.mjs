// Ambil 2 frame (di 30% dan 70% durasi) dari setiap video di assets/ untuk dipilih manual.
// Hasil JPG ditulis ke ../sirait-printing/frames/ (di luar project, tidak ikut build/commit). Video asli tidak diubah.
// Butuh ffmpeg + ffprobe. Install di Windows: `winget install Gyan.FFmpeg`, lalu buka ulang terminal.
// Jalankan: npm run extract-frames   (folder sumber bisa diganti lewat env ASSETS_DIR)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SRC = process.env.ASSETS_DIR ?? '../sirait-printing/assets';
const OUT = process.env.FRAMES_DIR ?? '../sirait-printing/frames';
const POINTS = [0.3, 0.7];

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ffmpeg tidak ditemukan. Install dulu: winget install Gyan.FFmpeg');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
let count = 0;
for (const folder of readdirSync(SRC)) {
  const dir = path.join(SRC, folder);
  let files;
  try {
    files = readdirSync(dir).filter((f) => /\.(mp4|mov|webm)$/i.test(f));
  } catch {
    continue;
  }
  for (const file of files) {
    const video = path.join(dir, file);
    const duration = Number(
      execFileSync('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=nw=1:nk=1',
        video,
      ]).toString(),
    );
    if (!duration) continue;
    POINTS.forEach((p, i) => {
      const target = path.join(OUT, `${folder}-${i + 1}.jpg`);
      if (existsSync(target)) return;
      // -map_metadata -1: buang metadata dari hasil
      execFileSync('ffmpeg', [
        '-v',
        'error',
        '-ss',
        (duration * p).toFixed(2),
        '-i',
        video,
        '-frames:v',
        '1',
        '-q:v',
        '2',
        '-map_metadata',
        '-1',
        target,
      ]);
      count++;
    });
    console.log(`✓ ${folder}/${file}`);
  }
}
console.log(`Selesai: ${count} frame baru di ${OUT}`);
