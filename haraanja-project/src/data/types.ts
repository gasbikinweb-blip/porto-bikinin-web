// Tipe data katalog Haraanja Project

export type CategoryId =
  'tumbler' | 'gelas' | 'mangkok' | 'peralatan-makan' | 'tekstil' | 'termos' | 'kemasan';

export type OccasionId =
  'pernikahan' | 'khitan' | 'hajatan' | 'haji-umroh' | 'natal' | 'idul-fitri';

export type ProductImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type Variant = {
  label: string;
  image?: ProductImage;
  price?: number;
};

export type Product = {
  slug: string;
  shopeeItemId: string;
  name: string;
  category: CategoryId;
  occasions: readonly OccasionId[];
  isPackaging: boolean;
  /** Harga per pcs di Shopee */
  price?: number;
  /** Contoh: "mulai dari" */
  priceNote?: string;
  variants?: readonly Variant[];
  size?: string;
  material?: string;
  includedPackaging?: string;
  minOrder?: number;
  customizable: boolean;
  seasonal?: OccasionId;
  images: readonly ProductImage[];
  featured: boolean;
};

export type Category = { id: CategoryId; name: string; description: string };
export type Occasion = { id: OccasionId; name: string; text: string; icon: string };
export type Addon = { id: string; name: string; price: number; note: string; shopeeItemId: string };
export type Seasonal = {
  id: OccasionId;
  title: string;
  text: string;
  /** Format YYYY-MM-DD */
  start: string;
  end: string;
  image: string;
};
export type GalleryItem = { src: string; thumb: string; alt: string; caption: string };
export type Faq = { q: string; a: string };
