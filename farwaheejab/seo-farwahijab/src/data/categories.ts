export const categorySlugs = ['khimar-khiban', 'hijab-instan', 'segi-empat', 'pashmina'] as const;
export type CategorySlug = (typeof categorySlugs)[number];

export type Category = { slug: CategorySlug; name: string; description: string };

export const categories: readonly Category[] = [
  {
    slug: 'khimar-khiban',
    name: 'Khimar & Khiban',
    description: 'Khimar bandana instan bahan voal, syar’i tapi tetap gampang dipakai.',
  },
  {
    slug: 'hijab-instan',
    name: 'Hijab Instan',
    description: 'Bergo dan hijab instan rayon viscose yang ringan untuk harian.',
  },
  {
    slug: 'segi-empat',
    name: 'Segi Empat',
    description: 'Hijab segi empat syar’i 140×140 cm yang mudah dibentuk.',
  },
  {
    slug: 'pashmina',
    name: 'Pashmina',
    description: 'Pashmina rayon yang jatuh dan flowy.',
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
