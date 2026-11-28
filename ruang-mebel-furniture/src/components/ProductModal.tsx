'use client';

// Detail produk dalam modal (bukan halaman terpisah). Dibuka lewat link #produk-[slug],
// jadi bisa dibagikan (mis. /produk#produk-o-chair) dan tombol Back menutupnya.
import { useEffect, useRef, useState } from 'react';
import { getAllProducts, getCategory, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { ProductGallery } from './ProductGallery';
import { stories } from '@/data/stories';
import { InquiryComposer } from './InquiryComposer';

const PREFIX = '#produk-';
const bySlug = new Map(getAllProducts().map((p) => [p.slug, p]));

function productFromHash(): Product | null {
  const h = window.location.hash;
  return h.startsWith(PREFIX) ? (bySlug.get(h.slice(PREFIX.length)) ?? null) : null;
}

export function ProductModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const sync = () => setProduct(productFromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (product && !d.open) d.showModal();
    if (!product && d.open) d.close();
    document.body.style.overflow = product ? 'hidden' : '';
  }, [product]);

  const close = () => {
    // Hapus hash tanpa melompat ke atas halaman
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setProduct(null);
  };

  const specs = product
    ? [
        { label: 'Bahan', value: product.specs.material },
        { label: 'Ukuran', value: product.specs.dimensions },
        { label: 'Warna', value: product.specs.colors.join(', ') },
      ]
    : [];

  return (
    <dialog
      ref={ref}
      aria-labelledby="judul-produk"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[92vh] w-[min(94vw,1040px)] overflow-hidden rounded-3xl bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {product && (
        <div key={product.slug} className="max-h-[92vh] overflow-y-auto">
          <button
            type="button"
            onClick={close}
            aria-label="Tutup detail produk"
            className="sticky top-3 z-10 float-right mr-3 grid size-11 place-items-center rounded-full bg-background/90 text-xl shadow backdrop-blur hover:text-accent-strong"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 gap-8 p-4 sm:p-8 md:grid-cols-2 md:gap-10">
            <div className="min-w-0 space-y-4">
              <ProductGallery images={product.images} />
              {stories
                .filter((s) => s.product === product.slug && s.video)
                .map((s) => (
                  <figure key={s.slug}>
                    <video
                      src={`/stories/${s.slug}.mp4`}
                      poster={`/stories/${s.slug}.webp`}
                      controls
                      playsInline
                      preload="none"
                      aria-label={s.alt}
                      className="mx-auto aspect-[9/16] max-h-[70vh] w-full max-w-xs rounded-2xl bg-black object-cover"
                    />
                    <figcaption className="mt-2 text-center text-xs text-muted">Video produk</figcaption>
                  </figure>
                ))}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
                {getCategory(product.category).name}
              </p>
              <h2 id="judul-produk" className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-lg text-accent-strong">{formatPrice(product.price)}</p>
              <p className="mt-5 leading-relaxed text-foreground/85">{product.description}</p>

              <dl className="mt-6 divide-y divide-line border-y border-line">
                {specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-1 gap-0.5 py-3 text-sm min-[400px]:grid-cols-[6rem_1fr] min-[400px]:gap-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="min-w-0 break-words sm:col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <InquiryComposer key={product.slug} product={product} />
              <p className="mt-4 text-xs text-muted">
                Ukuran, model, dan warna finishing bisa disesuaikan. Harga & ongkos kirim final
                dikonfirmasi lewat WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
