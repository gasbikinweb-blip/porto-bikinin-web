'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KindBadge } from './KindBadge';
import type { ProjectImage } from '@/data/types';

/**
 * Galeri foto + lightbox aksesibel buatan sendiri.
 * Esc menutup, panah kiri/kanan berpindah, fokus terkunci di dalam dialog,
 * dan fokus kembali ke foto pemicu saat ditutup.
 */
export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastIndex = useRef(0);
  const wasOpen = useRef(false);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) {
      // Kembalikan fokus ke pemicu (hanya setelah lightbox pernah dibuka)
      if (wasOpen.current) triggers.current[lastIndex.current]?.focus();
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

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {images.map((img, i) => (
          <li key={img.src} className="break-inside-avoid">
            <button
              type="button"
              ref={(el) => {
                triggers.current[i] = el;
              }}
              onClick={() => {
                lastIndex.current = i;
                setIndex(i);
              }}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-surface"
            >
              <Image
                src={img.thumb}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <KindBadge kind={img.kind} />
              <span className="sr-only">Perbesar gambar {i + 1}</span>
            </button>
          </li>
        ))}
      </ul>

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
