# Farwa Hijab — Landing Page Satu Halaman (Paket Starter)

Landing page satu halaman Farwa Hijab (@farwaheejab). Next.js 16 (App Router, `output: 'export'`),
TypeScript strict, Tailwind CSS 4. Tanpa backend, keranjang, checkout, login, atau form yang mengirim
data. Eceran dibeli di **Shopee**, grosir/reseller lewat **WhatsApp**.

> Versi multi-halaman (katalog, detail produk per URL, reseller, tentang, FAQ terpisah) ada di
> `../farwaheejab/Multiple/farwa-hijab-porto/`. Data, foto, dan aturan keamanan kedua versi sama.

## Isi halaman (`/`, menu berupa anchor)

1. **Showcase produk** (`#beranda`): pilih produk, ukuran, dan warna; foto berganti dengan animasi.
2. **Yang lagi banyak dicari**: panel foto besar + grid 6 produk.
3. **Banner quotes**: foto & kutipan berganti otomatis tiap 6 detik (berhenti saat disorot).
4. **Koleksi** (`#koleksi`): filter kategori & warna.
5. **Video** (`#video`): 6 video, klik untuk putar; bersuara bila video sumbernya bersuara.
6. **Dua cara belanja**, **Reseller** (`#reseller`) + **kalkulator cuan** (`#hitung-cuan`) + tabel grosir.
7. **FAQ** (`#faq`) dan **Tentang & kontak** (`#kontak`).

Klik produk di mana saja membuka **modal detail** (galeri + lightbox, ukuran, warna, jumlah, info grosir,
tombol Shopee & WhatsApp) yang tumbuh dari kartu yang diklik dan mengecil kembali saat ditutup.
Pengunjung pertama kali melihat **pop-up sapaan** (sekali saja).

**Keranjang tanya-pesan:** tombol "Masukkan keranjang" di modal produk; ikon tas di header membuka laci
keranjang (ubah jumlah, hapus, nama opsional, total perkiraan). Isinya dikirim sebagai satu pesan WhatsApp,
satu paragraf per produk dipisah garis. Disimpan di localStorage `farwa-keranjang`; tanpa checkout/pembayaran.

**Logo:** `npm run build-logo` mengubah `../farwaheejab/assets/logo/Logo.jpg` jadi mask transparan di `public/brand/`
plus favicon `src/app/icon.png`. Warnanya mengikuti tema (mocha / krem).

**Mode gelap/terang:** mengikuti setelan perangkat, bisa diganti lewat tombol bulan/matahari di header
(pilihan disimpan di localStorage `tema`; `public/theme-init.js` memasangnya sebelum halaman digambar).
Warna gelap diatur di `globals.css`; panel cokelat tua (reseller, footer, kalkulator) memakai token
`panel` / `on-panel` yang tetap gelap di kedua mode.

## Animasi

- Muncul saat scroll: tambahkan atribut `data-reveal` pada elemen; anak di dalam `data-reveal-group`
  muncul bergantian. Elemen yang terlewati karena lompat lewat menu juga langsung dimunculkan.
- Animasi showcase & modal lewat `src/lib/motion.ts` (`safeAnimate`): dipaksa selesai bila browser
  membekukan animasi di tab latar belakang.
- Semua animasi mati bila pengunjung memilih **gerakan minimal**; tanpa JavaScript konten tetap tampil.

## Perintah

| Perintah                                          | Fungsi                                                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run dev` / `build` / `start`                 | Pengembangan, build statis ke `out/`, sajikan `out/`                                         |
| `npm run lint` / `typecheck` / `format` / `audit` | Kualitas & keamanan kode                                                                     |
| `npm run optimize-images`                         | Foto `../farwaheejab/assets/` → WebP 4:5 di `public/images/produk/`                          |
| `npm run build-videos`                            | Video → H.264 540px (+ AAC bila sumber bersuara) + poster di `public/videos/` (butuh ffmpeg) |

## Cara umum

- **Produk, warna, harga, promo, nomor WA & link Shopee:** sama seperti versi porto (lihat
  `src/data/*.ts`, `scripts/products.manifest.mjs`, dan `.env.example`). Semua `NEXT_PUBLIC_*` **publik**.
- **Quotes banner:** edit array `quoteSlides` di `src/app/page.tsx` (TODO: setujui teksnya).
- **Video:** tambah/ubah di `scripts/videos.manifest.mjs` (potong layar hitam dengan `start`/`duration`),
  lalu `npm run build-videos`. Audio ikut bila video sumber bersuara; video tanpa audio tetap bisu. Catatan: musik Reels umumnya berlisensi khusus Instagram.
  Video tidak diunduh sampai diklik (`preload="none"`); total saat ini ±8,6 MB.

## Deploy & keamanan

Sama seperti versi porto: folder `out/`, header di `public/_headers` & `vercel.json` (bukan
`next.config.ts`), CSP tanpa pihak ketiga dengan `media-src 'self'` untuk video. Lihat README porto untuk
penjelasan trade-off `'unsafe-inline'` dan opsi analytics.

## TODO sebelum rilis

Lihat daftar TODO di README porto, ditambah: persetujuan teks quotes banner.
