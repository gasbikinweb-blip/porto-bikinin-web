// Sumber: assets/informasi.txt, profil WhatsApp Bisnis, dan caption Instagram @dmsjeparafurniture
export const site = {
  name: 'DMS Jepara Furniture',
  description:
    'DMS Jepara Furniture, workshop furnitur custom dari Jepara. Sofa, meja makan, meja rias, credenza, tempat tidur, hingga kitchen set bergaya luxury, bisa dipesan lewat WhatsApp.',
  city: 'Jepara',
  address: 'Jl. Sosrodiningrat, Bawu RT 23/05, Kec. Batealit, Kab. Jepara, Jawa Tengah 59461',
  street: 'Jl. Sosrodiningrat, Bawu RT 23/05',
  postalCode: '59461',
  mapsUrl: 'https://goo.gl/maps/fwLF3FQMTcGqmACD9',
  email: 'dmsfurniturejepara@gmail.com',
  facebook: 'https://www.facebook.com/dmsjeparafurniture',
  // TODO: jam buka belum ada di informasi.txt
  hours: null as string | null,
  instagram: 'https://www.instagram.com/dmsjeparafurniture/',
  instagramHandle: '@dmsjeparafurniture',
  threads: 'https://www.threads.com/@dmsjeparafurniture',
  whatsappDisplay: '0851-6282-1954',
};

export const advantages = [
  {
    title: 'Semua bisa custom',
    text: 'Kami menerima pesanan semua jenis furnitur custom: desain, ukuran, bahan, dan warna menyesuaikan kebutuhan Anda.',
  },
  {
    title: 'Workshop di Jepara',
    text: 'Setiap pesanan dikerjakan pengrajin kami di Jepara, kota yang dikenal dengan keahlian mebel dan ukirnya.',
  },
  {
    title: 'Gaya luxury & klasik',
    text: 'Spesialis furnitur bergaya luxury, klasik Eropa, hingga modern, dengan detail ukir, tufting, dan aksen gold.',
  },
  {
    title: 'Konsultasi desain gratis',
    text: 'Diskusikan desain, ukuran, dan material lebih dulu, lalu kami berikan estimasi sebelum produksi.',
  },
];

// Mengikuti ketentuan order di caption Instagram: konsultasi, detail desain, ukuran, material, estimasi
export const orderSteps = [
  { title: 'Pilih model', text: 'Lihat katalog, atau kirim foto referensi furnitur impian Anda.' },
  {
    title: 'Konsultasi',
    text: 'Chat WhatsApp untuk membahas detail desain, ukuran, dan material bahan.',
  },
  {
    title: 'Estimasi & deal',
    text: 'Kami kirim estimasi harga dan waktu pengerjaan sebelum produksi dimulai.',
  },
  {
    title: 'Produksi & kirim',
    text: 'Pesanan dikerjakan di workshop Jepara, lalu dikirim ke alamat Anda.',
  },
];
