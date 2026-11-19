// Kategori, momen, add-on, dan tema musiman
import type { Addon, Category, Occasion, Seasonal } from './types';

export const categories: readonly Category[] = [
  { id: 'tumbler', name: 'Tumbler & Botol', description: 'Botol dan tumbler kaca berbagai model.' },
  { id: 'gelas', name: 'Gelas & Cangkir', description: 'Gelas, mug, dan cangkir kaca aesthetic.' },
  {
    id: 'mangkok',
    name: 'Mangkok & Piring',
    description: 'Mangkok kaca, twotone, motif, dan mangkok Cina.',
  },
  { id: 'peralatan-makan', name: 'Peralatan Makan', description: 'Sendok garpu dalam softbox.' },
  { id: 'tekstil', name: 'Handuk & Tekstil', description: 'Handuk, pouch, dan totebag.' },
  { id: 'termos', name: 'Termos', description: 'Termos dan vacuum flask set.' },
  { id: 'kemasan', name: 'Kemasan', description: 'Box, softbox, dan paper bag custom.' },
];

export const occasions: readonly Occasion[] = [
  {
    id: 'pernikahan',
    name: 'Pernikahan',
    text: 'Souvenir dan box custom nama pengantin.',
    icon: '💍',
  },
  { id: 'khitan', name: 'Khitan', text: 'Kenang-kenangan untuk tamu syukuran khitan.', icon: '🌙' },
  {
    id: 'hajatan',
    name: 'Pengajian & Hajatan',
    text: 'Aqiqah, tilik bayi, pengajian, dan syukuran.',
    icon: '🤲',
  },
  {
    id: 'haji-umroh',
    name: 'Haji & Umroh',
    text: 'Oleh-oleh dan hadiah walimatussafar.',
    icon: '🕋',
  },
  { id: 'idul-fitri', name: 'Idul Fitri', text: 'Box piring dan hampers Lebaran.', icon: '✨' },
];

export const addons: readonly Addon[] = [
  {
    id: 'bubblewrap',
    name: 'Tambahan Packing Bubblewrap',
    price: 5000,
    note: 'Disarankan untuk souvenir kaca dan keramik agar lebih aman di perjalanan.',
    shopeeItemId: '26603249806',
  },
];

// Banner musiman: hanya tampil di antara start dan end.
// TODO: sesuaikan tanggal tiap tahun
export const seasonals: readonly Seasonal[] = [
  {
    id: 'natal',
    title: 'Koleksi Natal Sudah Hadir',
    text: 'Box dan paper bag piring tema Natal yang lucu, cocok untuk hadiah dan hampers perayaan.',
    start: '2026-11-01',
    end: '2026-12-25',
    image: '/images/produk/box-piring-natal/01.webp',
  },
  {
    id: 'idul-fitri',
    title: 'Souvenir Idul Fitri',
    text: 'Box piring tema Idul Fitri untuk hampers Lebaran dan oleh-oleh haji & umroh.',
    start: '2027-02-01',
    end: '2027-03-20',
    image: '/images/produk/box-piring-idul-fitri/01.webp',
  },
];

export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;
export const occasionName = (id: string) => occasions.find((o) => o.id === id)?.name ?? id;
