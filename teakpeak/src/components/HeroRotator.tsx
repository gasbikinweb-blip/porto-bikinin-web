'use client';

// Hero beranda: gambar + tulisan berganti tiap 7 detik (crossfade), dengan indikator slide.
// Bila pengguna memilih "kurangi animasi", slide tidak berganti otomatis.
import Image from 'next/image';
import { useEffect, useState } from 'react';

const INTERVAL = 7000;

const slides = [
  {
    img: '/scenes/living-void.webp',
    eyebrow: 'Timeless • Custom • Crafted in Jepara',
    title: 'Timeless Strength, Crafted in Jepara',
    text: 'Furnitur kayu jati solid buatan pengrajin Jepara. Ukuran, warna, dan finishing bisa custom.',
  },
  {
    img: '/products/navara-sofa/02.webp',
    eyebrow: 'Living Room',
    title: 'Ruang Keluarga yang Hangat & Tenang',
    text: 'Sofa, lounge chair, dan coffee table jati untuk bersantai bersama keluarga.',
  },
  {
    img: '/scenes/restaurant-set.webp',
    eyebrow: 'Restaurant & Café Project',
    title: 'Furnitur Custom untuk Restoran Anda',
    text: 'Meja dan kursi kayu solid yang kuat untuk pemakaian padat, dikirim sampai terpasang.',
  },
  {
    img: '/products/elara-upholstered-bed/01.webp',
    eyebrow: 'Bedroom Collection',
    title: 'Kamar Tidur yang Nyaman & Elegan',
    text: 'Tempat tidur kayu, rotan, dan upholstery dengan desain yang tak lekang waktu.',
  },
  {
    img: '/scenes/terrace-set.webp',
    eyebrow: 'Terrace Set',
    title: 'Sudut Santai untuk Sore yang Panjang',
    text: 'Set kursi dan meja teras dari jati alami, hangat dan awet di luar ruangan.',
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
