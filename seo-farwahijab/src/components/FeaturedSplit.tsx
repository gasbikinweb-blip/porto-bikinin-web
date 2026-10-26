'use client';

// "Yang lagi banyak dicari": panel foto besar di kiri + grid 6 produk di kanan. Klik kartu → modal detail.
import Image from 'next/image';
import { useState } from 'react';
import type { Product, ProductImage } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductModal, type OpenProduct } from './ProductModal';

type Props = { products: readonly Product[]; feature: ProductImage };

export function FeaturedSplit({ products, feature }: Props) {
  const [modal, setModal] = useState<OpenProduct | null>(null);

  return (
    <section aria-labelledby="unggulan" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.45fr]">
        {/* Panel foto besar */}
        <div
          data-reveal
          className="relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-[2.25rem] bg-panel p-8 text-on-panel lg:min-h-full"
        >
          <Image
            src={feature.src}
            alt={feature.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-panel-strong/85 via-panel-strong/20 to-transparent" />
          <p className="eyebrow text-on-panel/80!">Koleksi favorit</p>
          <h2 id="unggulan" className="mt-3 font-serif text-section">
            Yang lagi <em>banyak dicari</em>
          </h2>
          <p className="mt-3 max-w-xs text-on-panel/85">
            Pilihan yang paling sering diburu Kakak-kakak. Nyaman dipakai, gampang dipadukan.
          </p>
          <a
            href="#koleksi"
            className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-on-panel px-6 font-bold text-panel transition-colors hover:bg-on-panel/85"
          >
            Lihat semua koleksi <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Grid produk */}
        <ul data-reveal-group className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <li key={p.slug} data-reveal>
              <ProductCard
                product={p}
                onOpen={(product, origin) => setModal({ product, origin })}
              />
            </li>
          ))}
        </ul>
      </div>
      {modal && <ProductModal open={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
