'use client';

// Daftar lokasi; foto di sisi kanan berganti saat lokasi disorot (hover / fokus / ketuk)
import Image from 'next/image';
import { useState } from 'react';
import type { Content } from '@/content/types';
import { placePhotos } from '@/data/media';

// Hanya bagian konten yang dipakai, agar teks lain tidak ikut terkirim ke browser
export function Places({ t }: { t: Pick<Content, 'lang' | 'places'> }) {
  const [active, setActive] = useState(0);
  const items = t.places.items;

  return (
    <section id="lokasi" aria-labelledby="lokasi-judul" className="theme-green bg-background">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-28 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-36">
        <div className="lg:col-span-7">
          <p className="eyebrow reveal text-accent">{t.places.label}</p>
          <h2 id="lokasi-judul" className="reveal mt-6 font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-light">
            {t.places.title}
          </h2>
          <p className="reveal mt-6 max-w-lg leading-relaxed text-muted">{t.places.intro}</p>

          <ul className="mt-14 border-t border-line" data-stagger>
            {items.map((place, i) => (
              <li key={place.name} className="reveal border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left"
                >
                  <span className="text-xs text-muted">0{i + 1}</span>
                  <span>
                    <span
                      className={`block font-serif text-2xl transition-[color,transform] duration-500 sm:text-4xl ${active === i ? 'translate-x-2 text-accent italic' : ''}`}
                    >
                      {place.name}
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm text-muted sm:translate-x-2">{place.note}</span>
                      </span>
                    </span>
                  </span>
                  <span className="text-right">
                    <span lang="ar" className="block font-arabic text-lg text-foreground/80 sm:text-xl">
                      {place.arabic}
                    </span>
                    <span className="eyebrow mt-1 block text-[0.6rem] text-muted">{place.city}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="reveal mt-8 max-w-md text-sm leading-relaxed text-muted">{t.places.more}</p>
        </div>

        {/* Foto aktif: bingkai lengkung yang menempel saat di-scroll */}
        <div className="order-first lg:order-none lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="arch relative mx-auto aspect-[3/4] max-w-sm overflow-hidden bg-surface lg:max-w-none">
              {placePhotos.map((photo, i) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt[t.lang]}
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  aria-hidden={active !== i}
                  className={`object-cover transition-[opacity,transform] duration-[1.1s] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                />
              ))}
            </div>
            <p className="mt-5 text-center text-xs tracking-[0.2em] text-muted uppercase" aria-live="polite">
              {items[active]?.name} · {items[active]?.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
