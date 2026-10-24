'use client';

// Modal detail karya berbasis <dialog> bawaan browser:
// showModal() membuat isi halaman lain tidak bisa difokus (focus trap) dan Esc menutup dialog.
// Panah kiri/kanan untuk ganti foto; fokus dikembalikan ke tombol pemicu saat ditutup.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Work } from '@/data/works';
import { buildWhatsAppLink, workMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  work: Work;
  categoryName?: string;
  onClose: () => void;
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d={dir === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WorkModal({ work, categoryName, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = work.images.length;
  const image = work.images[index] ?? work.cover;

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

  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  }

  const navBtn =
    'grid size-11 place-items-center bg-white/90 text-ink shadow transition-colors hover:bg-white';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-judul"
      onKeyDown={onKeyDown}
      // Esc memicu event "cancel" → tutup lewat state React
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // Klik di luar panel (latar gelap) menutup modal
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:h-auto sm:max-h-[90dvh] sm:w-[min(68rem,calc(100%-3rem))]"
    >
      <div className="grid h-full overflow-y-auto sm:max-h-[90dvh] md:grid-cols-[1.25fr_1fr]">
        {/* Galeri */}
        <div className="bg-surface md:sticky md:top-0 md:self-start">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:h-[min(68dvh,38rem)]">
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="animate-fade object-contain"
            />
            {count > 1 && (
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <button type="button" onClick={() => go(-1)} className={navBtn}>
                  <span className="sr-only">Foto sebelumnya</span>
                  <Arrow dir="left" />
                </button>
                <p
                  className="bg-black/60 px-3 py-1 font-serif text-sm text-white tabular-nums"
                  aria-live="polite"
                >
                  {index + 1} / {count}
                </p>
                <button type="button" onClick={() => go(1)} className={navBtn}>
                  <span className="sr-only">Foto berikutnya</span>
                  <Arrow dir="right" />
                </button>
              </div>
            )}
          </div>
          {count > 1 && (
            <ul className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none]">
              {work.images.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className="relative block size-16 overflow-hidden opacity-60 ring-wood transition-opacity hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2"
                  >
                    <Image src={img.thumb} alt="" fill sizes="64px" className="object-cover" />
                    <span className="sr-only">Foto {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="relative flex flex-col p-6 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute top-3 right-3 grid size-11 place-items-center border border-line bg-background transition-colors hover:border-foreground"
          >
            <span className="sr-only">Tutup detail</span>
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <p className="eyebrow pr-12">{categoryName}</p>
          <h2 id="modal-judul" className="mt-3 pr-8 font-serif text-3xl leading-tight sm:text-4xl">
            {work.title}
          </h2>
          <p
            className={`mt-4 w-fit px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase ${work.status === 'proses' ? 'bg-brand-gold text-ink' : 'bg-surface text-foreground'}`}
          >
            {work.status === 'proses' ? 'Proses Produksi' : 'Bisa Custom'}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{work.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="eyebrow">Dikerjakan</dt>
              <dd className="mt-1">{formatDate(work.date)}</dd>
            </div>
            <div>
              <dt className="eyebrow">Ukuran & warna</dt>
              <dd className="mt-1">Bisa custom</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={buildWhatsAppLink(workMessage(work.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2 bg-foreground px-6 text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-background uppercase transition-colors hover:bg-wood-strong"
            >
              <WhatsAppIcon className="size-4" />
              Pesan yang serupa
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </a>
            {work.instagramUrl && (
              <a
                href={work.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center border border-foreground/25 px-6 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:border-foreground"
              >
                Lihat di Instagram ↗<span className="sr-only"> (tab baru)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
