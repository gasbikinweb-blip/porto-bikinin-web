// Pertanyaan umum. Semua jawaban masih menunggu konfirmasi owner.

export type FaqItem = { q: string; a: string };

export const faq: readonly FaqItem[] = [
  {
    q: 'Sari kacang ijonya tahan berapa lama, Kak?',
    // TODO: daya tahan asli dari owner
    a: 'Karena tanpa pengawet, daya tahannya terbatas. Info pastinya akan segera kami lengkapi. Sementara ini, silakan tanya admin lewat WhatsApp ya, Kak.',
  },
  {
    q: 'Perlu disimpan di kulkas?',
    // TODO: cara simpan dari owner
    a: 'Cara penyimpanan yang dianjurkan akan segera kami lengkapi. Untuk sekarang, admin siap menjelaskan saat Kakak memesan.',
  },
  {
    q: 'Apakah aman untuk ibu hamil, ibu menyusui, atau anak-anak?',
    // Jawaban netral, sengaja tanpa klaim kesehatan
    a: 'Setiap kondisi berbeda-beda, Kak. Kalau ada kondisi kesehatan khusus atau alergi, sebaiknya konsultasikan dulu dengan dokter atau tenaga kesehatan. Info komposisi tiap varian bisa ditanyakan ke admin.',
  },
  {
    q: 'Free ongkir berlaku untuk daerah mana saja?',
    // TODO: syarat free ongkir (minimal order, area, jam kirim)
    a: 'Free ongkir berlaku untuk seluruh Yogyakarta. Syarat lengkapnya akan segera kami tuliskan di sini, atau tanyakan langsung ke admin.',
  },
  {
    q: 'Bisa kirim ke luar Jogja?',
    // TODO: konfirmasi pengiriman luar kota
    a: 'Untuk pengiriman ke luar Jogja, silakan tanyakan ke admin dulu ya, Kak.',
  },
  {
    q: 'Bisa pesan banyak untuk acara atau oleh-oleh?',
    // TODO: ketentuan pesanan partai besar
    a: 'Bisa didiskusikan, Kak. Chat admin dengan jumlah dan tanggal acaranya supaya bisa disiapkan.',
  },
];
