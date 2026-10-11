# Satu Gudang — website

Website statis (Next.js 16, `output: 'export'`) untuk **Satu Gudang Project**: custom furniture, desain interior,
dan arsitektur & bangun di Bali. Tanpa backend, form, atau login: semua konsultasi & pemesanan lewat **WhatsApp**.

- Bahasa: **English** di `/` (default) dan **Bahasa Indonesia** di `/id`.
- Satu halaman per bahasa: Hero → Layanan → Portofolio (filter + lightbox) → Paket Kamar Tidur → Material →
  Proses & sebelum/sesudah → (Testimoni, hanya saat dev) → FAQ → Kontak WhatsApp.

## Menjalankan

```bash
npm install
npm run dev              # http://localhost:3000 (EN) dan /id (ID)
npm run optimize-images  # setelah menambah/mengganti foto di assets-src/
npm run lint && npm run typecheck && npm run build   # hasil di folder out/
npm start                # menyajikan out/ secara lokal
```

Node 22 (lihat `.nvmrc`). Versi dependency dikunci exact.

## Struktur

```
assets-src/            foto ASLI (tidak di-deploy)
  brand/               logo-full.png (arsip), mark-dark.png, mark-light.png
  projects/<slug>/     01.jpg, 02.jpg, ... (01 = sampul)
  materials/           crop detail material dari foto proyek
  process/             foto sebelum renovasi & progres pengerjaan
public/                hasil optimize-images (.webp + -sm.webp), og/og-default.jpg, _headers, theme-init.js
src/app/               halaman tipis: (en)/page.tsx, (id)/id/page.tsx, layout per bahasa, sitemap.ts, robots.ts,
                       global-not-found.tsx, globals.css (token warna)
src/content/           SEMUA teks: types.ts, en.ts, id.ts, index.ts (bahasa default & path)
src/data/              data terstruktur bertipe ketat: services, projects, packages, materials, process
src/components/site/   Header, Footer, Logo, MobileNav, ThemeToggle, FloatingWhatsApp, RootDocument
src/components/sections/ Hero, Services, Portfolio(+Gallery), BedroomPackages, Materials, Process,
                       Testimonials, Faq, Contact, HomeSections (urutan section)
src/components/ui/     Button, icons, SectionHeading, TimberArc (elemen khas), JsonLd, ExternalLink, RevealObserver
src/lib/               config.ts (NEXT_PUBLIC_*), whatsapp.ts (satu pembuat link WA), seo.ts, fonts.ts, format.ts
```

Ganti bisnis cukup ubah `src/content/`, `src/data/`, `src/lib/config.ts`, dan token warna di `globals.css`.

## Cara mengubah konten

| Ingin mengubah | File |
| --- | --- |
| Teks apa pun (judul, FAQ, pesan WA) | `src/content/en.ts` **dan** `src/content/id.ts` (TypeScript menolak bila salah satu kurang) |
| Nomor WA, domain, Instagram/Threads | `.env` / Vercel env (`NEXT_PUBLIC_*`) atau default di `src/lib/config.ts` |
| Warna | token di `src/app/globals.css` (cek kontras ≥ 4.5:1) |
| Urutan section | `src/components/sections/HomeSections.tsx` |

Template pesan WhatsApp ada di `wa` pada file content. Placeholder `{service}`, `{project}`, `{package}` diisi otomatis.

### Menambah proyek portofolio

1. Taruh foto di `assets-src/projects/<slug-baru>/01.jpg, 02.jpg, …` (01 = sampul).
2. `npm run optimize-images`.
3. Tambahkan slug ke `projectSlugs` dan entri baru di `projects` (`src/data/projects.ts`): kategori
   `commercial`/`residential`, layanan, jumlah foto.
4. Tambahkan teks di `portfolio.items` pada **en.ts dan id.ts**: judul, lokasi, ringkasan, scope, dan
   `alts` (satu alt deskriptif per foto, urutan sama). Build gagal bila jumlah alt ≠ jumlah foto.

### Mengisi harga paket kamar tidur

`src/data/packages.ts` → isi `priceFrom` (Rupiah, angka). Selama `null`, kartu menampilkan “Price on request /
Harga sesuai budget” (+ label TODO hanya saat `npm run dev`). Isi paket ada di `packages.items` di content.

### Testimoni

Testimoni di content masih contoh dan **otomatis disembunyikan di build production**
(`src/components/sections/Testimonials.tsx`). Setelah diganti testimoni asli, hapus baris `if (isProduction) return null;`.

### Hero slideshow & desain 3D

- Gambar hero: `src/data/hero.ts` (3 path, urutan = slide). Label & kalimat tiap slide (siapa kami, visi, misi)
  di `hero.slides` pada content. Ganti otomatis tiap 6,5 detik, bisa dijeda, berhenti otomatis bila pengguna
  memilih "reduce motion".
- Render desain 3D: `assets-src/design/01..05.jpg` → `src/data/design.ts`, alt di `design.alts`.
- Foto request sample warna: `assets-src/process/sample-request-1/2.jpg` (dipakai di section Material & Proses).

### Foto workshop

Langkah “Produksi di workshop” belum punya foto asli. Tambahkan foto ke `assets-src/process/workshop.jpg`,
jalankan optimize-images, lalu isi `image: '/process/workshop'` di `src/data/process.ts`.

## Deploy (Vercel)

1. Push folder ini ke GitHub, import di Vercel. `vercel.json` sudah mengatur `framework: null`,
   `buildCommand: npm run build`, `outputDirectory: out`, `cleanUrls: true`, dan security headers.
2. Environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = domain final, mis. `https://satugudang.com` (**tanpa slash akhir**)
   - `NEXT_PUBLIC_WA_NUMBER` = `6282144609680` (opsional, sudah default)
3. **Redeploy setelah mengisi `NEXT_PUBLIC_SITE_URL`** — canonical, hreflang, sitemap, robots, og:image, dan
   JSON-LD dibangun dari nilai ini saat build. Tanpa itu, semuanya menunjuk ke `http://localhost:3000`.
4. Setelah live: daftarkan `https://domain/sitemap.xml` di Google Search Console, cek pratinjau link di WhatsApp.

Netlify / Cloudflare Pages: build `npm run build`, publish `out/`; header dibaca dari `public/_headers`.

### Catatan keamanan

CSP memakai `script-src 'self' 'unsafe-inline'` karena Next.js menyisipkan inline script untuk hydration pada
static export (tanpa server, nonce tidak bisa dibuat per request). Risiko kecil karena tidak ada input pengguna
atau konten pihak ketiga. Semua `NEXT_PUBLIC_*` bersifat publik — jangan menaruh secret.
