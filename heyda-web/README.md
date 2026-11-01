# Sari Kacang Ijo by Heyda — Landing Page

Landing page satu halaman (Next.js 16, static export) untuk **Sari Kacang Ijo by Heyda**, Yogyakarta.
Hanya frontend: tidak ada keranjang, checkout, login, atau form yang mengirim data. Semua pesanan lewat WhatsApp.

## Perintah

| Perintah                                | Fungsi                                                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                           | Server pengembangan                                                                                                         |
| `npm run build`                         | Build statis ke folder `out/`                                                                                               |
| `npm start`                             | Sajikan `out/` secara lokal (`serve`)                                                                                       |
| `npm run lint` / `typecheck` / `format` | ESLint, TypeScript, Prettier                                                                                                |
| `npm run audit`                         | Cek kerentanan dependency                                                                                                   |
| `npm run optimize-images`               | `../sarikacangijobyheyda/assets/*` → WebP di `public/images/` (maks 1200px + thumb 400px, tanpa EXIF/GPS) + `public/og.jpg` |

Node ≥ 20.9 (lihat `.nvmrc`). Versi dependency dikunci exact.

## Mengubah konten

- **Varian, harga, ukuran:** `src/data/variants.ts`. Isi `price` (angka Rupiah, mis. `15000`) dan `size` (mis. `'250 ml'`).
  Kalau `price` semua varian terisi, subtotal otomatis muncul di penyusun pesanan.
- **Klaim brand:** `src/data/benefits.ts` · **FAQ:** `src/data/faq.ts` · **Cara pesan, info simpan, menu:** `src/data/site.ts`.
- **Nomor WA, nama, URL, P-IRT, area layanan:** `src/lib/config.ts` (atau `.env`).
- Jangan isi data karangan (harga, komposisi, gizi, klaim kesehatan, testimoni, nomor izin, halal).

### Mengganti foto

Saat ini **belum ada foto produk asli**; semua gambar di `assets/` adalah poster desain/AI, jadi kartu varian memakai
ilustrasi botol SVG bertuliskan "Foto produk segera hadir".

1. Taruh foto asli di `../sarikacangijobyheyda/assets/foto-produk/` (mis. `ori.jpg`), lalu `npm run optimize-images`.
2. Di `variants.ts` isi `image: { src: '/images/foto-produk-ori.webp', alt: '...', width, height, kind: 'foto' }`.
3. Gambar non-foto wajib `kind: 'ilustrasi'` (otomatis diberi label "Ilustrasi").

Foto yang perlu diminta ke owner: tiap botol varian di latar polos, foto bareng 4 varian, dan kemasan oleh-oleh.

### Mengganti nomor WhatsApp

Salin `.env.example` ke `.env.local` lalu ubah `NEXT_PUBLIC_WA_NUMBER` (format `62xxx`; awalan `0` otomatis diubah).
Di Vercel/Netlify, isi di pengaturan Environment Variables. Build gagal bila nomornya tidak valid.

> **Penting:** semua variabel `NEXT_PUBLIC_*` ikut dibundel ke browser dan **bersifat publik**. Jangan simpan secret di sana.

## Deploy

- **Vercel:** import folder ini sebagai project (root directory `heyda-web`). `vercel.json` sudah mengatur build & header.
- **Netlify / Cloudflare Pages:** build `npm run build`, publish `out`. Header diambil dari `public/_headers`.
- Setelah dapat domain, set `NEXT_PUBLIC_SITE_URL` agar canonical, sitemap, robots, dan OG memakai domain asli.

## Keamanan

- **Header** (CSP, nosniff, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy,
  HSTS, COOP) ada di `public/_headers` dan `vercel.json`. `headers()` di `next.config.ts` **tidak berlaku** untuk
  static export karena tidak ada server Next.js yang berjalan.
- **Trade-off CSP:** `script-src` memakai `'unsafe-inline'` karena Next.js menyisipkan inline script untuk hydration,
  dan nonce/hash dinamis butuh server. Risikonya kecil: tidak ada input pengguna yang dirender sebagai HTML,
  `dangerouslySetInnerHTML` dilarang lewat ESLint, dan tidak ada script pihak ketiga.
- Tanpa embed, tracking, atau analytics. Link eksternal memakai `target="_blank" rel="noopener noreferrer"`.
- Penyusun pesanan tidak memakai `<form>` dan tidak menyimpan apa pun; input dibatasi panjangnya lalu di-`encodeURIComponent`.
- Jalankan `npm run audit` berkala. Aktifkan Dependabot (`.github/dependabot.yml`) atau Renovate. Sisa temuan audit
  saat ini berasal dari devDependency (`serve`, plugin ESLint), tidak ikut ke hasil build.
- `public/.well-known/security.txt` berisi kontak pelaporan (TODO: ganti dengan email pengelola).
- **Lokasi saat ini:** tombol "Pakai lokasi saya" memakai Geolocation API bawaan browser (`Permissions-Policy: geolocation=(self)`).
  Koordinat hanya dimasukkan ke teks pesan WA sebagai link Google Maps. Tidak ada request ke server mana pun dan tidak disimpan.
- **Daftar kecamatan:** `src/data/kecamatan.ts` berisi 78 kecamatan di 5 kabupaten/kota DIY.
