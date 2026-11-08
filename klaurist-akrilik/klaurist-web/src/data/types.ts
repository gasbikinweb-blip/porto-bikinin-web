// Tipe data bersama

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** foto = foto asli; crop-poster = potongan dari poster; placeholder = siluet SVG */
  kind: 'foto' | 'crop-poster' | 'placeholder';
};

export type Board = {
  slug: string;
  name: string;
  /** Harga sewa (Rupiah). Kosong = "Tanya harga" */
  rentalPrice?: number;
  rentalDuration?: string;
  size?: string;
  description: string;
  images: ProductImage[];
  featured: boolean;
};

export type BouquetGroup = 'paket' | 'round-daisy' | 'spesial' | 'satuan';

export type Variant = { label: string; price?: number };

export type Bouquet = {
  slug: string;
  name: string;
  group: BouquetGroup;
  variants: Variant[];
  stems?: string;
  colors?: string[];
  description: string;
  images: ProductImage[];
  featured: boolean;
};

export type Addon = { id: string; name: string; price?: number };
