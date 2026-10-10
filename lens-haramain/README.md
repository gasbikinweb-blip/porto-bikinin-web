# Lens Haramain — Website

Website statis (Next.js 16, `output: 'export'`) untuk jasa foto & video umrah di Makkah dan Madinah.
Satu halaman panjang, dua bahasa (`/` Indonesia, `/en` English). Semua pemesanan lewat WhatsApp.

## Menjalankan

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # hasil statis di folder out/
```

Sebelum commit: `npm run lint && npm run typecheck && npm run build`.

## Struktur

```
assets-src/                 FOTO/VIDEO ASLI (tidak di-deploy)
  brand/logo.jpg            logo asli
  stories/<cerita>/01.jpg   foto per cerita (satu folder = satu klien/sesi)
  posters/<video>.jpg       sampul video
  videos/<video>.mp4        video mentah (di-.gitignore karena besar)
public/                     HASIL OLAHAN (di-deploy)
  stories/ posters/ brand/  hasil npm run optimize-images
  videos/                   video terkompresi 540p
src/
  content/id.ts, en.ts      SEMUA TEKS (dua bahasa, tipe di types.ts)
  data/media.ts             daftar foto, video, ukuran, dan alt
  components/home/*         section beranda (Hero, Stories, Places, Reels, Packages, ...)
  components/site/*         Header, Footer, Logo, menu HP
  lib/config.ts             nama, nomor WA, Instagram
```

## Tugas umum

**Ganti teks / harga paket** → `src/content/id.ts` dan `src/content/en.ts` (bagian `packages`).
Cari tanda `TODO` untuk bagian yang masih contoh.

**Tambah cerita baru**
1. Taruh foto di `assets-src/stories/<slug-baru>/01.jpg, 02.jpg, ...` (01 = sampul).
2. `npm run optimize-images`
3. Tambahkan entri di `stories` pada `src/data/media.ts` (slug, ukuran, alt dua bahasa).
4. Tambahkan judul/deskripsi di `stories.items` pada `id.ts` dan `en.ts` (TypeScript akan mengingatkan).

**Tambah video**
1. Kompres dulu (contoh dengan ffmpeg):
   `ffmpeg -i asli.mp4 -vf scale=540:-2 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart public/videos/<slug>.mp4`
2. Ambil sampul: `ffmpeg -ss 2.5 -i asli.mp4 -frames:v 1 assets-src/posters/<slug>.jpg`, lalu `npm run optimize-images`.
3. Tambahkan slug di `reels` (`src/data/media.ts`) dan judulnya di `reels.items` (`id.ts`, `en.ts`).

**Ganti nomor WhatsApp / domain** → `.env` (salin dari `.env.example`) atau default di `src/lib/config.ts`.
robots.txt & sitemap otomatis mengikuti domain tersebut.

## Deploy

Vercel: import repo, framework dibiarkan "Other" (sudah diatur di `vercel.json`, output `out/`).
Netlify / Cloudflare Pages: build command `npm run build`, publish directory `out`.
Isi `NEXT_PUBLIC_SITE_URL` dengan domain asli agar link pratinjau WhatsApp & SEO benar.
