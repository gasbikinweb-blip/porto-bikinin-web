import type { ProductImage } from './types';

/** Potongan foto produk dari poster IG Klaurist (dibuat oleh scripts/optimize-images.mjs) */
export const posterImg = (
  slug: string,
  alt: string,
  width: number,
  height: number,
): ProductImage => ({ src: `/images/${slug}.webp`, alt, width, height, kind: 'crop-poster' });
