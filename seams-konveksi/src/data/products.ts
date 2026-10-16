// Jenis produk yang bisa dikerjakan. Deskripsi masih contoh; sesuaikan dengan produksi asli.

export type ProductCategory = 'abaya' | 'khimar' | 'gamis' | 'lainnya';

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  summary: string;
  description: string;
  suitableFor: string[];
  details: string[];
  image: { src: string; alt: string; width: number; height: number };
};

export const categoryLabels: Record<ProductCategory, string> = {
  abaya: 'Abaya',
  khimar: 'Khimar',
  gamis: 'Gamis',
  lainnya: 'Lainnya',
};

// TODO: ganti gambar placeholder dengan foto hasil produksi Seams (lihat README bagian Foto)
export const products: Product[] = [
  {
    slug: 'abaya',
    name: 'Abaya',
    category: 'abaya',
    summary: 'Abaya polos, bordir, atau motif untuk koleksi brand Anda.',
    description:
      'Jasa konveksi abaya dengan model sesuai desain Anda, dari abaya polos harian sampai abaya dengan detail. Proses dimulai dari sampel agar potongan dan ukuran sesuai sebelum produksi.',
    suitableFor: ['Brand fashion muslim', 'Koleksi lebaran / musiman', 'Butik dan reseller'],
    details: [
      'Model mengikuti desain atau contoh dari Anda',
      'Ukuran mengikuti size chart brand Anda', // TODO: verifikasi
      'Bahan dari klien atau didiskusikan saat konsultasi', // TODO: verifikasi kebijakan bahan
    ],
    image: {
      src: '/placeholder/abaya.svg',
      alt: 'Placeholder foto abaya hasil produksi Seams Konveksi',
      width: 800,
      height: 1000,
    },
  },
  {
    slug: 'khimar',
    name: 'Khimar',
    category: 'khimar',
    summary: 'Khimar instan dan non-instan dengan jahitan tepi rapi.',
    description:
      'Jasa jahit khimar untuk brand hijab dan busana muslimah, untuk khimar polos maupun berlapis, dengan perhatian pada jahitan tepi dan kenyamanan pemakaian.',
    suitableFor: ['Brand hijab', 'Set abaya + khimar', 'Seragam komunitas pengajian'],
    details: [
      'Model instan atau non-instan', // TODO: verifikasi model yang bisa dikerjakan
      'Jahitan tepi sesuai kebutuhan desain', // TODO: verifikasi jenis jahitan
      'Bisa dipadukan dengan abaya dalam satu set',
    ],
    image: {
      src: '/placeholder/khimar.svg',
      alt: 'Placeholder foto khimar hasil produksi Seams Konveksi',
      width: 800,
      height: 1000,
    },
  },
  {
    slug: 'gamis',
    name: 'Gamis',
    category: 'gamis',
    summary: 'Gamis harian maupun acara untuk lini produk brand Anda.',
    description:
      'Konveksi busana muslimah untuk gamis dengan berbagai potongan. Pola dan sampel dibuat dulu, lalu produksi mengikuti sampel yang sudah Anda setujui.',
    suitableFor: ['Brand fashion muslim', 'Seragam acara keluarga', 'Instansi dan komunitas'],
    details: [
      'Potongan mengikuti desain Anda',
      'Bisa dibuat dalam beberapa ukuran', // TODO: verifikasi
      'Cocok dipasangkan dengan khimar',
    ],
    image: {
      src: '/placeholder/gamis.svg',
      alt: 'Placeholder foto gamis hasil produksi Seams Konveksi',
      width: 800,
      height: 1000,
    },
  },
  {
    slug: 'outer-dan-lainnya',
    name: 'Outer & Lainnya',
    category: 'lainnya',
    summary: 'Outer, tunik, dan busana muslimah lain sesuai kebutuhan.',
    description:
      'Selain abaya, khimar, dan gamis, kami bisa mendiskusikan busana muslimah lain seperti outer atau tunik. Konsultasikan desain Anda untuk memastikan bisa dikerjakan.',
    suitableFor: ['Pelengkap koleksi brand', 'Produk musiman', 'Pesanan khusus'],
    details: [
      'Kelayakan produksi dicek saat konsultasi', // TODO: daftar produk lain yang bisa dikerjakan
      'Tetap melalui tahap sampel',
    ],
    image: {
      src: '/placeholder/outer.svg',
      alt: 'Placeholder foto outer hasil produksi Seams Konveksi',
      width: 800,
      height: 1000,
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
