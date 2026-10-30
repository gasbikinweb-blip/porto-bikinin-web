'use client';

// Galeri + lightbox aksesibel: <dialog> showModal (fokus terkunci, Esc menutup),
// panah kiri/kanan untuk berpindah, fokus kembali ke thumbnail pemicu saat ditutup.
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { ProjectImage } from '@/data/projects';
import { RenderBadge } from './RenderBadge';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  'aria-hidden': true,
} as const;

export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef(0);
  const [index, setIndex] = useState(0);
  const current = images[index];

  const open = (i: number) => {
    opener.current = i;
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              ref={(el) => {
                triggers.current[i] = el;
              }}
              onClick={() => open(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-surface"
              aria-label={`Perbesar gambar ${i + 1} dari ${images.length}: ${img.alt}`}
            >
              <Image
                src={img.thumb}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {img.kind === 'render' && <RenderBadge />}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`Galeri ${title}`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
        onClose={() => triggers.current[opener.current]?.focus()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <figure
            className="flex h-full flex-col items-center justify-center gap-3 p-4 sm:p-10"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="relative h-[78vh] w-full max-w-5xl">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="max-w-3xl text-center text-sm text-white/85" aria-live="polite">
              {current.kind === 'render' && (
                <span className="mr-2 rounded-full border border-white/40 px-2 py-0.5 text-xs">
                  Render Desain
                </span>
              )}
              {index + 1} / {images.length} · {current.alt}
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Tutup galeri"
        >
          <svg {...iconProps} className="size-5">
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6"
              aria-label="Gambar sebelumnya"
            >
              <svg {...iconProps} className="size-5 rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6"
              aria-label="Gambar berikutnya"
            >
              <svg {...iconProps} className="size-5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
