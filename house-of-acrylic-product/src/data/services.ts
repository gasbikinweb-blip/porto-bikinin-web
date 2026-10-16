// Layanan utama (kartu bergambar) dan katalog produk akrilik
export type Service = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly image: string;
  readonly alt: string;
};

export type CatalogItem = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly alt: string;
  /** Teks harga; kosongkan bila harga tergantung ukuran */
  readonly priceNote?: string;
};

export const services: readonly Service[] = [
  {
    id: 'cutting-laser',
    title: 'Cutting Laser',
    summary: 'Potong & grafir akrilik, MDF, hingga plat logam dengan presisi tinggi dan tepi rapi.',
    image: '/portfolio/plat-motor/03.webp',
    alt: 'Hasil cutting laser akrilik: plat nomor motor dengan tepi presisi',
  },
  {
    id: 'letter-signage',
    title: 'Letter Signage',
    summary: 'Huruf timbul akrilik dengan lampu LED untuk fasad toko, lobi kantor, dan backdrop.',
    image: '/portfolio/neon-box-2-sisi/02.webp',
    alt: 'Letter signage huruf timbul akrilik Naraya Law & Firm dengan lampu LED',
  },
  {
    id: 'uv-printing',
    title: 'UV Printing',
    summary: 'Cetak full color langsung di akrilik, tajam, tahan gores, dan tidak mudah pudar.',
    image: '/portfolio/polling-box/02.webp',
    alt: 'Polling box akrilik dengan cetak UV full color',
  },
  {
    id: 'neon-box',
    title: 'Jasa Pembuatan Neon Box',
    summary: 'Neon box bulat, kotak, atau custom shape 1–2 sisi dengan LED outdoor yang terang.',
    image: '/portfolio/neon-box-asia-croffle/03.webp',
    alt: 'Neon box signage menyala di outlet Asia Croffle',
  },
];

// TODO: lengkapi harga mulai (priceNote) sesuai price list terbaru
export const catalog: readonly CatalogItem[] = [
  {
    id: 'polling-box',
    name: 'Polling Box Akrilik',
    description: 'Kotak voting/donasi custom sesuai tema acara, bisa kirim ke luar Jawa.',
    image: '/portfolio/polling-box/01.webp',
    alt: 'Polling box akrilik custom untuk acara',
  },
  {
    id: 'kotak-tisu',
    name: 'Kotak Tisu Akrilik',
    description: 'Model sliding bawah, bening & premium. Warna, ukuran, dan model bisa custom.',
    image: '/portfolio/kotak-tisu/03.webp',
    alt: 'Kotak tisu akrilik bening model sliding di meja kerja',
  },
  {
    id: 'papan-nama-kantor',
    name: 'Papan Akrilik Nama Kantor',
    description: 'Alternatif plang yang hemat namun tetap profesional, ukuran & desain bebas.',
    image: '/portfolio/papan-nama-kantor/02.webp',
    alt: 'Papan akrilik nama kantor PT Andalan Daya Abadi terpasang di dinding',
  },
  {
    id: 'kotak-mahar',
    name: 'Kotak Mahar & Seserahan',
    description: 'Box mahar akrilik elegan untuk lamaran dan pernikahan, desain eksklusif.',
    image: '/portfolio/kotak-mahar/02.webp',
    alt: 'Kotak mahar akrilik berisi rangkaian bunga',
  },
  {
    id: 'gantungan-kunci',
    name: 'Gantungan Kunci & Merchandise',
    description: 'Gantungan kunci, lanyard, dan souvenir akrilik untuk event atau brand UMKM.',
    // TODO: ganti dengan foto gantungan kunci asli
    image: '/portfolio/lanyard/01.webp',
    alt: 'Lanyard dan merchandise akrilik custom',
  },
  {
    id: 'welcome-sign',
    name: 'Welcome Sign Akrilik',
    description: 'Papan ucapan untuk wedding, grand opening, dan event dengan pengerjaan cepat.',
    image: '/portfolio/welcome-sign/03.webp',
    alt: 'Welcome sign akrilik grand opening deWave Signature',
  },
];
