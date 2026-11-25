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
    id: 'dapur',
    name: 'Dapur',
    tagline: 'Rapi, lega, dan enak dipakai masak',
    products: [
      'kitchen-set-island-modern',
      'kitchen-set-minibar-kisi',
      'kitchen-set-putih-marmer',
      'kitchen-set-kayu-island',
      'kitchen-set-navy-gold',
    ],
  },
  {
    id: 'ruang-keluarga',
    name: 'Ruang Keluarga',
    tagline: 'Hangat untuk bersantai bersama',
    products: [
      'backdrop-tv-lengkung-led',
      'backdrop-tv-marmer-led',
      'partisi-kisi-ruang-tamu',
      'backdrop-tv-panel-kayu',
      'partisi-kisi-backdrop-tv',
    ],
  },
  {
    id: 'kamar-tidur',
    name: 'Kamar Tidur',
    tagline: 'Tenang untuk istirahat yang nyenyak',
    products: [
      'lemari-kaca-walk-in',
      'lemari-putih-display-arch',
      'kamar-set-kayu-led',
      'meja-rias-hollywood',
      'kamar-set-headboard-led',
    ],
  },
  {
    id: 'sudut-rumah',
    name: 'Sudut Rumah',
    tagline: 'Kolong tangga & sudut sempit jadi berguna',
    products: [
      'lemari-bawah-tangga-krem',
      'lemari-bawah-tangga-hitam',
      'rak-sepatu-kaca',
      'meja-kerja-rak-besi',
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
