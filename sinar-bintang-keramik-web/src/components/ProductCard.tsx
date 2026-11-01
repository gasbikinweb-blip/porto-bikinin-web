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

export function ProductCard({ product: p }: { product: Product }) {
  const price = priceText(p);
  const specs = [p.brand, p.grade, p.finish].filter(Boolean);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative aspect-square bg-surface">
        <Image
          src={p.image.thumb}
          alt={p.image.alt}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
        {p.size && (
          <span className="absolute top-2 left-2 rounded-md bg-ink px-2 py-1 text-xs font-bold text-white">
            {p.size}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm leading-snug font-semibold">{p.name}</h3>
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
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-red px-2 text-sm font-bold text-white hover:bg-red-strong"
          >
            <WhatsAppIcon className="size-4" />
            Tanya via WA<span className="sr-only">: {p.name} (tab baru)</span>
          </a>
          <a
            href={buildShopeeProductLink(p.shopeeItemId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-line px-2 text-sm font-semibold hover:border-red hover:text-red"
          >
            <BagIcon className="size-4" />
            Lihat di Shopee<span className="sr-only">: {p.name} (tab baru)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
