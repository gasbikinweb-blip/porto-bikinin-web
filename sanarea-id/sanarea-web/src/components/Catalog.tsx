'use client';

// Katalog: filter kategori (chip), lini (dari slider koleksi), dan warna (panel buka-tutup), kartu dengan swatch warna, "Tampilkan lebih banyak" 12 per langkah,
// dan modal detail dengan deep link /#produk-[slug] (opsional ?warna=[slug]).
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { categories } from '@/data/categories';
import { collections } from '@/data/collections';
import { getProduct, products } from '@/data/products';
import { salePriceOf } from '@/data/promos';
import type { CategorySlug, Product } from '@/data/types';
import { formatPrice } from '@/lib/format';
import { ProductModal } from './ProductModal';

export const COLLECTION_EVENT = 'sanarea:koleksi';

// Semua warna unik dari seluruh produk (nama tanpa beda huruf besar/kecil), urut abjad
const allColors = [
  ...new Map(
    products.flatMap((p) => p.colors).map((c) => [c.name.toLowerCase(), c] as const),
  ).values(),
].sort((a, b) => a.name.localeCompare(b.name, 'id'));
const categoryName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name;
const STEP = 12;
const PREFIX = '#produk-';

// Baca modal dari URL; slug & warna divalidasi terhadap data (whitelist)
function fromUrl(): { slug: string; color?: string } | null {
  const h = window.location.hash;
  if (!h.startsWith(PREFIX)) return null;
  const p = getProduct(h.slice(PREFIX.length));
  if (!p) return null;
  const w = new URLSearchParams(window.location.search).get('warna') ?? undefined;
  return { slug: p.slug, color: p.colors.some((c) => c.slug === w) ? w : undefined };
}

function ProductCard({
  p,
  onOpen,
  colorFilter,
}: {
  p: Product;
  onOpen: (color?: string) => void;
  colorFilter?: string;
}) {
  const [hover, setHover] = useState<string | undefined>();
  // Saat filter warna aktif, kartu langsung menampilkan warna itu
  const filtered = p.colors.find((c) => c.name.toLowerCase() === colorFilter)?.slug;
  const preview = hover ?? filtered;
  const setPreview = setHover;
  const shown = p.colors.find((c) => c.slug === preview)?.images?.[0] ?? p.images[0];
  const sale = salePriceOf(p.slug);
  const dots = p.colors.slice(0, 5);

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(preview)}
        aria-haspopup="dialog"
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] bg-surface"
      >
        {shown && (
          <Image
            key={shown.thumb}
            src={shown.thumb}
            alt={shown.alt}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 48vw"
            className="animate-fade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        {p.soldOut && (
          <span className="absolute top-3 left-3 bg-background px-2 py-1 text-[0.65rem] tracking-[0.2em] uppercase">
            Habis
          </span>
        )}
        <span className="sr-only">Lihat detail {p.name}</span>
      </button>
      <div className="pt-3.5">
        <p className="text-[0.6rem] tracking-[0.28em] text-muted uppercase">
          {categoryName(p.category)}
        </p>
        <h3 className="mt-1.5 font-serif text-lg leading-snug font-normal">
          <button
            type="button"
            onClick={() => onOpen(preview)}
            aria-haspopup="dialog"
            className="text-left hover:underline"
          >
            {p.name}
          </button>
        </h3>
        <p className="mt-1 text-sm">
          {sale !== undefined ? (
            <>
              <span className="mr-2 text-muted line-through">{formatPrice(p.price)}</span>
              {formatPrice(sale)}
            </>
          ) : (
            <span className={p.price === undefined ? 'text-muted' : ''}>
              {formatPrice(p.price)}
            </span>
          )}
        </p>
        {p.colors.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-0.5">
            {dots.map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-label={`Warna ${c.name}`}
                aria-pressed={preview === c.slug}
                onMouseEnter={() => c.images && setPreview(c.slug)}
                onFocus={() => c.images && setPreview(c.slug)}
                onClick={() => (c.images ? setPreview(c.slug) : onOpen(c.slug))}
                className="grid size-7 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border border-black/10 ring-ink ring-offset-2 ring-offset-background in-aria-pressed:ring-1"
                  style={{ background: c.hex }}
                />
              </button>
            ))}
            {p.colors.length > dots.length && (
              <span className="ml-1 text-xs text-muted">
                +{p.colors.length - dots.length} warna
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Catalog() {
  const [category, setCategory] = useState<CategorySlug | 'semua'>('semua');
  const [line, setLine] = useState<string>('semua');
  const [color, setColor] = useState<string>('');
  const [colorsOpen, setColorsOpen] = useState(false);
  const [shown, setShown] = useState(STEP);
  const [detail, setDetail] = useState<{ slug: string; color?: string } | null>(null);
  // true bila modal dibuka dari halaman ini (ada entri history yang bisa di-back)
  const pushed = useRef(false);

  // Deep link: buka modal dari URL, tombol Back menutup
  useEffect(() => {
    const sync = () => {
      const d = fromUrl();
      if (!d) pushed.current = false;
      setDetail(d);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  // Kartu koleksi → filter lini
  useEffect(() => {
    const onPick = (e: Event) => {
      setLine((e as CustomEvent<string>).detail);
      setCategory('semua');
      setShown(STEP);
    };
    window.addEventListener(COLLECTION_EVENT, onPick);
    return () => window.removeEventListener(COLLECTION_EVENT, onPick);
  }, []);

  const writeUrl = (slug: string, color?: string, push = true) => {
    const url = `${window.location.pathname}${color ? `?warna=${color}` : ''}${PREFIX}${slug}`;
    if (push) history.pushState(null, '', url);
    else history.replaceState(null, '', url);
  };

  const open = (slug: string, color?: string) => {
    writeUrl(slug, color);
    pushed.current = true;
    setDetail({ slug, color });
  };

  const close = useCallback(() => {
    // Dibuka dari halaman ini: mundur satu langkah (sama seperti tombol Back)
    if (pushed.current) {
      pushed.current = false;
      history.back();
    } else if (window.location.hash.startsWith(PREFIX)) {
      // Dibuka dari link langsung: bersihkan URL tanpa meninggalkan situs
      history.replaceState(null, '', `${window.location.pathname}#katalog`);
    }
    setDetail(null);
  }, []);

  const list = products.filter(
    (p) =>
      (category === 'semua' || p.category === category) &&
      (line === 'semua' || p.collection === line) &&
      (!color || p.colors.some((c) => c.name.toLowerCase() === color)),
  );
  const colorLabel = allColors.find((c) => c.name.toLowerCase() === color)?.name;
  const lineName = collections.find((c) => c.slug === line)?.name;
  const visible = list.slice(0, shown);
  const product = detail ? getProduct(detail.slug) : undefined;

  const chip = (on: boolean) =>
    `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm transition-colors ${on ? 'border-ink bg-ink text-background' : 'border-line bg-card hover:border-ink'}`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {[{ slug: 'semua' as const, name: 'Semua' }, ...categories].map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={category === c.slug}
            onClick={() => {
              setCategory(c.slug);
              setLine('semua');
              setShown(STEP);
            }}
            className={chip(category === c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>
      {/* Filter warna: panel buka-tutup berisi semua warna */}
      <div className="mt-4 max-w-4xl rounded-[1.4rem] border border-line bg-card">
        <button
          type="button"
          aria-expanded={colorsOpen}
          aria-controls="panel-warna"
          onClick={() => setColorsOpen((v) => !v)}
          className="flex min-h-12 w-full items-center justify-between gap-3 px-5 text-left text-sm"
        >
          <span>
            Filter warna:{' '}
            <span className="font-serif text-base">{colorLabel ?? 'Semua warna'}</span>
          </span>
          <span
            aria-hidden="true"
            className={`text-xs transition-transform ${colorsOpen ? 'rotate-180' : ''}`}
          >
            ▾
          </span>
        </button>
        <div
          id="panel-warna"
          hidden={!colorsOpen}
          role="group"
          aria-label="Pilih warna"
          className="flex flex-wrap gap-2 px-4 pb-4"
        >
          {[{ name: 'Semua warna', hex: '' }, ...allColors].map((c) => {
            const key = c.hex ? c.name.toLowerCase() : '';
            const on = color === key;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setColor(key);
                  setShown(STEP);
                }}
                className={`${chip(on)} min-h-10 px-4`}
              >
                {c.hex && (
                  <span
                    aria-hidden="true"
                    className="size-3.5 rounded-full border border-black/10"
                    style={{ background: c.hex }}
                  />
                )}
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted" aria-live="polite">
        <span>{list.length} produk</span>
        {lineName && (
          <button
            type="button"
            onClick={() => setLine('semua')}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-ink hover:border-ink"
          >
            Lini: {lineName} <span aria-hidden="true">×</span>
            <span className="sr-only">(hapus filter lini)</span>
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-muted">Belum ada produk untuk filter ini.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProductCard p={p} colorFilter={color} onOpen={(c) => open(p.slug, c)} />
            </li>
          ))}
        </ul>
      )}

      {visible.length < list.length && (
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setShown((n) => n + STEP)} className="btn btn-line">
            Tampilkan lebih banyak
          </button>
        </div>
      )}

      {product && (
        <ProductModal
          product={product}
          colorSlug={detail?.color}
          onColor={(color) => {
            writeUrl(product.slug, color, false);
            setDetail({ slug: product.slug, color });
          }}
          onClose={close}
        />
      )}
    </div>
  );
}
