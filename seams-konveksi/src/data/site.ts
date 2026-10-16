// Data profil bisnis Seams Konveksi. Ubah di sini, bukan di komponen.
// Semua nilai bertanda TODO adalah placeholder dan WAJIB diganti dengan data asli sebelum publikasi.

export type SlotStatus = 'tersedia' | 'terbatas' | 'penuh';

export const site = {
  tagline: 'Konveksi Abaya & Khimar untuk Brand Muslimah Anda',
  description:
    'Seams Konveksi melayani jasa konveksi abaya dan khimar (CMT) untuk brand fashion muslim, butik, dan reseller: mulai dari sampel, produksi jahit, QC, sampai packing.',
  owner: '[Nama Pemilik]', // TODO: nama pemilik
  foundedYear: null as number | null, // TODO: tahun berdiri, mis. 2020
  city: '[Kota]', // TODO: kota
  address: '[Alamat lengkap workshop]', // TODO: alamat lengkap
  // TODO: link Google Maps (tombol "Bagikan" di Google Maps lalu salin link). Kosong = tombol peta disembunyikan.
  mapsUrl: '',
  email: 'halo@example.com', // TODO: email asli
  waDisplay: '0812-3456-7890', // TODO: tampilan nomor WA (harus sama dengan NEXT_PUBLIC_WA_NUMBER)
  instagramHandle: 'seams.konveksi',
  instagramUrl: 'https://www.instagram.com/seams.konveksi/',
  hours: [
    // TODO: verifikasi jam kerja
    { day: 'Senin – Jumat', time: '08.00 – 16.00 WIB' },
    { day: 'Sabtu', time: '08.00 – 12.00 WIB' },
    { day: 'Minggu & libur nasional', time: 'Tutup' },
  ],
  // TODO: area layanan/pengiriman yang sebenarnya
  serviceArea: 'Melayani klien dari berbagai kota. Pengiriman lewat ekspedisi atau kargo.',
  // Status slot jahit: ubah manual lalu build ulang (tidak ada server)
  slot: {
    status: 'tersedia' as SlotStatus, // TODO: 'tersedia' | 'terbatas' | 'penuh'
    label: 'Slot produksi bulan ini: [TODO]', // TODO: mis. "Slot produksi November 2026: masih tersedia"
    note: 'Hubungi kami untuk memastikan jadwal produksi terdekat.',
  },
  // File brosur di public/. Taruh PDF asli dengan nama ini. null = tombol unduh disembunyikan.
  catalogPdf: null as string | null, // TODO: mis. '/katalog/katalog-seams-konveksi.pdf'
};

// Angka pencapaian. value null = belum diisi, ditampilkan "—" agar tidak tampak seperti data resmi.
export type Stat = { label: string; value: string | null };
export const stats: Stat[] = [
  { label: 'Tahun pengalaman', value: null }, // TODO: isi angka asli
  { label: 'Pesanan selesai', value: null }, // TODO: isi angka asli
  { label: 'Pcs diproduksi', value: null }, // TODO: isi angka asli
  { label: 'Brand dilayani', value: null }, // TODO: isi angka asli
];

export type Point = { title: string; description: string };

export const advantages: Point[] = [
  {
    title: 'Spesialis abaya & khimar',
    description:
      'Fokus pada busana muslimah, sehingga detail potongan dan jatuh kain lebih diperhatikan.',
  },
  {
    title: 'Jahitan rapi',
    // TODO: verifikasi dengan kondisi produksi asli
    description: 'Setiap bagian dijahit teliti agar nyaman dipakai dan layak dijual brand Anda.',
  },
  {
    title: 'Sampel sebelum produksi',
    description: 'Anda menyetujui sampel lebih dulu, baru produksi berjalan mengikuti sampel itu.',
  },
  {
    title: 'Alur produksi jelas',
    description: 'Konsultasi, sampel, produksi, QC, sampai packing: setiap tahap jelas urutannya.',
  },
  {
    title: 'QC sebelum kirim',
    // TODO: verifikasi dengan kondisi produksi asli (apa saja yang dicek saat QC)
    description: 'Barang diperiksa sebelum dikemas untuk mengurangi cacat jahitan.',
  },
  {
    title: 'Update progres via WhatsApp',
    description: 'Kabar progres produksi dikirim langsung lewat WhatsApp, tanpa harus menebak.',
  },
];

export const productionSteps: Point[] = [
  {
    title: 'Konsultasi',
    description: 'Ceritakan desain, jumlah, bahan, dan target waktu Anda lewat WhatsApp.',
  },
  { title: 'Sampel', description: 'Kami buat pola dan sampel untuk Anda cek dan setujui.' },
  {
    title: 'Produksi',
    description: 'Setelah sampel disetujui, produksi jahit berjalan sesuai sampel.',
  },
  { title: 'Quality control', description: 'Hasil jahitan diperiksa sebelum dikemas.' },
  { title: 'Packing & kirim', description: 'Barang dikemas rapi dan dikirim ke alamat Anda.' },
];

export const principles: Point[] = [
  {
    title: 'Rapi',
    description:
      'Jahitan dan finishing dikerjakan teliti, karena produk Anda membawa nama brand Anda.',
  },
  {
    title: 'Tepat waktu',
    description: 'Jadwal disepakati di awal dan progres dikabarkan secara berkala.',
  },
  {
    title: 'Komunikasi jelas',
    description: 'Setiap detail dibahas terbuka sebelum produksi dimulai.',
  },
  {
    title: 'Sesuai sampel',
    description: 'Sampel yang disetujui menjadi acuan seluruh produksi.',
  },
];
