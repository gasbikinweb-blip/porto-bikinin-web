# House of Acrylic Product — Landing Page

Website company profile + katalog **satu halaman** untuk House of Acrylic Product (@akriliksurabaya),
bengkel custom akrilik di Surabaya. Next.js 16 (App Router, static export), TypeScript strict, Tailwind CSS v4.
Tanpa backend, keranjang, pembayaran, atau login: semua order & konsultasi lewat WhatsApp.

Section (anchor di `/`): Hero · Layanan · Promo Neon Box UMKM · Katalog · Portofolio (filter + lightbox) ·
Cara Pemesanan · Tentang · FAQ · Kontak + pembuat pesan WhatsApp. Tombol WA mengambang di semua layar.

## Environment

Node.js 22.20.0 (`.nvmrc`), npm 10. Versi dependency dikunci exact (`.npmrc` `save-exact=true`).

## Perintah

| Perintah                  | Fungsi                                                       |
| ------------------------- | ------------------------------------------------------------ |
| `npm run dev`             | Server development di http://localhost:3000                  |
| `npm run build`           | Build statis ke folder `out/`                                |
| `npm start`               | Menyajikan folder `out/` secara lokal                        |
| `npm run lint`            | ESLint (`eslint .`, bukan `next lint`)                       |
| `npm run typecheck`       | Cek tipe TypeScript                                          |
| `npm run format`          | Prettier                                                     |
| `npm run audit`           | `npm audit`                                                  |
| `npm run optimize-images` | Foto `assets-src/` → WebP tanpa EXIF di `public/` + `og.jpg` |

## Struktur

```
assets-src/brand      logo asli
assets-src/portfolio  foto asli per proyek (01.jpg, 02.jpg, …) — dari Instagram klien
assets-src/klien      kolase logo klien/partner
public/               hasil WebP, og.jpg, _headers, robots.txt
src/app/              page.tsx (semua section), layout, 404, sitemap, favicon
src/components/       Header, MobileNav, PortfolioGallery (lightbox), WaMessageBuilder, WaLink, Footer
src/data/             site.ts, services.ts, portfolio.ts, faq.ts
src/lib/              config.ts (env + validasi nomor WA), whatsapp.ts (buildWhatsAppLink)
```

Menambah proyek portofolio: taruh foto di `assets-src/portfolio/<slug>/01.jpg…`, jalankan
`npm run optimize-images`, lalu tambahkan entri di `src/data/portfolio.ts`.

## Konfigurasi (`.env.local`, salin dari `.env.example`)

- `NEXT_PUBLIC_SITE_URL` — domain final (canonical, OG, sitemap)
- `NEXT_PUBLIC_SITE_NAME` — default `House of Acrylic Product`
- `NEXT_PUBLIC_WA_NUMBER` — default `6285233215781`; dibersihkan & divalidasi, build gagal bila salah

Semua `NEXT_PUBLIC_*` BERSIFAT PUBLIK. Jangan taruh secret.

## Keamanan

- **`headers()` di `next.config.ts` TIDAK berfungsi pada static export.** Header keamanan diatur di hosting:
  `public/_headers` (Netlify / Cloudflare Pages) dan `vercel.json` (Vercel) — isinya harus sama.
- CSP: semua sumber `'self'`; `script-src 'unsafe-inline'` wajib karena Next.js menyisipkan inline script
  hidrasi dan nonce tidak mungkin di situs statis. `form-action 'none'` karena tidak ada form yang dikirim.
- `dangerouslySetInnerHTML` dilarang lewat ESLint `react/no-danger`; JSON-LD lewat `JsonLd.tsx`.
- Link eksternal memakai `target="_blank" rel="noopener noreferrer"`.
- Pembuat pesan WA memvalidasi input, membuang karakter kontrol, membatasi panjang, lalu
  `encodeURIComponent`. Tidak ada data yang dikirim ke server.

## Deploy

- **Vercel:** import repo; `vercel.json` sudah mengatur output `out`. Isi env `NEXT_PUBLIC_SITE_URL`.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.
- Hosting statis lain (cPanel, dll.): upload isi folder `out/`; atur header setara `_headers` di server.
- Setelah domain final: perbarui `NEXT_PUBLIC_SITE_URL` dan baris `Sitemap:` di `public/robots.txt`.

## Catatan dependency

ESLint 9 dipakai karena `eslint-config-next` belum mendukung ESLint 10. Temuan `npm audit` dev-only aman
diabaikan; jangan `npm audit fix --force`.
