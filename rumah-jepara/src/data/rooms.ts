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
    id: 'ruang-tamu',
    name: 'Ruang Tamu',
    tagline: 'Sambut tamu dengan kehangatan jati',
    products: ['sofa-l-shape-jati', 'rattan-buffet-cabinet', 'rope-lounge-chair'],
  },
  {
    id: 'ruang-makan',
    name: 'Ruang Makan',
    tagline: 'Meja makan yang mengundang cerita',
    products: [
      'woven-armchair',
      'kursi-makan-jati-sandaran-tinggi',
      'kursi-rotan-lengkung',
      'kursi-rotan-bantal-krem',
    ],
  },
  {
    id: 'kamar-tidur',
    name: 'Kamar Tidur',
    tagline: 'Istirahat tenang di pelukan kayu',
    products: ['hygge-teak-bed', 'rattan-buffet-cabinet'],
  },
  {
    id: 'teras-santai',
    name: 'Teras & Santai',
    tagline: 'Sudut bersantai untuk sore yang panjang',
    products: ['rope-lounge-chair', 'kursi-rotan-lengkung', 'woven-armchair'],
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
