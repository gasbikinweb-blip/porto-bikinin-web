'use client';

// Hero beranda: kartu besar dengan foto latar penuh (berganti per slide),
// dan slider kategori (01–04) di kanan. Berganti otomatis tiap 6 detik; berhenti saat
// kursor/fokus berada di slider atau pengguna meminta gerakan minimal.
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { buildWhatsAppLink, consultMessage } from '@/lib/whatsapp';
import { ArrowIcon, ChevronIcon, WhatsAppIcon } from './icons';

export type HeroSlide = {
  title: string;
  text: string;
  href: string;
  /** Foto latar penuh */
  image: string;
  imageAlt: string;
  /** Foto kecil di kartu */
  thumb: string;
};

const INTERVAL = 6000;
const pad = (n: number) => String(n).padStart(2, '0');

export function HeroSlider({
  slides,
  children,
}: {
  slides: readonly HeroSlide[];
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  const current = slides[index]!;
  const next = slides[(index + 1) % count]!;

  return (
    <div className="theme-dark relative isolate overflow-hidden rounded-[2rem] bg-background lg:min-h-[640px]">
      {/* Latar: semua foto ditumpuk, yang aktif dibuat terlihat (transisi halus) */}
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt={i === index ? s.imageAlt : ''}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/30 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/35 lg:to-black/55" />

      <div className="grid gap-10 p-6 pt-10 sm:p-10 lg:min-h-[640px] lg:grid-cols-[1fr_auto] lg:p-12">
        {/* Kiri: judul & tombol (dikirim dari halaman) */}
        <div className="flex flex-col justify-between gap-10 lg:max-w-md">{children}</div>

        {/* Kanan: progres + kartu slider */}
        <div
          className="flex flex-col justify-center gap-6 lg:w-[440px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Kategori produk"
        >
          <div className="flex items-center gap-4 text-sm text-foreground/80" aria-hidden="true">
            <span>{pad(index + 1)}</span>
            <span className="relative h-px flex-1 bg-white/25">
              <span
                className="absolute inset-y-0 left-0 bg-white transition-all duration-700"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </span>
            <span className="text-foreground/50">{pad(count)}</span>
          </div>

          <div className="flex gap-4">
            <article
              key={current.title}
              aria-live="polite"
              className="animate-in flex flex-1 gap-4 rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur-md"
            >
              <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
                <Image src={current.thumb} alt="" fill sizes="144px" className="object-cover" />
              </div>
              <div className="flex flex-col py-1 pr-1">
                <h2 className="text-lg leading-snug font-semibold">{current.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/75">{current.text}</p>
                <div className="mt-auto flex items-center gap-2 pt-4">
                  <Link
                    href={current.href}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 transition-colors hover:bg-accent-strong"
                  >
                    Lihat koleksi
                  </Link>
                  <a
                    href={buildWhatsAppLink(consultMessage(current.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Tanya ${current.title} via WhatsApp (tab baru)`}
                    className="grid size-8 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-neutral-900"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </div>
              </div>
            </article>

            {/* Pratinjau slide berikutnya */}
            <button
              type="button"
              onClick={() => go(1)}
              className="relative hidden w-24 shrink-0 overflow-hidden rounded-3xl border border-white/15 sm:block"
              aria-label={`Berikutnya: ${next.title}`}
            >
              <Image
                src={next.thumb}
                alt=""
                fill
                sizes="96px"
                className="object-cover opacity-80"
              />
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Kategori sebelumnya"
              className="grid size-10 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white/15"
            >
              <ChevronIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Kategori berikutnya"
              className="grid size-10 place-items-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-accent-strong"
            >
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Indikator scroll */}
      <a
        href="#produk-layanan"
        aria-label="Gulir ke bagian berikutnya"
        className="absolute bottom-6 left-1/2 hidden h-11 w-7 -translate-x-1/2 justify-center rounded-full border border-white/50 pt-2 lg:flex"
      >
        <span className="animate-scroll-dot block h-2 w-0.5 rounded-full bg-white" />
      </a>
    </div>
  );
}
