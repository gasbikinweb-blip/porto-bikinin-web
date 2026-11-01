// Gambar dari feed @sarikacangijobyheyda (folder assets/, diproses npm run optimize-images).
// Semua gambar ini poster desain (bukan foto produk asli), jadi kind = 'ilustrasi' dan tampil berlabel.
// Ganti dengan kind: 'foto' hanya untuk foto produk asli.
import type { VariantImage } from './variants';

export const heroImage: VariantImage = {
  src: '/images/deuumyhmse3-01.webp',
  alt: 'Dua botol Sari Kacang Ijo by Heyda di atas talenan kayu dengan mangkuk kacang hijau dan daun segar',
  width: 1086,
  height: 1448,
  kind: 'ilustrasi',
};

export const gallery: readonly (VariantImage & { thumb: string })[] = [
  {
    src: '/images/de72qrlekn0-01.webp',
    thumb: '/images/de72qrlekn0-01-thumb.webp',
    alt: 'Poster 4 varian Sari Kacang Ijo by Heyda: ORI, Bumil dan Busui, Kids, dan No Sugar',
    width: 941,
    height: 1672,
    kind: 'ilustrasi',
  },
  {
    src: '/images/depvkkienc4-02.webp',
    thumb: '/images/depvkkienc4-02-thumb.webp',
    alt: 'Poster free ongkir seluruh Yogyakarta dengan tumpukan botol sari kacang ijo',
    width: 1086,
    height: 1448,
    kind: 'ilustrasi',
  },
  {
    src: '/images/deuuahcgo6h-01.webp',
    thumb: '/images/deuuahcgo6h-01-thumb.webp',
    alt: 'Poster Sari Kacang Ijo by Heyda tersedia di tempat jajan pasar di Yogyakarta, dengan ilustrasi Tugu Jogja',
    width: 1086,
    height: 1448,
    kind: 'ilustrasi',
  },
  {
    src: '/images/depvkkienc4-01.webp',
    thumb: '/images/depvkkienc4-01-thumb.webp',
    alt: 'Poster pembukaan Heyda: tangan memegang sebotol sari kacang ijo',
    width: 1024,
    height: 1536,
    kind: 'ilustrasi',
  },
];
