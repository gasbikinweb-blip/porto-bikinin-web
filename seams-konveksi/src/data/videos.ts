// Video "di balik produksi" dari Instagram @seams.konveksi.
// Sudah dikompres (540px, H.264, tanpa audio, metadata dibuang) ke public/videos/. Cara menambah: lihat README.
// Catatan: teks di dalam video berasal dari postingan asli (tidak diedit).

export type Video = {
  slug: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

export const videos: Video[] = [
  {
    slug: 'kejar-deadline-1200-pcs',
    title: 'Mengejar deadline 1.200+ pcs',
    description: 'Tumpukan hasil produksi yang siap diselesaikan untuk satu pesanan besar.',
    width: 540,
    height: 960,
  },
  {
    slug: 'proses-produksi-workshop',
    title: 'Proses produksi di workshop',
    description: 'Dari menjahit, memasang kancing dengan mesin otomatis, menyetrika, sampai QC.',
    width: 540,
    height: 960,
  },
  {
    slug: 'antrean-produksi-lebaran',
    title: 'Antrean produksi menjelang lebaran',
    description: 'Potongan kain klien yang menunggu giliran dijahit sesuai jadwal.',
    width: 540,
    height: 960,
  },
  {
    // TODO: pastikan karyawan di video bersedia wajahnya tampil di website
    slug: 'potong-9-roll-kain',
    title: 'Memotong 9 roll kain sekaligus',
    description: 'Proses potong kain one-set untuk klien langganan dengan mesin potong.',
    width: 540,
    height: 960,
  },
  {
    slug: 'detail-kualitas-jahitan',
    title: 'Detail kualitas jahitan',
    description: 'Jahitan tindas, lubang kancing, dan kerapian kerah dari dekat.',
    width: 540,
    height: 958,
  },
  {
    slug: 'pemasangan-kancing',
    title: 'Pemasangan kancing',
    description: 'Kancing dipasang dengan mesin agar lebih cepat dan seragam.',
    width: 540,
    height: 958,
  },
  {
    slug: 'finishing-buang-benang',
    title: 'Finishing: buang benang',
    description: 'Sisa benang dibersihkan satu per satu sebelum disetrika dan dikemas.',
    width: 540,
    height: 958,
  },
];
