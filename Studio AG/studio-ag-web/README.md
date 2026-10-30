# Studio AG — Company Profile & Portofolio

Website statis **satu halaman** Studio AG (Interior Design & Build, Jakarta). Next.js 16 App Router, `output: 'export'`. Detail proyek tampil sebagai popup (link langsung: `/#proyek/<slug>`).
Tanpa backend: semua konsultasi lewat WhatsApp.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi nilainya
npm run dev                  # http://localhost:3000
npm run build                # hasil statis di ./out
npm start                    # menyajikan ./out
```

Skrip lain: `lint`, `typecheck`, `format`, `audit`, `optimize-images`.
Node ≥ 20.9 (lihat `.nvmrc`).

## Variabel lingkungan

| Nama                    | Contoh                                                   |
| ----------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_WA_NUMBER` | `628987701605` (awalan 0 otomatis jadi 62)               |
| `NEXT_PUBLIC_SITE_NAME` | `Studio AG`                                              |
| `NEXT_PUBLIC_SITE_URL`  | `https://domain-anda.com` (untuk canonical, sitemap, OG) |

> **Penting:** semua variabel `NEXT_PUBLIC_*` ikut ke JavaScript di browser dan **bersifat publik**.
> Jangan menaruh secret apa pun di sana.

## Struktur

- `src/data/` — `site`, `services`, `projects`, `process`, `faq`. `images.generated.ts` dibuat otomatis.
- `src/lib/config.ts` — env, pembersih nomor WA, `buildWhatsAppLink()`.
- `scripts/image-manifest.mjs` — daftar foto per proyek (sumber: `../assets/` Instagram & `../_pdf-extract/`).
- `scripts/optimize-images.mjs` — WebP ke `public/images/` (hero/cover 2000px, galeri 1600px, thumb 640px,
  `og.jpg` 1200×630), EXIF/GPS dibuang.

## Menambah proyek

1. Taruh foto di `../assets/<folder>/` (atau folder lain di dalam `Studio AG/`).
2. Tambah entri di `scripts/image-manifest.mjs` dengan slug baru dan `kind` tiap foto
   (`foto`, `render`, `before`, `after`). Gambar pertama menjadi sampul.
3. `npm run optimize-images`.
4. Tambah data di `src/data/projects.ts` (slug sama). Klien cukup inisial. Jangan isi harga/durasi/merek karangan.
5. `npm run build`.

## Mengganti nomor WhatsApp

Ubah `NEXT_PUBLIC_WA_NUMBER` di `.env.local` / pengaturan hosting, lalu build ulang. Nomor tampilan
(`waDisplay`) ada di `src/data/site.ts`. Build gagal kalau formatnya tidak valid.

## Deploy

- **Vercel:** import repo, root directory `Studio AG/studio-ag-web`. `vercel.json` sudah mengatur output & header.
- **Netlify / Cloudflare Pages:** build `npm run build`, publish `out`. Header dibaca dari `public/_headers`.

## Keamanan

- `headers()` di `next.config.ts` **tidak berlaku** untuk static export, karena tidak ada server Next.js.
  Header diatur di hosting: `public/_headers` (Netlify/Cloudflare) dan `vercel.json` (Vercel).
- CSP: `script-src 'self' 'unsafe-inline'`. Next.js menyisipkan inline script untuk hidrasi/RSC payload
  yang isinya berubah tiap build, dan static export tidak bisa memberi nonce per-request. Tanpa
  `'unsafe-inline'`, halaman tidak interaktif. Risikonya ditekan dengan: tidak ada skrip pihak ketiga,
  tidak ada `dangerouslySetInnerHTML` (ESLint `react/no-danger`), `object-src 'none'`, `base-uri 'self'`,
  `form-action 'none'`, `frame-ancestors 'none'`.
- Header lain: nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, HSTS, COOP.
- Tanpa iframe, embed Instagram, maupun tracking. Google Maps hanya link keluar.
- `public/.well-known/security.txt` — perbarui `Expires` tiap tahun.
- Jalankan `npm run audit` berkala. Disarankan mengaktifkan Dependabot atau Renovate di GitHub.

## Catatan

- Saat diuji dengan `serve` lokal, prefetch RSC (`__next.*.txt`) bisa 404 di konsol. Navigasi tetap jalan
  (fallback ke pemuatan halaman biasa).
