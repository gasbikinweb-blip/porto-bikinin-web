'use client';

// Filter portofolio, grid editorial, dan modal galeri dengan deep link #acara-[slug].
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EventModal } from './EventModal';
import {
  events,
  eventTypes,
  getEvent,
  palettes,
  type EventType,
  type Palette,
  type PortfolioEvent,
} from '@/data/events';

const PREFIX = '#acara-';
const PAGE = 9;

// Hanya tampilkan filter yang punya data
const typeChips = (Object.keys(eventTypes) as EventType[]).filter((t) =>
  events.some((e) => e.type === t),
);
const paletteChips = palettes.filter((p) => events.some((e) => e.palette === p));

const fromHash = () => {
  const { hash } = window.location;
  // Whitelist: hanya slug yang ada di data
  return hash.startsWith(PREFIX) ? getEvent(hash.slice(PREFIX.length)) : undefined;
};

// Pola ukuran ala majalah: kartu tinggi dan lebar bergantian
const shape = (i: number) =>
  ['lg:row-span-2', '', '', 'lg:col-span-2', '', 'lg:row-span-2'][i % 6] ?? '';

export function Portfolio() {
  const [type, setType] = useState<EventType | 'semua'>('semua');
  const [palette, setPalette] = useState<Palette | 'semua'>('semua');
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<PortfolioEvent | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const filtered = events.filter(
    (e) => (type === 'semua' || e.type === type) && (palette === 'semua' || e.palette === palette),
  );
  // Lebih dari 12 acara: tampilkan 9 dulu
  const shown = filtered.length > 12 ? filtered.slice(0, limit) : filtered;

  useEffect(() => {
    const sync = () => {
      const e = fromHash() ?? null;
      if (!e) pushed.current = false;
      setSelected(e);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    if (!selected) trigger.current?.focus();
  }, [selected]);

  const open = (e: PortfolioEvent, el: HTMLElement) => {
    trigger.current = el;
    history.pushState(null, '', `${PREFIX}${e.slug}`);
    pushed.current = true;
    setSelected(e);
  };

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      history.back(); // popstate menutup modal
    } else {
      // Dibuka langsung dari link: bersihkan hash tanpa meninggalkan halaman
      history.replaceState(null, '', window.location.pathname);
      setSelected(null);
    }
  }, []);

  const chip = (active: boolean) =>
    `min-h-11 border px-5 text-xs tracking-[0.15em] uppercase transition ${
      active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
    }`;

  return (
    <section id="portofolio" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Portofolio</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Setiap acara,
              <br />
              <em className="text-gold-text">cerita yang berbeda</em>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-muted lg:justify-self-end">
            Pilih salah satu acara untuk melihat galeri lengkapnya, lalu kirimkan sebagai referensi
            saat konsultasi.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <div role="group" aria-label="Filter jenis acara" className="flex flex-wrap gap-2">
            {(['semua', ...typeChips] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => {
                  setType(t);
                  setLimit(PAGE);
                }}
                className={chip(type === t)}
              >
                {t === 'semua' ? 'Semua' : eventTypes[t]}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter nuansa warna" className="flex flex-wrap gap-2">
            {(['semua', ...paletteChips] as const).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={palette === p}
                onClick={() => {
                  setPalette(p);
                  setLimit(PAGE);
                }}
                className={chip(palette === p)}
              >
                {p === 'semua' ? 'Semua nuansa' : p}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-muted" aria-live="polite">
          {filtered.length} acara
        </p>

        {shown.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:auto-rows-[18rem] lg:grid-cols-3 lg:gap-y-8">
            {shown.map((e, i) => (
              <li key={e.slug} className={`animate-card ${shape(i)}`}>
                <button
                  type="button"
                  onClick={(ev) => open(e, ev.currentTarget)}
                  className="group flex h-full w-full flex-col text-left"
                >
                  <span className="relative block aspect-[4/5] w-full overflow-hidden bg-ivory lg:aspect-auto lg:flex-1">
                    <Image
                      src={e.cover.thumb}
                      alt={e.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/15" />
                    <span className="absolute right-3 bottom-3 bg-paper/90 px-3 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      Lihat galeri · {e.images.length} foto
                    </span>
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="font-serif text-3xl leading-none">{e.title}</span>
                    <span className="text-xs tracking-[0.15em] text-gold-text uppercase">
                      {eventTypes[e.type]}
                    </span>
                  </span>
                  <span className="mt-2 text-sm text-muted">{e.paletteNote}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-muted">
            Belum ada acara dengan kombinasi ini. Coba filter lain ya.
          </p>
        )}

        {filtered.length > 12 && limit < filtered.length && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setLimit((n) => n + PAGE)}
              className="min-h-12 border border-ink px-10 text-xs tracking-[0.2em] uppercase hover:bg-ink hover:text-paper"
            >
              Tampilkan lebih banyak
            </button>
          </div>
        )}
      </div>

      <EventModal event={selected} onClose={close} />
    </section>
  );
}
