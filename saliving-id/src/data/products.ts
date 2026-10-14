// Data katalog. Tambah produk baru cukup dengan menambah objek di array `products`
// dan menaruh fotonya di assets-src/products/<slug>/01.jpg, 02.jpg, ... lalu `npm run optimize-images`.
// Nama koleksi, spesifikasi, dan deskripsi disusun dari konten Instagram @saliving.id.
// TODO: verifikasi dengan data asli (nama koleksi, ukuran, harga, ketersediaan).

export type CategorySlug = 'wallpaper' | 'gorden' | 'lantai-spc' | 'kasa-nyamuk';

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  /** Foto sampul kategori (dari salah satu produk) */
  cover: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Satu kalimat untuk kartu katalog */
  summary: string;
  description: string;
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul */
  images: readonly [ProductImage, ...ProductImage[]];
  specs: readonly { label: string; value: string }[];
  /** Harga mulai (Rupiah). Kosongkan bila harga tergantung ukuran */
  priceFrom?: number;
  priceUnit?: string;
  featured: boolean;
}

export const categories: readonly Category[] = [
  {
    slug: 'wallpaper',
    name: 'Wallpaper Dinding',
    short: 'Vinyl, ready stock, Korea, hingga custom mural',
    description:
      'Wallpaper kertas vinyl ready stock, motif tekstur, wallpaper Korea, dan mural custom sesuai ukuran dinding.',
    cover: '/products/wallpaper-custom-mural/01.webp',
  },
  {
    slug: 'gorden',
    name: 'Gorden',
    short: 'Blackout, dimout, dan vitrase',
    description:
      'Gorden blackout penahan cahaya, dimout bermotif, dan vitrase tipis, dijahit sesuai ukuran jendela dan pintu.',
    cover: '/products/gorden-blackout-polos/01.webp',
  },
  {
    slug: 'lantai-spc',
    name: 'Lantai SPC',
    short: 'Motif kayu 5 mm, tahan air',
    description:
      'Lantai SPC motif kayu yang dipasang langsung di atas keramik, rapi dan tanpa bongkar lantai lama.',
    cover: '/products/lantai-spc-5mm/01.webp',
  },
  {
    slug: 'kasa-nyamuk',
    name: 'Kasa Nyamuk Magnet',
    short: 'Pintu & jendela bebas nyamuk',
    description:
      'Kasa nyamuk dengan penutup magnet untuk pintu dan jendela, tetap bisa dilewati dengan mudah.',
    cover: '/products/kasa-nyamuk-magnet/01.webp',
  },
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
  // ---------- Wallpaper ----------
  {
    slug: 'wallpaper-vinyl-ready-stock',
    name: 'Wallpaper Kertas Vinyl Ready Stock',
    category: 'wallpaper',
    summary: 'Roll 53 cm × 10 m untuk ± 5 m², banyak pilihan warna netral.',
    description:
      'Wallpaper kertas vinyl yang selalu tersedia di toko. Satu roll berukuran 53 cm × 10 meter dan cukup untuk sekitar 5 m² dinding. Cocok untuk kamar, ruang tamu, hingga ruang kerja. Tim kami bisa menghitung kebutuhan roll setelah mengukur dinding Anda.',
    images: gallery('wallpaper-vinyl-ready-stock', [
      'Deretan roll wallpaper kertas vinyl ready stock warna putih dan abu di toko SA Living',
      'Close-up roll wallpaper vinyl ukuran 53 cm × 10 meter',
      'Pilihan roll wallpaper tekstur linen berbagai warna',
      'Detail tekstur wallpaper motif anyaman linen warna krem',
    ]),
    specs: [
      { label: 'Bahan', value: 'Kertas vinyl' },
      { label: 'Ukuran roll', value: '53 cm × 10 m (± 5 m²)' },
      { label: 'Ketersediaan', value: 'Ready stock' }, // TODO: verifikasi
    ],
    priceFrom: 160000, // TODO: verifikasi
    priceUnit: 'roll',
    featured: true,
  },
  {
    slug: 'wallpaper-motif-tekstur',
    name: 'Wallpaper Motif & Tekstur',
    category: 'wallpaper',
    summary: 'Tekstur serat, garis, dan aksen emas untuk dinding yang lebih berkarakter.',
    description:
      'Koleksi wallpaper bertekstur untuk memberi kedalaman pada dinding polos: motif serat alami, garis halus, hingga aksen metalik. Tersedia beragam warna, termasuk pilihan wallpaper Korea. Contoh fisik bisa dilihat langsung di toko atau dibawa saat survei.',
    images: gallery('wallpaper-motif-tekstur', [
      'Pilihan roll wallpaper bertekstur warna abu, ungu muda, dan emas',
      'Detail wallpaper motif serat halus warna abu muda',
      'Wallpaper motif garis vertikal warna krem',
      'Perbandingan beberapa wallpaper tekstur linen',
    ]),
    specs: [
      { label: 'Bahan', value: 'Vinyl / non-woven' }, // TODO: verifikasi
      { label: 'Ukuran roll', value: 'Tergantung seri, umumnya 53 cm × 10 m' }, // TODO: verifikasi
      { label: 'Pilihan', value: 'Tekstur, garis, metalik, wallpaper Korea' },
    ],
    featured: true,
  },
  {
    slug: 'wallpaper-custom-mural',
    name: 'Wallpaper Custom & Mural',
    category: 'wallpaper',
    summary: 'Cetak sesuai ukuran dinding: pemandangan, floral, atau desain Anda sendiri.',
    description:
      'Wallpaper custom dicetak mengikuti ukuran dinding sehingga gambar menyambung utuh tanpa potongan janggal. Pilih dari katalog motif (pemandangan, floral, oriental) atau kirim desain sendiri. Cocok untuk dinding aksen kamar, ruang keluarga, kafe, dan kantor.',
    images: gallery('wallpaper-custom-mural', [
      'Wallpaper mural motif bunga dan burung di dinding kamar tidur dengan headboard',
      'Wallpaper custom bergambar pemandangan padang rumput di kamar dengan lantai SPC',
      'Katalog motif wallpaper floral dan geometris',
    ]),
    specs: [
      { label: 'Ukuran', value: 'Custom sesuai dinding' },
      { label: 'Motif', value: 'Katalog atau desain sendiri' },
      { label: 'Pilihan lain', value: 'Roll 5 m², 15 m², atau custom' }, // TODO: verifikasi
    ],
    featured: true,
  },

  // ---------- Gorden ----------
  {
    slug: 'gorden-blackout-polos',
    name: 'Gorden Blackout Polos',
    category: 'gorden',
    summary: 'Menahan cahaya dan panas, lipit rapi dengan pilihan warna netral.',
    description:
      'Gorden blackout untuk kamar tidur dan ruang yang butuh gelap total. Kain tebal menahan cahaya matahari dan panas, sehingga ruangan lebih sejuk. Dijahit sesuai ukuran jendela dengan model lipit yang rapi.',
    images: gallery('gorden-blackout-polos', [
      'Gorden blackout abu-abu terpasang rapi di jendela ruangan',
      'Pilihan warna kain blackout polos dari putih hingga cokelat',
      'Gorden blackout warna krem dengan tali pengikat',
      'Detail lipatan kain gorden blackout',
    ]),
    specs: [
      { label: 'Jenis', value: 'Blackout' },
      { label: 'Model', value: 'Lipit / smokring (sesuai pilihan)' }, // TODO: verifikasi
      { label: 'Ukuran', value: 'Custom sesuai jendela' },
    ],
    featured: true,
  },
  {
    slug: 'gorden-blackout-premium',
    name: 'Gorden Blackout Premium',
    category: 'gorden',
    summary: 'Kain blackout halus dengan palet earth tone dari krem hingga cokelat tua.',
    description:
      'Seri blackout dengan permukaan kain yang lebih halus dan jatuh. Palet warna earth tone mudah dipadukan dengan furnitur kayu maupun interior modern. Lihat buku sampel lengkap di toko atau saat tim kami datang mengukur.',
    images: gallery('gorden-blackout-premium', [
      'Buku sampel kain blackout premium warna krem, hijau zaitun, dan cokelat',
      'Sampel kain blackout premium warna abu-abu',
      'Sampel kain blackout premium warna cokelat karamel dan krem',
      'Beberapa lembar kain blackout premium warna cokelat dan krem',
      'Tumpukan kain blackout premium warna cokelat hingga putih gading',
    ]),
    specs: [
      { label: 'Jenis', value: 'Blackout' },
      { label: 'Warna', value: 'Krem, abu, zaitun, karamel, cokelat' },
      { label: 'Ukuran', value: 'Custom sesuai jendela' },
    ],
    featured: false,
  },
  {
    slug: 'gorden-blackout-linen',
    name: 'Gorden Blackout Tekstur Linen',
    category: 'gorden',
    summary: 'Tampilan linen natural dengan daya tahan cahaya khas blackout.',
    description:
      'Perpaduan tampilan linen yang hangat dan fungsi blackout. Teksturnya memberi kesan natural dan mewah tanpa terlihat berat. Tersedia dalam beberapa warna abu, krem, dan cokelat.',
    images: gallery('gorden-blackout-linen', [
      'Kain gorden blackout tekstur linen warna abu tua',
      'Gulungan kain blackout linen warna abu dan hitam',
      'Gulungan kain blackout linen warna putih, krem, dan hijau tua',
      'Gulungan kain blackout linen warna emas dan cokelat tua',
    ]),
    specs: [
      { label: 'Jenis', value: 'Blackout tekstur linen' },
      { label: 'Ukuran', value: 'Custom sesuai jendela' },
    ],
    featured: false,
  },
  {
    slug: 'gorden-dimout-motif',
    name: 'Gorden Dimout Motif',
    category: 'gorden',
    summary: 'Meredupkan cahaya, motif halus untuk ruang tamu dan keluarga.',
    description:
      'Gorden dimout meredupkan cahaya tanpa membuat ruangan gelap total, cocok untuk ruang tamu dan ruang keluarga. Motif jacquard yang halus memberi kesan elegan.',
    images: gallery('gorden-dimout-motif', [
      'Sampel kain gorden dimout motif warna krem, abu, dan cokelat muda',
      'Sampel kain dimout motif percikan putih',
      'Detail kain dimout motif warna krem',
      'Detail kain dimout motif anyaman',
    ]),
    specs: [
      { label: 'Jenis', value: 'Dimout' },
      { label: 'Motif', value: 'Jacquard / tekstur' },
      { label: 'Ukuran', value: 'Custom sesuai jendela' },
    ],
    featured: true,
  },
  {
    slug: 'gorden-vitrase',
    name: 'Gorden Vitrase',
    category: 'gorden',
    summary: 'Kain tipis yang tetap meneruskan cahaya, menjaga privasi siang hari.',
    description:
      'Vitrase membuat cahaya pagi masuk dengan lembut sekaligus menjaga privasi. Bisa dipasang sendiri atau dipadukan dengan gorden blackout pada rel ganda.',
    images: gallery('gorden-vitrase', [
      'Gorden vitrase putih tipis menyaring cahaya matahari',
      'Gorden vitrase dan blackout terpasang pada rel ganda',
      'Gorden vitrase krem di jendela balkon rumah',
      'Gorden vitrase krem dibuka sebagian',
    ]),
    specs: [
      { label: 'Jenis', value: 'Vitrase (sheer)' },
      { label: 'Kombinasi', value: 'Bisa dipadukan dengan blackout' },
      { label: 'Ukuran', value: 'Custom sesuai jendela' },
    ],
    featured: false,
  },
  {
    slug: 'gorden-pintu',
    name: 'Gorden Pintu & Jendela Kecil',
    category: 'gorden',
    summary: 'Gorden model ikat pita untuk pintu kaca dan jendela kecil.',
    description:
      'Gorden untuk pintu kaca, pintu samping, atau jendela kecil dengan model ikat pita di tengah. Tetap memberi privasi tanpa menghalangi pintu dibuka dan ditutup.',
    images: gallery('gorden-pintu', [
      'Gorden pintu cokelat model ikat pita di pintu kaca',
      'Gorden pintu abu-abu dengan pita di tengah',
      'Gorden pintu putih bermotif dengan pita',
      'Gorden vitrase ikat pita di jendela',
    ]),
    specs: [
      { label: 'Model', value: 'Ikat pita (tie-up)' },
      { label: 'Ukuran', value: 'Custom sesuai pintu / jendela' },
    ],
    featured: false,
  },

  // ---------- Lantai ----------
  {
    slug: 'lantai-spc-5mm',
    name: 'Lantai SPC 5 mm Motif Kayu',
    category: 'lantai-spc',
    summary: 'Tahan air, dipasang di atas keramik lama, banyak pilihan motif kayu.',
    description:
      'Lantai SPC (stone plastic composite) dengan tampilan kayu yang hangat. Tahan air dan dipasang langsung di atas keramik tanpa bongkar, sehingga pengerjaan cepat dan bersih. Tersedia motif seperti Scandi Oak, Velvet Kiss, Ashwood, California Oak, dan Summer Melody.',
    images: gallery('lantai-spc-5mm', [
      'Pilihan motif lantai SPC: Scandi Oak, Velvet Kiss, Ashwood, dan lainnya',
      'Lantai SPC motif kayu terpasang di kamar dengan rangka tempat tidur',
      'Lantai SPC motif kayu terang terpasang di ruangan',
      'Lantai SPC motif kayu abu di dekat jendela',
      'Lantai SPC motif kayu gelap setelah pemasangan',
    ]),
    specs: [
      { label: 'Ketebalan', value: '5 mm (tersedia juga 6,5 mm)' }, // TODO: verifikasi
      { label: 'Sifat', value: 'Tahan air' },
      { label: 'Pemasangan', value: 'Di atas lantai keramik lama' },
    ],
    featured: true,
  },

  // ---------- Kasa nyamuk ----------
  {
    slug: 'kasa-nyamuk-magnet',
    name: 'Kasa Nyamuk Magnet',
    category: 'kasa-nyamuk',
    summary: 'Pintu dan jendela tetap terbuka, nyamuk tetap di luar.',
    description:
      'Kasa nyamuk untuk pintu dan jendela dengan penutup magnet yang menutup otomatis setelah dilewati. Sirkulasi udara tetap lancar tanpa nyamuk dan serangga masuk. Ukur dan pemasangan dikerjakan oleh tim kami.',
    images: gallery('kasa-nyamuk-magnet', [
      'Kasa nyamuk magnet terpasang di pintu',
      'Kasa nyamuk magnet di pintu teralis',
    ]),
    specs: [
      { label: 'Penutup', value: 'Magnet' },
      { label: 'Ukuran', value: 'Custom sesuai pintu / jendela' },
      { label: 'Layanan', value: 'Gratis ukur, survei & pasang' }, // TODO: verifikasi
    ],
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
