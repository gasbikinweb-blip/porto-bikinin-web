// Data katalog. Tambah produk baru cukup dengan menambah objek di array `products`.
// Nama produk, warna, dan detail diambil dari caption Instagram @sahane.id.
// TODO: verifikasi semua harga, bahan, dan ukuran dengan spesifikasi produk asli.

export type CategorySlug = 'abaya' | 'dress' | 'atasan' | 'aksesoris';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Gambar kartu kategori di beranda */
  image: ImageAsset;
}

/** 'foto' = foto produk asli; 'ilustrasi' = gambar pengganti (wajib diberi label "Ilustrasi") */
export type ImageKind = 'foto' | 'ilustrasi';

export interface ImageAsset {
  src: string;
  alt: string;
  kind?: ImageKind;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'All Size';

/** Status pemesanan yang tampil sebagai label di kartu produk */
export type ProductStatus = 'pre-order' | 'ready' | 'segera';

export interface SizeChartRow {
  size: Size;
  /** Lingkar dada (cm) */
  chest: string;
  /** Panjang badan (cm) */
  length: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Harga dalam Rupiah. Kosongkan untuk "Harga via WhatsApp" */
  price?: number;
  material: string;
  colors: readonly string[];
  sizes: readonly Size[];
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul (rasio 4:5) */
  images: readonly [ImageAsset, ...ImageAsset[]];
  description: string;
  /** Detail cutting & finishing */
  details: readonly string[];
  sizeChart: readonly SizeChartRow[];
  status: ProductStatus;
  featured: boolean;
}

export const statusLabel: Record<ProductStatus, string> = {
  'pre-order': 'Pre-Order',
  ready: 'Ready Stock',
  segera: 'Segera Hadir',
};

export const categories: readonly Category[] = [
  {
    slug: 'abaya',
    name: 'Abaya',
    description: 'Abaya syar’i dengan cutting lapang dan detail bordir khas Sahane.',
    image: {
      src: '/products/nehir-abaya-baby-salem/01.webp',
      alt: 'Model duduk di bebatuan mengenakan Nehir Abaya warna baby salem dengan khimar cokelat tua',
    },
  },
  {
    slug: 'dress',
    name: 'Dress',
    description: 'Dress muslimah untuk acara santai hingga semi formal.',
    // TODO: ganti dengan foto koleksi dress asli
    image: {
      src: '/lookbook/almazyya-03.webp',
      alt: 'Ilustrasi gaya busana muslimah lembut dengan nuansa krem dan abu-abu',
      kind: 'ilustrasi',
    },
  },
  {
    slug: 'atasan',
    name: 'Atasan',
    description: 'Atasan dan tunik yang mudah dipadupadankan.',
    // TODO: ganti dengan foto koleksi atasan asli
    image: {
      src: '/lookbook/detail-bordir.webp',
      alt: 'Ilustrasi detail bordir bunga pada kain linen warna pastel',
      kind: 'ilustrasi',
    },
  },
  {
    slug: 'aksesoris',
    name: 'Aksesoris & Hijab',
    description: 'Khimar dan pelengkap yang serasi dengan koleksi abaya.',
    image: {
      src: '/products/nareen-khimar/01.webp',
      alt: 'Model dari belakang mengenakan Nareen Khiban warna biru langit yang menjuntai panjang',
    },
  },
];

// TODO: verifikasi ukuran dengan pola asli. Angka di bawah hanya contoh agar tabel tampil.
const abayaSizeChart: readonly SizeChartRow[] = [
  { size: 'S', chest: '100', length: '135' },
  { size: 'M', chest: '106', length: '138' },
  { size: 'L', chest: '112', length: '140' },
  { size: 'XL', chest: '118', length: '142' },
];

const ABAYA_SIZES: readonly Size[] = ['S', 'M', 'L', 'XL'];

// Pembuat daftar gambar: /products/<slug>/01.webp, 02.webp, ...
function gallery(slug: string, alts: readonly [string, ...string[]]) {
  const [first, ...rest] = alts.map((alt, i) => ({
    src: `/products/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt,
  }));
  return [first!, ...rest] as const;
}

// Detail Nehir dari caption IG (resleting depan, kantong kanan-kiri)
const nehirDetails = [
  'Resleting di bagian depan, nyaman untuk busui',
  'Kantong di sisi kanan dan kiri',
  'Bordir bunga di lengan dan bagian depan',
  'Cutting A-line lapang, tidak membentuk badan',
  // TODO: verifikasi dengan spesifikasi produk asli (jenis lengan, manset)
  'Lengan lebar dengan potongan rapi',
] as const;

const products: readonly Product[] = [
  {
    id: 'SH-NHR-YLW',
    slug: 'nehir-abaya-baby-yellow',
    name: 'Nehir Abaya – Baby Yellow',
    category: 'abaya',
    price: 299000, // TODO: verifikasi harga (caption IG: promo launching 289k, normal 299k)
    material: 'Linen premium', // TODO: verifikasi dengan spesifikasi produk asli
    colors: ['Baby Yellow (bordir biru)'],
    sizes: ABAYA_SIZES,
    images: gallery('nehir-abaya-baby-yellow', [
      'Model mengenakan Nehir Abaya warna baby yellow dengan bordir bunga biru di kafe',
      'Detail bagian depan Nehir Abaya baby yellow dengan kantong dan bordir',
      'Close-up bordir bunga biru pada lengan Nehir Abaya baby yellow',
      'Nehir Abaya baby yellow, baby salem, dan jetblack tergantung berjajar',
    ]),
    description:
      'Warna kuning lembut yang hangat dipadu bordir bunga biru. Nehir Abaya dirancang lapang dan ringan untuk dipakai seharian, dari kajian hingga jalan-jalan.',
    details: nehirDetails,
    sizeChart: abayaSizeChart,
    status: 'pre-order',
    featured: true,
  },
  {
    id: 'SH-NHR-SLM',
    slug: 'nehir-abaya-baby-salem',
    name: 'Nehir Abaya – Baby Salem',
    category: 'abaya',
    price: 299000, // TODO: verifikasi harga (caption IG 21-09-2026: Rp 299.000)
    material: 'Linen premium', // TODO: verifikasi dengan spesifikasi produk asli
    colors: ['Baby Salem (bordir cokelat tua)'],
    sizes: ABAYA_SIZES,
    images: gallery('nehir-abaya-baby-salem', [
      'Model duduk di bebatuan mengenakan Nehir Abaya warna baby salem dengan khimar cokelat tua',
      'Nehir Abaya baby salem dan baby yellow terlipat rapi dengan detail bordir',
      'Close-up bordir cokelat pada bagian depan Nehir Abaya baby salem',
      'Detail bordir bunga pada lengan Nehir Abaya baby salem',
    ]),
    description:
      'Soft tones, effortless elegance. Warna salem pucat yang manis dengan bordir cokelat tua yang rapi, memberi kesan lembut dan menenangkan.',
    details: nehirDetails,
    sizeChart: abayaSizeChart,
    status: 'pre-order',
    featured: true,
  },
  {
    id: 'SH-NHR-BLK',
    slug: 'nehir-abaya-jetblack',
    name: 'Nehir Abaya – Jetblack',
    category: 'abaya',
    price: 299000, // TODO: verifikasi harga
    material: 'Premium Jetblack', // TODO: verifikasi nama bahan (caption IG: "Jetblack")
    colors: ['Jetblack (bordir beige)'],
    sizes: ABAYA_SIZES,
    images: gallery('nehir-abaya-jetblack', [
      'Model berdiri di taman kota mengenakan Nehir Abaya hitam dengan bordir beige',
      'Model mengenakan Nehir Abaya jetblack di pelataran Masjidil Haram',
      'Nehir Abaya jetblack terlipat dengan detail bordir beige',
      'Close-up bordir bunga beige pada lengan Nehir Abaya jetblack',
    ]),
    description:
      'Hitam tak pernah gagal. Jetblack yang tegas dengan bordir beige yang halus, cocok untuk ibadah, umrah, maupun acara formal.',
    details: nehirDetails,
    sizeChart: abayaSizeChart,
    status: 'pre-order',
    featured: true,
  },
  {
    id: 'SH-KRL',
    slug: 'kareli-abaya',
    name: 'Kareli Abaya',
    category: 'abaya',
    // TODO: isi harga saat rilis
    material: 'Premium Cotton', // TODO: verifikasi dengan spesifikasi produk asli
    colors: ['Butter Yellow', 'Bitterchoco'],
    sizes: ABAYA_SIZES,
    images: gallery('kareli-abaya', [
      'Kareli Abaya warna butter yellow dan bitterchoco tergantung di rak',
      'Model mengenakan Kareli Abaya motif kotak bitterchoco',
      'Kareli Abaya butter yellow dan bitterchoco terlipat dengan detail kerah scallop',
      'Detail lengan Kareli Abaya motif kotak bitterchoco',
    ]),
    description:
      'Koleksi terbaru yang manis: detail scallop di kerah dan lengan dengan pilihan butter yellow polos atau motif kotak bitterchoco.',
    details: [
      'Detail scallop di kerah dan ujung lengan',
      'Kantong di sisi depan',
      'Cutting lapang dengan jatuh kain yang ringan',
    ], // TODO: verifikasi dengan spesifikasi produk asli
    sizeChart: abayaSizeChart,
    status: 'segera',
    featured: true,
  },
  {
    id: 'SH-ARB',
    slug: 'abaya-arabian-anti-uv',
    // TODO: ganti dengan nama koleksi asli
    name: 'Abaya Arabian Anti UV',
    category: 'abaya',
    material: 'Arabian Exclusive Anti UV', // dari caption IG; TODO: verifikasi
    colors: ['Dark Chocolate'],
    sizes: ABAYA_SIZES,
    images: gallery('abaya-arabian-anti-uv', [
      'Model mengenakan abaya cokelat tua dengan bordir putih di dalam ruangan bernuansa kayu',
      'Model berpose dengan abaya cokelat tua dan khimar senada',
      'Detail bordir bunga putih pada abaya cokelat tua',
    ]),
    description:
      'Material Arabian Exclusive dengan perlindungan anti UV, dalam warna cokelat tua yang dalam dan bordir putih yang kontras.',
    details: ['Bordir bunga di lengan', 'Material jatuh dan tidak menerawang'], // TODO: verifikasi
    sizeChart: abayaSizeChart,
    status: 'segera',
    featured: true,
  },
  {
    id: 'SH-NRN',
    slug: 'nareen-khimar',
    // Ejaan dari caption IG "Nareen Khiban". TODO: verifikasi nama produk
    name: 'Nareen Khiban',
    category: 'aksesoris',
    material: 'Premium Ceruty', // TODO: verifikasi dengan spesifikasi produk asli
    colors: ['Sky Blue'],
    sizes: ['All Size'],
    images: gallery('nareen-khimar', [
      'Model dari belakang mengenakan Nareen Khiban warna biru langit yang menjuntai panjang',
      'Model mengenakan Nareen Khiban biru dipadukan Nehir Abaya putih bordir biru',
      'Close-up Nareen Khiban biru dan detail bordir Nehir Abaya',
    ]),
    description:
      'Khimar panjang yang menutup dada dengan sempurna. Serasi dipadukan dengan Nehir Abaya untuk tampilan yang kalem.',
    details: ['Panjang menutup dada dan punggung', 'Jahitan tepi rapi'], // TODO: verifikasi ukuran
    sizeChart: [{ size: 'All Size', chest: '-', length: '-' }], // TODO: isi ukuran khimar
    status: 'pre-order',
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

export function getCategory(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}

export function countByCategory(slug: CategorySlug): number {
  return products.filter((p) => p.category === slug).length;
}
