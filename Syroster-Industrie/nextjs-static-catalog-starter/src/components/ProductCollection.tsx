'use client';

// Koleksi produk dengan tab filter jenis. Hanya menyaring tampilan di browser.
import { useState } from 'react';
import type { Product } from '@/data/products';
import type { ProductType } from '@/data/projects';
import { ProductCard } from './ProductCard';
import { ProductDialog } from './ProductDialog';

type Props = { products: Product[]; labels: Record<ProductType, string>; siteName: string };

export function ProductCollection({ products, labels, siteName }: Props) {
  const types = Array.from(new Set(products.map((p) => p.type)));
  const [active, setActive] = useState<ProductType | 'semua'>('semua');
  const [selected, setSelected] = useState<Product | null>(null);
  const visible = active === 'semua' ? products : products.filter((p) => p.type === active);

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
            onClick={() => setActive(t)}
            className="min-h-11 rounded-full border border-line bg-white px-5 text-[0.95rem] font-medium text-ink transition-colors hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white"
          >
            {t === 'semua' ? 'Semua produk' : labels[t]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} produk
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
      <ProductDialog
        product={selected}
        labels={labels}
        siteName={siteName}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
