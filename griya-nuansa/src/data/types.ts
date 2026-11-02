// Tipe data bersama untuk seluruh website
import type { L } from '@/i18n';
import type { Region } from './project-facts';

export type CategorySlug =
  'rumah' | 'apartemen' | 'komersial' | 'kantor' | 'kesehatan-kebugaran' | 'industri' | 'kost';

/** Kelompok besar untuk beranda */
export type CategoryGroup = 'residensial' | 'komersial' | 'kantor' | 'industri';

export interface Category {
  slug: CategorySlug;
  label: L;
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
  /** Kelompok wilayah untuk filter lokasi */
  region?: Region;
  scope: string[];
  services: ServiceSlug[];
  year?: number;
  buildingArea?: string;
  landArea?: string;
  summary?: string;
  cover: ProjectImage;
  images: ProjectImage[];
  featured: boolean;
}

export interface Service {
  slug: ServiceSlug;
  title: L;
  short: L;
  description: L<string[]>;
  scope: L<string[]>;
  audience: L<string[]>;
}

export interface Faq {
  q: string;
  a: string;
}
