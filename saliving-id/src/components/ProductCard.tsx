import Image from 'next/image';
import Link from 'next/link';
import { getCategory, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { ArrowIcon } from './icons';

type Props = {
  product: Product;
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: Props) {
  const cover = product.images[0];
  return (
    <article className="group relative">
      {/* Rasio 4:5 tetap supaya layout tidak loncat */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
          {getCategory(product.category).name}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-xl leading-snug">
          {/* Link menutupi seluruh kartu */}
          <Link href={`/produk/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.summary}</p>
        <p className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-accent">
            {formatPrice(product.priceFrom, product.priceUnit)}
          </span>
          <ArrowIcon className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
        </p>
      </div>
    </article>
  );
}
