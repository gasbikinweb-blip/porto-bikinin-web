'use client';

// Modal detail memakai <dialog> native: focus trap, Esc, dan aria-modal dari browser.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { categoryName } from '@/data/categories';
import { priceLabel, type MenuItem } from '@/data/menu';
import { buildWhatsAppLink, itemMessage, itemUrl } from '@/lib/config';

export function MenuModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onAdd: (m: MenuItem) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = item !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="judul-menu"
      onCancel={(e) => {
        e.preventDefault(); // Esc: tutup lewat alur yang sama agar URL ikut bersih
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white text-foreground sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-3xl"
    >
      {item && <Detail key={item.slug} m={item} onClose={onClose} onAdd={onAdd} />}
    </dialog>
  );
}

function Detail({
  m,
  onClose,
  onAdd,
}: {
  m: MenuItem;
  onClose: () => void;
  onAdd: (m: MenuItem) => void;
}) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = m.images.length;
  const img = m.images[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  const copy = async () => {
    const url = itemUrl(m.slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      window.prompt('Salin link menu:', url);
    }
  };

  const specs: [string, string | undefined][] = [
    ['Satuan', m.unit],
    ['Porsi', m.servings],
    ['Minimal order', m.minOrder ? `${m.minOrder} ${m.unit}` : undefined],
    ['Batas pesan', m.leadTime],
  ];

  return (
    <div
      className="grid md:grid-cols-2"
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="p-4">
        <div
          className="relative aspect-square overflow-hidden rounded-2xl bg-blush"
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const end = e.changedTouches[0]?.clientX;
            if (touchX.current !== null && end !== undefined && total > 1) {
              const dx = end - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }
            touchX.current = null;
          }}
        >
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl"
              >
                ›
              </button>
            </>
          )}
        </div>
        {total > 1 && (
          <ul className="flex gap-2 overflow-x-auto p-1 pt-3">
            {m.images.map((t, i) => (
              <li key={t.src} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Tampilkan foto ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`relative block size-14 overflow-hidden rounded-lg ${i === index ? 'ring-2 ring-accent' : 'opacity-70'}`}
                >
                  <Image src={t.thumb} alt="" fill sizes="56px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative p-5 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail menu"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-full border border-line text-xl"
        >
          ×
        </button>
        <p className="pr-12 text-sm font-semibold text-leaf">{categoryName(m.category)}</p>
        <h2 id="judul-menu" className="mt-1 pr-12 font-serif text-3xl leading-tight text-accent">
          {m.name}
        </h2>
        <p className="mt-3 text-lg font-bold">{priceLabel(m)}</p>
        <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
          {specs.map(
            ([k, v]) =>
              v && (
                <div key={k} className="grid grid-cols-3 gap-3 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="col-span-2 font-semibold">{v}</dd>
                </div>
              ),
          )}
        </dl>
        {m.contents && (
          <>
            <h3 className="mt-4 text-sm font-bold">Pilihan dan isi</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
              {m.contents.map((c) => (
                <li key={c} className="rounded-full bg-blush px-3 py-1">
                  {c}
                </li>
              ))}
            </ul>
          </>
        )}
        {m.customizable && (
          <p className="mt-4 text-sm text-muted">
            Isi bisa disesuaikan, tanyakan ke admin ya, Kak.
          </p>
        )}
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => onAdd(m)}
            className="min-h-12 rounded-full bg-accent px-6 font-bold text-white hover:bg-accent-strong"
          >
            Tambahkan ke Pesanan Acara
          </button>
          <a
            href={buildWhatsAppLink(itemMessage(m.name, m.slug))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-accent px-6 font-bold text-accent"
          >
            <WhatsAppIcon className="size-5" />
            Pesan via WhatsApp<span className="sr-only"> (tab baru)</span>
          </a>
          <button type="button" onClick={copy} className="min-h-11 text-sm font-semibold underline">
            {copied ? 'Link tersalin ✓' : 'Salin Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
