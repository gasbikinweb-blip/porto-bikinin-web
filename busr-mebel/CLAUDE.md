# Panduan Pengembangan — Busr Mebel

Project ini adalah website Company Profile & Katalog **statis** (Next.js 16 App Router, `output: 'export'`) untuk Busr Mebel, Jepara. Hanya frontend: seluruh pemesanan, survei, dan custom order diproses lewat WhatsApp resmi.

## Aturan Utama

- **Static Export**: Dilarang menggunakan API routes, Server Actions, middleware, database, form kirim data, keranjang belanja, checkout, atau autentikasi.
- **Komponen**: Default Server Component. `'use client'` hanya untuk interaksi kecil (`WhatsAppInquiryBuilder`, `ProjectPortfolio`, `MobileNav`, `ProductGallery`, `ThemeToggle`, `RoomSelector`, `ProductCatalog`, `FeaturedShowcase`, `QuickViewModal`).
- **Keamanan**:
  - Dilarang `dangerouslySetInnerHTML` (aturan ESLint `react/no-danger`). JSON-LD wajib memakai `src/components/JsonLd.tsx`.
  - Link eksternal wajib menyertakan `target="_blank" rel="noopener noreferrer"`.
  - Security headers diatur di `public/_headers` dan `vercel.json`.
- **WhatsApp**:
  - Semua link WhatsApp dibuat melalui fungsi terpusat `buildWhatsAppLink()`, `productMessage()`, dan `buildInquiryMessage()` di `src/lib/whatsapp.ts`.
  - Nilai nomor WA dan nama toko berasal dari `src/lib/config.ts` (publik via `NEXT_PUBLIC_*`).
- **Data & Konten**:
  - Tipe TypeScript ketat di `src/data/products.ts`, `src/data/projects.ts`, dan `src/data/rooms.ts`.
  - Data yang memerlukan konfirmasi pemilik usaha ditandai `// TODO`.
  - Foto berstatus `kind: 'render 3D'` wajib menampilkan badge visual "Render 3D / Desain".
- **Media & Gambar**:
  - Foto mentah ditaruh di `assets-src/products/<slug>/` atau `assets-src/brand/`.
  - Jalankan `npm run optimize-images` untuk menghasilkan WebP dan OpenGraph JPEG di `public/`.
  - Komponen `next/image` harus memakai `fill` dengan rasio `aspect-[4/5]`, `sizes` responsif, dan `alt` deskriptif.
- **Desain & A11y**:
  - Palet warna brand: Forest green (`--accent: #154c3e`), warm teak (`--teak: #c58645`), warm cream (`--background: #f9f6f0`), dan deep charcoal (`--background: #111413`).
  - Kontras teks memenuhi WCAG AA (≥ 4.5:1).
  - Satu `h1` per halaman, HTML semantik, focus trap pada modal lightbox, dan penghormatan `prefers-reduced-motion`.

## Halaman Website
- `/` : Beranda (Hero foto terbaik, 6 keunggulan, 6 kartu kategori, 6 cuplikan proyek, alur 4 langkah, FAQ, WhatsApp builder)
- `/produk` & `/produk/[slug]` : Katalog 28 produk furnitur + detail spesifikasi + galeri + tombol WA
- `/inspirasi` : 4 Kurasi tata ruang (Open Space Office, Ruang Direktur, Cafe/Resto, Ruang Tamu)
- `/proyek` : Portofolio proyek B2B & B2C dengan filter klien & lightbox aksesibel
- `/layanan` : Custom furniture, tata ruang, pengiriman, perakitan & timeline produksi
- `/tentang` : Profil workshop Jepara, pengalaman, komitmen mutu
- `/kontak` : WhatsApp, email, alamat fisik, jam buka, jangkauan pengiriman, peta link luar

## Verifikasi Wajib
Setelah setiap perubahan:
1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`
Semua harus keluar dengan exit code 0 dan menghasilkan folder `out/`.
