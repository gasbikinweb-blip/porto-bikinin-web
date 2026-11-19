'use client';

// Modal detail produk (dialog native). Dibuka lewat hash #produk-[slug] (whitelist), jadi bisa
// dibagikan dan tombol Back menutupnya. Di HP tampil sebagai bottom sheet.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryName, occasionName } from '@/data/catalog-meta';
import { getProduct, products } from '@/data/products';
import type { Product } from '@/data/types';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { buildShopeeProductLink, buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ChevronIcon, CloseIcon, LinkIcon, ShopIcon, WhatsAppIcon } from './icons';

const PREFIX = '#produk-';
export const ADD_EVENT = 'haraanja:tambah-pesanan';
export type AddDetail = { slug: string; variant?: string };

function fromHash(): Product | null {
  const h = window.location.hash;
  return h.startsWith(PREFIX) ? (getProduct(h.slice(PREFIX.length)) ?? null) : null;
}

const packagingSuggestions = products.filter((p) => p.isPackaging && p.featured).slice(0, 3);

export function ProductModal() {
  const dlg = useRef<HTMLDialogElement>(null);
  const trigger = useRef<Element | null>(null);
  const [p, setP] = useState<Product | null>(null);
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState<string | undefined>();
  const [copied, setCopied] = useState(false);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => {
      const next = fromHash();
      if (next) trigger.current = document.activeElement;
      setP(next);
      setImg(0);
      setVariant(undefined);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
    document.body.style.overflow = p ? 'hidden' : '';
    if (!p && trigger.current instanceof HTMLElement) trigger.current.focus();
  }, [p]);

  const close = useCallback(() => {
    if (fromHash()) history.back();
    setP(null);
  }, []);

  if (!p) return <dialog ref={dlg} aria-modal="true" className="hidden" />;

  const variantImg = p.variants?.find((v) => v.label === variant)?.image;
  const gallery = variantImg ? [variantImg, ...p.images] : p.images;
  const n = gallery.length;
  const current = gallery[Math.min(img, n - 1)]!;
  const go = (s: number) => setImg((v) => (v + s + n) % n);
  const url = new URL(`/#produk-${p.slug}`, siteConfig.url).href;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement('textarea');
      t.value = url;
      document.body.append(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToOrder = () => {
    window.dispatchEvent(
      new CustomEvent<AddDetail>(ADD_EVENT, { detail: { slug: p.slug, variant } }),
    );
    history.replaceState(null, '', '#pesan');
    setP(null);
    requestAnimationFrame(() =>
      document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' }),
    );
  };

  const btn =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition';

  return (
    <dialog
      ref={dlg}
      aria-modal="true"
      aria-labelledby="judul-produk"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="product-modal m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-3xl bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:m-auto sm:w-[min(94vw,1000px)] sm:rounded-3xl"
    >
      <div className="max-h-[92dvh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex justify-end bg-background/90 px-3 pt-3 backdrop-blur sm:absolute sm:right-0 sm:bg-transparent">
          <button
            type="button"
            onClick={close}
            aria-label="Tutup detail produk"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface shadow-sm hover:border-accent"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="grid gap-6 p-4 pt-1 sm:p-8 md:grid-cols-2">
          {/* Galeri */}
          <div>
            <div
              className="relative aspect-square overflow-hidden rounded-2xl bg-surface-2"
              onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                const s = touch.current;
                const end = e.changedTouches[0]?.clientX;
                if (s !== null && end !== undefined && Math.abs(end - s) > 40) go(end < s ? 1 : -1);
                touch.current = null;
              }}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="animate-in object-contain"
              />
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Foto sebelumnya"
                    className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#2b2426] shadow"
                  >
                    <ChevronIcon dir="left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Foto berikutnya"
                    className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#2b2426] shadow"
                  >
                    <ChevronIcon />
                  </button>
                  <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                    {Math.min(img, n - 1) + 1} / {n}
                  </span>
                </>
              )}
            </div>
            {n > 1 && (
              <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((g, i) => (
                  <li key={g.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setImg(i)}
                      aria-label={`Lihat foto ${i + 1}`}
                      aria-current={i === Math.min(img, n - 1)}
                      className="relative block size-16 overflow-hidden rounded-lg opacity-60 ring-accent aria-[current=true]:opacity-100 aria-[current=true]:ring-2"
                    >
                      <Image src={g.thumb} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              {categoryName(p.category)}
            </p>
            <h2 id="judul-produk" className="mt-2 font-serif text-3xl leading-tight font-semibold">
              {p.name}
            </h2>
            <p className="mt-2 text-xl font-semibold text-accent">
              {formatPrice(p.price, p.priceNote)}
              {p.price !== undefined && (
                <span className="text-sm font-normal text-muted"> /pcs</span>
              )}
            </p>
            {p.customizable && (
              <p className="mt-2 inline-flex rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-accent">
                ✓ Bisa custom nama / motif
              </p>
            )}

            {p.variants && p.variants.length > 0 && (
              <fieldset className="mt-5">
                <legend className="text-sm font-semibold">Pilihan</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <button
                      key={v.label}
                      type="button"
                      aria-pressed={variant === v.label}
                      onClick={() => {
                        setVariant(variant === v.label ? undefined : v.label);
                        setImg(0);
                      }}
                      className="min-h-10 rounded-full border border-line px-3.5 text-sm hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
              {[
                ['Ukuran', p.size],
                ['Bahan', p.material],
                ['Sudah termasuk', p.includedPackaging],
                ['Minimal order', p.minOrder ? `${p.minOrder} pcs` : undefined],
                ['Cocok untuk', p.occasions.map(occasionName).join(', ')],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-3 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="col-span-2">{v}</dd>
                  </div>
                ))}
            </dl>
            <p className="mt-3 text-xs text-muted">
              Harga grosir, biaya sablon, dan ongkir dikonfirmasi admin.
            </p>

            {!p.isPackaging && (
              <div className="mt-5">
                <p className="text-sm font-semibold">Kemasan yang cocok</p>
                <ul className="mt-2 flex gap-2 overflow-x-auto">
                  {packagingSuggestions.map((k) => (
                    <li key={k.slug} className="shrink-0">
                      <a
                        href={`#produk-${k.slug}`}
                        className="flex w-28 flex-col gap-1 text-xs hover:text-accent"
                      >
                        <span className="relative block aspect-square overflow-hidden rounded-lg bg-surface-2">
                          <Image
                            src={k.images[0]!.thumb}
                            alt=""
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </span>
                        {k.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid gap-2.5">
              <button
                type="button"
                onClick={addToOrder}
                className={`${btn} bg-accent text-background hover:bg-accent-strong`}
              >
                Tambahkan ke Pesanan
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppLink(productMessage(p.name, variant, url))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} bg-[#1f7a46] text-white hover:brightness-110`}
                >
                  <WhatsAppIcon className="size-4" /> Pesan via WA
                  <span className="sr-only"> (tab baru)</span>
                </a>
                <a
                  href={buildShopeeProductLink(p.shopeeItemId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} border border-line hover:border-accent`}
                >
                  <ShopIcon className="size-4" /> Lihat di Shopee
                  <span className="sr-only"> (tab baru)</span>
                </a>
              </div>
              <button
                type="button"
                onClick={copy}
                className={`${btn} min-h-11 text-muted hover:text-foreground`}
              >
                <LinkIcon className="size-4" /> {copied ? 'Link disalin ✓' : 'Salin Link'}
              </button>
              <p className="sr-only" aria-live="polite">
                {copied ? 'Link produk disalin' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
