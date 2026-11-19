# Haraanja Project Souvenir — Landing Page

Next.js 16 (static export) + Tailwind v4. Satu halaman `/`; detail produk tampil sebagai modal lewat `#produk-[slug]`. Tidak ada keranjang/checkout: pesanan lewat WhatsApp atau Shopee.

## Perintah

```bash
npm install
npm run dev        # pengembangan
npm run lint && npm run typecheck && npm run build   # hasil di /out
```

## Menambah / menghapus produk & kemasan

1. Edit daftar `P` di `scripts/build-products.py` (itemId Shopee, slug, nama, kategori, harga, catatan harga, ukuran, bahan, min order, momen, `featured`, `isPackaging`, cover).
2. Taruh foto di `assets-src/produk/<slug>/` lalu jalankan `python scripts/build-products.py` dan `node scripts/optimize-images.mjs`.
3. `src/data/products.ts` dibuat otomatis — jangan diedit manual.

- **Harga**: hanya isi harga yang benar dari Shopee; kosongkan jika belum tahu (tampil "Tanya harga").
- **Unggulan**: `featured: True`.
- **Kemasan**: `isPackaging: True` → tampil di section Kemasan, bukan Katalog.

## Tema musiman

`src/data/catalog-meta.ts` → `seasonals` (tanggal `start`/`end` format YYYY-MM-DD, dicek di browser). Update tanggal tiap tahun.

## WhatsApp, Shopee, kontak

`src/lib/config.ts` (nomor WA, URL toko Shopee, sosial media, alamat, jam buka). Variabel `NEXT_PUBLIC_*` bersifat publik — jangan isi rahasia.

## Deploy (Vercel)

Root Directory: `haraanja-project/haraanja-web`. Header keamanan ada di `vercel.json` dan `public/_headers` (header di `next.config.ts` **tidak** berlaku untuk static export). CSP memakai `'unsafe-inline'` untuk script karena static export tidak bisa nonce — trade-off yang disengaja.

## Catatan

- Foto wajah pelanggan hanya dipakai dengan izin.
- Aktifkan Dependabot di GitHub untuk update dependensi.

## TODO

- Logo: ganti `assets-src/logo/logo.jpg` lalu jalankan `node scripts/build-logo.mjs` (logo terang, gelap, dan favicon bulat).
- Jam buka & link Threads di `config.ts`.
- Harga produk yang masih kosong.
- Tanggal tema musiman tahun berikutnya.
