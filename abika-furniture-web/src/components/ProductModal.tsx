'use client';

// Modal detail produk memakai <dialog> native: focus trap, Esc, dan aria-modal dari browser.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { categoryName } from '@/data/categories';
import { priceLabel, type Product } from '@/data/products';
import { buildWhatsAppLink, productMessage, productUrl } from '@/lib/config';

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = product !== null;

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
      aria-labelledby="judul-produk"
      onCancel={(e) => {
        e.preventDefault(); // Esc: tutup lewat alur yang sama agar URL ikut bersih
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-background text-foreground sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:max-w-5xl"
    >
      {product && <Detail key={product.slug} product={product} onClose={onClose} />}
    </dialog>
  );
}

function Detail({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = p.images.length;
  const img = p.images[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  const copy = async () => {
    const url = productUrl(p.slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      window.prompt('Salin link produk:', url);
    }
  };

  const specs: [string, string | undefined][] = [
    ['Bahan', p.material],
    ['Ukuran', p.size],
    ['Finishing', p.finish],
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
      <div>
        <div
          className="relative aspect-square bg-surface"
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
                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-xl"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-xl"
              >
                ›
              </button>
            </>
          )}
        </div>
        {total > 1 && (
          <ul className="flex gap-2 overflow-x-auto p-3">
            {p.images.map((t, i) => (
              <li key={t.src} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Tampilkan foto ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`relative block size-14 overflow-hidden ${i === index ? 'ring-2 ring-accent' : 'opacity-70'}`}
                >
                  <Image src={t.thumb} alt="" fill sizes="56px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-full border border-line text-xl"
        >
          ×
        </button>
        <p className="pr-12 text-xs tracking-[0.2em] text-muted uppercase">
          {categoryName(p.category)}
        </p>
        <h2 id="judul-produk" className="mt-2 pr-12 font-serif text-4xl leading-tight">
          {p.name}
        </h2>
        <p className="mt-3 font-medium">{priceLabel(p)}</p>
        <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
        <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
          {specs.map(
            ([k, v]) =>
              v && (
                <div key={k} className="grid grid-cols-3 gap-3 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ),
          )}
        </dl>
        {p.customizable && (
          <p className="mt-4 text-sm text-muted">
            Ukuran dan finishing bisa didiskusikan sesuai kebutuhan.
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={buildWhatsAppLink(productMessage(p.name, p.slug))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-6 text-sm font-medium text-white hover:bg-accent"
          >
            <WhatsAppIcon className="size-5" />
            Pesan via WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="min-h-11 border border-foreground/25 px-6 text-sm hover:border-foreground"
          >
            {copied ? 'Link tersalin ✓' : 'Salin Link Produk'}
          </button>
        </div>
      </div>
    </div>
  );
}
