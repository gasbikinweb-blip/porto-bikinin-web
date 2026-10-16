// Layanan per tipe klien dan daftar layanan. Isi masih contoh; sesuaikan dengan cara kerja asli.

export type Solution = {
  id: string;
  clientType: string;
  problem: string;
  approach: string;
  recommended: string[];
};

export const solutions: Solution[] = [
  {
    id: 'brand-baru',
    clientType: 'Brand baru',
    problem:
      'Baru mulai dan ingin memastikan desain pertama jadi sesuai bayangan sebelum produksi.',
    approach: 'Mulai dari konsultasi desain dan pembuatan sampel, lalu produksi dalam jumlah awal.',
    recommended: ['Konsultasi desain', 'Pola & sampel', 'Produksi awal'], // TODO: verifikasi
  },
  {
    id: 'brand-berjalan',
    clientType: 'Brand yang sudah berjalan',
    problem: 'Butuh mitra produksi rutin yang konsisten untuk restock dan koleksi baru.',
    approach: 'Jadwal produksi disepakati di depan, dengan sampel acuan dan QC di setiap batch.',
    recommended: ['Produksi CMT rutin', 'QC per batch', 'Packing siap jual'],
  },
  {
    id: 'butik-reseller',
    clientType: 'Butik & reseller',
    problem: 'Ingin punya produk dengan model sendiri tanpa membangun produksi sendiri.',
    approach: 'Kami bantu mewujudkan model Anda dari sampel sampai barang siap dijual.',
    recommended: ['Pola & sampel', 'Produksi CMT', 'Packing'],
  },
  {
    id: 'komunitas-seragam',
    clientType: 'Komunitas, instansi & seragam',
    problem: 'Butuh gamis atau khimar seragam dengan ukuran dan warna yang sama untuk anggota.',
    approach: 'Sampel disetujui bersama, lalu produksi mengikuti daftar ukuran anggota.',
    recommended: ['Konsultasi', 'Sampel', 'Produksi sesuai daftar ukuran'],
  },
];

export type Service = { id: string; name: string; description: string; duration: string };

// TODO: semua estimasi waktu adalah contoh; verifikasi dengan kondisi produksi asli
export const services: Service[] = [
  {
    id: 'konsultasi',
    name: 'Konsultasi desain',
    description: 'Diskusi desain, bahan, ukuran, jumlah, dan jadwal lewat WhatsApp.',
    duration: 'Estimasi: [TODO]',
  },
  {
    id: 'sampel',
    name: 'Pembuatan pola & sampel',
    description: 'Pola dibuat dari desain Anda, lalu dijahit menjadi sampel untuk disetujui.',
    duration: 'Estimasi: [TODO] hari kerja',
  },
  {
    id: 'produksi',
    name: 'Produksi (CMT)',
    description: 'Cut, Make, Trim: potong kain, jahit, dan finishing mengikuti sampel.',
    duration: 'Estimasi: [TODO] hari kerja, tergantung jumlah',
  },
  {
    id: 'qc',
    name: 'Quality control',
    description: 'Pemeriksaan jahitan, ukuran, dan kerapian sebelum dikemas.',
    duration: 'Estimasi: [TODO]',
  },
  {
    id: 'packing',
    name: 'Packing',
    description: 'Pengemasan rapi sesuai kesepakatan, siap kirim.',
    duration: 'Estimasi: [TODO]',
  },
];

// TODO: jangan dikarang; isi sesuai kebijakan asli Seams Konveksi
export const terms = [
  { label: 'Minimum order', value: '[TODO]' },
  { label: 'Harga', value: '[TODO: mis. per pcs, tergantung model dan jumlah]' },
  { label: 'Kapasitas produksi', value: '[TODO]' },
];
