// Sumber: Informasi.txt dan caption Instagram
export const site = {
  name: 'Abika Furniture',
  description:
    'Abika Furniture, brand furnitur lokal dari Jepara. Sofa, kursi, meja, lemari, dan tempat tidur berbahan kayu jati, bisa dipesan lewat WhatsApp.',
  city: 'Jepara',
  // TODO: alamat lengkap workshop/toko belum ada di Informasi.txt
  address: 'Jepara, Jawa Tengah',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Abika+Furniture+Jepara',
  // TODO: jam buka belum ada di Informasi.txt
  hours: null as string | null,
  instagram: 'https://www.instagram.com/abika_furniture/',
  instagramHandle: '@abika_furniture',
  whatsappDisplay: ['0858-0566-8632', '0858-6619-9520'],
  whatsappSecond: '6285866199520',
};

export const advantages = [
  {
    title: 'Kayu jati pilihan',
    text: 'Sebagian besar produk kami memakai kayu jati, dengan pilihan finishing natural, walnut, hingga hitam.',
  },
  {
    title: 'Dikerjakan di Jepara',
    text: 'Abika Furniture adalah brand lokal yang berasal dari Jepara, kota yang dikenal dengan keahlian mebelnya.',
  },
  {
    title: 'Kombinasi material',
    text: 'Kami mengembangkan kombinasi kayu, besi, aluminium, dan stainless steel untuk memenuhi kebutuhan pelanggan.',
  },
  {
    title: 'Dipercaya untuk proyek',
    text: 'Kami memproduksi dan mengirim 320 kursi untuk Grand Maya Hotel di Kalimantan.',
  },
];

// TODO: sesuaikan alur pemesanan dengan praktik Abika Furniture
export const orderSteps = [
  { title: 'Pilih produk', text: 'Lihat katalog, lalu buka detail produk yang Anda suka.' },
  {
    title: 'Chat WhatsApp',
    text: 'Tekan "Pesan via WhatsApp", pesan otomatis berisi nama produknya.',
  },
  {
    title: 'Konfirmasi',
    text: 'Diskusikan ukuran, finishing, harga, dan ongkos kirim dengan tim kami.',
  },
  { title: 'Produksi & kirim', text: 'Pesanan dikerjakan, lalu dikirim ke alamat Anda.' },
];
