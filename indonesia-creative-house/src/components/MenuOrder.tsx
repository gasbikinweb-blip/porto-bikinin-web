'use client';

// Kategori, menu, modal, dan pesanan acara berbagi state filter dan daftar pesanan.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowIcon } from './icons';
import { MenuModal } from './MenuModal';
import { OrderBuilder, type OrderLines } from './OrderBuilder';
import { categories, categoryName, type CategorySlug } from '@/data/categories';
import { getItem, menu, priceLabel, type MenuItem } from '@/data/menu';

const PAGE = 12;
const HASH_PREFIX = '#menu-';

const itemFromHash = () => {
  const { hash } = window.location;
  // Whitelist: hanya slug yang ada di data
  return hash.startsWith(HASH_PREFIX) ? getItem(hash.slice(HASH_PREFIX.length)) : undefined;
};

export function MenuOrder() {
  const [active, setActive] = useState<CategorySlug | 'semua'>('semua');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [lines, setLines] = useState<OrderLines>({});
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const q = query.trim().toLowerCase();
  const filtered = menu.filter(
    (m) =>
      (active === 'semua' || m.category === active) && (!q || m.name.toLowerCase().includes(q)),
  );
  const shown = filtered.slice(0, limit);

  // Deep link & tombol Back: URL #menu-slug menentukan modal yang terbuka
  useEffect(() => {
    const sync = () => {
      const item = itemFromHash() ?? null;
      if (!item) pushed.current = false;
      setSelected(item);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    if (!selected) trigger.current?.focus();
  }, [selected]);

  const open = (m: MenuItem, el: HTMLElement) => {
    trigger.current = el;
    history.pushState(null, '', `${HASH_PREFIX}${m.slug}`);
    pushed.current = true;
    setSelected(m);
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

  const pickCategory = (slug: CategorySlug) => {
    setActive(slug);
    setLimit(PAGE);
    document.getElementById('menu')?.scrollIntoView();
  };

  const addToOrder = (m: MenuItem, qty: number) => {
    setLines((cur) => ({ ...cur, [m.slug]: qty }));
    trigger.current = null;
    close();
    // Tunggu modal tertutup dan history kembali
    setTimeout(() => document.getElementById('pesan-acara')?.scrollIntoView(), 150);
  };

  const chips = [{ slug: 'semua' as const, name: 'Semua' }, ...categories];

  return (
    <>
      <section
        id="kategori"
        className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_2.6fr]"
      >
        <div className="reveal lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-bold tracking-widest text-leaf uppercase">Kategori</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-accent">
            Pilih sesuai acara, Kak
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Dari snack dan tampah sampai aneka nasi dan hantaran. Pilih kategorinya, lalu lihat
            menunya.
          </p>
          <a
            href="#menu"
            onClick={() => {
              setActive('semua');
              setLimit(PAGE);
            }}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-accent px-6 text-sm font-bold text-accent hover:bg-accent hover:text-white"
          >
            Lihat Semua
            <ArrowIcon />
          </a>
        </div>
        <ul data-stagger className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {categories.map((c) => {
            const cover = getItem(c.cover)?.images[0];
            const count = menu.filter((m) => m.category === c.slug).length;
            return (
              <li key={c.slug} className="reveal">
                <button
                  type="button"
                  onClick={() => pickCategory(c.slug)}
                  className="group block w-full text-left"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-2xl bg-blush">
                    {cover && (
                      <Image
                        src={cover.thumb}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 rounded-full bg-foreground/90 py-2 text-sm font-bold text-white group-hover:flex group-focus-visible:flex">
                      Lihat menu
                      <ArrowIcon />
                    </span>
                  </span>
                  <span className="mt-3 block font-bold">{c.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{c.desc}</span>
                  <span className="mt-1 block text-sm font-bold text-accent">{count} menu</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="menu" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-4xl text-accent sm:text-5xl">Menu & paket</h2>
          <p className="mt-2 text-muted">Harga dapat berubah, konfirmasi via WhatsApp.</p>

          <div className="mt-6 flex flex-col gap-4">
            <label htmlFor="cari-menu" className="sr-only">
              Cari nama menu
            </label>
            <input
              id="cari-menu"
              type="search"
              value={query}
              maxLength={50}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Cari nama menu…"
              className="min-h-11 w-full rounded-full border border-line bg-blush/40 px-5 text-base lg:max-w-sm"
            />
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
                  className="min-h-11 rounded-full border border-line px-4 text-sm font-semibold transition-colors aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-muted" aria-live="polite">
            Menampilkan {shown.length} dari {filtered.length} menu
          </p>

          {shown.length > 0 ? (
            <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {shown.map((m) => (
                <li key={m.slug} className="animate-card">
                  <article className="group flex h-full flex-col rounded-2xl bg-blush/50 p-2">
                    <button
                      type="button"
                      onClick={(e) => open(m, e.currentTarget)}
                      aria-label={`Lihat foto ${m.name}`}
                      className="relative block aspect-square w-full overflow-hidden rounded-xl bg-blush"
                    >
                      {m.images[0] && (
                        <Image
                          src={m.images[0].thumb}
                          alt={m.images[0].alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </button>
                    <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
                      <p className="text-xs font-semibold text-leaf">{categoryName(m.category)}</p>
                      <h3 className="mt-0.5 font-bold leading-snug">{m.name}</h3>
                      <p className="mt-1 text-xs text-muted">
                        Per {m.unit}
                        {m.servings && `, ${m.servings}`}
                      </p>
                      {m.minOrder && (
                        <p className="text-xs text-muted">
                          Minimal {m.minOrder} {m.unit}
                        </p>
                      )}
                      <p className="mt-2 flex-1 text-sm font-bold text-accent">{priceLabel(m)}</p>
                      <button
                        type="button"
                        onClick={(e) => open(m, e.currentTarget)}
                        className="mt-2 min-h-11 text-left text-sm font-bold underline underline-offset-4"
                      >
                        Lihat Detail<span className="sr-only"> {m.name}</span>
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-muted">Menu tidak ditemukan. Coba kata kunci lain ya, Kak.</p>
          )}

          {limit < filtered.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + PAGE)}
                className="min-h-11 rounded-full border-2 border-accent px-8 font-bold text-accent hover:bg-accent hover:text-white"
              >
                Tampilkan lebih banyak
              </button>
            </div>
          )}
        </div>
      </section>

      <OrderBuilder lines={lines} setLines={setLines} />
      <MenuModal item={selected} onClose={close} onAdd={addToOrder} />
    </>
  );
}
