'use client';

// Bagian Tentang: kartu geser dengan scroll-snap, tombol panah hanya menggeser daftar.
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowIcon, CalendarIcon } from './icons';
import { getItem } from '@/data/menu';
import { site } from '@/data/site';

const cards = [
  {
    title: 'Pusat Jajanan Pasar',
    label: `Sejak ${site.since}`,
    slug: 'tampah-kue-jajanan-pasar',
    sub: 'Dari Cipete',
    text: 'ICH melayani jajanan pasar dari Cipete, Jakarta Selatan.',
    cta: 'Lihat Menu',
    href: '#menu',
  },
  {
    title: 'Untuk Setiap Acara',
    label: 'Pilihan Kami',
    slug: 'nasi-tumpeng',
    sub: 'Snack sampai Tumpeng',
    text: 'Snack box, tampah, dan aneka nasi untuk acara Kakak.',
    cta: 'Pesan Acara',
    href: '#pesan-acara',
  },
  {
    title: 'Hantaran Cantik',
    label: 'Momen Spesial',
    slug: 'hantaran-lamaran',
    sub: 'Rantang dan Lamaran',
    text: 'Pilihan hantaran untuk lamaran dan momen spesial lainnya.',
    cta: 'Lihat Hantaran',
    href: '#menu-hantaran-lamaran',
  },
  {
    title: 'Pesan Lewat WhatsApp',
    label: 'Cara Kami',
    slug: 'snack-besekan',
    sub: 'Langsung ke Admin',
    text: 'Pilih menu dan kirim rinciannya, admin bantu konfirmasi.',
    cta: 'Cara Pesan',
    href: '#cara-pesan',
  },
];

const num = (i: number) => String(i + 1).padStart(2, '0');

export function About() {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = list.current;
    const card = el?.firstElementChild as HTMLElement | null | undefined;
    return card ? card.offsetWidth + 16 : 0;
  };
  const go = (dir: number) => list.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  return (
    <section id="tentang" className="bg-blush py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="reveal flex flex-col justify-between gap-10">
          <div>
            <div aria-hidden="true" className="flex items-center gap-3 text-sm">
              <span className="grid size-9 place-items-center rounded-full bg-white font-bold">
                {num(active)}
              </span>
              <span className="h-px flex-1 bg-muted/40" />
              <span className="text-muted italic">
                {cards
                  .map((_, i) => num(i))
                  .filter((_, i) => i !== active)
                  .join(' ')}
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted italic">(Tentang)</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
              Menyajikan Jajanan Pasar Sejak {site.since}
            </h2>
            <a
              href="#pesan-acara"
              className="mt-6 inline-flex min-h-12 items-center gap-4 rounded-full bg-accent py-1 pr-1 pl-6 font-bold text-white hover:bg-accent-strong"
            >
              Pesan untuk Acara
              <span className="grid size-10 place-items-center rounded-full bg-white text-accent">
                <CalendarIcon className="size-5" />
              </span>
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <ul
            ref={list}
            onScroll={(e) => {
              const w = step();
              if (w) setActive(Math.round(e.currentTarget.scrollLeft / w));
            }}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
          >
            {cards.map((c, i) => {
              const img = getItem(c.slug)?.images[0];
              return (
                <li
                  key={c.title}
                  className="relative flex min-h-[480px] w-[85%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl bg-foreground p-5 text-white sm:w-[calc(50%-0.5rem)]"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 85vw"
                      className="object-cover"
                    />
                  )}
                  <span aria-hidden="true" className="card-shade absolute inset-0" />
                  <div className="relative">
                    <h3 className="font-serif text-2xl leading-tight">{c.title}</h3>
                    <p className="mt-2 text-sm">{c.label}</p>
                  </div>
                  <div className="relative">
                    <p className="text-lg font-bold">{c.sub}</p>
                    <p className="mt-1 text-sm leading-relaxed">{c.text}</p>
                    <div className="mt-4 flex items-end justify-between gap-2">
                      <a
                        href={c.href}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/20 py-1 pr-1 pl-4 text-sm font-bold backdrop-blur hover:bg-white/30"
                      >
                        {c.cta}
                        <span className="grid size-8 place-items-center rounded-full bg-white text-foreground">
                          <ArrowIcon />
                        </span>
                      </a>
                      <span
                        aria-hidden="true"
                        className="outline-num font-serif text-6xl leading-none"
                      >
                        {num(i)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Kartu sebelumnya"
              className="grid size-11 place-items-center rounded-full bg-white"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Kartu berikutnya"
              className="grid size-11 place-items-center rounded-full bg-foreground text-white"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
