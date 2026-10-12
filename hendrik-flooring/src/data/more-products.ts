// Produk pendukung (handrail & karpet roll) dan buku sampel merek lain
import type { Highlight } from './products';
import { getProject } from './projects';
import type { ImageAsset } from './types';

const img = (folder: string, name: string, width: number, height: number, alt: string) =>
  ({
    src: `/img/${folder}/${name}.webp`,
    thumb: `/img/${folder}/${name}-thumb.webp`,
    width,
    height,
    alt,
    kind: 'proyek',
  }) satisfies ImageAsset;

export type ExtraProduct = {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: Highlight[];
  brands: string[];
  image: ImageAsset;
  /** Gambar yang bisa diketuk di modal untuk mengganti latar */
  gallery: { label: string; image: ImageAsset }[];
};

// TODO: verifikasi klaim dengan katalog resmi tiap merek
export const extraProducts: ExtraProduct[] = [
  {
    id: 'handrail',
    name: 'Handrail Rumah Sakit',
    eyebrow: 'Keamanan pasien',
    summary:
      'Pegangan dinding anti benturan untuk koridor, ruang rawat, dan ruang tunggu. Membantu pasien berjalan dan melindungi dinding.',
    description:
      'Pegangan dinding anti benturan yang membantu pasien berjalan dan melindungi dinding dari troli.',
    highlights: [
      { icon: 'shield', label: 'Anti benturan' },
      { icon: 'grip', label: 'Pegangan kokoh' },
      { icon: 'clean', label: 'Mudah dibersihkan' },
      { icon: 'seamless', label: 'Banyak pilihan warna' },
    ],
    // Merek dari katalog yang diberikan klien. TODO: foto produk Guard Pro belum ada
    brands: ['Guard Pro', 'Frantinco', 'Oxena'],
    image: getProject('handrail-koridor-rs'),
    gallery: [
      {
        label: 'Frantinco',
        image: img(
          'handrail',
          'frantinco-anti-collision',
          1240,
          510,
          'Handrail anti benturan Frantinco warna krem dengan panel biru',
        ),
      },
      {
        label: 'Oxena motif kayu',
        image: img(
          'handrail',
          'oxena-motif-kayu',
          1241,
          1340,
          'Handrail Oxena putih dengan panel motif kayu dan varian bulat biru',
        ),
      },
      {
        label: 'Oxena bulat',
        image: img(
          'handrail',
          'oxena-bulat',
          1241,
          860,
          'Handrail Oxena berbentuk bulat warna biru dengan ujung putih',
        ),
      },
      { label: 'Ruang tunggu', image: getProject('handrail-ruang-tunggu') },
      { label: 'Lorong', image: getProject('handrail-lorong-baru') },
    ],
  },
  {
    id: 'karpet',
    name: 'Karpet Roll',
    eyebrow: 'Kantor & area publik',
    summary:
      'Karpet lembaran untuk lobi, ruang tunggu, ruang rapat, dan ruang kerja. Tampilan rapi dengan banyak pilihan motif.',
    description:
      'Karpet lembaran yang hangat dan nyaman dipijak, untuk lobi, ruang kerja, dan ruang rapat.',
    highlights: [
      { icon: 'grip', label: 'Nyaman dipijak' },
      { icon: 'seamless', label: 'Motif beragam' },
      { icon: 'ruler', label: 'Cocok area luas' },
      { icon: 'team', label: 'Dipasang rapi' },
    ],
    // Merek karpet sesuai info klien (13 Okt 2026)
    brands: ['King', 'Beyond', 'CNR', 'Classic'],
    image: getProject('karpet-roll-lobi-lift'),
    gallery: [
      { label: 'Lobi resepsionis', image: getProject('karpet-roll-lobi-resepsionis') },
      { label: 'Area tunggu', image: getProject('karpet-roll-area-tunggu') },
      { label: 'Ruang kerja', image: getProject('karpet-roll-biru-ruang-kerja') },
      {
        label: 'Sampel karpet',
        image: img(
          'sampel',
          'beyond-floor-karpet',
          1200,
          1600,
          'Buku sampel karpet Beyond Floor dengan beberapa pilihan warna',
        ),
      },
    ],
  },
];

export type SampleBook = {
  brand: string;
  lines: string;
  type: string;
  /** Penjelasan singkat: hanya dari yang tertulis di sampul/buku sampel, tanpa klaim tambahan */
  points: string[];
  image: ImageAsset;
};

// Merek lain dari foto buku sampel yang dikirim klien. TODO: verifikasi penjelasan dengan klien
export const sampleBooks: SampleBook[] = [
  {
    brand: 'Marvel Decoflex',
    lines: 'Decoflex & Medipure',
    points: [
      'Decoflex: vinyl heterogen (berlapis) dengan pilihan motif.',
      'Medipure: vinyl homogen, roll 2 m × 20 m, tebal 2 mm.',
      'Sampul mencantumkan logo uji SGS & Intertek; detail sertifikat bisa ditanyakan.',
    ],
    type: 'Vinyl heterogen & homogen',
    image: img(
      'sampel',
      'marvel-decoflex-medipure',
      1200,
      1600,
      'Buku sampel Marvel Decoflex Heterogeneous dan Medipure Homogeneous Flooring',
    ),
  },
  {
    brand: 'Armstrong Flooring',
    lines: 'Zanlite, Varit, Starlux, Medintech Plus',
    points: [
      'Empat seri vinyl dalam satu merek, masing-masing dengan pilihan warna sendiri.',
      'Cocok dibandingkan langsung saat survei untuk memilih seri yang pas.',
    ],
    type: 'Vinyl Roll',
    image: img(
      'sampel',
      'armstrong-flooring',
      1200,
      1600,
      'Empat buku sampel Armstrong Flooring berwarna hitam',
    ),
  },
  {
    brand: 'LG Hausys',
    lines: 'Mini',
    points: [
      'Vinyl lembaran (sheet).',
      'Sampul menyebut penggunaan di area pendidikan, apartemen, olahraga, dan komersial.',
    ],
    type: 'Vinyl Roll',
    image: img(
      'sampel',
      'lg-hausys-mini',
      1200,
      1600,
      'Buku sampel LG Hausys Mini untuk lantai vinyl lembaran',
    ),
  },
  {
    brand: 'Purva',
    lines: 'Origin, Victoria, Terrazzo, Marble, Wood Series',
    points: [
      'Lima seri motif: polos (Origin, Victoria), terazo, marmer, dan kayu.',
      'Pilihan untuk ruangan yang ingin tampil lebih dekoratif.',
    ],
    type: 'Vinyl Roll',
    image: img(
      'sampel',
      'purva',
      1200,
      1600,
      'Deretan buku sampel Purva: Origin, Victoria, Terrazzo, Marble, dan Wood Series',
    ),
  },
  {
    brand: 'Karpet',
    lines: 'King, Beyond, CNR, Classic',
    points: [
      'Empat merek karpet dengan pilihan motif dan warna masing-masing.',
      'Untuk kantor, ruang rapat, dan area publik.',
    ],
    type: 'Merek karpet',
    image: img(
      'sampel',
      'beyond-floor-karpet',
      1200,
      1600,
      'Buku sampel karpet Beyond Floor dengan beberapa pilihan warna',
    ),
  },
];
