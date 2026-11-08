// Model papan ucapan akrilik. Harga dari poster & caption IG @klaurist.akrilik (9 Juni 2026).
// TODO: konfirmasi durasi sewa dan ukuran tiap model ke pemilik
import { posterImg } from './img';
import type { Board } from './types';

export const boards: readonly Board[] = [
  {
    slug: 'papan-round',
    name: 'Round Acrylic',
    rentalPrice: 60000,
    rentalDuration: undefined, // TODO
    size: undefined, // TODO
    description:
      'Papan akrilik bulat dengan rangkaian bunga non-fresh dan tile cantik. Simpel dan ikonis.',
    images: [
      posterImg(
        'papan-round',
        'Papan akrilik bulat dengan bunga merah dan tile maroon di standing hitam',
        200,
        430,
      ),
      {
        src: '/images/papan-round-wisuda.webp',
        alt: 'Papan ucapan akrilik bulat dihiasi bunga lily pink dan tile, terpasang di lobi kampus',
        width: 1200,
        height: 2133,
        kind: 'foto',
      },
    ],
    featured: true,
  },
  {
    slug: 'papan-kubah',
    name: 'Kubah Acrylic',
    rentalPrice: 85000,
    description: 'Papan akrilik berbentuk kubah dengan hiasan bunga non-fresh. Modern dan elegan.',
    images: [
      posterImg(
        'papan-kubah',
        'Papan akrilik bentuk kubah dengan bunga peach dan pita tile pink',
        185,
        440,
      ),
    ],
    featured: true,
  },
  {
    slug: 'standing-akrilik',
    name: 'Standing Akrilik',
    rentalPrice: 175000,
    description:
      'Papan akrilik berdiri dengan bingkai besi dan bunga di sekelilingnya. Mewah dan jadi statement piece.',
    images: [
      posterImg(
        'standing-akrilik',
        'Standing akrilik oval berbingkai besi putih dengan bunga pink',
        180,
        450,
      ),
    ],
    featured: true,
  },
  {
    slug: 'papan-wave',
    name: 'Papan Akrilik Wave',
    rentalPrice: undefined, // TODO: nama resmi & harga koleksi papan baru (poster 14 Juli 2026)
    description:
      'Koleksi papan baru: akrilik pink berbingkai gelombang dengan rangkaian lily dan bunga warna-warni.',
    images: [
      posterImg(
        'papan-wave',
        'Papan akrilik pink berbingkai gelombang dengan rangkaian lily pink dan biru',
        540,
        555,
      ),
      posterImg(
        'papan-wave-acara',
        'Papan akrilik wave terpasang di standing saat acara',
        495,
        450,
      ),
    ],
    featured: true,
  },
];

// TODO: konfirmasi durasi sewa dan cara pengembalian papan
export const rentalNote =
  'Harga sewa per acara. Durasi sewa dan pengembalian papan dikonfirmasi admin saat pemesanan ya, Kak.';
