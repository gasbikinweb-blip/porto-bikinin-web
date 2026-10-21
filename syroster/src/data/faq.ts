export type FaqItem = { question: string; answer: string };

// Jawaban bersumber dari listing Shopee resmi SY ROSTER.IND (21 Okt 2026) dan unggahan media sosialnya.
// TODO: tinjau ulang bila ketentuan toko berubah.
export const faqs: FaqItem[] = [
  {
    question: 'Berapa minimal order?',
    answer:
      'Untuk roster, minimal pembelian 50 pcs. Bata tempel bevel minimal 8 m², bata tempel tanah liat bakar minimal 10 m², dan lisplang dijual per batang. Detail per produk ada di tombol "Lihat detail".',
  },
  {
    question: 'Ukuran roster apa saja yang tersedia?',
    answer:
      'Ukuran roster yang tersedia: 20 × 20 cm, 20 × 10 cm, 15 × 25 cm, dan 15 × 30 cm. Ketersediaan ukuran bisa berbeda per motif, jadi sebaiknya tanyakan dulu lewat WhatsApp.',
  },
  {
    question: 'Warna apa saja yang tersedia?',
    answer:
      'Roster beton tersedia dalam 3 warna: abu-abu (natural), putih (semen putih), dan merah (gravel).',
  },
  {
    question: 'Area pengiriman ke mana saja?',
    answer:
      'Kami mengirim ke seluruh Jabodetabek setiap hari dengan armada sendiri, serta ke beberapa wilayah Jawa Barat, Jawa Tengah, Jawa Timur, dan Bali. Ketentuan ongkos kirim dan gratis ongkir (berlaku dengan minimal pembelian tertentu) bisa ditanyakan lewat WhatsApp.',
  },
  {
    question: 'Bagaimana jika barang pecah saat pengiriman?',
    answer: 'Jika produk pecah atau rusak dalam pengiriman, kami ganti dengan yang baru.',
  },
  {
    question: 'Apakah bisa bayar di tempat (COD)?',
    answer: 'Bisa. Pembayaran dapat dilakukan saat barang tiba di lokasi.', // dari unggahan Instagram/Threads; TODO: verifikasi syarat COD
  },
  {
    question: 'Berapa kebutuhan roster per m²?',
    answer:
      'Untuk roster ukuran 20 × 20 cm, 1 m² membutuhkan sekitar 25 pcs. Gunakan kalkulator di bagian Panduan, lalu konfirmasi angka pastinya ke kami.',
  },
  {
    question: 'Bisa beli lewat Shopee?',
    answer:
      'Bisa. Setiap produk punya tombol "Lihat di Shopee" yang menuju toko resmi SY ROSTER.IND. Disarankan chat admin terlebih dahulu sebelum order.',
  },
  {
    question: 'Bagaimana cara merawat roster?',
    answer:
      'Bersihkan debu atau lumut secara berkala dengan sikat lembut dan air. Hindari bahan kimia keras.', // TODO: verifikasi saran perawatan
  },
];
