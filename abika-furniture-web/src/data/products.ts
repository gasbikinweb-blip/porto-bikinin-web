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

// Data dari caption & slide ukuran Instagram. Tidak ada harga valid di caption.
// TODO: konfirmasi nama, ukuran, dan harga tiap produk ke pemilik.
const input: Input[] = [
  {
    slug: 'sofa-l-natural',
    name: 'Sofa L Natural',
    category: 'sofa',
    material: 'Kayu jati, busa Royal Foam D30',
    finish: 'Natural',
    description:
      'Sofa bentuk L berangka kayu jati dengan dudukan empuk, cocok untuk ruang keluarga yang lapang.',
    sourcePost: 'DL1bxB0TlaR',
    featured: true,
  },
  {
    slug: 'sofa-l-walnut',
    name: 'Sofa L Walnut',
    category: 'sofa',
    material: 'Kayu jati, busa Royal Foam D30',
    finish: 'Walnut',
    description: 'Sofa bentuk L dengan rangka jati bernuansa walnut yang hangat.',
    sourcePost: 'DM_yrrTh1Wb',
    featured: true,
  },
  {
    slug: 'sofa-modular-walnut',
    name: 'Sofa Modular Walnut',
    category: 'sofa',
    material: 'Jati solid, busa D32',
    finish: 'Walnut',
    description: 'Sofa rendah model modular dari jati solid untuk ruang santai bergaya modern.',
    sourcePost: 'DdDnjZFS-UH',
    featured: true,
  },
  {
    slug: 'sofa-l-abu',
    name: 'Sofa L Abu',
    category: 'sofa',
    material: 'Busa D30, kain Vienna',
    size: '200 × 160 × 100 cm',
    finish: 'Walnut muda',
    description: 'Sofa L berlapis kain abu dengan kaki kayu walnut muda.',
    sourcePost: 'CullK5MLfL5',
  },
  {
    slug: 'sofa-phai-rattan',
    name: 'Sofa Phai Rattan',
    category: 'sofa',
    material: 'Busa D30, kain Vienna',
    size: '200 × 45 × 65 cm',
    finish: 'Natural',
    description: 'Sofa panjang dengan sandaran rotan bernuansa natural.',
    sourcePost: 'Cux2FUrPuPM',
  },
  {
    slug: 'sofa-bed-single',
    name: 'Sofa Bed Single',
    category: 'sofa',
    material: 'Busa D30, kain Vienna',
    size: '185 × 60 × 45 cm',
    finish: 'Treatment',
    description: 'Sofa bed satu dudukan untuk bersantai maupun beristirahat.',
    sourcePost: 'Cus3QS_L8F1',
  },
  {
    slug: 'kursi-makan-jati-busa',
    name: 'Kursi Makan Jati Busa',
    category: 'kursi',
    material: 'Kayu jati, busa D30',
    finish: 'Natural',
    description: 'Kursi makan rangka jati dengan dudukan dan sandaran empuk.',
    sourcePost: 'DL6G0IETibN',
    featured: true,
  },
  {
    slug: 'kursi-uvi',
    name: 'Kursi Uvi',
    category: 'kursi',
    material: 'Busa D30, suede silver',
    size: '50 × 50 × 90 cm',
    finish: 'Hitam kombinasi gold',
    description: 'Kursi berlapis suede silver dengan kaki hitam berujung gold.',
    sourcePost: 'CuTA7bUPRWb',
  },
  {
    slug: 'kursi-wei',
    name: 'Kursi Wei',
    category: 'kursi',
    material: 'Busa D30, kain ivory',
    size: '51 × 50 × 86 cm',
    finish: 'Putih',
    description: 'Kursi rangka putih dengan bantalan ivory yang ringan dipandang.',
    sourcePost: 'CufzU-qywQ-',
  },
  {
    slug: 'kursi-ulai',
    name: "Kursi Ul'ai",
    category: 'kursi',
    material: 'Busa D30, kain Daphnie & Oscar',
    size: '49 × 50 × 88 cm',
    finish: 'Hitam',
    description: 'Kursi dengan sandaran hitam dan dudukan bermotif.',
    sourcePost: 'Cuna_Bfytgr',
  },
  {
    slug: 'kursi-ulfa-rattan',
    name: 'Kursi Ulfa Rattan',
    category: 'kursi',
    material: 'Busa D30, kain Oscar, rotan',
    size: '46 × 57 × 82 cm',
    finish: 'Hitam',
    description: 'Kursi makan bersandaran rotan dengan dudukan hitam.',
    sourcePost: 'CuqJxotvbS2',
  },
  {
    slug: 'kursi-santai-rattan',
    name: 'Kursi Santai Rattan',
    category: 'kursi',
    material: 'Kayu jati, rotan square',
    size: '55 × 65 × 68 cm',
    finish: 'Treatment',
    description: 'Kursi santai rendah dari jati dengan sandaran anyaman rotan.',
    sourcePost: 'Cva0jPEydXK',
  },
  {
    slug: 'kursi-two',
    name: 'Kursi Two',
    category: 'kursi',
    material: 'Kayu jati, besi',
    size: '55 × 50 × 95 cm',
    finish: 'Natural kombinasi',
    description: 'Kursi kombinasi kayu jati dan rangka besi.',
    sourcePost: 'Cv4Svp1rkFB',
  },
  {
    slug: 'wings-chair',
    name: 'Wings Chair',
    category: 'kursi',
    material: 'Kain Vienna',
    size: '100 × 55 × 50 cm',
    finish: 'Treatment',
    description: 'Kursi bersandaran tinggi model wing dengan kaki kayu.',
    sourcePost: 'CwSQhlCrXam',
  },
  {
    slug: 'chair-yui',
    name: 'Chair Yui',
    category: 'kursi',
    material: 'Kayu jati',
    size: '46 × 57 × 82 cm',
    finish: 'Kombinasi',
    description: 'Kursi makan kayu jati dengan sandaran lengkung.',
    sourcePost: 'C5-A6-PLa-8',
  },
  {
    slug: 'bangku-wood',
    name: 'Bangku Wood',
    category: 'kursi',
    material: 'Kayu jati',
    size: '120 × 55 × 50 cm',
    finish: 'Treatment',
    description: 'Bangku panjang kayu jati untuk ruang makan atau teras.',
    sourcePost: 'Cv0-FoTrMiZ',
  },
  {
    slug: 'meja-makan-marble',
    name: 'Meja Makan Marble',
    category: 'meja',
    material: 'Marmer',
    size: '135 × 85 cm',
    finish: 'Hitam + marble',
    description: 'Meja makan berpermukaan marmer dengan kaki hitam.',
    sourcePost: 'CuCDJybrLfA',
  },
  {
    slug: 'set-meja-makan-marble-k4',
    name: 'Set Meja Makan Marble K4',
    category: 'meja',
    material: 'Marmer',
    size: '135 × 85 cm',
    finish: 'Hitam + marble',
    description: 'Satu set meja makan marmer dengan empat kursi.',
    sourcePost: 'CuJDEAvrrIQ',
  },
  {
    slug: 'meja-makan-bulat-natural',
    name: 'Meja Makan Bulat Natural',
    category: 'meja',
    size: 'Diameter 100 cm',
    finish: 'Natural teak',
    description: 'Meja makan bulat bernuansa kayu natural untuk ruang makan kecil.',
    sourcePost: 'DMWjOCozyEd',
    featured: true,
  },
  {
    slug: 'set-meja-bulat-gold',
    name: 'Set Meja Bulat Gold',
    category: 'meja',
    size: 'Diameter 100 cm',
    finish: 'Gold',
    description: 'Meja bulat berkaki gold dengan kursi yang senada.',
    sourcePost: 'DNKzSjnB7G7',
  },
  {
    slug: 'set-meja-makan-bench',
    name: 'Set Meja Makan + Bench',
    category: 'meja',
    material: 'Kayu jati',
    size: '150 × 80 cm',
    finish: 'Natural',
    description: 'Meja makan jati dengan kursi dan bangku panjang berbantal.',
    sourcePost: 'DcslapyEl3P',
    featured: true,
  },
  {
    slug: 'coffee-table-pier',
    name: 'Coffee Table Pier',
    category: 'meja',
    material: 'Besi, kaca',
    size: '80 × 80 × 45 cm',
    finish: 'Gold',
    description: 'Meja kopi rangka besi gold dengan permukaan kaca.',
    sourcePost: 'CuiW2bASUPX',
  },
  {
    slug: 'coffee-table-marmer',
    name: 'Coffee Table Marmer',
    category: 'meja',
    material: 'Besi, marmer',
    size: '40 × 30 × 35 cm',
    finish: 'Gold spray',
    description: 'Meja kopi segi enam berpermukaan marmer dengan rangka gold.',
    sourcePost: 'C-nLziwyfzE',
  },
  {
    slug: 'meja-rias-jati',
    name: 'Meja Rias Jati',
    category: 'meja',
    material: 'Kayu jati',
    finish: 'Duco + walnut',
    description: 'Meja rias dengan cermin, laci, dan rak kecil.',
    sourcePost: 'B7u44deFKLI',
  },
  {
    slug: 'buffet-tv-treatment',
    name: 'Buffet TV Treatment',
    category: 'lemari',
    material: 'Kayu jati',
    size: '180 × 37 × 40 cm',
    finish: 'Treatment',
    description: 'Meja TV rendah dari kayu jati dengan ruang simpan terbuka.',
    sourcePost: 'Cu5f6s_yXi5',
  },
  {
    slug: 'buffet-tv-natural-teak',
    name: 'Buffet TV Natural Teak',
    category: 'lemari',
    material: 'Kayu jati',
    finish: 'Natural teak',
    description: 'Buffet TV jati dengan warna kayu alami.',
    sourcePost: 'DKEEqKGT-UP',
  },
  {
    slug: 'cabinet-laci',
    name: 'Cabinet Laci',
    category: 'lemari',
    material: 'Kayu jati',
    size: '200 × 80 cm',
    finish: 'Treatment',
    description: 'Kabinet panjang kayu jati dengan deretan laci.',
    sourcePost: 'DKa_pWizqez',
  },
  {
    slug: 'buffet-rotan-jati-mahogany',
    name: 'Buffet Rotan Jati × Mahogany',
    category: 'lemari',
    material: 'Jati, mahogany, rotan',
    finish: 'Kombinasi',
    description: 'Buffet dua pintu berpanel rotan dengan rak di dalamnya.',
    sourcePost: 'DOR_Qa6kgo3',
    featured: true,
  },
  {
    slug: 'laci-rotan-walnut',
    name: 'Laci Rotan Walnut',
    category: 'lemari',
    material: 'Jati solid, rotan',
    size: '120 × 150 cm',
    finish: 'T.walnut',
    description: 'Lemari laci jati solid dengan muka laci berpanel rotan.',
    sourcePost: 'DfPL_VEyDqb',
    featured: true,
  },
  {
    slug: 'box-baby',
    name: 'Box Baby',
    category: 'lemari',
    material: 'Jati, mahogany',
    size: '80 × 45 × 110 cm',
    finish: 'Kombinasi',
    description: 'Lemari kecil perlengkapan bayi dengan laci dan pintu.',
    sourcePost: 'CvGiJZtPvdi',
  },
  {
    slug: 'dipan-rotan-hitam',
    name: 'Dipan Rotan Hitam',
    category: 'tempat-tidur',
    material: 'Kayu jati, Royal Foam',
    size: '180 × 200 cm',
    finish: 'Hitam semi',
    description: 'Dipan jati hitam dengan headboard berpanel rotan.',
    sourcePost: 'DaXw7F2SqoX',
  },
  {
    slug: 'dipan-rotan-natural',
    name: 'Dipan Rotan Natural',
    category: 'tempat-tidur',
    material: 'Kayu jati',
    size: '180 × 200 cm',
    finish: 'Natural',
    description: 'Dipan jati natural dengan headboard rotan yang ringan dipandang.',
    sourcePost: 'Dey1eUXSGbS',
    featured: true,
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
