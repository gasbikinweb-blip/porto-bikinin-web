// Portofolio hasil kerja nyata (foto & keterangan dari Instagram @akriliksurabaya)
export const portfolioCategories = [
  'Neon Box',
  'Letter Signage',
  'Signage Kantor',
  'Produk Akrilik',
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioImage = { readonly src: string; readonly alt: string };

export type PortfolioItem = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly category: PortfolioCategory;
  readonly images: readonly PortfolioImage[];
  readonly description: string;
};

// Buat daftar foto 01..n untuk satu folder proyek
const photos = (slug: string, count: number, alt: string): PortfolioImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/portfolio/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt: `${alt} — foto ${i + 1}`,
  }));

// TODO: lengkapi nama klien yang boleh dipublikasikan
export const portfolio: readonly PortfolioItem[] = [
  {
    id: 'p01',
    slug: 'neon-box-asia-croffle',
    title: 'Neon Box Signage Outlet Asia Croffle',
    category: 'Neon Box',
    images: photos('neon-box-asia-croffle', 4, 'Neon box signage outlet Asia Croffle'),
    description: 'Neon box custom akrilik 3 mm premium dengan LED outdoor untuk booth outlet.',
  },
  {
    id: 'p02',
    slug: 'neon-box-2-sisi',
    title: 'Letter Signage Naraya Law & Firm',
    category: 'Letter Signage',
    images: photos('neon-box-2-sisi', 4, 'Signage huruf timbul akrilik Naraya Law & Firm'),
    description: 'Neon box 2 sisi dengan logo akrilik timbul, terang dari dua arah.',
  },
  {
    id: 'p03',
    slug: 'papan-nama-kantor',
    title: 'Papan Akrilik Nama Kantor PT Andalan Daya Abadi',
    category: 'Signage Kantor',
    images: photos('papan-nama-kantor', 4, 'Papan akrilik nama kantor PT Andalan Daya Abadi'),
    description: 'Papan nama akrilik sebagai alternatif plang yang hemat dan tetap profesional.',
  },
  {
    id: 'p04',
    slug: 'sign-ruangan-kantor',
    title: 'Sign Penanda Ruangan Kantor',
    category: 'Signage Kantor',
    images: photos('sign-ruangan-kantor', 3, 'Sign penanda ruangan kantor dari akrilik'),
    description: 'Room sign akrilik dengan cutting laser dan UV printing, 1 produk 1 desain.',
  },
  {
    id: 'p05',
    slug: 'neon-box-baby-happy',
    title: 'Neon Box Baby Happy',
    category: 'Neon Box',
    images: photos('neon-box-baby-happy', 4, 'Neon box custom shape Baby Happy'),
    description: 'Acrylic cutting, stiker UV, dan LED outdoor dalam bentuk custom.',
  },
  {
    id: 'p06',
    slug: 'neonflex-palestina',
    title: 'Neonflex Free Palestine',
    category: 'Neon Box',
    images: photos('neonflex-palestina', 3, 'Neonflex dekorasi Free Palestine'),
    description: 'Neonflex dekoratif dengan backing akrilik bening untuk hiasan ruangan.',
  },
  {
    id: 'p07',
    slug: 'kotak-tisu',
    title: 'Kotak Tisu Akrilik Model Sliding',
    category: 'Produk Akrilik',
    images: photos('kotak-tisu', 5, 'Kotak tisu akrilik bening model sliding'),
    description: 'Bening transparan, model sliding bawah agar isi ulang tisu lebih mudah.',
  },
  {
    id: 'p08',
    slug: 'polling-box',
    title: 'Polling Box Akrilik Custom',
    category: 'Produk Akrilik',
    images: photos('polling-box', 4, 'Polling box akrilik custom'),
    description: 'Kotak polling dengan cetak UV sesuai tema event.',
  },
  {
    id: 'p09',
    slug: 'kotak-mahar',
    title: 'Kotak Mahar & Seserahan',
    category: 'Produk Akrilik',
    images: photos('kotak-mahar', 5, 'Kotak mahar dan seserahan akrilik'),
    description: 'Box mahar akrilik untuk lamaran dan pernikahan.',
  },
  {
    id: 'p10',
    slug: 'replika-botol',
    title: 'Replika Botol Kelaya untuk Display',
    category: 'Produk Akrilik',
    images: photos('replika-botol', 4, 'Replika botol akrilik raksasa untuk display marketing'),
    description: 'Replika produk berukuran besar untuk kebutuhan marketing dan pameran.',
  },
  {
    id: 'p11',
    slug: 'welcome-sign',
    title: 'Welcome Sign Grand Opening deWave',
    category: 'Signage Kantor',
    images: photos('welcome-sign', 3, 'Welcome sign akrilik grand opening deWave Signature'),
    description: 'Papan ucapan akrilik dengan finishing eksklusif dan pengerjaan cepat.',
  },
  {
    id: 'p12',
    slug: 'kotak-serbaguna',
    title: 'Kotak Serbaguna Akrilik Neon',
    category: 'Produk Akrilik',
    images: photos('kotak-serbaguna', 4, 'Kotak serbaguna akrilik neon kuning dan oranye'),
    description: 'Organizer akrilik neon 3 mm untuk make up, skincare, dan alat tulis.',
  },
  {
    id: 'p13',
    slug: 'plat-motor',
    title: 'Plat Motor Akrilik',
    category: 'Produk Akrilik',
    images: photos('plat-motor', 3, 'Plat nomor motor akrilik'),
    description: 'Plat motor akrilik kokoh agar tidak mudah lepas, tampilan lebih clean.',
  },
  {
    id: 'p14',
    slug: 'flower-carrier',
    title: 'Acrylic Flower Carrier',
    category: 'Produk Akrilik',
    images: photos('flower-carrier', 2, 'Tas akrilik pembawa buket bunga'),
    description: 'Tas akrilik minimalis untuk buket bunga dan kado wisuda.',
  },
];

export type Spec = { readonly label: string; readonly value: string };

// Spesifikasi untuk modal detail (diambil dari caption Instagram)
// TODO: verifikasi ukuran & bahan setiap proyek
export const portfolioSpecs: Readonly<Record<string, readonly Spec[]>> = {
  'neon-box-asia-croffle': [
    { label: 'Bahan', value: 'Akrilik 3 mm premium, LED outdoor' },
    { label: 'Cocok untuk', value: 'Booth, outlet, kafe' },
    { label: 'Finishing', value: 'Custom shape mengikuti logo' },
  ],
  'neon-box-2-sisi': [
    { label: 'Bahan', value: 'Akrilik, huruf timbul, LED' },
    { label: 'Model', value: 'Neon box 2 sisi' },
    { label: 'Cocok untuk', value: 'Kantor, kafe/restoran, salon/barbershop' },
  ],
  'papan-nama-kantor': [
    { label: 'Bahan', value: 'Akrilik + cetak UV' },
    { label: 'Ukuran', value: 'Bebas, sesuai kebutuhan' },
    { label: 'Cocok untuk', value: 'Kantor, ruko, instansi' },
  ],
  'sign-ruangan-kantor': [
    { label: 'Bahan', value: '100% akrilik baru, bukan daur ulang' },
    { label: 'Proses', value: 'Cutting laser + UV printing' },
    { label: 'Desain', value: 'Eksklusif, 1 produk 1 desain' },
  ],
  'neon-box-baby-happy': [
    { label: 'Bahan', value: 'Acrylic cutting, stiker UV, LED outdoor' },
    { label: 'Model', value: 'Custom shape' },
    { label: 'Cocok untuk', value: 'Toko, playground, event' },
  ],
  'neonflex-palestina': [
    { label: 'Bahan', value: 'Neonflex + backing akrilik bening' },
    { label: 'Cocok untuk', value: 'Dekorasi kamar, kafe, event' },
    { label: 'Desain', value: 'Bisa custom tulisan & logo' },
  ],
  'kotak-tisu': [
    { label: 'Bahan', value: 'Akrilik bening' },
    { label: 'Model', value: 'Sliding bawah, mudah isi ulang' },
    { label: 'Custom', value: 'Warna, ukuran, model, logo' },
  ],
  'polling-box': [
    { label: 'Bahan', value: 'Akrilik + cetak UV full color' },
    { label: 'Model', value: 'Engsel besi, depan & belakang' },
    { label: 'Pengiriman', value: 'Bisa kirim ke luar pulau Jawa' },
  ],
  'kotak-mahar': [
    { label: 'Bahan', value: 'Akrilik bening premium' },
    { label: 'Cocok untuk', value: 'Mahar, seserahan, hampers' },
    { label: 'Custom', value: 'Ukuran, nama, dan tanggal' },
  ],
  'replika-botol': [
    { label: 'Bahan', value: 'Akrilik + cetak UV' },
    { label: 'Ukuran', value: 'Skala besar sesuai permintaan' },
    { label: 'Cocok untuk', value: 'Display marketing, pameran' },
  ],
  'welcome-sign': [
    { label: 'Bahan', value: 'Akrilik eksklusif' },
    { label: 'Cocok untuk', value: 'Wedding, grand opening, event' },
    { label: 'Pengerjaan', value: 'Cepat, bisa kejar tanggal acara' },
  ],
  'kotak-serbaguna': [
    { label: 'Bahan', value: 'Akrilik neon 3 mm' },
    { label: 'Model', value: '1 slot, full lem (bukan knock-down)' },
    { label: 'Cocok untuk', value: 'Make up, skincare, alat tulis' },
  ],
  'plat-motor': [
    { label: 'Bahan', value: 'Akrilik 3 mm bening & putih' },
    { label: 'Keunggulan', value: 'Kokoh, tidak mudah lepas' },
    { label: 'Tampilan', value: 'Clean dan aesthetic' },
  ],
  'flower-carrier': [
    { label: 'Bahan', value: 'Akrilik bening' },
    { label: 'Cocok untuk', value: 'Buket bunga, kado wisuda' },
    { label: 'Desain', value: 'Minimalis dengan handle' },
  ],
};
