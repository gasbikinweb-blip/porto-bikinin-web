// Dijalankan otomatis setelah `next build`.
// Next.js 16 menulis file prefetch RSC di folder bertingkat, mis. out/proyek/__next.proyek/__PAGE__.txt,
// sedangkan router di browser memintanya dengan nama datar: out/proyek/__next.proyek.__PAGE__.txt.
// Tanpa salinan ini prefetch gagal (404) dan navigasi jatuh ke muat ulang halaman penuh.
import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'out';
let count = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '_next') continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) await flatten(full, dir, entry.name);
    else await walk(full);
  }
}

// Salin setiap file di dalam folder __next.* ke induknya dengan nama yang digabung titik
async function flatten(dir, target, prefix) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await flatten(full, target, name);
    else {
      await copyFile(full, path.join(target, name));
      count++;
    }
  }
}

await walk(OUT);
console.log(`flatten-rsc-segments: ${count} file disalin.`);
