'use client';

// Grid produk bergaya editorial: foto lapang, nama + harga, tombol "+" membuka modal Lihat Cepat
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { PlusIcon } from './icons';
import { QuickViewModal } from './QuickViewModal';

export function PieceGrid({ products }: { products: readonly Product[] }) {
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <>
      <ul data-stagger className="grid grid-cols-2 gap-3 sm:gap-5">
        {products.map((p) => (
          <li key={p.slug} className="reveal">
            <article className="group relative bg-surface">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between gap-3 p-3 sm:p-5">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium sm:text-base">
                    <Link href={`/produk/${p.slug}`} className="after:absolute after:inset-0">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{formatPrice(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuick(p)}
                  aria-label={`Lihat cepat ${p.name}`}
                  className="relative z-10 grid size-9 shrink-0 place-items-center border border-line transition duration-300 hover:rotate-90 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
