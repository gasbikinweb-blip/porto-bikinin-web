// Pertanyaan yang sering ditanyakan. Jawaban spesifik toko yang belum dikonfirmasi ditandai TODO.
export type Faq = { q: string; a: string };

export const faqs: readonly Faq[] = [
  {
    q: 'Apakah bisa beli eceran per dus?',
    // TODO: konfirmasi minimal pembelian
    a: 'Bisa, Kak. Harga keramik di website ini per dus. Untuk minimal pembelian dan harga grosir, silakan chat kami via WhatsApp.',
  },
  {
    q: 'Apa beda KW1, KW2, dan KW3?',
    a: 'KW menunjukkan tingkat kualitas hasil produksi pabrik. KW1 paling rapi (ukuran, warna, dan permukaan paling seragam), KW2 bisa ada sedikit perbedaan warna atau cacat kecil, dan KW3 perbedaannya lebih terlihat sehingga harganya paling hemat. Semua tetap bisa dipakai; pilih sesuai kebutuhan dan anggaran.',
  },
  {
    q: 'Berapa ongkir delivery ke Jabodetabek?',
    // TODO: konfirmasi tarif & syarat gratis ongkir
    a: 'Ongkir tergantung jarak dan jumlah barang. Di listing Shopee kami tertulis gratis ongkir bila mencapai minimal belanja tertentu sesuai jarak (syarat dan ketentuan berlaku). Kirim alamat Kakak via WhatsApp untuk hitungan pastinya.',
  },
  {
    q: 'Apakah bisa kirim ke luar kota?',
    // Sumber: caption Instagram SBK
    a: 'Bisa, Kak. Kami melayani pengiriman ke luar kota dan pesanan dalam jumlah banyak. Hubungi admin via WhatsApp untuk cek ongkir dan jadwal kirim.',
  },
  {
    q: 'Bisa kirim instan atau sameday?',
    // Sumber: listing Shopee & highlight Testimoni IG
    a: 'Bisa lewat Grab/Gojek: pengiriman instan maksimal 4 dus, sameday maksimal 2 dus. Pesanan lebih banyak dikirim dengan kurir toko atau kargo.',
  },
  {
    q: 'Apakah bisa datang langsung ke toko?',
    a: 'Bisa. Toko kami buka Senin sampai Sabtu pukul 08.00 sampai 17.00. Lihat alamat dan petunjuk arah di bagian "Kunjungi Toko Kami".',
  },
  {
    q: 'Apakah stok selalu tersedia?',
    a: 'Stok berjalan setiap hari, jadi mohon tanyakan ketersediaan via WhatsApp sebelum memesan atau datang ke toko.',
  },
  {
    q: 'Bagaimana cara pembayarannya?',
    // TODO: konfirmasi metode pembayaran (tunai, transfer, QRIS, dsb.)
    a: 'Untuk pembelian lewat Shopee, pembayaran mengikuti metode di Shopee. Untuk pembelian langsung atau via WhatsApp, silakan tanyakan metode pembayaran yang tersedia ke admin.',
  },
];
