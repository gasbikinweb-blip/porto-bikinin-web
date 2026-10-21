'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  categoryLabels,
  motifLabels,
  type GalleryCategory,
  type GalleryItem,
} from '@/data/projects';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ArrowIcon, ChevronIcon, WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { IlustrasiBadge } from './SectionHeading';

type Props = { items: GalleryItem[]; showFilter?: boolean };

/** Galeri dengan filter kategori dan lightbox aksesibel (Esc, panah kiri/kanan, focus trap, fokus kembali ke pemicu). */
export function Gallery({ items, showFilter = true }: Props) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [filter, setFilter] = useState<GalleryCategory | 'semua'>('semua');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === 'semua' ? items : items.filter((i) => i.category === filter);

  const open = (index: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setOpenIndex(index);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <div>
      {showFilter && categories.length > 1 && (
        <div role="group" aria-label="Filter kategori galeri" className="mb-8 flex flex-wrap gap-2">
          {(['semua', ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className="min-h-11 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white"
            >
              {c === 'semua' ? 'Semua' : categoryLabels[c]}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} foto
      </p>
      <ul key={filter} className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3" data-stagger>
        {visible.map((item, i) => (
          <li key={item.id} className="reveal reveal-zoom">
            <figure>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface"
              >
                <Image
                  src={item.thumb}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.kind === 'ilustrasi' && <IlustrasiBadge />}
                <span className="sr-only">Lihat detail foto</span>
              </button>
              <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {openIndex !== null && visible[openIndex] && (
        <Lightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} onClose={close} />
      )}
    </div>
  );
}

// Status foto ditampilkan jujur: foto asli atau ilustrasi (render/edit)
const statusOf = (item: GalleryItem) => (item.kind === 'ilustrasi' ? 'Ilustrasi' : 'Foto asli');

const iconBtn =
  'grid size-11 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand';

/** Lightbox bertema terang: info di kiri, foto berbingkai di kanan, ringkasan di bawah. */
function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // index selalu valid karena dikontrol oleh Gallery
  const item = items[index]!;
  const many = items.length > 1;
  const prev = () => onIndexChange((index - 1 + items.length) % items.length);
  const next = () => onIndexChange((index + 1) % items.length);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && many) onIndexChange((index + 1) % items.length);
      else if (e.key === 'ArrowLeft' && many)
        onIndexChange((index - 1 + items.length) % items.length);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Focus trap: fokus berputar di dalam dialog
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, items.length, many, onClose, onIndexChange]);

  const facts: [string, string][] = [
    [categoryLabels[item.category], 'Kategori'],
    [motifLabels[item.productType], 'Jenis motif'],
    [item.area ?? 'Jabodetabek', item.area ? 'Lokasi' : 'Area pengiriman'],
    [statusOf(item), 'Status foto'],
  ];
  const waMessage = `Halo ${siteConfig.name}, saya tertarik dengan model seperti ini: ${item.caption}. Mohon info harga dan ketersediaannya.`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-judul"
      className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-ink/45 backdrop-blur-sm sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lightbox-panel relative flex h-dvh w-full max-w-6xl flex-col overflow-y-auto overscroll-contain bg-page shadow-[0_40px_120px_-30px_rgb(12_14_40/0.55)] sm:h-auto sm:max-h-full sm:rounded-[1.75rem] lg:overflow-hidden">
        {/* Latar: foto yang sama, sangat tipis & buram, supaya panel terasa menyatu dengan foto */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            key={`bg-${item.id}`}
            src={item.thumb}
            alt=""
            fill
            sizes="60vw"
            className="scale-110 object-cover opacity-20 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-page via-page/90 to-page/50" />
        </div>

        {/* Bilah atas: merek, navigasi foto, tombol tutup */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-page/95 px-4 py-3 backdrop-blur sm:px-8 sm:py-5 lg:relative lg:bg-transparent lg:backdrop-blur-none">
          <Logo className="hidden h-7 w-auto sm:block" />
          {many ? (
            <div className="flex items-center gap-2">
              <button type="button" onClick={prev} className={iconBtn} aria-label="Foto sebelumnya">
                <ChevronIcon dir="left" />
              </button>
              <span className="min-w-16 rounded-xl border border-line bg-white px-3 py-2.5 text-center text-sm text-muted tabular-nums">
                {index + 1} / {items.length}
              </span>
              <button type="button" onClick={next} className={iconBtn} aria-label="Foto berikutnya">
                <ChevronIcon />
              </button>
            </div>
          ) : (
            <span />
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold tracking-wide text-ink uppercase transition-colors hover:border-brand hover:text-brand"
          >
            Tutup <span className="hidden sm:inline">(Esc)</span>
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        {/* Isi: teks di kiri, foto di kanan (di HP foto di atas) */}
        <div className="relative grid flex-1 items-center gap-6 px-4 py-5 sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14 lg:overflow-y-auto">
          <div key={item.id} className="order-2 lg:order-1">
            <p className="lightbox-in flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold tracking-[0.18em] text-gold-ink uppercase">
              <span>{categoryLabels[item.category]}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
              <span>{motifLabels[item.productType]}</span>
            </p>
            <h2
              id="lightbox-judul"
              className="lightbox-in mt-3 font-display text-[1.7rem] leading-[1.15] font-bold tracking-tight text-ink sm:mt-4 sm:text-5xl"
              style={{ '--d': '60ms' } as React.CSSProperties}
            >
              {item.caption}
            </h2>
            <span
              aria-hidden="true"
              className="lightbox-in mt-6 block h-0.5 w-12 rounded-full bg-gold"
              style={{ '--d': '120ms' } as React.CSSProperties}
            />
            <p
              className="lightbox-in mt-6 max-w-lg text-lg leading-relaxed text-muted"
              style={{ '--d': '160ms' } as React.CSSProperties}
            >
              {item.alt}.
            </p>
            <div
              className="lightbox-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ '--d': '220ms' } as React.CSSProperties}
            >
              <a
                href={buildWhatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-6 font-semibold text-white transition-colors hover:bg-wa-dark"
              >
                <WhatsAppIcon /> Pesan model serupa <span className="sr-only">(tab baru)</span>
              </a>
              {many && (
                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide text-ink uppercase"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors group-hover:border-brand group-hover:text-brand">
                    <ArrowIcon className="size-5" />
                  </span>
                  Foto berikutnya
                </button>
              )}
            </div>
          </div>
          <figure className="order-1 lg:order-2">
            <div className="rounded-[1.5rem] border border-line bg-white p-2.5 shadow-[0_24px_60px_-30px_rgb(28_33_80/0.45)]">
              <div
                className="relative mx-auto max-h-[56svh] overflow-hidden rounded-[1.1rem] bg-surface lg:max-h-[56vh]"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <Image
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="dialog-photo object-contain"
                />
                {item.kind === 'ilustrasi' && <IlustrasiBadge />}
              </div>
            </div>
          </figure>
        </div>

        {/* Ringkasan bawah */}
        <dl className="relative grid grid-cols-2 border-t border-line bg-surface/80 lg:grid-cols-4">
          {facts.map(([value, label], i) => (
            <div
              key={label}
              className={`flex flex-col-reverse px-4 py-3 sm:px-8 sm:py-5 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i === 2 ? 'lg:border-l lg:border-line' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <dt className="mt-1 text-[0.7rem] font-bold tracking-[0.16em] text-muted uppercase">
                {label}
              </dt>
              <dd
                className={`font-display text-[0.95rem] leading-snug font-bold sm:text-xl ${i === 3 ? 'text-brand' : 'text-ink'}`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
