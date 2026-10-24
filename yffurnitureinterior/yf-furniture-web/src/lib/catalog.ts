import { categories } from '@/data/categories';
import { works } from '@/data/works';

// Kategori yang sudah punya karya, beserta jumlah & cover (karya selesai diutamakan)
export const activeCategories = categories
  .map((c) => {
    const items = works.filter((w) => w.category === c.slug);
    const cover = (items.find((w) => w.status === 'selesai') ?? items[0])?.cover;
    return { ...c, count: items.length, cover };
  })
  .filter((c) => c.count > 0);

export const categoryNames: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.slug, c.name]),
);
