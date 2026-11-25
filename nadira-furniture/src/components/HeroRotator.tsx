'use client';

// Hero beranda: gambar + tulisan berganti tiap 7 detik (crossfade), dengan indikator slide.
// Bila pengguna memilih "kurangi animasi", slide tidak berganti otomatis.
import Image from 'next/image';
import { useEffect, useState } from 'react';

const INTERVAL = 7000;

const slides = [
  {
    img: '/projects/kitchen-set-island-modern/02.webp',
    eyebrow: 'Interior Custom • Bandung',
    title: 'Interior Custom yang Pas dengan Rumah Anda',
    text: 'Kitchen set, lemari, backdrop TV, dan meja rias dibuat sesuai ukuran. Survei dan konsultasi gratis.',
  },
  {
    img: '/projects/kitchen-set-minibar-kisi/02.webp',
    eyebrow: 'Kitchen Set',
    title: 'Dapur Rapi, Masak Jadi Semangat',
    text: 'Kabinet atas-bawah, minibar, dan island dari multiplek 18 mm berlapis HPL TACO.',
  },
  {
    img: '/projects/backdrop-tv-lengkung-led/01.webp',
    eyebrow: 'Backdrop TV',
    title: 'Ruang Keluarga yang Lebih Hidup',
    text: 'Backdrop TV dengan rak display dan lampu LED, kabel tersembunyi rapi.',
  },
  {
    img: '/projects/lemari-kaca-walk-in/01.webp',
    eyebrow: 'Lemari & Kamar Set',
    title: 'Lemari Setinggi Plafon, Muat Lebih Banyak',
    text: 'Lemari pakaian, lemari kaca, dan kamar set yang serasi dalam satu desain.',
  },
  {
    img: '/projects/partisi-kisi-ruang-tamu/01.webp',
    eyebrow: 'Partisi',
    title: 'Bagi Ruang Tanpa Terasa Sempit',
    text: 'Partisi kisi kayu yang memisahkan ruang tamu sekaligus jadi pemanis interior.',
  },
];

export function HeroRotator({ children }: { children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [i, paused]);

  const s = slides[i]!;

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {slides.map((x, idx) => (
          <Image
            key={x.img}
            src={x.img}
            alt=""
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-[1600ms] ease-out ${
              idx === i ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        ))}
      </div>

      <div
        className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 text-center sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* key berubah tiap slide supaya animasi masuk diputar ulang */}
        <div key={i} aria-live="polite">
          <p className="animate-in text-xs font-semibold tracking-[0.35em] text-accent-strong uppercase">
            {s.eyebrow}
          </p>
          <h1
            className="animate-in mx-auto mt-5 min-h-[2.2em] max-w-4xl font-serif text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl"
            style={{ '--delay': '150ms' } as React.CSSProperties}
          >
            {s.title}
          </h1>
          <p
            className="animate-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
            style={{ '--delay': '300ms' } as React.CSSProperties}
          >
            {s.text}
          </p>
        </div>
        {children}
        <div className="mt-10 flex justify-center gap-2" role="group" aria-label="Pilih slide">
          {slides.map((x, idx) => (
            <button
              key={x.img}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}: ${x.eyebrow}`}
              aria-current={idx === i}
              className="relative h-1.5 w-10 overflow-hidden rounded-full bg-foreground/25"
            >
              {idx === i && (
                <span
                  key={i}
                  className={`absolute inset-y-0 left-0 bg-accent-strong ${paused ? 'w-full' : 'animate-hero-progress'}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
