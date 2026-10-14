// Mengompres video asli di assets-src/video/ menjadi MP4 ringan + poster WebP di public/video/.
// File asli TIDAK ditimpa. Jalankan: npm run optimize-videos
import { execFile } from 'node:child_process';
import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const run = promisify(execFile);
const SRC = 'assets-src/video';
const OUT = 'public/video';

// Klip pendek tanpa suara untuk latar hero (autoplay wajib muted)
const HERO = { source: 'DTPijDbj5IP.mp4', start: 14, duration: 10 };

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function isFresh(source, target) {
  const done = await stat(target).catch(() => null);
  return Boolean(done && done.mtimeMs >= (await stat(source)).mtimeMs);
}

// H.264 + faststart agar bisa diputar sebelum file selesai diunduh
const encode = (input, output, extra) =>
  run(ffmpeg, [
    '-loglevel',
    'error',
    '-y',
    ...extra.before,
    '-i',
    input,
    '-vf',
    'scale=540:-2',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '30',
    '-pix_fmt',
    'yuv420p',
    ...extra.after,
    '-movflags',
    '+faststart',
    output,
  ]);

async function poster(input, output, at = 1) {
  const tmp = `${output}.png`;
  await run(ffmpeg, [
    '-loglevel',
    'error',
    '-y',
    '-ss',
    String(at),
    '-i',
    input,
    '-frames:v',
    '1',
    tmp,
  ]);
  await sharp(tmp).resize({ width: 540 }).webp({ quality: 72 }).toFile(output);
  await rm(tmp);
}

await mkdir(OUT, { recursive: true });
let count = 0;

for (const file of await readdir(SRC)) {
  if (path.extname(file).toLowerCase() !== '.mp4') continue;
  const input = path.join(SRC, file);
  const base = slugify(path.basename(file, '.mp4'));
  const output = path.join(OUT, `${base}.mp4`);
  if (!(await isFresh(input, output))) {
    await encode(input, output, { before: [], after: ['-c:a', 'aac', '-b:a', '64k', '-ac', '1'] });
    await poster(input, path.join(OUT, `${base}.webp`));
    count++;
    console.log(`✓ ${file} -> ${output}`);
  }
}

const heroInput = path.join(SRC, HERO.source);
const heroOut = path.join(OUT, 'hero.mp4');
if (!(await isFresh(heroInput, heroOut))) {
  await encode(heroInput, heroOut, {
    before: ['-ss', String(HERO.start), '-t', String(HERO.duration)],
    after: ['-an'],
  });
  await poster(heroInput, path.join(OUT, 'hero.webp'), HERO.start);
  count++;
  console.log(`✓ hero -> ${heroOut}`);
}
console.log(`Selesai: ${count} video diproses.`);
