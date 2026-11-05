// Isi, harga, dan minimal order HANYA dari caption Instagram. Yang tidak tertulis dibiarkan kosong.
// TODO: lengkapi harga dari highlight "PL 2026" dan konfirmasi semua data ke pemilik.
import type { CategorySlug } from './categories';
import manifest from './images.generated.json';

export type MenuImage = { src: string; thumb: string; width: number; height: number; alt: string };

type RawItem = {
  slug: string;
  name: string;
  category: CategorySlug;
  price?: number;
  priceNote?: string;
  unit: string;
  servings?: string;
  contents?: string[];
  minOrder?: number;
  leadTime?: string;
  customizable?: boolean;
  seasonal?: boolean;
  featured?: boolean;
  sourcePost: string;
  altText: string;
};

export type MenuItem = Omit<RawItem, 'altText'> & { images: MenuImage[] };

const NASI = ['Nasi kuning', 'Nasi liwet', 'Nasi jeruk'];
const CENIL = [
  'Jagung',
  'Klepon',
  'Ketan hitam',
  'Sawut',
  'Tiwul',
  'Getuk',
  'Gatot',
  'Cenil',
  'Lupis',
];
const PEMPEK = ['Pempek adaan', 'Pempek lenjer', 'Pempek kapal selam'];
const DIMSUM = ['Dimsum ayam', 'Dimsum jamur', 'Dimsum keju', 'Dimsum mentai'];
const BUBUR = [
  'Bubur sumsum',
  'Bubur candil',
  'Bubur ketan item',
  'Bubur kacang ijo',
  'Bubur mutiara',
  'Bubur merah',
  'Bubur putih',
];

const raw: RawItem[] = [
  {
    slug: 'snack-box',
    name: 'Snack Box',
    category: 'snack',
    unit: 'box',
    customizable: true,
    featured: true,
    sourcePost: 'DfB5xr4k0mG',
    altText: 'Deretan snack box putih berisi aneka kue tradisional',
  },
  {
    slug: 'snack-besekan',
    name: 'Snack Besekan',
    category: 'snack',
    unit: 'besek',
    leadTime: 'H-1',
    customizable: true,
    featured: true,
    sourcePost: 'DfL1y7rEzlh',
    altText: 'Snack dalam besek bambu berisi aneka kue dan minuman',
  },
  {
    slug: 'snack-cup',
    name: 'Snack Cup',
    category: 'snack',
    unit: 'cup',
    customizable: true,
    sourcePost: 'DeqvIXbE69-',
    altText: 'Deretan cup bening berisi kue jajanan pasar',
  },
  {
    slug: 'rantang-jajanan-pasar',
    name: 'Rantang Jajanan Pasar',
    category: 'snack',
    unit: 'rantang',
    servings: 'Isi mulai 10 sampai 40 pcs',
    customizable: true,
    sourcePost: 'DVPlimXE6q7',
    altText: 'Rantang bambu berpita berisi kue jajanan pasar',
  },
  {
    slug: 'tampah-kue-jajanan-pasar',
    name: 'Tampah Kue Jajanan Pasar',
    category: 'tampah',
    unit: 'tampah',
    servings: 'Ukuran kecil, sedang, dan besar',
    leadTime: 'H-1',
    customizable: true,
    featured: true,
    sourcePost: 'De_RQ9TE5IW',
    altText: 'Tampah bambu berhias daun pisang berisi aneka kue jajanan pasar',
  },
  {
    slug: 'tampah-merah-putih',
    name: 'Tampah Merah Putih',
    category: 'tampah',
    unit: 'tampah',
    contents: [
      'Kue serabi',
      'Putu mayang',
      'Putu ayu',
      'Talam',
      'Lapis beras',
      'Lapis pepe',
      'Kue ku',
      'Mangkok warna',
    ],
    seasonal: true,
    sourcePost: 'DcC-W7nk_0E',
    altText: 'Tampah kue tradisional bernuansa merah putih',
  },
  {
    slug: 'tampah-rebusan',
    name: 'Tampah Rebusan',
    category: 'tampah',
    unit: 'tampah',
    sourcePost: 'DUphiQ5ExMX',
    altText: 'Tampah daun pisang berisi aneka rebusan',
  },
  {
    slug: 'tampah-rujak',
    name: 'Tampah Rujak Buah',
    category: 'tampah',
    unit: 'tampah',
    sourcePost: 'DUpi8QRE3EY',
    altText: 'Tampah berisi potongan buah segar untuk rujak',
  },
  {
    slug: 'nasi-tumpeng',
    name: 'Nasi Tumpeng',
    category: 'nasi',
    price: 750000,
    priceNote: 'mulai dari',
    unit: 'paket',
    servings: '10 pax',
    contents: [...NASI, 'Nasi bogana', 'Nasi gudeg'],
    leadTime: 'H-1',
    featured: true,
    sourcePost: 'Ded5jqlk3Um',
    altText: 'Nasi tumpeng kuning di tampah dengan lauk dan hiasan bunga',
  },
  {
    slug: 'nasi-box',
    name: 'Nasi Box',
    category: 'nasi',
    price: 50000,
    priceNote: 'mulai dari',
    unit: 'box',
    contents: NASI,
    leadTime: 'H-1',
    sourcePost: 'Ded6BJMEw5l',
    altText: 'Nasi box dengan lauk dalam kotak',
  },
  {
    slug: 'nasi-besek',
    name: 'Nasi Besek',
    category: 'nasi',
    price: 55000,
    priceNote: 'mulai dari',
    unit: 'besek',
    contents: [...NASI, 'Nasi bogana'],
    minOrder: 15,
    leadTime: 'H-1',
    featured: true,
    sourcePost: 'Ded5yi2EziS',
    altText: 'Nasi dan lauk dalam besek bambu',
  },
  {
    slug: 'nasi-cup',
    name: 'Nasi Cup',
    category: 'nasi',
    price: 35000,
    priceNote: 'mulai dari',
    unit: 'cup',
    contents: NASI,
    minOrder: 20,
    leadTime: 'H-1',
    sourcePost: 'Ded6vqkTRvS',
    altText: 'Nasi dan lauk dalam mangkok kertas',
  },
  {
    slug: 'nasi-rantang',
    name: 'Nasi Rantang',
    category: 'nasi',
    price: 415000,
    priceNote: 'mulai dari',
    unit: 'rantang',
    servings: '5-6 pax',
    contents: NASI,
    leadTime: 'H-1',
    sourcePost: 'Ded6lmYzHrA',
    altText: 'Nasi dan lauk dalam rantang bambu',
  },
  // TODO: caption menulis Rp345.000/pax, kemungkinan salah tulis, konfirmasi dulu sebelum ditampilkan
  {
    slug: 'nasi-bakul',
    name: 'Nasi Bakul',
    category: 'nasi',
    unit: 'bakul',
    contents: NASI,
    leadTime: 'H-1',
    sourcePost: 'Ded66ysTj0K',
    altText: 'Nasi dan lauk ditata dalam bakul bambu',
  },
  {
    slug: 'tumpeng-cenil',
    name: 'Tumpeng Cenil',
    category: 'cenil',
    unit: 'tampah',
    contents: CENIL,
    leadTime: 'H-1',
    featured: true,
    sourcePost: 'DfOvxwRk4-k',
    altText: 'Tumpeng cenil warna-warni di tampah daun pisang',
  },
  {
    slug: 'tampah-cenil-set',
    name: 'Tampah Cenil Set',
    category: 'cenil',
    unit: 'tampah',
    servings: 'Ukuran kecil, sedang, dan besar',
    contents: ['Cenil', 'Tiwul', 'Sawut', 'Getuk', 'Ketan item', 'Lupis'],
    leadTime: 'H-1',
    sourcePost: 'DeWOx5rk18E',
    altText: 'Tampah berisi aneka cenil, tiwul, dan getuk',
  },
  {
    slug: 'cenil-besek',
    name: 'Cenil Besek',
    category: 'cenil',
    unit: 'besek',
    sourcePost: 'DfOwO3qE3Z6',
    altText: 'Cenil dalam besek bambu berhias daun',
  },
  {
    slug: 'cenil-cup',
    name: 'Cenil Cup',
    category: 'cenil',
    unit: 'cup',
    sourcePost: 'DfRKMrXE4C1',
    altText: 'Deretan cup bening berisi cenil warna-warni',
  },
  {
    slug: 'pempek-tampah',
    name: 'Pempek Tampah',
    category: 'pempek',
    unit: 'tampah',
    contents: PEMPEK,
    sourcePost: 'DfTwjqME-BC',
    altText: 'Tampah berisi pempek dengan selada',
  },
  {
    slug: 'pempek-besek',
    name: 'Pempek Besek',
    category: 'pempek',
    unit: 'besek',
    contents: PEMPEK,
    sourcePost: 'DfTw-ewE4f0',
    altText: 'Pempek dengan botol cuko dalam besek',
  },
  {
    slug: 'pempek-rantang',
    name: 'Pempek Rantang',
    category: 'pempek',
    unit: 'rantang',
    contents: PEMPEK,
    sourcePost: 'DebRIJsky3f',
    altText: 'Pempek dalam rantang bambu',
  },
  {
    slug: 'dimsum-tampah',
    name: 'Dimsum Tampah',
    category: 'dimsum',
    unit: 'tampah',
    contents: DIMSUM,
    featured: true,
    sourcePost: 'DfRVMFKE4Cj',
    altText: 'Tampah berisi aneka dimsum dengan selada',
  },
  {
    slug: 'dimsum-besek-cup',
    name: 'Dimsum Besek & Cup',
    category: 'dimsum',
    unit: 'besek',
    contents: DIMSUM,
    sourcePost: 'DfRVoycE9jr',
    altText: 'Dimsum dalam besek dan cup',
  },
  {
    slug: 'dimsum-rantang',
    name: 'Dimsum Rantang',
    category: 'dimsum',
    unit: 'rantang',
    contents: DIMSUM,
    sourcePost: 'DfRVxUoE1al',
    altText: 'Dimsum dalam rantang bambu berpita',
  },
  {
    slug: 'tampah-bubur-kendil',
    name: 'Tampah Bubur Kendil',
    category: 'bubur',
    unit: 'tampah',
    contents: BUBUR,
    sourcePost: 'DeLrMXxTUk1',
    altText: 'Tampah berisi bubur manis dalam kendil tanah liat',
  },
  {
    slug: 'bubur-manis-cup',
    name: 'Bubur Manis Cup',
    category: 'bubur',
    unit: 'cup',
    contents: BUBUR,
    sourcePost: 'DeL6cunE363',
    altText: 'Aneka bubur manis dalam cup bening',
  },
  {
    slug: 'serabi-tart',
    name: 'Serabi Tart',
    category: 'kue',
    unit: 'pcs',
    sourcePost: 'DUpkw5XkyCI',
    altText: 'Serabi warna-warni ditata melingkar seperti tart',
  },
  {
    slug: 'onde-tart',
    name: 'Onde Tart',
    category: 'kue',
    unit: 'pcs',
    sourcePost: 'DUpk4AEkxW5',
    altText: 'Onde-onde warna-warni disusun seperti tart',
  },
  {
    slug: 'lapis-legit',
    name: 'Lapis Legit Full Plum',
    category: 'kue',
    unit: 'pcs',
    sourcePost: 'DUpfln6k_WP',
    altText: 'Lapis legit dengan taburan plum',
  },
  {
    slug: 'hantaran-rantang-cantik',
    name: 'Hantaran Rantang Cantik',
    category: 'hantaran',
    unit: 'rantang',
    contents: ['Kemasan box, besek, atau rantang', 'Kartu ucapan dan warna pita bisa dipilih'],
    leadTime: 'H-1',
    customizable: true,
    sourcePost: 'DeikNwAk64v',
    altText: 'Rantang bambu berpita berisi kue untuk hantaran',
  },
  {
    slug: 'hantaran-lamaran',
    name: 'Hantaran Lamaran',
    category: 'hantaran',
    unit: 'paket',
    contents: [
      'Pisang sanggan',
      'Wajik',
      'Ketan uli',
      'Aneka kue jajanan pasar',
      'Ayam kodok / galantine',
      'Buah-buahan',
      'Pudding buah',
      'Lasagna',
      'Macaroni schotel',
      'Lapis legit full plum',
      'Lapis Surabaya',
      'Mocca nougat cake',
    ],
    customizable: true,
    featured: true,
    sourcePost: 'Dch0eo5E9P3',
    altText: 'Hantaran lamaran dalam kotak berpita emas berisi kue dan buah',
  },
  {
    slug: 'hampers-takjil-ramadhan',
    name: 'Hampers Takjil Ramadhan',
    category: 'hantaran',
    unit: 'paket',
    customizable: true,
    seasonal: true,
    sourcePost: 'DUsHrUwEzNX',
    altText: 'Hampers takjil dengan aneka kue jajanan pasar bernuansa Ramadhan',
  },
];

const images = manifest as Record<string, Omit<MenuImage, 'alt'>[]>;

export const menu: MenuItem[] = raw.map(({ altText, ...item }) => ({
  ...item,
  images: (images[item.slug] ?? []).map((img, i) => ({
    ...img,
    alt: i === 0 ? altText : `${altText}, foto ${i + 1}`,
  })),
}));

export const getItem = (slug: string) => menu.find((m) => m.slug === slug);

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});
export const formatRupiah = (n: number) => rupiah.format(n);

export const priceLabel = (m: MenuItem) =>
  m.price ? `${m.priceNote ? `${m.priceNote} ` : ''}${formatRupiah(m.price)}` : 'Tanya harga';
