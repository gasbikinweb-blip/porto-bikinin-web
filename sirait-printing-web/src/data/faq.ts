export type FaqItem = { question: string; answer: string };

// TODO: semua jawaban perlu dikonfirmasi pemilik sebelum rilis
export const faq: readonly FaqItem[] = [
  {
    question: 'Berapa lama print skripsi selesai?',
    answer:
      'Tergantung jumlah halaman dan antrean hari itu. Kirim file via WhatsApp, admin akan kasih tahu perkiraan waktu selesainya.', // TODO
  },
  {
    question: 'Bisa print dari file Word?',
    answer:
      'Bisa, tapi kami sarankan kirim PDF supaya tata letak, font, dan nomor halaman tidak bergeser.', // TODO
  },
  {
    question: 'Bisa diantar?',
    answer:
      'Bisa untuk pesanan tertentu, misalnya beberapa rangkap skripsi. Syarat area dan ongkosnya ditanyakan langsung ke admin ya.', // TODO: konfirmasi syarat antar & ongkir
  },
  {
    question: 'Buka hari Minggu?',
    answer: 'Buka setiap hari. Untuk hari libur nasional, cek dulu via WhatsApp ya.', // TODO: konfirmasi
  },
  {
    question: 'Berapa lama jilid lux?',
    answer:
      'Berdasarkan info terakhir kami, pengerjaan jilid lux sekitar 1 hari. Saat ramai bisa berbeda, konfirmasi ke admin dulu ya.', // TODO
  },
  {
    question: 'Harga warna beda dengan hitam putih?',
    answer:
      'Untuk print proposal, skripsi, dan tesis, harga warna dan hitam putih sama per lembarnya.',
  },
];
