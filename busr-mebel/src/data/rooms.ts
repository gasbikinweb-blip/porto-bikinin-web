// Pengelompokan rekomendasi tata ruang Busr Mebel untuk Beranda dan Halaman /inspirasi.
// Mencakup: Open Space Office, Ruang Direktur, Cafe/Resto, Ruang Tamu Minimalis.
import { getCategory, getProductBySlug } from './products';

export type RoomConfig = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tips: readonly string[];
  products: readonly string[];
};

export const roomConfigs: readonly RoomConfig[] = [
  {
    id: 'open-space-office',
    name: 'Open Space Office',
    tagline: 'Kolaboratif, Ramping, & Produktif',
    description:
      'Penataan kantor terbuka yang mengoptimalkan sirkulasi udara dan interaksi antar tim tanpa mengorbankan privasi dan kerapian kabel data.',
    tips: [
      'Gunakan meja kerja dengan panel beveled untuk tampilan rapi dari segala sudut.',
      'Pilih kursi bersirkulasi baik dengan rangka kokoh untuk pemakaian intensif 8+ jam.',
      'Sediakan rak ambalan terbuka sebagai partisi natural tanpa membuat ruangan gelap.',
    ],
    products: [
      'meja-kerja-jati-teak-desk',
      'kursi-cantilever-chrome-bauhaus',
      'rak-jati-bersiluet',
      'bangku-santai-jati-bench',
    ],
  },
  {
    id: 'ruang-direktur',
    name: 'Ruang Direktur & Eksekutif',
    tagline: 'Wibawa, Presisi, & Material Eksklusif',
    description:
      'Harmoni kemewahan kayu jati solid, top granit hitam, dan sofa lengkung yang menghadirkan impresi kredibilitas tinggi bagi para rekanan bisnis dan tamu VIP.',
    tips: [
      'Pusatkan orientasi ruangan pada meja eksekutif berdesain floating arsitektural.',
      'Sediakan sudut private lounge dengan sofa modular kurva untuk diskusi santai.',
      'Pilih meja front desk atau credenza jati asimetris sebagai vocal point ruangan.',
    ],
    products: [
      'meja-kerja-eksekutif-volo',
      'meja-resepsionis-atrium',
      'sofa-modular-aera-curve',
      'kursi-makan-solenne-curve',
    ],
  },
  {
    id: 'cafe-resto',
    name: 'Cafe & Commercial Resto',
    tagline: 'Estetik, Instagramable, & Tahan Banting',
    description:
      'Kombinasi tempat duduk ergonomis berbagai tipe (dining chair, barstool, bench, hingga outdoor) yang memaksimalkan kapasitas tempat duduk dan estetika visual restoran.',
    tips: [
      'Kombinasikan dining table kayu solid dengan kursi tubular chrome bergaya mid-century.',
      'Terapkan kursi bar jati dengan sadel ergonomis di area counter barista/kasir.',
      'Gunakan anyaman sintetis tahan cuaca untuk area dining semi-outdoor dan teras.',
    ],
    products: [
      'kursi-cantilever-chrome-bauhaus',
      'kursi-makan-viridian-emerald',
      'barchair-jati-minimalis',
      'set-meja-makan-outdoor-anyaman-jati',
      'kursi-geometris-rosso',
    ],
  },
  {
    id: 'ruang-tamu-minimalis',
    name: 'Ruang Tamu & Hunian Minimalis',
    tagline: 'Hangat, Bersih, & Elegan Abadi',
    description:
      'Koleksi furnitur berproporsi rendah (low profile) yang membuat hunian terasa jauh lebih lapang, menonjolkan serat kayu alami yang menenangkan.',
    tips: [
      'Gunakan coffee table bundar bertingkat atau rustic low table agar ruangan terasa luas.',
      'Pilih lounge chair ber-ottoman untuk sudut membaca yang tenang.',
      'Padukan tempat tidur bersiluet ringan dengan nakas bundar melayang.',
    ],
    products: [
      'set-meja-bundar',
      'meja-kopi-the-kuro-low',
      'kursi-santai-lounge-chair-ottoman',
      'tempat-tidur-jati-tailored-serenity',
      'rak-jati-bersiluet',
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
  dimensions?: string;
};

export type Room = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tips: readonly string[];
  items: RoomItem[];
};

/** Data ringkas (serializable) untuk dikirim ke client component */
export function getRooms(): Room[] {
  return roomConfigs
    .map((room) => ({
      id: room.id,
      name: room.name,
      tagline: room.tagline,
      description: room.description,
      tips: room.tips,
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
