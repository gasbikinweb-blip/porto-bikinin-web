# Klaurist Jogja — Landing Page

Landing page satu halaman (Next.js 16, static export) untuk **Klaurist Jogja** (@klaurist.akrilik): sewa papan
ucapan akrilik dan bucket bunga non-fresh di Yogyakarta. Hanya frontend: tidak ada keranjang, checkout, login,
upload, atau form yang mengirim data. Semua pesanan lewat WhatsApp.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build statis ke `out/` |
| `npm start` | Sajikan `out/` secara lokal |
| `npm run lint` / `typecheck` / `format` | ESLint, TypeScript, Prettier |
| `npm run audit` | Cek kerentanan dependency |
| `npm run optimize-images` | `assets/` → WebP di `public/images/` (maks 1200px + thumb 500px), logo, ikon, OG |

Node ≥ 20.9 (lihat `.nvmrc`). Versi dependency dikunci exact.

## Mengubah konten

- **Model papan:** `src/data/boards.ts`. Isi `rentalPrice` (angka Rupiah), `rentalDuration`, `size`.
- **Bucket:** `src/data/bouquets.ts`. Ukuran berbeda = satu produk dengan beberapa `variants` (`label` + `price`).
- **Tambahan:** `src/data/addons.ts`. **FAQ:** `src/data/faq.ts`. **Teks umum, cara pesan:** `src/data/site.ts`.
- **Promo:** `src/data/promos.ts` berisi `start` dan `end`. Promo kedaluwarsa otomatis hilang saat build berikutnya,
  jadi deploy ulang setelah tanggal berakhir.
- Harga kosong tampil "Tanya harga". Jangan isi angka yang belum pasti.

### Mengganti foto

1. Taruh foto di `assets/`, lalu daftarkan di array `photos` pada `scripts/optimize-images.mjs`.
   Bila ada nama/wajah orang, isi `blur` dengan kotak yang perlu disamarkan.
2. Jalankan `npm run optimize-images`.
3. Isi `images` di data produk: `{ src, alt, width, height, kind: 'foto' }`.
   Produk tanpa foto otomatis memakai siluet SVG "Foto segera hadir".

### Mengganti nomor WhatsApp

Salin `.env.example` ke `.env.local` dan ubah `NEXT_PUBLIC_WA_NUMBER`, atau isi di Environment Variables hosting.

> **Penting:** semua `NEXT_PUBLIC_*` ikut ke browser dan **bersifat publik**. Jangan simpan secret di sana.

## Deploy

- **Vercel:** Root Directory `klaurist-jogja`. `vercel.json` sudah mengatur build & header.
- **Netlify / Cloudflare Pages:** build `npm run build`, publish `out`. Header dari `public/_headers`.
- Set `NEXT_PUBLIC_SITE_URL` ke domain asli agar canonical, sitemap, dan link produk benar.

## Keamanan

- Header (CSP `default-src 'self'` tanpa pihak ketiga, nosniff, `X-Frame-Options: DENY` + `frame-ancestors`,
  Referrer-Policy, Permissions-Policy, HSTS, COOP) ada di `public/_headers` dan `vercel.json`.
  **`headers()` di `next.config.ts` tidak berlaku untuk static export** karena tidak ada server Next.js.
- **Trade-off CSP:** `script-src 'unsafe-inline'` diperlukan karena Next.js menyisipkan inline script untuk hidrasi,
  sedangkan nonce butuh server. Risiko kecil: tidak ada input yang dirender sebagai HTML, `react/no-danger`
  diaktifkan, dan tidak ada script pihak ketiga. Bila pindah ke hosting dengan server/edge, ganti dengan nonce.
- Teks ucapan dan data pesanan hanya masuk ke link WhatsApp (`encodeURIComponent`), tidak disimpan.
- Tanpa iframe Maps, embed Instagram, atau tracking. Link eksternal memakai `rel="noopener noreferrer"`.
- `npm run audit` berkala; aktifkan Dependabot atau Renovate. Kontak keamanan di `public/.well-known/security.txt`.

## Hak cipta & privasi

- Hanya aset dari `assets/` milik Klaurist. Ilustrasi bunga dibuat sendiri (SVG).
- Nama wisudawan di foto papan **disamarkan** lewat `scripts/optimize-images.mjs`. Minta izin pemilik dan pelanggan
  sebelum menampilkan foto yang memperlihatkan nama atau wajah.
- Foto `02.jpg` bertanda "Meta AI", jadi tidak dipakai sampai dipastikan foto produk asli.

## TODO (konfirmasi ke pemilik)

Harga semua papan, bucket, dan add-on · durasi sewa & pengembalian · ukuran papan · area antar & syarat free
ongkir · batas pesan (sekarang H-2) · alur bayar & DP · ketahanan bunga · tahun/tanggal promo · domain asli ·
email untuk `security.txt` · foto tiap model papan & bucket · logo resolusi besar (sekarang 320px).
