'use client';

// Filter kategori: hanya memproses data lokal di browser, tidak mengirim apa pun ke mana pun
import { useEffect, useState } from 'react';
import type { Category, CategorySlug, Product } from '@/data/products';
import { ProductCard } from './ProductCard';

type Props = {
  products: readonly Product[];
  categories: readonly Category[];
};

type Filter = CategorySlug | 'semua';

const PAGE = 12;

export function ProductCatalog({ products, categories }: Props) {
  const [active, setActive] = useState<Filter>('semua');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);

  // Baca ?kategori= dari URL (link dari beranda), hanya terima nilai yang dikenal
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('kategori');
    const match = categories.find((c) => c.slug === param);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi sekali dari URL
    if (match) setActive(match.slug);
  }, [categories]);

  const select = (value: Filter) => {
    setActive(value);
    setLimit(PAGE);
    const url = value === 'semua' ? window.location.pathname : `?kategori=${value}`;
    window.history.replaceState(null, '', url);
  };

  const q = query.trim().toLowerCase();
  const visible = products.filter(
    (p) => (active === 'semua' || p.category === active) && (!q || p.name.toLowerCase().includes(q)),
  );
  const shown = visible.slice(0, limit);
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

      <div className="mx-auto mt-6 max-w-md">
        <label htmlFor="cari-produk" className="sr-only">
          Cari nama produk
        </label>
        <input
          id="cari-produk"
          type="search"
          value={query}
          maxLength={50}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Cari produk: nakas, rotan…"
          className="min-h-12 w-full rounded-full border border-line bg-background px-5 text-base outline-none transition-colors focus:border-accent"
        />
      </div>

      <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
        Menampilkan {shown.length} dari {visible.length} produk
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 min-[420px]:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <li key={p.slug} className="animate-in">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="mt-10 text-center text-muted">Produk tidak ditemukan. Coba kata kunci lain.</p>
      )}
      {limit < visible.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE)}
            className="min-h-12 rounded-full border border-line px-8 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-strong"
          >
            Tampilkan lebih banyak ({visible.length - limit} lagi)
          </button>
        </div>
      )}
    </div>
  );
}
