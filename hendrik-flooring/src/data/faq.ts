export type FaqItem = { question: string; answer: string };

// TODO: verifikasi semua jawaban dengan kebijakan perusahaan
export const faqs: FaqItem[] = [
  {
    question: 'Berapa lama proses pemasangan lantai vinyl?',
    // TODO: verifikasi estimasi waktu
    answer:
      'Tergantung luas area, kondisi lantai dasar, dan jumlah ruangan. Sebagai gambaran, satu ruangan standar umumnya selesai dalam hitungan hari. Estimasi pasti kami berikan setelah survei dan pengukuran.',
  },
  {
    question: 'Apakah ruangan harus dikosongkan selama pemasangan?',
    answer:
      'Ya, area yang dikerjakan perlu dikosongkan. Untuk rumah sakit yang tetap beroperasi, pekerjaan bisa dijadwalkan bertahap per ruangan atau per zona agar pelayanan tetap berjalan.',
  },
  {
    question: 'Bagaimana cara merawat lantai vinyl?',
    // TODO: sesuaikan dengan rekomendasi produsen
    answer:
      'Sapu atau vakum debu setiap hari, lalu pel dengan pembersih yang direkomendasikan produsen. Hindari bahan abrasif seperti sikat kawat. Panduan perawatan tertulis kami berikan setelah serah terima.',
  },
  {
    question: 'Apakah ada garansi?',
    // TODO: isi ketentuan garansi asli
    answer:
      'Ada. Ketentuan garansi pemasangan dan material akan dijelaskan di surat penawaran sesuai jenis produk yang dipilih.',
  },
  {
    question: 'Area mana saja yang dilayani?',
    // TODO: isi area layanan asli
    answer:
      'Showroom kami ada di Gading Serpong, BSD (Tangerang). Kami melayani BSD, Tangerang Raya, dan Jabodetabek. Untuk proyek di luar kota, silakan hubungi kami lewat WhatsApp untuk dibicarakan.',
  },
  {
    question: 'Apakah bisa dipasang di atas lantai keramik lama?',
    // TODO: verifikasi
    answer:
      'Dalam banyak kasus bisa, setelah permukaan diratakan dengan lapisan perata (self-levelling). Kelayakannya kami pastikan saat survei kondisi lantai.',
  },
  {
    question: 'Apakah survei dikenakan biaya?',
    // TODO: verifikasi kebijakan biaya survei
    answer:
      'Ketentuan biaya survei akan kami informasikan saat Anda menghubungi kami, tergantung lokasi dan skala proyek.',
  },
];
