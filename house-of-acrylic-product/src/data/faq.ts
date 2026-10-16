export type Faq = { readonly q: string; readonly a: string };

export const faqs: readonly Faq[] = [
  {
    q: 'Apakah saya bisa membawa desain sendiri?',
    a: 'Bisa. Kirim desain Anda lewat WhatsApp, tim kami cek ukuran dan kesiapan file sebelum produksi. Belum punya desain? Kami bantu buatkan.',
  },
  {
    q: 'Format file desain apa yang dibutuhkan?',
    // TODO: verifikasi format yang diterima
    a: 'Paling ideal file vektor: CDR, AI, atau PDF (outline). Untuk UV printing, gambar resolusi tinggi (PNG/JPG min. 300 dpi) juga bisa.',
  },
  {
    q: 'Berapa minimal order gantungan kunci akrilik?',
    // TODO: verifikasi minimal order dan promo yang berlaku
    a: 'Minimal order gantungan kunci mulai 50 pcs. Tanyakan promo bulan ini lewat WhatsApp.',
  },
  {
    q: 'Berapa lama pengerjaan neon box?',
    // TODO: verifikasi estimasi waktu produksi
    a: 'Neon box standar umumnya selesai 3–7 hari kerja setelah desain disetujui dan DP diterima, tergantung ukuran dan antrean.',
  },
  {
    q: 'Bagaimana cara pembayarannya?',
    a: 'Pembayaran hanya melalui transfer ke rekening BCA a/n Hersan Fachriansyah Putra. Mohon abaikan permintaan transfer ke rekening lain.',
  },
  {
    q: 'Apakah bisa kirim ke luar kota?',
    a: 'Bisa. Produk dikemas aman dan dikirim lewat ekspedisi ke seluruh Indonesia, termasuk luar pulau Jawa.',
  },
];
