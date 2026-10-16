'use client';

import Image from 'next/image';
import { portfolioSpecs, type PortfolioItem } from '@/data/portfolio';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { CheckIcon, ChevronIcon, CloseIcon, WhatsAppIcon } from './icons';

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  active: { item: PortfolioItem; index: number } | null;
  onClose: () => void;
  onCloseClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSelect: (index: number) => void;
  onStep: (delta: number) => void;
};

const perks = ['Konsultasi & desain gratis', 'Kirim ke seluruh Indonesia', 'Bisa custom ukuran'];

// Modal detail proyek bergaya halaman produk: galeri + spesifikasi + CTA WhatsApp
export function PortfolioDetailDialog({
  dialogRef,
  active,
  onClose,
  onCloseClick,
  onKeyDown,
  onSelect,
  onStep,
}: Props) {
  const item = active?.item;
  const image = item?.images[active?.index ?? 0];
  const specs = item ? (portfolioSpecs[item.slug] ?? []) : [];

  const orderMessage = item
    ? `Halo ${siteConfig.name}, saya tertarik membuat produk seperti "${item.title}" (${item.category}). Boleh info harga dan estimasi pengerjaannya?`
    : '';
  const customMessage = item
    ? `Halo ${siteConfig.name}, saya ingin custom produk mirip "${item.title}" dengan ukuran/desain saya sendiri. Bisa dibantu?`
    : '';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      // Klik area gelap di luar panel menutup modal
      onClick={(e) => e.target === e.currentTarget && onCloseClick()}
      aria-labelledby="judul-detail"
      className="detail-dialog m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-6xl overflow-y-auto rounded-2xl bg-paper p-0 text-ink shadow-2xl"
    >
      {/* Tombol tutup menempel di atas saat modal di-scroll */}
      <div className="pointer-events-none sticky top-0 z-10 -mb-16 flex justify-end p-3">
        <button
          type="button"
          onClick={onCloseClick}
          aria-label="Tutup detail"
          autoFocus
          className="pointer-events-auto grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lg transition hover:rotate-90"
        >
          <CloseIcon />
        </button>
      </div>
      {item && image && (
        <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:p-8">
          {/* Galeri */}
          <div>
            <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-paper-2">
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="animate-photo object-cover"
              />
              {item.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onStep(-1)}
                    aria-label="Foto sebelumnya"
                    className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/85 shadow backdrop-blur transition hover:scale-105 hover:bg-paper"
                  >
                    <ChevronIcon className="size-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onStep(1)}
                    aria-label="Foto berikutnya"
                    className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/85 shadow backdrop-blur transition hover:scale-105 hover:bg-paper"
                  >
                    <ChevronIcon className="size-5" />
                  </button>
                  <span
                    className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-paper"
                    aria-live="polite"
                  >
                    {active.index + 1} / {item.images.length}
                  </span>
                </>
              )}
            </div>
            {item.images.length > 1 && (
              <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Pilih foto">
                {item.images.map((img, i) => (
                  <li key={img.src}>
                    <button
                      type="button"
                      onClick={() => onSelect(i)}
                      aria-label={`Tampilkan foto ${i + 1}`}
                      aria-current={i === active.index}
                      className="relative block aspect-square w-full overflow-hidden rounded-lg opacity-60 ring-2 ring-transparent transition hover:opacity-100 aria-current:opacity-100 aria-current:ring-ink"
                    >
                      <Image src={img.src} alt="" fill sizes="100px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Info & CTA */}
          <div key={item.id} className="lg:py-2">
            <p
              className="animate-rise text-xs font-bold tracking-[0.2em] text-gold-text uppercase"
              style={{ '--delay': '60ms' } as React.CSSProperties}
            >
              {item.category}
            </p>
            <h2
              id="judul-detail"
              className="animate-rise mt-3 font-display text-4xl leading-tight font-medium sm:text-5xl"
              style={{ '--delay': '120ms' } as React.CSSProperties}
            >
              {item.title}
            </h2>
            <p
              className="animate-rise mt-4 text-xl font-semibold text-gold-text"
              style={{ '--delay': '180ms' } as React.CSSProperties}
            >
              Harga menyesuaikan ukuran &amp; desain
            </p>
            <p
              className="animate-rise mt-4 leading-relaxed text-steel"
              style={{ '--delay': '240ms' } as React.CSSProperties}
            >
              {item.description} Kami bisa membuatkan produk serupa dengan ukuran, warna, dan logo
              bisnis Anda.
            </p>

            {specs.length > 0 && (
              <div
                className="animate-rise mt-8"
                style={{ '--delay': '300ms' } as React.CSSProperties}
              >
                <h3 className="font-display text-xl">Spesifikasi</h3>
                <dl className="mt-3 border-t border-line">
                  {specs.map((s) => (
                    <div
                      key={s.label}
                      className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3.5 text-sm"
                    >
                      <dt className="text-steel">{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div
              className="animate-rise mt-8 grid gap-3 sm:grid-cols-2"
              style={{ '--delay': '360ms' } as React.CSSProperties}
            >
              <a
                href={buildWhatsAppLink(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-wa-pulse inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-accent-strong"
              >
                <WhatsAppIcon />
                Pesan yang Serupa
                <span className="sr-only">(membuka WhatsApp di tab baru)</span>
              </a>
              <a
                href={buildWhatsAppLink(customMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-paper-2"
              >
                <WhatsAppIcon />
                Tanya Custom
                <span className="sr-only">(membuka WhatsApp di tab baru)</span>
              </a>
            </div>

            <ul
              className="animate-rise mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-steel"
              style={{ '--delay': '420ms' } as React.CSSProperties}
            >
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckIcon className="size-4 text-accent-strong" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-steel">
              Pemesanan dan pembayaran dilakukan setelah konsultasi via WhatsApp. Pembayaran hanya
              via transfer BCA a/n Hersan Fachriansyah Putra.
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}
