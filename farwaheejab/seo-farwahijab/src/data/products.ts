// Data produk. Sumber utama: halaman produk Shopee (nama, harga, warna, ukuran, bahan);
// caption Instagram sebagai pelengkap. Rating, ulasan, stok, dan jumlah terjual sengaja TIDAK disalin.
// Urutan foto galeri harus sama dengan scripts/products.manifest.mjs.
import type { CategorySlug } from './categories';
import { colorHex } from './colors';
import imageSizes from './images.generated.json';

export type ProductImage = {
  src: string;
  /** Versi kecil untuk grid (lebar 480px) */
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductColor = { name: string; hex: string; image?: ProductImage };

export type ProductSize = { name: string; price: number; detail: string };

export type Product = {
  slug: string;
  name: string;
  /** Nama pendek untuk kartu & pesan WA */
  shortName: string;
  category: CategorySlug;
  /** Harga eceran di Shopee (rupiah). Untuk produk ber-ukuran, harga termurah */
  priceRetail: number;
  sizes?: readonly ProductSize[];
  /** Harga grosir via WhatsApp (bukan Shopee) */
  priceWholesale?: number;
  wholesaleMinQty?: number;
  colors: readonly ProductColor[];
  material: string;
  size: string;
  description: string;
  highlights: readonly string[];
  howToUse?: string;
  note?: string;
  images: readonly ProductImage[];
  shopeeUrl: string;
  featured: boolean;
  soldOut?: boolean;
};

type ProductInput = Omit<Product, 'images' | 'colors'> & {
  gallery: readonly string[];
  /** Nama warna persis seperti di Shopee */
  colorNames: readonly string[];
  /** Kalimat alt untuk foto per warna, {warna} diganti nama warna */
  colorAlt: string;
};

const sizes: Record<string, { width: number; height: number }> = imageSizes;
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function image(slug: string, name: string, alt: string): ProductImage | undefined {
  const base = `/images/produk/${slug}/${name}`;
  const size = sizes[`${base}.webp`];
  return size ? { src: `${base}.webp`, thumb: `${base}-thumb.webp`, alt, ...size } : undefined;
}

function build(input: ProductInput): Product {
  const { gallery, colorNames, colorAlt, ...rest } = input;
  const images = gallery.map((alt, i) => {
    const img = image(rest.slug, `${rest.slug}-${i + 1}`, alt);
    if (!img)
      throw new Error(`Foto ${rest.slug}-${i + 1} belum ada. Jalankan npm run optimize-images.`);
    return img;
  });
  const colors = colorNames.map((name) => ({
    name,
    hex: colorHex(name),
    image: image(rest.slug, `${rest.slug}-${slugify(name)}`, colorAlt.replace('{warna}', name)),
  }));
  return { ...rest, images, colors };
}

const shopee = (id: string) => `https://shopee.co.id/product/178452541/${id}`;

const inputs: readonly ProductInput[] = [
  {
    slug: 'syaima-khiban-voal-miracle',
    name: 'Syaima Khiban Khimar Bandana Voal Miracle',
    shortName: 'Syaima Khiban',
    category: 'khimar-khiban',
    priceRetail: 69000, // Shopee (IG: harga Shopee = harga satuan + 25% biaya admin)
    priceWholesale: 52000, // via WA, IG 22 Mei 2026
    wholesaleMinQty: 10,
    material: 'Voal Miracle premium',
    size: '140 × 140 cm (toleransi jahitan 2 cm), lebar bandana ±8 cm', // TODO: poster 22 Mei menulis 130×130 cm
    description:
      'Khimar instan syar’i yang lagi trending: look-nya syar’i tapi tetap bisa dipadukan dengan outfit kekinian. Pakai sendiri atau dijual lagi, sama-sama oke.',
    highlights: [
      'Model bandana, sat-set dipakai',
      'Lembut, tidak bikin sakit di telinga',
      'Aman dijual kembali',
    ],
    howToUse:
      'Pasang bagian bandana di dahi, rapikan sisi kanan-kiri, lalu atur jatuhnya kain di depan. Tutorial lengkap ada di Instagram @farwaheejab.',
    note: 'Pilihan warna lengkap tanyakan ke admin ya, Kak.', // TODO: daftar warna Syaima
    shopeeUrl: shopee('55910337475'),
    featured: true,
    gallery: [
      'Dua model memakai khiban voal warna terracotta dan nude',
      'Model memakai khiban voal warna terracotta tampak samping',
      'Model memakai khiban voal warna nude dengan atasan hitam',
      'Tumpukan khiban voal miracle beragam warna lembut',
      'Detail bandana khiban voal warna dusty pink',
    ],
    colorNames: [],
    colorAlt: '',
  },
  {
    slug: 'naima-plain-hijab-syari',
    name: 'Naima Plain Hijab Syar’i Arabian Voal Premium',
    shortName: 'Naima Plain Syar’i',
    category: 'segi-empat',
    priceRetail: 65000, // Shopee (IG & deskripsi: best price Rp55.000 via WA)
    material: 'Arabian Voile Premium',
    size: '±140 × 140 cm',
    description:
      'Hijab segi empat syar’i dengan serat padat dan halus. Tidak nerawang, mudah dibentuk, dengan jahit tepi yang rapi. Tanpa label, aman untuk dijual kembali.',
    highlights: ['Tidak nerawang', 'Mudah dibentuk', 'Jahit tepi rapi'],
    note: 'Kemiripan warna ±95% karena efek cahaya saat foto.',
    shopeeUrl: shopee('24748196460'),
    featured: true,
    gallery: [
      'Model memakai hijab syar’i Naima warna misty grey',
      'Model memakai hijab syar’i Naima warna oatmilk',
      'Model memakai hijab syar’i Naima warna burgundy',
      'Model memakai hijab syar’i Naima warna denim',
      'Model memakai hijab syar’i Naima warna hitam',
      'Dua model memakai hijab Naima warna mauve dan oatmilk',
      'Dua model memakai hijab Naima dengan atasan putih dan hitam',
    ],
    colorNames: [
      'Black',
      'Navy',
      'Oatmilk',
      'Misty Grey',
      'Mauve',
      'Wallnut',
      'Toffee',
      'Tortilla',
      'Denim',
      'Royal Blue',
      'Teracotta',
      'Bw',
      'Burgundy',
    ],
    colorAlt: 'Hijab Naima voal warna {warna} dilipat rapi',
  },
  {
    slug: 'aisha-bergo-bando',
    name: 'Aisha Bergo Bando Rayon Viscose Tali Belakang',
    shortName: 'Aisha Bergo Bando',
    category: 'hijab-instan',
    priceRetail: 34900,
    sizes: [
      // TODO: Shopee menulis ukuran S & M terbalik; ini mengikuti gambar "Detail size" di Instagram.
      // TODO: konfirmasi harga per ukuran (Shopee: Rp34.900–Rp39.900)
      { name: 'S', price: 34900, detail: 'Panjang depan 55 cm, belakang 65 cm' },
      { name: 'M', price: 39900, detail: 'Panjang depan 63 cm, belakang 75 cm' },
    ],
    material: 'Rayon viscose',
    size: 'S & M',
    description:
      'Bergo bando super comfortable dengan tali di belakang untuk menyesuaikan pas di kepala. Ringan, adem, dan praktis untuk dipakai seharian.',
    highlights: ['Tersedia ukuran S & M', 'Tali belakang bisa diatur', 'Ringan & adem'],
    shopeeUrl: shopee('53967617507'),
    featured: true,
    gallery: [
      'Model memakai bergo Aisha warna ivory',
      'Model memakai bergo Aisha warna ice grey',
      'Model memasang tali belakang bergo Aisha warna nude pink',
      'Model memakai bergo Aisha warna ivory tampak samping',
      'Bergo Aisha warna almond di manekin',
    ],
    colorNames: [
      'Black',
      'Navy',
      'Nudepink',
      'Mahogany',
      'Vanilla',
      'Mushroom',
      'Almond',
      'Ice grey',
      'Ivory',
      'Mauve',
      'Rosenude',
      'Taro',
      'Truffle',
      'Bw',
      'Peach',
      'Butter',
      'Khaki',
    ],
    colorAlt: 'Model memakai bergo Aisha warna {warna}',
  },
  {
    slug: 'mayra-twotone-instant',
    name: 'Mayra Twotone Hijab Instant Bandana',
    shortName: 'Mayra Twotone',
    category: 'hijab-instan',
    priceRetail: 42900,
    material: 'Rayon viscose',
    size: 'Panjang depan 52 cm, belakang 63 cm, lebar bandana 4 cm, lingkar wajah 52 cm',
    description:
      'Hijab instan dua warna dengan bandana kontras yang bikin wajah terlihat lebih segar. Praktis dipakai dan gampang dipadukan.',
    highlights: ['Dua warna dalam satu hijab', 'Bandana 4 cm', 'Rayon viscose yang adem'],
    note: 'Tersedia juga inner cepol (cek harga di Shopee).',
    shopeeUrl: shopee('56269257055'),
    featured: true,
    gallery: [
      'Model memakai hijab twotone Mayra warna pink lemonade',
      'Model memakai hijab twotone Mayra warna rose nude',
      'Dua model memakai hijab twotone Mayra warna taro cream',
    ],
    colorNames: [
      'Rose nude',
      'Black cream',
      'Strawberry ice',
      'Pink lemonade',
      'Mushroom',
      'Taro cream',
      'Black forest',
      'Cookies n cream',
      'Broken white',
      'Truffle',
    ],
    colorAlt: 'Model memakai hijab twotone Mayra warna {warna}',
  },
  {
    slug: 'maryam-bergo-karet-dagu',
    name: 'Maryam Bergo Instan Karet Dagu Rayon Viscose',
    shortName: 'Maryam Bergo',
    category: 'hijab-instan',
    priceRetail: 34900,
    sizes: [
      { name: 'S', price: 34900, detail: 'Panjang depan 51 cm, belakang 54 cm' },
      { name: 'M', price: 34900, detail: 'Panjang depan 38 cm, belakang 65 cm' },
    ],
    material: 'Rayon viscose (spandex)', // TODO: spesifikasi size M menulis ceruty/rayon cooltech/soft bamboo
    size: 'S & M',
    description:
      'Bergo praktis dengan karet di bagian dagu supaya hijab tetap rapi tanpa banyak peniti. Bahannya ringan, lembut, dan mudah dibentuk.',
    highlights: ['Karet dagu nyaman', 'Tanpa banyak peniti', 'Cocok untuk daily wear'],
    note: 'Pilihan warna size S dan M sedikit berbeda, cek ketersediaan ke admin ya.',
    shopeeUrl: shopee('57269461918'), // size M: shopee('45618924048')
    featured: false,
    gallery: [
      'Model memakai bergo Maryam warna mauve',
      'Model memakai bergo Maryam warna milk cream',
    ],
    colorNames: [
      'Black',
      'Broken White',
      'Butter Yellow',
      'Mauve',
      'Truffel',
      'Taro',
      'Rose Nude',
      'Vanilla',
      'Ivory',
      'Peach',
      'Khaki',
      'Maroon',
      'Ice Grey',
      'Blush Pink',
      'Oat',
      'Frappucino',
      'Ash Brown',
      'Mahogany',
      'Milk Cream',
      'Cookies',
      'Nude Pink',
      'Expresso',
    ],
    colorAlt: 'Model memakai bergo Maryam warna {warna}',
  },
  {
    slug: 'rania-bergo-tali',
    name: 'Rania Bergo Instan Tali Kecil Rayon Viscose',
    shortName: 'Rania Bergo Tali',
    category: 'hijab-instan',
    priceRetail: 34900,
    material: 'Rayon viscose',
    size: 'Panjang depan 42 cm, belakang 52 cm, lebar pet 7 cm, lingkar wajah 54 cm',
    description:
      'Bergo instan dengan tali kecil untuk menyesuaikan agar lebih pas di kepala. Ringan, adem, dan motif polos yang gampang dipadukan.',
    highlights: ['Tali kecil penyesuai', 'Pet 7 cm', 'Polos & mudah dipadukan'],
    note: 'Tersedia juga inner cepol (cek harga di Shopee).',
    shopeeUrl: shopee('49519274123'),
    featured: false,
    gallery: [
      'Model memakai bergo Rania warna broken white',
      'Model memakai bergo Rania warna mauve',
    ],
    colorNames: [
      'Black',
      'Broken White',
      'Butter Yellow',
      'Mauve',
      'Truffel',
      'Taro',
      'Peach',
      'Rose Nude',
      'Ivory',
      'Vanilla',
      'Mushroom',
      'Khaki',
    ],
    colorAlt: 'Model memakai bergo Rania warna {warna}',
  },
  {
    slug: 'nazira-pashmina-rayon',
    name: 'Nazira Pashmina Rayon Tencel Premium',
    shortName: 'Nazira Pashmina',
    category: 'pashmina',
    priceRetail: 34900,
    material: 'Rayon viscose',
    size: '176 × 63 cm',
    description:
      'Pashmina rayon viscose yang lembut, ringan, dan nyaman dipakai seharian. Teksturnya jatuh, flowy, dan mudah dibentuk.',
    highlights: ['Jatuh & flowy', 'Ringan dipakai seharian', 'Ukuran 176 × 63 cm'],
    shopeeUrl: shopee('50268884141'),
    featured: false,
    gallery: [
      'Model memakai pashmina Nazira warna butter',
      'Model memakai pashmina Nazira warna hazelnut',
    ],
    colorNames: [
      'Soft Pink',
      'Frappucino',
      'Hazelnut',
      'Mocca',
      'Mahogany',
      'Grey',
      'Butter',
      'Navy',
      'Broken White',
      'Burgundy',
    ],
    colorAlt: 'Model memakai pashmina Nazira warna {warna}',
  },
];

export const products: readonly Product[] = inputs.map(build);

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Produk terkait: kategori sama dulu, lalu sisanya */
export function relatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, limit);
}

/** Semua nama warna unik (untuk filter katalog) */
export const allColors: readonly { name: string; hex: string }[] = [
  ...new Map(
    products
      .flatMap((p) => p.colors)
      .map((c) => [c.name.toLowerCase(), { name: c.name, hex: c.hex }]),
  ).values(),
].sort((a, b) => a.name.localeCompare(b.name));

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});
export const formatRupiah = (n: number) => rupiah.format(n);
