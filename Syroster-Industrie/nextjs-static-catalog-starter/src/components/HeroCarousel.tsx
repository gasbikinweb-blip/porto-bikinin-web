'use client';

// Deretan kartu foto pemasangan di hero. Geser dengan scroll/sentuh (scroll-snap) atau tombol panah.
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowUpRightIcon, ChevronIcon } from './icons';

export type HeroCard = { id: string; src: string; alt: string; title: string; note: string };

export function HeroCarousel({ cards }: { cards: HeroCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const slide = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        aria-label="Contoh pemasangan roster"
        className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-2 [scrollbar-width:none] sm:-mr-6 sm:pr-6 lg:mr-[calc(-1*max(1.5rem,(100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <li key={c.id} className="w-[78%] shrink-0 snap-start sm:w-[62%] lg:w-[300px]">
            <figure className="rounded-[1.25rem] bg-white p-2.5 shadow-[0_12px_32px_-18px_rgb(28_33_80/0.35)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 300px, 78vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-1.5 pt-3 pb-1">
                <span>
                  <span className="block font-display text-[1.05rem] font-bold text-ink">
                    {c.title}
                  </span>
                  <span className="text-sm text-muted">{c.note}</span>
                </span>
                <a
                  href="#galeri"
                  aria-label={`Lihat galeri: ${c.title}`}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                >
                  <ArrowUpRightIcon />
                </a>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Foto sebelumnya"
          className="grid size-11 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
        >
          <ChevronIcon dir="left" />
        </button>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Foto berikutnya"
          className="grid size-11 place-items-center rounded-full bg-gold text-night transition-colors hover:bg-gold-ink hover:text-white"
        >
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}
