// Inspirasi gaya (OOTD) memakai produk Sahane.id.
// Foto customer diambil dari unggahan Instagram yang menandai @sahane.id.
// TODO: pastikan sudah mendapat izin pemilik akun sebelum website dipublikasikan.

import type { ImageAsset } from './products';

export interface Look {
  id: string;
  title: string;
  /** Catatan gaya singkat */
  note: string;
  image: ImageAsset;
  /** Slug produk yang dipakai di foto */
  products: readonly string[];
  /** Akun Instagram pemilik foto (tanpa @) */
  credit: string;
}

export const looks: readonly Look[] = [
  {
    id: 'blooming-softest',
    title: 'Blooming in the Softest Way',
    note: 'Baby salem dipadukan khimar cokelat tua: lembut, kalem, dan tetap tegas.',
    image: {
      src: '/lookbook/afifah-01.webp',
      alt: 'Wanita duduk di bebatuan taman mengenakan Nehir Abaya baby salem dan khimar cokelat tua',
    },
    products: ['nehir-abaya-baby-salem'],
    credit: 'afifahdheaa',
  },
  {
    id: 'garden-stroll',
    title: 'Garden Stroll',
    note: 'Tas hitam mungil jadi aksen kontras untuk palet pastel.',
    image: {
      src: '/lookbook/afifah-13.webp',
      alt: 'Wanita berdiri membawa tas hitam, mengenakan Nehir Abaya baby salem',
    },
    products: ['nehir-abaya-baby-salem'],
    credit: 'afifahdheaa',
  },
  {
    id: 'grey-and-blush',
    title: 'Grey & Blush',
    note: 'Pashmina abu-abu motif membuat baby salem terasa lebih dewasa.',
    image: {
      src: '/lookbook/almazyya-01.webp',
      alt: 'Wanita berhijab abu-abu tersenyum di ruangan kayu, mengenakan abaya salem bordir',
    },
    products: ['nehir-abaya-baby-salem'],
    credit: 'almazyyaf',
  },
  {
    id: 'stepping-stones',
    title: 'Stepping Stones',
    note: 'Look santai sore hari dengan khimar ungu tua senada bordir.',
    image: {
      src: '/lookbook/pradita-03.webp',
      alt: 'Wanita duduk di tangga batu taman mengenakan abaya salem dan khimar ungu tua',
    },
    products: ['nehir-abaya-baby-salem'],
    credit: 'pradita_awlyh',
  },
  {
    id: 'hitam-tak-pernah-gagal',
    title: 'Hitam Tak Pernah Gagal',
    note: 'All black dengan bordir beige: simpel, tegas, dan mudah dipadukan.',
    image: {
      src: '/lookbook/tnfrzki-04.webp',
      alt: 'Wanita bercadar berdiri di depan dinding putih mengenakan Nehir Abaya jetblack',
    },
    products: ['nehir-abaya-jetblack'],
    credit: 'tnfrzki',
  },
  {
    id: 'umrah-ready',
    title: 'Umrah Ready',
    note: 'Jetblack dipadukan khimar merah muda kotak-kotak untuk perjalanan ibadah.',
    image: {
      src: '/lookbook/umrah-02.webp',
      alt: 'Wanita berhijab merah muda mengenakan Nehir Abaya hitam di jalan dekat Masjidil Haram',
    },
    products: ['nehir-abaya-jetblack'],
    credit: 'sahane.id',
  },
  {
    id: 'trio-nehir',
    title: 'Trio Nehir',
    note: 'Tiga warna Nehir untuk kompak bersama sahabat atau keluarga.',
    image: {
      src: '/lookbook/trio-nehir.webp',
      alt: 'Tiga wanita mengenakan Nehir Abaya jetblack, baby salem, dan baby yellow berdiri bersama',
    },
    products: ['nehir-abaya-jetblack', 'nehir-abaya-baby-salem', 'nehir-abaya-baby-yellow'],
    credit: 'sahane.id',
  },
  {
    id: 'garden-backview',
    title: 'Quiet Morning',
    note: 'Khimar panjang ungu tua yang menjuntai di atas abaya pastel.',
    image: {
      src: '/lookbook/pradita-06.webp',
      alt: 'Wanita dari belakang berjalan di taman mengenakan khimar panjang dan abaya pastel',
    },
    products: ['nehir-abaya-baby-salem'],
    credit: 'pradita_awlyh',
  },
];
