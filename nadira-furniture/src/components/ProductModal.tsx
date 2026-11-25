'use client';

// Detail produk dalam modal (bukan halaman terpisah). Dibuka lewat link #produk-[slug],
// jadi bisa dibagikan (mis. /produk#produk-o-chair) dan tombol Back menutupnya.
import { useEffect, useRef, useState } from 'react';
import { getAllProducts, getCategory, type Product } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { productMessage } from '@/lib/whatsapp';
import { ProductGallery } from './ProductGallery';
import { WhatsAppButton } from './WhatsAppButton';

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
        { label: 'Dikerjakan', value: String(product.year) },
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
            aria-label="Tutup detail karya"
            className="sticky top-3 z-10 float-right mr-3 grid size-11 place-items-center rounded-full bg-background/90 text-xl shadow backdrop-blur hover:text-accent-strong"
          >
            ✕
          </button>
          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-10">
            <ProductGallery images={product.images} />
            <div>
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
                  <div key={s.label} className="grid grid-cols-3 gap-4 py-3 text-sm">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton
                  message={productMessage({ ...product, ...product.specs })}
                  className="sm:flex-1"
                />
                <WhatsAppButton
                  variant="outline"
                  message={`Halo ${siteConfig.name}, saya mau model seperti ${product.name} tapi dengan ukuran/warna berbeda. Bisa dibantu?`}
                  className="sm:flex-1"
                >
                  Custom Ukuran/Warna
                </WhatsAppButton>
              </div>
              <p className="mt-4 text-xs text-muted">
                Ukuran, warna, dan motif bisa disesuaikan. Survei & konsultasi gratis, harga final
                setelah ukur lokasi.
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
