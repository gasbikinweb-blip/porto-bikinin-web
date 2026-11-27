export type CategorySlug =
  'sofa' | 'meja-makan' | 'meja-rias' | 'lemari' | 'tempat-tidur' | 'interior';

export type Category = { slug: CategorySlug; name: string; coverProduct: string };

export const categories: Category[] = [
  { slug: 'sofa', name: 'Sofa & Kursi', coverProduct: 'sofa-luxury-ukir-klasik' },
  { slug: 'meja-makan', name: 'Meja Makan & Meja', coverProduct: 'meja-makan-sultan' },
  { slug: 'meja-rias', name: 'Meja Rias', coverProduct: 'meja-rias-lampu-cermin' },
  { slug: 'lemari', name: 'Lemari & Credenza', coverProduct: 'credenza-luxury' },
  { slug: 'tempat-tidur', name: 'Tempat Tidur', coverProduct: 'bed-caroline-luxury' },
  { slug: 'interior', name: 'Kitchen & Interior', coverProduct: 'kitchen-set-luxury' },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;
