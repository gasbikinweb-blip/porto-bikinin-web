'use client';

// Buku sampel merek lain: kartu foto, ketuk untuk memperbesar & tanya lewat WhatsApp
import Image from 'next/image';
import type { SampleBook } from '@/data/more-products';
import { siteConfig } from '@/lib/config';
import { trapTab } from '@/lib/dialog';
import { useModal } from '@/lib/useModal';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { CheckIcon, CloseIcon, PlusIcon, WhatsAppIcon } from './icons';

export function SampleBooks({ books }: { books: SampleBook[] }) {
  const modal = useModal<SampleBook>();
  const active = modal.value;
  const close = modal.close;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" data-stagger>
        {books.map((b) => (
          <li key={b.brand} className="reveal">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => modal.open(b, e.currentTarget)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-background text-left transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <span className="relative block aspect-[3/4] overflow-hidden bg-surface-2">
                <Image
                  src={b.image.thumb}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-2 right-2 grid size-9 place-items-center rounded-full bg-white/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
                  <PlusIcon />
                </span>
              </span>
              <span className="block p-3 sm:p-4">
                <span className="block text-xs font-semibold text-accent uppercase">{b.type}</span>
                <span className="mt-0.5 block font-bold">{b.brand}</span>
                <span className="mt-0.5 block text-sm leading-snug text-muted">{b.lines}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        {...modal.dialogProps}
        onKeyDown={trapTab}
        aria-label={active ? `Buku sampel ${active.brand}` : 'Buku sampel'}
        className="showcase-dialog m-auto max-h-[90dvh] w-[min(94vw,56rem)] overflow-hidden rounded-3xl bg-background p-0 text-foreground"
      >
        {active && (
          <div className="no-scrollbar relative grid max-h-[90dvh] overflow-y-auto sm:grid-cols-[1.2fr_1fr]">
            <button
              type="button"
              onClick={close}
              autoFocus
              className="absolute top-3 right-3 z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/95 px-4 font-semibold shadow-md hover:bg-mint"
            >
              <CloseIcon className="size-4" />
              Tutup
            </button>
            <div className="relative aspect-[4/3] bg-surface-2 sm:aspect-auto sm:min-h-[32rem]">
              <Image
                key={active.image.src}
                src={active.image.src}
                alt={active.image.alt}
                fill
                sizes="(min-width: 640px) 32rem, 94vw"
                className="lightbox-img object-cover"
              />
            </div>
            <div className="flex flex-col p-5 sm:p-8">
              <p className="pr-24 text-sm font-bold tracking-wider text-accent uppercase sm:pr-28">
                {active.type}
              </p>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {active.brand}
              </h3>
              <p className="mt-1 text-muted sm:text-lg">{active.lines}</p>
              <ul className="mt-4 space-y-2">
                {active.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm sm:text-base">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent sm:mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Buku sampel bisa dilihat langsung di showroom kami di Gading Serpong.
              </p>
              <a
                href={buildWhatsAppLink(
                  `Halo ${siteConfig.name}, saya ingin tahu pilihan ${active.brand} (${active.lines}) dan meminta penawaran.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-wa px-6 font-semibold text-white hover:bg-wa-strong"
              >
                <WhatsAppIcon />
                Tanya merek ini
                <span className="sr-only">(tab baru)</span>
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
