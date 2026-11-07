# YMI Decoration

Landing page **satu halaman** portofolio YMI Decoration, vendor dekorasi wedding, akad, dan lamaran di Surabaya.
Next.js 16 (App Router, static export), TypeScript strict, dan Tailwind CSS 4. Tanpa backend: semua konsultasi lewat WhatsApp.

## Menjalankan

Butuh Node.js 20.9 ke atas (dikembangkan dengan Node 22.20.0, lihat `.nvmrc`).

```bash
npm install
npm run dev              # pengembangan
npm run build            # hasil statis di /out
npm start                # menyajikan /out secara lokal
npm run lint
npm run typecheck
npm run format
npm run audit            # cek celah keamanan dependency produksi
npm run optimize-images  # olah foto dari assets/ ke public/images
```

Aktifkan Dependabot atau Renovate di repository supaya update keamanan dependency datang otomatis.

## Struktur

```
assets/                     foto & video asli dari Instagram (tidak ikut repo)
scripts/optimize-images.mjs foto asli → WebP 1600px + thumbnail 600px, hero 2000px, EXIF/GPS dibuang
scripts/make-monogram.mjs   monogram "Ym" transparan + favicon dari assets/Logo.jpg
src/app/                    layout, halaman /, not-found, sitemap, robots
src/components/             Header, Portfolio (filter), EventModal (galeri), ConsultBuilder
src/data/events.ts          data acara portofolio
src/data/content.ts         layanan, alur booking, FAQ, rentang budget
src/data/site.ts            kontak, alamat, area layanan, media sosial
src/lib/config.ts           nomor WA, URL situs, buildWhatsAppLink()
```

## Konfigurasi

Salin `.env.example` menjadi `.env.local`, lalu isi:

| Variabel                | Isi                                           |
| ----------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_WA_NUMBER` | Nomor WA format 62xxx                         |
| `NEXT_PUBLIC_SITE_URL`  | Domain asli, dipakai untuk SEO dan link acara |
| `NEXT_PUBLIC_SITE_NAME` | Nama situs                                    |

**Semua `NEXT_PUBLIC_*` bersifat PUBLIK** karena ikut tertanam di JavaScript yang dikirim ke browser. Jangan pernah
menaruh secret di sini. Build sengaja gagal kalau nomor WA tidak valid.

## Menambah acara baru

1. Taruh foto di folder baru di dalam `assets/`.
2. Tambahkan daftar foto acara di objek `events` pada `scripts/optimize-images.mjs`. Foto pertama menjadi cover.
3. Jalankan `npm run optimize-images`.
4. Tambahkan data di `raw` pada `src/data/events.ts` dengan `slug` yang sama, lengkap dengan `alts` (satu per foto,
   urutannya sama), `concept`, `palette`, dan `credits` dari caption.
5. `npm run build`.

- **Acara unggulan:** `featured: true`.
- **Foto wajah pasangan:** `showFaces`. Pemilik menyatakan semua pasangan sudah mengizinkan, jadi semua `true`. Untuk
  acara baru tanpa izin, jangan masukkan foto yang menampilkan wajah.
- **Nuansa baru:** tambahkan ke `palettes` di `src/data/events.ts`. Chip filter hanya muncul kalau ada datanya.
- Lebih dari 12 acara, portofolio otomatis menampilkan 9 dulu dengan tombol "Tampilkan lebih banyak".

## Modal galeri dan deep link

Setiap acara punya link `/#acara-[slug]`, misalnya `/#acara-della-adil`. Membuka link itu langsung memunculkan galeri
acaranya. Slug dicek terhadap data, jadi hash yang tidak dikenal diabaikan. Tombol Back menutup modal, dan tombol
"Salin Link Acara" memudahkan admin mengirim portofolio tertentu ke calon klien.

## Keamanan

- Header keamanan diatur di `public/_headers` (Netlify/Cloudflare Pages) dan `vercel.json` (Vercel).
  **`headers()` di `next.config.ts` TIDAK berfungsi pada static export.**
- CSP: `default-src 'self'` tanpa pihak ketiga. `script-src` masih perlu `'unsafe-inline'` karena Next.js menyisipkan
  inline script untuk hydration. Menghapusnya butuh nonce atau hash per build, yang tidak bisa dilakukan di hosting
  statis tanpa middleware. Risikonya kecil karena situs ini tidak menampilkan input pengguna dan
  `dangerouslySetInnerHTML` dilarang lewat ESLint (`react/no-danger`).
- Tanpa iframe Maps, embed Instagram, atau tracking. Alamat hanya link keluar ke Google Maps.
- Tidak ada data pengguna yang dikirim atau disimpan. Pesan konsultasi disusun di browser lalu dibuka di WhatsApp.
- `public/.well-known/security.txt` berisi kontak. Perbarui `Expires` sebelum tanggalnya lewat.

## Deploy

**Vercel:** Root Directory `ymidecoration`, isi `NEXT_PUBLIC_SITE_URL`, dan build memakai `vercel.json`.
**Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.

## Hak cipta dan privasi

1. Pastikan pasangan setuju fotonya ditampilkan di website. Pemilik menyatakan semua sudah setuju.
2. Hak cipta foto biasanya milik fotografer. Pastikan izinnya, dan pertahankan kredit di tiap acara.
   Watermark di foto tidak dihapus.
3. EXIF/GPS dibuang otomatis oleh `optimize-images`.
4. Hanya nama depan pasangan yang ditampilkan, tanpa alamat atau kontak klien.

## TODO

Cari `TODO` di `src/` untuk daftar lengkap: alur booking, jawaban FAQ, rentang budget, area layanan, alamat studio,
domain asli, dan foto contoh dekorasi ulang tahun.
