'use client';

// Hero beranda: kartu foto membulat berganti otomatis, indikator 01 — 04, kartu proyek di kanan,
// tombol panah sebelumnya/berikutnya. Pakai setTimeout (rAF berhenti di tab latar).
// Otomatis berhenti bila pengguna meminta gerakan minimal atau menekan tombol jeda.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';
import { ArrowIcon, WhatsAppIcon } from './icons';

export type HeroSlide = {
  src: string;
  thumb: string;
  alt: string;
  title: string;
  caption: string;
  href: string;
};

const INTERVAL = 6000;
const pad = (n: number) => String(n).padStart(2, '0');

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const current = slides[index];
  const next = slides[(index + 1) % count];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, count]);

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  if (!current || !next) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sorotan proyek"
      className="relative isolate mx-3 mt-3 min-h-[86svh] overflow-hidden rounded-[2rem] text-white sm:mx-5"
    >
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === index ? s.alt : ''}
          aria-hidden={i !== index}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-10 object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

      <div className="grid min-h-[86svh] grid-rows-[1fr_auto] gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
        {/* Kiri: judul */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="animate-in text-sm text-white/85">
            Interior Design &amp; Build Studio · Jakarta &amp; Jabodetabek
          </p>
          <h1
            className="animate-in mt-4 font-sans text-4xl leading-[1.15] font-light sm:text-6xl"
            style={{ '--delay': '120ms' } as React.CSSProperties}
          >
            Ruang yang seimbang antara fungsi dan rasa,{' '}
            <strong className="font-semibold">dirancang &amp; dibangun</strong> oleh satu tim.
          </h1>
          <div
            className="animate-in mt-10 flex flex-wrap items-center gap-4"
            style={{ '--delay': '240ms' } as React.CSSProperties}
          >
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-ink"
            >
              <WhatsAppIcon className="size-5" />
              Konsultasi via WhatsApp
              <span className="sr-only"> (membuka tab baru)</span>
            </a>
            <a
              href="#proyek"
              className="grid size-28 place-items-center rounded-full bg-white/15 text-center text-xs leading-tight backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <span>
                <ArrowIcon className="mx-auto mb-1 size-4 -rotate-45" />
                Lihat
                <br />
                proyek
              </span>
            </a>
          </div>
        </div>

        {/* Kanan: indikator + kartu proyek */}
        <div className="flex flex-col justify-center gap-6 lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-4 text-sm" aria-hidden="true">
            <span>{pad(index + 1)}</span>
            <span className="relative h-px flex-1 bg-white/35">
              <span
                className="absolute inset-y-0 left-0 bg-white transition-[width] duration-700"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </span>
            <span className="text-white/70">{pad(count)}</span>
          </div>
          <div className="flex items-stretch gap-4" aria-live="polite">
            <a
              href={current.href}
              className="flex flex-1 gap-4 rounded-3xl bg-white/15 p-3 backdrop-blur-md transition-colors hover:bg-white/25"
            >
              <span className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
                <Image src={current.thumb} alt="" fill sizes="144px" className="object-cover" />
              </span>
              <span className="flex flex-col justify-center py-2 pr-2">
                <span className="text-lg font-semibold">{current.title}</span>
                <span className="mt-1 text-sm text-white/80">{current.caption}</span>
                <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-foreground">
                  Lihat proyek <ArrowIcon className="size-3" />
                </span>
              </span>
            </a>
            <span
              className="relative hidden w-32 shrink-0 overflow-hidden rounded-3xl sm:block"
              aria-hidden="true"
            >
              <Image
                src={next.thumb}
                alt=""
                fill
                sizes="128px"
                className="object-cover opacity-80"
              />
            </span>
          </div>
        </div>

        {/* Bawah: indikator scroll + kontrol */}
        <div className="flex items-end justify-between lg:col-span-12">
          <span
            className="hidden h-12 w-7 justify-center rounded-full border border-white/60 pt-2 sm:flex"
            aria-hidden="true"
          >
            <span className="animate-scroll-dot size-1.5 rounded-full bg-white" />
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-full bg-white/15 px-4 py-2.5 text-xs backdrop-blur-md hover:bg-white/25"
            >
              {paused ? 'Putar' : 'Jeda'}
              <span className="sr-only"> pergantian slide</span>
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25"
              aria-label="Slide sebelumnya"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full bg-white text-foreground hover:bg-white/90"
              aria-label="Slide berikutnya"
            >
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
