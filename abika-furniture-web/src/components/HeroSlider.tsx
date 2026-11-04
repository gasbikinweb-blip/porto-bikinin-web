'use client';

// Slider hero: ganti foto otomatis, berhenti bila pengguna meminta gerakan minimal.
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type HeroSlide = { src: string; alt: string; caption: string };

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={`object-cover ${i === active ? 'animate-ken-burns' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 to-transparent p-5 pt-16 text-white sm:p-8 sm:pt-20">
        <p className="text-sm">{slides[active]?.caption}</p>
        <div className="flex shrink-0">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Tampilkan foto ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="grid size-11 place-items-center"
            >
              <span
                className={`block h-0.5 w-7 transition-colors ${i === active ? 'bg-white' : 'bg-white/40'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
