export type CategorySlug = 'sofa' | 'kursi' | 'meja' | 'lemari' | 'tempat-tidur';

export type Category = { slug: CategorySlug; name: string; coverProduct: string };

export const categories: Category[] = [
  { slug: 'sofa', name: 'Sofa', coverProduct: 'sofa-l-natural' },
  { slug: 'kursi', name: 'Kursi', coverProduct: 'kursi-makan-jati-busa' },
  { slug: 'meja', name: 'Meja', coverProduct: 'set-meja-makan-bench' },
  { slug: 'lemari', name: 'Lemari & Bufet', coverProduct: 'buffet-rotan-jati-mahogany' },
  { slug: 'tempat-tidur', name: 'Tempat Tidur', coverProduct: 'dipan-rotan-natural' },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;
