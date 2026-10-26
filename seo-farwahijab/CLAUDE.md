# Panduan untuk Claude

Project ini adalah landing page **statis satu halaman** Farwa Hijab (Next.js 16 App Router, `output: 'export'`). Hanya frontend:
semua pertanyaan dan pemesanan lewat WhatsApp. Baca README.md untuk struktur lengkap.

## Wajib dipatuhi

- Tidak ada API routes, Server Actions, middleware, form yang mengirim data, checkout, pembayaran, atau login.
- Pengecualian: **keranjang tanya-pesan** (`src/lib/cart.ts`, `CartDrawer.tsx`) hanya menyimpan daftar di localStorage
  pengunjung dan merangkainya jadi satu pesan WhatsApp. Jangan tambah checkout/pembayaran di atasnya.
- TypeScript strict; server component default, `'use client'` hanya untuk interaksi kecil.
- Dilarang `dangerouslySetInnerHTML` (rule ESLint `react/no-danger`). JSON-LD lewat `src/components/JsonLd.tsx`.
- Link eksternal: `target="_blank" rel="noopener noreferrer"`.
- Semua link WhatsApp lewat `buildWhatsAppLink()` di `src/lib/whatsapp.ts`; link Shopee dari data produk / `config.shopeeUrl`.
- Env di `src/lib/config.ts` (`NEXT_PUBLIC_*`, publik); profil brand di `src/data/site.ts`.
- Data produk di `src/data/*.ts` (sumber utama Shopee). Jangan mengarang harga/bahan/stok/rating/ulasan/syarat reseller; placeholder `// TODO`.
- Gambar: sumber `../farwaheejab/assets/`, pilih di `scripts/products.manifest.mjs`, jalankan `npm run optimize-images` (rasio 4:5); pakai `next/image` dengan `fill` + `sizes`
  atau width/height, `alt` deskriptif, `priority` hanya di atas layar, rasio konsisten (anti-CLS).
- Warna lewat token CSS di `globals.css` (ivory, mocha, rose, sage, shopee); kontras teks ≥ 4.5:1.
- Satu halaman: menu berupa anchor; detail produk lewat modal. Animasi scroll: atribut `data-reveal` / `data-reveal-group`; animasi JS lewat `safeAnimate()`; semua menghormati `prefers-reduced-motion`.
- Security headers diatur di `public/_headers` dan `vercel.json` (bukan `next.config.ts`). Tambah domain ke CSP
  hanya bila benar-benar perlu.
- Versi dependency exact; jangan tambah library tanpa alasan kuat.
- Teks UI dan komentar kode dalam bahasa Indonesia (singkat). Satu `h1` per halaman, HTML semantik, a11y.

## Alur kerja

1. Cek environment (`node -v`, `npm -v`) bila memulai.
2. Tampilkan rencana singkat dan tunggu konfirmasi sebelum perubahan besar.
3. Setelah mengubah kode: `npm run lint`, `npm run typecheck`, `npm run build` sampai bersih.
