// Galeri "Hasil Pasang": foto di assets-src/hasil-pasang/, video di assets-src/video/.
// Keterangan disusun dari caption Instagram. TODO: verifikasi lokasi/klien bila ingin ditampilkan.
import type { CategorySlug } from './products';

export interface ProjectPhoto {
  src: string;
  alt: string;
  caption: string;
  category: CategorySlug;
}

export interface ProjectVideo {
  /** Nama file di public/video/ tanpa ekstensi (poster: <id>.webp) */
  id: string;
  title: string;
  category: CategorySlug | 'toko';
}

const photo = (n: number, category: CategorySlug, caption: string, alt: string): ProjectPhoto => ({
  src: `/hasil-pasang/${String(n).padStart(2, '0')}.webp`,
  alt,
  caption,
  category,
});

export const projectPhotos: readonly ProjectPhoto[] = [
  photo(
    1,
    'wallpaper',
    'Wallpaper mural floral di kamar utama',
    'Kamar tidur dengan wallpaper mural motif bunga dan burung di belakang headboard',
  ),
  photo(
    3,
    'gorden',
    'Gorden blackout abu, lipit rapi',
    'Gorden blackout abu-abu terpasang dari plafon hingga lantai',
  ),
  photo(
    2,
    'wallpaper',
    'Wallpaper custom pemandangan + lantai SPC',
    'Kamar dengan wallpaper custom bergambar padang rumput dan lantai SPC motif kayu',
  ),
  photo(
    5,
    'wallpaper',
    'Sebelum & sesudah pasang wallpaper',
    'Perbandingan dinding kamar sebelum dan sesudah dipasang wallpaper',
  ),
  photo(
    4,
    'gorden',
    'Vitrase ikat pita di jendela',
    'Gorden vitrase putih model ikat pita di jendela kayu',
  ),
  photo(
    7,
    'lantai-spc',
    'Lantai SPC motif kayu gelap',
    'Ruangan dengan lantai SPC motif kayu gelap setelah pemasangan',
  ),
  photo(
    6,
    'wallpaper',
    'Proses pemasangan wallpaper dinding tinggi',
    'Teknisi SA Living memasang wallpaper pada dinding tinggi dengan tangga',
  ),
  photo(
    9,
    'gorden',
    'Vitrase krem di jendela balkon',
    'Gorden vitrase krem di jendela kaca menghadap balkon',
  ),
  photo(
    8,
    'lantai-spc',
    'Lantai SPC motif kayu terang',
    'Kamar kosong dengan lantai SPC motif kayu terang',
  ),
  photo(10, 'gorden', 'Gorden pintu model pita', 'Gorden cokelat model ikat pita di pintu kaca'),
  photo(
    11,
    'lantai-spc',
    'Lantai SPC di kamar tidur',
    'Lantai SPC motif kayu di kamar tidur dekat rangka tempat tidur',
  ),
  photo(
    12,
    'gorden',
    'Pemasangan tirai roman shade',
    'Teknisi memasang tirai roman shade di jendela',
  ),
];

export const projectVideos: readonly ProjectVideo[] = [
  { id: 'daxx2gvpmrp', title: 'Sebelum & sesudah pasang wallpaper', category: 'wallpaper' },
  { id: 'dq-h626dyak', title: 'Proses pemasangan wallpaper', category: 'wallpaper' },
  { id: 'dbx7rmnvbyk', title: 'Koleksi wallpaper dinding di toko', category: 'wallpaper' },
  { id: 'dedt7lwpwkq', title: 'Wallpaper kertas vinyl ready stock', category: 'wallpaper' },
  { id: 'dabtxoypaof', title: 'Pilihan wallpaper tekstur linen', category: 'wallpaper' },
  { id: 'daxkl2lpadw', title: 'Wallpaper motif & tekstur', category: 'wallpaper' },
  { id: 'dtpijdbj5ip', title: 'Gorden vitrase di jendela balkon', category: 'gorden' },
  { id: 'dvnyljxd9to', title: 'Showroom gorden & lantai', category: 'toko' },
  { id: 'dchxby-jnms', title: 'Sebelum & sesudah lantai SPC', category: 'lantai-spc' },
  { id: 'dtmi3foeidu', title: 'Lantai SPC motif kayu terang', category: 'lantai-spc' },
  { id: 'dtzvhg5dzby', title: 'Finishing lantai SPC', category: 'lantai-spc' },
  { id: 'dxx9spxvidn', title: 'Kasa nyamuk magnet & roman shade', category: 'kasa-nyamuk' },
  { id: 'dt1yo2cj9-h', title: 'Kunjungan ke toko SA Living', category: 'toko' },
];
