'use client';

// Katalog merek vinyl roll: pilih merek, ketuk foto kecil untuk mengganti foto utama,
// ketuk kode warna untuk melihat detail teksturnya, lalu minta contoh warna lewat WhatsApp.
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { BrandCatalog as Catalog } from '@/data/catalog';
import { siteConfig } from '@/lib/config';
import { trapTab } from '@/lib/dialog';
import { useModal } from '@/lib/useModal';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ChevronIcon, CloseIcon, WhatsAppIcon } from './icons';

export function BrandCatalog({ catalogs }: { catalogs: Catalog[] }) {
  const [brandIndex, setBrandIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const modal = useModal<number>();
  const colorIndex = modal.value;
  const photoRef = useRef<HTMLDivElement>(null);

  const catalog = catalogs[brandIndex] ?? catalogs[0];
  if (!catalog) return null;
  const photo = catalog.photos[photoIndex] ?? catalog.photos[0];
  const name = `${catalog.brand} ${catalog.line}`;
  const color = colorIndex === null ? null : catalog.colors[colorIndex];
  const total = catalog.colors.length;

  const step = (delta: number) =>
    modal.setValue((i) => (i === null ? i : (i + delta + total) % total));

  const close = modal.close;

  // Tutup modal lalu tampilkan halaman buku sampel yang memuat warna ini
  const showInBook = (index: number) => {
    setPhotoIndex(index);
    close();
    photoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <div role="group" aria-label="Pilih merek" className="flex flex-wrap gap-2">
        {catalogs.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === brandIndex}
            onClick={() => {
              setBrandIndex(i);
              setPhotoIndex(0);
            }}
            className="min-h-12 rounded-full border-2 border-line bg-background px-5 font-bold transition-all hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white aria-pressed:shadow-lg aria-pressed:shadow-accent/25"
          >
            {c.brand} {c.line}
          </button>
        ))}
      </div>

      <div
        key={catalog.id}
        className="gallery-in mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10"
      >
        {/* Foto utama + strip foto kecil */}
        <div className="min-w-0" ref={photoRef}>
          {photo && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-2 shadow-xl shadow-black/10">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="lightbox-img object-cover"
              />
            </div>
          )}
          {catalog.photos.length > 1 && (
            <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
              {catalog.photos.map((p, i) => (
                <li key={p.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setPhotoIndex(i)}
                    aria-pressed={i === photoIndex}
                    className={`relative block h-16 w-24 overflow-hidden rounded-xl transition-all sm:h-20 sm:w-28 ${i === photoIndex ? 'ring-3 ring-accent' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={p.thumb} alt="" fill sizes="7rem" className="object-cover" />
                    <span className="sr-only">Lihat foto: {p.alt}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info merek */}
        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-bold tracking-wider text-accent uppercase">{catalog.type}</p>
          <h3 className="mt-1 text-3xl font-extrabold tracking-tight">{name}</h3>
          <dl className="mt-4 flex flex-wrap gap-2">
            {catalog.specs.map((s) => (
              <div key={s.label} className="rounded-xl bg-mint px-4 py-2">
                <dt className="text-xs font-semibold text-sage uppercase">{s.label}</dt>
                <dd className="font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-bold">
            Pilihan warna ({total})
            <span className="ml-2 font-normal text-muted">ketuk warna untuk melihat detail</span>
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {catalog.colors.map((c, i) => (
              <li key={c.code}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => modal.open(i, e.currentTarget)}
                  className="group flex w-full items-center gap-2.5 rounded-xl border border-line bg-background p-2 text-left transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                >
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-lg shadow-inner ring-1 ring-black/10">
                    <Image
                      src={c.swatch}
                      alt=""
                      fill
                      sizes="3rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-xs font-semibold text-muted">{c.code}</span>
                    <span className="block truncate font-semibold">{c.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <a
            href={buildWhatsAppLink(
              `Halo ${siteConfig.name}, saya ingin melihat contoh warna ${name} dan meminta penawaran.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-wa px-7 text-lg font-semibold text-white transition-colors hover:bg-wa-strong lg:self-start"
          >
            <WhatsAppIcon />
            Minta contoh warna
            <span className="sr-only">(tab baru)</span>
          </a>
          {/* TODO: pastikan buku sampel memang dibawa saat survei */}
          <p className="mt-3 text-sm text-muted">
            Warna di layar bisa sedikit berbeda dengan aslinya. Kami bawakan buku sampel saat
            survei.
          </p>
        </div>
      </div>

      {/* Modal detail warna */}
      <dialog
        {...modal.dialogProps}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          else if (e.key === 'ArrowLeft') step(-1);
          else trapTab(e);
        }}
        aria-labelledby="warna-judul"
        className="showcase-dialog m-auto max-h-[90dvh] w-[min(94vw,52rem)] overflow-hidden rounded-3xl bg-background p-0 text-foreground"
      >
        {color && (
          <div className="no-scrollbar grid max-h-[90dvh] overflow-y-auto sm:grid-cols-[1.1fr_1fr]">
            {/* Tekstur warna besar */}
            <div className="relative aspect-[4/3] bg-surface-2 sm:aspect-auto sm:min-h-[26rem]">
              <Image
                key={color.swatch}
                src={color.swatch}
                alt={`Tekstur warna ${color.code} ${color.name} dari buku sampel ${name}`}
                fill
                sizes="(min-width: 640px) 28rem, 94vw"
                className="lightbox-img object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                Foto dari buku sampel
              </span>
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold tracking-wider text-accent uppercase">{name}</p>
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  className="-mt-2 -mr-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-surface px-4 font-semibold hover:bg-surface-2"
                >
                  <CloseIcon className="size-4" />
                  Tutup
                </button>
              </div>
              <p key={color.code} className="showcase-in mt-1 text-lg font-semibold text-muted">
                {color.code}
              </p>
              <h3
                id="warna-judul"
                key={color.name}
                className="showcase-in text-3xl font-extrabold tracking-tight sm:text-4xl"
                style={{ '--i': 1 } as React.CSSProperties}
              >
                {color.name}
              </h3>
              <dl className="mt-4 flex flex-wrap gap-2">
                {catalog.specs.map((s) => (
                  <div key={s.label} className="rounded-xl bg-mint px-3 py-1.5">
                    <dt className="text-[0.7rem] font-semibold text-sage uppercase">{s.label}</dt>
                    <dd className="text-sm font-bold">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">
                Warna di layar bisa sedikit berbeda. Untuk kepastian, lihat contoh fisiknya saat
                survei.
              </p>

              <div className="mt-auto flex flex-col gap-2 pt-6">
                <a
                  href={buildWhatsAppLink(
                    `Halo ${siteConfig.name}, saya tertarik dengan warna ${color.code} ${color.name} (${name}). Mohon info ketersediaan dan penawarannya.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-wa px-6 font-semibold text-white hover:bg-wa-strong"
                >
                  <WhatsAppIcon />
                  Tanya warna ini
                  <span className="sr-only">(tab baru)</span>
                </a>
                <button
                  type="button"
                  onClick={() => showInBook(color.photo)}
                  className="min-h-12 rounded-full border border-line px-6 font-semibold hover:border-accent hover:text-accent-strong"
                >
                  Lihat di buku sampel
                </button>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="grid size-12 place-items-center rounded-full bg-surface hover:bg-surface-2"
                  >
                    <ChevronIcon dir="left" />
                    <span className="sr-only">Warna sebelumnya</span>
                  </button>
                  <span className="text-sm text-muted" aria-live="polite">
                    {(colorIndex ?? 0) + 1} / {total}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="grid size-12 place-items-center rounded-full bg-surface hover:bg-surface-2"
                  >
                    <ChevronIcon dir="right" />
                    <span className="sr-only">Warna berikutnya</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
