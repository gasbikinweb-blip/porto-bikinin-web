'use client';

// Katalog souvenir: filter kategori & momen, pencarian nama, 12 per halaman + "Tampilkan lebih banyak"
import { useEffect, useMemo, useState } from 'react';
import { categories, occasions } from '@/data/catalog-meta';
import { products } from '@/data/products';
import type { CategoryId, OccasionId } from '@/data/types';
import { siteConfig } from '@/lib/config';
import { ShopIcon, SearchIcon } from './icons';
import { ProductCard } from './ProductCard';

export const OCCASION_EVENT = 'haraanja:momen';
export const CATEGORY_EVENT = 'haraanja:kategori';
const PAGE = 12;
const souvenirs = products.filter((p) => !p.isPackaging);
const souvenirCats = categories.filter((c) => souvenirs.some((p) => p.category === c.id));
// Urutan: unggulan dulu
const sorted = [...souvenirs].sort((a, b) => Number(b.featured) - Number(a.featured));

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className="min-h-10 shrink-0 rounded-full border border-line bg-surface px-4 text-sm transition hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
    >
      {children}
    </button>
  );
}

export function Catalog() {
  const [cat, setCat] = useState<CategoryId | 'semua'>('semua');
  const [occ, setOcc] = useState<OccasionId | 'semua'>('semua');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);

  // Kartu momen di atas mengirim event untuk memasang filter
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<OccasionId>).detail;
      if (occasions.some((o) => o.id === id)) {
        setOcc(id);
        setCat('semua');
        setLimit(PAGE);
      }
    };
    const onCat = (e: Event) => {
      const id = (e as CustomEvent<CategoryId>).detail;
      setCat(id);
      setOcc('semua');
      setLimit(PAGE);
    };
    window.addEventListener(OCCASION_EVENT, on);
    window.addEventListener(CATEGORY_EVENT, onCat);
    return () => {
      window.removeEventListener(OCCASION_EVENT, on);
      window.removeEventListener(CATEGORY_EVENT, onCat);
    };
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sorted.filter(
      (p) =>
        (cat === 'semua' || p.category === cat) &&
        (occ === 'semua' || p.occasions.includes(occ)) &&
        (!term || p.name.toLowerCase().includes(term)),
    );
  }, [cat, occ, q]);

  const shown = list.slice(0, limit);
  const reset = () => {
    setCat('semua');
    setOcc('semua');
    setQ('');
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <label className="relative block max-w-md">
          <span className="sr-only">Cari souvenir</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            maxLength={40}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Cari souvenir, mis. tumbler, mangkok…"
            className="min-h-12 w-full rounded-full border border-line bg-surface pr-4 pl-12 outline-none focus:border-accent"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter kategori">
          <Chip on={cat === 'semua'} onClick={() => setCat('semua')}>
            Semua
          </Chip>
          {souvenirCats.map((c) => (
            <Chip
              key={c.id}
              on={cat === c.id}
              onClick={() => {
                setCat(c.id);
                setLimit(PAGE);
              }}
            >
              {c.name}
            </Chip>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter momen">
          <Chip on={occ === 'semua'} onClick={() => setOcc('semua')}>
            Semua momen
          </Chip>
          {occasions
            .filter((o) => souvenirs.some((p) => p.occasions.includes(o.id)))
            .map((o) => (
              <Chip
                key={o.id}
                on={occ === o.id}
                onClick={() => {
                  setOcc(o.id);
                  setLimit(PAGE);
                }}
              >
                {o.icon} {o.name}
              </Chip>
            ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        Menampilkan {shown.length} dari {list.length} souvenir
      </p>
      {list.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-surface-2 p-6 text-center">
          Belum ada souvenir yang cocok, Kak.{' '}
          <button type="button" onClick={reset} className="font-semibold text-accent underline">
            Tampilkan semua
          </button>
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {shown.map((p) => (
            <li key={p.slug} className="animate-in">
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      )}
      {limit < list.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="min-h-12 rounded-full border border-accent px-8 font-semibold text-accent transition hover:bg-accent hover:text-background"
          >
            Tampilkan lebih banyak
          </button>
        </div>
      )}

      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-gold/40 bg-surface-2 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
        <div>
          <p className="font-script text-2xl text-gold">Masih banyak lagi</p>
          <p className="font-serif text-2xl font-semibold">
            Ini sebagian koleksi kami. Lihat katalog lengkap di Shopee
          </p>
        </div>
        <a
          href={siteConfig.shopeeStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#ee4d2d] px-6 font-semibold text-white hover:brightness-110"
        >
          <ShopIcon className="size-5" /> Kunjungi Toko Shopee
          <span className="sr-only"> (tab baru)</span>
        </a>
      </div>
    </div>
  );
}
