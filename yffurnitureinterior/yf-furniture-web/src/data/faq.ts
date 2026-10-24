export type FaqItem = { question: string; answer: string };

// TODO: semua jawaban perlu dikonfirmasi pemilik sebelum rilis
export const faq: readonly FaqItem[] = [
  {
    question: 'Berapa lama waktu pengerjaannya?',
    answer:
      'Lama pengerjaan tergantung jenis, ukuran, dan antrean produksi. Kirim detail pesanan via WhatsApp untuk estimasi waktu.', // TODO
  },
  {
    question: 'Apakah bisa dibuat dengan ukuran custom?',
    answer:
      'Bisa. Semua furnitur dibuat by order, jadi ukuran, model, dan warna bisa disesuaikan dengan ruangan Anda.', // TODO
  },
  {
    question: 'Apakah bisa kirim ke luar kota?',
    answer:
      'Bisa. Pesanan dapat dikirim ke luar kota, misalnya lewat ekspedisi kargo. Ongkos kirim dihitung sesuai tujuan.', // TODO: konfirmasi area kirim & jasa pasang
  },
  {
    question: 'Bagaimana sistem pembayaran dan DP?',
    answer:
      'Detail sistem pembayaran dan uang muka (DP) dijelaskan saat diskusi pesanan via WhatsApp.', // TODO
  },
  {
    question: 'Apakah boleh datang langsung ke workshop?',
    answer:
      'Silakan hubungi kami via WhatsApp terlebih dahulu untuk mengatur waktu kunjungan ke workshop di Selodoko, Ampel, Boyolali.', // TODO
  },
  {
    question: 'Apakah ada gratis desain dan cek lokasi?',
    answer:
      'Untuk area Boyolali, Salatiga, dan sekitarnya tersedia free design dan cek lokasi. Hubungi kami untuk menjadwalkan.', // TODO: konfirmasi masih berlaku
  },
];
