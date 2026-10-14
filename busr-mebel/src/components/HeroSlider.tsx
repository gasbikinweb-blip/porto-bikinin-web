'use client';

// Slider foto hero: crossfade halus, penomoran 01/03, tombol panah, auto-play yang berhenti saat hover.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowIcon } from './icons';

export type HeroSlide = { src: string; alt: string; caption: string };

const INTERVAL = 6000;

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, total]);

  const go = (step: number) => setIndex((i) => (i + step + total) % total);
  const pad = (n: number) => String(n).padStart(2, '0');
  const current = slides[index];

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-full overflow-hidden bg-surface-2" aria-roledescription="carousel">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`object-cover transition-transform duration-[7000ms] ease-out ${i === index ? 'scale-100' : 'scale-110'}`}
            />
          </div>
        ))}
      </div>

      {/* Kontrol */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/45 to-transparent p-5 text-white sm:p-8">
        <p key={current?.caption} className="animate-rise max-w-[14rem] text-xs leading-relaxed tracking-wide text-white/90">
          {current?.caption}
        </p>
        <div className="flex items-center gap-5">
          <p className="font-serif text-lg tabular-nums" aria-live="polite">
            {pad(index + 1)}
            <span className="mx-2 inline-block h-px w-8 bg-white/50 align-middle" />
            <span className="text-white/60">{pad(total)}</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto sebelumnya"
              className="grid size-10 place-items-center border border-white/40 transition hover:bg-white hover:text-black"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto berikutnya"
              className="grid size-10 place-items-center border border-white/40 transition hover:bg-white hover:text-black"
            >
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
