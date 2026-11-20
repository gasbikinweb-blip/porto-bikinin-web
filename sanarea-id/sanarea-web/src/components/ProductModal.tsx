'use client';

// Modal detail produk berbasis <dialog> native: showModal() memberi focus trap, Esc menutup, klik latar menutup.
// Galeri foto + strip thumbnail (swipe di HP, panah kiri/kanan di keyboard). Swatch berlabel teks + aria-pressed.
// Tombol "Masukkan keranjang" menyimpan pilihan di browser; "Pesan via WhatsApp" langsung ke WA.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { collections } from '@/data/collections';
import { salePriceOf } from '@/data/promos';
import type { Product } from '@/data/types';
import { cart, openCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink, orderMessage, productUrl } from '@/lib/whatsapp';
import { BagIcon, WhatsAppIcon } from './icons';

type Props = {
  product: Product;
  colorSlug?: string;
  onColor: (slug: string | undefined) => void;
  onClose: () => void;
};

export function ProductModal({ product: p, colorSlug, onColor, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const touchX = useRef<number | null>(null);

  const color = p.colors.find((c) => c.slug === colorSlug);
  const gallery = [...(color?.images ?? []), ...p.images];
  const image = gallery[Math.min(index, gallery.length - 1)];
  const sale = salePriceOf(p.slug);
  const line = collections.find((c) => c.slug === p.collection)?.name;
  const needsColor = p.colors.length > 0 && !color;

  useEffect(() => {
    const dialog = ref.current;
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

  const go = (step: number) => setIndex((i) => (i + step + gallery.length) % gallery.length);
  const pickColor = (slug: string) => {
    onColor(slug === colorSlug ? undefined : slug);
    setIndex(0);
    setAdded(false);
  };
  const setQtySafe = (n: number) => setQty(Math.min(50, Math.max(1, Math.round(n) || 1)));

  async function copyLink() {
    const url = productUrl(p.slug, colorSlug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback bila Clipboard API diblokir
      window.prompt('Salin link produk:', url);
    }
  }

  function addToCart() {
    if (needsColor) return;
    cart.add(p.slug, colorSlug, qty);
    setAdded(true);
  }

  const details = [
    ['Bahan', p.material],
    ['Ukuran', p.size],
    ['Perawatan', p.care],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <dialog
      ref={ref}
      aria-labelledby="produk-judul"
      aria-modal="true"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.target instanceof HTMLInputElement) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="sheet m-0 mt-auto max-h-[94dvh] w-full max-w-none rounded-t-[1.75rem] bg-background p-0 text-ink md:m-auto md:max-h-[90dvh] md:w-[min(62rem,calc(100%-3rem))] md:rounded-[1.75rem]"
    >
      <div className="grid max-h-[94dvh] gap-6 overflow-y-auto p-4 sm:p-6 md:max-h-[90dvh] md:grid-cols-[1fr_1fr] md:gap-10">
        {/* Galeri */}
        <div className="md:sticky md:top-0 md:self-start">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-surface"
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {image && (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 460px, 100vw"
                className="animate-fade object-cover"
              />
            )}
            {gallery.length > 1 && (
              <p
                className="absolute right-3 bottom-3 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] tracking-widest tabular-nums"
                aria-live="polite"
              >
                {index + 1} / {gallery.length}
              </p>
            )}
          </div>
          {gallery.length > 1 && (
            <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {gallery.map((g, i) => (
                <li key={`${g.src}-${i}`} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className="relative block h-20 w-16 overflow-hidden rounded-xl border-2 border-transparent opacity-60 transition hover:opacity-100 aria-[current=true]:border-ink aria-[current=true]:opacity-100"
                  >
                    <Image src={g.thumb} alt="" fill sizes="64px" className="object-cover" />
                    <span className="sr-only">Foto {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="relative flex flex-col pb-2 md:pt-2 md:pr-2">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute top-0 right-0 grid size-11 place-items-center rounded-full border border-line bg-background hover:border-ink"
          >
            <span className="sr-only">Tutup detail produk</span>
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <p className="eyebrow pr-14 text-[0.6rem]">{line}</p>
          <h2
            id="produk-judul"
            className="mt-3 pr-12 font-serif text-3xl leading-[1.1] font-light sm:text-4xl"
          >
            {p.name}
          </h2>
          <p className="mt-4 text-xl">
            {sale !== undefined ? (
              <>
                <span className="mr-2 text-base text-muted line-through">
                  {formatPrice(p.price)}
                </span>
                <span className="text-rose-ink">{formatPrice(sale)}</span>
              </>
            ) : (
              formatPrice(p.price)
            )}
          </p>
          {p.price === undefined && (
            <p className="mt-1 text-xs text-muted">Harga dikonfirmasi admin via WhatsApp.</p>
          )}

          {p.colors.length > 0 && (
            <fieldset className="mt-6">
              <legend className="text-xs font-normal">
                Warna{color ? `: ${color.name}` : ''}{' '}
                <span className="text-muted">· {p.colors.length} pilihan</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.colors.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    aria-pressed={c.slug === colorSlug}
                    onClick={() => pickColor(c.slug)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-xs hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-background"
                  >
                    <span
                      aria-hidden="true"
                      className="size-3.5 rounded-full border border-black/10"
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-6">
            <label htmlFor="jumlah" className="text-xs">
              Jumlah (pcs)
            </label>
            <div className="mt-2 flex w-fit items-center rounded-full border border-line">
              <button
                type="button"
                onClick={() => setQtySafe(qty - 1)}
                className="grid size-10 place-items-center"
                aria-label="Kurangi jumlah"
              >
                −
              </button>
              <input
                id="jumlah"
                type="number"
                inputMode="numeric"
                min={1}
                max={50}
                step={1}
                value={qty}
                onChange={(e) => setQtySafe(Number(e.target.value))}
                className="h-10 w-12 border-x border-line bg-transparent text-center text-sm tabular-nums [appearance:textfield]"
              />
              <button
                type="button"
                onClick={() => setQtySafe(qty + 1)}
                className="grid size-10 place-items-center"
                aria-label="Tambah jumlah"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-2.5">
            <a
              href={buildWhatsAppLink(orderMessage(p, qty, color))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line rounded-full"
            >
              <WhatsAppIcon className="size-4" />
              Pesan via WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
            <button
              type="button"
              onClick={addToCart}
              disabled={needsColor}
              className="btn btn-solid rounded-full disabled:opacity-50"
            >
              <BagIcon className="size-4" />
              {added ? 'Tambah lagi ke keranjang' : 'Masukkan keranjang'}
            </button>
            <p className="text-xs text-muted" aria-live="polite">
              {needsColor ? (
                'Pilih warna dulu ya, Kak.'
              ) : added ? (
                <>
                  Masuk keranjang.{' '}
                  <button
                    type="button"
                    onClick={openCart}
                    className="text-ink underline underline-offset-4"
                  >
                    Lihat keranjang
                  </button>
                </>
              ) : (
                'Kumpulkan beberapa produk di keranjang, lalu kirim sekaligus ke WhatsApp.'
              )}
            </p>
          </div>

          {details.length > 0 && (
            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                  <dt>{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.notes && (
            <div className="mt-6 rounded-2xl bg-surface p-4">
              <p className="font-serif text-lg italic">Keterangan</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.notes}</p>
            </div>
          )}

          <button
            type="button"
            onClick={copyLink}
            className="mt-5 w-fit text-xs text-muted underline underline-offset-4 hover:text-ink"
          >
            {copied ? 'Link tersalin' : 'Salin link produk'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
