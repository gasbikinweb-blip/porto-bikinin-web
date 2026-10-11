# Panduan untuk Claude

Website **statis** Satu Gudang (custom furniture, desain interior, arsitektur & bangun di Bali).
Next.js 16 App Router, `output: 'export'`, dua bahasa: EN di `/` (default), ID di `/id`. Semua konversi lewat
WhatsApp. Baca README.md untuk struktur & cara menambah konten.

## Wajib dipatuhi

- Tidak ada API routes, Server Actions, middleware, form yang mengirim data, keranjang, checkout, atau login.
- **Semua teks** di `src/content/{en,id}.ts` (bentuk di `types.ts`). Jangan menulis teks langsung di komponen.
  Setiap perubahan teks harus di kedua bahasa.
- Data terstruktur di `src/data/*.ts` dengan tipe ketat; teksnya di content dengan kunci id yang sama.
  Data karangan ditandai `// TODO`. Testimoni contoh disembunyikan di production (`isProduction`).
- Komponen client (`'use client'`) hanya untuk interaksi kecil: PortfolioGallery (filter + lightbox), MobileNav,
  HeaderShell, ThemeToggle, RevealObserver. Kirim ke client hanya string/data yang dipakai, jangan objek konten
  utuh atau fungsi. FAQ memakai `<details>` (tanpa JS).
- Semua link WhatsApp lewat `waLink()` / `buildWhatsAppLink()` di `src/lib/whatsapp.ts`; template pesan di `content.wa`.
- Konfigurasi hanya di `src/lib/config.ts` (nilai `NEXT_PUBLIC_*` bersifat publik). Tidak ada domain hardcode;
  URL absolut dari `NEXT_PUBLIC_SITE_URL`.
- Dua root layout (`app/(en)/layout.tsx`, `app/(id)/id/layout.tsx`) memakai `RootDocument` agar `lang` benar;
  404 lewat `app/global-not-found.tsx` (flag `experimental.globalNotFound`).
- Dilarang `dangerouslySetInnerHTML` (ESLint `react/no-danger`). JSON-LD lewat `components/ui/JsonLd.tsx`.
- Link eksternal: `target="_blank" rel="noopener noreferrer"` (pakai `ExternalLink`).
- Gambar: asli di `assets-src/`, `npm run optimize-images` → `public/**/<nama>.webp` (1600px) & `-sm.webp` (800px).
  Path di data **tanpa ekstensi**, pakai `imgLarge()`/`imgSmall()`. `next/image` dengan `fill` + `sizes`, alt
  deskriptif, `priority` hanya hero/logo, wadah berasio tetap. Jangan memakai gambar karangan/stok.
- Warna lewat token di `globals.css` (terang default, gelap via `prefers-color-scheme` atau `data-theme`).
  Tombol oranye pakai teks `text-on-accent` (gelap) — putih di atas oranye tidak lolos kontras. Teks oranye
  kecil pakai `text-accent-text`. Area di atas foto pakai `.theme-dark`.
- Animasi: kelas `reveal*` + `data-stagger`; elemen khas `TimberArc` (lengkung plafon kayu + titik oranye logo).
  Semua menghormati `prefers-reduced-motion`.
- Security headers di `public/_headers` dan `vercel.json`. Versi dependency exact.
- Komentar kode dalam bahasa Indonesia (singkat). Satu `h1` per halaman (di Hero), HTML semantik, a11y.

## Alur kerja

1. Setelah mengubah kode: `npm run lint`, `npm run typecheck`, `npm run build` sampai bersih.
2. Cek tampilan desktop & HP, terang & gelap, tanpa scroll horizontal di HP.
3. Perubahan besar (struktur, desain): tampilkan rencana singkat dulu.
