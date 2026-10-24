'use client';

// Lightbox ringan berbasis <dialog> bawaan browser:
// showModal() membuat isi halaman lain tidak bisa difokus (focus trap) dan Esc menutup dialog.
// Panah kiri/kanan untuk ganti foto; fokus dikembalikan ke tombol pemicu saat ditutup.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { WorkImage } from '@/data/works';

type Props = {
  title: string;
  images: readonly WorkImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

export function Lightbox({ title, images, index, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const image = images[index] ?? images[0];
  const count = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
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

  const go = (step: number) => onIndexChange((index + step + count) % count);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  }

  const btn =
    'grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25';

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Galeri foto: ${title}`}
      onKeyDown={onKeyDown}
      // Esc memicu event "cancel" → tutup lewat state React
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // Klik di area gelap (bukan pada foto/tombol) menutup lightbox
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
    >
      <div
        className="flex h-full flex-col"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="flex items-center justify-between gap-4 p-3 sm:p-4">
          <p className="truncate text-sm font-medium" aria-live="polite">
            {title}{' '}
            <span className="text-white/70">
              · {index + 1} / {count}
            </span>
          </p>
          <button type="button" onClick={onClose} className={btn} autoFocus>
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

        <div className="relative min-h-0 flex-1">
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

        {count > 1 && (
          <div className="flex items-center justify-center gap-6 p-4">
            <button type="button" onClick={() => go(-1)} className={btn}>
              <span className="sr-only">Foto sebelumnya</span>
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} className={btn}>
              <span className="sr-only">Foto berikutnya</span>
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
