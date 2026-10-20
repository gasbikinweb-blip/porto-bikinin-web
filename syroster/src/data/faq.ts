export type FaqItem = { question: string; answer: string };

// TODO: semua jawaban perlu diverifikasi pemilik sebelum publikasi
export const faqs: FaqItem[] = [
  {
    question: 'Berapa minimal order?',
    answer:
      'Minimal order akan kami informasikan saat konsultasi. Hubungi kami lewat WhatsApp untuk detailnya.', // TODO: isi minimal order
  },
  {
    question: 'Berapa lama waktu produksi dan pengiriman?',
    answer:
      'Untuk motif yang tersedia di stok biasanya lebih cepat. Estimasi pasti diberikan di penawaran.', // TODO: isi estimasi waktu
  },
  {
    question: 'Berapa kebutuhan roster per m²?',
    answer:
      'Untuk roster ukuran 20 × 20 cm, perkiraan kasarnya sekitar 25 keping per m² sebelum nat dan cadangan. Gunakan kalkulator di bagian Panduan, lalu konfirmasi angka pastinya ke kami.', // TODO: verifikasi angka per produk
  },
  {
    question: 'Bagaimana cara merawat roster?',
    answer:
      'Bersihkan debu atau lumut secara berkala dengan sikat lembut dan air. Hindari bahan kimia keras. Untuk area yang sering terkena hujan, tanyakan rekomendasi pelapis ke kami.', // TODO: verifikasi saran perawatan
  },
  {
    question: 'Apakah ada garansi?',
    answer:
      'Ketentuan garansi atau penggantian barang rusak saat pengiriman akan dijelaskan di penawaran.', // TODO: isi kebijakan garansi asli
  },
  {
    question: 'Area pengiriman ke mana saja?',
    answer:
      'Kami mengirim ke seluruh Jabodetabek dengan gratis ongkir. Untuk luar Jabodetabek, tanyakan ongkos kirimnya lewat WhatsApp.', // dari unggahan Threads; TODO: verifikasi syarat
  },
  {
    question: 'Apakah bisa bayar di tempat (COD)?',
    answer: 'Bisa. Pembayaran dapat dilakukan saat barang tiba di lokasi.', // dari unggahan Instagram/Threads; TODO: verifikasi syarat COD
  },
  {
    question: 'Ukuran roster apa saja yang tersedia?',
    answer:
      'Ukuran yang umum kami sediakan adalah 20 × 20 cm dan 15 × 30 cm, serta roster nako 25 × 15 cm. Ukuran tiap motif bisa berbeda, tanyakan detailnya lewat WhatsApp.', // TODO: verifikasi per motif
  },
  {
    question: 'Apakah bisa minta sampel?',
    answer: 'Bisa. Hubungi kami lewat WhatsApp untuk ketentuan pengambilan atau pengiriman sampel.', // TODO: kebijakan sampel
  },
];
