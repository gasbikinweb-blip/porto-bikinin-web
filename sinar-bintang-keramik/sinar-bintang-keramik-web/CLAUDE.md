# Panduan untuk Claude

Project ini adalah landing page **statis satu halaman** Sinar Bintang Keramik (Next.js 16 App Router, `output: 'export'`). Hanya frontend:
pemesanan lewat WhatsApp atau Shopee. Baca README.md untuk struktur lengkap.

## Wajib dipatuhi

- Tidak ada API routes, Server Actions, middleware, form yang mengirim data, keranjang, checkout, atau login.
- TypeScript strict; server component default, `'use client'` hanya untuk interaksi kecil.
- Dilarang `dangerouslySetInnerHTML` (rule ESLint `react/no-danger`). Hanya satu halaman `/`; jangan tambah halaman lain.
- Link eksternal: `target="_blank" rel="noopener noreferrer"`.
- Link WA lewat `buildWhatsAppLink()`, link Shopee lewat `buildShopeeProductLink()` (`src/lib/whatsapp.ts`).
- Konfigurasi toko hanya di `src/lib/config.ts` (nilai dari `NEXT_PUBLIC_*`, yang bersifat publik).
- Data di `src/data/*.ts`. Jangan mengarang harga, isi/luas per dus, merek, KW, ongkir, stok, ulasan, rating; pakai `// TODO`.
- Gambar: pilih di `scripts/products.manifest.mjs`, jalankan `npm run optimize-images` (WebP 1:1); `next/image` dengan `sizes`,
  `alt` deskriptif, `priority` hanya di hero, sisanya lazy.
- Warna lewat token CSS di `globals.css` (putih, merah SBK, abu-abu); kontras teks ≥ 4.5:1, target tap ≥ 44px.
- Animasi minimal; hormati `prefers-reduced-motion`.
- Security headers diatur di `public/_headers` dan `vercel.json` (bukan `next.config.ts`). Tambah domain ke CSP
  hanya bila benar-benar perlu.
- Versi dependency exact; jangan tambah library tanpa alasan kuat.
- Teks UI dan komentar kode dalam bahasa Indonesia (singkat). Satu `h1` per halaman, HTML semantik, a11y.

## Alur kerja

1. Cek environment (`node -v`, `npm -v`) bila memulai.
2. Tampilkan rencana singkat dan tunggu konfirmasi sebelum perubahan besar.
3. Setelah mengubah kode: `npm run lint`, `npm run typecheck`, `npm run build` sampai bersih.
