'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KindBadge } from './KindBadge';
import type { ProjectImage } from '@/data/types';

/**
 * Galeri ringkas: satu foto utama + deretan thumbnail untuk menggantinya.
 * Klik foto utama membuka lightbox aksesibel buatan sendiri.
 * Esc menutup, panah kiri/kanan berpindah, fokus terkunci di dalam dialog,
 * dan fokus kembali ke foto pemicu saat ditutup.
 */
export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const mainRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) {
      // Kembalikan fokus ke foto utama (hanya setelah lightbox pernah dibuka)
      if (wasOpen.current) mainRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Focus trap
        const els = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = els[0];
        const last = els[els.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, step]);

  const current = index !== null ? images[index] : undefined;
  const shown = images[active];

  return (
    <>
      {shown && (
        <div>
          <div className="relative">
            <button
              ref={mainRef}
              type="button"
              onClick={() => setIndex(active)}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-md bg-surface"
            >
              <Image
                key={shown.src}
                src={shown.src}
                alt={shown.alt}
                fill
                priority={active === 0}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="fade-in object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <KindBadge kind={shown.kind} />
              <span className="absolute right-3 bottom-3 rounded-sm bg-black/55 px-2.5 py-1 text-[11px] tracking-wider text-white">
                {active + 1} / {images.length}
              </span>
              <span className="sr-only">Perbesar gambar {active + 1}</span>
            </button>
            {images.length > 1 &&
              [
                { d: -1, label: 'Foto sebelumnya', side: 'left-3', path: 'M10 3L5 8l5 5' },
                { d: 1, label: 'Foto berikutnya', side: 'right-3', path: 'M6 3l5 5-5 5' },
              ].map((b) => (
                <button
                  key={b.d}
                  type="button"
                  onClick={() => setActive((i) => (i + b.d + images.length) % images.length)}
                  className={`absolute top-1/2 ${b.side} flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 shadow ring-1 ring-line backdrop-blur hover:bg-bg`}
                >
                  <span className="sr-only">{b.label}</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
          </div>
          {images.length > 1 && (
            <ul aria-label="Pilih foto" className="mt-3 flex gap-2 overflow-x-auto p-1">
              {images.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className={`relative block h-16 w-20 overflow-hidden rounded-sm transition md:h-20 md:w-24 ${
                      i === active
                        ? 'ring-2 ring-fg ring-offset-2 ring-offset-bg'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.thumb} alt="" fill sizes="96px" className="object-cover" />
                    <span className="sr-only">Tampilkan foto {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {current && index !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri ${title}, gambar ${index + 1} dari ${images.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <figure className="relative flex h-full w-full items-center justify-center px-4 py-16 md:px-20">
            <div className="relative h-full w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <KindBadge kind={current.kind} />
            </div>
            <figcaption className="absolute bottom-4 left-0 w-full px-6 text-center text-xs text-white/75">
              {index + 1} / {images.length} · {current.alt}
            </figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute top-3 right-3 flex h-12 w-12 items-center justify-center text-3xl"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Tutup galeri</span>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute top-1/2 left-1 flex h-14 w-12 -translate-y-1/2 items-center justify-center text-3xl md:left-4"
              >
                <span aria-hidden="true">‹</span>
                <span className="sr-only">Gambar sebelumnya</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute top-1/2 right-1 flex h-14 w-12 -translate-y-1/2 items-center justify-center text-3xl md:right-4"
              >
                <span aria-hidden="true">›</span>
                <span className="sr-only">Gambar berikutnya</span>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
