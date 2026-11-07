'use client';

// Galeri + lightbox berbasis <dialog> bawaan browser:
// showModal() membuat isi halaman lain tidak bisa difokus (focus trap) dan Esc menutup dialog.
// Panah kiri/kanan untuk ganti foto; fokus kembali ke foto yang diklik saat ditutup.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '@/data/gallery';

function Lightbox({
  images,
  start,
  onClose,
}: {
  images: readonly GalleryImage[];
  start: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const count = images.length;
  const image = images[index] ?? images[0];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (dialog.open) dialog.close();
      trigger?.focus();
    };
  }, []);

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const btn =
    'grid size-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30';

  return (
    <dialog
      ref={ref}
      aria-label="Galeri foto"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        else if (e.key === 'ArrowLeft') go(-1);
      }}
      // Esc memicu event "cancel" → tutup lewat state React
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 p-3">
          <p className="text-sm font-semibold tabular-nums" aria-live="polite">
            {index + 1} / {count}
            <span className="sr-only">: {image?.alt}</span>
          </p>
          <button type="button" onClick={onClose} autoFocus className={btn}>
            <span className="sr-only">Tutup galeri</span>
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div
          className="relative min-h-0 flex-1"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {image && (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>
        <div className="flex items-center justify-center gap-6 p-4">
          <button type="button" onClick={() => go(-1)} className={btn}>
            <span className="sr-only">Foto sebelumnya</span>
            <span aria-hidden="true" className="text-xl">
              ←
            </span>
          </button>
          <button type="button" onClick={() => go(1)} className={btn}>
            <span className="sr-only">Foto berikutnya</span>
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function Gallery({ images }: { images: readonly GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface"
            >
              <Image
                src={i === 0 ? img.src : img.thumb}
                alt={img.alt}
                fill
                sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="sr-only"> (perbesar)</span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox images={images} start={open} onClose={() => setOpen(null)} />}
    </>
  );
}
