# Sirait Printing — Landing Page

Landing page satu halaman untuk Sirait Printing (print & jilid murah untuk mahasiswa, Jl. Durung
No. 174, Medan). Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS 4.
Tanpa backend, login, upload, pembayaran, atau form yang mengirim data. Semua pemesanan via WhatsApp.

## Kebutuhan

- Node.js ≥ 20.9 (dikembangkan dengan 22.20, lihat `.nvmrc`), npm 10+
- Next.js 16.4.3 (patch keamanan dari 16.4.0)
- ffmpeg (hanya untuk `npm run extract-frames`). Install di Windows: `winget install Gyan.FFmpeg`

## Perintah

| Perintah                  | Fungsi                                                      |
| ------------------------- | ----------------------------------------------------------- |
| `npm run dev`             | Server pengembangan (http://localhost:3000)                 |
| `npm run build`           | Build statis ke folder `out/`                               |
| `npm start`               | Menyajikan `out/` secara lokal                              |
| `npm run lint`            | ESLint (`eslint .`)                                         |
| `npm run typecheck`       | Cek tipe TypeScript                                         |
| `npm run format`          | Prettier                                                    |
| `npm run audit`           | `npm audit`                                                 |
| `npm run optimize-images` | Foto terpilih → WebP 1200px + thumbnail di `public/images/` |
| `npm run extract-frames`  | Ambil 2 frame per video ke `../sirait-printing/frames/` untuk dipilih       |
| `npm run build-videos`    | Kompres video terpilih ke `public/videos/` (+ poster WebP)  |

## Struktur

```
scripts/gallery.manifest.mjs   daftar foto yang dipakai (dari ../sirait-printing/assets/ dan ../sirait-printing/frames/)
scripts/optimize-images.mjs    sharp: WebP + thumbnail + og.jpg, tanpa EXIF/GPS
scripts/extract-frames.mjs     ffmpeg: frame di 30% & 70% durasi tiap video
scripts/videos.manifest.mjs    daftar video yang ditampilkan + potongan (start/duration)
scripts/build-videos.mjs       ffmpeg: H.264 540px, tanpa audio & metadata, +faststart
src/data/videos.ts             daftar video (dari videos.generated.json)
src/components/VideoGrid.tsx   kartu video klik-untuk-putar (client)
src/data/site.ts               nama, alamat, jam buka, link sosial
src/data/prices.ts             SEMUA harga + PRICE_UPDATED_AT + aturan kalkulator
src/data/services.ts           kartu layanan (ikon SVG inline)
src/data/gallery.ts            foto galeri + alt
src/data/faq.ts                FAQ
src/lib/config.ts              env NEXT_PUBLIC_* + pembersih nomor WA
src/lib/whatsapp.ts            buildWhatsAppLink() — dipakai semua tombol
src/components/Calculator.tsx  kalkulator estimasi (client)
src/components/OrderForm.tsx   format order WA: nama, link/file, rangkap, jilid, jam ambil (client)
src/components/Gallery.tsx     galeri + lightbox <dialog> (client)
src/components/MobileNav.tsx   menu HP (client)
src/app/page.tsx               satu halaman: hero, layanan, harga, hitung, cara order, galeri, lokasi, FAQ
```

## Mengubah harga

Cukup edit `src/data/prices.ts`: ubah `price` (angka rupiah, `null` = tampil "Tanya admin"), lalu
perbarui `PRICE_UPDATED_AT`. Tabel harga, hero, dan kalkulator otomatis ikut berubah. Aturan promo
(minimal rangkap) dan tingkatan harga jilid lux ada di `calcRules` di file yang sama.

## Mengganti nomor WhatsApp

Salin `.env.example` menjadi `.env.local` (atau isi di dashboard hosting):

```
NEXT_PUBLIC_WA_NUMBER=0851-8415-8680   # otomatis dibersihkan menjadi 6285184158680
```

Tampilan nomor di halaman ada di `src/data/site.ts` (`waDisplay`).

> **Penting:** semua variabel `NEXT_PUBLIC_*` dan nomor WA bersifat **PUBLIK** (ikut ke browser).
> Jangan menaruh secret di sana.

## Menambah foto

1. Taruh foto di `../sirait-printing/assets/` (atau jalankan `npm run extract-frames` untuk video, lalu pilih frame
   di `../sirait-printing/frames/`).
2. Tambahkan entri di `scripts/gallery.manifest.mjs` (`name` = nama file hasil, `src` = sumber).
3. `npm run optimize-images`, lalu tambahkan `name` + `alt` deskriptif di `src/data/gallery.ts`.

Jangan pakai foto yang menampilkan wajah orang dengan jelas, logo kampus, nama mahasiswa, atau isi
dokumen pelanggan. Contoh: frame papan nama toko (Mar 2026) tidak dipakai karena memuat logo kampus.

## Menambah / mengganti video

1. Tambahkan entri di `scripts/videos.manifest.mjs`: `src`, `start` & `duration` (detik, untuk
   memotong bagian yang menampilkan wajah, logo kampus, atau sampul skripsi yang terbaca), `title`,
   dan `poster` (detik dari awal potongan untuk gambar sampul).
2. `npm run build-videos`. Hasilnya otomatis tampil di section Galeri.

Catatan:

- **Audio selalu dibuang.** Musik di Reels berlisensi untuk Instagram, bukan untuk website.
- Video memakai `preload="none"`: tidak diunduh sampai pengunjung menekan putar, jadi tidak
  memperlambat halaman. Total 5 video saat ini sekitar 10 MB.
- Video yang sengaja tidak dipakai (wajah, logo kampus, branding VP3) dicatat di manifest.

## Deploy

Hasil build adalah folder statis `out/`.

- **Vercel**: root directory `sirait-printing-web`. `vercel.json` sudah mengatur
  build, output, dan security headers.
- **Netlify / Cloudflare Pages**: build `npm run build`, publish `out`. Header dari `public/_headers`.
- Set `NEXT_PUBLIC_SITE_URL` ke domain asli agar canonical, sitemap, dan OG benar.

## Keamanan

- **Header di `next.config.ts` TIDAK berfungsi pada static export.** Header diatur di hosting:
  `public/_headers` dan `vercel.json` (isinya sama): CSP, `nosniff`, `X-Frame-Options: DENY` +
  `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy (kamera/mikrofon/geolokasi mati),
  HSTS, COOP, CORP.
- **Trade-off CSP:** Next.js menyisipkan inline script untuk hidrasi. Static export tidak punya
  server untuk nonce per-request, dan hash berubah tiap build, jadi `script-src` memakai
  `'unsafe-inline'`. Risiko ditekan: tanpa script/domain pihak ketiga, tanpa input yang dirender
  sebagai HTML, `dangerouslySetInnerHTML` dilarang lewat ESLint (`react/no-danger`),
  `object-src`/`frame-src` `'none'`, `form-action 'none'`. `media-src 'self'` hanya
  mengizinkan video dari domain sendiri. Opsi lebih ketat: edge function yang
  menyuntikkan nonce, atau script pasca-build yang menghitung hash SHA-256 tiap inline script.
- JSON-LD LocalBusiness (dengan jam buka) dirender sebagai teks anak `<script type="application/ld+json">`
  tanpa `dangerouslySetInnerHTML`.
- Kalkulator & format order murni di browser: tanpa `<form>`, tanpa upload, tanpa penyimpanan.
  Link file hanya diterima bila diawali http(s) (menolak `javascript:` dll.), karakter format WA
  (`* _ ~`) dibuang dari isian bebas, dan jam ambil dibatasi jam buka.
- Tanpa iframe Maps/Instagram, tanpa analytics/tracking, tanpa cookie.
- `public/.well-known/security.txt` berisi placeholder.
- Aktifkan **Dependabot** (`.github/dependabot.yml`, ekosistem `npm`) atau **Renovate**, dan
  jalankan `npm run audit` berkala.

## Hak cipta & privasi

- Hanya memakai aset dari `../sirait-printing/assets/` (postingan @sirait_printing). **Minta izin pemilik dan
  karyawan** yang mungkin tampil.
- Script optimasi membuang EXIF/GPS; frame video juga diekspor tanpa metadata.

## Daftar TODO sebelum rilis

- [ ] **Verifikasi semua harga** di `prices.ts` (terutama lux & kertas 80 gr dari poster Feb 2026)
- [ ] Harga jilid biasa, fotocopy, laminating, pas foto, print A3 (sekarang "Tanya admin")
- [ ] Alamat lengkap: kelurahan, kecamatan, kode pos (poster Des 2025 menulis No. 185, caption lain No. 174)
- [ ] Jam buka 06.30–23.50 dan hari libur nasional
- [ ] Syarat antar & ongkir (poster Des 2025: rangkap ≥4 atau ≥500 lembar, sekitar Pancing)
- [ ] Semua jawaban FAQ (`faq.ts`)
- [ ] Kampus terdekat untuk teks SEO
- [ ] Status "VP3 / Vincent Printing" (nomor WA sama) — sengaja tidak dicantumkan
- [ ] File logo asli → ganti `src/components/Logo.tsx` dan `src/app/icon.svg`
- [ ] Domain asli → `NEXT_PUBLIC_SITE_URL` dan `security.txt`
- [ ] Link pin Google Maps yang tepat (sekarang link pencarian)
