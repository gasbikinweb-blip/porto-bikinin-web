'use client';

// Galeri foto + lightbox buatan sendiri memakai <dialog> bawaan browser:
// fokus terkunci di dalam dialog, Esc menutup, panah kiri/kanan berpindah foto,
// dan fokus kembali ke foto yang diklik setelah ditutup.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProjectPhoto } from '@/data/projects';
import { ChevronIcon, CloseIcon } from './icons';

type Props = { photos: readonly ProjectPhoto[] };

export function PhotoGallery({ photos }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  // Salinan index untuk handler event dialog (tanpa memicu efek ulang)
  const indexRef = useRef<number | null>(null);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    // Saat ditutup (Esc / tombol), kembalikan fokus ke foto terakhir
    const onClose = () => {
      const last = indexRef.current;
      setIndex(null);
      if (last !== null) triggers.current[last]?.focus();
    };
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('close', onClose);
    return () => {
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('close', onClose);
    };
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="reveal mb-3 break-inside-avoid sm:mb-4">
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-surface-2 text-left"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={720}
                height={i % 3 === 0 ? 1280 : 900}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-xs font-medium text-white sm:p-4 sm:text-sm">
                {p.caption}
              </span>
              <span className="sr-only"> (perbesar foto)</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? `Foto: ${current.caption}` : 'Foto hasil pasang'}
        // Klik area gelap di luar foto menutup dialog
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="theme-dark m-auto size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {current && (
          <div className="pointer-events-none flex size-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
            <div className="pointer-events-auto relative h-[78dvh] w-full max-w-4xl">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="animate-in object-contain"
              />
            </div>
            <p className="pointer-events-auto text-center text-sm text-white/90">
              {current.caption}
              <span className="ml-2 text-white/60">
                {index! + 1} / {photos.length}
              </span>
            </p>
            <div className="pointer-events-auto absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Tutup"
                autoFocus
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Foto sebelumnya"
              className="pointer-events-auto absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Foto berikutnya"
              className="pointer-events-auto absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronIcon className="size-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
