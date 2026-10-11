# Hendrik Flooring & Wall Covering: Website Company Profile & Katalog

Situs statis (Next.js 16, App Router, `output: 'export'`) untuk penyedia dan pemasang lantai vinyl
rumah sakit dan fasilitas kesehatan. Tidak ada backend, login, transaksi, atau form yang mengirim data.
Semua permintaan survei dan penawaran diarahkan ke WhatsApp.

## Kebutuhan

- Node.js **22.20.0** (lihat `.nvmrc`; minimal 20.9 untuk Next.js 16)
- npm 10

## Perintah

| Perintah                  | Fungsi                                                                |
| ------------------------- | --------------------------------------------------------------------- |
| `npm ci`                  | Pasang dependency persis sesuai `package-lock.json`                   |
| `npm run dev`             | Server pengembangan di http://localhost:3000                          |
| `npm run build`           | Build statis ke folder `out/` (+ salin file prefetch, lihat di bawah) |
| `npm start`               | Menyajikan `out/` secara lokal (cek hasil build)                      |
| `npm run lint`            | ESLint (`eslint .`, bukan `next lint`)                                |
| `npm run typecheck`       | Pemeriksaan TypeScript                                                |
| `npm run format`          | Prettier                                                              |
| `npm run audit`           | `npm audit` untuk celah keamanan dependency                           |
| `npm run optimize-images` | Ubah foto di `assets-src/` menjadi WebP di `public/img/`              |

## Konfigurasi (`.env.local`)

Salin `.env.example` menjadi `.env.local`, lalu isi:

```
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
NEXT_PUBLIC_SITE_NAME=Hendrik Flooring & Wall Covering
NEXT_PUBLIC_WA_NUMBER=628xxxxxxxxxx
```

> **Penting:** semua variabel `NEXT_PUBLIC_*` ikut dibundel ke JavaScript dan **BERSIFAT PUBLIK**.
> Nomor WhatsApp memang tampil di tombol, jadi bukan rahasia. Jangan pernah menaruh API key,
> password, atau token di variabel ini.

Nomor WA ditulis dalam format internasional tanpa `+` dan spasi. Awalan `0` otomatis diubah menjadi
`62`. Kalau formatnya salah, **build sengaja gagal** supaya tidak ada tombol WA rusak di production.
Data lain (email, alamat, jam kerja, area layanan, file katalog) ada di `src/lib/config.ts`.

## Struktur

```
src/
  app/            satu halaman (page.tsx): Hero, Keunggulan, Produk, Ruangan, Portofolio, Cara Kerja, FAQ, Kontak
  components/     komponen UI; 'use client' hanya untuk menu HP, modal poster produk/ruangan
                  (Showcase), galeri + lightbox, pembuat pesan WA, dan RevealObserver (animasi)
  data/           products.ts, solutions.ts, projects.ts, faq.ts, site.ts, types.ts
  lib/            config.ts (nomor WA & info situs), whatsapp.ts (buildWhatsAppLink), seo.ts
assets-src/       foto asli (tidak di-deploy)
public/img/       hasil optimasi foto (WebP)
public/katalog/   PDF katalog untuk diunduh
scripts/          optimize-images.mjs, flatten-rsc-segments.mjs
referensi/        bahan referensi dari klien (diabaikan git & tidak di-deploy)
```

## Menambah konten

**Produk:** tambah objek di `src/data/products.ts` (isi `highlights` dengan 4 keunggulan singkat untuk
deretan ikon di modal). Kartu dan modalnya muncul otomatis di bagian Produk.

**Ruangan:** ubah `src/data/solutions.ts`; kartu dan modal di bagian Ruangan ikut berubah.

**Foto proyek:**

1. Taruh foto asli di `assets-src/proyek/` dengan nama slug deskriptif, mis.
   `rs-ruang-rawat-vinyl-biru.jpg` (huruf kecil, tanpa spasi, bukan `WhatsApp Image ….jpeg`).
2. Jalankan `npm run optimize-images`. Hasilnya `public/img/proyek/<nama>.webp` (maks 1600px) dan
   `<nama>-thumb.webp` (640px). EXIF/GPS dibuang, file asli tidak ditimpa.
3. Tambah entri di `src/data/projects.ts` lengkap dengan `width`/`height` (dicetak oleh script),
   `alt` yang deskriptif, dan `kind`. Gunakan `kind: 'ilustrasi'` untuk render/gambar ilustrasi
   (saat ini label "Ilustrasi" sengaja tidak ditampilkan atas permintaan pemilik).

**Katalog PDF:** ganti `public/katalog/katalog-lantai-vinyl-hendrik-flooring.pdf` (saat ini
placeholder satu halaman). Kalau namanya diubah, sesuaikan `brochure.href` di `src/lib/config.ts`.

## Foto, izin klien & privasi

- Pakai **hanya** foto milik sendiri atau yang sudah diizinkan. Jangan mengambil gambar dari internet.
- **Minta izin tertulis klien** sebelum memublikasikan foto proyeknya.
- Jangan tampilkan nama rumah sakit, logo, papan nama, atau apa pun yang memperlihatkan data pasien.
- Hapus EXIF/GPS sebelum upload. `npm run optimize-images` sudah melakukannya, tetapi jangan pernah
  mengunggah foto asli langsung ke `public/`.
- Gambar render/ilustrasi tetap ditandai `kind: 'ilustrasi'` di data. Labelnya tidak ditampilkan di UI;
  pertimbangkan menggantinya dengan foto proyek asli agar tidak menyesatkan pengunjung.

## Deploy

Hasil build berupa file statis di `out/`, jadi bisa di-host di mana saja.

- **Vercel:** `vercel.json` sudah disiapkan (`framework: null`, `outputDirectory: out`,
  `cleanUrls: true`, plus security headers). Isi environment variable di dashboard Vercel.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.
  Header dibaca dari `public/_headers` (ikut tersalin ke `out/_headers`).
- **Hosting lain (Nginx/Apache/cPanel):** unggah isi `out/`, lalu salin header dari `public/_headers`
  ke konfigurasi server.

### Catatan file prefetch (`flatten-rsc-segments.mjs`)

Next.js 16.4 menulis file prefetch di `out/proyek/__next.proyek/__PAGE__.txt`, sedangkan router di
browser memintanya sebagai `out/proyek/__next.proyek.__PAGE__.txt`. Script ini (berjalan otomatis
setelah `next build`) menyalin file ke nama datar. Tanpa script ini situs tetap berfungsi, tetapi
muncul 404 di console dan navigasi tidak memakai prefetch. Kalau versi Next.js berikutnya sudah
memperbaikinya, script boleh dihapus.

## Keamanan

- **Header di `next.config.ts` TIDAK berfungsi pada static export.** Header harus diatur di level
  hosting: `public/_headers` (Netlify/Cloudflare) atau `vercel.json` (Vercel).
- Header yang dipasang: Content-Security-Policy, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY` (+ `frame-ancestors 'none'`), `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` (kamera, mikrofon, geolokasi, dll. dimatikan), HSTS, dan
  `Cross-Origin-Opener-Policy: same-origin`.
- **Trade-off CSP:** Next.js menyisipkan inline script (`self.__next_f.push(...)`) untuk hydration,
  sehingga `script-src` butuh `'unsafe-inline'`. Nonce butuh server per-request (tidak mungkin di
  static export), dan hash berubah setiap build/halaman. Risikonya kecil karena situs tidak menerima
  input yang dirender ulang dari server dan `dangerouslySetInnerHTML` dilarang lewat ESLint
  (`react/no-danger`). Selain itu CSP tetap ketat: `default-src 'self'`, tanpa script/frame pihak
  ketiga, `object-src 'none'`, `form-action 'none'`, `base-uri 'self'`.
  Alternatif lebih ketat: hitung hash SHA-256 setiap inline script di `out/` setelah build lalu
  tulis ke header (butuh script tambahan dan harus diulang setiap build).
- JSON-LD (Organization, FAQPage, BreadcrumbList) dirender sebagai teks anak
  `<script type="application/ld+json">` dengan `<` di-escape menjadi `<`. Tidak memakai
  `dangerouslySetInnerHTML` dan tidak dieksekusi browser, sehingga aman terhadap CSP.
- Semua link eksternal memakai `target="_blank" rel="noopener noreferrer"`. Peta hanya berupa link
  keluar ke Google Maps (tanpa iframe).
- Pembuat pesan WhatsApp tidak memakai `<form>`, tidak menyimpan, dan tidak mengirim data. Input
  divalidasi (whitelist pilihan, angka positif, batas panjang) dan di-encode dengan
  `encodeURIComponent`.
- Tanpa analytics, tracking, atau script pihak ketiga. Kalau nanti perlu, pilih opsi yang ramah privasi
  dan tanpa cookie, misalnya Plausible, Umami (self-host), atau Cloudflare Web Analytics, lalu
  tambahkan domainnya ke CSP.
- `public/.well-known/security.txt` berisi kontak pelaporan celah keamanan (isi dengan data asli).
- Dependency dikunci exact (`.npmrc` `save-exact=true`, `package-lock.json` di-commit). Aktifkan
  **Dependabot** atau **Renovate** di repo GitHub untuk PR pembaruan otomatis, dan jalankan
  `npm run audit` secara berkala.
