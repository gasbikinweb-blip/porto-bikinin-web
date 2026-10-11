'use client';

// Hero slideshow: foto penuh layar yang pelan-pelan zoom (Ken Burns), lalu berganti foto & tulisan.
// Aksesibilitas: tombol jeda/putar (WCAG 2.2.2), titik navigasi, dan autoplay mati bila
// pengguna meminta gerakan minimal (prefers-reduced-motion).
import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { ImageAsset } from '@/data/types';
import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export type HeroSlide = {
  eyebrow: string;
  title: [string, string];
  text: string;
  image: ImageAsset;
};

const INTERVAL = 6500;

// Preferensi "kurangi gerakan" dari sistem operasi pengguna
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false,
  );

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Autoplay mati bila pengguna menjeda atau meminta gerakan minimal
  const reducedMotion = useReducedMotion();
  const playing = !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, playing, slides.length]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sorotan layanan"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#081416] text-white"
    >
      {/* Semua foto ditumpuk; yang aktif tampil dengan transisi pudar + zoom */}
      {slides.map((s, i) => (
        <div
          key={s.image.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            key={i === index ? `aktif-${index}` : 'diam'}
            src={s.image.src}
            alt={i === index ? s.image.alt : ''}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? 'hero-zoom' : ''}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081416]/90 via-[#081416]/55 to-[#081416]/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#081416]/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-36 sm:pb-32 sm:px-6 lg:px-8">
        {/* Teks berganti tiap slide; key memicu ulang animasi masuk */}
        <div key={index} aria-live={playing ? 'off' : 'polite'} className="max-w-3xl">
          <p className="hero-text flex items-center gap-3 text-sm font-semibold tracking-[0.14em] sm:text-base sm:tracking-[0.2em] text-[#9be3d8] uppercase">
            <span className="h-0.5 w-8 shrink-0 bg-[#9be3d8] sm:w-10" />
            {slide.eyebrow}
          </p>
          <p
            className="hero-text mt-4 text-[2.35rem] leading-[1.04] font-extrabold tracking-tight uppercase sm:text-6xl lg:text-7xl"
            style={{ '--d': '120ms' } as React.CSSProperties}
          >
            {slide.title[0]}
            <br />
            <span className="text-[#9be3d8]">{slide.title[1]}</span>
          </p>
          <p
            className="hero-text mt-5 max-w-xl text-base text-white/90 sm:mt-6 sm:text-xl"
            style={{ '--d': '240ms' } as React.CSSProperties}
          >
            {slide.text}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
          <a
            href={buildWhatsAppLink(defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#9be3d8] px-5 text-base font-bold whitespace-nowrap sm:px-7 sm:text-lg text-[#081416] shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <WhatsAppIcon />
            Minta Survei &amp; Penawaran
            <span className="sr-only">(tab baru)</span>
          </a>
          <a
            href="#produk"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-white/60 px-5 text-base font-semibold whitespace-nowrap sm:px-7 sm:text-lg backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Lihat jenis lantai
          </a>
        </div>
      </div>

      {/* Navigasi slide: garis progres + tombol jeda */}
      <div className="absolute inset-x-0 bottom-16 mx-auto flex w-full max-w-7xl items-center gap-3 px-4 sm:bottom-20 sm:px-6 lg:px-8">
        <ul className="flex gap-2">
          {slides.map((s, i) => (
            <li key={s.image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? 'true' : undefined}
                className="group grid h-11 w-12 place-items-center sm:w-16"
              >
                <span className="relative block h-1 w-full overflow-hidden rounded-full bg-white/30">
                  {i === index && (
                    <span
                      key={`${index}-${playing}`}
                      className={`absolute inset-y-0 left-0 rounded-full bg-white ${playing ? 'hero-progress' : 'w-full'}`}
                      style={{ '--dur': `${INTERVAL}ms` } as React.CSSProperties}
                    />
                  )}
                </span>
                <span className="sr-only">
                  Slide {i + 1}: {s.title.join(' ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setPaused(playing)}
          className="ml-1 grid size-11 place-items-center rounded-full border border-white/40 hover:bg-white/10"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M7 5v14l12-7L7 5Z" />
            </svg>
          )}
          <span className="sr-only">{playing ? 'Jeda slideshow' : 'Putar slideshow'}</span>
        </button>
      </div>
    </section>
  );
}
