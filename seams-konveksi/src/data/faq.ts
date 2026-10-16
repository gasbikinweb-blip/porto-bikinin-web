export type Faq = { question: string; answer: string };

// TODO: semua jawaban perlu diverifikasi dengan kebijakan asli Seams Konveksi
export const faqs: Faq[] = [
  {
    question: 'Berapa minimum order?',
    answer: 'Minimum order: [TODO]. Silakan konsultasikan jumlah Anda lewat WhatsApp.',
  },
  {
    question: 'Berapa lama pembuatan sampel?',
    answer: 'Estimasi pembuatan sampel [TODO] hari kerja, tergantung tingkat kerumitan desain.',
  },
  {
    question: 'Berapa lama proses produksi?',
    answer:
      'Tergantung jumlah dan model, estimasi [TODO]. Jadwal pasti disepakati setelah sampel disetujui.',
  },
  {
    question: 'Apakah bisa membawa bahan sendiri?',
    answer: '[TODO: jelaskan kebijakan bahan, mis. bahan dari klien atau dibantu carikan].',
  },
  {
    question: 'Bagaimana sistem pembayaran / DP?',
    answer: '[TODO: jelaskan sistem DP dan pelunasan].',
  },
  {
    question: 'Apakah bisa kirim ke luar kota?',
    answer: '[TODO: jelaskan area pengiriman dan ekspedisi yang dipakai].',
  },
];
