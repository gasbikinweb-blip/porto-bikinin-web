export const categorySlugs = [
  'kitchen-set',
  'lemari-wardrobe',
  'tv-panel-backdrop',
  'meja-belajar',
  'meja-kasir-resepsionis',
  'partisi',
  'rak-kabinet',
  'interior-ruangan',
  'lainnya',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export const categories: readonly Category[] = [
  {
    slug: 'kitchen-set',
    name: 'Kitchen Set',
    description: 'Kitchen set minimalis atas-bawah, dibuat sesuai ukuran dapur Anda.',
  },
  {
    slug: 'lemari-wardrobe',
    name: 'Lemari & Wardrobe',
    description: 'Lemari pakaian, wardrobe walk-in, dan lemari full plafon.',
  },
  {
    slug: 'tv-panel-backdrop',
    name: 'TV Panel & Backdrop',
    description: 'Backdrop TV dan wall panel dengan rak dan lampu LED.',
  },
  {
    slug: 'meja-belajar',
    name: 'Meja Belajar',
    description: 'Meja belajar anak dan dewasa dengan rak serta laci.',
  },
  {
    slug: 'meja-kasir-resepsionis',
    name: 'Meja Kasir & Resepsionis',
    description: 'Meja kasir dan resepsionis untuk toko, kantor, dan klinik.',
  },
  {
    slug: 'partisi',
    name: 'Partisi',
    description: 'Partisi pembatas ruangan yang fungsional dan rapi.',
  },
  {
    slug: 'rak-kabinet',
    name: 'Rak & Kabinet',
    description: 'Meja TV, credenza, kabinet laci, dan rak penyimpanan.',
  },
  {
    slug: 'interior-ruangan',
    name: 'Interior Ruangan',
    description: 'Pengerjaan interior satu ruangan: kamar, ruang tamu, ruang usaha.',
  },
  {
    slug: 'lainnya',
    name: 'Lainnya',
    description: 'Meja rias, bangku taman, ranjang, dan furnitur custom lainnya.',
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
