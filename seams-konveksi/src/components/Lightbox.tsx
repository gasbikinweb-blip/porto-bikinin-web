'use client';

// Lightbox aksesibel buatan sendiri: dialog modal, Esc menutup, panah kiri/kanan berpindah foto,
// fokus terkunci di dalam dialog, dan fokus kembali ke pemicu saat ditutup.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { Project } from '@/data/projects';
import { ChevronIcon, CloseIcon } from './icons';

type Props = {
  items: Project[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

export function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    // Kunci scroll halaman di belakang dialog
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndexChange((index + 1) % count);
      else if (e.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Focus trap: putar fokus di antara elemen yang bisa difokus di dalam dialog
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onClose, onIndexChange]);

  if (!item) return null;

  const navBtn =
    'grid size-12 place-items-center rounded-full bg-background/15 text-white hover:bg-background/30';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-judul"
      className="fixed inset-0 z-50 flex flex-col bg-[#1d171a]/95 p-4 text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-white/80" aria-live="polite">
          Foto {index + 1} dari {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={navBtn}
          aria-label="Tutup galeri"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-3 py-4">
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + count) % count)}
          className={`${navBtn} hidden shrink-0 sm:grid`}
          aria-label="Foto sebelumnya"
        >
          <ChevronIcon left />
        </button>
        <figure className="flex h-full min-h-0 max-w-3xl flex-1 flex-col items-center justify-center">
          <div className="relative h-full max-h-[75dvh] w-full">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
            />
            {item.kind === 'ilustrasi' && (
              <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#2e2629]">
                Ilustrasi
              </span>
            )}
          </div>
          <figcaption className="mt-4 text-center">
            <p id="lightbox-judul" className="font-serif text-xl">
              {item.productType}
              {item.material ? ` · ${item.material}` : ''}
            </p>
            <p className="mt-1 text-sm text-white/80">{item.caption}</p>
          </figcaption>
        </figure>
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % count)}
          className={`${navBtn} hidden shrink-0 sm:grid`}
          aria-label="Foto berikutnya"
        >
          <ChevronIcon />
        </button>
      </div>

      {/* Navigasi di HP: tombol di bawah agar mudah dijangkau jempol */}
      <div className="flex justify-center gap-4 sm:hidden">
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + count) % count)}
          className={navBtn}
          aria-label="Foto sebelumnya"
        >
          <ChevronIcon left />
        </button>
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % count)}
          className={navBtn}
          aria-label="Foto berikutnya"
        >
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}
