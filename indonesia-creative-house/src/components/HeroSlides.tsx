'use client';

// Foto dan teks hero berganti tiap 5 detik. Berhenti saat kartu disentuh kursor/fokus
// dan tidak berputar otomatis bila pengguna memilih mengurangi gerakan.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from './icons';
import { getItem } from '@/data/menu';

const INTERVAL = 5000;

const slides = [
  {
    slug: 'tampah-kue-jajanan-pasar',
    image: 1,
    title: 'Jajanan Pasar untuk Momen Spesial',
    text: 'Dari arisan sampai lamaran, tersaji rapi dan siap dinikmati bersama.',
  },
  {
    slug: 'nasi-tumpeng',
    image: 0,
    title: 'Nasi Tumpeng untuk Syukuran',
    text: 'Aneka nasi dalam tumpeng, box, besek, dan rantang untuk acara Kakak.',
  },
  {
    slug: 'snack-besekan',
    image: 0,
    title: 'Snack Besek untuk Arisan dan Rapat',
    text: 'Pilihan snack dalam besek, box, dan cup untuk tamu Kakak.',
  },
  {
    slug: 'hantaran-lamaran',
    image: 0,
    title: 'Hantaran Cantik untuk Lamaran',
    text: 'Susunan hantaran untuk melengkapi hari istimewa.',
  },
];

export function HeroSlides() {
  const [active, setActive] = useState(0);
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (dots.current?.closest('[data-hero-card]')?.matches(':hover, :has(:focus-visible)'))
        return;
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((s, i) => {
        const img = getItem(s.slug)?.images[s.image];
        return (
          img && (
            <Image
              key={s.slug}
              src={img.src}
              alt={i === active ? img.alt : ''}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 700px, 100vw"
              className={`object-cover transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          )
        );
      })}
      <div aria-hidden="true" className="hero-shade absolute inset-0" />

      <div className="relative max-w-sm">
        <div className="grid">
          {slides.map((s, i) => (
            <div
              key={s.slug}
              aria-hidden={i !== active}
              className={`[grid-area:1/1] transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            >
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">{s.text}</p>
            </div>
          ))}
        </div>
        <div ref={dots} className="mt-3 flex">
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Tampilkan ${s.title}`}
              aria-current={i === active}
              className="grid size-7 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${i === active ? 'w-5 bg-white' : 'w-2 bg-white/50'}`}
              />
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setActive((i) => (i + 1) % slides.length)}
        aria-label="Slide berikutnya"
        className="absolute right-5 bottom-5 z-10 grid size-16 place-items-center rounded-full border-4 border-white/40 bg-accent text-white hover:bg-accent-strong sm:right-8 sm:bottom-8"
      >
        <ArrowIcon className="size-6" />
      </button>
    </>
  );
}
