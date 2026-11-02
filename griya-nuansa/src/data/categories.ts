import type { L } from '@/i18n';
import type { Category, CategoryGroup, CategorySlug } from './types';

// Kategori sesuai Brief Web Griya Nuansa: Residential, Retail & Commercial, Office, Interior.
// Pembagian proyek mengikuti kolom "Kategori" di Data Website Griya Nuansa.xlsx.
export const categories: Category[] = [
  { slug: 'residensial', label: { id: 'Residensial', en: 'Residential' }, group: 'residensial' },
  {
    slug: 'komersial',
    label: { id: 'Retail & Komersial', en: 'Retail & Commercial' },
    group: 'komersial',
  },
  { slug: 'kantor', label: { id: 'Kantor', en: 'Office' }, group: 'kantor' },
  { slug: 'interior', label: { id: 'Interior', en: 'Interior' }, group: 'interior' },
];

export const categoryGroups: { slug: CategoryGroup; label: L; description: L }[] = [
  {
    slug: 'residensial',
    label: { id: 'Residensial', en: 'Residential' },
    description: {
      id: 'Rumah tinggal dan apartemen, dari desain hingga pembangunan.',
      en: 'Homes and apartments, from design to construction.',
    },
  },
  {
    slug: 'komersial',
    label: { id: 'Retail & Komersial', en: 'Retail & Commercial' },
    description: {
      id: 'Kafe, bakery, gym, klinik, dan properti sewa.',
      en: 'Cafés, bakeries, gyms, clinics, and rental properties.',
    },
  },
  {
    slug: 'kantor',
    label: { id: 'Kantor', en: 'Office' },
    description: {
      id: 'Ruang kerja dan bangunan perusahaan yang fungsional dan berkarakter.',
      en: 'Functional workspaces and company buildings with character.',
    },
  },
  {
    slug: 'interior',
    label: { id: 'Interior', en: 'Interior' },
    description: {
      id: 'Desain interior hunian yang personal dan nyaman.',
      en: 'Personal, comfortable residential interior design.',
    },
  },
];

export function getCategory(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Kategori tidak dikenal: ${slug}`);
  return c;
}
