'use client';

// Modal "Lihat Cepat" produk: galeri geser + spesifikasi + tombol WhatsApp.
// Memakai <dialog> bawaan browser (fokus terkunci, tombol Esc, latar inert).
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getCategory, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, CloseIcon, WhatsAppIcon } from './icons';

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      setIndex(0);
      setClosing(false);
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
  }, [product]);

  const close = () => {
    setClosing(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(
      () => {
        ref.current?.close();
      },
      reduce ? 0 : 280,
    );
  };

  const images = product?.images ?? [];
  const go = (step: 1 | -1) => {
    if (images.length < 2) return;
    setDir(step);
    setIndex((i) => (i + step + images.length) % images.length);
  };

  const current = images[index] ?? images[0];

  return (
    <dialog
      ref={ref}
      aria-labelledby="quickview-title"
      data-closing={closing || undefined}
      onClose={() => {
        document.documentElement.style.overflow = '';
        onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        // Klik di latar (di luar panel) menutup modal
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="quickview m-auto max-h-[92svh] w-[min(64rem,calc(100%-2rem))] overflow-visible bg-transparent p-0 text-foreground"
    >
      {product && current && (
        <div className="quickview-panel relative grid max-h-[92svh] overflow-y-auto border border-line bg-background shadow-2xl md:grid-cols-2 md:overflow-hidden">
          <button
            type="button"
            onClick={close}
            aria-label="Tutup detail produk"
            className="absolute top-3 right-3 z-20 grid size-10 place-items-center rounded-full bg-background/85 text-foreground shadow backdrop-blur transition duration-300 hover:rotate-90 hover:bg-accent hover:text-white"
          >
            <CloseIcon className="size-5" />
          </button>

          {/* Galeri */}
          <div className="relative bg-surface-2 p-3 sm:p-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 768px) 32rem, 100vw"
                className="quickview-slide object-cover"
                style={{ '--dir': dir } as React.CSSProperties}
              />
              {product.isCustomizable && (
                <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase shadow">
                  Bisa Custom
                </span>
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto sebelumnya"
                    className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/85 shadow backdrop-blur transition hover:scale-110 hover:bg-accent hover:text-white"
                  >
                    <ArrowIcon className="size-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto berikutnya"
                    className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/85 shadow backdrop-blur transition hover:scale-110 hover:bg-accent hover:text-white"
                  >
                    <ArrowIcon className="size-4" />
                  </button>
                  <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white tabular-nums">
                    {index + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
            {images.length > 1 && (
              <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Pilih foto">
                {images.map((img, i) => (
                  <li key={img.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      aria-label={`Tampilkan foto ${i + 1}`}
                      aria-current={i === index}
                      className="relative block size-14 overflow-hidden rounded-lg opacity-55 ring-accent transition duration-300 hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2 sm:size-16"
                    >
                      <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col p-6 sm:p-8 md:max-h-[92svh] md:overflow-y-auto">
            <p
              className="animate-rise text-[11px] font-semibold tracking-[0.25em] text-teak uppercase"
              style={{ '--delay': '80ms' } as React.CSSProperties}
            >
              {getCategory(product.category).name}
            </p>
            <h2
              id="quickview-title"
              className="animate-rise mt-2 font-serif text-3xl leading-tight sm:text-4xl"
              style={{ '--delay': '140ms' } as React.CSSProperties}
            >
              {product.name}
            </h2>
            <p
              className="animate-rise mt-3 text-xl text-foreground"
              style={{ '--delay': '200ms' } as React.CSSProperties}
            >
              {formatPrice(product.price)}
            </p>
            <p
              className="animate-rise mt-4 text-sm leading-relaxed text-muted"
              style={{ '--delay': '260ms' } as React.CSSProperties}
            >
              {product.description}
            </p>


            <div
              className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row md:mt-auto md:pt-8"
              style={{ '--delay': '440ms' } as React.CSSProperties}
            >
              <a
                href={buildWhatsAppLink(
                  productMessage({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                  }),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-6 py-4 text-[11px] font-semibold tracking-[0.2em] text-background uppercase transition hover:bg-accent"
              >
                <WhatsAppIcon className="size-4" />
                Tanya via WhatsApp
              </a>
              <Link
                href={`/produk/${product.slug}`}
                className="group inline-flex flex-1 items-center justify-center gap-2 border border-foreground/25 px-6 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition hover:border-foreground"
              >
                Detail lengkap
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
