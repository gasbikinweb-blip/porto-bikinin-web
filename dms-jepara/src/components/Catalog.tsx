'use client';

// Kategori + katalog + modal detail dalam satu komponen karena berbagi filter dan produk terpilih.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductModal } from './ProductModal';
import { categories, categoryName, type CategorySlug } from '@/data/categories';
import { getProduct, priceLabel, products, type Product } from '@/data/products';

const PAGE = 12;
const HASH_PREFIX = '#produk-';

const slugFromHash = () => {
  const { hash } = window.location;
  // Whitelist: hanya slug yang ada di data
  return hash.startsWith(HASH_PREFIX) ? getProduct(hash.slice(HASH_PREFIX.length)) : undefined;
};

export function Catalog() {
  const [active, setActive] = useState<CategorySlug | 'semua'>('semua');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<Product | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const q = query.trim().toLowerCase();
  const filtered = products.filter(
    (p) =>
      (active === 'semua' || p.category === active) && (!q || p.name.toLowerCase().includes(q)),
  );
  const shown = filtered.slice(0, limit);

  // Deep link & tombol Back: URL #produk-slug menentukan modal yang terbuka
  useEffect(() => {
    const sync = () => {
      const product = slugFromHash() ?? null;
      if (!product) pushed.current = false;
      setSelected(product);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = (p: Product, el: HTMLElement) => {
    trigger.current = el;
    history.pushState(null, '', `${HASH_PREFIX}${p.slug}`);
    pushed.current = true;
    setSelected(p);
  };

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      history.back(); // popstate akan menutup modal
    } else {
      // Dibuka langsung dari link: bersihkan hash tanpa keluar dari website
      history.replaceState(null, '', window.location.pathname);
      setSelected(null);
    }
  }, []);

  // Kembalikan fokus ke pemicu setelah modal tertutup (termasuk lewat tombol Back)
  useEffect(() => {
    if (!selected) trigger.current?.focus();
  }, [selected]);

  const pick = (slug: CategorySlug) => {
    setActive(slug);
    setLimit(PAGE);
    document.getElementById('katalog')?.scrollIntoView();
  };

  const chips: { slug: CategorySlug | 'semua'; name: string }[] = [
    { slug: 'semua', name: 'Semua' },
    ...categories,
  ];

  return (
    <>
      <section id="kategori" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="reveal text-xs font-medium tracking-[0.25em] text-muted uppercase">
          Kategori
        </p>
        <h2 className="reveal mt-3 font-serif text-4xl sm:text-5xl">
          Temukan untuk <em className="text-accent">setiap ruang</em>
        </h2>
        <ul
          data-stagger
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
        >
          {categories.map((c) => {
            const cover = getProduct(c.coverProduct)?.images[0];
            return (
              <li key={c.slug} className="reveal">
                <button
                  type="button"
                  onClick={() => pick(c.slug)}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface text-left sm:rounded-3xl"
                >
                  {cover && (
                    <Image
                      src={cover.thumb}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 font-serif text-xl leading-tight text-white sm:text-2xl">
                    {c.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="katalog" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.25em] text-muted uppercase">Katalog</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Pilih furnitur Anda</h2>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={active === c.slug}
                  onClick={() => {
                    setActive(c.slug);
                    setLimit(PAGE);
                  }}
                  className="min-h-11 rounded-full border border-foreground/25 px-5 text-sm transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="lg:w-72">
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
                placeholder="Cari nama produk…"
                className="min-h-11 w-full rounded-full border border-foreground/25 bg-background px-5 text-base"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted" aria-live="polite">
            Menampilkan {shown.length} dari {filtered.length} produk
          </p>

          {shown.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 min-[400px]:gap-3 sm:gap-5 lg:grid-cols-4">
              {shown.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} onOpen={open} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-muted">Produk tidak ditemukan. Coba kata kunci lain ya.</p>
          )}

          {limit < filtered.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + PAGE)}
                className="min-h-11 rounded-full border border-foreground px-8 text-sm font-medium hover:bg-foreground hover:text-background"
              >
                Tampilkan lebih banyak
              </button>
            </div>
          )}
        </div>
      </section>

      <ProductModal product={selected} onClose={close} />
    </>
  );
}

// Ikon garis sederhana per kategori (dekoratif)
const categoryIcon: Record<CategorySlug, React.ReactNode> = {
  sofa: (
    <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11a2 2 0 0 1 2 2v2h14v-2a2 2 0 1 1 2 2v3H3v-3a2 2 0 0 1 0-4ZM6 18v2M18 18v2" />
  ),
  'meja-makan': <path d="M3 9h18M5 9v11M19 9v11M8 9V6h8v3M9 14h6" />,
  'meja-rias': (
    <path d="M8 4h8a3 3 0 0 1 3 3v3H5V7a3 3 0 0 1 3-3ZM4 10h16v4H4zM6 14v6M18 14v6M10 12h4" />
  ),
  lemari: <path d="M5 3h14v18H5zM12 3v18M9.5 11v2M14.5 11v2M5 21v1M19 21v1" />,
  'tempat-tidur': (
    <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M3 18v2M21 18v2M6 9V6h5v3M13 9V6h5v3" />
  ),
  interior: <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />,
};

function ProductCard({
  product: p,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product, el: HTMLElement) => void;
}) {
  const img = p.images[0];
  return (
    <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink text-white sm:rounded-3xl">
      {img && (
        <Image
          src={img.thumb}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5"
      />

      <span
        aria-hidden="true"
        className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow sm:top-4 sm:left-4 sm:size-11"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 sm:size-5"
        >
          {categoryIcon[p.category]}
        </svg>
      </span>
      {p.customizable && (
        <span className="absolute top-3 right-3 hidden rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase backdrop-blur max-[399px]:block sm:top-4 sm:right-4 sm:block">
          Bisa Custom
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
        <p className="text-[10px] tracking-wider text-white/70 uppercase sm:text-xs">
          {categoryName(p.category)}
        </p>
        <h3 className="mt-1 font-serif text-2xl leading-tight [overflow-wrap:anywhere] min-[400px]:max-sm:text-base">
          <button
            type="button"
            onClick={(e) => onOpen(p, e.currentTarget)}
            className="text-left after:absolute after:inset-0"
          >
            {p.name}
          </button>
        </h3>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="line-clamp-2 text-sm leading-snug text-white/80 min-[400px]:max-sm:hidden">
            {p.description}
          </p>
          <p className="hidden text-xs text-white/80 min-[400px]:max-sm:block">{priceLabel(p)}</p>
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:bg-accent group-hover:text-white sm:size-10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-4 -rotate-45 transition-transform group-hover:rotate-0"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
