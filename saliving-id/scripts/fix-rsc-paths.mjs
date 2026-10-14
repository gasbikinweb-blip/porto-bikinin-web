// Next.js 16 static export menulis payload prefetch sebagai folder bertingkat,
// mis. "__next.produk/$d$slug/__PAGE__.txt", tetapi router meminta nama datar
// "__next.produk.$d$slug.__PAGE__.txt" (404 saat prefetch). Salin ke nama datar.
// Dijalankan otomatis setelah `npm run build` (postbuild).
import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

let count = 0;

// Salin semua .txt di dalam folder __next.* ke folder induknya dengan nama berpemisah titik
async function flatten(baseDir, dir, prefix) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(baseDir, full, name);
    else if (entry.name.endsWith('.txt')) {
      await copyFile(full, path.join(baseDir, name));
      count++;
    }
  }
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) await flatten(dir, full, entry.name);
    else await walk(full);
  }
}

await walk('out');
console.log(`fix-rsc-paths: ${count} file disalin.`);
