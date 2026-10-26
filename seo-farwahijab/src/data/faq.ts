export type FaqItem = { question: string; answer: string };

// TODO: semua jawaban perlu dikonfirmasi pemilik sebelum rilis
export const faq: readonly FaqItem[] = [
  {
    question: 'Bagaimana memilih ukuran bergo S atau M?',
    answer:
      'Detail panjang depan dan belakang ada di setiap halaman produk. Kalau masih ragu, kirim foto atau tinggi badan Kakak ke admin, nanti kami bantu pilihkan.', // TODO
  },
  {
    question: 'Bahannya apa saja dan nyaman tidak?',
    answer:
      'Bahan tertulis di setiap produk, misalnya rayon viscose untuk hijab instan dan voal untuk khiban/segi empat. Warna asli bisa berbeda sekitar 5–10% karena cahaya foto.',
  },
  {
    question: 'Cara merawat hijab supaya awet?',
    answer:
      'Kami sarankan cuci dengan tangan atau mode lembut, jangan diperas kuat, dan jemur di tempat teduh.', // TODO
  },
  {
    question: 'Ongkir dan pengiriman dari mana?',
    answer: 'Pesanan dikirim dari Kabupaten Bandung. Ongkir mengikuti ekspedisi dan kota tujuan.', // TODO
  },
  {
    question: 'Bisa retur atau tukar?',
    answer:
      'Untuk keluhan atau produk cacat, wajib menyertakan video unboxing dari paket masih tersegel tanpa jeda. Tanpa video unboxing, retur tidak bisa diproses.', // sumber: ketentuan di Shopee. TODO: konfirmasi untuk order via WA
  },
  {
    question: 'Pembayarannya bagaimana?',
    answer:
      'Eceran bisa langsung checkout di Shopee. Untuk order via WhatsApp dan grosir, admin akan kirim detail pembayaran.', // TODO
  },
  {
    question: 'Kenapa harga di WA dan Shopee bisa beda?',
    answer:
      'Harga di Shopee sudah termasuk biaya admin marketplace. Untuk grosir dan promo tertentu, harga khusus tersedia lewat WhatsApp.', // sumber: caption IG (“Shopee +adm 25%”)
  },
];
