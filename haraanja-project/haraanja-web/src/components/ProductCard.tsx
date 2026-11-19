// Kartu produk; klik membuka modal detail lewat hash #produk-[slug]
import Image from 'next/image';
import { categoryName } from '@/data/catalog-meta';
import type { Product } from '@/data/types';
import { formatPrice } from '@/lib/format';

export function ProductCard({ p }: { p: Product }) {
  const cover = p.images[0]!;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <Image
          src={cover.thumb}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {p.customizable && (
          <span className="absolute top-2 left-2 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-background">
            Bisa Custom
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] tracking-widest text-muted uppercase">
          {categoryName(p.category)}
        </p>
        <h3 className="mt-1 font-serif text-lg leading-snug font-semibold">
          <a href={`#produk-${p.slug}`} className="after:absolute after:inset-0">
            {p.name}
          </a>
        </h3>
        <p className="mt-auto pt-2 text-sm font-semibold text-accent">
          {formatPrice(p.price, p.priceNote)}
          {p.price !== undefined && <span className="font-normal text-muted"> /pcs</span>}
        </p>
        <span className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-accent transition group-hover:bg-accent group-hover:text-background">
          Lihat Detail
        </span>
      </div>
    </article>
  );
}
