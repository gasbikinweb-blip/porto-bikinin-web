// Katalog merek vinyl roll & dokumentasi tahap pemasangan
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

export type CatalogColor = {
  code: string;
  name: string;
  /** Potongan kotak warna dari foto buku sampel (assets-src/warna) */
  swatch: string;
  /** Indeks foto di `photos` yang memuat warna ini */
  photo: number;
};

const swatch = (name: string) => `/img/warna/${name}.webp`;

export type BrandCatalog = {
  id: string;
  brand: string;
  line: string;
  type: string;
  /** Spesifikasi yang tercetak di buku sampel (bukan klaim tambahan) */
  specs: { label: string; value: string }[];
  /** Kode & nama warna sesuai buku sampel */
  colors: CatalogColor[];
  photos: ImageAsset[];
};

// Data diambil dari tulisan di buku sampel yang difoto. TODO: cocokkan dengan katalog resmi terbaru
export const brandCatalogs: BrandCatalog[] = [
  {
    id: 'medipure',
    brand: 'Marvel',
    line: 'Medipure',
    type: 'Homogeneous Flooring',
    specs: [
      { label: 'Ukuran roll', value: '2 m × 20 m' },
      { label: 'Ketebalan', value: '2 mm' },
    ],
    colors: [
      { code: 'MP-1', name: 'Delightful Grey', swatch: swatch('mp-1'), photo: 1 },
      { code: 'MP-2', name: 'Soft Graphite', swatch: swatch('mp-2'), photo: 1 },
      { code: 'MP-3', name: 'German Grey', swatch: swatch('mp-3'), photo: 1 },
      { code: 'MP-4', name: 'Anthem Grey', swatch: swatch('mp-4'), photo: 1 },
      { code: 'MP-5', name: 'Ivory Cream', swatch: swatch('mp-5'), photo: 1 },
      { code: 'MP-6', name: 'Golden Oat', swatch: swatch('mp-6'), photo: 1 },
      { code: 'MP-7', name: 'Belgian Beige', swatch: swatch('mp-7'), photo: 1 },
      { code: 'MP-8', name: 'Brown Dove', swatch: swatch('mp-8'), photo: 1 },
      { code: 'MP-9', name: 'Baby Blue', swatch: swatch('mp-9'), photo: 2 },
      { code: 'MP-10', name: 'Sky Blue', swatch: swatch('mp-10'), photo: 2 },
      { code: 'MP-11', name: 'Hazel Green', swatch: swatch('mp-11'), photo: 2 },
      { code: 'MP-12', name: 'Forest Green', swatch: swatch('mp-12'), photo: 2 },
      { code: 'MP-13', name: 'Vista Blue', swatch: swatch('mp-13'), photo: 3 },
      { code: 'MP-14', name: 'Alpine Frost', swatch: swatch('mp-14'), photo: 3 },
    ],
    photos: [
      img(
        'katalog',
        'medipure-sampul',
        1600,
        1200,
        'Sampul buku sampel Marvel Medipure Homogeneous Flooring',
      ),
      img(
        'katalog',
        'medipure-warna-abu-krem',
        1600,
        1200,
        'Sampel warna Medipure MP-1 sampai MP-8: nuansa abu-abu dan krem',
      ),
      img(
        'katalog',
        'medipure-warna-biru-hijau',
        1600,
        1200,
        'Sampel warna Medipure MP-9 sampai MP-12: nuansa biru dan hijau',
      ),
      img(
        'katalog',
        'medipure-warna-vista-blue',
        1600,
        1200,
        'Sampel warna Medipure MP-13 Vista Blue dan MP-14 Alpine Frost',
      ),
    ],
  },
  {
    id: 'tarkett',
    brand: 'Tarkett',
    line: 'Somplan 350',
    type: 'Homogeneous Compact Vinyl Flooring',
    specs: [{ label: 'Jenis', value: 'Vinyl homogen' }], // TODO: tambah ukuran roll & tebal dari datasheet
    colors: [
      {
        code: '306007 001',
        name: 'Abu muda' /* TODO: nama resmi warna Tarkett */,
        swatch: swatch('tarkett-001'),
        photo: 0,
      },
      { code: '306007 002', name: 'Abu tua', swatch: swatch('tarkett-002'), photo: 0 },
      { code: '306007 006', name: 'Kuning', swatch: swatch('tarkett-006'), photo: 0 },
      { code: '306007 008', name: 'Biru', swatch: swatch('tarkett-008'), photo: 0 },
      { code: '306007 011', name: 'Hijau', swatch: swatch('tarkett-011'), photo: 0 },
    ],
    photos: [
      img(
        'katalog',
        'tarkett-somplan-350',
        1200,
        1600,
        'Kartu sampel Tarkett Somplan 350 dengan lima pilihan warna',
      ),
      img(
        'katalog',
        'sampel-vinyl-roll',
        1170,
        1243,
        'Buku sampel vinyl roll dengan pilihan warna lembut bermotif bintik',
      ),
    ],
  },
];

export type ProcessStage = { title: string; text: string; image: ImageAsset };

// Dokumentasi nyata di lokasi proyek (nama klien tidak ditampilkan)
export const processStages: ProcessStage[] = [
  {
    title: 'Pemasangan lembaran & plint',
    text: 'Vinyl roll dipasang di atas lantai dasar yang sudah diratakan, lalu dinaikkan ke dinding membentuk plint.',
    image: img(
      'proses',
      'tahap-1-pemasangan-lembaran',
      1280,
      960,
      'Lantai vinyl hijau baru terpasang dengan plint naik ke dinding saat ruangan masih dalam tahap pembangunan',
    ),
  },
  {
    title: 'Las sambungan',
    text: 'Sambungan antar lembaran dilas panas dengan kawat las yang warnanya disesuaikan agar rapat dan rapi.',
    image: img(
      'proses',
      'pengelasan-sambungan-vinyl',
      1170,
      1119,
      'Teknisi mengelas sambungan lantai vinyl dengan alat las panas, di samping gulungan kawat las berbagai warna',
    ),
  },
  {
    title: 'Proteksi selama finishing',
    text: 'Lantai yang sudah jadi ditutup plastik pelindung agar aman selama pekerjaan lain di ruangan selesai.',
    image: img(
      'proses',
      'tahap-2-proteksi-finishing',
      960,
      1280,
      'Koridor dengan lantai vinyl hijau yang ditutup plastik pelindung selama pekerjaan finishing',
    ),
  },
];
