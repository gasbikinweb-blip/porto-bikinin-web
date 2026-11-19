'use client';

// Komponen interaktif kecil: kartu momen, banner musiman, dan galeri hasil custom (lightbox)
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { occasions } from '@/data/catalog-meta';
import { gallery } from '@/data/content';
import { products } from '@/data/products';
import type { OccasionId } from '@/data/types';
import { OCCASION_EVENT } from './Catalog';
import { ChevronIcon, CloseIcon } from './icons';

const occasionImages: Record<OccasionId, string> = {
  pernikahan: '/images/galeri/piring-floral-box-thumb.webp',
  khitan: '/images/galeri/mangkok-ungu-box-thumb.webp',
  hajatan: '/images/galeri/souvenir-bayi-thumb.webp',
  'haji-umroh': '/images/galeri/piring-kabah-thumb.webp',
  natal: '/images/produk/box-piring-natal/01-thumb.webp',
  'idul-fitri': '/images/produk/box-piring-idul-fitri/01-thumb.webp',
};

export function OccasionCards() {
  const pick = (id: OccasionId) => {
    // Momen yang hanya punya produk kemasan (Natal, Idul Fitri) diarahkan ke section Kemasan
    const hasSouvenir = products.some((p) => !p.isPackaging && p.occasions.includes(id));
    if (hasSouvenir) window.dispatchEvent(new CustomEvent(OCCASION_EVENT, { detail: id }));
    document
      .getElementById(hasSouvenir ? 'katalog' : 'kemasan')
      ?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <ul
      data-stagger
      className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible"
    >
      {occasions.map((o) => {
        const count = products.filter((p) => p.occasions.includes(o.id)).length;
        return (
          <li key={o.id} className="reveal w-40 shrink-0 snap-start sm:w-48 lg:w-auto">
            <button
              type="button"
              onClick={() => pick(o.id)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-2 text-left"
            >
              <Image
                src={occasionImages[o.id]}
                alt=""
                fill
                sizes="(min-width: 1024px) 18vw, 192px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="block text-sm font-semibold tracking-wider uppercase">
                  {o.name}
                </span>
                <span className="text-xs text-white/80">{count} produk</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Gallery() {
  const [i, setI] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const n = gallery.length;

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (i !== null && !d.open) d.showModal();
    if (i === null && d.open) d.close();
    document.body.style.overflow = i !== null ? 'hidden' : '';
  }, [i]);

  const go = (s: number) => setI((v) => (v === null ? v : (v + s + n) % n));
  const cur = i !== null ? gallery[i] : undefined;

  return (
    <>
      <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g, idx) => (
          <li key={g.src} className="reveal">
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Perbesar foto: ${g.caption}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface-2"
            >
              <Image
                src={g.thumb}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-left text-xs font-semibold text-white">
                {g.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        aria-label={cur ? `Foto: ${cur.caption}` : 'Foto'}
        onCancel={(e) => {
          e.preventDefault();
          setI(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setI(null)}
        className="m-auto max-h-[94dvh] w-[min(94vw,760px)] overflow-hidden rounded-2xl bg-black p-0 text-white backdrop:bg-black/85"
      >
        {cur && (
          <div className="relative">
            <div className="relative aspect-square">
              <Image src={cur.src} alt={cur.alt} fill sizes="760px" className="object-contain" />
            </div>
            <p className="p-4 text-center text-sm">
              {cur.caption} · {i! + 1}/{n}
            </p>
            <button
              type="button"
              onClick={() => setI(null)}
              aria-label="Tutup"
              className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-black/60"
            >
              <CloseIcon />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto sebelumnya"
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto berikutnya"
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60"
            >
              <ChevronIcon />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
