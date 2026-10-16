# Seams Konveksi: Company Profile & Portofolio

Website statis (Next.js 16 App Router, `output: 'export'`) untuk jasa konveksi abaya dan khimar.
Tanpa backend, tanpa form, tanpa transaksi. Semua konsultasi lewat WhatsApp.

- Node.js 22.20.0 (lihat `.nvmrc`), npm 10.9.3
- Next.js 16.4.0, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, ESLint 9 (flat config)
- Semua versi dikunci exact (`.npmrc`: `save-exact=true`)

## Perintah

| Perintah                  | Fungsi                                                   |
| ------------------------- | -------------------------------------------------------- |
| `npm run dev`             | Server pengembangan di http://localhost:3000             |
| `npm run build`           | Build statis ke folder `out/`                            |
| `npm start`               | Menyajikan `out/` secara lokal (cek hasil build)         |
| `npm run lint`            | ESLint (`eslint .`, bukan `next lint`)                   |
| `npm run typecheck`       | Cek tipe TypeScript                                      |
| `npm run format`          | Prettier                                                 |
| `npm run audit`           | `npm audit` untuk celah keamanan dependency              |
| `npm run optimize-images` | Ubah foto `assets-src/` menjadi WebP di `public/images/` |

## Mengganti nomor WhatsApp & nama situs

Salin `.env.example` menjadi `.env.local` (lokal) atau isi di pengaturan environment hosting:

```
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
NEXT_PUBLIC_SITE_NAME=Seams Konveksi
NEXT_PUBLIC_WA_NUMBER=628xxxxxxxxxx
```

Format nomor: internasional tanpa `+` dan spasi. Awalan `0` otomatis diubah menjadi `62`; nomor
tidak valid membuat build gagal (supaya tidak ada tombol WA rusak). Ubah juga `waDisplay` di
`src/data/site.ts`.

> **Penting:** semua variabel `NEXT_PUBLIC_*` ikut dibundel ke JavaScript dan **bersifat publik**.
> Nomor WA memang publik. Jangan pernah menaruh secret di variabel ini.

## Struktur

```
src/
  app/            halaman (/, /produk, /produk/[slug], /solusi, /portofolio, /layanan, /tentang, /kontak, /faq)
  components/     Header, Footer, Lightbox, PortfolioGallery, MessageBuilder, ui.tsx, sections.tsx
  data/           site.ts, products.ts, solutions.ts (+ layanan & ketentuan), projects.ts, faq.ts
  lib/            config.ts (env + validasi WA), whatsapp.ts (buildWhatsAppLink), metadata.ts
assets-src/       foto ASLI (tidak ikut ter-deploy)
public/           file statis: _headers, .well-known/security.txt, og.jpg, placeholder/, images/
```

Client component hanya: `MobileNav`, `PortfolioGallery` + `Lightbox`, `MessageBuilder`,
`RevealObserver` (animasi scroll), dan `error.tsx`.

## Menambah foto portofolio

1. Taruh foto asli di `assets-src/portofolio/` (nama bebas, mis. hasil WhatsApp).
2. `npm run optimize-images` → menghasilkan `public/images/portofolio/<slug>.webp` (maks 1600px)
   dan `<slug>-thumb.webp` (600px). File asli tidak ditimpa; EXIF/GPS dibuang. Script mencetak
   ukuran (width x height).
3. Tambah entri di `src/data/projects.ts`:

```ts
{
  id: 'abaya-mauve-tiedye',
  src: '/images/portofolio/abaya-mauve-tiedye.webp',
  thumb: '/images/portofolio/abaya-mauve-tiedye-thumb.webp',
  alt: 'Abaya warna mauve motif tie-dye digantung di rak pakaian',
  category: 'abaya',            // abaya | khimar | gamis | lainnya
  productType: 'Abaya',
  material: 'Rayon tie-dye',    // opsional, isi hanya bila benar
  caption: 'Produksi abaya untuk koleksi lebaran.',
  kind: 'proyek',               // 'ilustrasi' untuk mockup/render → otomatis berlabel "Ilustrasi"
  width: 1200, height: 1600,
},
```

4. Hapus entri placeholder (`kind: 'ilustrasi'`, `src: '/placeholder/...'`).

Foto produk/hero: taruh di `assets-src/produk/`, lalu ganti `image` di `src/data/products.ts`.
Hero beranda memakai foto produk pertama.

## Menambah video produksi

Video ada di `public/videos/` (sudah dikompres) dan datanya di `src/data/videos.ts`. Video mentah
disimpan di `assets/` (diabaikan git). Kompres video baru dengan ffmpeg sebelum dipakai:

```bash
ffmpeg -i mentah.mp4 -an -vf "scale=540:-2,fps=30" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -map_metadata -1 public/videos/nama-video.mp4
```

```bash
ffmpeg -ss 1 -i public/videos/nama-video.mp4 -frames:v 1 -q:v 3 public/videos/nama-video-poster.jpg
```

Audio sengaja dibuang (`-an`) karena musik Instagram bisa kena hak cipta dan supaya file lebih
kecil. Video memakai `preload="none"`, jadi baru diunduh saat diputar. Potong bagian yang memuat
klaim harga atau info yang sudah tidak berlaku (`-ss` / `-t`).

## Menambah jenis produk

Tambah objek di `src/data/products.ts`. Halaman `/produk/<slug>` dan sitemap ikut dibuat
otomatis saat build (`generateStaticParams`, `dynamicParams = false`).

## Katalog PDF

Taruh file di `public/katalog/katalog-seams-konveksi.pdf`, lalu isi
`catalogPdf: '/katalog/katalog-seams-konveksi.pdf'` di `src/data/site.ts`. Selama kosong, tombol
unduh diganti teks "segera tersedia".

## Slot produksi

Ubah `site.slot` di `src/data/site.ts` (`status`: `tersedia` | `terbatas` | `penuh`), lalu build
ulang. Tidak ada server, jadi status diperbarui manual.

## Keamanan

- `react/no-danger` aktif: `dangerouslySetInnerHTML` dilarang. JSON-LD dirender lewat
  `src/components/JsonLd.tsx` sebagai teks anak `<script type="application/ld+json">` dengan `<`
  di-escape, jadi aman tanpa melanggar rule.
- Tidak ada form, penyimpanan, analytics, atau script pihak ketiga. Pembuat pesan WA hanya
  merangkai teks (dengan whitelist pilihan, batas panjang, angka positif, dan `encodeURIComponent`)
  lalu membuka `wa.me`.
- Semua link eksternal memakai `target="_blank" rel="noopener noreferrer"`.
- Tidak ada embed Google Maps atau feed Instagram; hanya link keluar.

### Security headers

`headers()` di `next.config.ts` **tidak berfungsi** pada static export. Header diatur di hosting:

- Netlify / Cloudflare Pages: `public/_headers` (ikut tersalin ke `out/`)
- Vercel: `vercel.json`
- Hosting lain (Nginx/Apache/cPanel): salin nilai yang sama ke konfigurasi server

Isi: CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (+ `frame-ancestors 'none'`),
`Referrer-Policy`, `Permissions-Policy` (kamera, mikrofon, geolokasi mati), HSTS, dan
`Cross-Origin-Opener-Policy: same-origin`.

**Trade-off CSP:** Next.js menyisipkan inline `<script>` untuk hidrasi (data RSC) di setiap
halaman, sehingga `script-src` memerlukan `'unsafe-inline'`. Nonce tidak bisa dipakai karena
nonce butuh server yang membuat nilai acak per request. Alternatif yang lebih ketat: hitung hash
SHA-256 setiap inline script di `out/**/*.html` setelah build lalu masukkan ke CSP (`'sha256-...'`)
lewat script post-build. Risikonya rendah di situs ini karena tidak ada input pengguna yang
dirender sebagai HTML dan tidak ada script pihak ketiga. `default-src 'self'` tetap memblokir
semua domain luar.

`.well-known/security.txt` berisi kontak placeholder; ganti email dan tanggal `Expires`.

### Dependency

Jalankan `npm run audit` secara berkala. Aktifkan **Dependabot** (GitHub → Settings → Code
security) atau **Renovate** agar update keamanan datang sebagai pull request.

### Analytics (opsional)

Default: tanpa tracking. Bila nanti perlu, pilih yang ramah privasi tanpa cookie, mis. Plausible,
Umami (self-host), atau Cloudflare Web Analytics, lalu tambahkan domainnya ke CSP
(`script-src` & `connect-src`).

## SEO

Metadata per halaman (title, description, canonical, Open Graph, Twitter card) lewat
`src/lib/metadata.ts`, `lang="id"`, `sitemap.xml` dan `robots.txt` dibuat otomatis, JSON-LD
`LocalBusiness` di beranda. Isi `NEXT_PUBLIC_SITE_URL` dengan domain asli sebelum build production.

## Deploy

- **Vercel:** impor repo, root directory `seams-konveksi`, isi env. `vercel.json` sudah mengatur
  build, folder `out`, dan headers.
- **Netlify / Cloudflare Pages:** build command `npm run build`, output `out`, isi env.
- **Hosting biasa:** `npm run build`, upload isi folder `out/`.

## Foto, hak cipta & privasi

- Pakai hanya foto milik Seams Konveksi. Jangan unduh dari internet.
- **Minta izin klien dan model** sebelum memublikasikan foto. Jangan tampilkan wajah model, logo,
  atau nama brand klien tanpa izin tertulis.
- Hapus EXIF/GPS sebelum upload (`npm run optimize-images` sudah melakukannya untuk folder
  `public/images/`). Jangan menaruh foto asli langsung di `public/`.
- Foto mockup/render/bukan hasil produksi nyata wajib `kind: 'ilustrasi'`.

## Daftar TODO

Cari semua dengan: `grep -rn "TODO" src public`. Ringkasnya:

- `src/lib/config.ts` & env: nomor WA, domain
- `src/data/site.ts`: nama pemilik, tahun berdiri, kota, alamat, link Maps, email, tampilan nomor
  WA, jam kerja, area layanan, status slot, file katalog PDF, angka pencapaian, verifikasi klaim
  keunggulan
- `src/data/products.ts`: foto asli, verifikasi model/ukuran/bahan/jahitan
- `src/data/projects.ts`: ganti semua placeholder dengan foto asli
- `src/data/solutions.ts`: estimasi waktu, minimum order, harga, kapasitas
- `src/data/faq.ts`: semua jawaban
- `src/app/tentang/page.tsx`: cerita profil asli
- `src/app/page.tsx`: alamat di JSON-LD
- `public/.well-known/security.txt`: email & tanggal kedaluwarsa
