// Pembuat objek gambar dari hasil `npm run optimize-images` (semua rasio 4:5)
import type { Img } from './types';

export function img(path: string, alt: string): Img {
  return {
    src: `/images/${path}.webp`,
    thumb: `/images/${path}-thumb.webp`,
    alt,
    width: 1200,
    height: 1500,
  };
}
