// Isi sorotan Instagram @teakpeak.id: "Our Project", "Delivered" & "Our Production".
// Video dipotong pendek tanpa suara (ffmpeg) ke public/stories/. Re-share postingan feed tidak dipakai.

export type Story = {
  slug: string;
  tag: 'Our Project' | 'Delivered' | 'Our Production';
  title: string;
  place?: string;
  /** true = ada /stories/[slug].mp4, poster di /stories/[slug].webp */
  video: boolean;
  alt: string;
};

export const stories: readonly Story[] = [
  {
    slug: 'kitchen-set-depok',
    tag: 'Our Project',
    title: 'Kitchen Set Project',
    place: 'Depok, Jawa Barat',
    video: true,
    alt: 'Pemasangan kitchen set custom di Depok',
  },
  {
    slug: 'bed-frame-depok',
    tag: 'Our Project',
    title: 'Bed Frame with Drawers',
    place: 'Depok, Jawa Barat',
    video: true,
    alt: 'Tempat tidur kayu dengan laci terpasang di kamar pelanggan',
  },
  {
    slug: 'round-table-set',
    tag: 'Our Project',
    title: 'Round Table Set',
    video: true,
    alt: 'Set meja bundar besar dengan kursi kayu',
  },
  {
    slug: 'delivered-depok',
    tag: 'Delivered',
    title: 'Delivered',
    place: 'Depok, Jawa Barat',
    video: true,
    alt: 'Truk Teakpeak mengantar pesanan ke rumah pelanggan',
  },
  {
    slug: 'instalasi-kitchen-set',
    tag: 'Delivered',
    title: 'Instalasi Kitchen Set',
    place: 'Depok, Jawa Barat',
    video: false,
    alt: 'Truk pengiriman kitchen set sebelum instalasi di Depok',
  },
  {
    slug: 'natural-drying',
    tag: 'Our Project',
    title: 'Natural Drying Process',
    video: false,
    alt: 'Rangka kayu dijemur pada proses pengeringan alami',
  },
  {
    slug: 'sawing-process',
    tag: 'Our Production',
    title: 'Sawing Process',
    place: 'Jepara, Jawa Tengah',
    video: true,
    alt: 'Kayu gelondongan dibelah dengan mesin gergaji di workshop',
  },
  {
    slug: 'planing-workshop',
    tag: 'Our Production',
    title: 'Current Situation',
    place: 'Workshop Jepara',
    video: true,
    alt: 'Tukang meratakan papan kayu di workshop',
  },
  {
    slug: 'long-table-build',
    tag: 'Our Production',
    title: 'Long Table',
    place: 'Workshop Jepara',
    video: true,
    alt: 'Meja panjang kayu solid dalam proses pengerjaan',
  },
  {
    slug: 'almost-finish',
    tag: 'Our Production',
    title: 'Almost Finish',
    place: 'Workshop Jepara',
    video: true,
    alt: 'Rangka kursi kayu yang hampir selesai',
  },
  {
    slug: 'fitting-upholstery',
    tag: 'Our Production',
    title: 'Fitting Upholstery',
    place: 'Workshop Jepara',
    video: false,
    alt: 'Kursi kayu dipasangi dudukan upholstery',
  },
  {
    slug: 'spray-finishing',
    tag: 'Our Production',
    title: 'Spray Finishing',
    place: 'Workshop Jepara',
    video: true,
    alt: 'Tukang menyemprot finishing pada rangka kayu',
  },
  {
    slug: 'mr-santoso',
    tag: 'Our Production',
    title: 'Mr. Santoso in Action',
    place: 'Workshop Jepara',
    video: false,
    alt: 'Pengrajin Teakpeak mengerjakan kayu di workshop',
  },
  {
    slug: 'cafe-dining-chairs',
    tag: 'Our Production',
    title: 'Cafe Dining Chairs',
    place: 'Workshop Jepara',
    video: false,
    alt: 'Deretan rangka kursi makan kafe sebelum finishing',
  },
  {
    slug: 'packing',
    tag: 'Our Production',
    title: 'Packing',
    place: 'Workshop Jepara',
    video: true,
    alt: 'Furnitur dikemas rapi sebelum dikirim',
  },
];
