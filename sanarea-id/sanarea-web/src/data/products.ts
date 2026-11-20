// Katalog SANARÉA. Sumber: teks di story highlight & caption postingan IG @sanarea.id.
// Nama warna disalin dari label di foto. Harga hanya yang tertulis jelas; sisanya TODO (tampil "Tanya harga").
import { img } from './images';
import type { Color, Img, Product } from './types';

// Perkiraan visual warna dari foto (bukan kode warna resmi)
const hex: Record<string, string> = {
  ivory: '#ebe6dc',
  biscuit: '#d9cdbb',
  latte: '#b9a48e',
  frappuccino: '#9e8a7a',
  espresso: '#6b564c',
  'rose wood': '#a88a86',
  hazelnut: '#8f7466',
  mahogany: '#4a2a2e',
  'baby pink': '#e3d0d2',
  'dusty pink': '#c49aa6',
  'blush pink': '#d4a8b2',
  'soft pink': '#c897a6',
  'butter yellow': '#efe6c2',
  matcha: '#b9c7bb',
  'ash grey': '#a7a6a6',
  silver: '#bfc0c4',
  denim: '#6d7f9b',
  navy: '#20253d',
  bw: '#f4f2ee',
  black: '#1b1b1d',
  burgundy: '#5d1f33',
  chestnut: '#7a5a4c',
  'smoke beige': '#c8bcb4',
  walnut: '#5e4840',
  choco: '#5d4840',
  cream: '#eadcc4',
  dusty: '#b9909c',
  'pink peach': '#e3bfb4',
  wine: '#4e1f2c',
  grey: '#8e8c8f',
  'rose pink': '#b98593',
  pistachio: '#6f6b2f',
  vanilla: '#e2d7c6',
  'soft blue': '#a9c1d3',
  'dark grey': '#4d4b52',
  sand: '#bfae9c',
  chocomilk: '#c2a993',
  oat: '#d8ccbd',
  earth: '#5c4a42',
  beige: '#d7c8b4',
  'dark navy': '#15182a',
  taupe: '#8a7b78',
  mauve: '#7e5e66',
  'soft latte': '#cfc4b5',
  pastel: '#ece4d6',
  skin: '#cdb59c',
  'sand beige': '#bfb3a3',
  fossil: '#a59a8c',
  moccacino: '#8e7a66',
  peanut: '#a18566',
  mocca: '#7b6553',
  brownie: '#5f4b3e',
  peach: '#e2c0ac',
  'soft cream': '#ece2d2',
  'pink salt': '#d9b4a8',
  coksu: '#b08c74',
  'dark cocoa': '#3b2622',
  'rich brown': '#7b5a45',
  'midnight blue': '#33445e',
  'ash brown': '#77706b',
  charcoal: '#4b4b50',
  'dusty rose': '#b48d96',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
function colors(names: string[], images: Record<string, Img> = {}): Color[] {
  return names.map((name) => ({
    name: name.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/^Bw$/, 'BW'),
    slug: slugify(name),
    hex: hex[name.toLowerCase().split(' - ')[0] ?? ''] ?? '#cfc8c0',
    images: images[name] ? [images[name]] : undefined,
  }));
}
/** Warna dua tone: swatch memakai warna pertama */
function twoTone(pairs: [string, string][], images: Record<string, Img>): Color[] {
  return pairs.map(([a, b]) => {
    const name = `${a} - ${b}`;
    return {
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      slug: slugify(name),
      hex: hex[a] ?? '#cfc8c0',
      images: images[name] ? [images[name]] : undefined,
    };
  });
}

const printed = {
  'rich brown': img(
    'produk/printed-rich-brown',
    'Model memakai pashmina viscose motif marmer warna Rich Brown dari Printed Shawl',
  ),
  'midnight blue': img(
    'produk/printed-midnight-blue',
    'Model memakai pashmina viscose motif marmer biru tua Midnight Blue',
  ),
  'ash brown': img(
    'produk/printed-ash-brown',
    'Model memakai pashmina viscose motif marmer abu kecokelatan Ash Brown',
  ),
  charcoal: img(
    'produk/printed-charcoal',
    'Tampak belakang pashmina viscose motif marmer warna Charcoal',
  ),
  'dusty rose': img(
    'produk/printed-dusty-rose',
    'Model memakai pashmina viscose motif marmer merah muda keabuan Dusty Rose',
  ),
};
const kaleea = {
  vanilla: img('produk/kaleea-vanilla', 'Model memakai Kaleea Khiban Viscose warna Vanilla'),
  frappuccino: img(
    'produk/kaleea-frappuccino',
    'Model memakai Kaleea Khiban Viscose warna Frappuccino, tampak samping',
  ),
  espresso: img('produk/kaleea-espresso', 'Dua model memakai Kaleea Khiban Viscose warna Espresso'),
  'dark cocoa': img(
    'produk/kaleea-dark-cocoa',
    'Model memakai Kaleea Khiban Viscose warna Dark Cocoa',
  ),
  ivory: img(
    'produk/kaleea-ivory',
    'Model memakai Kaleea Khiban Viscose warna Ivory, tampak depan dan samping',
  ),
};
const twoToneImg = {
  'pistachio - mahogany': img(
    'produk/twotone-pistachio-mahogany',
    'Dua manekin memakai khiban two tone Pistachio - Mahogany',
  ),
  'wine - soft pink': img(
    'produk/twotone-wine-soft-pink',
    'Dua manekin memakai khiban two tone Wine - Soft Pink',
  ),
  'vanilla - walnut': img(
    'produk/twotone-vanilla-walnut',
    'Dua manekin memakai khiban two tone Vanilla - Walnut',
  ),
  'black - ivory': img(
    'produk/twotone-black-ivory',
    'Dua manekin memakai khiban two tone Black - Ivory',
  ),
  'silver - navy': img(
    'produk/twotone-silver-navy',
    'Dua manekin memakai khiban two tone Silver - Navy',
  ),
};

export const products: readonly Product[] = [
  {
    slug: 'printed-shawl-marble',
    name: 'Viscose Printed · Marble Series',
    collection: 'printed-shawl',
    category: 'shawl',
    price: 89000, // Story highlight "Printed Shawl": IDR 89,000 (TODO: konfirmasi harga terbaru)
    colors: colors(
      [
        'rich brown',
        'midnight blue',
        'ash brown',
        'charcoal',
        'dusty rose',
        'ivory',
        'soft blue',
        'rose pink',
        'soft pink',
      ],
      printed,
    ),
    material: 'Viscose Premium',
    size: '175 × 75 cm',
    notes: 'Motif marmer dengan nuansa earthy yang lembut. Tersedia 50+ motif di toko.',
    images: [
      printed['rich brown'],
      img(
        'produk/printed-swatch',
        'Lipatan pashmina motif marmer warna Ivory, Soft Blue, Charcoal, Rose Pink, dan Soft Pink',
      ),
    ],
    featured: true,
    sourceFolders: ['sorotan_Printed Shawl', '2026-09-18_Dda88IjGe2V', '2026-09-18_DdbP2PImc7T'],
  },
  {
    slug: 'kaleea-khiban-viscose',
    name: 'Kaleea Khiban Viscose',
    collection: 'khiban-viscose',
    category: 'khimar',
    price: 85000, // Story: "only 85k, spesial paket bundling 164k get 2" (TODO: konfirmasi)
    colors: colors(['vanilla', 'frappuccino', 'espresso', 'dark cocoa', 'ivory'], kaleea),
    material: 'Viscose Premium',
    size: '135 × 135 cm',
    notes: 'Lembut, flowy, ringan, dan nyaman dipakai seharian.',
    images: [kaleea.vanilla],
    featured: true,
    sourceFolders: ['sorotan_Khiban Viscose', '2026-09-24_DdqYrfPIMZM', '2026-10-26_De9iJOVmUiv'],
  },
  {
    slug: 'naleea-khiban-rayon',
    name: 'Naleea Khiban Rayon Shawl',
    collection: 'khiban-rayon',
    category: 'khimar',
    price: 68000, // Story: "spesial price 68k" (TODO: konfirmasi harga normal)
    colors: colors([
      'espresso',
      'frappuccino',
      'latte',
      'biscuit',
      'ivory',
      'vanilla',
      'mahogany',
      'walnut',
      'hazelnut',
      'rose wood',
      'soft pink',
      'blush pink',
      'dusty pink',
      'butter yellow',
      'soft blue',
      'dark grey',
      'smoke beige',
      'black',
      'wine',
      'bw',
      'navy',
      'denim',
      'silver',
    ]),
    material: 'Rayon Premium',
    size: '120 × 120 cm',
    notes: 'Lembut, adem, ringan, dan flowy. Best selling shade: Espresso & Walnut.',
    images: [
      img('produk/naleea-model', 'Dua model memakai Naleea Khiban Rayon warna pink lembut'),
      img(
        'produk/naleea-espresso-walnut',
        'Dua manekin memakai Naleea Khiban Rayon warna Espresso dan Walnut',
      ),
      img(
        'produk/naleea-earth',
        'Lipatan Naleea Khiban Rayon warna earth tone berlabel nama warna',
      ),
      img(
        'produk/naleea-colors',
        'Lipatan Naleea Khiban Rayon warna pastel dan gelap berlabel nama warna',
      ),
    ],
    featured: true,
    sourceFolders: ['sorotan_Khiban Rayon', '2026-10-27_De-zSBrmRHD'],
  },
  {
    slug: 'naleea-khiban-two-tone',
    name: 'Naleea Khiban Two Tone',
    collection: 'two-tone',
    category: 'khimar',
    colors: twoTone(
      [
        ['pistachio', 'mahogany'],
        ['wine', 'soft pink'],
        ['vanilla', 'walnut'],
        ['black', 'ivory'],
        ['silver', 'navy'],
      ],
      twoToneImg,
    ),
    // TODO: harga, bahan, dan ukuran Two Tone belum tertulis di story
    images: [img('produk/twotone-cover', 'Manekin memakai Naleea Khiban Two Tone warna cokelat')],
    featured: true,
    sourceFolders: ['sorotan_Two Tone'],
  },
  {
    slug: 'seera-shawl',
    name: 'Seera Shawl',
    collection: 'seera-shawl',
    category: 'shawl',
    // TODO: harga & ukuran Seera Shawl belum tertulis di story
    colors: colors([
      'ivory',
      'biscuit',
      'latte',
      'frappuccino',
      'espresso',
      'rose wood',
      'hazelnut',
      'mahogany',
      'baby pink',
      'dusty pink',
      'blush pink',
      'soft pink',
      'butter yellow',
      'matcha',
      'ash grey',
      'silver',
      'denim',
      'navy',
      'bw',
      'black',
    ]),
    material: 'Pashmina Rayon Tencel',
    notes: 'Tersedia dari warna pastel lembut sampai netral klasik.',
    images: [
      img('produk/seera-earth', 'Tumpukan Seera Shawl warna earth tone di atas meja putih'),
      img(
        'produk/seera-neutral',
        'Tumpukan Seera Shawl warna ivory sampai mahogany berlabel nama warna',
      ),
      img('produk/seera-pastel', 'Tumpukan Seera Shawl warna pastel berlabel nama warna'),
      img(
        'produk/seera-cool',
        'Tumpukan Seera Shawl warna abu, biru, dan hitam berlabel nama warna',
      ),
      img('produk/seera-rack', 'Deretan Seera Shawl berbagai warna di rak toko'),
    ],
    featured: true,
    sourceFolders: ['sorotan_Seera Shawl'],
  },
  {
    slug: 'eleera-viscose-shawl',
    name: 'Eleera Viscose Shawl',
    collection: 'eleera-viscose',
    category: 'shawl',
    // TODO: harga & ukuran Eleera belum tertulis di story
    colors: colors([
      'mahogany',
      'choco',
      'sand',
      'chocomilk',
      'oat',
      'vanilla',
      'espresso',
      'earth',
      'frappuccino',
      'latte',
      'beige',
      'ivory',
      'burgundy',
      'bw',
      'black',
      'grey',
      'silver',
      'dark navy',
      'soft blue',
      'denim',
      'blush pink',
      'baby pink',
      'rose pink',
      'soft pink',
      'taupe',
      'mauve',
    ]),
    material: 'Viscose',
    notes: 'Padukan dengan Magnetic Pin agar tidak mudah bergeser.',
    images: [
      img('produk/eleera-cover', 'Lipatan Eleera Viscose Shawl berbagai warna di lantai beton'),
      img('produk/eleera-brown', 'Lipatan Eleera Viscose Shawl warna Mahogany sampai Vanilla'),
      img('produk/eleera-earth', 'Lipatan Eleera Viscose Shawl warna Espresso sampai Ivory'),
      img('produk/eleera-cool', 'Lipatan Eleera Viscose Shawl warna Burgundy sampai Denim'),
      img('produk/eleera-pink', 'Lipatan Eleera Viscose Shawl warna pink sampai Mauve'),
    ],
    featured: false,
    sourceFolders: ['sorotan_Eleera Viscose'],
  },
  {
    slug: 'plain-paris-basic',
    name: 'Plain Paris Basic',
    collection: 'paris-basic',
    category: 'shawl',
    price: 35000, // Story: "only 35k, promo bundling 100k get 3" (TODO: konfirmasi)
    colors: colors([
      'soft latte',
      'pastel',
      'vanilla',
      'cream',
      'ivory',
      'skin',
      'smoke beige',
      'sand beige',
      'taupe',
      'fossil',
      'moccacino',
      'peanut',
      'mocca',
      'brownie',
      'peach',
      'soft cream',
      'pink salt',
      'coksu',
    ]),
    material: 'Paris mixed voal: ringan, tipis, lembut, mudah dibentuk',
    size: '115 × 115 cm',
    notes: 'Finishing lebih rapi dan rapat.',
    images: [
      img('produk/paris-cover', 'Lipatan Plain Paris Basic warna netral berlabel nama warna'),
      img('produk/paris-earth', 'Tumpukan Plain Paris Basic warna earth tone berlabel nama warna'),
      img(
        'produk/paris-pink',
        'Lipatan Plain Paris Basic warna Peach, Soft Cream, Pink Salt, dan Coksu',
      ),
      img('produk/paris-detail', 'Detail kain Plain Paris Basic dengan label SANARÉA'),
    ],
    featured: false,
    sourceFolders: ['sorotan_Paris Basic'],
  },
  {
    slug: 'vela-instant-bandana-small',
    name: 'Vela Instant Bandana · Small',
    collection: 'vela-bandana',
    category: 'instan',
    // TODO: harga & bahan Vela belum tertulis di story
    colors: colors([
      'burgundy',
      'bw',
      'black',
      'navy',
      'silver',
      'mahogany',
      'chestnut',
      'hazelnut',
      'rose wood',
      'smoke beige',
      'walnut',
      'choco',
      'cream',
      'dusty',
      'pink peach',
    ]),
    size: 'Small',
    notes: 'Praktis untuk menemani aktivitas: modelnya simpel dan gampang dipakai.',
    images: [
      img(
        'produk/vela-small',
        'Dua manekin memakai Vela Instant Bandana Small warna cokelat dan abu',
      ),
      img('produk/vela-small-colors', 'Pilihan warna Vela Instant Bandana Small dalam kemasan'),
    ],
    featured: true,
    sourceFolders: ['sorotan_Vela Bandana'],
  },
  {
    slug: 'vela-instant-bandana-medium',
    name: 'Vela Instant Bandana · Medium',
    collection: 'vela-bandana',
    category: 'instan',
    // TODO: harga & bahan Vela belum tertulis di story
    colors: colors([
      'burgundy',
      'wine',
      'bw',
      'black',
      'navy',
      'grey',
      'mahogany',
      'hazelnut',
      'choco',
      'walnut',
      'latte',
      'frappuccino',
      'smoke beige',
      'rose pink',
      'ivory',
      'biscuit',
      'dusty',
    ]),
    size: 'Medium',
    notes: 'Praktis untuk menemani aktivitas: modelnya simpel dan gampang dipakai.',
    images: [
      img(
        'produk/vela-medium',
        'Dua manekin memakai Vela Instant Bandana Medium warna abu dan hitam',
      ),
      img('produk/vela-medium-colors', 'Pilihan warna Vela Instant Bandana Medium dalam kemasan'),
    ],
    featured: false,
    sourceFolders: ['sorotan_Vela Bandana'],
  },
  {
    slug: 'aleena-instant-sport',
    name: 'Aleena Instant Sport',
    collection: 'aleena-sport',
    category: 'sport',
    price: 50000, // Highlight SALE: harga normal 50,000 (TODO: konfirmasi)
    // TODO: nama warna Aleena belum berlabel di story
    colors: [],
    notes:
      'Bergo instan dengan dagu karet dan look sporty yang tetap feminin. Menutupi bagian dada.',
    images: [
      img(
        'produk/aleena-cover',
        'Dua manekin memakai Aleena Instant Sport warna cokelat muda dan cokelat tua',
      ),
      img(
        'produk/aleena-look',
        'Manekin memakai Aleena Instant Sport warna abu gelap, menutupi dada',
      ),
      img('produk/aleena-colors', 'Pilihan warna Aleena Instant Sport'),
    ],
    featured: true,
    sourceFolders: ['sorotan_Aleena Sport', 'sorotan_SALE'],
  },
  {
    slug: 'scrunchie-tulle',
    name: 'Scrunchie Tulle Premium',
    collection: 'scrunchie-tulle',
    category: 'aksesoris',
    // TODO: harga & nama warna scrunchie belum tertulis
    colors: [],
    size: 'Small (Ø 12–14 cm), Medium (Ø 16 cm), Jumbo (Ø 19–20 cm)',
    notes: 'Tulle premium, lembut, ringan, dan nyaman dipakai seharian.',
    images: [
      img('produk/scrunchie-cover', 'Scrunchie tulle SANARÉA warna hitam, abu, cokelat, dan pink'),
      img('produk/scrunchie-sizes', 'Scrunchie tulle ukuran small, medium, dan jumbo'),
      img('produk/scrunchie-black', 'Scrunchie tulle hitam di keranjang kawat'),
    ],
    featured: false,
    sourceFolders: ['sorotan_Scrunchie Tulle'],
  },
  {
    slug: 'magnetic-pin',
    name: 'Magnetic Pin',
    collection: 'magnetic-pin',
    category: 'aksesoris',
    // TODO: harga & varian Magnetic Pin belum tertulis
    colors: [],
    notes: 'Pin magnet anti geser dan tidak merusak hijab. Pas untuk Eleera Viscose.',
    images: [
      img('produk/pin-cover', 'Magnetic pin bunga hitam dan perak di kartu kemasan SANARÉA'),
    ],
    featured: false,
    sourceFolders: ['sorotan_Magnetic Pin'],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
