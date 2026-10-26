'use client';

// Kartu produk; klik di mana saja membuka modal detail (website satu halaman)
import Image from 'next/image';
import { getCategory } from '@/data/categories';
import { formatRupiah, type Product } from '@/data/products';

const MAX_SWATCH = 6;

export function ProductCard({
  product,
  priority = false,
  onOpen,
}: {
  product: Product;
  priority?: boolean;
  /** Dipanggil dengan posisi kartu (untuk animasi modal yang tumbuh dari kartu) */
  onOpen: (product: Product, origin: DOMRect) => void;
}) {
  const cover = product.images[0];
  const extra = product.colors.length - MAX_SWATCH;
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface">
        {cover && (
          <Image
            src={cover.thumb}
            alt={cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {product.priceWholesale && (
          <span className="absolute top-3 left-3 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold tracking-wide text-mocha">
            Ada harga grosir
          </span>
        )}
      </div>
      <p className="mt-3 text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
        {getCategory(product.category)?.name}
      </p>
      <h3 className="mt-1 font-serif text-lg leading-snug">
        {/* Tombol menutupi seluruh kartu (pola "stretched link") */}
        <button
          type="button"
          onClick={(e) =>
            onOpen(
              product,
              (e.currentTarget.closest('article') ?? e.currentTarget).getBoundingClientRect(),
            )
          }
          className="text-left after:absolute after:inset-0 hover:underline"
        >
          {product.shortName}
        </button>
      </h3>
      <p className="mt-1 font-semibold">
        {product.sizes ? <span className="text-sm font-normal text-muted">mulai </span> : null}
        {formatRupiah(product.priceRetail)}
      </p>
      {product.colors.length > 0 ? (
        <p className="mt-2 flex items-center gap-1" aria-label={`${product.colors.length} warna`}>
          {product.colors.slice(0, MAX_SWATCH).map((c) => (
            <span
              key={c.name}
              title={c.name}
              aria-hidden="true"
              className="size-4 rounded-full border border-mocha/20"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {extra > 0 && <span className="ml-1 text-xs text-muted">+{extra} warna</span>}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">Warna lengkap, tanya admin</p>
      )}
    </article>
  );
}
