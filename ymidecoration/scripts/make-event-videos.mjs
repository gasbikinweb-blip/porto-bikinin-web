// Video acara untuk galeri portofolio: 720px, maks 30 detik, tanpa suara (hemat kuota + aman hak cipta musik).
// Hasil: public/videos/acara/[slug].mp4 + poster .webp, daftar di src/data/videos.generated.json
// Butuh ffmpeg. Jalankan: npm run event-videos
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';

const H = 'Hightlight';
const videos = {
  'della-adil': 'Folder 1 - Isinya berhubungan semua/2026-10-26_De8XjiMiw7P/01.mp4',
  'berlin-aziz': 'Folder 2 - Isinya berhubungan semua/2026-10-19_DeqJZeQC_yd/01.mp4',
  'dita-iqbal': 'Folder 4 - Isinya berhubungan semua/2024-04-26_C6NYpxoBm4L/01.mp4',
  'putri-luthfi': '2026-10-12_DeYK-MbCwuc/01.mp4',
  'lamaran-taman-pastel': 'Folder 6 - Isinya berhubungan semua/2022-12-20_CmZOMxLjU4E/01.mp4',
  'launching-cafe-pink': 'Folder 9 - Isinya berhubungan semua/2023-06-18_Cton2kOLWB7/01.mp4',
  'hana-felix-wedding': `${H}/sorotan_Hana & felix_18196682200291916/04.mp4`,
  'kada-elen': `${H}/sorotan_Kada & elen_18046673260670171/02.mp4`,
  'ivon-bryan': `${H}/sorotan_Ivon & Bryan_18056314120599122/01.mp4`,
  'novi-arif': `${H}/sorotan_novi & arif_18076992386149413/06.mp4`,
};

const OUT = 'public/videos/acara';
mkdirSync(OUT, { recursive: true });
const list = {};
for (const [slug, src] of Object.entries(videos)) {
  const input = `assets/${src}`;
  const mp4 = `${OUT}/${slug}.mp4`;
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-t', '30', '-i', input, '-an', '-map_metadata', '-1',
    '-vf', 'scale=720:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', mp4]);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', '1', '-i', input, '-frames:v', '1',
    '-vf', 'scale=720:-2', '-c:v', 'libwebp', '-quality', '72', `${OUT}/${slug}.webp`]);
  list[slug] = { src: `/videos/acara/${slug}.mp4`, poster: `/videos/acara/${slug}.webp` };
  console.log(`✓ ${slug}: ${(statSync(mp4).size / 1e6).toFixed(1)} MB`);
}
writeFileSync('src/data/videos.generated.json', `${JSON.stringify(list, null, 2)}\n`);
