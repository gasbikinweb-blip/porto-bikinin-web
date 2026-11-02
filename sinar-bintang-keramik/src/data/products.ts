// Data produk dari listing Shopee Sinar Bintang Keramik (folder ../sinar-bintang-keramik-sumber/assets/Shopee Assets).
// Harga = harga Shopee saat data diambil. `priceFrom: true` berarti listing punya beberapa varian (harga mulai).
// pcsPerBox / m2PerBox hanya diisi bila tertulis di deskripsi Shopee; jangan menebak.
// TODO: konfirmasi satuan harga (keramik per dus, plint per pcs, sanitary & pintu per buah, semen per sak).
import type { CategorySlug } from './categories';

export type PriceUnit = 'dus' | 'pcs' | 'buah' | 'sak';
export type Grade = 'KW1' | 'KW2' | 'KW3';
export type Finish = 'Glossy' | 'Matt' | 'Rustic' | 'Kasar';

export type ProductImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  /** Kosong untuk produk yang tidak ada di Shopee (link diarahkan ke halaman toko) */
  shopeeItemId?: string;
  name: string;
  category: CategorySlug;
  size?: string;
  brand?: string;
  grade?: Grade;
  finish?: Finish;
  price?: number;
  /** true bila listing Shopee punya beberapa varian harga (ditampilkan "mulai") */
  priceFrom?: boolean;
  priceUnit: PriceUnit;
  pcsPerBox?: number;
  m2PerBox?: number;
  image: ProductImage;
  /** Tampil pertama di section produk */
  featured: boolean;
};

type ProductInput = Omit<Product, 'image'>;

const inputs: readonly ProductInput[] = [
  {
    id: 'keramik-teras-40x40-paloma-stone-green',
    shopeeItemId: '11095832066',
    name: 'Keramik Teras 40x40 Paloma Stone Green',
    category: 'teras',
    size: '40x40',
    brand: 'KIA',
    grade: 'KW1',
    price: 92000,
    priceUnit: 'dus',
    pcsPerBox: 6,
    m2PerBox: 0.96,
    featured: false,
  },
  {
    id: 'keramik-lantai-kamar-mandi-25x25-roma',
    shopeeItemId: '11833518330',
    name: 'Keramik Lantai Kamar Mandi 25x25 Roma',
    category: 'kamar-mandi',
    size: '25x25',
    grade: 'KW1',
    finish: 'Kasar',
    price: 84000,
    priceUnit: 'dus',
    pcsPerBox: 16,
    featured: true,
  },
  {
    id: 'keramik-teras-40x40-sweden-white-kia',
    shopeeItemId: '15062373902',
    name: 'Keramik Teras 40x40 Sweden White KIA',
    category: 'teras',
    size: '40x40',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Matt',
    price: 85000,
    priceUnit: 'dus',
    pcsPerBox: 6,
    m2PerBox: 0.96,
    featured: false,
  },
  {
    id: 'keramik-anak-tangga-30x60-norway-beige-brown',
    shopeeItemId: '17455666802',
    name: 'Keramik Anak Tangga 30x60 Norway Beige & Brown',
    category: 'plint-tangga',
    size: '30x60',
    brand: 'KIA',
    finish: 'Matt',
    price: 112500,
    priceUnit: 'dus',
    pcsPerBox: 5,
    featured: false,
  },
  {
    id: 'keramik-50x50-botanical-grey-kia',
    shopeeItemId: '17722900483',
    name: 'Keramik 50x50 Botanical Grey KIA',
    category: 'lantai',
    size: '50x50',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Matt',
    price: 92000,
    priceUnit: 'dus',
    pcsPerBox: 4,
    featured: false,
  },
  {
    id: 'wastafel-gantung-kia',
    shopeeItemId: '18025207306',
    name: 'Wastafel Gantung KIA',
    category: 'sanitary',
    brand: 'KIA',
    price: 187000,
    priceFrom: true,
    priceUnit: 'buah',
    featured: true,
  },
  {
    id: 'keramik-motif-kayu-40x40-sunwood-brown',
    shopeeItemId: '18734115045',
    name: 'Keramik Motif Kayu 40x40 Sunwood Brown',
    category: 'lantai',
    size: '40x40',
    brand: 'Uno',
    grade: 'KW1',
    finish: 'Matt',
    price: 72000,
    priceUnit: 'dus',
    pcsPerBox: 6,
    m2PerBox: 0.96,
    featured: true,
  },
  {
    id: 'kloset-jongkok-volk',
    shopeeItemId: '19670661113',
    name: 'Kloset Jongkok Volk',
    category: 'sanitary',
    brand: 'Volk',
    price: 135000,
    priceUnit: 'buah',
    featured: true,
  },
  {
    id: 'keramik-lantai-40x40-brilliant-cut-kw1',
    shopeeItemId: '19839236210',
    name: 'Keramik Lantai 40x40 Brilliant Cut KW1',
    category: 'lantai',
    size: '40x40',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Kasar',
    price: 90000,
    priceUnit: 'dus',
    pcsPerBox: 6,
    m2PerBox: 0.96,
    featured: false,
  },
  {
    id: 'keramik-dinding-30x60-rectified-scandi-white',
    shopeeItemId: '24383877891',
    name: 'Keramik Dinding 30x60 Rectified Scandi White',
    category: 'dinding',
    size: '30x60',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Glossy',
    price: 110500,
    priceUnit: 'dus',
    featured: true,
  },
  {
    id: 'keramik-lantai-25x25-akari',
    shopeeItemId: '25726324095',
    name: 'Keramik lantai 25x25 Akari',
    category: 'kamar-mandi',
    size: '25x25',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Rustic',
    price: 71000,
    priceUnit: 'dus',
    featured: true,
  },
  {
    id: 'keramik-lantai-glossy-50x50-avila-concord-kw1',
    shopeeItemId: '29167413682',
    name: 'Keramik Lantai Glossy 50x50 Avila Concord KW1',
    category: 'lantai',
    size: '50x50',
    brand: 'Concord',
    grade: 'KW1',
    finish: 'Glossy',
    price: 79500,
    priceUnit: 'dus',
    featured: false,
  },
  {
    id: 'keramik-dinding-subway-bevel-putih-10x20',
    shopeeItemId: '4031991594',
    name: 'Keramik Dinding Subway Bevel Putih 10x20',
    category: 'dinding',
    size: '10x20',
    brand: 'Signature',
    grade: 'KW1',
    price: 84000,
    priceFrom: true,
    priceUnit: 'dus',
    pcsPerBox: 50,
    featured: true,
  },
  {
    id: 'semen-nat-tile-grout-kia-1-kg',
    shopeeItemId: '42022987590',
    name: 'Semen Nat Tile Grout KIA 1 kg',
    category: 'semen-nat',
    brand: 'KIA',
    price: 20000,
    priceUnit: 'pcs',
    featured: true,
  },
  {
    id: 'granit-lantai-ruangan-60x60-montero',
    shopeeItemId: '43522605440',
    name: 'Granit Lantai Ruangan 60x60 Montero',
    category: 'granit',
    size: '60x60',
    brand: 'Pegasus',
    grade: 'KW1',
    finish: 'Glossy',
    price: 152500,
    priceUnit: 'dus',
    featured: true,
  },
  {
    id: 'pintu-rumah-baja-kayya-03-88x206',
    shopeeItemId: '44862064266',
    name: 'Pintu Rumah Baja KAYYA 03 88x206',
    category: 'pintu',
    brand: 'Kayya',
    price: 1250000,
    priceUnit: 'buah',
    featured: true,
  },
  {
    id: 'granit-lantai-ruangan-60x60-lumino-cream-vellino',
    shopeeItemId: '52361153536',
    name: 'Granit Lantai Ruangan 60x60 Lumino Cream Vellino',
    category: 'granit',
    size: '60x60',
    brand: 'Vellino',
    grade: 'KW1',
    finish: 'Glossy',
    price: 147000,
    priceUnit: 'dus',
    featured: true,
  },
  {
    id: 'keramik-teras-40x40-rocky-series',
    shopeeItemId: '6431468982',
    name: 'Keramik Teras 40x40 Rocky Series',
    category: 'teras',
    size: '40x40',
    brand: 'KIA',
    grade: 'KW1',
    price: 80000,
    priceUnit: 'dus',
    featured: true,
  },
  {
    id: 'keramik-40x40-fremont',
    shopeeItemId: '8574445797',
    name: 'Keramik 40x40 Fremont',
    category: 'lantai',
    size: '40x40',
    brand: 'KIA',
    grade: 'KW1',
    finish: 'Glossy',
    price: 72000,
    priceUnit: 'dus',
    pcsPerBox: 6,
    featured: true,
  },
  {
    id: 'keramik-lantai-rectifed-50x50-calacatta-white',
    shopeeItemId: '9665777701',
    name: 'Keramik Lantai Rectifed 50x50 Calacatta White',
    category: 'lantai',
    size: '50x50',
    brand: 'Concord',
    grade: 'KW1',
    finish: 'Glossy',
    price: 78000,
    priceUnit: 'dus',
    pcsPerBox: 4,
    featured: true,
  },
];

// Foto dibuat oleh `npm run optimize-images` (rasio 1:1)
function withImage(p: ProductInput): Product {
  const detail = [p.finish && `permukaan ${p.finish.toLowerCase()}`, p.brand && `merek ${p.brand}`]
    .filter(Boolean)
    .join(', ');
  return {
    ...p,
    image: {
      src: `/images/produk/${p.id}.webp`,
      thumb: `/images/produk/${p.id}-thumb.webp`,
      alt: detail ? `${p.name}, ${detail}` : p.name,
      width: 800,
      height: 800,
    },
  };
}

// Unggulan tampil lebih dulu, sisanya mengikuti urutan data
export const products: readonly Product[] = [
  ...inputs.filter((p) => p.featured),
  ...inputs.filter((p) => !p.featured),
].map(withImage);

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);
