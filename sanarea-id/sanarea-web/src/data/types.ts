// Tipe data katalog SANARÉA

export type Img = { src: string; thumb: string; alt: string; width: number; height: number };

export type CategorySlug = 'shawl' | 'khimar' | 'instan' | 'sport' | 'aksesoris';

export type Color = {
  name: string;
  slug: string;
  /** Perkiraan visual dari foto, bukan kode warna resmi */
  hex: string;
  images?: readonly Img[];
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: CategorySlug;
  price?: number;
  colors: readonly Color[];
  material?: string;
  size?: string;
  care?: string;
  notes?: string;
  images: readonly Img[];
  featured: boolean;
  soldOut?: boolean;
  sourceFolders: readonly string[];
};

export type Collection = { slug: string; name: string; tagline: string; cover: Img };

export type Promo = {
  id: string;
  title: string;
  productSlugs: readonly string[];
  /** Harga promo per produk (slug → harga) */
  salePrice?: Readonly<Record<string, number>>;
  /** Format YYYY-MM-DD, zona waktu Asia/Jakarta */
  startDate: string;
  endDate: string;
};
