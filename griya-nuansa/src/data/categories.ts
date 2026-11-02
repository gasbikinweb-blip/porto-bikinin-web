import type { L } from '@/i18n';
import type { Category, CategoryGroup, CategorySlug } from './types';

export const categories: Category[] = [
  { slug: 'rumah', label: { id: 'Rumah', en: 'House' }, group: 'residensial' },
  { slug: 'apartemen', label: { id: 'Apartemen', en: 'Apartment' }, group: 'residensial' },
  {
    slug: 'kost',
    label: { id: 'Kost & Properti Sewa', en: 'Boarding & Rental' },
    group: 'residensial',
  },
  {
    slug: 'komersial',
    label: { id: 'Komersial & F&B', en: 'Commercial & F&B' },
    group: 'komersial',
  },
  {
    slug: 'kesehatan-kebugaran',
    label: { id: 'Kesehatan & Kebugaran', en: 'Health & Fitness' },
    group: 'komersial',
  },
  { slug: 'kantor', label: { id: 'Kantor', en: 'Office' }, group: 'kantor' },
  { slug: 'industri', label: { id: 'Industri', en: 'Industrial' }, group: 'industri' },
];

export const categoryGroups: { slug: CategoryGroup; label: L; description: L }[] = [
  {
    slug: 'residensial',
    label: { id: 'Residensial', en: 'Residential' },
    description: {
      id: 'Rumah tinggal, apartemen, dan kost.',
      en: 'Homes, apartments, and boarding houses.',
    },
  },
  {
    slug: 'komersial',
    label: { id: 'Komersial', en: 'Commercial' },
    description: {
      id: 'Kafe, bakery, gym, dan klinik.',
      en: 'Cafés, bakeries, gyms, and clinics.',
    },
  },
  {
    slug: 'kantor',
    label: { id: 'Kantor', en: 'Office' },
    description: {
      id: 'Ruang kerja yang fungsional dan berkarakter.',
      en: 'Functional workspaces with character.',
    },
  },
  {
    slug: 'industri',
    label: { id: 'Industri', en: 'Industrial' },
    description: {
      id: 'Fasilitas dan bangunan industri.',
      en: 'Industrial facilities and buildings.',
    },
  },
];

export function getCategory(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Kategori tidak dikenal: ${slug}`);
  return c;
}
