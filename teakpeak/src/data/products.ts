// Data katalog Teakpeak. Tambah produk baru cukup dengan menambah objek di array `products`.

export type CategorySlug =
  | 'coffee-table'
  | 'lounge-chair'
  | 'dining-chair'
  | 'dining-table'
  | 'sofa'
  | 'bedroom'
  | 'terrace-set'
  | 'restaurant-set'
  | 'storage';

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

// Kategori mengikuti sorotan (highlight) Instagram @teakpeak.id
export const categories: readonly Category[] = [
  {
    slug: 'coffee-table',
    name: 'Coffee Table',
    description: 'Meja kopi jati, rotan, dan jati daur ulang.',
  },
  {
    slug: 'lounge-chair',
    name: 'Lounge Chair',
    description: 'Kursi santai untuk ruang keluarga dan lounge.',
  },
  { slug: 'dining-chair', name: 'Dining Chair', description: 'Kursi makan dan arm chair.' },
  { slug: 'dining-table', name: 'Dining Table', description: 'Meja makan kayu solid.' },
  { slug: 'sofa', name: 'Sofa', description: 'Sofa untuk ruang keluarga dan lounge.' },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    description: 'Tempat tidur, nakas, dan bangku kaki ranjang.',
  },
  { slug: 'terrace-set', name: 'Terrace Set', description: 'Set kursi dan meja untuk teras.' },
  {
    slug: 'restaurant-set',
    name: 'Restaurant Set',
    description: 'Meja dan kursi custom untuk restoran.',
  },
  {
    slug: 'storage',
    name: 'Storage & Custom',
    description: 'Rak, kabinet, meja kerja, dan kitchen set.',
  },
];

// Pembuat daftar gambar: /products/<slug>/01.webp, 02.webp, ...
export function gallery(slug: string, alts: readonly [string, ...string[]]) {
  const [first, ...rest] = alts.map((alt, i) => ({
    src: `/products/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt,
  }));
  return [first!, ...rest] as const;
}

// Sumber: caption & foto Instagram @teakpeak.id (Des 2025 - Okt 2026). Harga tidak dicantumkan (tanya via WA).
const products: readonly Product[] = [
  {
    slug: 'o-chair',
    name: 'O Chair',
    category: 'dining-chair',
    description:
      'Kursi jati solid dengan garis bersih dan lengkung lembut. Ringan dipandang, kokoh dipakai, cocok untuk ruang makan, kafe, dan interior yang tenang.',
    images: gallery('o-chair', [
      'O Chair dari Teakpeak',
      'O Chair, foto 2',
      'O Chair, foto 3',
      'O Chair, foto 4',
    ]),
    specs: {
      material: 'Kayu jati',
      dimensions: '58 x 52 x 82 cm (bisa custom)',
      colors: ['Mocca finish'],
    },
    featured: true,
  },
  {
    slug: 'verla-arm-chair',
    name: 'Verla Arm Chair',
    category: 'dining-chair',
    description:
      'Rangka jati solid dengan sandaran rotan anyam tangan dan dudukan empuk. Siluet pahatan yang memberi kehangatan dan tekstur di ruang makan maupun lounge.',
    images: gallery('verla-arm-chair', [
      'Verla Arm Chair dari Teakpeak',
      'Verla Arm Chair, foto 2',
      'Verla Arm Chair, foto 3',
      'Verla Arm Chair, foto 4',
    ]),
    specs: {
      material: 'Rangka jati, sandaran rotan, dudukan upholstery',
      dimensions: '72 x 58 x 82 cm (bisa custom)',
      colors: ['Rangka solid black rustic', 'Kain white cream'],
    },
    featured: true,
  },
  {
    slug: 'arden-lounge-chair',
    name: 'Arden Lounge Chair',
    category: 'lounge-chair',
    description:
      'Kursi santai berangka jati dengan dudukan dan sandaran empuk. Sandaran tangan melengkung lembut, pas untuk ruang keluarga, sudut baca, lobi hotel, atau villa.',
    images: gallery('arden-lounge-chair', [
      'Arden Lounge Chair dari Teakpeak',
      'Arden Lounge Chair, foto 2',
      'Arden Lounge Chair, foto 3',
      'Arden Lounge Chair, foto 4',
    ]),
    specs: {
      material: 'Rangka jati, dudukan & sandaran upholstery',
      dimensions: '74 x 68 x 78 cm (bisa custom)',
      colors: ['Rangka natural finish', 'Kain cokelat'],
    },
    featured: false,
  },
  {
    slug: 'alder-lounge-chair',
    name: 'Alder Lounge Chair',
    category: 'lounge-chair',
    description:
      'Kursi santai jati solid dengan garis arsitektural dan bantalan tebal. Rangka terbuka yang mudah menyatu di ruang keluarga maupun area hospitality.',
    images: gallery('alder-lounge-chair', [
      'Alder Lounge Chair dari Teakpeak',
      'Alder Lounge Chair, foto 2',
      'Alder Lounge Chair, foto 3',
      'Alder Lounge Chair, foto 4',
    ]),
    specs: {
      material: 'Kayu jati & upholstery',
      dimensions: '74 x 70 x 75 cm (bisa custom)',
      colors: ['Natural finish', 'Kain white cream'],
    },
    featured: true,
  },
  {
    slug: 'cleopatra-dining-chair',
    name: 'Cleopatra Dining Chair',
    category: 'restaurant-set',
    description:
      'Kursi makan custom untuk restoran: kuat untuk pemakaian padat, nyaman diduduki lama, dengan tampilan yang tak lekang waktu.',
    images: gallery('cleopatra-dining-chair', [
      'Cleopatra Dining Chair dari Teakpeak',
      'Cleopatra Dining Chair, foto 2',
    ]),
    specs: {
      material: 'Kayu solid, sandaran rotan, dudukan upholstery',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'cantilever-chair',
    name: 'Cantilever Chair',
    category: 'dining-chair',
    description:
      'Kursi modern bergaya minimalis dengan kenyamanan ergonomis, cocok untuk ruang makan, ruang kerja, maupun kafe.',
    images: gallery('cantilever-chair', [
      'Cantilever Chair dari Teakpeak',
      'Cantilever Chair, foto 2',
      'Cantilever Chair, foto 3',
    ]),
    specs: {
      material: 'Tanyakan via WhatsApp',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'whitewash-dining-chair',
    name: 'Whitewash Dining Chair',
    category: 'dining-chair',
    description:
      'Kursi makan kayu solid bergaris bersih dengan finishing whitewash lembut. Pelengkap meja makan atau aksen minimalis di sudut ruangan.',
    images: gallery('whitewash-dining-chair', [
      'Whitewash Dining Chair dari Teakpeak',
      'Whitewash Dining Chair, foto 2',
      'Whitewash Dining Chair, foto 3',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Tanyakan via WhatsApp', colors: ['Whitewash'] },
    featured: false,
  },
  {
    slug: 'navara-sofa',
    name: 'Navara Sofa',
    category: 'sofa',
    description:
      'Sofa elegan dengan garis bersih, dudukan lega, dan upholstery netral. Cocok untuk rumah modern, hotel, dan area lounge.',
    images: gallery('navara-sofa', [
      'Navara Sofa dari Teakpeak',
      'Navara Sofa, foto 2',
      'Navara Sofa, foto 3',
    ]),
    specs: {
      material: 'Kayu jati & upholstery kain',
      dimensions: '180 x 85 x 78 cm (bisa custom)',
      colors: ['Kain abu-abu'],
    },
    featured: true,
  },
  {
    slug: 'boucle-sofa',
    name: 'Boucle Sofa',
    category: 'sofa',
    description:
      'Sofa berbalut kain bouclé lembut dengan bentuk sculptural yang bersih, menghadirkan kehangatan dan kenyamanan setiap hari.',
    images: gallery('boucle-sofa', [
      'Boucle Sofa dari Teakpeak',
      'Boucle Sofa, foto 2',
      'Boucle Sofa, foto 3',
    ]),
    specs: {
      material: 'Kain bouclé',
      dimensions: 'Bisa custom',
      colors: ['Bisa custom (kain & warna)'],
    },
    featured: true,
  },
  {
    slug: 'square-dining-table',
    name: 'Square Dining Table',
    category: 'dining-table',
    description:
      'Meja makan jati solid dengan bentuk minimal dan proporsi alami. Cocok untuk ruang makan modern, kafe, dan interior hospitality.',
    images: gallery('square-dining-table', [
      'Square Dining Table dari Teakpeak',
      'Square Dining Table, foto 2',
      'Square Dining Table, foto 3',
      'Square Dining Table, foto 4',
    ]),
    specs: {
      material: 'Kayu jati solid',
      dimensions: '150 x 90 x 75 cm (bisa custom)',
      colors: ['Bleaching finish'],
    },
    featured: false,
  },
  {
    slug: 'round-dining-table',
    name: 'Round Dining Table',
    category: 'dining-table',
    description:
      'Meja makan kayu solid dengan tepi membulat dan kaki meruncing, menonjolkan serat kayu alami. Ringan dan lapang untuk rumah, villa, dan restoran.',
    images: gallery('round-dining-table', [
      'Round Dining Table dari Teakpeak',
      'Round Dining Table, foto 2',
      'Round Dining Table, foto 3',
      'Round Dining Table, foto 4',
    ]),
    specs: {
      material: 'Kayu jati solid',
      dimensions: '150 x 90 x 75 cm (bisa custom)',
      colors: ['Bleaching finish'],
    },
    featured: false,
  },
  {
    slug: 'heritage-dining-table',
    name: 'Heritage Dining Table',
    category: 'dining-table',
    description:
      'Meja makan dari jati daur ulang premium dengan karakter serat yang kuat. Berkelanjutan, elegan, dan penuh cerita.',
    images: gallery('heritage-dining-table', [
      'Heritage Dining Table dari Teakpeak',
      'Heritage Dining Table, foto 2',
    ]),
    specs: {
      material: 'Jati daur ulang (reclaimed teak)',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: true,
  },
  {
    slug: 'recycle-coffee-table',
    name: 'Recycle Coffee Table',
    category: 'coffee-table',
    description:
      'Meja bundar dari kayu jati daur ulang dengan kaki silinder kokoh. Ketidaksempurnaan alaminya justru menjadi daya tarik.',
    images: gallery('recycle-coffee-table', [
      'Recycle Coffee Table dari Teakpeak',
      'Recycle Coffee Table, foto 2',
      'Recycle Coffee Table, foto 3',
    ]),
    specs: {
      material: 'Jati daur ulang',
      dimensions: 'Tinggi 50 cm, diameter 60 cm (bisa custom)',
      colors: ['Natural & black rustic finish'],
    },
    featured: false,
  },
  {
    slug: 'rattan-coffee-table',
    name: 'Rattan Coffee Table',
    category: 'coffee-table',
    description:
      'Meja kopi jati dengan detail rotan anyam tangan dan bentuk membulat, jadi pusat ruangan yang hangat dan mengundang.',
    images: gallery('rattan-coffee-table', [
      'Rattan Coffee Table dari Teakpeak',
      'Rattan Coffee Table, foto 2',
      'Rattan Coffee Table, foto 3',
      'Rattan Coffee Table, foto 4',
    ]),
    specs: {
      material: 'Rangka jati & rotan, top jati daur ulang',
      dimensions: 'Tinggi 50 cm, diameter 60 cm (bisa custom)',
      colors: ['Natural finish & abu-abu'],
    },
    featured: false,
  },
  {
    slug: 'coffee-table-stand',
    name: 'Coffee Table Stand',
    category: 'coffee-table',
    description:
      'Paduan top gelap bertekstur dan kaki kayu solid yang hangat. Tegas tapi membumi, cocok untuk ruang keluarga, lounge, dan kafe.',
    images: gallery('coffee-table-stand', [
      'Coffee Table Stand dari Teakpeak',
      'Coffee Table Stand, foto 2',
      'Coffee Table Stand, foto 3',
      'Coffee Table Stand, foto 4',
    ]),
    specs: {
      material: 'Kayu jati, top jati daur ulang',
      dimensions: 'Tinggi 50 cm, diameter 60 cm (bisa custom)',
      colors: ['Natural & black finish'],
    },
    featured: false,
  },
  {
    slug: 'void-coffee-table',
    name: 'Void Coffee Table',
    category: 'coffee-table',
    description:
      'Meja kopi kayu solid dengan desain terbuka yang bersih. Bentuk sederhana, karakter kuat.',
    images: gallery('void-coffee-table', [
      'Void Coffee Table dari Teakpeak',
      'Void Coffee Table, foto 2',
      'Void Coffee Table, foto 3',
      'Void Coffee Table, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'haven-drawer-bed',
    name: 'Haven Drawer Bed',
    category: 'bedroom',
    description:
      'Rangka tempat tidur kayu solid dengan laci tersembunyi. Kamar tetap rapi, hangat, dan tenang.',
    images: gallery('haven-drawer-bed', [
      'Haven Drawer Bed dari Teakpeak',
      'Haven Drawer Bed, foto 2',
      'Haven Drawer Bed, foto 3',
      'Haven Drawer Bed, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: true,
  },
  {
    slug: 'canopy-bed',
    name: 'Canopy Bed',
    category: 'bedroom',
    description:
      'Tempat tidur kanopi dari kayu dengan garis bersih, menghadirkan kehangatan dan suasana tenang di kamar.',
    images: gallery('canopy-bed', ['Canopy Bed dari Teakpeak']),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'cloud-bed',
    name: 'Cloud Bed',
    category: 'bedroom',
    description:
      'Lengkung lembut dan upholstery halus dalam siluet yang tak lekang waktu. Kenyamanan dengan kesan mewah yang tenang.',
    images: gallery('cloud-bed', [
      'Cloud Bed dari Teakpeak',
      'Cloud Bed, foto 2',
      'Cloud Bed, foto 3',
    ]),
    specs: {
      material: 'Upholstery',
      dimensions: 'Bisa custom',
      colors: ['Bisa custom (upholstery)'],
    },
    featured: false,
  },
  {
    slug: 'wooden-rattan-bed',
    name: 'Wooden Rattan Bed',
    category: 'bedroom',
    description:
      'Tempat tidur kayu dengan panel rotan yang membuat kamar terasa lebih hangat, tenang, dan mengundang.',
    images: gallery('wooden-rattan-bed', [
      'Wooden Rattan Bed dari Teakpeak',
      'Wooden Rattan Bed, foto 2',
    ]),
    specs: {
      material: 'Kayu & rotan',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'elara-upholstered-bed',
    name: 'Elara Upholstered Bed',
    category: 'bedroom',
    description: 'Tempat tidur ber-upholstery dengan lengkung anggun untuk kamar yang tenang.',
    images: gallery('elara-upholstered-bed', [
      'Elara Upholstered Bed dari Teakpeak',
      'Elara Upholstered Bed, foto 2',
      'Elara Upholstered Bed, foto 3',
      'Elara Upholstered Bed, foto 4',
    ]),
    specs: {
      material: 'Upholstery',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'kyoto-bed',
    name: 'Kyoto Bed',
    category: 'bedroom',
    description:
      'Kayu solid bertepi membulat dengan panel anyaman bertekstur. Sentuhan Japandi yang menenangkan.',
    images: gallery('kyoto-bed', [
      'Kyoto Bed dari Teakpeak',
      'Kyoto Bed, foto 2',
      'Kyoto Bed, foto 3',
    ]),
    specs: {
      material: 'Kayu solid & panel anyam',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'sora-low-bed',
    name: 'Sora Low Bed',
    category: 'bedroom',
    description:
      'Rangka kayu rendah yang kaya warna dengan sandaran kepala empuk, seimbang antara nyaman dan elegan.',
    images: gallery('sora-low-bed', [
      'Sora Low Bed dari Teakpeak',
      'Sora Low Bed, foto 2',
      'Sora Low Bed, foto 3',
    ]),
    specs: {
      material: 'Kayu & upholstery',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'hondana-bookshelf',
    name: 'Hondana Bookshelf',
    category: 'storage',
    description:
      'Rak buku terbuka dengan garis bersih dan nada kayu alami. Ringan dipandang, kokoh menyimpan buku, dekorasi, dan kenangan.',
    images: gallery('hondana-bookshelf', [
      'Hondana Bookshelf dari Teakpeak',
      'Hondana Bookshelf, foto 2',
      'Hondana Bookshelf, foto 3',
      'Hondana Bookshelf, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'bedside-table',
    name: 'Bedside Table',
    category: 'bedroom',
    description:
      'Nakas gantung yang tidak menyentuh lantai: ringan, fungsional, dan membuat kamar terasa lapang.',
    images: gallery('bedside-table', [
      'Bedside Table dari Teakpeak',
      'Bedside Table, foto 2',
      'Bedside Table, foto 3',
      'Bedside Table, foto 4',
    ]),
    specs: {
      material: 'Tanyakan via WhatsApp',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'storage-cabinet',
    name: 'Storage Cabinet',
    category: 'storage',
    description:
      'Kabinet konsol minimalis dari luar dengan detail rapi di dalam. Penyimpanan sekaligus dekorasi ruangan.',
    images: gallery('storage-cabinet', [
      'Storage Cabinet dari Teakpeak',
      'Storage Cabinet, foto 2',
      'Storage Cabinet, foto 3',
      'Storage Cabinet, foto 4',
    ]),
    specs: {
      material: 'Tanyakan via WhatsApp',
      dimensions: 'Bisa custom',
      colors: ['Bisa custom'],
    },
    featured: false,
  },
  {
    slug: 'bed-bench',
    name: 'Bed Bench',
    category: 'bedroom',
    description:
      'Bangku kaki ranjang dari kayu solid dengan dudukan empuk. Kecil, tapi menyeimbangkan seluruh kamar.',
    images: gallery('bed-bench', [
      'Bed Bench dari Teakpeak',
      'Bed Bench, foto 2',
      'Bed Bench, foto 3',
      'Bed Bench, foto 4',
    ]),
    specs: {
      material: 'Kayu solid & upholstery',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'bag-shelf',
    name: 'Bag Shelf',
    category: 'storage',
    description:
      'Rak tas kayu solid dengan penyimpanan terbuka, untuk memajang tas, dekorasi, atau barang favorit dengan rapi.',
    images: gallery('bag-shelf', [
      'Bag Shelf dari Teakpeak',
      'Bag Shelf, foto 2',
      'Bag Shelf, foto 3',
      'Bag Shelf, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'terrace-set-arden',
    name: 'Terrace Set Arden',
    category: 'terrace-set',
    description:
      'Set teras berisi Arden Lounge Chair dan Rattan Coffee Table. Hangat, bertekstur, dan tenang untuk momen santai di luar ruangan.',
    images: gallery('terrace-set-arden', [
      'Terrace Set Arden dari Teakpeak',
      'Terrace Set Arden, foto 2',
      'Terrace Set Arden, foto 3',
    ]),
    specs: {
      material: 'Kayu jati, rotan & upholstery',
      dimensions: 'Bisa custom',
      colors: ['Bisa custom'],
    },
    featured: true,
  },
  {
    slug: 'terrace-set-verla',
    name: 'Terrace Set Verla',
    category: 'terrace-set',
    description:
      'Set teras berisi Verla Arm Chair dan Recycle Teak Coffee Table. Dibuat dari jati alami: sederhana, hangat, dan awet.',
    images: gallery('terrace-set-verla', [
      'Terrace Set Verla dari Teakpeak',
      'Terrace Set Verla, foto 2',
      'Terrace Set Verla, foto 3',
    ]),
    specs: { material: 'Kayu jati', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'bed-frame-with-drawers',
    name: 'Bed Frame with Drawers',
    category: 'bedroom',
    description:
      'Rangka tempat tidur jati solid dengan laci tersembunyi agar kamar tetap rapi dan estetik.',
    images: gallery('bed-frame-with-drawers', [
      'Bed Frame with Drawers dari Teakpeak',
      'Bed Frame with Drawers, foto 2',
      'Bed Frame with Drawers, foto 3',
    ]),
    specs: { material: 'Kayu jati solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'canopy-storage-bed',
    name: 'Canopy Storage Bed',
    category: 'bedroom',
    description:
      'Tempat tidur kanopi empat tiang dari kayu solid dengan penyimpanan tersembunyi di bawahnya.',
    images: gallery('canopy-storage-bed', ['Canopy Storage Bed dari Teakpeak']),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'rattan-bed-black',
    name: 'Wooden Rattan Bed Black',
    category: 'bedroom',
    description:
      'Tempat tidur dengan panel rotan bertekstur dan rangka gelap, membuat kamar terasa hangat dan elegan.',
    images: gallery('rattan-bed-black', [
      'Wooden Rattan Bed Black dari Teakpeak',
      'Wooden Rattan Bed Black, foto 2',
      'Wooden Rattan Bed Black, foto 3',
      'Wooden Rattan Bed Black, foto 4',
    ]),
    specs: {
      material: 'Kayu & rotan',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'rattan-bed-white',
    name: 'Wooden Rattan Bed White',
    category: 'bedroom',
    description:
      'Tempat tidur rotan dengan rangka terang yang menghadirkan kehangatan dan karakter di kamar.',
    images: gallery('rattan-bed-white', [
      'Wooden Rattan Bed White dari Teakpeak',
      'Wooden Rattan Bed White, foto 2',
      'Wooden Rattan Bed White, foto 3',
    ]),
    specs: {
      material: 'Kayu & rotan',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'upholstered-bed',
    name: 'Upholstered Bed',
    category: 'bedroom',
    description: 'Tempat tidur ber-upholstery dengan siluet anggun dan tekstur yang nyaman.',
    images: gallery('upholstered-bed', [
      'Upholstered Bed dari Teakpeak',
      'Upholstered Bed, foto 2',
      'Upholstered Bed, foto 3',
      'Upholstered Bed, foto 4',
    ]),
    specs: {
      material: 'Upholstery kain',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: false,
  },
  {
    slug: 'olive-upholstered-bed',
    name: 'Olive Upholstered Bed',
    category: 'bedroom',
    description:
      'Kain hijau olive, sandaran kepala sculptural, dan kaki kayu hangat untuk kamar yang nyaman dan berkelas.',
    images: gallery('olive-upholstered-bed', [
      'Olive Upholstered Bed dari Teakpeak',
      'Olive Upholstered Bed, foto 2',
      'Olive Upholstered Bed, foto 3',
    ]),
    specs: {
      material: 'Upholstery kain & kaki kayu',
      dimensions: 'Tanyakan via WhatsApp',
      colors: ['Hijau olive'],
    },
    featured: false,
  },
  {
    slug: 'custom-dining-table',
    name: 'Custom Dining Table',
    category: 'dining-table',
    description:
      'Meja makan kayu solid dengan garis bersih, dibuat khusus menyesuaikan ruang Anda. Sederhana dan kokoh.',
    images: gallery('custom-dining-table', [
      'Custom Dining Table dari Teakpeak',
      'Custom Dining Table, foto 2',
      'Custom Dining Table, foto 3',
      'Custom Dining Table, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Bisa custom'] },
    featured: false,
  },
  {
    slug: 'restaurant-long-table',
    name: 'Restaurant Long Table',
    category: 'restaurant-set',
    description:
      'Meja makan kayu solid custom sepanjang 4 meter untuk restoran, mengajak tamu berkumpul lebih lama.',
    images: gallery('restaurant-long-table', [
      'Restaurant Long Table dari Teakpeak',
      'Restaurant Long Table, foto 2',
    ]),
    specs: {
      material: 'Kayu solid',
      dimensions: 'Panjang 4 m (custom)',
      colors: ['Tanyakan via WhatsApp'],
    },
    featured: true,
  },
  {
    slug: 'round-restaurant-set',
    name: 'Round Restaurant Set',
    category: 'restaurant-set',
    description:
      'Meja bundar restoran custom dengan kursi kayu solid yang serasi: kuat, elegan, dan nyaman dipakai setiap hari.',
    images: gallery('round-restaurant-set', [
      'Round Restaurant Set dari Teakpeak',
      'Round Restaurant Set, foto 2',
      'Round Restaurant Set, foto 3',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Tanyakan via WhatsApp'] },
    featured: false,
  },
  {
    slug: 'restaurant-dining-chair',
    name: 'Restaurant Dining Chair',
    category: 'restaurant-set',
    description:
      'Kursi makan kayu solid untuk restoran yang ramai: nyaman dipakai seharian dengan gaya yang awet.',
    images: gallery('restaurant-dining-chair', [
      'Restaurant Dining Chair dari Teakpeak',
      'Restaurant Dining Chair, foto 2',
      'Restaurant Dining Chair, foto 3',
      'Restaurant Dining Chair, foto 4',
    ]),
    specs: { material: 'Kayu solid', dimensions: 'Bisa custom', colors: ['Tanyakan via WhatsApp'] },
    featured: false,
  },
  {
    slug: 'office-desk',
    name: 'Office Desk',
    category: 'storage',
    description:
      'Meja kerja dengan penyimpanan khusus dan tata letak rapi, agar semua barang selalu di tempatnya.',
    images: gallery('office-desk', [
      'Office Desk dari Teakpeak',
      'Office Desk, foto 2',
      'Office Desk, foto 3',
    ]),
    specs: {
      material: 'Tanyakan via WhatsApp',
      dimensions: 'Bisa custom',
      colors: ['Bisa custom'],
    },
    featured: false,
  },
  {
    slug: 'compact-kitchen-set',
    name: 'Compact Kitchen Set',
    category: 'storage',
    description:
      'Kitchen set custom untuk dapur kecil: fungsional, rapi, dan dibuat pas dengan ruang Anda.',
    images: gallery('compact-kitchen-set', [
      'Compact Kitchen Set dari Teakpeak',
      'Compact Kitchen Set, foto 2',
      'Compact Kitchen Set, foto 3',
      'Compact Kitchen Set, foto 4',
    ]),
    specs: {
      material: 'Tanyakan via WhatsApp',
      dimensions: 'Custom sesuai ruang',
      colors: ['Bisa custom'],
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
