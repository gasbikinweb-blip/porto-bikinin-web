# SA Living — saliving.id

Website company profile + katalog **statis** untuk SA Living Batam (wallpaper dinding, gorden, lantai SPC,
kasa nyamuk magnet). Tanpa backend, login, atau transaksi: semua konsultasi, ukur, dan penawaran lewat WhatsApp.

- Next.js 16 (App Router, `output: 'export'`) · React 19 · TypeScript strict · Tailwind CSS 4
- Node.js 22 (`.nvmrc`), dependency versi exact (`.npmrc` → `save-exact=true`)

## Perintah

```bash
npm ci                    # instal sesuai package-lock.json
npm run dev               # pengembangan (http://localhost:3000)
npm run lint              # ESLint (eslint .)
npm run typecheck         # tsc --noEmit
npm run build             # hasil statis di out/ (+ postbuild fix-rsc-paths)
npm run start             # sajikan out/ secara lokal
npm run optimize-images   # assets-src/**/*.jpg  -> public/**/*.webp (+ og.jpg sampul produk)
npm run optimize-videos   # assets-src/video/*.mp4 -> public/video/*.mp4 + poster .webp (+ hero.mp4)
```

## Struktur penting

| Lokasi                           | Isi                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `src/lib/config.ts`              | Nama, nomor WA, alamat, jam buka, link sosial (banyak `// TODO: verifikasi`) |
| `src/lib/whatsapp.ts`            | Satu-satunya pembuat link WA + template pesan (konsultasi, produk)           |
| `src/data/products.ts`           | Kategori & produk                                                            |
| `src/data/projects.ts`           | Foto & video galeri "Hasil Pasang"                                           |
| `assets-src/`                    | Foto asli (di-commit). `assets-src/video/` mentah tidak di-commit (besar)    |
| `public/_headers`, `vercel.json` | Security headers (CSP, HSTS, dll.)                                           |

Foto & video berasal dari Instagram @saliving.id (folder `Referensi/`, tidak di-commit).

## Tambah produk

1. Taruh foto di `assets-src/products/<slug>/01.jpg`, `02.jpg`, … (01 = sampul).
2. `npm run optimize-images`.
3. Tambah objek di array `products` pada `src/data/products.ts`.

## Ganti nomor WhatsApp

Ubah `DEFAULT_WA_NUMBER` di `src/lib/config.ts`, atau set `NEXT_PUBLIC_WA_NUMBER` di hosting
(lihat `.env.example`). Build gagal bila format nomor salah.

## Deploy

- **Vercel**: impor repo, root directory `saliving-id`. `vercel.json` sudah mengatur `framework: null`,
  `outputDirectory: out`, `cleanUrls`, dan security headers.
- **Netlify / Cloudflare Pages**: build `npm run build`, publish `out/`. Headers dari `public/_headers`.

CSP memakai `script-src 'self' 'unsafe-inline'` karena Next.js menyisipkan inline script untuk hydration
pada static export (tanpa server tidak bisa memakai nonce). Tidak ada script pihak ketiga yang diizinkan.
