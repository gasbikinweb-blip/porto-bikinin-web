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

const img = (slug: string) => ({
  src: `/images/portofolio/${slug}.webp`,
  thumb: `/images/portofolio/${slug}-thumb.webp`,
});

// TODO: pastikan izin publikasi dari brand klien (foto memuat watermark "p" dan label brand kecil).
// TODO: verifikasi jenis bahan sebelum mengisi field `material`.
export const projects: Project[] = [
  {
    id: 'abaya-mauve-manekin',
    ...img('abaya-tie-dye-mauve-manekin'),
    alt: 'Abaya warna mauve motif tie-dye berkerah V dipasang pada manekin di depan dinding putih',
    category: 'abaya',
    productType: 'Abaya',
    material: 'Motif tie-dye',
    caption: 'Abaya potongan lurus berkerah V dengan lengan panjang, motif tie-dye mauve.',
    kind: 'proyek',
    width: 900,
    height: 1600,
  },
  {
    id: 'abaya-lima-warna-rak',
    ...img('abaya-tie-dye-lima-warna-rak'),
    alt: 'Lima abaya motif tie-dye warna mauve, cokelat muda, ungu, bata, dan hijau tua digantung di rak besi',
    category: 'abaya',
    productType: 'Abaya',
    material: 'Motif tie-dye',
    caption: 'Satu model abaya diproduksi dalam lima pilihan warna.',
    kind: 'proyek',
    width: 900,
    height: 1600,
  },
  {
    id: 'abaya-plum-sofa',
    ...img('abaya-tie-dye-plum-sofa'),
    alt: 'Dua abaya motif tie-dye warna cokelat keunguan dan plum tua dibentangkan di atas sofa abu-abu',
    category: 'abaya',
    productType: 'Abaya',
    material: 'Motif tie-dye',
    caption: 'Dua varian warna abaya dengan jatuh kain yang lebar dan flowy.',
    kind: 'proyek',
    width: 1600,
    height: 1600,
  },
  {
    id: 'abaya-detail-kursi',
    ...img('abaya-tie-dye-detail-kursi'),
    alt: 'Abaya motif tie-dye mauve disampirkan di kursi putih, memperlihatkan jahitan bahu dan lengan',
    category: 'abaya',
    productType: 'Abaya',
    material: 'Motif tie-dye',
    caption: 'Detail jahitan bahu dan sambungan lengan.',
    kind: 'proyek',
    width: 900,
    height: 1600,
  },
];
