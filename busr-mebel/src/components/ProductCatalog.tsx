'use client';

// Filter kategori: hanya memproses data lokal di browser, tidak mengirim apa pun ke mana pun
import { useEffect, useState } from 'react';
import type { Category, CategorySlug, Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

type Props = {
  products: readonly Product[];
  categories: readonly Category[];
};

type Filter = CategorySlug | 'semua';

export function ProductCatalog({ products, categories }: Props) {
  const [active, setActive] = useState<Filter>('semua');
  const [quick, setQuick] = useState<Product | null>(null);

  // Baca ?kategori= dari URL (link dari beranda), hanya terima nilai yang dikenal
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('kategori');
    const match = categories.find((c) => c.slug === param);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi sekali dari URL
    if (match) setActive(match.slug);
  }, [categories]);

  const select = (value: Filter) => {
    setActive(value);
    const url = value === 'semua' ? window.location.pathname : `?kategori=${value}`;
    window.history.replaceState(null, '', url);
  };

  const visible = active === 'semua' ? products : products.filter((p) => p.category === active);
  const options: { value: Filter; label: string; count: number }[] = [
    { value: 'semua', label: 'Semua', count: products.length },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.name,
      count: products.filter((p) => p.category === c.slug).length,
    })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={active === o.value}
            onClick={() => select(o.value)}
            className="shrink-0 rounded-full border border-line px-5 py-2 text-sm transition-colors duration-300 hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
          >
            {o.label} <sup className="text-[10px] opacity-70">{o.count}</sup>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} produk
      </p>

      <ul key={active} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p, i) => (
          <li
            key={p.slug}
            className="animate-card"
            style={{ '--delay': `${Math.min(i, 11) * 60}ms` } as React.CSSProperties}
          >
            <ProductCard product={p} onQuickView={setQuick} />
          </li>
        ))}
      </ul>

      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
