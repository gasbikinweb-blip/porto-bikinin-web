// Data katalog. Tambah produk baru cukup dengan menambah objek di array `products`.

export type CategorySlug = 'kursi' | 'sofa' | 'tempat-tidur' | 'lemari-buffet';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul */
  images: readonly [ProductImage, ...ProductImage[]];
  specs: {
    material: string;
    dimensions: string;
    colors: readonly string[];
  };
  /** Harga dalam Rupiah. Kosongkan untuk "Hubungi kami untuk harga" */
  price?: number;
  featured: boolean;
}

export const categories: readonly Category[] = [
  { slug: 'kursi', name: 'Kursi', description: 'Kursi makan, lounge, dan armchair jati.' },
  { slug: 'sofa', name: 'Sofa', description: 'Sofa jati dengan bantalan empuk.' },
  { slug: 'tempat-tidur', name: 'Tempat Tidur', description: 'Ranjang jati kokoh dan hangat.' },
  { slug: 'lemari-buffet', name: 'Lemari & Buffet', description: 'Penyimpanan jati dan rotan.' },
];

// Pembuat daftar gambar: /products/<slug>/01.webp, 02.webp, ...
function gallery(slug: string, alts: readonly [string, ...string[]]) {
  const [first, ...rest] = alts.map((alt, i) => ({
    src: `/products/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt,
  }));
  return [first!, ...rest] as const;
}

const products: readonly Product[] = [
  {
    slug: 'rope-lounge-chair',
    name: 'Rope Lounge Chair',
    category: 'kursi',
    // TODO: ganti deskripsi dengan data asli
    description:
      'Kursi santai berdudukan rendah dengan rangka kayu jati solid dan anyaman tali rotan sintetis. Nyaman untuk ruang keluarga, teras, maupun lobi villa.',
    images: gallery('rope-lounge-chair', [
      'Tiga Rope Lounge Chair berjajar di depan dinding semen',
      'Rope Lounge Chair tampak samping dengan rangka jati',
      'Rope Lounge Chair tampak depan serong',
      'Dua Rope Lounge Chair berdampingan',
      'Detail sandaran anyaman tali Rope Lounge Chair',
      'Detail anyaman dudukan dan sambungan kayu jati',
      'Close-up anyaman tali dengan teks spesifikasi',
    ]),
    specs: {
      material: 'Kayu jati dan rotan sintetis',
      dimensions: 'P 68 cm × L 78 cm, tinggi dudukan 40 cm',
      colors: ['Natural jati', 'Anyaman krem'], // TODO: konfirmasi pilihan warna
    },
    featured: true,
  },
  {
    slug: 'sofa-l-shape-jati',
    name: 'Sofa L-Shape Jati',
    category: 'sofa',
    description:
      'Sofa sudut berbentuk L dengan rangka kayu jati solid dan kain woven fabric cokelat tua. Membuat setiap sudut rumah tampil elegan, fungsional, dan nyaman.',
    images: gallery('sofa-l-shape-jati', [
      'Sampul Sofa L-Shape Wooden Sectional dengan pilihan warna',
      'Close-up dudukan sofa berkain cokelat tua',
      'Detail rangka teak wood dan kain woven fabric',
      'Sofa L-Shape jati di ruang tamu dengan dinding panel kayu',
    ]),
    specs: {
      material: 'Kayu jati solid, kain woven fabric cokelat tua',
      dimensions: 'Sisi utama 300 cm, sisi sudut 180 cm, lebar 85 cm, tinggi dudukan 45 cm',
      colors: ['Abu-abu', 'Biru', 'Hijau tua', 'Cokelat'],
    },
    featured: true,
  },
  {
    slug: 'rattan-buffet-cabinet',
    name: 'Rattan Buffet Cabinet',
    category: 'lemari-buffet',
    description:
      'Buffet jati empat pintu dengan panel anyaman rotan alami. Ruang simpan luas dengan tampilan hangat untuk ruang makan atau ruang tamu.',
    images: gallery('rattan-buffet-cabinet', [
      'Rattan Buffet Cabinet di ruang tamu dengan cermin bulat dan kursi hijau',
      'Rattan Buffet Cabinet di depan dinding bata berdaun rambat',
      'Rattan Buffet Cabinet tampak depan dengan judul produk',
      'Rattan Buffet Cabinet dengan pintu terbuka memperlihatkan rak',
      'Detail pegangan kayu dan anyaman rotan pada pintu',
      'Rattan Buffet Cabinet dengan keterangan spesifikasi',
    ]),
    specs: {
      material: 'Kayu jati, panel anyaman rotan',
      dimensions: 'P 180 cm × L 45 cm × T 80 cm',
      colors: ['Natural jati'], // TODO: konfirmasi pilihan finishing
    },
    featured: true,
  },
  {
    slug: 'hygge-teak-bed',
    name: 'Hygge Teak Bed',
    category: 'tempat-tidur',
    // TODO: ganti deskripsi dan spesifikasi dengan data asli
    description:
      'Ranjang jati bergaya minimalis hangat dengan sandaran kepala melengkung dan rangka rapat yang kokoh untuk kasur.',
    images: gallery('hygge-teak-bed', [
      'Hygge Teak Bed di halaman depan rumah joglo',
      'Hygge Teak Bed dengan judul produk',
      'Sandaran kepala Hygge Teak Bed dari samping',
      'Detail rangka dan sudut kayu jati Hygge Teak Bed',
    ]),
    specs: {
      material: 'Kayu jati solid',
      dimensions: 'Tersedia ukuran 160 × 200 cm dan 180 × 200 cm (bisa custom)', // TODO
      colors: ['Natural jati', 'Walnut impra'], // TODO
    },
    featured: true,
  },
  {
    slug: 'woven-armchair',
    name: 'Woven Armchair',
    category: 'kursi',
    // TODO: ganti deskripsi dan spesifikasi dengan data asli
    description:
      'Armchair jati dengan sandaran lengkung yang memeluk punggung dan dudukan anyaman tali hitam. Cocok untuk meja makan, cafe, dan restoran.',
    images: gallery('woven-armchair', [
      'Woven Armchair di meja makan restoran',
      'Woven Armchair tampak serong di depan dinding semen',
      'Tiga Woven Armchair berjajar dengan judul produk',
    ]),
    specs: {
      material: 'Kayu jati, anyaman tali sintetis',
      dimensions: 'P 55 cm × L 52 cm × T 75 cm', // TODO
      colors: ['Natural jati', 'Anyaman hitam'],
    },
    featured: true,
  },
  {
    slug: 'kursi-makan-jati-sandaran-tinggi',
    name: 'Kursi Makan Jati Sandaran Tinggi',
    category: 'kursi',
    // TODO: ganti nama, deskripsi, dan spesifikasi dengan data asli
    description:
      'Kursi makan klasik dengan sandaran tinggi berjeruji. Dibuat dari jati utuh, kokoh untuk pemakaian harian maupun kebutuhan proyek.',
    images: gallery('kursi-makan-jati-sandaran-tinggi', [
      'Kursi makan jati sandaran tinggi di halaman',
      'Deretan kursi makan jati di depan rumah joglo',
    ]),
    specs: {
      material: 'Kayu jati solid',
      dimensions: 'P 45 cm × L 50 cm × T 105 cm', // TODO
      colors: ['Natural jati'],
    },
    featured: false,
  },
  {
    slug: 'kursi-rotan-lengkung',
    name: 'Kursi Rotan Lengkung',
    category: 'kursi',
    // TODO: ganti nama, deskripsi, dan spesifikasi dengan data asli
    description:
      'Kursi jati dengan sandaran melengkung berpanel rotan. Ringkas, ringan dipandang, dan cocok untuk cafe maupun ruang makan.',
    images: gallery('kursi-rotan-lengkung', ['Dua kursi rotan lengkung berangka jati di taman']),
    specs: {
      material: 'Kayu jati, anyaman rotan',
      dimensions: 'P 55 cm × L 55 cm × T 75 cm', // TODO
      colors: ['Natural jati'],
    },
    featured: false,
  },
  {
    slug: 'kursi-rotan-bantal-krem',
    name: 'Kursi Rotan Bantal Krem',
    category: 'kursi',
    // TODO: ganti nama, deskripsi, dan spesifikasi dengan data asli
    description:
      'Kursi jati bersandaran rotan dengan bantalan dudukan krem yang empuk. Perpaduan modern dan natural untuk ruang makan.',
    images: gallery('kursi-rotan-bantal-krem', ['Kursi rotan dengan bantalan krem di atas rumput']),
    specs: {
      material: 'Kayu jati, rotan, bantalan kain',
      dimensions: 'P 55 cm × L 55 cm × T 78 cm', // TODO
      colors: ['Natural jati', 'Bantalan krem'],
    },
    featured: false,
  },
];

export function getAllProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): readonly Product[] {
  return products.filter((p) => p.featured);
}

/** Kategori yang memiliki minimal satu produk */
export function getCategories(): readonly Category[] {
  return categories.filter((c) => products.some((p) => p.category === c.slug));
}

export function getCategory(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}
