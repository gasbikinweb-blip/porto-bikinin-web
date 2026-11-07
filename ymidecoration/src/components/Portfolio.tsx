'use client';

// Portofolio bergaya panel: satu acara besar di kiri, daftar acara di kanan.
// Galeri lengkap tampil di modal dengan deep link #acara-[slug].
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EventModal } from './EventModal';
import { Select } from './Select';
import { ArrowIcon, PinIcon, WhatsAppIcon } from './icons';
import {
  events,
  eventTypes,
  getEvent,
  palettes,
  type EventType,
  type Palette,
  type PortfolioEvent,
} from '@/data/events';
import { buildWhatsAppLink, eventMessage } from '@/lib/config';

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

export function Portfolio() {
  const [type, setType] = useState<EventType | 'semua'>('semua');
  const [palette, setPalette] = useState<Palette | 'semua'>('semua');
  const [limit, setLimit] = useState(PAGE);
  const [current, setCurrent] = useState(events[0]?.slug ?? '');
  const [selected, setSelected] = useState<PortfolioEvent | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const filtered = events.filter(
    (e) => (type === 'semua' || e.type === type) && (palette === 'semua' || e.palette === palette),
  );
  // Lebih dari 12 acara: tampilkan 9 dulu
  const shown = filtered.length > 12 ? filtered.slice(0, limit) : filtered;
  const feature = filtered.find((e) => e.slug === current) ?? filtered[0];

  useEffect(() => {
    const sync = () => {
      const e = fromHash() ?? null;
      if (!e) pushed.current = false;
      else setCurrent(e.slug);
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
    `min-h-10 shrink-0 rounded-full px-5 text-sm transition ${
      active ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
    }`;

  return (
    <section id="portofolio" className="bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Portofolio</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Setiap acara, <em className="text-gold-text">cerita yang berbeda</em>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-muted lg:justify-self-end">
            Pilih acara di daftar untuk melihatnya lebih dekat, lalu buka galerinya sebagai
            referensi saat konsultasi.
          </p>
        </div>

        {/* Satu baris filter: jenis acara (segmen) dan nuansa (dropdown) */}
        <div className="reveal mt-12 flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Filter jenis acara"
            className="no-scrollbar flex max-w-full overflow-x-auto rounded-full border border-line bg-paper p-1"
          >
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
          <Select
            label="Nuansa"
            value={palette}
            options={[
              { value: 'semua', label: 'Semua nuansa' },
              ...paletteChips.map((p) => ({ value: p, label: p })),
            ]}
            onChange={(v) => {
              setPalette(v as Palette | 'semua');
              setLimit(PAGE);
            }}
          />
        </div>

        {feature ? (
          <div className="mt-6 grid grid-cols-1 gap-5 rounded-[2rem] border border-line bg-paper p-3 shadow-[0_30px_80px_-40px_rgb(30_26_22/0.35)] sm:p-5 lg:grid-cols-[1.35fr_1fr]">
            {/* Acara utama */}
            <article
              key={feature.slug}
              className="animate-card relative flex min-h-[34rem] min-w-0 flex-col justify-between overflow-hidden rounded-3xl bg-night text-white"
            >
              <Image
                src={feature.cover.src}
                alt={feature.cover.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-night/75 via-night/10 to-night/70"
              />
              <div className="relative max-w-sm p-6 sm:p-8">
                <h3 className="font-serif text-5xl leading-none sm:text-6xl">{feature.title}</h3>
                <p className="mt-3 text-sm tracking-[0.2em] text-gold-light uppercase">
                  {eventTypes[feature.type]}
                  {feature.year && ` · ${feature.year}`}
                </p>
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/85">
                  {feature.concept}
                </p>
              </div>
              <div className="relative m-3 flex flex-wrap items-center gap-3 rounded-2xl bg-night/55 p-3 backdrop-blur-md sm:m-4 sm:p-4">
                <PinIcon className="size-5 shrink-0 text-gold-light" />
                <div className="min-w-[10rem] flex-1">
                  <p className="truncate font-medium">{feature.venue ?? 'Surabaya'}</p>
                  <p className="truncate text-xs text-white/70">{feature.paletteNote}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <a
                    href={buildWhatsAppLink(eventMessage(feature.title, feature.slug))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Konsultasi dekorasi seperti ${feature.title} (tab baru)`}
                    className="grid size-11 place-items-center rounded-full border border-white/30 hover:bg-white/10"
                  >
                    <WhatsAppIcon className="size-5" />
                  </a>
                  <button
                    type="button"
                    onClick={(ev) => open(feature, ev.currentTarget)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm text-ink hover:bg-gold-light"
                  >
                    Lihat galeri · {feature.images.length}
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </article>

            {/* Daftar acara */}
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center justify-between px-2 pt-2 pb-4">
                <p className="font-serif text-2xl">Acara pilihan</p>
                <p className="text-sm text-muted" aria-live="polite">
                  {filtered.length} acara
                </p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {shown.map((e) => {
                  const active = e.slug === feature.slug;
                  return (
                    <li key={e.slug}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCurrent(e.slug)}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-2.5 text-left transition ${
                          active
                            ? 'border-ink/20 bg-ivory'
                            : 'border-transparent hover:border-line hover:bg-ivory/60'
                        }`}
                      >
                        <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-ivory sm:w-28">
                          <Image
                            src={e.cover.thumb}
                            alt=""
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-2xl leading-tight">{e.title}</span>
                          <span className="block truncate text-sm text-muted">{e.paletteNote}</span>
                          <span className="mt-1 flex items-center gap-1.5 text-xs text-gold-text">
                            <PinIcon className="size-3.5 shrink-0" />
                            <span className="truncate">
                              {eventTypes[e.type]}
                              {e.venue && ` · ${e.venue}`}
                            </span>
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`hidden size-10 shrink-0 place-items-center rounded-full border transition sm:grid ${
                            active ? 'border-ink bg-ink text-paper' : 'border-line'
                          }`}
                        >
                          <ArrowIcon />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {filtered.length > 12 && limit < filtered.length && (
                <button
                  type="button"
                  onClick={() => setLimit((n) => n + PAGE)}
                  className="mt-4 min-h-11 rounded-full border border-line text-sm hover:border-ink"
                >
                  Tampilkan lebih banyak
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-10 text-muted">
            Belum ada acara dengan kombinasi ini. Coba filter lain ya.
          </p>
        )}
      </div>

      <EventModal event={selected} onClose={close} />
    </section>
  );
}
