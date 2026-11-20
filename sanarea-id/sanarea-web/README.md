# SANARÉA – Landing Page Katalog

Website **satu halaman** (Next.js 16, static export) untuk SANARÉA (@sanarea.id), brand hijab & aksesoris dari Cianjur.
Detail produk tampil dalam **modal** di halaman yang sama. Pembelian lewat WhatsApp atau langsung di toko.
Tanpa backend, checkout, pembayaran, atau login. Keranjang hanya ada di browser pengunjung (localStorage)
dan isinya dikirim sebagai satu pesan WhatsApp (nama penerima, alamat, titik lokasi).

Node 22.20.0 / npm 10.9.3, Next.js 16.4.6 (16.4.0 diblokir build karena celah keamanan) (lihat `.nvmrc`, `engines`). Versi dependency dikunci exact.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Mode pengembangan |
| `npm run build` | Build statis ke `out/` |
| `npm start` | Menyajikan `out/` secara lokal |
| `npm run lint` / `typecheck` / `format` | Kualitas kode (`eslint .`, `tsc --noEmit`, Prettier) |
| `npm run audit` | Cek kerentanan dependency (aktifkan juga Dependabot/Renovate di GitHub) |
| `npm run optimize-images` | `../assets/` → WebP 4:5 di `public/images/` (1200px / editorial 1600px + thumb 500px, EXIF/GPS dibuang) + `public/og.jpg` |

## Mengubah konten

- **Lini produk baru:** tambah di `src/data/collections.ts` (slug, nama, tagline, cover).
- **Produk / warna baru:** daftarkan foto di `scripts/images.manifest.mjs` (atur `y` untuk titik crop),
  jalankan `npm run optimize-images`, lalu tambah/ubah objek di `src/data/products.ts`.
  Warna: tambahkan nama di array `colors([...])`; kalau warna punya foto sendiri, isi objek gambar per warna
  (lihat `printed` atau `kaleea`). Kode hex warna ada di objek `hex` (perkiraan visual).
- **Harga:** field `price` di `products.ts`. Kosong = tampil "Tanya harga".
- **Promo/sale:** tambah objek di `src/data/promos.ts` (`startDate`/`endDate` YYYY-MM-DD, `salePrice` per slug).
  Promo otomatis tampil (banner + harga coret) hanya di rentang tanggalnya.
- **Produk habis:** set `soldOut: true`.
- **Nomor WA:** `NEXT_PUBLIC_WA_NUMBER` (lihat `.env.example`). Build gagal kalau formatnya tidak valid.
- **Jam buka:** `site.hours` di `src/data/site.ts` (per hari, dipakai status "Buka sekarang/Tutup" zona Asia/Jakarta).
- **Deep link produk:** `/#produk-[slug]`, opsional `?warna=[slug-warna]`. Slug & warna divalidasi terhadap data.

## Keranjang & lokasi

- `src/lib/cart.ts`: isi keranjang di `localStorage` (divalidasi ulang terhadap data produk saat dibaca).
- `src/components/CartDrawer.tsx`: nama penerima, alamat, catatan, lalu "Kirim pesanan via WhatsApp".
- Tombol "Gunakan lokasi saya saat ini" memakai Geolocation API, lalu koordinat diubah jadi alamat teks lewat
  OpenStreetMap Nominatim (`connect-src https://nominatim.openstreetmap.org`, `geolocation=(self)`).
  Koordinat hanya dikirim ke Nominatim dan ikut pesan WA; tidak disimpan. Patuhi batas pakai Nominatim
  (maks. 1 permintaan/detik, cukup untuk klik manual).

## Konfigurasi & keamanan

- Semua `NEXT_PUBLIC_*` **bersifat PUBLIK** (ikut ke browser). Jangan menaruh secret di sana.
- Header di `next.config.ts` **tidak berfungsi** pada static export. Header keamanan ada di `vercel.json` (Vercel)
  dan `public/_headers` (Netlify/Cloudflare Pages): CSP, nosniff, X-Frame-Options DENY + frame-ancestors,
  Referrer-Policy, Permissions-Policy (kamera/mikrofon mati, geolokasi hanya situs ini), HSTS, COOP.
- CSP memakai `script-src 'self' 'unsafe-inline'` karena Next.js menyisipkan inline script hidrasi. CSP tanpa
  `unsafe-inline` butuh nonce/hash per request (server), jadi untuk situs statis trade-off ini dipilih.
  Tidak ada skrip/gambar/font pihak ketiga, tanpa iframe Maps, embed IG, atau tracking. Satu-satunya
  koneksi keluar adalah Nominatim saat pengunjung menekan tombol lokasi.
- `react/no-danger` aktif. JSON-LD lewat `src/components/JsonLd.tsx` tanpa `dangerouslySetInnerHTML`.
- `public/.well-known/security.txt` tersedia.

## Deploy (Vercel)

Root Directory: `sanarea-id/sanarea-web`. Build, output, dan header sudah diatur di `vercel.json`.
Isi env `NEXT_PUBLIC_WA_NUMBER` dan `NEXT_PUBLIC_SITE_URL`, lalu ganti domain di `public/robots.txt`.

## Hak cipta & privasi

- Hanya foto dari folder `assets/` (IG @sanarea.id). **Pastikan model setuju** fotonya dipakai di website.
- Galeri Moments hanya memakai foto booth tanpa wajah pengunjung. Foto CFD 14, 17, 18, 27 dan Event 07, 08 tidak dipakai.
- EXIF/GPS dibuang oleh `optimize-images`. Video tidak ditampilkan.

## Daftar TODO

- Marketplace (bila ada)
- Harga Seera Shawl, Vela Bandana, Two Tone, Eleera Viscose, Magnetic Pin, Scrunchie Tulle
- Konfirmasi harga 68k (Naleea), 85k (Kaleea), 35k (Paris Basic), 89k (Printed), 50k (Aleena)
- Bahan & ukuran Two Tone, Vela, Aleena; nama warna Aleena, Scrunchie, Magnetic Pin
- Nama "Vela" vs "Aylaa" pada highlight Vela; apakah boleh disebut ramah olahraga
- Periode promo (bundling, diskon 10%, clearance, Aleena 37k) sebelum diaktifkan di `promos.ts`
- Pengiriman luar Cianjur, metode bayar, retur, reseller (FAQ & Cara Order)
- Cara perawatan per bahan; cerita brand & tahun berdiri dari pemilik
- File logo asli (resolusi tinggi / vektor) dan favicon
- Domain sendiri (sekarang porto-sanarea-id.vercel.app)
