'use client';

// Produk pilihan: filter kategori & ukuran, awalnya produk unggulan, lalu "Tampilkan lebih banyak" 12 per klik
import { useEffect, useState } from 'react';
import { categories, type CategorySlug } from '@/data/categories';
import { products } from '@/data/products';
import { CATEGORY_EVENT } from '@/lib/category-event';
import { ProductCard } from './ProductCard';

const STEP = 12;
const featuredCount = products.filter((p) => p.featured).length;

// Urutkan ukuran: 10x20 < 25x25 < 40x40 ... (berdasarkan luas)
const area = (s: string) => s.split('x').reduce((a, n) => a * Number(n.replace(',', '.')), 1);

export function ProductSection() {
  const [category, setCategory] = useState<CategorySlug | 'semua'>('semua');
  const [size, setSize] = useState('semua');
  const [shown, setShown] = useState(featuredCount);

  // Dipicu kartu kategori
  useEffect(() => {
    const onPick = (e: Event) => {
      setCategory((e as CustomEvent<CategorySlug>).detail);
      setSize('semua');
      setShown(STEP);
    };
    window.addEventListener(CATEGORY_EVENT, onPick);
    return () => window.removeEventListener(CATEGORY_EVENT, onPick);
  }, []);

  const inCategory = products.filter((p) => category === 'semua' || p.category === category);
  const sizes = [...new Set(inCategory.flatMap((p) => (p.size ? [p.size] : [])))].sort(
    (a, b) => area(a) - area(b),
  );
  const filtered = inCategory.filter((p) => size === 'semua' || p.size === size);
  const visible = filtered.slice(0, shown);

  const pickCategory = (c: CategorySlug | 'semua') => {
    setCategory(c);
    setSize('semua');
    // Tanpa filter: mulai dari produk unggulan; dengan filter: 12 pertama
    setShown(c === 'semua' ? featuredCount : STEP);
  };

  const chip = (active: boolean) =>
    `min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
      active
        ? 'border-red bg-red text-white'
        : 'border-line bg-white hover:border-red hover:text-red'
    }`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2"
      >
        <button
          type="button"
          aria-pressed={category === 'semua'}
          onClick={() => pickCategory('semua')}
          className={chip(category === 'semua')}
        >
          Semua
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={category === c.slug}
            onClick={() => pickCategory(c.slug)}
            className={chip(category === c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        {sizes.length > 1 ? (
          <label className="flex items-center gap-2 text-sm font-semibold">
            Ukuran
            <select
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setShown(STEP);
              }}
              className="min-h-11 rounded-lg border border-line bg-white px-3"
            >
              <option value="semua">Semua ukuran</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span />
        )}
        <p className="text-sm text-muted" aria-live="polite">
          Menampilkan {visible.length} dari {filtered.length} produk
        </p>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      {visible.length < filtered.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + STEP)}
            className="min-h-12 rounded-lg border-2 border-ink px-6 font-bold hover:bg-ink hover:text-white"
          >
            Tampilkan lebih banyak ({filtered.length - visible.length} lagi)
          </button>
        </div>
      )}
    </div>
  );
}
