// Konten umum: keunggulan, langkah kerja, layanan, angka pencapaian, prinsip kerja

export type Feature = { title: string; text: string; icon: IconName };
export type IconName =
  | 'seamless'
  | 'clean'
  | 'shield'
  | 'grip'
  | 'coving'
  | 'ruler'
  | 'chat'
  | 'doc'
  | 'tools'
  | 'team'
  | 'box'
  | 'repair'
  | 'clock';

// Klaim umum yang aman. TODO: verifikasi dengan spesifikasi produk asli
export const features: Feature[] = [
  {
    icon: 'seamless',
    title: 'Permukaan rapat tanpa celah',
    text: 'Lembaran lebar dengan sambungan dilas panas, sehingga kotoran dan cairan tidak mudah tertahan di sela.',
  },
  {
    icon: 'clean',
    title: 'Mudah dibersihkan dan disanitasi',
    text: 'Permukaan rata dan tidak berpori memudahkan petugas kebersihan bekerja cepat setiap hari.',
  },
  {
    icon: 'shield',
    title: 'Tahan cairan pembersih',
    // TODO: verifikasi dengan spesifikasi produk asli
    text: 'Dipilih untuk penggunaan rutin dengan cairan pembersih sesuai rekomendasi produsen.',
  },
  {
    icon: 'grip',
    title: 'Pilihan anti-slip',
    // TODO: verifikasi dengan spesifikasi produk asli
    text: 'Tersedia varian bertekstur untuk toilet, kamar mandi pasien, dan area basah lainnya.',
  },
  {
    icon: 'coving',
    title: 'Plint naik ke dinding (coving)',
    text: 'Sudut lantai dan dinding dibuat melengkung sehingga tidak ada sudut mati yang sulit dijangkau.',
  },
  {
    icon: 'team',
    title: 'Pemasangan rapi oleh tim sendiri',
    text: 'Dari perataan lantai dasar sampai finishing sambungan dikerjakan oleh tim yang terbiasa di proyek kesehatan.',
  },
];

export type Step = { title: string; text: string; icon: IconName };

export const steps: Step[] = [
  {
    icon: 'chat',
    title: 'Konsultasi',
    text: 'Ceritakan kebutuhan ruangan Anda lewat WhatsApp: tipe fasilitas, ruangan, dan perkiraan luas.',
  },
  {
    icon: 'ruler',
    title: 'Survei & pengukuran',
    text: 'Tim kami datang mengukur, mengecek kondisi lantai dasar, dan memberi rekomendasi jenis lantai.',
  },
  {
    icon: 'doc',
    title: 'Penawaran',
    text: 'Anda menerima penawaran tertulis berisi material, lingkup pekerjaan, jadwal, dan ketentuan garansi.',
  },
  {
    icon: 'tools',
    title: 'Pemasangan',
    text: 'Pekerjaan dijadwalkan agar minim mengganggu operasional, lalu diserahterimakan dalam kondisi bersih.',
  },
];

export type Stat = { label: string; value: string | null };

// TODO: isi angka asli. Nilai null ditampilkan sebagai "Data menyusul", bukan angka karangan.
export const stats: Stat[] = [
  { label: 'Proyek fasilitas kesehatan', value: null },
  { label: 'Meter persegi terpasang', value: null },
  { label: 'Tahun pengalaman', value: null },
];

// Janji layanan singkat untuk bar bawah modal (gaya referensi 4). TODO: verifikasi, terutama garansi
export const trustItems: { icon: IconName; label: string }[] = [
  { icon: 'ruler', label: 'Survei & ukur langsung' },
  { icon: 'team', label: 'Dipasang tim sendiri' },
  { icon: 'shield', label: 'Bergaransi' },
];
