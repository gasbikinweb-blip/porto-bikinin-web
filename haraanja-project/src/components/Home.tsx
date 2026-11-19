'use client';

// Bagian beranda: kartu koleksi di hero, kartu kategori, dan showcase koleksi kemasan
// yang "hidup" (autoplay + kilau) hanya saat terlihat di layar.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { products } from '@/data/products';
import type { CategoryId } from '@/data/types';
import { CATEGORY_EVENT } from './Catalog';
import { ChevronIcon } from './icons';

// Koleksi kemasan pilihan (umum, tidak terikat hari raya tertentu)
const showcaseSlugs = [
  'box-gelas-gorgeous',
  'box-souvenir-15x16x7',
  'paper-bag-piring-custom',
  'box-custom-15x15x8',
  'box-payung',
  'box-pouch',
];
const slides = showcaseSlugs.flatMap((slug) => {
  const img = products.find((p) => p.slug === slug)?.images[0];
  return img ? [{ slug, img }] : [];
});
const collection = {
  title: 'Koleksi Kemasan Custom',
  text: 'Box, softbox, dan paper bag yang bisa dicetak nama, cocok untuk souvenir dan hampers.',
};

const arrowBtn =
  'grid size-10 place-items-center rounded-full border border-line bg-surface transition hover:border-accent hover:text-accent';

/** Kartu kecil melayang di hero (mirip kartu "Season" di referensi) */
export function HeroSeasonCard() {
  const [i, setI] = useState(0);
  const n = slides.length;
  if (!n) return null;
  const { slug, img: cur } = slides[i % n]!;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  return (
    <div className="animate-in absolute top-4 right-3 z-10 w-56 rounded-2xl border border-line bg-surface/95 p-3 shadow-lg backdrop-blur sm:right-0 sm:w-64">
      <a href={`#produk-${slug}`} className="flex gap-3">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
          <Image src={cur.thumb} alt={cur.alt} fill sizes="64px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-muted">Koleksi pilihan</span>
          <span className="block font-serif text-lg leading-tight font-semibold">
            {collection.title}
          </span>
        </span>
      </a>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs text-muted">Sudah tersedia</span>
        <span className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto sebelumnya"
            className={`${arrowBtn} size-8`}
          >
            <ChevronIcon dir="left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto berikutnya"
            className={`${arrowBtn} size-8`}
          >
            <ChevronIcon className="size-4" />
          </button>
        </span>
      </div>
    </div>
  );
}

const featuredCats: { id: CategoryId; name: string; slug: string }[] = [
  { id: 'tumbler', name: 'Tumbler & Botol', slug: 'tumbler-macaron-kaca' },
  { id: 'gelas', name: 'Gelas & Cangkir', slug: 'gelas-kaca-beruang' },
  { id: 'mangkok', name: 'Mangkok & Piring', slug: 'mangkok-twotone-sablon' },
  { id: 'tekstil', name: 'Handuk & Tekstil', slug: 'handuk-kemas-tile' },
];

/** Kartu kategori bergambar di bawah hero; klik memasang filter katalog */
export function CategoryCards() {
  const pick = (id: CategoryId) => {
    window.dispatchEvent(new CustomEvent(CATEGORY_EVENT, { detail: id }));
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <ul data-stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {featuredCats.map((c) => {
        const img = products.find((p) => p.slug === c.slug)?.images[0];
        return (
          <li key={c.id} className="reveal">
            <button
              type="button"
              onClick={() => pick(c.id)}
              className="group flex h-full w-full flex-col rounded-2xl border border-line bg-surface p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
                {img && (
                  <Image
                    src={img.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </span>
              <span className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold sm:text-base">{c.name}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 transition group-hover:bg-accent group-hover:text-background">
                  <ChevronIcon className="size-4" />
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const FLAKES = Array.from({ length: 18 }, (_, k) => ({
  left: (k * 37) % 100,
  delay: (k * 0.7) % 6,
  dur: 6 + (k % 5),
  size: 10 + (k % 4) * 4,
}));

/** Banner koleksi musiman: slideshow, salju/kilau, dan zoom aktif hanya saat terlihat */
export function SeasonalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(!!e?.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = slides.length;
  useEffect(() => {
    if (!active || n < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 4000);
    return () => clearInterval(t);
  }, [active, n]);

  if (!n) return null;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section
      id="musiman"
      aria-labelledby="judul-musiman"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      <div
        ref={ref}
        data-active={active}
        className="seasonal theme-dark relative isolate min-h-[26rem] overflow-hidden rounded-3xl bg-[#2a1416] sm:min-h-[30rem]"
      >
        {slides.map(({ img }, k) => (
          <Image
            key={img.src}
            src={img.src}
            alt={k === i ? img.alt : ''}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className={`seasonal-img -z-20 object-cover transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {FLAKES.map((f, k) => (
            <span
              key={k}
              className="seasonal-flake absolute -top-6 text-white/80"
              style={
                {
                  left: `${f.left}%`,
                  fontSize: f.size,
                  animationDelay: `${f.delay}s`,
                  animationDuration: `${f.dur}s`,
                } as React.CSSProperties
              }
            >
              ✦
            </span>
          ))}
        </div>

        <div className="seasonal-text flex min-h-[26rem] max-w-lg flex-col justify-center p-6 sm:min-h-[30rem] sm:p-12">
          <p className="text-sm font-medium tracking-wide text-white/80">Koleksi Pilihan</p>
          <h2
            id="judul-musiman"
            className="mt-2 font-serif text-4xl leading-tight font-semibold text-white uppercase sm:text-5xl"
          >
            {collection.title}
          </h2>
          <p className="mt-3 text-white/85">{collection.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#kemasan"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#5e1620] transition hover:bg-white/90"
            >
              Lihat Koleksi <ChevronIcon className="size-4" />
            </a>
          </div>
          {n > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto sebelumnya"
                className="grid size-11 place-items-center rounded-full bg-accent text-white transition hover:brightness-110"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto berikutnya"
                className="grid size-11 place-items-center rounded-full bg-white text-[#2b2426] transition hover:bg-white/90"
              >
                <ChevronIcon />
              </button>
              <span className="ml-2 text-sm text-white/80" aria-live="polite">
                {i + 1} / {n}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
