# Sahane.id: Landing Page

Website **satu halaman** (landing page) untuk **Sahane.id** (abaya & busana muslimah). Semua pemesanan lewat
WhatsApp. Tidak ada backend, keranjang, pembayaran, login, atau form yang mengirim data.

Next.js 16 (App Router, `output: 'export'`) · React 19 · TypeScript strict · Tailwind CSS v4 · Node 22 (`.nvmrc`).

## Isi halaman (`/`)

Hero → keunggulan → koleksi (`#koleksi`) → lookbook (`#lookbook`) → cara pesan (`#cara-pesan`) → FAQ (`#faq`) →
footer kontak (WA Pre-Order, Instagram, Threads) dan pengiriman (`#kontak`). Menu header berupa anchor ke section tersebut.

Klik kartu produk membuka **modal ringkas** (`<dialog>` native: Esc menutup, fokus terkunci, dan fokus kembali ke
kartu) berisi foto, harga, bahan, warna, ukuran, serta tombol pesan WhatsApp. Tidak ada halaman detail terpisah.

## Perintah

| Perintah                  | Fungsi                                                                  |
| ------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`             | Server development di http://localhost:3000                             |
| `npm run build`           | Build statis ke folder `out/`                                           |
| `npm start`               | Menyajikan folder `out/` secara lokal                                   |
| `npm run lint`            | ESLint (CLI `eslint .`, bukan `next lint`)                              |
| `npm run typecheck`       | Cek tipe TypeScript                                                     |
| `npm run format`          | Prettier                                                                |
| `npm run audit`           | `npm audit`                                                             |
| `npm run optimize-images` | Foto di `assets-src/` → WebP maks 1200px tanpa EXIF (+ `og.jpg` sampul) |

## Mengelola konten

- **Identitas & nomor WA:** `src/lib/config.ts` atau `.env.local` (salin dari `.env.example`).
  Nomor otomatis dibersihkan ke format `62…`; build gagal kalau nomornya tidak valid.
- **Produk:** `src/data/products.ts`. Tambah objek di array `products`, lalu taruh foto sampul di
  `assets-src/products/<slug>/01.jpg` (tampil di kartu & modal).
- **Lookbook / FAQ / konten brand:** `src/data/lookbook.ts`, `faq.ts`, `site.ts`.
- Gambar pengganti diberi `kind: 'ilustrasi'` dan otomatis berlabel "Ilustrasi".
- Setelah menambah foto: `npm run optimize-images` (file asli tidak ditimpa, metadata EXIF dibuang).
- Cari semua `TODO` di `src/` untuk data yang perlu diverifikasi.

## Struktur

```
assets-src/          foto ASLI hasil kurasi dari folder referensi (tidak disajikan ke pengunjung)
public/              hasil optimasi (products/, lookbook/), _headers, robots.txt, theme-init.js
scripts/             optimize-images.mjs
src/app/             halaman tunggal (page.tsx), 404, sitemap, ikon
src/components/      UI: kartu produk + modal, FAQ, cara pesan, header, footer, dll.
src/data/            products, lookbook, faq, site
src/lib/             config, whatsapp (buildWhatsAppLink), seo, format harga
```

## Aturan penting

- **Static export**: tanpa API routes, Server Actions, middleware, atau fitur yang butuh server.
- **Variabel `NEXT_PUBLIC_*` bersifat PUBLIK.** Jangan taruh secret apa pun.
- `dangerouslySetInnerHTML` dilarang (ESLint `react/no-danger`). JSON-LD memakai `src/components/JsonLd.tsx`.
- Link eksternal wajib `target="_blank" rel="noopener noreferrer"`.
- Semua tombol WA memakai `buildWhatsAppLink()` (dengan `encodeURIComponent`) di `src/lib/whatsapp.ts`.
- `'use client'` hanya untuk: kartu produk + modal, menu HP, toggle tema, navbar, RevealObserver.
- Animasi hanya fade halus (`animate-in`, `reveal`), dan semuanya mematuhi `prefers-reduced-motion`.

## Security headers

**`headers()` di `next.config.ts` TIDAK berfungsi pada static export**, karena tidak ada server Next.js yang
mengirim header. Jadi header diatur di hosting:

- `public/_headers` untuk Netlify / Cloudflare Pages (ikut tersalin ke `out/`)
- `vercel.json` untuk Vercel

Isinya: CSP ketat (hanya `'self'`, `form-action 'none'`, `frame-ancestors 'none'`, tanpa domain pihak ketiga),
`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy`, COOP, dan HSTS.

Trade-off: `script-src` memakai `'unsafe-inline'` karena Next.js menyisipkan inline script untuk hydration, dan
nonce/hash tidak bisa dibuat per-request di situs statis. Risikonya kecil karena tidak ada input pengguna yang
dirender sebagai HTML dan tidak ada script pihak ketiga. Kalau menambah layanan luar (mis. analytics), tambahkan
domainnya ke CSP di kedua file.

## Deploy

- **Vercel:** import repo. `vercel.json` sudah mengatur build statis (`framework: null`, output `out`,
  `cleanUrls`). Isi env `NEXT_PUBLIC_SITE_URL` dengan alamat website.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.
- Setelah domain final: perbarui `NEXT_PUBLIC_SITE_URL` dan baris `Sitemap:` di `public/robots.txt`.

## Catatan

- Versi dependency dikunci exact (`.npmrc` `save-exact=true`, `engine-strict=true`). ESLint 9 dipakai karena
  `eslint-config-next` belum mendukung ESLint 10.
