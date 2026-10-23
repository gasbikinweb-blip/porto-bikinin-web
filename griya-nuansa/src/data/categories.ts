import type { Category, CategoryGroup, CategorySlug } from './types';

export const categories: Category[] = [
  { slug: 'rumah', label: 'Rumah', group: 'residensial' },
  { slug: 'apartemen', label: 'Apartemen', group: 'residensial' },
  { slug: 'kost', label: 'Kost & Properti Sewa', group: 'residensial' },
  { slug: 'komersial', label: 'Komersial & F&B', group: 'komersial' },
  { slug: 'kesehatan-kebugaran', label: 'Kesehatan & Kebugaran', group: 'komersial' },
  { slug: 'kantor', label: 'Kantor', group: 'kantor' },
  { slug: 'industri', label: 'Industri', group: 'industri' },
];

export const categoryGroups: { slug: CategoryGroup; label: string; description: string }[] = [
  { slug: 'residensial', label: 'Residensial', description: 'Rumah tinggal, apartemen, dan kost.' },
  { slug: 'komersial', label: 'Komersial', description: 'Kafe, bakery, gym, dan klinik.' },
  { slug: 'kantor', label: 'Kantor', description: 'Ruang kerja yang fungsional dan berkarakter.' },
  { slug: 'industri', label: 'Industri', description: 'Fasilitas dan bangunan industri.' },
];

export function getCategory(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Kategori tidak dikenal: ${slug}`);
  return c;
}
