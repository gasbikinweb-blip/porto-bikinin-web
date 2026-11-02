# Sinar Bintang Keramik — Landing Page Satu Halaman

Website satu halaman (`/`) Sinar Bintang Keramik (SBK), toko keramik, granit, sanitary, dan pintu di
Jakarta Timur. Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS 4.
Tanpa backend, keranjang, checkout, login, atau form yang mengirim data. Pemesanan lewat **WhatsApp** atau
toko **Shopee**; website menampilkan sebagian produk, katalog lengkap diarahkan ke Shopee.

## Isi halaman (menu berupa anchor)

`#beranda` hero · `#kategori` kartu kategori (klik → filter produk) · `#produk` produk pilihan (filter
kategori & ukuran, 14 unggulan lalu "Tampilkan lebih banyak" 12 per klik) · `#hitung` kalkulator kebutuhan
keramik · `#merek` · `#ulasan` · `#toko` · `#faq` · footer · tombol WA mengambang · 404 custom.

## Perintah

| Perintah                                          | Fungsi                                                           |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                                     | Server pengembangan                                              |
| `npm run build`                                   | Build statis ke `out/`                                           |
| `npm start`                                       | Menyajikan `out/` secara lokal                                   |
| `npm run lint` / `typecheck` / `format` / `audit` | Kualitas & keamanan kode                                         |
| `npm run optimize-images`                         | Foto `../sinar-bintang-keramik-sumber/assets/Shopee Assets/` → WebP 1:1 (800px + thumb 400px) |

Node ≥ 20.9 (`.nvmrc` 22.20.0), Next.js 16.4.3, versi dependency exact.

## Data

```
src/data/products.ts       117 produk dari listing Shopee (harga, ukuran, merek, KW, permukaan, isi/luas per dus)
src/data/categories.ts     9 kategori + foto kartu
src/data/brands.ts         merek otomatis dari data produk (teks, tanpa logo)
src/data/reviews.ts        ulasan asli dari highlight Testimoni Instagram (nama disamarkan)
src/data/faq.ts            FAQ
src/data/site.ts           alamat, jam buka, link sosial
src/lib/config.ts          env NEXT_PUBLIC_* + validasi
src/lib/whatsapp.ts        buildWhatsAppLink(), buildShopeeProductLink()
scripts/products.manifest.mjs  foto utama tiap produk (folder Shopee + nama file)
```

## Cara umum

- **Tambah produk:** salin folder listing Shopee ke `../sinar-bintang-keramik-sumber/assets/Shopee Assets/`, tambahkan entri
  `{ slug, folder, image }` di `scripts/products.manifest.mjs`, jalankan `npm run optimize-images`, lalu
  tambahkan objek di `inputs` pada `src/data/products.ts` dengan `id` = slug yang sama.
- **Hapus produk:** hapus objeknya di `products.ts` (dan entri manifest + file WebP bila mau).
- **Ubah harga:** field `price` (angka, tanpa titik). `priceFrom: true` menampilkan "mulai". Kosongkan
  `price` untuk menampilkan "Tanya harga".
- **Produk unggulan:** set `featured: true` (tampil pertama, disarankan 12–16).
- **Kalkulator:** memakai `m2PerBox`. Produk tanpa `m2PerBox` meminta pengunjung mengisi manual (tidak ditebak).
- **Ulasan asli:** ganti isi `reviews.ts` dengan objek `isPlaceholder: false`, nama pembeli disamarkan
  (`a***i`). **Minta izin pemilik toko** dan pastikan sesuai ketentuan Shopee.
- **Nomor WA, link & shop ID Shopee:** `.env.local` atau dashboard hosting (`NEXT_PUBLIC_WA_NUMBER`,
  `NEXT_PUBLIC_SHOPEE_STORE_URL`, `NEXT_PUBLIC_SHOPEE_SHOP_ID`, `NEXT_PUBLIC_SITE_URL`). **Semua
  `NEXT_PUBLIC_*` bersifat PUBLIK** (ikut ke JavaScript browser); jangan menaruh secret di sana. Link
  produk: `shopee.co.id/product/[SHOP_ID]/[itemId]`; tanpa shop ID otomatis ke halaman toko.

## Deploy

Folder statis `out/`. Vercel: root `sinar-bintang-keramik` (`vercel.json` sudah
berisi header). Netlify/Cloudflare Pages: build `npm run build`, publish `out` (header dari
`public/_headers`). Set `NEXT_PUBLIC_SITE_URL` ke domain asli.

## Keamanan

- **Header di `next.config.ts` TIDAK berfungsi pada static export**; diatur di `public/_headers` &
  `vercel.json`: CSP, nosniff, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, Referrer-Policy,
  Permissions-Policy (kamera, mikrofon, geolokasi mati), HSTS, COOP, CORP.
- **Trade-off CSP:** `script-src 'unsafe-inline'` dibutuhkan inline script hidrasi Next.js (static export
  tidak punya nonce per-request). Risiko ditekan: tanpa script pihak ketiga, tanpa `dangerouslySetInnerHTML`
  (ESLint `react/no-danger`), `object-src`/`frame-src 'none'`, `form-action 'none'`. Opsi lebih ketat:
  hash SHA-256 inline script pasca-build, atau nonce dari edge function.
- Kalkulator & filter murni di browser; tidak ada data pengunjung yang dikirim atau disimpan.
- Tanpa iframe Maps, embed Shopee/Instagram, atau tracking. Link eksternal `target="_blank"
rel="noopener noreferrer"`.
- `public/.well-known/security.txt` (placeholder). Aktifkan Dependabot/Renovate; jalankan `npm run audit`
  berkala.

## Hak cipta & privasi

Hanya foto dari `../sinar-bintang-keramik-sumber/assets/` (listing Shopee milik toko). Merek pihak lain ditampilkan sebagai teks, bukan
logo. Script membuang EXIF/GPS. Jumlah terjual dan rating Shopee tidak disalin.

## TODO sebelum rilis

- [ ] Hari libur, tahun berdiri (1995?) — alamat & telepon sudah diambil dari Instagram
- [ ] File logo asli SBK (sekarang SVG sederhana di `Logo.tsx` & `src/app/icon.svg`)
- [ ] Satuan harga (keramik per dus, plint per pcs, sanitary & pintu per buah, semen per sak)
- [ ] Isi per dus & luas per dus untuk produk yang belum tercatat (88 produk)
- [ ] Izin pemilik untuk 6 ulasan asli (disalin dari highlight Testimoni IG)
- [ ] Harga & luas per dus Granit Gold Rush (produk dari IG, belum ada di Shopee)
- [ ] Foto toko tanpa wajah orang (frame video IG semuanya ada wajah/teks)
- [ ] Minimal pembelian, tarif ongkir & syarat gratis ongkir, metode pembayaran (FAQ)
- [ ] Merek yang konflik: "Hitam Polos Arwana" tercatat merek KIA di Shopee
- [ ] Foto produk Aversa 40x40 hanya tersedia dengan overlay nomor WA
- [ ] Domain asli & `security.txt`
