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
  /** Foto produk; kosongkan bila belum ada foto hasil produksi asli (kartu tampil tanpa foto) */
  image?: { src: string; alt: string; width: number; height: number };
};

export const categoryLabels: Record<ProductCategory, string> = {
  abaya: 'Abaya',
  khimar: 'Khimar',
  gamis: 'Gamis',
  lainnya: 'Lainnya',
};

// Fokus layanan: abaya & khimar (permintaan klien). TODO: tambahkan `image` khimar bila ada foto asli
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
      src: '/images/portofolio/abaya-tie-dye-mauve-manekin.webp',
      alt: 'Abaya motif tie-dye mauve berkerah V pada manekin, hasil produksi Seams Konveksi',
      width: 900,
      height: 1600,
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
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
