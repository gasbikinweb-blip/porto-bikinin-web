// Pengelompokan produk per ruangan untuk section "Pilih Ruang" di beranda.
// Cukup isi slug produk dari src/data/products.ts; satu produk boleh muncul di beberapa ruangan.
import { getCategory, getProductBySlug } from './products';

type RoomConfig = {
  id: string;
  name: string;
  tagline: string;
  products: readonly string[];
};

const roomConfigs: readonly RoomConfig[] = [
  {
    id: 'ruang-keluarga',
    name: 'Ruang Keluarga',
    tagline: 'Hangat untuk bersantai bersama',
    products: [
      'navara-sofa',
      'boucle-sofa',
      'alder-lounge-chair',
      'arden-lounge-chair',
      'void-coffee-table',
    ],
  },
  {
    id: 'ruang-makan',
    name: 'Ruang Makan',
    tagline: 'Meja untuk berkumpul dan bercerita',
    products: [
      'round-dining-table',
      'o-chair',
      'verla-arm-chair',
      'square-dining-table',
      'heritage-dining-table',
    ],
  },
  {
    id: 'kamar-tidur',
    name: 'Kamar Tidur',
    tagline: 'Tenang untuk istirahat yang nyenyak',
    products: [
      'haven-drawer-bed',
      'kyoto-bed',
      'cloud-bed',
      'elara-upholstered-bed',
      'bedside-table',
    ],
  },
  {
    id: 'teras',
    name: 'Teras & Kafe',
    tagline: 'Sudut santai untuk sore yang panjang',
    products: [
      'rattan-coffee-table',
      'recycle-coffee-table',
      'coffee-table-stand',
      'cleopatra-dining-chair',
    ],
  },
];

export type RoomItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: { src: string; alt: string };
  material: string;
  dimensions: string;
};

export type Room = {
  id: string;
  name: string;
  tagline: string;
  items: RoomItem[];
};

/** Data ringkas (serializable) untuk dikirim ke client component */
export function getRooms(): Room[] {
  return roomConfigs
    .map((room) => ({
      id: room.id,
      name: room.name,
      tagline: room.tagline,
      items: room.products.flatMap((slug) => {
        const p = getProductBySlug(slug);
        if (!p) return [];
        return [
          {
            slug: p.slug,
            name: p.name,
            category: getCategory(p.category).name,
            description: p.description,
            image: p.images[0],
            material: p.specs.material,
            dimensions: p.specs.dimensions,
          },
        ];
      }),
    }))
    .filter((room) => room.items.length > 0);
}
