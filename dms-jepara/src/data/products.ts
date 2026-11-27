import type { CategorySlug } from './categories';
import manifest from './images.generated.json';

export type ProductImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Isi hanya dengan harga yang sudah dikonfirmasi pemilik */
  price?: number;
  priceNote?: string;
  material?: string;
  size?: string;
  finish?: string;
  description: string;
  customizable?: boolean;
  images: ProductImage[];
  featured: boolean;
  /** Kode postingan Instagram sumber, untuk referensi internal */
  sourcePost: string;
};

type Input = Omit<Product, 'images' | 'featured' | 'customizable'> & { featured?: boolean };

// Nama & bahan dari caption/gambar Instagram @dmsjeparafurniture. Tidak ada harga di caption.
// TODO: konfirmasi nama, bahan, ukuran, dan harga tiap produk ke pemilik.
const input: Input[] = [
  {
    slug: 'sofa-luxury-ukir-klasik',
    name: 'Sofa Luxury Ukir Klasik',
    category: 'sofa',
    material: 'Kayu jati ukir, kain beludru premium',
    finish: 'Putih gold',
    description:
      'Sofa set klasik dengan ukiran kayu jati, sandaran tufting, dan meja tamu serasi. Hasil produksi asli workshop kami.',
    sourcePost: 'DbIYv01FE6b',
    featured: true,
  },
  {
    slug: 'sofa-chesterfield-peach',
    name: 'Sofa Chesterfield Peach',
    category: 'sofa',
    material: 'Rangka kayu jati, kain beludru',
    description:
      'Sofa chesterfield dengan tufting penuh dan lengan melengkung, warna peach yang lembut.',
    sourcePost: 'DcK84HDmgm_',
    featured: true,
  },
  {
    slug: 'sofa-chesterfield-abu',
    name: 'Sofa Chesterfield Abu',
    category: 'sofa',
    material: 'Rangka kayu jati, kain beludru',
    description: 'Sofa chesterfield abu bergaya klasik untuk ruang tamu yang elegan.',
    sourcePost: 'DWbiqpPkuVu',
  },
  {
    slug: 'sofa-set-living-luxury',
    name: 'Sofa Set Living Luxury',
    category: 'sofa',
    material: 'Rangka kayu jati, kain premium',
    finish: 'Krem gold',
    description:
      'Sofa set ruang keluarga dengan meja tamu berbingkai gold, cocok untuk interior mewah.',
    sourcePost: 'DeucttSH-_4',
    featured: true,
  },
  {
    slug: 'sofa-dg-stainless',
    name: 'Sofa DG Frame Stainless',
    category: 'sofa',
    material: 'Rangka stainless steel 304, beludru',
    finish: 'Gold',
    description:
      'Sofa dua dudukan dengan bingkai stainless steel 304 berlapis gold. Edisi terbatas.',
    sourcePost: 'De3rXbKH6QW',
    featured: true,
  },
  {
    slug: 'sofa-scandinavian',
    name: 'Sofa Scandinavian',
    category: 'sofa',
    material: 'Rangka kayu jati, kain motif',
    description: 'Sofa sudut gaya Scandinavian dengan kain bermotif dan kaki ramping.',
    sourcePost: 'DesR0zakuqb',
  },
  {
    slug: 'sofa-scandinavian-klasik',
    name: 'Sofa Scandinavian Klasik',
    category: 'sofa',
    material: 'Rangka kayu jati, kain motif',
    description: 'Sofa tiga dudukan berkain motif geometris dengan bentuk yang empuk dan rapi.',
    sourcePost: 'DesRm0JErgW',
  },
  {
    slug: 'sofa-tufting-modern',
    name: 'Sofa Tufting Modern',
    category: 'sofa',
    material: 'Rangka kayu, beludru premium',
    finish: 'Kaki emas',
    description:
      'Sofa modern dengan tufting berumbai, beludru premium halus, dan kaki emas geometris.',
    sourcePost: 'DceTEioSvs3',
  },
  {
    slug: 'sofa-minimalis-bingkai-hitam',
    name: 'Sofa Minimalis Bingkai Hitam',
    category: 'sofa',
    material: 'Rangka kayu jati, kain linen',
    finish: 'Hitam',
    description: 'Sofa minimalis dengan bingkai kayu hitam dan dudukan putih yang bersih.',
    sourcePost: 'DesRvz8EtYH',
  },
  {
    slug: 'sofa-putih-lengkung',
    name: 'Sofa Putih Lengkung',
    category: 'sofa',
    material: 'Rangka kayu jati, kain linen',
    finish: 'Putih',
    description: 'Sofa putih dengan lengan melengkung, cocok untuk ruang tamu bergaya modern.',
    sourcePost: 'DesRm0JErgW',
  },
  {
    slug: 'sofa-l-cerelons',
    name: 'Sofa L Cerelons',
    category: 'sofa',
    material: 'Rangka kayu jati, beludru',
    finish: 'Krem',
    description:
      'Sofa bentuk L dengan tufting dan meja tamu, pas untuk ruang keluarga yang lapang.',
    sourcePost: 'Df9hPDmSGwY',
  },
  {
    slug: 'kursi-sofa-aerox',
    name: 'Kursi Sofa Aerox',
    category: 'sofa',
    material: 'Rangka kayu, kain bulu lembut',
    finish: 'Putih',
    description: 'Kursi sofa tunggal berbentuk bulat dan empuk, nyaman untuk bersantai.',
    sourcePost: 'DdJo3ByS4Cw',
  },
  {
    slug: 'lounge-chair-klasik',
    name: 'Lounge Chair Klasik',
    category: 'sofa',
    material: 'Kayu jati, kain beludru',
    finish: 'Walnut',
    description: 'Kursi santai panjang bergaya klasik dengan rangka kayu melengkung.',
    sourcePost: 'DesR2mHkkfC',
  },
  {
    slug: 'meja-makan-sultan',
    name: 'Meja Makan Sultan',
    category: 'meja-makan',
    material: 'Kayu jati Jepara, top marmer',
    description:
      'Set meja makan mewah dengan kursi berlapis kain, untuk ruang makan yang berkelas.',
    sourcePost: 'Devq00yHz89',
    featured: true,
  },
  {
    slug: 'meja-makan-luxury-putih',
    name: 'Meja Makan Luxury Putih',
    category: 'meja-makan',
    material: 'Kayu jati Jepara, top marmer',
    finish: 'Putih',
    description: 'Meja makan panjang berwarna putih dengan kursi tufting, untuk keluarga besar.',
    sourcePost: 'Devq7Fqn6ZZ',
  },
  {
    slug: 'meja-makan-klasik',
    name: 'Meja Makan Klasik',
    category: 'meja-makan',
    material: 'Kayu jati Jepara',
    finish: 'Cokelat tua',
    description: 'Meja makan bundar klasik dengan kursi berukir dan sandaran kain.',
    sourcePost: 'DeucjDIn_bX',
  },
  {
    slug: 'meja-makan-gold',
    name: 'Meja Makan Gold Mewah',
    category: 'meja-makan',
    material: 'Kayu jati Jepara, stainless gold',
    finish: 'Gold',
    description: 'Set meja makan panjang dengan aksen gold untuk ruang makan yang mewah.',
    sourcePost: 'DevqhbjyqJ5',
  },
  {
    slug: 'coffee-table-marmer-carrara',
    name: 'Coffee Table Marmer Carrara',
    category: 'meja-makan',
    material: 'Marmer carrara, kaki stainless',
    finish: 'Rose gold',
    description: 'Sepasang coffee table bulat dengan top marmer carrara dan kaki stainless.',
    sourcePost: 'DesToF2ys6_',
  },
  {
    slug: 'meja-rias-modern',
    name: 'Meja Rias Modern',
    category: 'meja-rias',
    material: 'Kayu jati Jepara',
    finish: 'Krem',
    description: 'Meja rias dengan banyak laci dan stool bulat yang serasi.',
    sourcePost: 'DWbih7wEuqR',
  },
  {
    slug: 'meja-rias-lampu-cermin',
    name: 'Meja Rias Lampu Cermin',
    category: 'meja-rias',
    material: 'Kayu jati Jepara, cermin LED',
    finish: 'Krem gold',
    description: 'Meja rias dengan cermin berlampu LED dan aksen gold, membuat kamar terasa mewah.',
    sourcePost: 'DWbimyFFJUp',
    featured: true,
  },
  {
    slug: 'meja-rias-putih-klasik',
    name: 'Meja Rias Putih Klasik',
    category: 'meja-rias',
    material: 'Kayu jati Jepara',
    finish: 'Putih',
    description: 'Meja rias putih bergaya klasik dengan cermin bulat.',
    sourcePost: 'Df9OfMRnzA7',
  },
  {
    slug: 'meja-rias-eropa',
    name: 'Meja Rias Gaya Eropa',
    category: 'meja-rias',
    material: 'Kayu jati Jepara ukir',
    finish: 'Putih gold',
    description: 'Meja rias ukir gaya Eropa lengkap dengan lemari kaca di kedua sisi.',
    sourcePost: 'Df9OOUGS7fh',
  },
  {
    slug: 'credenza-luxury',
    name: 'Credenza Luxury',
    category: 'lemari',
    material: 'Kayu jati Jepara, aksen gold',
    description: 'Credenza dengan aksen gold untuk ruang tamu atau foyer.',
    sourcePost: 'DesRShOkjV3',
    featured: true,
  },
  {
    slug: 'meja-konsol-klasik',
    name: 'Meja Konsol Klasik',
    category: 'lemari',
    material: 'Kayu jati Jepara',
    finish: 'Hitam gold',
    description: 'Meja konsol klasik dengan kaki melengkung untuk lorong atau ruang tamu.',
    sourcePost: 'DesRbTSEo_9',
  },
  {
    slug: 'buffet-tv-putih-klasik',
    name: 'Buffet TV Putih Klasik',
    category: 'lemari',
    material: 'Kayu jati Jepara',
    finish: 'Putih',
    description: 'Buffet TV putih dengan laci dan pintu bergaya klasik.',
    sourcePost: 'DeucjDIn_bX',
  },
  {
    slug: 'credenza-putih-ukir',
    name: 'Credenza Putih Ukir',
    category: 'lemari',
    material: 'Kayu jati Jepara ukir',
    finish: 'Putih',
    description: 'Credenza putih dengan kaki ukir, cantik untuk ruang tamu.',
    sourcePost: 'DeucjDIn_bX',
  },
  {
    slug: 'credenza-luxury-gold',
    name: 'Credenza Luxury Gold',
    category: 'lemari',
    material: 'Kayu jati Jepara ukir',
    finish: 'Putih gold',
    description: 'Credenza ukir dengan detail gold bergaya istana.',
    sourcePost: 'De-L35lzmWD',
  },
  {
    slug: 'bufet-ukir-putih',
    name: 'Bufet Ukir Putih',
    category: 'lemari',
    material: 'Kayu jati Jepara ukir',
    finish: 'Putih gold',
    description: 'Bufet panjang ukir dengan cermin, cocok untuk ruang makan klasik.',
    sourcePost: 'De-MB9cz4K7',
  },
  {
    slug: 'lemari-pakaian-custom',
    name: 'Lemari Pakaian Custom',
    category: 'lemari',
    material: 'Kayu jati Jepara',
    finish: 'Putih',
    description: 'Lemari pakaian setinggi plafon dengan panel klasik, ukuran menyesuaikan kamar.',
    sourcePost: 'DgHWyUtSklo',
  },
  {
    slug: 'walk-in-wardrobe',
    name: 'Walk-in Wardrobe',
    category: 'lemari',
    material: 'Kayu jati Jepara, kaca',
    finish: 'Krem',
    description: 'Wardrobe custom dengan lampu, island laci, dan display kaca.',
    sourcePost: 'DeucJMhya3L',
  },
  {
    slug: 'bed-caroline-luxury',
    name: 'Bed Caroline Luxury',
    category: 'tempat-tidur',
    material: 'Kayu jati Jepara ukir, beludru',
    finish: 'Putih gold',
    description: 'Tempat tidur dengan headboard tufting dan ukiran gold yang anggun.',
    sourcePost: 'DfAo4CZk0Il',
    featured: true,
  },
  {
    slug: 'set-bed-tufting-abu',
    name: 'Set Bed Tufting Abu',
    category: 'tempat-tidur',
    material: 'Kayu jati Jepara, beludru',
    finish: 'Abu',
    description: 'Set tempat tidur dengan headboard tufting abu dan nakas klasik.',
    sourcePost: 'DfAo4CZk0Il',
  },
  {
    slug: 'set-bed-wall-decor',
    name: 'Set Bed & Wall Decor',
    category: 'tempat-tidur',
    material: 'Kayu jati Jepara, panel dinding',
    finish: 'Abu krem',
    description: 'Set tempat tidur lengkap dengan panel dinding dekoratif di belakang headboard.',
    sourcePost: 'DfAo4CZk0Il',
  },
  {
    slug: 'bed-klasik-luxury',
    name: 'Bed Klasik Luxury',
    category: 'tempat-tidur',
    material: 'Kayu jati Jepara ukir',
    finish: 'Putih',
    description: 'Tempat tidur klasik berukir dengan nakas dan dekorasi dinding.',
    sourcePost: 'Df9OMP4yNhj',
  },
  {
    slug: 'kamar-set-luxury',
    name: 'Kamar Set Luxury',
    category: 'tempat-tidur',
    material: 'Kayu jati Jepara, beludru',
    finish: 'Krem gold',
    description: 'Kamar set mewah: tempat tidur, nakas, dan cermin dalam satu desain.',
    sourcePost: 'Devq9-5SenU',
  },
  {
    slug: 'kitchen-set-luxury',
    name: 'Kitchen Set Luxury',
    category: 'interior',
    material: 'Kayu jati Jepara, top marmer',
    finish: 'Krem gold',
    description: 'Kitchen set klasik mewah dengan lampu kabinet dan handle gold.',
    sourcePost: 'DesRqo5EjxZ',
    featured: true,
  },
  {
    slug: 'kitchen-island-bar',
    name: 'Kitchen Island & Bar',
    category: 'interior',
    material: 'Kayu jati Jepara, top marmer',
    finish: 'Krem',
    description: 'Kitchen island dengan kursi bar, sekaligus meja makan santai.',
    sourcePost: 'Devq7Fqn6ZZ',
  },
  {
    slug: 'pintu-custom-luxury',
    name: 'Pintu Custom Luxury',
    category: 'interior',
    material: 'Kayu jati Jepara solid',
    description: 'Pintu kayu jati custom, dari model klasik putih sampai ukir dengan kaca patri.',
    sourcePost: 'DgHXyU3H5Ii',
  },
  {
    slug: 'carport-kayu-jati',
    name: 'Carport Kayu Jati',
    category: 'interior',
    material: 'Kayu jati Jepara',
    finish: 'Natural',
    description: 'Carport kayu jati kokoh untuk halaman rumah.',
    sourcePost: 'DcKqgc9S6kn',
  },
  {
    slug: 'panel-dinding-dekorasi',
    name: 'Panel Dinding & Dekorasi',
    category: 'interior',
    material: 'Kayu jati Jepara',
    finish: 'Putih krem',
    description: 'Panel dinding lengkung dengan rak dan lampu tersembunyi untuk ruang tamu.',
    sourcePost: 'DesRbTSEo_9',
  },
];

const images = manifest.products as Record<string, Omit<ProductImage, 'alt'>[]>;

export const products: Product[] = input.map((p) => ({
  ...p,
  featured: p.featured ?? false,
  // TODO: konfirmasi ke pemilik bahwa semua produk memang bisa custom
  customizable: true,
  images: (images[p.slug] ?? []).map((img, i) => ({
    ...img,
    alt: `${p.name}${p.material ? ` berbahan ${p.material.toLowerCase()}` : ''}${p.finish ? `, finishing ${p.finish.toLowerCase()}` : ''}, foto ${i + 1}`,
  })),
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const featuredProducts = products.filter((p) => p.featured);

/** Harga untuk ditampilkan; tanpa data valid tampil "Tanya harga" */
export const priceLabel = (p: Product) =>
  p.price === undefined
    ? 'Tanya harga'
    : `${p.priceNote ? `${p.priceNote} ` : ''}Rp${p.price.toLocaleString('id-ID')}`;
