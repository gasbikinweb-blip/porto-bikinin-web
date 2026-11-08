'use client';

// Section papan, bucket, dan tambahan + modal detail produk dengan deep link #produk-[slug]
import Image from 'next/image';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ProductPlaceholder, Sparkle } from './decor';
import { WhatsAppIcon } from './icons';
import { addons } from '@/data/addons';
import { boards, rentalNote } from '@/data/boards';
import { bouquetGroups, bouquets } from '@/data/bouquets';
import {
  getCatalogItem,
  ORDER_EVENT,
  type CatalogItem,
  type OrderEventDetail,
} from '@/data/catalog';
import type { BouquetGroup, ProductImage } from '@/data/types';
import { buildWhatsAppLink, formatRupiah, productMessage, productUrl } from '@/lib/whatsapp';

const PAGE = 8;
const HASH = '#produk-';

const priceText = (n?: number) => (n === undefined ? 'Tanya harga' : formatRupiah(n));

function itemPrice(item: CatalogItem) {
  if (item.kind === 'papan') return priceText(item.rentalPrice);
  const prices = item.variants.map((v) => v.price).filter((p): p is number => p !== undefined);
  if (!prices.length) return 'Tanya harga';
  return prices.length > 1
    ? `Mulai ${formatRupiah(Math.min(...prices))}`
    : formatRupiah(prices[0]!);
}

function Thumb({ item, img, sizes }: { item: CatalogItem; img?: ProductImage; sizes: string }) {
  if (!img) return <ProductPlaceholder kind={item.kind} />;
  // Potongan poster: tampil utuh (contain) di atas latar pink agar produk tidak terpotong
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      className={img.kind === 'crop-poster' ? 'object-contain' : 'object-cover'}
    />
  );
}

export function Catalog({ children }: { children?: ReactNode }) {
  const [group, setGroup] = useState<BouquetGroup | 'semua'>('semua');
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);

  const filtered = bouquets.filter((b) => group === 'semua' || b.group === group);

  // Deep link & tombol Back: hash #produk-slug menentukan modal yang terbuka (slug di-whitelist)
  useEffect(() => {
    const sync = () => {
      const { hash } = window.location;
      const item = hash.startsWith(HASH) ? getCatalogItem(hash.slice(HASH.length)) : undefined;
      if (!item) pushed.current = false;
      setSelected(item ?? null);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = (item: CatalogItem, el: HTMLElement) => {
    trigger.current = el;
    history.pushState(null, '', `${HASH}${item.slug}`);
    pushed.current = true;
    setSelected(item);
  };

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      history.back(); // popstate menutup modal
    } else {
      history.replaceState(null, '', window.location.pathname);
      setSelected(null);
    }
    trigger.current?.focus();
  }, []);

  const card = (item: CatalogItem, sub?: string) => (
    <li key={item.slug} className="reveal">
      <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-card">
        <div className="relative aspect-square overflow-hidden bg-[#f6d2d4]">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <Thumb item={item} img={item.images[0]} sizes="(min-width: 1024px) 270px, 50vw" />
          </div>
          {item.images[0]?.kind === 'foto' && (
            <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-2.5 py-0.5 text-[11px] tracking-wide">
              Foto asli
            </span>
          )}
        </div>
        <div className="flex items-end justify-between gap-2 p-3 sm:p-4">
          <div className="min-w-0">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase sm:text-sm">
              {/* Tombol menutupi seluruh kartu */}
              <button
                type="button"
                onClick={(e) => open(item, e.currentTarget)}
                className="text-left after:absolute after:inset-0 after:content-['']"
              >
                {item.name}
              </button>
            </h3>
            {sub && <p className="mt-0.5 truncate text-xs text-muted">{sub}</p>}
            <p className="mt-1 text-sm font-medium text-rose-strong">{itemPrice(item)}</p>
          </div>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-rose text-on-rose transition-transform group-hover:translate-x-0.5"
          >
            <svg
              viewBox="0 0 20 20"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </span>
        </div>
      </article>
    </li>
  );

  // Judul section rata kiri + tombol di kanan (gaya referensi)
  const head = (id: string, title: string, text: string, action?: ReactNode) => (
    <div className="reveal flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={id} className="flex items-center gap-2 font-serif text-3xl font-medium sm:text-4xl">
          {title} <Sparkle className="size-4 text-rose" />
        </h2>
        <p className="mt-1 text-sm text-muted">{text}</p>
      </div>
      {action}
    </div>
  );
  const pill =
    'inline-flex min-h-11 items-center rounded-full border border-rose px-5 text-xs font-medium tracking-[0.15em] text-rose uppercase hover:bg-blush-soft';

  return (
    <>
      <section aria-labelledby="judul-papan" id="papan" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {head(
            'judul-papan',
            'Sewa Papan Akrilik',
            'Untuk wisuda, sidang, ulang tahun, grand opening, dan acara spesial lainnya.',
            <a href="#pesan" className={pill}>
              Pesan Papan
            </a>,
          )}
          <ul data-stagger className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {boards.map((b) => card({ kind: 'papan', ...b }, b.size))}
          </ul>
          <p className="mt-5 text-sm text-muted">{rentalNote}</p>
        </div>
      </section>

      {children}

      <section aria-labelledby="judul-bucket" id="bucket" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {head(
            'judul-bucket',
            'Bucket Bunga',
            'Bunga non-fresh yang awet, cantik untuk hadiah dan kenang-kenangan.',
          )}
          <div role="group" aria-label="Filter bucket" className="mt-6 flex flex-wrap gap-2">
            {[{ id: 'semua' as const, name: 'Semua' }, ...bouquetGroups].map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => {
                  setGroup(g.id);
                  setLimit(PAGE);
                }}
                className="min-h-11 rounded-full border border-line px-4 text-sm tracking-wide aria-pressed:border-rose aria-pressed:bg-rose aria-pressed:text-on-rose"
              >
                {g.name}
              </button>
            ))}
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {filtered
              .slice(0, limit)
              .map((b) =>
                card(
                  { kind: 'bucket', ...b },
                  b.stems ?? b.variants.map((v) => v.label).join(' · '),
                ),
              )}
          </ul>
          {limit < filtered.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + PAGE)}
                className="min-h-11 rounded-full border border-rose px-8 font-medium text-rose hover:bg-blush-soft"
              >
                Tampilkan lebih banyak
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        aria-labelledby="judul-tambahan"
        id="tambahan"
        className="bg-sage-soft py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 id="judul-tambahan" className="reveal text-center font-serif text-3xl font-medium">
            Tambahan Biar Makin Manis
          </h2>
          <ul data-stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {addons.map((a) => (
              <li key={a.id} className="reveal rounded-2xl bg-ivory p-4 text-center">
                <p className="font-serif text-lg font-semibold">{a.name}</p>
                <p className="mt-1 text-sm font-medium text-rose-strong">{priceText(a.price)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProductModal item={selected} onClose={close} />
    </>
  );
}

function ProductModal({ item, onClose }: { item: CatalogItem | null; onClose: () => void }) {
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
      aria-labelledby="judul-produk"
      aria-modal="true"
      onCancel={(e) => {
        e.preventDefault(); // Esc lewat alur yang sama agar URL ikut bersih
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="sheet bg-ivory p-0 text-plum"
    >
      {item && <Detail key={item.slug} item={item} onClose={onClose} />}
    </dialog>
  );
}

function Detail({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [variant, setVariant] = useState(
    item.kind === 'bucket' ? item.variants[0]?.label : undefined,
  );
  const [copied, setCopied] = useState(false);
  const img = item.images[index];

  const copy = async () => {
    const url = productUrl(item.slug);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToOrder = () => {
    window.dispatchEvent(
      new CustomEvent<OrderEventDetail>(ORDER_EVENT, { detail: { slug: item.slug, variant } }),
    );
    onClose();
    setTimeout(() => document.getElementById('pesan')?.scrollIntoView(), 150);
  };

  const price =
    item.kind === 'bucket'
      ? priceText(item.variants.find((v) => v.label === variant)?.price)
      : priceText(item.rentalPrice);

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-[4/5] bg-[#f6d2d4] md:aspect-auto md:min-h-[32rem]">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 450px, 100vw"
            className={img.kind === 'crop-poster' ? 'object-contain' : 'object-cover'}
          />
        ) : (
          <ProductPlaceholder kind={item.kind} />
        )}
        {item.images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {item.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                className="size-3 rounded-full bg-ivory/70 aria-[current=true]:bg-rose"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.25em] text-rose uppercase">
            {item.kind === 'papan' ? 'Sewa papan akrilik' : 'Bucket bunga'}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail"
            className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-full border border-line text-xl"
          >
            ×
          </button>
        </div>
        <h2 id="judul-produk" className="mt-1 font-serif text-3xl font-semibold">
          {item.name}
        </h2>
        <p className="mt-2 text-xl font-medium text-rose-strong">{price}</p>

        {item.kind === 'bucket' && item.variants.length > 1 && (
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">Pilih ukuran</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.variants.map((v) => (
                <button
                  key={v.label}
                  type="button"
                  aria-pressed={variant === v.label}
                  onClick={() => setVariant(v.label)}
                  className="min-h-11 rounded-full border border-line px-4 text-sm aria-pressed:border-rose aria-pressed:bg-blush-soft aria-pressed:text-rose-strong"
                >
                  {v.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <p className="mt-4 leading-relaxed text-muted">{item.description}</p>
        <dl className="mt-4 space-y-1 text-sm">
          {item.kind === 'bucket' && item.stems && (
            <div>
              <dt className="inline font-medium">Isi: </dt>
              <dd className="inline">{item.stems}</dd>
            </div>
          )}
          {item.kind === 'bucket' && item.colors && (
            <div>
              <dt className="inline font-medium">Warna: </dt>
              <dd className="inline">{item.colors.join(', ')}</dd>
            </div>
          )}
          {item.kind === 'papan' && (
            <div>
              <dt className="inline font-medium">Catatan sewa: </dt>
              <dd className="inline">{item.rentalDuration ?? rentalNote}</dd>
            </div>
          )}
          <div>
            <dt className="inline font-medium">Bisa ditambah: </dt>
            <dd className="inline">{addons.map((a) => a.name.toLowerCase()).join(', ')}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-2 sm:mt-auto sm:pt-6">
          <button
            type="button"
            onClick={addToOrder}
            className="min-h-12 rounded-full bg-rose font-medium tracking-wide text-on-rose hover:bg-rose-strong"
          >
            Tambahkan ke Pesanan
          </button>
          <a
            href={buildWhatsAppLink(
              productMessage(variant ? `${item.name} (${variant})` : item.name, item.slug),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rose font-medium text-rose hover:bg-blush-soft"
          >
            <WhatsAppIcon className="size-5" /> Pesan via WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="min-h-11 text-sm text-muted underline"
          >
            {copied ? 'Link tersalin ✓' : 'Salin Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
