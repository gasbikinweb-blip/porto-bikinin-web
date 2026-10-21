import Image from 'next/image';
import type { Product } from '@/data/products';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, ShopeeIcon, WhatsAppIcon } from './icons';

// Kartu produk ala katalog: foto di bidang abu muda, label kecil, nama, lalu tautan detail & Shopee
type Props = { product: Product; category: string; onOpen: () => void };

export function ProductCard({ product, category, onOpen }: Props) {
  const cover = product.images[0]!;
  const label = product.badge ?? (product.sizes.length === 1 ? product.sizes[0] : null);
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Lihat detail ${product.name}`}
          className="absolute inset-0 z-0 cursor-zoom-in"
        />
        <Image
          src={cover.thumb}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 270px, 50vw"
          className="pointer-events-none object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {label && (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            {label}
          </span>
        )}
        <a
          href={buildWhatsAppLink(productMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Tanya harga ${product.name} via WhatsApp (tab baru)`}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white text-wa shadow-sm transition-colors hover:bg-wa hover:text-white"
        >
          <WhatsAppIcon className="size-[18px]" />
        </a>
      </div>
      <p className="mt-3 text-xs text-muted">{category}</p>
      <h3 className="mt-1 font-display text-base leading-snug font-bold text-ink sm:text-lg">
        <button type="button" onClick={onOpen} className="text-left hover:text-brand">
          {product.name}
        </button>
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{product.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          Lihat detail <ArrowIcon />
          <span className="sr-only">{product.name}</span>
        </button>
        <a
          href={product.shopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-shopee-ink hover:underline"
        >
          <ShopeeIcon className="size-4" /> Shopee
          <span className="sr-only">: {product.name} (tab baru)</span>
        </a>
      </div>
    </article>
  );
}
