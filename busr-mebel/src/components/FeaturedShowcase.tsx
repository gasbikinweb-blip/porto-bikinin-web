'use client';

// Etalase produk unggulan: tab kategori + slider geser (ala toko furnitur) + modal Lihat Cepat
import { useRef, useState } from 'react';
import type { Category, CategorySlug, Product } from '@/data/products';
import { ArrowIcon } from './icons';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

type Props = {
  products: readonly Product[];
  categories: readonly Category[];
};

type Tab = CategorySlug | 'semua';

export function FeaturedShowcase({ products, categories }: Props) {
  const [tab, setTab] = useState<Tab>('semua');
  const [quick, setQuick] = useState<Product | null>(null);
  const track = useRef<HTMLUListElement>(null);

  const tabs: { value: Tab; label: string }[] = [
    { value: 'semua', label: 'Semua' },
    ...categories
      .filter((c) => products.some((p) => p.category === c.slug))
      .map((c) => ({ value: c.slug, label: c.name.split(' & ')[0] ?? c.name })),
  ];
  const visible = tab === 'semua' ? products : products.filter((p) => p.category === tab);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const choose = (value: Tab) => {
    setTab(value);
    track.current?.scrollTo({ left: 0 });
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter produk unggulan"
        className="-mx-4 flex gap-6 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:justify-end sm:px-0"
      >
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            aria-pressed={tab === t.value}
            onClick={() => choose(t.value)}
            className="tab-underline relative shrink-0 pb-3 text-xs font-semibold tracking-[0.18em] text-muted uppercase transition-colors hover:text-foreground aria-pressed:text-accent"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative mt-10">
        <ul
          key={tab}
          ref={track}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:px-0"
        >
          {visible.map((p, i) => (
            <li
              key={p.slug}
              className="animate-card w-[78%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              style={{ '--delay': `${Math.min(i, 6) * 90}ms` } as React.CSSProperties}
            >
              <ProductCard
                product={p}
                onQuickView={setQuick}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
              />
            </li>
          ))}
        </ul>

        {visible.length > 2 && (
          <>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Geser ke kiri"
              className="absolute top-[38%] -left-5 hidden size-11 place-items-center border border-line bg-background transition hover:bg-foreground hover:text-background sm:grid"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Geser ke kanan"
              className="absolute top-[38%] -right-5 hidden size-11 place-items-center bg-foreground text-background transition hover:bg-accent sm:grid"
            >
              <ArrowIcon className="size-4" />
            </button>
          </>
        )}
      </div>

      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
