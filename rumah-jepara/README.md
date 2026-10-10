# Lini Rumah Jepara

Website **katalog furnitur statis** untuk Lini Rumah Jepara, dibuat dengan Next.js 16 (App Router), TypeScript strict,
dan Tailwind CSS v4. Website ini hanya etalase: **tidak ada** keranjang, checkout, pembayaran, login, maupun form.
Semua pertanyaan dan pemesanan diarahkan ke WhatsApp.

Hasil build berupa file HTML/CSS/JS biasa di folder `out/`, tanpa server Node saat runtime.

## Persyaratan

- Node.js `>=20.9.0` (dikembangkan dengan versi `22.20.0`, lihat `.nvmrc`)
- npm 10+

## Perintah

| Perintah                  | Fungsi                                                               |
| ------------------------- | -------------------------------------------------------------------- |
| `npm install`             | Install dependency (versi dikunci exact)                             |
| `npm run dev`             | Server development di http://localhost:3000                          |
| `npm run build`           | Build statis ke folder `out/`                                        |
| `npm start`               | Menyajikan folder `out/` secara lokal (pakai serve)                  |
| `npm run lint`            | ESLint (`eslint .`, bukan `next lint` yang sudah dihapus di Next 16) |
| `npm run typecheck`       | Cek tipe TypeScript                                                  |
| `npm run format`          | Rapikan kode dengan Prettier                                         |
| `npm run audit`           | Cek kerentanan dependency (`npm audit`)                              |
| `npm run optimize-images` | Ubah foto di `assets-src/` menjadi WebP terkompresi di `public/`     |

## Struktur

```
assets-src/              foto ASLI (tidak disajikan ke pengunjung)
  products/<slug>/01.jpg
  brand/logo.jpg
public/
  products/<slug>/01.webp   hasil optimize-images (jangan diedit manual)
  brand/logo.webp
  video/hero.mp4, showcase.mp4
  _headers, robots.txt
scripts/optimize-images.mjs
src/
  app/                   halaman: beranda, /produk, /produk/[slug], /tentang, /kontak, 404, sitemap
  components/            Header, Footer, ProductCard, ProductCatalog (filter), ProductGallery, tombol WA, dll.
  data/products.ts       SEMUA data produk + helper
  lib/config.ts          nama toko, nomor WA, alamat, jam buka
  lib/whatsapp.ts        buildWhatsAppLink() dan template pesan
```

Client component hanya dipakai di tiga tempat: filter katalog, galeri thumbnail, dan menu HP. Sisanya server component.
Animasi muncul saat scroll memakai CSS murni (`animation-timeline: view()`), tanpa JavaScript. Browser yang belum
mendukung tetap menampilkan konten secara normal, dan semua animasi dimatikan untuk pengguna `prefers-reduced-motion`.

## Mode terang / gelap

- Default: **mode gelap** (tampilan brand). Pengunjung bisa menggantinya lewat tombol matahari/bulan di navbar,
  dan pilihannya disimpan di `localStorage` browser mereka.
- Warna kedua mode diatur sebagai CSS variable di `src/app/globals.css` (`:root` = gelap, `[data-theme='light']` = terang).
- Area teks di atas foto/video (hero, banner proyek, panggung Room Select) memakai kelas `.theme-dark` supaya tetap terbaca.
- `public/theme-init.js` dimuat secara sinkron di `<head>` agar tema terpasang sebelum halaman digambar (tidak berkedip).
  File ini eksternal, bukan inline, jadi tetap lolos CSP `script-src 'self'`.

## Kutipan

Kutipan di beranda diatur di `src/data/quotes.ts`. Pakai hanya kutipan dengan atribusi yang jelas.

## Menambah produk baru

1. Buat folder `assets-src/products/<slug-produk>/`, lalu isi dengan foto bernama `01.jpg`, `02.jpg`, dan seterusnya
   (foto `01` dipakai sebagai sampul; rasio 4:5 paling ideal).
2. Jalankan `npm run optimize-images`. WebP akan dibuat di `public/products/<slug-produk>/`.
3. Tambahkan objek baru di array `products` dalam `src/data/products.ts`:
   ```ts
   {
     slug: 'meja-tv-jati',
     name: 'Meja TV Jati',
     category: 'lemari-buffet',
     description: '...',
     images: gallery('meja-tv-jati', ['Alt gambar 1', 'Alt gambar 2']), // satu alt per foto
     specs: { material: 'Kayu jati', dimensions: 'P 160 × L 45 × T 55 cm', colors: ['Walnut impra'] },
     price: 4500000, // opsional; hapus baris ini untuk "Hubungi kami untuk harga"
     featured: false, // true = tampil di beranda
   },
   ```
4. Kategori baru? Tambahkan ke tipe `CategorySlug` dan array `categories` di file yang sama.
5. `npm run build`. Halaman detail dan sitemap dibuat otomatis.

Data yang masih karangan ditandai `// TODO: ganti dengan data asli` di `src/data/products.ts` dan `src/lib/config.ts`.

## Mengganti nomor WhatsApp

Isi di `.env.local` (lokal) atau di pengaturan environment hosting:

```
NEXT_PUBLIC_WA_NUMBER=6282133030062
NEXT_PUBLIC_SITE_NAME=Lini Rumah Jepara
```

- Format internasional **tanpa `+` dan tanpa spasi**. Nomor berawalan `0` otomatis diubah menjadi `62`
  oleh `normalizeWaNumber()`. Kalau nomornya tidak valid, build sengaja **gagal** supaya tidak ada tombol WA yang rusak.
- Ubah juga `waDisplay` (nomor yang tampil untuk dibaca) di `src/lib/config.ts`.
- Semua tombol memakai satu fungsi `buildWhatsAppLink(message)`, dan pesan di-encode dengan `encodeURIComponent`.

> **Nomor WA itu PUBLIK, bukan secret.** Nomor tersebut memang tampil di setiap tombol dan link `wa.me`.
> Begitu juga semua variabel `NEXT_PUBLIC_*`: nilainya ikut dibundel ke JavaScript dan siapa pun bisa membacanya.
> Jangan pernah menaruh secret (API key privat, token, password) di sini. Website statis tidak punya tempat aman untuk secret.

Setelah mengganti domain di `NEXT_PUBLIC_SITE_URL`, perbarui juga baris `Sitemap:` di `public/robots.txt`.

## Gambar & video

`images.unoptimized: true` (wajib untuk static export) berarti Next.js **tidak** mengompres gambar. Karena itu ada
`npm run optimize-images` (sharp): foto asli di `assets-src/` diubah menjadi WebP (lebar maksimal 1600 px, kualitas 78)
di `public/`. File asli tidak pernah ditimpa, dan file yang sudah diproses dilewati.

Video tidak dikompres otomatis. Kalau menambah video, kompres dulu (misalnya dengan HandBrake) agar ukurannya kecil.

## Keamanan

- `dangerouslySetInnerHTML` dilarang lewat rule ESLint `react/no-danger`.
- Semua link eksternal dan `wa.me` memakai `target="_blank" rel="noopener noreferrer"`.
- Tidak ada input pengguna yang dikirim ke mana pun. Filter kategori hanya memfilter data lokal di browser.
- Tidak ada API routes, Server Actions, atau middleware.
- **JSON-LD (Product)** dirender sebagai teks anak `<script type="application/ld+json">` (lihat
  `src/components/JsonLd.tsx`) dengan karakter `<` di-escape menjadi `<`, sehingga tidak bisa menutup tag script.
  Cara ini tidak membutuhkan `dangerouslySetInnerHTML`. JSON-LD juga tidak terkena CSP `script-src` karena tidak dieksekusi.

### Security headers

`headers()` di `next.config.ts` **TIDAK berfungsi** pada `output: 'export'`, karena tidak ada server Next.js
yang mengirim header. Header harus diatur di level hosting:

- **Netlify / Cloudflare Pages:** `public/_headers` (otomatis tersalin ke `out/_headers`)
- **Vercel:** `vercel.json`
- **Nginx / Apache / lainnya:** salin nilai header yang sama ke konfigurasi server.

Header yang dipasang: Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy (kamera, mikrofon, geolokasi dimatikan), dan Strict-Transport-Security.
Untuk katalog ini CSP hanya ditambah `media-src 'self'` (video). Tidak ada domain eksternal yang diizinkan, karena link
`wa.me` adalah navigasi biasa yang tidak dibatasi CSP.

### Trade-off CSP

Next.js menyisipkan **inline `<script>`** di setiap halaman untuk hydration (data RSC). Ada tiga pilihan:

1. **Nonce:** paling ketat, tapi butuh server untuk membuat nonce per request. **Tidak mungkin** di static export.
2. **Hash (`'sha256-...'`):** ketat, tapi hash berubah setiap kali build/konten berubah, jadi perlu skrip tambahan.
3. **`'unsafe-inline'`:** dipakai di sini. Risikonya kecil karena situs tidak merender input pengguna,
   `dangerouslySetInnerHTML` dilarang, dan semua sumber lain dikunci ke `'self'`.

HSTS memakai `preload`. Pastikan seluruh domain dan subdomain sudah HTTPS sebelum mendaftar ke hstspreload.org.

### Dependency

- Semua versi dikunci exact (`.npmrc` berisi `save-exact=true`), dan `package-lock.json` wajib di-commit.
- Aktifkan **Dependabot** (GitHub) atau **Renovate** agar update keamanan datang otomatis lewat PR.
- Catatan audit: `npm audit` masih melaporkan advisory `braces` di rantai `eslint-config-next` (tooling dev saja,
  tidak masuk ke hasil build). Jangan jalankan `npm audit fix --force`, karena perintah itu menurunkan ke Next 14.
  `npm audit --omit=dev` bersih.
- ESLint dikunci di 9.x karena plugin react / jsx-a11y / import belum mendukung ESLint 10.

## Pesan WhatsApp & kartu pratinjau

Tombol "Tanya via WhatsApp" mengirim pesan berisi detail produk (nama, bahan, ukuran, warna, harga) dan
**link halaman produk**. WhatsApp otomatis menampilkan kartu pratinjau (foto + judul) dari metadata openGraph.

- Foto pratinjau memakai `public/products/<slug>/og.jpg` (JPG 600px, dibuat `npm run optimize-images` dari foto `01`),
  karena WhatsApp tidak selalu menampilkan pratinjau WebP.
- Link memakai `NEXT_PUBLIC_SITE_URL`. Sementara diisi subdomain Netlify `https://lini-rumah-jepara.netlify.app`.
  Saat membuat site di Netlify, beri nama `lini-rumah-jepara` (atau sesuaikan nilainya kalau nama itu sudah dipakai orang).
- Kartu pratinjau **hanya muncul setelah website online** (WhatsApp tidak bisa membaca localhost). WhatsApp juga
  menyimpan cache pratinjau, jadi perubahan foto bisa butuh waktu untuk terlihat.
- Saat domain asli siap: ganti `NEXT_PUBLIC_SITE_URL`, baris `Sitemap:` di `public/robots.txt`, lalu build ulang.

## Deploy

Jalankan `npm run build`, lalu unggah isi folder `out/`.

- **Netlify:** build command `npm run build`, publish directory `out`.
- **Cloudflare Pages:** framework preset _None_, build command `npm run build`, output `out`.
- **Vercel:** import repo, isi **Root Directory** dengan `rumah-jepara`, dan biarkan Output Directory default (jangan diisi `out`; Vercel otomatis menangani static export). Header diatur `vercel.json`.
- **GitHub Pages / hosting lain:** unggah isi `out/`. Header keamanan harus diatur manual.

Jangan lupa mengisi `NEXT_PUBLIC_SITE_URL` (domain asli), `NEXT_PUBLIC_WA_NUMBER`, dan `NEXT_PUBLIC_SITE_NAME`
di pengaturan environment hosting.
