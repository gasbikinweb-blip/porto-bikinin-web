# Next.js Static Catalog Starter

Template **website katalog statis** (etalase + pemesanan via WhatsApp) dengan Next.js 16 (App Router),
TypeScript strict, dan Tailwind CSS v4. Tanpa backend, tanpa keranjang/checkout/login. Hasil build berupa
file statis di `out/` yang bisa di-hosting di mana saja.

Sudah termasuk: katalog + filter, detail produk + galeri, section interaktif "pilih karakter", kutipan berputar,
animasi saat scroll, navbar transparan→solid, mode terang/gelap tanpa kedip, tombol WhatsApp (pesan berisi detail
produk + link pratinjau), security headers, SEO (metadata, sitemap, JSON-LD), dan optimasi gambar.

## Memulai project baru dari template ini

1. Buat repo baru dari template (GitHub: tombol **Use this template**), atau salin folder ini.
2. `npm install`
3. Ganti identitas toko di `src/lib/config.ts` (nama, nomor WA, alamat, sosial media) atau lewat `.env.local`
   (salin dari `.env.example`).
4. Ganti warna brand di `src/app/globals.css` (token `:root` untuk mode gelap, `[data-theme='light']` untuk terang).
5. Ganti font di `src/app/layout.tsx` (next/font).
6. Isi data:
   - `src/data/products.ts`: kategori dan produk
   - `src/data/rooms.ts`: grup untuk section "pilih karakter"
   - `src/data/quotes.ts`: kutipan
7. Taruh foto asli di `assets-src/products/<slug>/01.jpg, 02.jpg, …` (hapus placeholder), lalu `npm run optimize-images`.
8. Desain ulang `src/app/page.tsx` sesuai bisnis (section bisa dihapus/ditambah), serta halaman Tentang & Kontak.
9. Cari semua `TODO` di project dan selesaikan.
10. `npm run lint && npm run typecheck && npm run build`

## Perintah

| Perintah                  | Fungsi                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| `npm run dev`             | Server development di http://localhost:3000                         |
| `npm run build`           | Build statis ke folder `out/`                                       |
| `npm start`               | Menyajikan folder `out/` secara lokal                               |
| `npm run lint`            | ESLint                                                              |
| `npm run typecheck`       | Cek tipe TypeScript                                                 |
| `npm run format`          | Prettier                                                            |
| `npm run audit`           | `npm audit`                                                         |
| `npm run optimize-images` | Foto di `assets-src/` → WebP (+ `og.jpg` untuk sampul) di `public/` |

## Struktur

```
assets-src/          foto ASLI (tidak disajikan ke pengunjung)
public/              hasil optimasi, _headers, robots.txt, theme-init.js
scripts/             optimize-images.mjs
src/app/             halaman: beranda, /produk, /produk/[slug], /tentang, /kontak, 404, sitemap
src/components/      komponen UI (tombol WA, kartu produk, galeri, RevealObserver, ThemeToggle, dll.)
src/data/            data produk, grup "pilih karakter", kutipan
src/lib/             config toko, pembuat link WhatsApp, format harga
```

## Aturan penting

- **Static export**: jangan pakai API routes, Server Actions, middleware, atau fitur yang butuh server.
- **Variabel `NEXT_PUBLIC_*` bersifat PUBLIK.** Jangan taruh secret apa pun.
- `dangerouslySetInnerHTML` dilarang (ESLint `react/no-danger`). JSON-LD memakai `src/components/JsonLd.tsx`.
- Link eksternal wajib `target="_blank" rel="noopener noreferrer"`.
- Semua tombol WA memakai `buildWhatsAppLink()` di `src/lib/whatsapp.ts`.
- Teks di atas foto/video diberi kelas `.theme-dark` supaya tetap terbaca di mode terang.
- Elemen yang muncul saat scroll: kelas `reveal` (+ `reveal-left` / `reveal-right` / `reveal-zoom` /
  `reveal-blur` / `reveal-curtain`), dan `data-stagger` pada parent untuk efek bergiliran.

## Security headers

`headers()` di `next.config.ts` tidak berfungsi pada static export, jadi header diatur di hosting:
`public/_headers` (Netlify/Cloudflare Pages) dan `vercel.json` (Vercel). CSP memakai `script-src 'self' 'unsafe-inline'`
karena Next.js butuh inline script dan nonce tidak mungkin di situs statis. Kalau menambah layanan pihak ketiga,
tambahkan domainnya ke CSP di kedua file.

## Deploy

- **Vercel:** import repo. `vercel.json` sudah mengatur build sebagai situs statis (`framework: null`, output `out`,
  `cleanUrls`). Isi env `NEXT_PUBLIC_SITE_URL` dengan alamat website.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish directory `out`.
- Setelah domain final: perbarui `NEXT_PUBLIC_SITE_URL` dan baris `Sitemap:` di `public/robots.txt`.

## Catatan dependency

Versi dikunci exact (`.npmrc` `save-exact=true`). ESLint 9 dipakai karena plugin `eslint-config-next` belum
mendukung ESLint 10. `npm audit` dev-only (`braces`) aman diabaikan; jangan `npm audit fix --force`.
