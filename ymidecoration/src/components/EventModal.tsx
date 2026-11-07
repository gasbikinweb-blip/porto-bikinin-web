'use client';

// Modal galeri memakai <dialog> native: focus trap, Esc, dan aria-modal dari browser.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowIcon, CloseIcon, LinkIcon, WhatsAppIcon } from './icons';
import { eventTypes, type PortfolioEvent } from '@/data/events';
import { buildWhatsAppLink, eventMessage, eventUrl } from '@/lib/config';

export function EventModal({
  event,
  onClose,
}: {
  event: PortfolioEvent | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = event !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="judul-acara"
      onCancel={(e) => {
        e.preventDefault(); // Esc: tutup lewat alur yang sama agar URL ikut bersih
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-night text-night-text lg:m-auto lg:h-[92dvh] lg:max-w-6xl"
    >
      {event && <Detail key={event.slug} e={event} onClose={onClose} />}
    </dialog>
  );
}

function Detail({ e, onClose }: { e: PortfolioEvent; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = e.images.length;
  const img = e.images[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  const copy = async () => {
    const url = eventUrl(e.slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      window.prompt('Salin link acara:', url);
    }
  };

  const meta: [string, string | undefined][] = [
    ['Acara', eventTypes[e.type]],
    ['Nuansa', e.paletteNote],
    ['Venue', e.venue],
    ['Tanggal', e.date ?? (e.year ? String(e.year) : undefined)],
  ];

  return (
    <div
      className="grid min-h-full lg:h-full lg:grid-cols-[1.5fr_1fr]"
      onKeyDown={(k) => {
        if (total < 2) return;
        if (k.key === 'ArrowRight') go(1);
        if (k.key === 'ArrowLeft') go(-1);
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup galeri"
        className="fixed top-3 right-3 z-10 grid size-12 place-items-center rounded-full bg-night/70 text-white backdrop-blur lg:absolute"
      >
        <CloseIcon className="size-6" />
      </button>

      <div className="flex min-h-0 flex-col bg-black/40 p-3 lg:p-5">
        <div
          className="relative min-h-[62dvh] flex-1 lg:min-h-0"
          onTouchStart={(t) => {
            touchX.current = t.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(t) => {
            const end = t.changedTouches[0]?.clientX;
            if (touchX.current !== null && end !== undefined && total > 1) {
              const dx = end - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }
            touchX.current = null;
          }}
        >
          {img && (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="animate-in object-contain"
            />
          )}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 left-1 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-night/60 text-white backdrop-blur hover:bg-night"
              >
                <ArrowIcon className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-1 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-night/60 text-white backdrop-blur hover:bg-night"
              >
                <ArrowIcon className="size-5" />
              </button>
            </>
          )}
        </div>
        <div className="mt-3 flex items-center gap-4">
          <p
            aria-live="polite"
            className="shrink-0 font-serif text-lg text-gold-light tabular-nums"
          >
            {index + 1} / {total}
          </p>
          {total > 1 && (
            <ul className="no-scrollbar flex gap-2 overflow-x-auto p-1">
              {e.images.map((t, i) => (
                <li key={t.src} className="shrink-0">
                  <button
                    type="button"
                    aria-label={`Tampilkan foto ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`relative block size-14 overflow-hidden transition ${
                      i === index ? 'ring-1 ring-gold-light' : 'opacity-50 hover:opacity-90'
                    }`}
                  >
                    <Image src={t.thumb} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-10 lg:overflow-y-auto">
        <div className="on-dark">
          <p className="eyebrow">{eventTypes[e.type]}</p>
          <h2 id="judul-acara" className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
            {e.title}
          </h2>
        </div>
        <p className="leading-relaxed text-night-muted">{e.concept}</p>
        <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
          {meta.map(
            ([k, v]) =>
              v && (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="tracking-[0.15em] text-night-muted uppercase">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ),
          )}
        </dl>
        {e.credits && (
          <p className="text-sm text-night-muted">
            {e.credits.map((c) => `${c.role}: ${c.name}`).join(' · ')}
          </p>
        )}
        <div className="mt-auto flex flex-col gap-3">
          <a
            href={buildWhatsAppLink(eventMessage(e.title, e.slug))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center justify-center gap-3 bg-gold-light px-6 text-sm font-medium tracking-[0.12em] text-night uppercase hover:bg-white"
          >
            <WhatsAppIcon className="size-5" />
            Saya Mau Dekorasi Seperti Ini<span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-night-muted hover:text-white"
          >
            <LinkIcon />
            {copied ? 'Link tersalin' : 'Salin Link Acara'}
          </button>
        </div>
      </div>
    </div>
  );
}
