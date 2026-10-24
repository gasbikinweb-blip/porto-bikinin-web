# YF Furniture & Interior — Website Katalog & Portofolio

Website etalase statis satu halaman (one-page) untuk workshop furnitur & interior custom di Boyolali.
Desain mengikuti referensi https://porto-busrmebel-furniture.vercel.app/ (struktur & nuansa, konten berbeda). Dibangun dengan
Next.js 16 (App Router, `output: 'export'`), TypeScript strict, dan Tailwind CSS 4. Tanpa backend,
login, pembayaran, atau form yang mengirim data: semua pemesanan lewat WhatsApp.

## Kebutuhan

- Node.js ≥ 20.9 (dikembangkan dengan 22.20, lihat `.nvmrc`), npm 10+
- Next.js 16.4.3 (patch keamanan dari 16.4.0)

## Perintah

| Perintah                  | Fungsi                                               |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Server pengembangan (http://localhost:3000)          |
| `npm run build`           | Build statis ke folder `out/`                        |
| `npm start`               | Menyajikan `out/` secara lokal (paket `serve`)       |
| `npm run lint`            | ESLint (`eslint .`, bukan `next lint`)               |
| `npm run typecheck`       | Cek tipe TypeScript                                  |
| `npm run format`          | Prettier                                             |
| `npm run audit`           | `npm audit` untuk cek kerentanan dependency          |
| `npm run optimize-images` | Konversi foto dari `../assets/` ke WebP di `public/` |

## Struktur

```
scripts/katalog.manifest.mjs   folder assets → slug karya + foto terpilih
scripts/optimize-images.mjs    sharp: WebP 1600px + thumbnail 640px + og.jpg, tanpa EXIF/GPS
src/data/site.ts               profil bisnis (alamat, sosial, jam kerja, area)
src/data/categories.ts         daftar kategori
src/data/works.ts              data karya (judul, kategori, tanggal, alt, status)
src/data/faq.ts                FAQ
src/data/images.generated.json ukuran gambar (dibuat otomatis oleh script)
src/lib/config.ts              env NEXT_PUBLIC_* + pembersih nomor WA
src/lib/whatsapp.ts            buildWhatsAppLink() — dipakai semua tombol WA
src/components/                HeroSlider, FeaturedWorks, CatalogTabs, WorkModal, WhatsAppBuilder, MobileNav (client)
src/app/page.tsx               website satu halaman: hero, kategori, karya, katalog, tentang, cara pesan, FAQ, kontak
```

## Mengganti nomor WhatsApp

Salin `.env.example` menjadi `.env.local` (atau isi di dashboard hosting), lalu ubah:

```
NEXT_PUBLIC_WA_NUMBER=0898-8747-150   # boleh pakai 0/spasi/strip, otomatis jadi 628988747150
```

Build akan gagal bila nomornya tidak valid. Tampilan nomor di halaman ada di `src/data/site.ts`
(`waDisplay`).

> **Penting:** semua variabel `NEXT_PUBLIC_*` dan nomor WA bersifat **PUBLIK** — ikut ke browser.
> Jangan pernah menaruh secret di sana.

## Menambah karya baru

1. Taruh folder postingan di `../assets/` (format `YYYY-MM-DD_kodepostingan`).
2. Tambahkan entri di `scripts/katalog.manifest.mjs` (slug + file foto terpilih; foto pertama = cover).
3. Jalankan `npm run optimize-images`.
4. Tambahkan data di `src/data/works.ts` (judul, kategori, tanggal, `igCode`, ringkasan, dan satu `alt`
   per foto dengan urutan yang sama). Set `status: 'proses'` bila foto masih di workshop/berplastik.
5. `npm run build`. Kategori baru otomatis muncul begitu punya minimal satu karya.

## Deploy

Hasil build adalah folder statis `out/`, bisa di-hosting di mana saja.

- **Vercel**: import repo, root directory `yf-furniture-web`. `vercel.json` sudah mengatur build,
  output `out`, dan security headers.
- **Netlify / Cloudflare Pages**: build command `npm run build`, publish directory `out`.
  Header dibaca dari `public/_headers` (ikut tersalin ke `out/_headers`).
- Set `NEXT_PUBLIC_SITE_URL` ke domain asli agar canonical, sitemap, dan OG benar.

## Keamanan

- **Header di `next.config.ts` TIDAK berfungsi pada static export.** Header diatur di hosting:
  `public/_headers` (Netlify/Cloudflare) dan `vercel.json` (Vercel). Isinya sama: CSP, `nosniff`,
  `X-Frame-Options: DENY` + `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy
  (kamera/mikrofon/geolokasi mati), HSTS, COOP, dan CORP.
- **Trade-off CSP:** Next.js menyisipkan inline script untuk hidrasi React. Pada static export
  tidak ada server untuk membuat nonce per-request, dan hash berubah setiap build, jadi
  `script-src` memakai `'unsafe-inline'`. Risiko ditekan karena: tidak ada script/domain pihak
  ketiga, tidak ada input pengguna yang dirender sebagai HTML, `dangerouslySetInnerHTML` dilarang
  lewat ESLint (`react/no-danger`), `object-src`/`frame-src` `'none'`, dan `form-action 'none'`.
  Bila butuh lebih ketat, opsinya: hosting dengan edge function yang menyuntikkan nonce, atau
  script build yang menghitung hash SHA-256 setiap inline script di `out/` lalu menulis CSP.
- JSON-LD LocalBusiness dirender sebagai teks anak `<script type="application/ld+json">` (tanpa
  `dangerouslySetInnerHTML`, karakter `<` di-escape), dan tidak dieksekusi sehingga aman dengan CSP.
- Tidak ada iframe (Google Maps/Instagram) — hanya link keluar dengan `rel="noopener noreferrer"`.
- Tidak ada analytics/tracking, cookie, atau penyimpanan data pengunjung.
- `public/.well-known/security.txt` berisi placeholder kontak.
- Aktifkan **Dependabot** (`.github/dependabot.yml`, ekosistem `npm`) atau **Renovate** di repo,
  dan jalankan `npm run audit` secara berkala.

### Catatan

- Saat diuji dengan `serve`, Next.js 16 kadang meminta file prefetch `__next.*.txt` dengan nama yang
  berbeda dari yang diekspor (404 di console). Navigasi tetap jalan (fallback ke muat halaman
  biasa). Ini perilaku Next.js, bukan bug website.

## Hak cipta & privasi foto

- Website hanya memakai foto dari folder `assets/` (postingan Instagram @yffurnitureinterior).
  **Pastikan pemilik setuju fotonya dipakai di website.**
- Script optimasi otomatis membuang metadata EXIF/GPS. Untuk foto yang di-upload manual, hapus
  EXIF/GPS terlebih dahulu.
- Foto yang menampilkan wajah orang dengan jelas tidak dipakai.

## Daftar TODO sebelum rilis

- [ ] Domain asli → `NEXT_PUBLIC_SITE_URL` dan `security.txt` (Canonical, Contact, Expires)
- [x] Logo asli (`assets/Logo.jpg`) sudah dipakai: header, footer, favicon, apple-icon
- [ ] Jam kerja asli (`src/data/site.ts`)
- [ ] Email (bila ada), tahun berdiri, nama pemilik, cerita asli di `/tentang`
- [ ] Konfirmasi area layanan, area kirim, dan apakah ada jasa pasang
- [ ] Konfirmasi klaim bahan (plywood melamin/blockboard, finishing HPL) dan free desain & cek lokasi
- [ ] Semua jawaban FAQ (`src/data/faq.ts`)
- [ ] Verifikasi jumlah postingan Instagram (368+)
- [ ] Persetujuan pemilik untuk semua foto
- [ ] Link Google Maps: ganti dengan link pin lokasi workshop yang tepat
