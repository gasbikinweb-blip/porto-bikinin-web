'use client';

// Modal detail foto portofolio: foto besar + thumbnail di kiri, keterangan & tombol WA di kanan.
// Aksesibel: dialog modal, Esc menutup, panah kiri/kanan berpindah foto, fokus terkunci di dalam
// dialog, dan fokus kembali ke pemicu saat ditutup.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { categoryLabels } from '@/data/products';
import type { Project } from '@/data/projects';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { config } from '@/lib/config';
import { ChevronIcon, CloseIcon, WhatsAppIcon } from './icons';

type Props = {
  items: Project[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

const FOCUSABLE = 'button, a[href]';

export function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;
  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

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
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
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

  const ask = `Halo ${config.siteName}, saya melihat foto "${item.title}" di website dan ingin konsultasi produksi ${item.productType.toLowerCase()} serupa.`;
  const specs = [
    { label: 'Jenis produk', value: item.productType },
    item.material && { label: 'Motif', value: item.material },
    { label: 'Detail', value: item.focus },
    { label: 'Layanan', value: 'CMT: potong, jahit, finishing' },
  ].filter((s): s is { label: string; value: string } => Boolean(s));

  const arrowBtn =
    'grid size-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1d171a]/70 sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-judul"
        className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-xl bg-background p-4 sm:rounded-xl sm:p-6 lg:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-surface hover:bg-line"
        >
          <CloseIcon className="size-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* Kiri: foto besar + thumbnail */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 460px, 92vw"
                className="object-cover"
              />
              {item.kind === 'ilustrasi' && (
                <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold">
                  Ilustrasi
                </span>
              )}
              {count > 1 && (
                <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Foto sebelumnya"
                    className={arrowBtn}
                  >
                    <ChevronIcon left className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Foto berikutnya"
                    className={arrowBtn}
                  >
                    <ChevronIcon className="size-5" />
                  </button>
                </div>
              )}
            </div>

            {count > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {items.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => onIndexChange(i)}
                      aria-label={`Lihat foto ${i + 1}: ${p.title}`}
                      aria-current={i === index ? 'true' : undefined}
                      className="relative block aspect-square w-full overflow-hidden rounded-md bg-surface opacity-60 ring-plum transition hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2"
                    >
                      <Image
                        src={p.thumb ?? p.src}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Kanan: keterangan */}
          <div className="lg:pt-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-plum uppercase">
              {categoryLabels[item.category]} · Foto {index + 1} dari {count}
            </p>
            <h2 id="modal-judul" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
              {item.title}
            </h2>
            <p className="mt-2 font-serif text-xl text-plum">Hasil produksi Seams Konveksi</p>
            <p className="mt-4 text-muted">{item.caption}</p>

            <h3 className="mt-8 font-serif text-xl">Detail</h3>
            <dl className="mt-3 border-t border-line text-sm">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3"
                >
                  <dt className="text-muted">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={buildWhatsAppLink(ask)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-plum px-5 text-sm font-semibold text-background hover:bg-plum-strong"
              >
                <WhatsAppIcon />
                Produksi seperti ini
                <span className="sr-only">(membuka WhatsApp di tab baru)</span>
              </a>
              <a
                href={buildWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold hover:border-plum hover:text-plum"
              >
                <WhatsAppIcon />
                Desain custom
                <span className="sr-only">(membuka WhatsApp di tab baru)</span>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              Semua produksi diawali sampel yang Anda setujui. Detail jumlah, bahan, dan jadwal
              dibahas saat konsultasi via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
