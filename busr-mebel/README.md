# Busr Mebel — Website Company Profile & Katalog Furnitur

Website Company Profile & E-Katalog resmi untuk **Busr Mebel**, produsen spesialis furnitur kayu jati solid, furnitur kantor, dan custom interior asal Jepara, Jawa Tengah.

Dibangun dengan **Next.js 16 (App Router)**, **TypeScript Strict**, dan **Tailwind CSS v4** dengan arsitektur **Static Export (`out/`)**. Tidak memerlukan server backend/database, tanpa login/keranjang belanja: seluruh konsultasi dan pemesanan dialihkan langsung melalui WhatsApp resmi.

---

## Fitur Utama

1. **Beranda (`/`):**
   - Hero foto produk terbaik dengan headline manfaat B2B/B2C, tombol CTA "Minta Katalog & Penawaran" via WhatsApp, dan tombol unduh E-Katalog PDF.
   - 6 Keunggulan mutu (kayu jati oven/kiln-dried, kustomisasi ukuran/warna, sambungan purus mortise-tenon, produsen tangan pertama, proteksi kargo nusantara, dan garansi konstruksi).
   - 6 Kartu Kategori Utama (Meja Kerja, Kursi Ergonomis & Makan, Lemari Penyimpanan, Sofa & Lounge, Meja Meeting & Resepsionis, Custom Furniture).
   - Cuplikan 6 portofolio proyek pilihan dengan label tipe klien dan status render 3D.
   - Alur pemesanan praktis 4 langkah (Konsultasi & Desain → Penawaran & Kesepakatan → Produksi & QC → Pengiriman & Perakitan di Lokasi).
   - FAQ akordeon aksesibel (`details`/`summary`) seputar lead time, anti-rayap, dan garansi.
   - Pembuat Pesan WhatsApp Cepat (Inquiry Builder) interaktif.

2. **Katalog Produk (`/produk` & `/produk/[slug]`):**
   - 28 Produk katalog lengkap dengan galeri foto beresolusi tinggi, filter kategori, spesifikasi material, dimensi PxLxT, dan pilihan finishing.
   - Dynamic route statis (`generateStaticParams`, `dynamicParams = false`).
   - Tombol pemesanan via WhatsApp yang otomatis menyusun pesan berisi nama produk, spesifikasi, dan link preview berfoto (`og.jpg`).
   - Tombol "Tanya Custom Ukuran/Warna".

3. **Inspirasi Ruangan (`/inspirasi`):**
   - 4 Kurasi konsep penataan: *Open Space Office*, *Ruang Direktur & Eksekutif*, *Cafe & Commercial Resto*, dan *Ruang Tamu & Hunian Minimalis*.
   - Tips penataan tata ruang profesional dan tautan langsung ke produk terkait.

4. **Portofolio Proyek (`/proyek`):**
   - Galeri pengerjaan furnitur dengan filter interaktif: *Semua*, *Perkantoran*, *Komersial/Kafe*, dan *Residensial*.
   - Lightbox aksesibel (Keyboard Navigation: Esc tutup, Panah Kiri/Kanan, focus trap, fokus kembali ke elemen pemicu).
   - Label khusus `Render 3D / Desain` untuk foto yang merupakan konsep desain/render 3D.

5. **Layanan Lengkap (`/layanan`):**
   - 4 Pilar layanan: Custom Furniture, Konsultasi Tata Ruang, Pengiriman Nusantara Terproteksi, dan Perakitan di Tempat.
   - Tahapan & estimasi waktu produksi transparan (lead time workshop).

6. **Tentang Kami (`/tentang`):**
   - Profil workshop Busr Mebel di Jepara, keahlian kriya kayu, kapasitas produksi, dan standar mutu.

7. **Kontak (`/kontak`):**
   - Nomor WhatsApp resmi, email tender/penawaran, alamat workshop fisik, jam operasional, dan tautan keluar Google Maps (tanpa iframe pihak ketiga).

8. **Tombol WhatsApp Mengambang (Floating WhatsApp):**
   - Tersedia di pojok kanan bawah di semua halaman dengan efek pulse halus.

---

## Menjalankan & Membangun Project

### Kebutuhan Sistem
- **Node.js**: `>=20.9.0` (Dicek kompatibel dengan Node `v22.20.0`)
- **npm**: `>=10.0.0`

### Perintah Penting

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan local dev server di `http://localhost:3000` |
| `npm run build` | Menjalankan static export ke folder `out/` |
| `npm start` | Menyajikan folder `out/` secara lokal via `serve` |
| `npm run lint` | Menjalankan ESLint ketat (bebas error) |
| `npm run typecheck` | Memvalidasi seluruh tipe TypeScript (`tsc --noEmit`) |
| `npm run optimize-images` | Mengonversi foto di `assets-src/` menjadi WebP & OG JPEG di `public/` |

---

## Panduan Pengelolaan Konten

### 1. Mengganti Nomor WhatsApp & Informasi Toko
Buka file `src/lib/config.ts` atau buat file `.env.local`:
```env
NEXT_PUBLIC_WA_NUMBER=6281234567890
NEXT_PUBLIC_SITE_NAME="Busr Mebel"
NEXT_PUBLIC_SITE_URL="https://busrmebel.com"
```
Di `src/lib/config.ts`, periksa dan ganti nilai bertanda `// TODO`:
- `waDisplay`: format nomor yang tampil di teks (misal `0812-3456-7890`)
- `email`: email resmi penerimaan tender/file desain
- `address`: alamat fisik workshop di Jepara
- `mapsUrl`: tautan Google Maps workshop

### 2. Menambah Produk Baru ke Katalog
1. Buat folder baru di `assets-src/products/<slug-produk>/`
2. Masukkan foto: `01.jpg` (foto utama/sampul), `02.jpg`, `03.jpg`, dst.
3. Jalankan `npm run optimize-images` di terminal.
4. Buka `src/data/products.ts` dan tambahkan objek produk:
```typescript
{
  id: '029',
  slug: 'nama-produk-baru',
  name: 'Nama Produk Baru',
  category: 'meja-kerja', // pilih salah satu CategorySlug
  description: 'Deskripsi lengkap keunggulan, bahan, dan fungsi produk.',
  images: makeImages('nama-produk-baru', 4, 'Nama Produk Baru'),
  specs: {
    material: 'Kayu Jati Solid Finishing Natural',
    dimensions: 'P 120 × L 60 × T 75 cm',
    colors: ['Natural Teak', 'Dark Walnut'],
  },
  price: 2500000, // kosongkan jika ingin "Hubungi kami untuk harga"
  featured: true,
  isCustomizable: true,
}
```

### 3. Menambah Portofolio Proyek Baru
Buka `src/data/projects.ts` dan tambahkan entri pada array `projects`:
```typescript
{
  id: 'proj-15',
  title: 'Nama Proyek / Lokasi Klien',
  clientType: 'Perkantoran', // 'Perkantoran' | 'Komersial/Kafe' | 'Residensial'
  roomType: 'Meeting Room',
  itemsSupplied: 'Meja Rapat Konferensi Kayu Jati 3 Meter',
  location: 'Jakarta Selatan',
  kind: 'proyek nyata', // atau 'render 3D' (akan otomatis diberi badge "Render 3D / Desain")
  src: '/products/slug-produk/01.webp',
  alt: 'Deskripsi foto proyek',
  width: 1080,
  height: 1350,
}
```

---

## Catatan Izin Foto & Privasi Klien (Wajib Diperhatikan)

Sebelum mengunggah dokumentasi foto proyek baru ke website produksi:
1. **Persetujuan Klien (Consent):** Pastikan telah mengantongi izin dari pemilik rumah, pengelola kafe, atau manajemen kantor untuk mempublikasikan foto interior ruangan mereka ke publik.
2. **Pembersihan Data Sensitif:**
   - Periksa apakah ada dokumen rahasia perusahaan, berkas finansial, atau layar komputer yang menyala pada foto area perkantoran.
   - Buramkan (blur) atau hilangkan foto keluarga, anak-anak, nomor plat kendaraan, atau nomor rumah pribadi.
3. **Pemberian Label Render 3D:**
   - Foto desain visualisasi 3D, konsep mock-up, atau perenderan digital wajib diset `kind: 'render 3D'` agar otomatis berlabel badge *"Render 3D / Desain"* demi transparansi etika kepada calon pembeli.
4. **Metadata EXIF/GPS:**
   - Script `npm run optimize-images` secara otomatis menghapus metadata EXIF, tanggal pemotretan, dan koordinat GPS dari kamera asli.

---

## Panduan Deploy ke Production

Hasil build berupa file HTML, CSS, JS, dan WebP statis murni di direktori `out/`.

### 1. Vercel
- Hubungkan repository GitHub ke dashboard Vercel.
- Konfigurasi `vercel.json` sudah tersedia (`outputDirectory: "out"`).
- Set Environment Variable di Project Settings:
  - `NEXT_PUBLIC_SITE_URL`: `https://domain-anda.com`
  - `NEXT_PUBLIC_WA_NUMBER`: `628xxxxxxxxxx`

### 2. Netlify / Cloudflare Pages
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- File `public/_headers` akan otomatis menerapkan Security Headers (CSP, HSTS, X-Frame-Options DENY, nosniff, COOP).

---

## Standar Keamanan & Performa
- **CSP Ketat:** Script pihak ketiga diblokir. Tanpa `dangerouslySetInnerHTML`.
- **Anti Layout Shift (CLS):** Semua gambar memakai rasio tetap 4:5 dengan `fill` dan `sizes` responsif.
- **Aksesibilitas (WCAG AA):** Kontras warna teks ≥ 4.5:1, navigasi keyboard penuh, ARIA landmarks, link lewati ke konten utama.
- **Prefers Reduced Motion:** Efek animasi otomatis dimatikan bagi pengguna dengan setelan sensitivitas gerak.
