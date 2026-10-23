// Tipe data bersama untuk seluruh website

export type CategorySlug =
  'rumah' | 'apartemen' | 'komersial' | 'kantor' | 'kesehatan-kebugaran' | 'industri' | 'kost';

/** Kelompok besar untuk beranda */
export type CategoryGroup = 'residensial' | 'komersial' | 'kantor' | 'industri';

export interface Category {
  slug: CategorySlug;
  label: string;
  group: CategoryGroup;
}

export type ImageKind = 'foto' | 'render' | 'before' | 'after';

export interface ProjectImage {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  kind: ImageKind;
}

export type ServiceSlug =
  'arsitektur' | 'desain-interior' | 'kitchen-set-furnitur' | 'renovasi' | 'property-management';

export interface Project {
  slug: string;
  title: string;
  category: CategorySlug;
  location?: string;
  scope: string[];
  services: ServiceSlug[];
  year?: number;
  summary?: string;
  cover: ProjectImage;
  images: ProjectImage[];
  featured: boolean;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string[];
  scope: string[];
  audience: string[];
}

export interface Faq {
  q: string;
  a: string;
}
