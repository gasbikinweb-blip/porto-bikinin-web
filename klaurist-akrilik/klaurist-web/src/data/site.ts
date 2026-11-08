// Data situs. Sumber: Informasi.txt, logo, dan caption Threads.

export const site = {
  name: 'Klaurist Jogja',
  tagline: 'Everlasting Love',
  description:
    'Klaurist Jogja: sewa papan ucapan akrilik dan bucket bunga non-fresh di Yogyakarta. Awet, aesthetic, dan ramah di kantong. Pesan lewat WhatsApp.',
  city: 'Yogyakarta',
  serviceArea: 'Yogyakarta dan sekitarnya', // TODO: konfirmasi area antar
  waDisplay: '0896-7302-9841',
  instagram: 'https://www.instagram.com/klaurist.akrilik/',
  threads: 'https://www.threads.com/@klaurist.akrilik',
  handle: '@klaurist.akrilik',
  // Alamat tidak ada di Informasi.txt, jadi tidak ditampilkan
};

export const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#papan', label: 'Papan' },
  { href: '#bucket', label: 'Bucket' },
  { href: '#cara-pesan', label: 'Cara Pesan' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const eventTypes = ['Wisuda', 'Sidang', 'Ulang tahun', 'Grand opening', 'Lainnya'] as const;

// TODO: konfirmasi batas pemesanan (misalnya H-2)
export const LEAD_DAYS = 2;

export const reasons = [
  {
    icon: 'flower',
    title: 'Awet, non-fresh',
    short: 'Tidak layu, bisa disimpan',
    text: 'Bunga non-fresh tidak layu, jadi bisa disimpan lama sebagai kenangan.',
  },
  {
    icon: 'sparkle',
    title: 'Aesthetic',
    short: 'Cantik di setiap foto',
    text: 'Rangkaian manis dengan warna lembut yang cantik di foto.',
  },
  {
    icon: 'wallet',
    title: 'Ramah di kantong',
    short: 'Pas untuk mahasiswa',
    text: 'Harga bersahabat untuk kantong mahasiswa. Harga bisa bisik-bisik, Kak.',
  },
  {
    icon: 'truck',
    title: 'Bisa diantar',
    short: 'Ke lokasi acara di Jogja',
    text: 'Diantar ke lokasi acara di Jogja. Area dan ongkir dikonfirmasi admin.',
  }, // TODO: area antar
] as const;

// TODO: konfirmasi alur, DP, dan metode bayar
export const steps = [
  { title: 'Pilih model', text: 'Pilih papan akrilik atau bucket favorit Kakak.' },
  {
    title: 'Kirim detail via WA',
    text: 'Isi tanggal, lokasi, dan teks ucapan, lalu kirim ke WhatsApp.',
  },
  { title: 'Konfirmasi & bayar', text: 'Admin mengonfirmasi ketersediaan, total, dan cara bayar.' },
  { title: 'Diantar atau diambil', text: 'Pesanan diantar ke lokasi acara atau diambil sendiri.' },
] as const;
