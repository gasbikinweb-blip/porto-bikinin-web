'use client';

// Lightbox galeri bersama (portofolio, sample warna): panel di tengah, foto utama, deretan thumbnail
// (yang tidak dipilih abu-abu, yang dipilih menyala), tombol WhatsApp kontekstual.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronIcon, CloseIcon, WhatsAppIcon } from './icons';

export type LightboxImage = { small: string; large: string; alt: string };
export type LightboxGallery = {
  title: string;
  images: LightboxImage[];
  cta: { href: string; label: string };
};
export type LightboxLabels = { gallery: string; close: string; previous: string; next: string };

/** State lightbox: panggil open(gallery, index) dari tombol mana pun */
export function useLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // gallery tetap tersimpan setelah ditutup agar isi tidak hilang selama animasi menutup
  const [gallery, setGallery] = useState<LightboxGallery | null>(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((g: LightboxGallery, i = 0) => {
    setGallery(g);
    setIndex(i);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  return { dialogRef, gallery, index, setIndex, isOpen, setIsOpen, open };
}

export function Lightbox({
  ctl,
  labels,
}: {
  ctl: ReturnType<typeof useLightbox>;
  labels: LightboxLabels;
}) {
  const { dialogRef, gallery, index, setIndex, isOpen, setIsOpen } = ctl;
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const total = gallery?.images.length ?? 0;
  const image = gallery?.images[index];

  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => total && setIndex((i) => (i + delta + total) % total),
    [total, setIndex],
  );

  // Panah kiri/kanan saat lightbox terbuka
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, step]);

  // Thumbnail aktif selalu terlihat di deretan (geser otomatis)
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [index, gallery]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={gallery ? `${labels.gallery}: ${gallery.title}` : labels.gallery}
      onClose={() => setIsOpen(false)}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="lightbox theme-dark text-foreground"
    >
      {gallery && image && (
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between gap-4 px-4 pt-3 pb-2 sm:px-6 sm:pt-4">
            <p className="min-w-0 truncate text-sm font-bold">
              {gallery.title}
              <span className="ml-3 font-normal text-muted">
                {index + 1} / {total}
              </span>
            </p>
            <button
              type="button"
              onClick={close}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-accent"
            >
              <CloseIcon />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>

          <div
            className="relative mx-4 h-[min(46dvh,520px)] overflow-hidden rounded-2xl bg-black/30 sm:mx-6 sm:h-[min(58dvh,620px)]"
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX;
              if (start != null && end != null && Math.abs(end - start) > 50)
                step(end < start ? 1 : -1);
              touchX.current = null;
            }}
          >
            <Image
              key={image.large}
              src={image.large}
              alt={image.alt}
              fill
              sizes="(min-width: 1100px) 1050px, 100vw"
              className="lightbox-photo object-contain"
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <ChevronIcon dir="left" />
                  <span className="sr-only">{labels.previous}</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-accent hover:text-on-accent"
                >
                  <ChevronIcon dir="right" />
                  <span className="sr-only">{labels.next}</span>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail: yang tidak dipilih abu-abu & redup, yang dipilih "menyala" dengan bingkai oranye */}
          {total > 1 && (
            <ul className="flex shrink-0 gap-2 overflow-x-auto px-4 pt-4 pb-2 sm:gap-3 sm:px-6">
              {gallery.images.map((img, i) => {
                const selected = i === index;
                return (
                  <li key={img.small} className="shrink-0">
                    <button
                      type="button"
                      ref={selected ? activeThumbRef : undefined}
                      aria-current={selected ? 'true' : undefined}
                      aria-label={`${i + 1} / ${total}: ${img.alt}`}
                      onClick={() => setIndex(i)}
                      className={`relative block size-14 overflow-hidden rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-20 ${selected ? 'scale-100 opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-background grayscale-0' : 'scale-95 opacity-45 grayscale hover:scale-100 hover:opacity-80 hover:grayscale-[40%]'}`}
                    >
                      <Image src={img.small} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex flex-col items-center gap-3 px-4 pt-2 pb-4 sm:flex-row sm:justify-between sm:px-6 sm:pb-5">
            <p className="text-center text-sm text-muted sm:text-left" aria-live="polite">
              {image.alt}
            </p>
            <a
              href={gallery.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-foreground hover:text-background"
            >
              <WhatsAppIcon className="size-4" /> {gallery.cta.label}
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
