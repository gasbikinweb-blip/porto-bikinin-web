'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { portfolioCategories, type PortfolioItem } from '@/data/portfolio';
import { PortfolioDetailDialog } from './PortfolioDetailDialog';

type Filter = 'Semua' | (typeof portfolioCategories)[number];
const filters: readonly Filter[] = ['Semua', ...portfolioCategories];

// Galeri portofolio: filter kategori + lightbox aksesibel
export function PortfolioGallery({ items }: { items: readonly PortfolioItem[] }) {
  const [filter, setFilter] = useState<Filter>('Semua');
  const [active, setActive] = useState<{ item: PortfolioItem; index: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === 'Semua' ? items : items.filter((p) => p.category === filter);

  const open = (item: PortfolioItem, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive({ item, index: 0 });
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback((delta: number) => {
    setActive((cur) =>
      cur
        ? {
            ...cur,
            index: (cur.index + delta + cur.item.images.length) % cur.item.images.length,
          }
        : cur,
    );
  }, []);

  // showModal(): browser menjadikan konten lain inert (focus trap) & Esc menutup dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) dialog.showModal();
  }, [active]);

  const onClose = () => {
    setActive(null);
    // Kembalikan fokus ke foto pemicu
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <>
      <div role="group" aria-label="Filter kategori portofolio" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-steel transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((p) => {
          const cover = p.images[0];
          if (!cover) return null;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={(e) => open(p, e.currentTarget)}
                className="group block w-full text-left"
                aria-label={`Lihat detail ${p.title} (${p.images.length} foto)`}
              >
                <span className="relative block aspect-4/5 overflow-hidden rounded-lg bg-paper-2">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded bg-ink/80 px-2 py-1 text-[11px] font-semibold tracking-wide text-paper uppercase">
                    {p.category}
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-snug font-semibold">{p.title}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <PortfolioDetailDialog
        dialogRef={dialogRef}
        active={active}
        onClose={onClose}
        onKeyDown={onKeyDown}
        onSelect={(index) => setActive((cur) => (cur ? { ...cur, index } : cur))}
        onStep={step}
        onCloseClick={close}
      />
    </>
  );
}
