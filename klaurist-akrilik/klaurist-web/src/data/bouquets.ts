// Bucket bunga non-fresh. Nama & harga dari poster IG @klaurist.akrilik (Juni 2026).
import { posterImg } from './img';
import type { Bouquet, BouquetGroup } from './types';

export const bouquetGroups: { id: BouquetGroup; name: string }[] = [
  { id: 'paket', name: 'Paket 6 Tangkai' },
  { id: 'round-daisy', name: 'Round Daisy' },
  { id: 'spesial', name: 'Bucket Spesial' },
  { id: 'satuan', name: 'Klaurist Bloom (Satuan)' },
];

const paketColors = ['Pink', 'Biru', 'Ungu', 'Maroon', 'Putih'];

const singles = [
  ['mawar', 'Mawar', 15000],
  ['tulip', 'Tulip', 10000],
  ['lili-2-warna', 'Lili 2 Warna', 15000],
  ['sunflower', 'Sunflower', 18000],
  ['lily', 'Lili', 10000],
  ['peony', 'Peony', 10000],
  ['mini-daisy', 'Mini Daisy', 8000],
  ['gerbera', 'Gerbera', 15000],
  ['lavender', 'Lavender', 10000],
] as const;

export const bouquets: readonly Bouquet[] = [
  {
    slug: 'paket-lilu',
    name: 'Paket Lilu',
    group: 'paket',
    variants: [{ label: '6 tangkai', price: 80000 }],
    stems: '6 tangkai (lili & tulip)',
    colors: paketColors,
    description: 'Paket 6 tangkai perpaduan lili dan tulip. Tidak akan pernah layu.',
    images: [posterImg('paket-lilu', 'Bucket Paket Lilu berisi lili dan tulip putih', 246, 300)],
    featured: true,
  },
  {
    slug: 'paket-limaw',
    name: 'Paket Limaw',
    group: 'paket',
    variants: [{ label: '6 tangkai', price: 80000 }],
    stems: '6 tangkai (lili & mawar)',
    colors: [...paketColors, 'Hitam'],
    description: 'Paket 6 tangkai perpaduan lili dan mawar. Tidak akan pernah layu.',
    images: [posterImg('paket-limaw', 'Bucket Paket Limaw berisi mawar pink dan lili', 240, 310)],
    featured: true,
  },
  {
    slug: 'round-daisy',
    name: 'Round Daisy Flower',
    group: 'round-daisy',
    variants: [
      { label: '25 tangkai', price: 60000 },
      { label: '35 tangkai', price: 90000 },
      { label: '55 tangkai', price: 120000 },
      { label: '65 tangkai', price: 150000 },
    ],
    description: 'Bucket daisy bulat yang penuh dan ceria, tersedia dalam beberapa ukuran.',
    images: [posterImg('round-daisy', 'Bucket bulat penuh bunga daisy putih kuning', 300, 340)],
    featured: true,
  },
  {
    slug: 'blue-round-daisy',
    name: 'Blue Round Daisy',
    group: 'round-daisy',
    variants: [{ label: 'Standar', price: 90000 }],
    colors: ['Biru'],
    description: 'Round daisy nuansa biru dengan pita maroon, kalem dan manis.',
    images: [posterImg('blue-round-daisy', 'Bucket daisy biru dengan pita maroon', 250, 290)],
    featured: false,
  },
  {
    slug: 'velvet-maroon',
    name: 'Velvet Maroon',
    group: 'spesial',
    variants: [{ label: 'Standar', price: 80000 }],
    colors: ['Maroon'],
    description: 'Bucket nuansa maroon yang elegan dan mewah untuk momen spesial.',
    images: [
      posterImg('velvet-maroon', 'Bucket bunga maroon dan putih dengan hiasan hati', 250, 280),
    ],
    featured: true,
  },
  {
    slug: 'blue-ocean',
    name: 'Blue Ocean',
    group: 'spesial',
    variants: [{ label: 'Standar', price: 70000 }],
    colors: ['Biru'],
    description: 'Bucket nuansa biru laut yang fresh dan estetik.',
    images: [posterImg('blue-ocean', 'Bucket lili biru dalam kertas putih', 230, 250)],
    featured: false,
  },
  ...singles.map(([slug, name, price]): Bouquet => ({
    slug: `satuan-${slug}`,
    name: `${name} Satuan`,
    group: 'satuan',
    variants: [{ label: '1 tangkai', price }],
    stems: '1 tangkai',
    description: `Bunga ${name.toLowerCase()} non-fresh satuan dari koleksi Klaurist Bloom, bisa jadi hadiah simpel atau dirangkai sendiri.`,
    images: [
      posterImg(
        `satuan-${slug}`,
        `Bunga ${name.toLowerCase()} rajut non-fresh satu tangkai`,
        160,
        180,
      ),
    ],
    featured: false,
  })),
];
