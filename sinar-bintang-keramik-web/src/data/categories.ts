// Kategori produk. Urutan di sini = urutan kartu kategori & chip filter.
export type CategorySlug =
  | 'lantai'
  | 'teras'
  | 'kamar-mandi'
  | 'dinding'
  | 'granit'
  | 'plint-tangga'
  | 'sanitary'
  | 'pintu'
  | 'semen-nat';

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Penjelasan singkat di kartu kategori */
  hint: string;
  /** Produk yang fotonya dipakai di kartu kategori */
  coverId: string;
};

export const categories: readonly Category[] = [
  {
    slug: 'lantai',
    name: 'Keramik Lantai Ruangan',
    hint: '30x30 sampai 50x50, glossy & matt',
    coverId: 'keramik-40x40-fremont',
  },
  {
    slug: 'teras',
    name: 'Keramik Teras & Outdoor',
    hint: 'Permukaan kasar/rustic, tidak licin',
    coverId: 'keramik-teras-40x40-rocky-series',
  },
  {
    slug: 'kamar-mandi',
    name: 'Lantai Kamar Mandi 25x25',
    hint: 'Motif rustic untuk area basah',
    coverId: 'keramik-lantai-kamar-mandi-25x25-roma',
  },
  {
    slug: 'dinding',
    name: 'Keramik Dinding',
    hint: '10x20, 25x40, 25x50, 30x60',
    coverId: 'keramik-dinding-subway-bevel-putih-10x20',
  },
  {
    slug: 'granit',
    name: 'Granit 60x60',
    hint: 'Untuk ruang tamu & area luas',
    coverId: 'granit-lantai-ruangan-60x60-montero',
  },
  {
    slug: 'plint-tangga',
    name: 'Plint & Anak Tangga',
    hint: 'Plint granit, wall plint SPC, step nosing',
    coverId: 'keramik-anak-tangga-30x60-norway-beige-brown',
  },
  {
    slug: 'sanitary',
    name: 'Sanitary',
    hint: 'Kloset, wastafel, bak cuci piring',
    coverId: 'kloset-jongkok-volk',
  },
  {
    slug: 'pintu',
    name: 'Pintu',
    hint: 'Pintu baja & pintu PVC kamar mandi',
    coverId: 'pintu-rumah-baja-kayya-03-88x206',
  },
  {
    slug: 'semen-nat',
    name: 'Semen & Nat',
    hint: 'Semen instan & nat keramik',
    coverId: 'semen-nat-tile-grout-kia-1-kg',
  },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;
