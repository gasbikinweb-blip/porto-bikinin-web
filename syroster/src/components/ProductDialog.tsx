'use client';

// Pop-up detail produk memakai <dialog> bawaan browser: focus trap, tombol Esc, dan
// pengembalian fokus ke pemicu sudah ditangani browser. Animasi buka/tutup lewat CSS (dialog.product-dialog).
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/data/products';
import type { ProductType } from '@/data/projects';
import { buildWhatsAppLink, productMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { IlustrasiBadge } from './SectionHeading';

type Props = {
  product: Product | null;
  labels: Record<ProductType, string>;
  onClose: () => void;
};

export function ProductDialog({ product: selected, labels, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  // Produk terakhir tetap ditampilkan selama animasi tutup berjalan
  const [shown, setShown] = useState(selected);
  if (selected && selected !== shown) setShown(selected);
  const product = selected ?? shown;
  const [active, setActive] = useState(0);
  // Reset foto aktif tiap kali produk berganti
  const [lastSlug, setLastSlug] = useState(product?.slug);
  if (product?.slug !== lastSlug) {
    setLastSlug(product?.slug);
    setActive(0);
  }

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const images = product ? [product.image, ...(product.extraImages ?? [])] : [];
  const image = images[active] ?? images[0];
  const specs = product
    ? [
        ['Bahan', product.material ?? 'Dikonfirmasi saat penawaran'],
        ['Ukuran', product.size ?? 'Tersedia 20 × 20 cm dan 15 × 30 cm (konfirmasi per motif)'],
        ['Warna', product.colors.join(', ')],
        ['Cocok untuk', product.suitableFor.join(', ')],
      ]
    : [];

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-judul"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="product-dialog"
    >
      {product && image && (
        <div className="grid max-h-[92dvh] overflow-y-auto md:grid-cols-[1fr_1.05fr]">
          {/* Galeri foto */}
          <div className="bg-surface p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Image
                key={image.id}
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 480px, 92vw"
                className="dialog-photo object-cover"
              />
              {image.kind === 'ilustrasi' && <IlustrasiBadge />}
            </div>
            {images.length > 1 && (
              <ul className="mt-3 flex gap-2.5" aria-label="Pilih foto">
                {images.map((img, i) => (
                  <li key={img.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={i === active ? 'true' : undefined}
                      aria-label={`Foto ${i + 1}: ${img.caption}`}
                      className="relative block size-16 overflow-hidden rounded-xl bg-white ring-2 ring-transparent transition sm:size-20 aria-[current=true]:ring-brand"
                    >
                      <Image src={img.thumb} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Info produk */}
          <div className="flex flex-col p-6 sm:p-9">
            <p className="dialog-in text-xs font-bold tracking-[0.2em] text-gold-ink uppercase">
              {labels[product.type]}
            </p>
            <h2
              id="dialog-judul"
              className="dialog-in mt-2 font-display text-3xl font-bold text-ink sm:text-4xl"
              style={{ '--d': '60ms' } as React.CSSProperties}
            >
              {product.name}
            </h2>
            <p
              className="dialog-in mt-3 text-lg font-semibold text-brand"
              style={{ '--d': '120ms' } as React.CSSProperties}
            >
              Hubungi kami untuk harga
            </p>
            <p
              className="dialog-in mt-4 leading-relaxed text-muted"
              style={{ '--d': '180ms' } as React.CSSProperties}
            >
              {product.summary}
            </p>

            <h3
              className="dialog-in mt-7 font-display text-lg font-bold text-ink"
              style={{ '--d': '240ms' } as React.CSSProperties}
            >
              Spesifikasi
            </h3>
            <dl
              className="dialog-in mt-3 border-t border-line text-sm"
              style={{ '--d': '300ms' } as React.CSSProperties}
            >
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div
              className="dialog-in mt-7 grid gap-3"
              style={{ '--d': '360ms' } as React.CSSProperties}
            >
              <a
                href={buildWhatsAppLink(productMessage(product.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa px-5 font-semibold text-white transition-colors hover:bg-wa-dark"
              >
                <WhatsAppIcon /> Tanya via WhatsApp <span className="sr-only">(tab baru)</span>
              </a>
            </div>
            <p
              className="dialog-in mt-4 text-xs leading-relaxed text-muted"
              style={{ '--d': '420ms' } as React.CSSProperties}
            >
              Harga, stok, dan ongkos kirim dikonfirmasi lewat WhatsApp. Pemesanan dan pembayaran
              dilakukan setelah konsultasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Tutup detail produk"
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-md transition-colors hover:bg-brand hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
              className="size-5"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
