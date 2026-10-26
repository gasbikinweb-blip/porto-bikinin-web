'use client';

// Banner quotes hijab dengan foto & kutipan yang berganti otomatis tiap 6 detik.
// Berhenti saat kursor/fokus di dalam banner, dan tidak berganti otomatis bila pengguna memilih gerakan minimal.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ProductImage } from '@/data/products';

export type QuoteSlide = { image: ProductImage; quote: string; sub: string };

const INTERVAL_MS = 6000;

export function QuoteBanner({ slides }: { slides: readonly QuoteSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  if (!slide) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Quotes hijab"
      className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        data-reveal
        className="grid overflow-hidden rounded-[2.25rem] bg-surface md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[24rem]">
          {slides.map((s, i) => (
            <Image
              key={s.image.src}
              src={s.image.src}
              alt={i === index ? s.image.alt : ''}
              aria-hidden={i !== index}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`object-cover transition-all duration-1000 ${i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="eyebrow">Untuk Kakak hari ini</p>
          <blockquote
            key={index}
            className="mt-4 animate-[sapaan_0.7s_ease-out]"
            aria-live="polite"
          >
            <p className="font-serif text-title leading-snug italic">“{slide.quote}”</p>
            <footer className="mt-4 text-sm text-muted">{slide.sub}</footer>
          </blockquote>
          <div className="mt-8 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className="grid size-11 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-mocha' : 'w-3 bg-mocha/30'}`}
                />
                <span className="sr-only">Tampilkan quote {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
