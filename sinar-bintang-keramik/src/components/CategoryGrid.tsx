'use client';

// Kartu kategori: klik → filter kategori di section produk aktif + gulir ke sana
import Image from 'next/image';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { selectCategory } from '@/lib/category-event';

const count = (slug: string) => products.filter((p) => p.category === slug).length;

export function CategoryGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((c) => {
        const cover = products.find((p) => p.id === c.coverId);
        return (
          <li key={c.slug}>
            <button
              type="button"
              onClick={() => selectCategory(c.slug)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red hover:shadow-md"
            >
              {cover && (
                <span className="relative block aspect-[4/3] w-full bg-surface">
                  <Image
                    src={cover.image.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="flex flex-1 flex-col p-3">
                <span className="font-bold leading-snug group-hover:text-red">{c.name}</span>
                <span className="mt-1 text-xs text-muted">{c.hint}</span>
                <span className="mt-2 text-xs font-semibold text-red">
                  {count(c.slug)} produk →
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
