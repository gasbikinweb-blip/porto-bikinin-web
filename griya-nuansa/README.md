# Griya Nuansa — Company Profile & Portofolio

Website statis (Next.js 16, App Router, TypeScript strict, Tailwind CSS 4) untuk **Griya Nuansa** (griyanuansa.id), studio arsitektur, desain interior, dan property management di Serpong, Tangerang Selatan.

Website ini hanya etalase: **tanpa backend, login, pembayaran, atau form yang mengirim data**. Semua konsultasi lewat WhatsApp.

## Kebutuhan

- Node.js 22 (lihat `.nvmrc`, minimal `>=22.0.0`), npm 10
- Versi dependency dikunci exact (`.npmrc` → `save-exact=true`, `engine-strict=true`)

## Script

| Perintah                  | Fungsi                                                         |
| ------------------------- | -------------------------------------------------------------- |
| `npm run dev`             | Dev server                                                     |
| `npm run build`           | Build static export ke `/out`                                  |
| `npm start`               | Menyajikan `/out` secara lokal (`serve`)                       |
| `npm run lint`            | ESLint (`eslint .`, termasuk `react/no-danger`)                |
| `npm run typecheck`       | `tsc --noEmit`                                                 |
| `npm run format`          | Prettier                                                       |
| `npm run audit`           | `npm audit`                                                    |
| `npm run optimize-images` | Konversi foto `assets/` → WebP di `public/images/proyek/`      |

## Konfigurasi (`.env.local`)

Salin `.env.example` menjadi `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://griyanuansa.id
NEXT_PUBLIC_SITE_NAME=Griya Nuansa
NEXT_PUBLIC_WA_NUMBER=62811187001
NEXT_PUBLIC_WA_NUMBER_2=6281901187001
```

> **Penting:** semua variabel `NEXT_PUBLIC_*` (termasuk nomor WhatsApp) ikut tertanam di HTML/JS dan **bersifat publik**. Jangan menaruh secret apa pun di sana.

### Mengganti nomor WhatsApp

Ubah `NEXT_PUBLIC_WA_NUMBER` / `NEXT_PUBLIC_WA_NUMBER_2` (format `62…` tanpa `+`/spasi; `08…` otomatis dikonversi), lalu build ulang. Label nomor yang tampil di halaman ada di `src/data/site.ts` (`whatsapp[].label`). Semua tombol memakai satu fungsi `buildWhatsAppLink()` di `src/lib/config.ts`.

## Menambah proyek baru

1. Buat folder di `assets/` (mis. `assets/BR House/`), isi foto JPG/PNG/WebP. Beri nama `COVER.jpg` untuk foto sampul.
2. Jalankan `npm run optimize-images`. Hasil WebP (maks. 2000px untuk cover, 1600px galeri, plus thumbnail 720px, tanpa EXIF/GPS) masuk `public/images/proyek/br-house/`, dan `src/data/images.generated.json` diperbarui.
3. Proyek otomatis muncul (kategori default "Rumah"). Tambahkan entri di `meta` pada `src/data/projects.ts` untuk mengatur judul, kategori, lokasi, lingkup, `featured`, jenis gambar (`kind`/`kinds`: `render`, `before`, `after`) dan alt teks (`alts`).
4. `npm run build`.

Catatan: file **HEIC tidak didukung** sharp versi prebuilt dan akan dilewati (tercetak di konsol). Konversi ke JPG terlebih dahulu.

### Before/after

Section before-after di beranda hanya tampil jika ada gambar yang ditandai, contoh di `meta`:

```ts
kinds: { '03': 'before', '04': 'after' },
```

## Deploy

Hasil `npm run build` adalah folder `/out` berisi file statis.

- **Cloudflare Pages / Netlify:** build command `npm run build`, output `out`. Header keamanan dibaca dari `public/_headers` (ikut tersalin ke `/out`).
- **Vercel:** memakai `vercel.json` (sudah berisi header yang sama).
- **Hosting lain (Nginx/Apache/cPanel):** unggah isi `/out`, lalu atur header yang sama di konfigurasi server.

## Keamanan

- `headers()` di `next.config.ts` **tidak berfungsi** pada `output: 'export'`. Header harus diatur di level hosting (`public/_headers` atau `vercel.json`).
- Header yang dipasang: CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (+ `frame-ancestors 'none'`), `Referrer-Policy`, `Permissions-Policy` (kamera, mikrofon, geolokasi mati), HSTS, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`.
- **Trade-off CSP:** Next.js menyisipkan inline `<script>` (payload RSC/hydration) di setiap halaman, sehingga `script-src` memerlukan `'unsafe-inline'`. Nonce tidak bisa dipakai pada static export karena nonce butuh server per request. Alternatif yang lebih ketat: setelah build, hitung hash SHA-256 setiap inline script di `/out` dan ganti `'unsafe-inline'` dengan daftar `'sha256-…'` (bisa diotomasi dengan script post-build), konsekuensinya CSP harus diperbarui setiap build. Risiko tetap rendah karena situs tidak memiliki input pengguna yang dirender ulang, tanpa script pihak ketiga, dan `dangerouslySetInnerHTML` dilarang lewat ESLint. `style-src 'unsafe-inline'` diperlukan untuk atribut `style` (next/image, slider before-after).
- Tidak ada iframe (Google Maps, Instagram, YouTube), tracking, atau script pihak ketiga. Semua link eksternal memakai `target="_blank" rel="noopener noreferrer"`.
- Pembuat pesan WhatsApp tidak memakai `<form>`, tidak menyimpan, dan tidak mengirim data. Input divalidasi (whitelist pilihan, batas panjang, angka positif) dan di-encode dengan `encodeURIComponent`.
- **JSON-LD sengaja dilewati:** menyisipkan `<script type="application/ld+json">` di React memerlukan `dangerouslySetInnerHTML` (melanggar `react/no-danger`), dan merender JSON sebagai children berisiko di-escape. Jika nanti diperlukan, opsi aman: matikan rule hanya pada satu komponen dengan data statis yang di-`JSON.stringify` dan karakter `<` di-escape menjadi `\u003c`.
- Jalankan `npm run audit` secara berkala dan aktifkan **Dependabot** (GitHub) atau **Renovate** untuk pembaruan dependency otomatis.
- `public/.well-known/security.txt` berisi kontak placeholder, perbarui sebelum rilis.

### Analytics (opsional)

Default tanpa analytics. Jika diperlukan, pilih yang ramah privasi dan tanpa cookie, misalnya **Cloudflare Web Analytics**, **Plausible**, atau **Umami** (self-hosted), lalu tambahkan domainnya ke `script-src`/`connect-src` di CSP.

## Hak cipta & privasi foto

- Gunakan **hanya** foto milik Griya Nuansa dari folder `assets/`.
- **Pastikan izin klien** sebelum menampilkan nama proyek (terutama nama perusahaan seperti PT dan nama bisnis) dan foto interior rumah pribadi.
- Hapus EXIF/GPS sebelum upload. Script `optimize-images` sudah membuang metadata, tetapi jangan pernah menaruh foto asli langsung di `public/`.
- Foto asli di `assets/` tidak ditimpa oleh script.

## Struktur

```
src/
  app/            halaman (App Router), sitemap, robots, icon
  components/     komponen UI (client: Gallery, ProjectFilter, MobileMenu, BeforeAfter, WaMessageBuilder)
  data/           site, services, projects, categories, faq, images.generated.json
  lib/            config (WhatsApp), seo
scripts/optimize-images.mjs
public/_headers, public/.well-known/security.txt, public/files/ (PDF)
```
