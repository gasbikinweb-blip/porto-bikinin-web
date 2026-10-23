'use client';

import { useRef, type ReactNode } from 'react';

/** Baris kartu yang bisa digeser (scroll-snap) dengan tombol panah kiri/kanan */
export function FeaturedCarousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        {[
          { d: -1, text: 'Sebelumnya', path: 'M10 3L5 8l5 5' },
          { d: 1, text: 'Berikutnya', path: 'M6 3l5 5-5 5' },
        ].map((b) => (
          <button
            key={b.d}
            type="button"
            onClick={() => go(b.d)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-fg"
          >
            <span className="sr-only">{b.text}</span>
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
