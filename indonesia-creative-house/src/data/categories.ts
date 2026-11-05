export const categories = [
  { slug: 'snack', name: 'Snack', cover: 'snack-besekan' },
  { slug: 'tampah', name: 'Tampah', cover: 'tampah-kue-jajanan-pasar' },
  { slug: 'nasi', name: 'Aneka Nasi', cover: 'nasi-tumpeng' },
  { slug: 'cenil', name: 'Cenil', cover: 'tumpeng-cenil' },
  { slug: 'pempek', name: 'Pempek', cover: 'pempek-tampah' },
  { slug: 'dimsum', name: 'Dimsum', cover: 'dimsum-tampah' },
  { slug: 'bubur', name: 'Bubur Manis', cover: 'tampah-bubur-kendil' },
  { slug: 'kue', name: 'Kue & Tart', cover: 'serabi-tart' },
  { slug: 'hantaran', name: 'Hantaran', cover: 'hantaran-lamaran' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;
