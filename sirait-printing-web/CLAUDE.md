# Panduan untuk Claude

Project ini adalah landing page **statis** satu halaman untuk Sirait Printing (Next.js 16 App Router, `output: 'export'`). Hanya frontend:
semua pertanyaan dan pemesanan lewat WhatsApp. Baca README.md untuk struktur lengkap.

## Wajib dipatuhi

- Tidak ada API routes, Server Actions, middleware, form yang mengirim data, keranjang, checkout, atau login.
- TypeScript strict; server component default, `'use client'` hanya untuk interaksi kecil.
- Dilarang `dangerouslySetInnerHTML` (rule ESLint `react/no-danger`). JSON-LD lewat `src/components/JsonLd.tsx`.
- Link eksternal: `target="_blank" rel="noopener noreferrer"`.
- Semua link WhatsApp lewat `buildWhatsAppLink()` di `src/lib/whatsapp.ts`.
- Env di `src/lib/config.ts` (`NEXT_PUBLIC_*`, publik); profil toko di `src/data/site.ts`.
- SEMUA harga hanya di `src/data/prices.ts`; kalkulator & tabel membaca dari sana, tanpa angka hard-coded.
- Jangan mengarang harga, durasi, ongkir, atau syarat promo; placeholder ditandai `// TODO`.
- Gambar: sumber di `../sirait-printing/assets/` & `../sirait-printing/frames/`, pilih di `scripts/gallery.manifest.mjs`, jalankan `npm run optimize-images`;
  tanpa wajah jelas, logo kampus, nama mahasiswa, atau isi dokumen; pakai `next/image` dengan `fill` + `sizes`
  atau width/height, `alt` deskriptif, `priority` hanya di atas layar, rasio konsisten (anti-CLS).
- Warna lewat token CSS di `globals.css` (putih, merah, kuning, ink); kontras teks ≥ 4.5:1; target tap ≥ 44px.
- Animasi minimal; semua menghormati `prefers-reduced-motion`.
- Security headers diatur di `public/_headers` dan `vercel.json` (bukan `next.config.ts`). Tambah domain ke CSP
  hanya bila benar-benar perlu.
- Versi dependency exact; jangan tambah library tanpa alasan kuat.
- Teks UI dan komentar kode dalam bahasa Indonesia (singkat). Satu `h1` per halaman, HTML semantik, a11y.

## Alur kerja

1. Cek environment (`node -v`, `npm -v`) bila memulai.
2. Tampilkan rencana singkat dan tunggu konfirmasi sebelum perubahan besar.
3. Setelah mengubah kode: `npm run lint`, `npm run typecheck`, `npm run build` sampai bersih.
