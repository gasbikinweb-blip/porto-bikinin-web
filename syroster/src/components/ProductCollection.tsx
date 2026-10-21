'use client';

// Koleksi produk dengan tab filter jenis. Hanya menyaring tampilan di browser.
import { useState } from 'react';
import type { Product, ProductType } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';

const INITIAL = 12;

type Props = { products: Product[]; labels: Record<ProductType, string> };

export function ProductCollection({ products, labels }: Props) {
  // Urutan tab mengikuti urutan label (roster dulu), hanya jenis yang punya produk
  const types = (Object.keys(labels) as ProductType[]).filter((t) =>
    products.some((p) => p.type === t),
  );
  const [active, setActive] = useState<ProductType | 'semua'>('semua');
  const [selected, setSelected] = useState<Product | null>(null);
  const [showAll, setShowAll] = useState(false);
  const filtered = active === 'semua' ? products : products.filter((p) => p.type === active);
  // Tampilan awal ringkas agar halaman tidak terlalu panjang
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <div>
      <div
        role="group"
        aria-label="Saring jenis produk"
        className="flex flex-wrap justify-center gap-2.5"
      >
        {(['semua', ...types] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={active === t}
            onClick={() => {
              setActive(t);
              setShowAll(false);
            }}
            className="min-h-11 rounded-full border border-line bg-white px-5 text-[0.95rem] font-medium text-ink transition-colors hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white"
          >
            {t === 'semua' ? 'Semua produk' : labels[t]}{' '}
            <span className="opacity-70">
              ({t === 'semua' ? products.length : products.filter((p) => p.type === t).length})
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} dari {filtered.length} produk
      </p>
      <ul
        key={active}
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4"
        data-stagger
      >
        {visible.map((p) => (
          <li key={p.slug} className="reveal">
            <ProductCard product={p} category={labels[p.type]} onOpen={() => setSelected(p)} />
          </li>
        ))}
      </ul>
      {filtered.length > visible.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="min-h-12 rounded-full border-2 border-brand px-7 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Tampilkan semua ({filtered.length} produk)
          </button>
        </div>
      )}
      <ProductDialog product={selected} labels={labels} onClose={() => setSelected(null)} />
    </div>
  );
}
