// Kartu kategori → section produk: kirim event berisi kategori, lalu gulir ke #produk
import type { CategorySlug } from '@/data/categories';

export const CATEGORY_EVENT = 'sbk:pilih-kategori';

export function selectCategory(slug: CategorySlug) {
  window.dispatchEvent(new CustomEvent<CategorySlug>(CATEGORY_EVENT, { detail: slug }));
  document.getElementById('produk')?.scrollIntoView();
}
