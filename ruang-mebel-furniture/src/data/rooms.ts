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
    id: 'kamar-tidur',
    name: 'Kamar Tidur',
    tagline: 'Nakas dan dresser yang hangat di samping ranjang',
    products: [
      'nakas-retro-aesthetic',
      'nakas-jati-mid-century',
      'nakas-vintage-jati',
      'nakas-2-laci-modern',
      'dresser-4-laci',
    ],
  },
  {
    id: 'ruang-keluarga',
    name: 'Ruang Keluarga',
    tagline: 'Meja TV yang merapikan sekaligus mempercantik',
    products: [
      'meja-tv-anthony',
      'bufet-tv-ukiran',
      'media-console-rotan',
      'meja-tv-nordic-haven',
      'bufet-tv-mid-century',
    ],
  },
  {
    id: 'ruang-tamu',
    name: 'Ruang Tamu',
    tagline: 'Bufet dan meja tamu untuk menyambut tamu',
    products: [
      'credenza-retro-rotan',
      'bufet-kinzy',
      'meja-tamu-mid-century',
      'coffee-table-serat-radial',
      'meja-tamu-organik',
    ],
  },
  {
    id: 'ruang-makan',
    name: 'Ruang Makan',
    tagline: 'Meja bundar dan sideboard untuk kumpul keluarga',
    products: [
      'meja-makan-pedestal',
      'meja-makan-scandinavian',
      'meja-bundar-arsitektural',
      'sideboard-banting-walnut',
      'sideboard-copenhagen',
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
