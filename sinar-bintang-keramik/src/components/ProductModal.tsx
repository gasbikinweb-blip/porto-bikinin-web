'use client';

// Popup detail produk berbasis <dialog> bawaan browser:
// showModal() mengunci fokus di dalam dialog, Esc dan klik latar menutup, fokus kembali ke kartu pemicu.
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { categories } from '@/data/categories';
import type { Product } from '@/data/products';
import { buildShopeeProductLink, buildWhatsAppLink } from '@/lib/whatsapp';
import { BagIcon, WhatsAppIcon } from './icons';
import { priceText, productMessage } from './ProductCard';

type Props = { product: Product; onClose: () => void };

export function ProductModal({ product: p, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const price = priceText(p);
  const category = categories.find((c) => c.slug === p.category)?.name;

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

  // Hanya baris yang datanya ada; tidak mengarang spesifikasi
  const rows: [string, string | undefined][] = [
    ['Ukuran', p.size && `${p.size} cm`],
    ['Merek', p.brand],
    ['Kualitas', p.grade],
    ['Permukaan', p.finish],
    ['Isi per dus', p.pcsPerBox ? `${p.pcsPerBox} pcs` : undefined],
    ['Luas per dus', p.m2PerBox ? `${p.m2PerBox} m²` : undefined],
  ];
  const specs = rows.filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="produk-judul"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto mb-0 max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-3xl bg-background p-0 text-foreground backdrop:bg-black/65 backdrop:backdrop-blur-sm sm:mb-auto sm:w-[min(56rem,calc(100%-3rem))] sm:rounded-3xl"
    >
      <div className="grid max-h-[92dvh] overflow-y-auto md:grid-cols-2">
        <div className="relative aspect-square bg-surface md:aspect-auto md:min-h-full">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            sizes="(min-width: 768px) 450px, 100vw"
            className="object-cover"
          />
          {p.size && (
            <span className="absolute top-4 left-4 rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">
              {p.size}
            </span>
          )}
        </div>

        <div className="relative flex flex-col p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full border border-line bg-card transition-colors hover:border-red hover:text-red"
          >
            <span className="sr-only">Tutup detail</span>
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          {category && (
            <p className="pr-12 text-xs font-bold tracking-[0.18em] text-red uppercase">
              {category}
            </p>
          )}
          <h2
            id="produk-judul"
            className="font-display mt-2 pr-10 text-2xl leading-tight font-bold"
          >
            {p.name}
          </h2>

          <p className="mt-4">
            {price ? (
              <>
                <span className="text-3xl font-extrabold text-red">{price}</span>
                <span className="text-muted"> / {p.priceUnit}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-red">Tanya harga via WhatsApp</span>
            )}
          </p>

          {specs.length > 0 && (
            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-4 text-sm text-muted">
            Harga dan stok bisa berubah. Konfirmasi stok, harga terbaru, dan ongkir via WhatsApp.
          </p>

          <div className="mt-auto grid gap-3 pt-8">
            <a
              href={buildWhatsAppLink(productMessage(p))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red px-6 font-bold text-white transition-colors hover:bg-red-strong"
            >
              <WhatsAppIcon className="size-5" />
              Tanya via WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
            <a
              href={buildShopeeProductLink(p.shopeeItemId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-semibold transition-colors hover:border-red hover:text-red"
            >
              <BagIcon className="size-5" />
              {p.shopeeItemId ? 'Lihat di Shopee' : 'Buka toko Shopee'}
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
