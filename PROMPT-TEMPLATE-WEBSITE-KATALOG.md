# Template Prompt: Website Katalog Statis (tinggal salin)

Cara pakai: salin blok di bawah, ganti semua `[...]`, hapus baris yang tidak perlu, lalu kirim.
Taruh dulu foto/video mentah di `[nama-folder]/assets/` dan screenshot referensi di `[nama-folder]/referensi/`.

---

```text
Buatkan website katalog STATIS untuk "[NAMA BRAND]" pakai skill static-catalog.
Kerjakan langsung di folder root repo: `[nama-folder]/` (sejajar dengan busr-mebel, home-gorden-batam, dll).

## Bisnis
- Produk: [jenis produk, mis. roster beton & bata tempel]
- Target: [pemilik rumah, kontraktor, toko bangunan, ...]
- WA: [08xx...]  | IG: [link]  | Threads/Shopee/TikTok: [link]
- Area layanan: [kota/area]  | Info penting lain: [COD, gratis ongkir, ukuran, stok, ...]
- Data yang belum ada (alamat, email, tahun berdiri, harga, dsb.) → placeholder bertanda `// TODO`.
  JANGAN mengarang harga, diskon, rating, testimoni, sertifikasi, atau angka teknis.

## Aset
- Foto & video ada di `[nama-folder]/assets/` (boleh berisi subfolder unduhan IG/Threads + caption.txt).
- Baca SEMUA caption.txt untuk info produk. Hapus duplikat (cek hash), pakai SEMUA foto unik.
- Foto dengan nama usaha/alamat lain: [BOLEH dipakai / JANGAN dipakai].
- Video dengan watermark akun lain: jangan dipakai, laporkan saja.
- Kompres video (ffmpeg, maks 720p, +faststart) dan buat poster; foto lewat `npm run optimize-images`.

## Tampilan
- Website SATU HALAMAN (landing page), navigasi ke section via anchor.
- Konsep layout mengikuti screenshot di `[nama-folder]/referensi/` (ambil struktur & nuansa, bukan tiruan).
  [atau: mirip link https://... tapi dengan tema kita]
- Warna dari logo, tema TERANG. Hindari "AI slop": tanpa gradient blob, tanpa angka/rating palsu,
  tanpa animasi masuk di hero; foto asli jadi fokus.
- Animasi saat scroll (reveal bervariasi: naik, geser kiri/kanan, zoom, tirai foto, stagger),
  hormati prefers-reduced-motion.

## Section yang saya mau
- Hero + carousel kartu foto, strip keunggulan, bento kategori
- Koleksi produk dengan tab filter → klik kartu buka POP-UP detail
  (galeri foto + thumbnail, "Hubungi kami untuk harga", tabel spesifikasi, tombol Tanya via WA & Tanya Custom)
- Galeri dengan filter → klik foto buka LIGHTBOX tema terang
  (bilah atas: logo, ← n/total →, Tutup (Esc); kiri: label, judul, deskripsi, tombol "Pesan model serupa";
  kanan: foto berbingkai; bawah: 4 info ringkas)
- Section video: kartu vertikal 9:16, label + badge Audio, klik putar dengan suara, ← → dan titik indikator
- Panduan + kalkulator, cara order 4 langkah, FAQ, kontak + pembuat pesan WhatsApp
- [Tanpa tombol unduh katalog PDF]

## Teknis & selesai
- Next.js static export, aman (CSP di _headers & vercel.json), tanpa backend/form kirim data.
- Jalankan lint, typecheck, build sampai bersih; cek tampilan di browser (desktop & mobile).
- Setelah selesai: commit & push ke https://github.com/auliyaapri/kenalin-web-porto.git (branch main),
  folder `assets/` & `referensi/` jangan ikut di-commit.
- Akhiri dengan ringkasan singkat + daftar TODO yang harus saya isi.
Kerjakan langsung tanpa menunggu konfirmasi rencana, kecuali ada hal yang benar-benar harus saya putuskan.
```

---

## Tips biar hasilnya pas dari awal

1. **Kirim semua referensi sekaligus** (screenshot layout, link situs, contoh pop-up/lightbox) di prompt pertama,
   jangan dicicil. Sebutkan untuk tiap referensi: "ambil bagian [X]-nya saja".
2. **Putuskan soal foto sensitif di awal** (nama usaha, alamat, orang) supaya tidak bolak-balik.
3. **Satu permintaan perubahan = satu pesan**, contoh: "Hapus tombol unduh katalog" atau
   "Lightbox galeri dibuat seperti gambar ini, tapi tema terang".
4. Kalau mau dikerjakan tanpa jeda, tulis: "Kerjakan langsung, laporkan di akhir."
