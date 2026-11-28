# Ruang Mebel – Website Katalog

Website katalog satu halaman untuk **Ruang Mebel**, furnitur kayu jati solid buatan pengrajin Jepara
(nakas, bufet & credenza, meja TV, meja tamu, meja makan). Konten dari Instagram
[@ruangmebelfurniture](https://www.instagram.com/ruangmebelfurniture/): 71 produk, 448 foto, 72 video.
Semua pemesanan lewat WhatsApp (0821-4132-560).

## Stack

Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS v4. Tanpa backend.

## Perintah

```bash
npm install
npm run dev        # pengembangan
npm run build      # hasil statis di out/
npm run assets     # olah ulang foto & video dari "assets ruang-mebel-furniture/" lalu tulis ulang data
```

## Struktur konten

- `scripts/ruang-mebel-assets/manifest.py` – nama & kategori tiap produk (urutan = kelompok caption).
- `scripts/ruang-mebel-assets/build.py` – foto → `public/projects/<slug>/NN.webp`, video → `public/stories/`.
- `scripts/ruang-mebel-assets/gen_ts.py` – menulis `src/data/products.ts` & `src/data/stories.ts`.
- `src/lib/config.ts` – nama toko, nomor WA, media sosial, alamat workshop.
- Logo: `public/brand/logo-mask.png` (dipakai sebagai masker, warnanya ikut tema).

## Deploy

Vercel: Root Directory `ruang-mebel-furniture`, `vercel.json` mengatur output dan header keamanan.
