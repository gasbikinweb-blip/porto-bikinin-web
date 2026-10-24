'use client';

// Section proses: teks di kiri, kartu foto tinggi bernomor di kanan (geser dengan panah).
// Tombol di kartu membuka modal detail karya pada foto tersebut.
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Work } from '@/data/works';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { WorkModal } from './WorkModal';

export type ProcessStep = {
  title: string;
  label: string;
  subtitle: string;
  text: string;
  work: Work;
};

type Props = {
  steps: readonly ProcessStep[];
  categoryNames: Record<string, string>;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function ProcessCards({ steps, categoryNames }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const [detail, setDetail] = useState<Work | null>(null);

  // Geser satu kartu ke kiri/kanan
  function scrollBy(step: number) {
    const list = listRef.current;
    const card = list?.firstElementChild as HTMLElement | null;
    if (!list || !card) return;
    list.scrollBy({ left: step * (card.offsetWidth + 16), behavior: 'smooth' });
  }

  function onScroll() {
    const list = listRef.current;
    const card = list?.firstElementChild as HTMLElement | null;
    if (!list || !card) return;
    setCurrent(Math.round(list.scrollLeft / (card.offsetWidth + 16)));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr]">
      {/* Kiri */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
            {pad(current + 1)}
          </span>
          <p className="text-sm text-muted italic tabular-nums">
            {steps.map((_, i) => (
              <span
                key={i}
                className={i === current ? 'font-semibold text-foreground not-italic' : ''}
              >
                {pad(i + 1)}
                {i < steps.length - 1 && ' / '}
              </span>
            ))}
          </p>
        </div>
        <p className="mt-6 max-w-xs leading-relaxed text-muted">
          Kami bantu dari menentukan ukuran dan model, mengerjakan di workshop, sampai pesanan tiba
          di tempat Anda.
        </p>
        <div className="mt-12 lg:mt-auto">
          <p className="text-xs text-muted">[Proses]</p>
          <h2 id="proses" className="mt-2 font-serif text-display-2">
            Dari Ukuran hingga Sampai di Tempat
          </h2>
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-foreground py-1.5 pr-1.5 pl-5 text-sm font-medium text-background transition-colors hover:bg-wood-strong"
          >
            Mulai konsultasi
            <span className="grid size-8 place-items-center rounded-full bg-background text-foreground">
              <WhatsAppIcon className="size-4" />
            </span>
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        </div>
      </div>

      {/* Kanan: kartu */}
      <div className="min-w-0">
        <ul
          ref={listRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none]"
        >
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative isolate flex aspect-[3/4] w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-ink p-6 text-white sm:w-[calc(50%-0.5rem)]"
            >
              <Image
                src={s.work.cover.thumb}
                alt={s.work.cover.alt}
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="-z-0 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />
              <div className="relative">
                <h3 className="font-serif text-display-3">{s.title}</h3>
                <p className="mt-1 text-xs leading-tight text-white/75">{s.label}</p>
              </div>
              <div className="relative mt-auto">
                <p className="text-lg font-semibold">{s.subtitle}</p>
                <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-white/80">{s.text}</p>
                <div className="mt-5 flex items-end justify-between">
                  <button
                    type="button"
                    onClick={() => setDetail(s.work)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 py-1.5 pr-1.5 pl-4 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/30"
                  >
                    Lihat contoh
                    <span
                      aria-hidden="true"
                      className="grid size-7 place-items-center rounded-full bg-white text-ink"
                    >
                      →
                    </span>
                  </button>
                  <span
                    aria-hidden="true"
                    className="text-7xl leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.5)] sm:text-8xl"
                  >
                    {pad(i + 1)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="grid size-10 place-items-center rounded-full border border-line hover:border-foreground"
          >
            <span className="sr-only">Kartu sebelumnya</span>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="grid size-10 place-items-center rounded-full bg-foreground text-background hover:bg-wood-strong"
          >
            <span className="sr-only">Kartu berikutnya</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {detail && (
        <WorkModal
          work={detail}
          categoryName={categoryNames[detail.category]}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
