# Nadira Furniture – Website Portofolio

Website statis untuk **Nadira Furniture**, jasa interior custom di Bandung (kitchen set, lemari,
backdrop TV, meja rias, kamar set, partisi). Konten dari Instagram
[@nadira.furniture](https://www.instagram.com/nadira.furniture/) 2021–2025: 68 karya, 140 foto, 11 video.
Semua pemesanan lewat WhatsApp (0813-2497-4722).

## Stack

Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS v4. Tanpa backend.

## Perintah

```bash
npm install
npm run dev        # pengembangan
npm run build      # hasil statis di out/
npm run assets     # olah ulang foto dari "assets nadira-furniture/" ke public/projects/
```

## Struktur konten

- `src/lib/config.ts` – nama, WA, Instagram, alamat.
- `src/data/products.ts` – daftar karya (slug, kategori, tahun, foto).
- `src/data/rooms.ts` – karya per ruangan di beranda.
- `src/data/stories.ts` – video di `public/stories/<slug>.mp4` + poster `.webp`.
- `scripts/nadira-assets/manifest.py` – peta folder Instagram → slug karya & foto yang dipakai.

Folder `assets nadira-furniture/` (bahan mentah) tidak ikut di-commit.

## Menambah karya

1. Taruh foto di `public/projects/<slug>/01.webp`, `02.webp`, ... (atau tambahkan baris di `manifest.py`
   lalu `npm run assets`).
2. Tambah objek di `src/data/products.ts` memakai `gallery('<slug>', ['alt 1', 'alt 2'])`.

## Yang masih perlu dari pemilik

- Alamat workshop lengkap & jam buka (`config.ts`).
- Logo (sementara logo teks).
- Domain (sementara `https://nadira-furniture.vercel.app`).

## Deploy

Vercel: Root Directory `nadira-furniture`. `vercel.json` sudah mengatur build statis + security headers.
