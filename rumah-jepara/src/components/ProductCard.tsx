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
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-4 bottom-4 inline-flex translate-y-3 items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Lihat detail <ArrowIcon className="size-3.5" />
        </span>
      </div>
      <div className="mt-4 text-center">
        <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
          {getCategory(product.category).name}
        </p>
        <h3 className="mt-1 font-serif text-2xl">
          {/* Link menutupi seluruh kartu */}
          <Link href={`/produk/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-accent">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
