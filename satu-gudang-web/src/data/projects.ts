// Proyek portofolio. Teks (judul, lokasi, ringkasan, alt tiap foto) ada di src/content/{id,en}.ts.
// Tambah proyek: taruh foto di assets-src/projects/<slug>/01.jpg, 02.jpg, ... → npm run optimize-images
// → tambahkan entri di sini → tambahkan teksnya di content (urutan alt = urutan images).
import type { ServiceId } from './services';

export const projectCategories = ['commercial', 'residential'] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projectSlugs = [
  'spa-seminyak',
  'kitchen-benoa',
  'warm-wood-residence',
  'bedroom-tabanan',
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

export type Project = {
  slug: ProjectSlug;
  category: ProjectCategory;
  services: readonly ServiceId[];
  /** Path tanpa ekstensi; foto pertama = sampul */
  images: readonly string[];
};

const imgs = (slug: ProjectSlug, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/${slug}/${String(i + 1).padStart(2, '0')}`);

export const projects: readonly Project[] = [
  {
    slug: 'spa-seminyak',
    category: 'commercial',
    services: ['interior', 'furniture', 'build'],
    images: imgs('spa-seminyak', 9),
  },
  {
    slug: 'warm-wood-residence',
    category: 'residential',
    services: ['furniture', 'interior'],
    images: imgs('warm-wood-residence', 8),
  },
  {
    slug: 'kitchen-benoa',
    category: 'residential',
    services: ['furniture'],
    images: imgs('kitchen-benoa', 6),
  },
  {
    slug: 'bedroom-tabanan',
    category: 'residential',
    services: ['interior', 'furniture'],
    images: imgs('bedroom-tabanan', 2),
  },
];
