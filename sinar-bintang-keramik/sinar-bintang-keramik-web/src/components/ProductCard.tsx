import Image from 'next/image';
import { formatRupiah, type Product } from '@/data/products';
import { buildShopeeProductLink, buildWhatsAppLink } from '@/lib/whatsapp';
import { BagIcon, WhatsAppIcon } from './icons';

/** Pesan WA per produk, tiap detail di baris sendiri */
export function productMessage(p: Product) {
  return [
    'Halo Sinar Bintang Keramik, saya mau tanya produk ini:',
    '',
    `*${p.name}*`,
    p.size && `Ukuran: ${p.size}`,
    p.brand && `Merek: ${p.brand}`,
    p.grade && `Kualitas: ${p.grade}`,
    '',
    'Apakah stoknya ada dan berapa harga terbarunya?',
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

export function priceText(p: Product) {
  if (p.price === undefined) return null;
  return `${p.priceFrom ? 'mulai ' : ''}${formatRupiah(p.price)}`;
}

export function ProductCard({ product: p, onOpen }: { product: Product; onOpen: () => void }) {
  const price = priceText(p);
  const specs = [p.brand, p.grade, p.finish].filter(Boolean);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)]">
      {/* Foto + nama membuka popup detail */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="relative block aspect-square overflow-hidden bg-surface text-left"
      >
        <Image
          src={p.image.thumb}
          alt={p.image.alt}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {p.size && (
          <span className="absolute top-2 left-2 rounded-full bg-ink/90 px-2.5 py-1 text-xs font-bold text-white">
            {p.size}
          </span>
        )}
        <span className="absolute right-2 bottom-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          Lihat detail
        </span>
        <span className="sr-only">Lihat detail {p.name}</span>
      </button>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm leading-snug font-semibold">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left hover:text-red"
          >
            {p.name}
          </button>
        </h3>
        {specs.length > 0 && <p className="mt-1 text-xs text-muted">{specs.join(' · ')}</p>}
        <p className="mt-2">
          {price ? (
            <>
              <span className="text-lg font-extrabold text-red">{price}</span>
              <span className="text-xs text-muted"> / {p.priceUnit}</span>
            </>
          ) : (
            <span className="font-bold text-red">Tanya harga</span>
          )}
        </p>
        {(p.pcsPerBox || p.m2PerBox) && (
          <p className="text-xs text-muted">
            {[p.pcsPerBox && `isi ${p.pcsPerBox} pcs`, p.m2PerBox && `${p.m2PerBox} m²`]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <div className="mt-auto grid gap-2 pt-3">
          <a
            href={buildWhatsAppLink(productMessage(p))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-red px-2 text-sm font-bold text-white transition-colors hover:bg-red-strong"
          >
            <WhatsAppIcon className="size-4" />
            Tanya via WA<span className="sr-only">: {p.name} (tab baru)</span>
          </a>
          <a
            href={buildShopeeProductLink(p.shopeeItemId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line px-2 text-sm font-semibold transition-colors hover:border-red hover:text-red"
          >
            <BagIcon className="size-4" />
            Lihat di Shopee<span className="sr-only">: {p.name} (tab baru)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
