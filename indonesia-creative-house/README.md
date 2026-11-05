# ICH Indonesia Creative House

Landing page **satu halaman** (Next.js 16, `output: 'export'`). Tanpa backend; semua pemesanan lewat WhatsApp. Detail menu tampil di modal dengan link langsung `/#menu-[slug]`.

## Menjalankan

```bash
npm install
npm run dev
npm run build
npm start
```

Skrip lain: `lint`, `typecheck`, `format`, `audit`, `optimize-images`.

## Mengelola isi

- **Tambah/hapus menu:** daftarkan di objek `items` dalam `scripts/optimize-images.mjs`, jalankan `npm run optimize-images`, lalu sesuaikan `src/data/menu.ts` dengan slug yang sama.
- **Harga:** isi `price` (dan `priceNote`) di `src/data/menu.ts`; tanpa `price` tampil "Tanya harga".
- **Menu unggulan:** `featured: true`.
- **Banner musiman:** atur tanggal di `src/data/seasonal.ts`, lalu build ulang di dalam rentangnya.
- **Testimoni:** isi `src/data/testimonials.ts` dengan `isPlaceholder: false`. Minta izin pelanggan dan samarkan nama.
- **Nomor WA:** `NEXT_PUBLIC_WA_NUMBER`, lalu build ulang. Tampilan nomor ada di `src/data/site.ts`.

**Semua variabel `NEXT_PUBLIC_*` bersifat PUBLIK**, ikut ke browser. Jangan menaruh secret.

## Deploy

Vercel: root directory folder ini, `vercel.json` sudah mengatur output dan header. Netlify/Cloudflare: publish folder `out`, header dari `public/_headers`.

## Keamanan

- `headers()` di `next.config.ts` **tidak berfungsi** pada static export, jadi header diatur di `public/_headers` dan `vercel.json`.
- CSP memakai `script-src 'self' 'unsafe-inline'` karena Next.js menyisipkan inline script hidrasi, dan nonce butuh server. Solusi lebih ketat: hitung hash SHA-256 tiap inline script setelah build. Risikonya rendah karena tanpa skrip pihak ketiga dan `dangerouslySetInnerHTML` dilarang ESLint.
- Tanpa iframe, embed, atau tracking. Isi form pesanan hanya diproses di browser.
- Jalankan `npm run audit` berkala; aktifkan Dependabot atau Renovate. Perbarui `Expires` di `public/.well-known/security.txt`.

## Foto dan hak cipta

Semua foto dari Instagram ICH di `assets`. EXIF/GPS dibuang saat optimasi, video tidak dipakai.
