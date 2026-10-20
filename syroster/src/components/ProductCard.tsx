import Image from 'next/image';
import type { Product } from '@/data/products';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';
import { IlustrasiBadge } from './SectionHeading';

// Kartu produk ala katalog: foto di bidang abu muda, label kecil, nama, lalu ajakan tanya harga (tanpa harga karangan)
type Props = { product: Product; category: string; onOpen: () => void };

export function ProductCard({ product, category, onOpen }: Props) {
  const link = buildWhatsAppLink(productMessage(product.name));
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
          src={product.image.thumb}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 270px, 50vw"
          className="pointer-events-none object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.image.kind === 'ilustrasi' && <IlustrasiBadge />}
        {(product.badge ?? product.size) && (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            {product.badge ?? product.size}
          </span>
        )}
        <a
          href={link}
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
      <p className="mt-2 text-sm text-muted">
        <span className="sr-only">Warna: </span>
        {product.colors.join(' · ')}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        Lihat detail <ArrowIcon />
        <span className="sr-only">{product.name}</span>
      </button>
    </article>
  );
}
