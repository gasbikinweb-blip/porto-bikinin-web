// Teks dan navigasi halaman

export const navLinks = [
  { href: '#varian', label: 'Varian' },
  { href: '#kenapa', label: 'Kenapa Heyda' },
  { href: '#cara-pesan', label: 'Cara Pesan' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const orderSteps = [
  { title: 'Pilih varian', text: 'Tentukan varian dan jumlah botol yang Kakak mau.' },
  {
    title: 'Chat via WhatsApp',
    text: 'Kirim pesanan lewat WhatsApp, pesannya sudah kami siapkan.',
  },
  {
    title: 'Konfirmasi & bayar',
    // TODO: metode pembayaran
    text: 'Admin konfirmasi total dan cara pembayaran ke Kakak.',
  },
  {
    title: 'Diantar ke rumah',
    // TODO: estimasi waktu kirim
    text: 'Pesanan diantar, free ongkir untuk seluruh Jogja.',
  },
] as const;

// TODO: semua info penyimpanan menunggu konfirmasi owner
export const storageInfo = [
  { title: 'Cara simpan', text: 'Info cara penyimpanan segera kami lengkapi.' },
  {
    title: 'Daya tahan',
    text: 'Tanpa pengawet, jadi daya tahannya terbatas. Detail segera diinfokan.',
  },
  {
    title: 'Untuk oleh-oleh',
    text: 'Mau dibawa pulang ke luar kota? Tanya admin cara bawa yang aman ya, Kak.',
  },
] as const;

// Akun terkait. TODO: konfirmasi hubungan @sarikacangijoyogyakarta dengan Heyda
export const relatedAccount = '@sarikacangijoyogyakarta';
