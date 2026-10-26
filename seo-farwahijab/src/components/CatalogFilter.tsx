'use client';

// Filter katalog: kategori + warna. Kategori bisa dibuka lewat ?kategori=slug (dari footer/beranda).
import { useEffect, useState } from 'react';
import type { Category } from '@/data/categories';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductModal, type OpenProduct } from './ProductModal';

type Props = {
  products: readonly Product[];
  categories: readonly Category[];
  colors: readonly { name: string; hex: string }[];
};

export function CatalogFilter({ products, categories, colors }: Props) {
  const [category, setCategory] = useState('semua');
  const [color, setColor] = useState<string | null>(null);
  const [modal, setModal] = useState<OpenProduct | null>(null);

  // Baca kategori awal dari URL (static export: dibaca di browser setelah halaman tampil)
  // (ditunda dengan setTimeout agar tidak setState sinkron di dalam effect; rAF tidak jalan di tab latar)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const fromUrl = new URLSearchParams(window.location.search).get('kategori');
      if (fromUrl && categories.some((c) => c.slug === fromUrl)) setCategory(fromUrl);
    }, 0);
    return () => window.clearTimeout(id);
  }, [categories]);

  const shown = products.filter(
    (p) =>
      (category === 'semua' || p.category === category) &&
      (!color || p.colors.some((c) => c.name.toLowerCase() === color.toLowerCase())),
  );

  const pill =
    'min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors aria-pressed:border-mocha aria-pressed:bg-mocha aria-pressed:text-background';

  return (
    <>
      <div className="space-y-4">
        <div
          role="group"
          aria-label="Filter kategori"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {[{ slug: 'semua', name: 'Semua' }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={`${pill} border-line bg-background hover:border-mocha`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <details className="group rounded-2xl border border-line bg-background open:pb-4">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold">
            <span>Filter warna{color ? `: ${color}` : ''}</span>
            <span aria-hidden="true" className="transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div role="group" aria-label="Filter warna" className="flex flex-wrap gap-2 px-4">
            <button
              type="button"
              aria-pressed={color === null}
              onClick={() => setColor(null)}
              className={`${pill} border-line`}
            >
              Semua warna
            </button>
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={color === c.name}
                onClick={() => setColor(color === c.name ? null : c.name)}
                className={`${pill} inline-flex items-center gap-2 border-line`}
              >
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border border-mocha/20"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            ))}
          </div>
        </details>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {shown.length} produk
      </p>
      {shown.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((p, i) => (
            <li key={p.slug} data-reveal>
              <ProductCard
                product={p}
                priority={i < 2}
                onOpen={(product, origin) => setModal({ product, origin })}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface p-6 text-center">
          Belum ada produk dengan kombinasi ini, Kak. Coba pilih warna lain ya.
        </p>
      )}
      {modal && <ProductModal open={modal} onClose={() => setModal(null)} />}
    </>
  );
}
