// Data karya Nadira Furniture. Tambah karya baru cukup dengan menambah objek di array `products`.
// Sumber: foto & caption Instagram @nadira.furniture (2021 - 2025). Foto di public/projects/<slug>/.

export type CategorySlug =
  'kitchen-set' | 'lemari' | 'backdrop-tv' | 'meja-rias' | 'kamar-set' | 'partisi' | 'rak-custom';

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
  /** Tahun pengerjaan (dari tanggal posting Instagram) */
  year: number;
  description: string;
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul */
  images: readonly [ProductImage, ...ProductImage[]];
  specs: {
    material: string;
    dimensions: string;
    colors: readonly string[];
  };
  /** Harga dalam Rupiah. Kosongkan untuk "harga sesuai ukuran" */
  price?: number;
  featured: boolean;
}

// Kategori mengikuti layanan di caption Instagram @nadira.furniture
export const categories: readonly Category[] = [
  {
    slug: 'kitchen-set',
    name: 'Kitchen Set',
    description: 'Kitchen set, minibar, dan island sesuai ukuran dapur.',
  },
  {
    slug: 'lemari',
    name: 'Lemari',
    description: 'Lemari pakaian, lemari kaca, dan walk-in closet.',
  },
  {
    slug: 'backdrop-tv',
    name: 'Backdrop TV',
    description: 'Backdrop TV dan lemari display ruang keluarga.',
  },
  { slug: 'meja-rias', name: 'Meja Rias', description: 'Meja rias dengan cermin dan lampu.' },
  { slug: 'kamar-set', name: 'Kamar Set', description: 'Dipan, headboard, dan lemari serasi.' },
  { slug: 'partisi', name: 'Partisi', description: 'Partisi kisi dan pembatas ruang.' },
  {
    slug: 'rak-custom',
    name: 'Rak & Custom',
    description: 'Lemari bawah tangga, rak sepatu, dan meja kerja.',
  },
];

// Bahan standar sesuai caption Instagram
const MATERIAL = {
  material: 'Multiplek 18 mm, finishing HPL original TACO',
  dimensions: 'Custom sesuai ukuran ruang',
  colors: ['Warna & motif HPL bebas pilih'],
} as const;

// Pembuat daftar gambar: /projects/<slug>/01.webp, 02.webp, ...
export function gallery(slug: string, alts: readonly [string, ...string[]]) {
  const [first, ...rest] = alts.map((alt, i) => ({
    src: `/projects/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt,
  }));
  return [first!, ...rest] as const;
}

// Urut dari karya terbaru
const products: readonly Product[] = [
  {
    slug: 'backdrop-tv-lengkung-led',
    name: 'Backdrop TV Lengkung LED',
    category: 'backdrop-tv',
    year: 2025,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-lengkung-led', ["Backdrop TV Lengkung LED buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: true,
  },
  {
    slug: 'kitchen-set-island-modern',
    name: 'Kitchen Set Island Modern',
    category: 'kitchen-set',
    year: 2024,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-island-modern', ["Kitchen Set Island Modern buatan Nadira Furniture", "Kitchen Set Island Modern, foto 2", "Kitchen Set Island Modern, foto 3", "Kitchen Set Island Modern, foto 4", "Kitchen Set Island Modern, foto 5"]),
    specs: MATERIAL,
    featured: true,
  },
  {
    slug: 'kitchen-set-minibar-kisi',
    name: 'Kitchen Set & Minibar Kisi',
    category: 'kitchen-set',
    year: 2024,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-minibar-kisi', ["Kitchen Set & Minibar Kisi buatan Nadira Furniture", "Kitchen Set & Minibar Kisi, foto 2", "Kitchen Set & Minibar Kisi, foto 3", "Kitchen Set & Minibar Kisi, foto 4", "Kitchen Set & Minibar Kisi, foto 5", "Kitchen Set & Minibar Kisi, foto 6"]),
    specs: MATERIAL,
    featured: true,
  },
  {
    slug: 'lemari-kaca-walk-in',
    name: 'Lemari Kaca Walk-in',
    category: 'lemari',
    year: 2024,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-kaca-walk-in', ["Lemari Kaca Walk-in buatan Nadira Furniture", "Lemari Kaca Walk-in, foto 2", "Lemari Kaca Walk-in, foto 3", "Lemari Kaca Walk-in, foto 4"]),
    specs: MATERIAL,
    featured: true,
  },
  {
    slug: 'lemari-putih-display-arch',
    name: 'Lemari Putih Display Lengkung',
    category: 'lemari',
    year: 2023,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-putih-display-arch', ["Lemari Putih Display Lengkung buatan Nadira Furniture", "Lemari Putih Display Lengkung, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-kayu-l',
    name: 'Kitchen Set Kayu Bentuk L',
    category: 'kitchen-set',
    year: 2023,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-kayu-l', ["Kitchen Set Kayu Bentuk L buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-marmer',
    name: 'Kitchen Set Abu Marmer',
    category: 'kitchen-set',
    year: 2023,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-marmer', ["Kitchen Set Abu Marmer buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-kayu-kaca-display',
    name: 'Backdrop TV & Lemari Display',
    category: 'backdrop-tv',
    year: 2023,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-kayu-kaca-display', ["Backdrop TV & Lemari Display buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-motif-marmer',
    name: 'Lemari Motif Marmer',
    category: 'lemari',
    year: 2023,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-motif-marmer', ["Lemari Motif Marmer buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-industrial',
    name: 'Kitchen Set Industrial',
    category: 'kitchen-set',
    year: 2023,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-industrial', ["Kitchen Set Industrial buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'partisi-kisi-kayu',
    name: 'Partisi Kisi Kayu',
    category: 'partisi',
    year: 2023,
    description:
      'Partisi custom untuk membagi ruang tanpa membuatnya sempit, bisa dipadukan dengan rak display atau backdrop TV.',
    images: gallery('partisi-kisi-kayu', ["Partisi Kisi Kayu buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-subway',
    name: 'Kitchen Set Abu Keramik Subway',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-subway', ["Kitchen Set Abu Keramik Subway buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-marmer',
    name: 'Kitchen Set Putih Backsplash Marmer',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-marmer', ["Kitchen Set Putih Backsplash Marmer buatan Nadira Furniture", "Kitchen Set Putih Backsplash Marmer, foto 2", "Kitchen Set Putih Backsplash Marmer, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-klasik-putih',
    name: 'Kitchen Set Klasik Putih',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-klasik-putih', ["Kitchen Set Klasik Putih buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-klasik-kaca',
    name: 'Lemari Klasik Pintu Kaca',
    category: 'lemari',
    year: 2022,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-klasik-kaca', ["Lemari Klasik Pintu Kaca buatan Nadira Furniture", "Lemari Klasik Pintu Kaca, foto 2", "Lemari Klasik Pintu Kaca, foto 3", "Lemari Klasik Pintu Kaca, foto 4"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-kayu-island',
    name: 'Kitchen Set Kayu dengan Island',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-kayu-island', ["Kitchen Set Kayu dengan Island buatan Nadira Furniture", "Kitchen Set Kayu dengan Island, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-cermin-cokelat',
    name: 'Lemari Cermin Cokelat',
    category: 'lemari',
    year: 2022,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-cermin-cokelat', ["Lemari Cermin Cokelat buatan Nadira Furniture", "Lemari Cermin Cokelat, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kamar-set-kayu-led',
    name: 'Kamar Set Kayu LED',
    category: 'kamar-set',
    year: 2022,
    description:
      'Kamar set custom: dipan, headboard, lemari, dan meja dibuat serasi dalam satu desain sesuai ukuran kamar.',
    images: gallery('kamar-set-kayu-led', ["Kamar Set Kayu LED buatan Nadira Furniture", "Kamar Set Kayu LED, foto 2", "Kamar Set Kayu LED, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'partisi-kisi-backdrop-tv',
    name: 'Partisi Kisi & Backdrop TV',
    category: 'partisi',
    year: 2022,
    description:
      'Partisi custom untuk membagi ruang tanpa membuatnya sempit, bisa dipadukan dengan rak display atau backdrop TV.',
    images: gallery('partisi-kisi-backdrop-tv', ["Partisi Kisi & Backdrop TV buatan Nadira Furniture", "Partisi Kisi & Backdrop TV, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-hitam-minibar',
    name: 'Kitchen Set Hitam dengan Minibar',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-hitam-minibar', ["Kitchen Set Hitam dengan Minibar buatan Nadira Furniture", "Kitchen Set Hitam dengan Minibar, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-hitam-motif',
    name: 'Kitchen Set Hitam Backsplash Motif',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-hitam-motif', ["Kitchen Set Hitam Backsplash Motif buatan Nadira Furniture", "Kitchen Set Hitam Backsplash Motif, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-bawah-tangga-hitam',
    name: 'Lemari Bawah Tangga Hitam',
    category: 'rak-custom',
    year: 2022,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('lemari-bawah-tangga-hitam', ["Lemari Bawah Tangga Hitam buatan Nadira Furniture", "Lemari Bawah Tangga Hitam, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-kayu-natural',
    name: 'Kitchen Set Kayu Natural',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-kayu-natural', ["Kitchen Set Kayu Natural buatan Nadira Furniture", "Kitchen Set Kayu Natural, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-marmer-l',
    name: 'Kitchen Set Abu Marmer L',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-marmer-l', ["Kitchen Set Abu Marmer L buatan Nadira Furniture", "Kitchen Set Abu Marmer L, foto 2", "Kitchen Set Abu Marmer L, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'partisi-kisi-ruang-tamu',
    name: 'Partisi Kisi Ruang Tamu',
    category: 'partisi',
    year: 2022,
    description:
      'Partisi custom untuk membagi ruang tanpa membuatnya sempit, bisa dipadukan dengan rak display atau backdrop TV.',
    images: gallery('partisi-kisi-ruang-tamu', ["Partisi Kisi Ruang Tamu buatan Nadira Furniture", "Partisi Kisi Ruang Tamu, foto 2", "Partisi Kisi Ruang Tamu, foto 3"]),
    specs: MATERIAL,
    featured: true,
  },
  {
    slug: 'kitchen-set-putih-led-hangat',
    name: 'Kitchen Set Putih LED Hangat',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-led-hangat', ["Kitchen Set Putih LED Hangat buatan Nadira Furniture", "Kitchen Set Putih LED Hangat, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-kayu-marmer',
    name: 'Kitchen Set Kayu Top Marmer',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-kayu-marmer', ["Kitchen Set Kayu Top Marmer buatan Nadira Furniture", "Kitchen Set Kayu Top Marmer, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-glossy-minibar',
    name: 'Kitchen Set Putih Glossy & Minibar',
    category: 'kitchen-set',
    year: 2022,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-glossy-minibar', ["Kitchen Set Putih Glossy & Minibar buatan Nadira Furniture", "Kitchen Set Putih Glossy & Minibar, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-hitam-doff',
    name: 'Kitchen Set Hitam Doff',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-hitam-doff', ["Kitchen Set Hitam Doff buatan Nadira Furniture", "Kitchen Set Hitam Doff, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'meja-kerja-rak-besi',
    name: 'Meja Kerja Rak Besi',
    category: 'rak-custom',
    year: 2021,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('meja-kerja-rak-besi', ["Meja Kerja Rak Besi buatan Nadira Furniture", "Meja Kerja Rak Besi, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-meja-rias',
    name: 'Backdrop TV & Meja Rias',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-meja-rias', ["Backdrop TV & Meja Rias buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-panel-kayu',
    name: 'Backdrop TV Panel Kayu',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-panel-kayu', ["Backdrop TV Panel Kayu buatan Nadira Furniture", "Backdrop TV Panel Kayu, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-marmer-led',
    name: 'Backdrop TV Marmer LED',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-marmer-led', ["Backdrop TV Marmer LED buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-mungil',
    name: 'Kitchen Set Abu Dapur Mungil',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-mungil', ["Kitchen Set Abu Dapur Mungil buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kamar-set-backdrop-tv',
    name: 'Kamar Set & Backdrop TV',
    category: 'kamar-set',
    year: 2021,
    description:
      'Kamar set custom: dipan, headboard, lemari, dan meja dibuat serasi dalam satu desain sesuai ukuran kamar.',
    images: gallery('kamar-set-backdrop-tv', ["Kamar Set & Backdrop TV buatan Nadira Furniture", "Kamar Set & Backdrop TV, foto 2", "Kamar Set & Backdrop TV, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-gelap',
    name: 'Kitchen Set Abu Gelap',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-gelap', ["Kitchen Set Abu Gelap buatan Nadira Furniture", "Kitchen Set Abu Gelap, foto 2", "Kitchen Set Abu Gelap, foto 3", "Kitchen Set Abu Gelap, foto 4", "Kitchen Set Abu Gelap, foto 5"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-kayu-led',
    name: 'Kitchen Set Abu Kayu LED',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-kayu-led', ["Kitchen Set Abu Kayu LED buatan Nadira Furniture", "Kitchen Set Abu Kayu LED, foto 2", "Kitchen Set Abu Kayu LED, foto 3", "Kitchen Set Abu Kayu LED, foto 4"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-navy-gold',
    name: 'Kitchen Set Navy Handle Gold',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-navy-gold', ["Kitchen Set Navy Handle Gold buatan Nadira Furniture", "Kitchen Set Navy Handle Gold, foto 2", "Kitchen Set Navy Handle Gold, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-led-putih',
    name: 'Kitchen Set Putih Lampu LED',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-led-putih', ["Kitchen Set Putih Lampu LED buatan Nadira Furniture", "Kitchen Set Putih Lampu LED, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-l',
    name: 'Kitchen Set Putih Bentuk L',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-l', ["Kitchen Set Putih Bentuk L buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'partisi-backdrop-tv-putih',
    name: 'Partisi & Backdrop TV Putih',
    category: 'partisi',
    year: 2021,
    description:
      'Partisi custom untuk membagi ruang tanpa membuatnya sempit, bisa dipadukan dengan rak display atau backdrop TV.',
    images: gallery('partisi-backdrop-tv-putih', ["Partisi & Backdrop TV Putih buatan Nadira Furniture", "Partisi & Backdrop TV Putih, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'meja-rias-display-tas',
    name: 'Meja Rias & Display Tas',
    category: 'meja-rias',
    year: 2021,
    description:
      'Meja rias custom dengan banyak laci dan cermin, pas untuk kamar maupun kebutuhan MUA. Ukuran dan warna menyesuaikan ruangan.',
    images: gallery('meja-rias-display-tas', ["Meja Rias & Display Tas buatan Nadira Furniture", "Meja Rias & Display Tas, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-display-cokelat',
    name: 'Lemari Display Cokelat Putih',
    category: 'lemari',
    year: 2021,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-display-cokelat', ["Lemari Display Cokelat Putih buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'rak-sepatu-kaca',
    name: 'Rak Sepatu Pintu Kaca',
    category: 'rak-custom',
    year: 2021,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('rak-sepatu-kaca', ["Rak Sepatu Pintu Kaca buatan Nadira Furniture", "Rak Sepatu Pintu Kaca, foto 2", "Rak Sepatu Pintu Kaca, foto 3", "Rak Sepatu Pintu Kaca, foto 4", "Rak Sepatu Pintu Kaca, foto 5"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-island-kulkas',
    name: 'Kitchen Set dengan Island',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-island-kulkas', ["Kitchen Set dengan Island buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-u-hitam',
    name: 'Kitchen Set U Hitam',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-u-hitam', ["Kitchen Set U Hitam buatan Nadira Furniture", "Kitchen Set U Hitam, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-island-putih',
    name: 'Kitchen Set Island Putih',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-island-putih', ["Kitchen Set Island Putih buatan Nadira Furniture", "Kitchen Set Island Putih, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-cermin-led',
    name: 'Backdrop TV Cermin LED',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-cermin-led', ["Backdrop TV Cermin LED buatan Nadira Furniture", "Backdrop TV Cermin LED, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-kayu-hangat',
    name: 'Backdrop TV Kayu Hangat',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-kayu-hangat', ["Backdrop TV Kayu Hangat buatan Nadira Furniture", "Backdrop TV Kayu Hangat, foto 2", "Backdrop TV Kayu Hangat, foto 3", "Backdrop TV Kayu Hangat, foto 4"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'rak-buku-terbuka',
    name: 'Rak Buku & TV Terbuka',
    category: 'rak-custom',
    year: 2021,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('rak-buku-terbuka', ["Rak Buku & TV Terbuka buatan Nadira Furniture", "Rak Buku & TV Terbuka, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-krem-minibar',
    name: 'Kitchen Set Krem dengan Minibar',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-krem-minibar', ["Kitchen Set Krem dengan Minibar buatan Nadira Furniture", "Kitchen Set Krem dengan Minibar, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-pakaian-putih-glossy',
    name: 'Lemari Pakaian Putih Glossy',
    category: 'lemari',
    year: 2021,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-pakaian-putih-glossy', ["Lemari Pakaian Putih Glossy buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-cokelat-kaca',
    name: 'Kitchen Set Cokelat Pintu Kaca',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-cokelat-kaca', ["Kitchen Set Cokelat Pintu Kaca buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'backdrop-tv-kayu-kaca',
    name: 'Backdrop TV Kayu & Kaca',
    category: 'backdrop-tv',
    year: 2021,
    description:
      'Backdrop TV custom yang merapikan kabel dan perangkat, dilengkapi rak display dan pencahayaan agar ruang keluarga terasa lebih hidup.',
    images: gallery('backdrop-tv-kayu-kaca', ["Backdrop TV Kayu & Kaca buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'rak-bawah-tangga',
    name: 'Rak & Lemari Bawah Tangga',
    category: 'rak-custom',
    year: 2021,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('rak-bawah-tangga', ["Rak & Lemari Bawah Tangga buatan Nadira Furniture", "Rak & Lemari Bawah Tangga, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-krem',
    name: 'Kitchen Set Putih Krem',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-krem', ["Kitchen Set Putih Krem buatan Nadira Furniture", "Kitchen Set Putih Krem, foto 2", "Kitchen Set Putih Krem, foto 3", "Kitchen Set Putih Krem, foto 4"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-bawah-tangga-krem',
    name: 'Lemari Bawah Tangga Krem',
    category: 'rak-custom',
    year: 2021,
    description:
      'Furnitur custom untuk sudut yang sulit, dari kolong tangga, rak sepatu, sampai meja kerja. Setiap sentimeter dimanfaatkan.',
    images: gallery('lemari-bawah-tangga-krem', ["Lemari Bawah Tangga Krem buatan Nadira Furniture", "Lemari Bawah Tangga Krem, foto 2", "Lemari Bawah Tangga Krem, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-cokelat-l',
    name: 'Kitchen Set Cokelat Bentuk L',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-cokelat-l', ["Kitchen Set Cokelat Bentuk L buatan Nadira Furniture", "Kitchen Set Cokelat Bentuk L, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-lavender',
    name: 'Kitchen Set Lavender',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-lavender', ["Kitchen Set Lavender buatan Nadira Furniture", "Kitchen Set Lavender, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-minibar',
    name: 'Kitchen Set Putih dengan Minibar',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-minibar', ["Kitchen Set Putih dengan Minibar buatan Nadira Furniture", "Kitchen Set Putih dengan Minibar, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-cermin-kayu',
    name: 'Lemari Cermin Motif Kayu',
    category: 'lemari',
    year: 2021,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-cermin-kayu', ["Lemari Cermin Motif Kayu buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-backsplash-mozaik',
    name: 'Kitchen Set Backsplash Mozaik',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-backsplash-mozaik', ["Kitchen Set Backsplash Mozaik buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-putih-top-hitam',
    name: 'Kitchen Set Putih Top Hitam',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-putih-top-hitam', ["Kitchen Set Putih Top Hitam buatan Nadira Furniture", "Kitchen Set Putih Top Hitam, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kitchen-set-abu-minibar',
    name: 'Kitchen Set Abu dengan Minibar',
    category: 'kitchen-set',
    year: 2021,
    description:
      'Kitchen set custom dibuat sesuai ukuran dapur: kabinet atas & bawah rapi, banyak ruang simpan, dan finishing HPL yang mudah dibersihkan.',
    images: gallery('kitchen-set-abu-minibar', ["Kitchen Set Abu dengan Minibar buatan Nadira Furniture", "Kitchen Set Abu dengan Minibar, foto 2", "Kitchen Set Abu dengan Minibar, foto 3"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'lemari-sliding-cermin',
    name: 'Lemari Sliding Cermin',
    category: 'lemari',
    year: 2021,
    description:
      'Lemari custom setinggi plafon dengan pembagian rak, gantungan, dan laci sesuai kebutuhan. Model, warna, dan ukuran bebas request.',
    images: gallery('lemari-sliding-cermin', ["Lemari Sliding Cermin buatan Nadira Furniture", "Lemari Sliding Cermin, foto 2"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'meja-rias-putih-laci',
    name: 'Meja Rias Putih 8 Laci',
    category: 'meja-rias',
    year: 2021,
    description:
      'Meja rias custom dengan banyak laci dan cermin, pas untuk kamar maupun kebutuhan MUA. Ukuran dan warna menyesuaikan ruangan.',
    images: gallery('meja-rias-putih-laci', ["Meja Rias Putih 8 Laci buatan Nadira Furniture"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'kamar-set-headboard-led',
    name: 'Kamar Set Headboard LED',
    category: 'kamar-set',
    year: 2021,
    description:
      'Kamar set custom: dipan, headboard, lemari, dan meja dibuat serasi dalam satu desain sesuai ukuran kamar.',
    images: gallery('kamar-set-headboard-led', ["Kamar Set Headboard LED buatan Nadira Furniture", "Kamar Set Headboard LED, foto 2", "Kamar Set Headboard LED, foto 3", "Kamar Set Headboard LED, foto 4"]),
    specs: MATERIAL,
    featured: false,
  },
  {
    slug: 'meja-rias-hollywood',
    name: 'Meja Rias Lampu Hollywood',
    category: 'meja-rias',
    year: 2021,
    description:
      'Meja rias custom dengan banyak laci dan cermin, pas untuk kamar maupun kebutuhan MUA. Ukuran dan warna menyesuaikan ruangan.',
    images: gallery('meja-rias-hollywood', ["Meja Rias Lampu Hollywood buatan Nadira Furniture", "Meja Rias Lampu Hollywood, foto 2", "Meja Rias Lampu Hollywood, foto 3"]),
    specs: MATERIAL,
    featured: true,
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
