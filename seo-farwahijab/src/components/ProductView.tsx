'use client';

// Detail produk: galeri + lightbox, pilihan ukuran & warna (swatch berlabel), jumlah, lalu pesan WA / beli di Shopee.
// Pesan WA hanya dirangkai di browser: tanpa <form>, tanpa penyimpanan.
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { formatRupiah, type Product, type ProductImage } from '@/data/products';
import { addToCart, MAX_QTY, OPEN_CART_EVENT } from '@/lib/cart';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ShopeeIcon, WhatsAppIcon } from './icons';

function Lightbox({
  images,
  start,
  onClose,
}: {
  images: readonly ProductImage[];
  start: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const count = images.length;
  const image = images[index] ?? images[0];

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

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const btn =
    'grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30';

  return (
    <dialog
      ref={ref}
      aria-label="Galeri foto produk"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        else if (e.key === 'ArrowLeft') go(-1);
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-3">
          <p className="text-sm tabular-nums" aria-live="polite">
            {index + 1} / {count}
            <span className="sr-only">: {image?.alt}</span>
          </p>
          <button type="button" onClick={onClose} autoFocus className={btn}>
            <span className="sr-only">Tutup galeri</span>
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div
          className="relative min-h-0 flex-1"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {image && (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>
        {count > 1 && (
          <div className="flex justify-center gap-6 p-4">
            <button type="button" onClick={() => go(-1)} className={btn}>
              <span className="sr-only">Foto sebelumnya</span>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => go(1)} className={btn}>
              <span className="sr-only">Foto berikutnya</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

export function ProductView({
  product,
  categoryName,
  headingLevel: Heading = 'h1',
  headingId,
}: {
  product: Product;
  categoryName: string;
  /** 'h2' saat tampil di dalam modal (halaman tetap punya satu h1) */
  headingLevel?: 'h1' | 'h2';
  headingId?: string;
}) {
  const id = useId();
  const [colorName, setColorName] = useState<string | null>(null);
  const [sizeName, setSizeName] = useState<string | null>(product.sizes?.[0]?.name ?? null);
  const [qtyRaw, setQtyRaw] = useState('1');
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  // Whitelist: hanya warna & ukuran yang ada di data
  const color = product.colors.find((c) => c.name === colorName) ?? null;
  const size = product.sizes?.find((s) => s.name === sizeName) ?? null;
  const qty = /^\d{1,3}$/.test(qtyRaw) ? Number(qtyRaw) : 0;
  const qtyOk = qty >= 1 && qty <= MAX_QTY;

  // Foto warna terpilih tampil paling depan
  const images = color?.image ? [color.image, ...product.images] : product.images;
  const main = images[color?.image ? 0 : active] ?? images[0];

  const price = size?.price ?? product.priceRetail;
  const wholesale =
    product.priceWholesale && product.wholesaleMinQty && qty >= product.wholesaleMinQty;

  const message = [
    `Halo Farwa, saya mau pesan ${product.shortName}`,
    size ? ` size ${size.name}` : '',
    color ? ` warna ${color.name}` : '',
    ` sebanyak ${qtyOk ? qty : 1} pcs.`,
    wholesale
      ? ` Jumlahnya sudah memenuhi minimal grosir (${product.wholesaleMinQty} pcs), boleh info harga grosirnya, Kak?`
      : '',
    ' Apakah masih tersedia?',
  ].join('');

  const step = (delta: number) =>
    setQtyRaw(String(Math.min(MAX_QTY, Math.max(1, (Number(qtyRaw) || 0) + delta))));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      {/* Galeri */}
      <div className="min-w-0">
        {main && (
          <button
            type="button"
            onClick={() => setLightbox(images.indexOf(main))}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-surface"
          >
            <Image
              key={main.src}
              src={main.src}
              alt={main.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <span className="absolute right-3 bottom-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold">
              Perbesar foto
            </span>
          </button>
        )}
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {product.images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  setColorName(null);
                  setActive(i);
                }}
                aria-current={!color?.image && active === i}
                className="relative block aspect-[4/5] w-16 overflow-hidden rounded-xl opacity-70 ring-mocha transition-opacity hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:ring-2 sm:w-20"
              >
                <Image src={img.thumb} alt="" fill sizes="80px" className="object-cover" />
                <span className="sr-only">Lihat foto {i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Info & pemesanan */}
      <div className="min-w-0">
        <p className="eyebrow">{categoryName}</p>
        <Heading id={headingId} className="mt-3 font-serif text-section">
          {product.name}
        </Heading>
        <p className="mt-4 text-3xl font-bold">{formatRupiah(price)}</p>
        <p className="mt-1 text-sm text-muted">Harga eceran di Shopee</p>
        {product.priceWholesale && product.wholesaleMinQty && (
          <p className="mt-3 inline-flex rounded-full bg-sage-soft px-4 py-2 text-sm font-semibold">
            Grosir {formatRupiah(product.priceWholesale)}/pcs mulai {product.wholesaleMinQty} pcs
            (via WA)
          </p>
        )}

        {product.sizes && (
          <fieldset className="mt-7">
            <legend className="text-sm font-bold">Ukuran</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <label
                  key={s.name}
                  className="flex min-h-11 cursor-pointer items-center rounded-full border border-line px-5 text-sm font-semibold has-checked:border-mocha has-checked:bg-mocha has-checked:text-background has-focus-visible:outline-2 has-focus-visible:outline-mocha"
                >
                  <input
                    type="radio"
                    name={`${id}-ukuran`}
                    checked={sizeName === s.name}
                    onChange={() => setSizeName(s.name)}
                    className="sr-only"
                  />
                  {s.name} · {formatRupiah(s.price)}
                </label>
              ))}
            </div>
            {size && <p className="mt-2 text-sm text-muted">{size.detail}</p>}
          </fieldset>
        )}

        {product.colors.length > 0 && (
          <fieldset className="mt-7">
            <legend className="text-sm font-bold">
              Warna{color ? `: ${color.name}` : ''}{' '}
              <span className="font-normal text-muted">({product.colors.length} pilihan)</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <label
                  key={c.name}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line py-1 pr-4 pl-1.5 text-sm has-checked:border-mocha has-checked:ring-1 has-checked:ring-mocha has-focus-visible:outline-2 has-focus-visible:outline-mocha"
                >
                  <input
                    type="radio"
                    name={`${id}-warna`}
                    checked={colorName === c.name}
                    onChange={() => setColorName(c.name)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="size-7 rounded-full border border-mocha/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              Titik warna hanya perkiraan; warna asli bisa beda 5–10% karena cahaya foto.
            </p>
          </fieldset>
        )}

        <div className="mt-7">
          <label htmlFor={`${id}-qty`} className="text-sm font-bold">
            Jumlah (pcs)
          </label>
          <div className="mt-2 flex w-fit">
            <button
              type="button"
              onClick={() => step(-1)}
              className="grid size-12 place-items-center rounded-l-full border border-r-0 border-line text-xl hover:bg-surface"
            >
              <span aria-hidden="true">−</span>
              <span className="sr-only">Kurangi jumlah</span>
            </button>
            <input
              id={`${id}-qty`}
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_QTY}
              value={qtyRaw}
              aria-invalid={!qtyOk}
              aria-describedby={`${id}-qty-help`}
              onChange={(e) => setQtyRaw(e.target.value.replace(/\D/g, '').slice(0, 3))}
              className="h-12 w-20 border border-line bg-background text-center text-lg font-semibold aria-[invalid=true]:border-shopee"
            />
            <button
              type="button"
              onClick={() => step(1)}
              className="grid size-12 place-items-center rounded-r-full border border-l-0 border-line text-xl hover:bg-surface"
            >
              <span aria-hidden="true">+</span>
              <span className="sr-only">Tambah jumlah</span>
            </button>
          </div>
          <p
            id={`${id}-qty-help`}
            className={`mt-2 text-sm ${qtyOk ? 'text-muted' : 'font-semibold text-shopee-text'}`}
            aria-live="polite"
          >
            {!qtyOk
              ? `Isi angka 1–${MAX_QTY}`
              : wholesale
                ? `✓ Kakak memenuhi harga grosir (min. ${product.wholesaleMinQty} pcs). Pesan via WA ya.`
                : product.wholesaleMinQty
                  ? `Beli ${product.wholesaleMinQty} pcs atau lebih untuk harga grosir.`
                  : 'Mau beli banyak? Tanyakan harga grosir ke admin.'}
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href={product.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-shopee px-6 font-bold text-white transition-colors hover:bg-shopee-strong"
          >
            <ShopeeIcon />
            Beli di Shopee
            <span className="sr-only"> (tab baru)</span>
          </a>
          <a
            href={qtyOk ? buildWhatsAppLink(message) : undefined}
            aria-disabled={!qtyOk}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 px-6 font-bold whitespace-nowrap transition-colors ${qtyOk ? 'border-mocha hover:bg-mocha hover:text-background' : 'pointer-events-none border-line text-muted'}`}
          >
            <WhatsAppIcon />
            Order WhatsApp
            <span className="sr-only"> (pesan lewat WhatsApp, tab baru)</span>
          </a>
        </div>
        {/* Keranjang tanya-pesan: kumpulkan beberapa produk, kirim sekaligus via WA */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!qtyOk}
            onClick={() => {
              addToCart({ slug: product.slug, size: sizeName, color: colorName, qty });
              setAdded(true);
              window.setTimeout(() => setAdded(false), 2500);
            }}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-mocha px-6 font-bold text-background transition-colors hover:bg-mocha-strong disabled:opacity-40"
          >
            {added ? '✓ Masuk keranjang' : '+ Masukkan keranjang'}
          </button>
          {added && (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_CART_EVENT))}
              className="min-h-12 rounded-full px-3 text-sm font-semibold underline underline-offset-2"
            >
              Lihat keranjang
            </button>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {added ? `${product.shortName} masuk keranjang` : ''}
        </p>
        <p className="mt-3 text-xs text-muted">
          Checkout & pembayaran eceran di Shopee. Grosir dan promo khusus via WhatsApp.
        </p>

        <dl className="mt-9 divide-y divide-line border-y border-line text-sm">
          <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
            <dt className="font-bold">Bahan</dt>
            <dd className="text-muted">{product.material}</dd>
          </div>
          <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
            <dt className="font-bold">Ukuran</dt>
            <dd className="text-muted">{product.size}</dd>
          </div>
        </dl>
        <p className="mt-6 leading-relaxed">{product.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden="true" className="text-rose">
                ✦
              </span>
              {h}
            </li>
          ))}
        </ul>
        {product.howToUse && (
          <div className="mt-6 rounded-2xl bg-surface p-5">
            <h2 className="font-serif text-lg italic">Cara pakai</h2>
            <p className="mt-1 text-sm leading-relaxed">{product.howToUse}</p>
          </div>
        )}
        {product.note && <p className="mt-4 text-sm text-muted">{product.note}</p>}
      </div>

      {lightbox !== null && (
        <Lightbox images={images} start={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
