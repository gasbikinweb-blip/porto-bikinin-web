'use client';

// Deretan detail dekorasi. Klik kartu membuka galeri acara asalnya lewat #acara-[slug].
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowIcon } from './icons';
import { getEvent } from '@/data/events';

// [judul detail, slug acara, urutan foto]
const details: [string, string, number][] = [
  ['Meja akad', 'berlin-aziz', 0],
  ['Lorong masuk', 'della-adil', 0],
  ['Papan welcome', 'shinta-aufar', 0],
  ['Rangkaian taman', 'putri-luthfi', 0],
  ['Panel nama pasangan', 'dita-iqbal', 0],
  ['Pelaminan bertirai', 'della-adil', 1],
  ['Galeri foto pasangan', 'shinta-aufar', 2],
  ['Backdrop bunga merah', 'berlin-aziz', 2],
];

const cards = details.flatMap(([label, slug, i]) => {
  const event = getEvent(slug);
  const img = event?.images[i];
  return event && img ? [{ label, event, img }] : [];
});

export function InspirationRail() {
  const list = useRef<HTMLUListElement>(null);
  const go = (dir: number) => {
    const card = list.current?.firstElementChild as HTMLElement | null | undefined;
    if (card) list.current?.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <section
      id="inspirasi"
      className="on-dark overflow-hidden bg-night py-20 text-night-text sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[20rem_1fr] lg:gap-14">
        <div className="reveal flex flex-col">
          <p className="eyebrow">Tema &amp; Inspirasi</p>
          <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Keindahan ada di <em className="text-gold-light">detailnya</em>
          </h2>
          <p className="mt-5 leading-relaxed text-night-muted">
            Sudut-sudut kecil yang membuat acara terasa utuh. Pilih satu detail untuk melihat galeri
            acaranya.
          </p>
          <div className="mt-8 flex gap-2 lg:mt-auto">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Detail sebelumnya"
              className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white/10"
            >
              <ArrowIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Detail berikutnya"
              className="grid size-12 place-items-center rounded-full bg-gold-light text-night hover:bg-white"
            >
              <ArrowIcon className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={list}
          className="no-scrollbar -mr-4 flex min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto pr-4 sm:-mr-8 sm:pr-8"
        >
          {cards.map(({ label, event, img }) => (
            <li key={img.src} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-[30%]">
              <a href={`#acara-${event.slug}`} className="group block">
                <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-night-soft">
                  <Image
                    src={img.thumb}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 68vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-paper text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowIcon />
                  </span>
                </span>
                <span className="mt-4 block font-serif text-2xl">{label}</span>
                <span className="mt-1 block text-sm text-night-muted">
                  {event.title} · {event.images.length} foto
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
