export const categories = [
  { slug: 'snack', name: 'Snack', cover: 'snack-besekan', desc: 'Snack box, besek, dan cup.' },
  {
    slug: 'tampah',
    name: 'Tampah',
    cover: 'tampah-kue-jajanan-pasar',
    desc: 'Kue, rebusan, dan rujak.',
  },
  {
    slug: 'nasi',
    name: 'Aneka Nasi',
    cover: 'nasi-tumpeng',
    desc: 'Tumpeng, box, besek, dan rantang.',
  },
  {
    slug: 'cenil',
    name: 'Cenil',
    cover: 'tumpeng-cenil',
    desc: 'Tumpeng, tampah, besek, dan cup.',
  },
  { slug: 'pempek', name: 'Pempek', cover: 'pempek-tampah', desc: 'Tampah, besek, dan rantang.' },
  { slug: 'dimsum', name: 'Dimsum', cover: 'dimsum-tampah', desc: 'Tampah, besek, dan rantang.' },
  {
    slug: 'bubur',
    name: 'Bubur Manis',
    cover: 'tampah-bubur-kendil',
    desc: 'Tampah kendil dan cup.',
  },
  { slug: 'kue', name: 'Kue & Tart', cover: 'serabi-tart', desc: 'Serabi, onde, dan lapis legit.' },
  {
    slug: 'hantaran',
    name: 'Hantaran',
    cover: 'hantaran-lamaran',
    desc: 'Rantang cantik dan lamaran.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;
