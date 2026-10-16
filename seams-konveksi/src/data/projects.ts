// Portofolio hasil jahitan. Tambah foto: taruh di assets-src/portofolio/, jalankan
// `npm run optimize-images`, lalu tambahkan entri di sini dengan width/height dari output script.
import type { ProductCategory } from './products';

export type Project = {
  id: string;
  src: string;
  /** Thumbnail untuk grid (versi -thumb.webp); kalau kosong memakai src */
  thumb?: string;
  alt: string;
  category: ProductCategory;
  productType: string;
  material?: string;
  caption: string;
  /** 'proyek' = hasil produksi nyata Seams; 'ilustrasi' = mockup/placeholder (wajib berlabel) */
  kind: 'proyek' | 'ilustrasi';
  width: number;
  height: number;
};

const ph = (category: ProductCategory) =>
  `/placeholder/${category === 'lainnya' ? 'outer' : category}.svg`;

// TODO: semua entri di bawah adalah PLACEHOLDER (kind: 'ilustrasi'). Ganti dengan foto asli Seams.
export const projects: Project[] = [
  {
    id: 'abaya-1',
    src: ph('abaya'),
    alt: 'Placeholder: abaya hasil produksi',
    category: 'abaya',
    productType: 'Abaya',
    caption: 'Contoh keterangan: abaya polos untuk koleksi harian.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
  {
    id: 'khimar-1',
    src: ph('khimar'),
    alt: 'Placeholder: khimar hasil produksi',
    category: 'khimar',
    productType: 'Khimar',
    caption: 'Contoh keterangan: khimar instan dengan jahitan tepi rapi.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
  {
    id: 'gamis-1',
    src: ph('gamis'),
    alt: 'Placeholder: gamis hasil produksi',
    category: 'gamis',
    productType: 'Gamis',
    caption: 'Contoh keterangan: gamis untuk lini produk brand.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
  {
    id: 'abaya-2',
    src: ph('abaya'),
    alt: 'Placeholder: abaya motif hasil produksi',
    category: 'abaya',
    productType: 'Abaya',
    caption: 'Contoh keterangan: abaya motif untuk koleksi musiman.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
  {
    id: 'lainnya-1',
    src: ph('lainnya'),
    alt: 'Placeholder: outer hasil produksi',
    category: 'lainnya',
    productType: 'Outer',
    caption: 'Contoh keterangan: outer pelengkap koleksi.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
  {
    id: 'khimar-2',
    src: ph('khimar'),
    alt: 'Placeholder: khimar seragam komunitas',
    category: 'khimar',
    productType: 'Khimar',
    caption: 'Contoh keterangan: khimar untuk seragam komunitas.',
    kind: 'ilustrasi',
    width: 800,
    height: 1000,
  },
];
