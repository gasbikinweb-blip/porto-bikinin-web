'use client';

// Slideshow hero: 3 gambar berganti otomatis (crossfade + zoom pelan), kalimat di bawah judul ikut berganti.
// Judul & tombol (heading/actions) dikirim dari server sebagai ReactNode, jadi tata letak hero tidak berubah.
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export type HeroSlide = { src: string; alt: string; label: string; text: string };

const DURATION = 6500; // ms per slide

export function HeroSlideshow({
  slides,
  labels,
  heading,
  actions,
  footer,
}: {
  slides: HeroSlide[];
  labels: { nav: string; pause: string; play: string };
  heading: React.ReactNode;
  actions: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  // Pengguna yang meminta gerakan minimal: tidak berganti otomatis
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi sekali dengan preferensi sistem
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || count < 2) return;
    const timer = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(timer);
  }, [index, playing, count, go]);

  const slide = slides[index];

  return (
    <>
      {/* Lapisan gambar: semua ditumpuk, yang aktif memudar masuk */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover object-[60%_50%] ${i === index ? 'hero-zoom' : ''}`}
            />
          </div>
        ))}
        {/* Gradasi agar teks terang tetap terbaca (kontras) di atas foto */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_14_12/0.6)_0%,rgb(16_14_12/0.25)_35%,rgb(16_14_12/0.85)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(16_14_12/0.75)_0%,rgb(16_14_12/0.35)_45%,transparent_70%)] md:block" />
        {/* HP: teks menutupi hampir seluruh foto, jadi lapisan gelap lebih tebal (render terang tetap terbaca) */}
        <div className="absolute inset-0 bg-[rgb(16_14_12/0.4)] md:hidden" />
      </div>

      {heading}

      {/* Kalimat berganti: siapa kami → visi → misi */}
      <div
        className="animate-in mt-6 max-w-xl"
        style={{ '--delay': '260ms' } as React.CSSProperties}
      >
        {slide && (
          <div key={index} className="hero-text" aria-live={playing ? 'off' : 'polite'}>
            <p className="text-xs font-bold tracking-[0.18em] text-accent-text uppercase">
              {slide.label}
            </p>
            <p className="mt-2 min-h-[6.5rem] text-base leading-relaxed text-pretty text-foreground/90 sm:min-h-[5.5rem] sm:text-lg">
              {slide.text}
            </p>
          </div>
        )}
      </div>

      {actions}

      {/* Pilar + indikator slide sejajar: pilar di kiri, indikator di kanan (desktop) */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        {footer}

        {/* Indikator slide: garis yang terisi selama slide tampil + tombol jeda */}
        <div
          className="animate-in mt-4 flex items-center gap-3 lg:mt-0"
          style={{ '--delay': '600ms' } as React.CSSProperties}
        >
          <div role="group" aria-label={labels.nav} className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? 'true' : undefined}
                aria-label={s.label}
                className="group relative flex h-11 w-12 items-center sm:w-16"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-foreground/25 transition-colors group-hover:bg-foreground/45">
                  {i === index && (
                    <span
                      key={`${index}-${playing}`}
                      className={`absolute inset-y-0 left-0 rounded-full bg-accent ${playing ? 'hero-progress' : 'w-full'}`}
                      style={{ '--duration': `${DURATION}ms` } as React.CSSProperties}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 rounded-full bg-foreground/70" />}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? labels.pause : labels.play}
            className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-accent"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
