'use client';

// Featured Collection: carousel bertumpuk (coverflow). Kartu tengah paling besar, kiri-kanan mengecil.
// Geser (drag/swipe), klik kartu samping, tombol panah, atau tombol panah keyboard.
// Klik "Lihat koleksi" → katalog terfilter lini itu.
import Image from 'next/image';
import { useRef, useState } from 'react';
import { collections } from '@/data/collections';
import { COLLECTION_EVENT } from './Catalog';

const VISIBLE = 3; // jumlah kartu di tiap sisi

export function FeaturedCollection() {
  const [active, setActive] = useState(Math.floor(collections.length / 2));
  const dragX = useRef<number | null>(null);
  const n = collections.length;
  const go = (step: number) => setActive((i) => Math.min(n - 1, Math.max(0, i + step)));
  const current = collections[active];

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured collection"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          dragX.current = null;
        }}
        onPointerLeave={() => (dragX.current = null)}
        className="relative mx-auto h-[25rem] w-full touch-pan-y overflow-hidden select-none sm:h-[30rem] [--card:13rem] [--step:4.4rem] sm:[--card:17rem] sm:[--step:8rem] lg:[--step:10rem]"
      >
        {collections.map((c, i) => {
          const offset = i - active;
          const dist = Math.abs(offset);
          if (dist > VISIBLE) return null;
          const center = offset === 0;
          return (
            <div
              key={c.slug}
              aria-hidden={!center}
              className="absolute top-1/2 left-1/2 w-[var(--card)] transition-[transform,opacity] duration-500 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--step))) scale(${1 - dist * 0.13})`,
                zIndex: 10 - dist,
                opacity: dist === VISIBLE ? 0.5 : 1,
              }}
            >
              <button
                type="button"
                tabIndex={center ? -1 : undefined}
                onClick={() => !center && setActive(i)}
                className="relative block aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] bg-surface shadow-[0_24px_50px_-30px_rgb(30_28_26/0.6)]"
              >
                <Image
                  src={c.cover.thumb}
                  alt={center ? c.cover.alt : ''}
                  fill
                  draggable={false}
                  sizes="(min-width: 640px) 272px, 208px"
                  className="object-cover"
                />
                {!center && <span className="absolute inset-0 bg-background/25" />}
                {!center && <span className="sr-only">Tampilkan {c.name}</span>}
                {center && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-14 pb-5 text-left text-white">
                    <span className="block text-[0.6rem] tracking-[0.3em] uppercase opacity-80">
                      {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block font-serif text-2xl font-light tracking-[0.12em] uppercase">
                      {c.name}
                    </span>
                    <span className="block text-sm opacity-85">{c.tagline}</span>
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          className="grid size-11 place-items-center rounded-full border border-line hover:border-ink disabled:opacity-40"
        >
          <span className="sr-only">Koleksi sebelumnya</span>
          <span aria-hidden="true">←</span>
        </button>
        {current && (
          <a
            href="#katalog"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(COLLECTION_EVENT, { detail: current.slug }))
            }
            className="btn btn-solid rounded-full"
          >
            Lihat {current.name}
          </a>
        )}
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === n - 1}
          className="grid size-11 place-items-center rounded-full border border-line hover:border-ink disabled:opacity-40"
        >
          <span className="sr-only">Koleksi berikutnya</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {current?.name}
      </p>
    </div>
  );
}
