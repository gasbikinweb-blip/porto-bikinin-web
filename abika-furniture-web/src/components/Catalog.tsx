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
        <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((c) => {
            const cover = getProduct(c.coverProduct)?.images[0];
            return (
              <li key={c.slug} className="reveal">
                <button
                  type="button"
                  onClick={() => pick(c.slug)}
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-surface text-left"
                >
                  {cover && (
                    <Image
                      src={cover.thumb}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-serif text-2xl text-white">
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
                  className="min-h-11 border border-foreground/25 px-4 text-sm transition-colors hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
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
                className="min-h-11 w-full border border-foreground/25 bg-background px-4 text-base"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted" aria-live="polite">
            Menampilkan {shown.length} dari {filtered.length} produk
          </p>

          {shown.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
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
                className="min-h-11 border border-foreground px-8 text-sm font-medium hover:bg-foreground hover:text-background"
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

function ProductCard({
  product: p,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product, el: HTMLElement) => void;
}) {
  const img = p.images[0];
  return (
    <article className="group">
      <button
        type="button"
        onClick={(e) => onOpen(p, e.currentTarget)}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-background"
        aria-label={`Lihat foto ${p.name}`}
      >
        {img && (
          <Image
            src={img.thumb}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {p.customizable && (
          <span className="absolute top-2 left-2 bg-background/90 px-2 py-1 text-[10px] font-medium tracking-wider uppercase">
            Bisa Custom
          </span>
        )}
      </button>
      <p className="mt-3 text-xs tracking-wider text-muted uppercase">{categoryName(p.category)}</p>
      <h3 className="mt-1 font-serif text-xl leading-tight">{p.name}</h3>
      <p className="mt-1 text-sm text-muted">{priceLabel(p)}</p>
      <button
        type="button"
        onClick={(e) => onOpen(p, e.currentTarget)}
        className="mt-2 min-h-11 text-sm font-medium underline underline-offset-4 hover:text-accent"
      >
        Lihat Detail<span className="sr-only"> {p.name}</span>
      </button>
    </article>
  );
}
