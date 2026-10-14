import Image from 'next/image';
import Link from 'next/link';
import { getCategory, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { ArrowIcon, EyeIcon, WhatsAppIcon } from './icons';

type Props = {
  product: Product;
  sizes?: string;
  /** Jika diisi (dari komponen client), muncul tombol "Lihat Cepat" yang membuka modal */
  onQuickView?: (product: Product) => void;
};

export function ProductCard({
  product,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  onQuickView,
}: Props) {
  const [cover, second] = product.images;
  return (
    <article className="product-card group relative">
      {/* Rasio 4:5 tetap supaya layout tidak loncat */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-110"
        />
        {/* Foto kedua muncul saat hover */}
        {second && (
          <Image
            src={second.src}
            alt=""
            fill
            sizes={sizes}
            className="scale-105 object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Kilau melintas */}
        
        {product.isCustomizable && (
          <span className="absolute top-3 left-3 bg-background/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-foreground uppercase">
            Bisa custom
          </span>
        )}

        {/* Bilah aksi ala toko furnitur: muncul dari bawah */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 bg-background px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-foreground uppercase transition hover:bg-foreground hover:text-background"
            >
              <EyeIcon className="size-4" /> Lihat Cepat
            </button>
          ) : (
            <span className="pointer-events-none inline-flex flex-1 items-center justify-center gap-1.5 bg-background px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-foreground uppercase">
              Lihat detail <ArrowIcon className="size-3.5" />
            </span>
          )}
          <a
            href={buildWhatsAppLink(
              productMessage({
                slug: product.slug,
                name: product.name,
                material: product.specs.material,
                dimensions: product.specs.dimensions,
                price: product.price,
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Tanya ${product.name} via WhatsApp`}
            className="grid size-10 shrink-0 place-items-center bg-accent text-white transition hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4" />
          </a>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
          {getCategory(product.category).name}
        </p>
        <h3 className="mt-1.5 text-base font-medium transition-colors duration-300 group-hover:text-teak">
          {/* Link menutupi seluruh kartu (tombol aksi berada di atasnya lewat z-10) */}
          <Link href={`/produk/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
