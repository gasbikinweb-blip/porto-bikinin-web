'use client';

// Tombol keranjang di header + laci keranjang. Bukan checkout: isinya dikirim sebagai satu pesan
// WhatsApp (satu paragraf per produk). Data hanya di localStorage browser pengunjung.
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { formatRupiah, getProduct } from '@/data/products';
import {
  cartMessage,
  clearCart,
  MAX_QTY,
  OPEN_CART_EVENT,
  removeFromCart,
  setCartQty,
  unitPrice,
  useCart,
} from '@/lib/cart';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export function CartDrawer() {
  const items = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  useEffect(() => {
    const onOpen = () => ref.current?.showModal();
    window.addEventListener(OPEN_CART_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CART_EVENT, onOpen);
  }, []);

  const rows = items.flatMap((item, index) => {
    const product = getProduct(item.slug);
    if (!product) return [];
    const { price, wholesale } = unitPrice(product, item);
    const thumb =
      product.colors.find((c) => c.name === item.color)?.image?.thumb ?? product.images[0]?.thumb;
    return [{ item, index, product, price, wholesale, thumb }];
  });

  const total = rows.reduce((sum, r) => sum + r.price * r.item.qty, 0);

  const stepBtn =
    'grid size-9 place-items-center rounded-full border border-line text-lg leading-none hover:bg-surface disabled:opacity-40';

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="relative grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-mocha transition-colors hover:bg-surface-2"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span className="sr-only">Keranjang, {count} pcs</span>
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-rose px-1 text-[0.65rem] leading-5 font-bold text-background"
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      <dialog
        ref={ref}
        aria-labelledby="keranjang-judul"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(26rem,100%)] max-w-none bg-background p-0 text-mocha shadow-2xl backdrop:bg-mocha-strong/50 backdrop:backdrop-blur-sm open:animate-[laci_0.3s_ease-out]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 id="keranjang-judul" className="font-serif text-2xl">
              Keranjang <span className="text-base text-muted">({count} pcs)</span>
            </h2>
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full text-2xl leading-none hover:bg-surface"
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Tutup keranjang</span>
            </button>
          </div>

          {rows.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="text-muted">
                Keranjang masih kosong. Pilih produk, lalu klik <b>Masukkan keranjang</b>.
              </p>
              <Link
                href="/#koleksi"
                onClick={close}
                className="inline-flex min-h-12 items-center rounded-full bg-mocha px-6 font-bold text-background hover:bg-mocha-strong"
              >
                Lihat koleksi
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                {rows.map(({ item, index, product, price, wholesale, thumb }) => (
                  <li key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-3 py-4">
                    {thumb && (
                      <Image
                        src={thumb}
                        alt=""
                        width={64}
                        height={80}
                        className="h-20 w-16 shrink-0 rounded-xl bg-surface object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-semibold">{product.name}</p>
                      <p className="mt-0.5 text-sm text-muted">
                        {[item.size && `Ukuran ${item.size}`, item.color ?? 'Warna belum dipilih']
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                      <p className="mt-1 text-sm">
                        {formatRupiah(price)}/pcs
                        {wholesale && (
                          <span className="ml-1.5 rounded-full bg-sage-soft px-2 py-0.5 text-xs font-bold">
                            grosir
                          </span>
                        )}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className={stepBtn}
                          disabled={item.qty <= 1}
                          onClick={() => setCartQty(index, item.qty - 1)}
                        >
                          <span aria-hidden="true">−</span>
                          <span className="sr-only">Kurangi {product.shortName}</span>
                        </button>
                        <span className="min-w-8 text-center font-bold" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className={stepBtn}
                          disabled={item.qty >= MAX_QTY}
                          onClick={() => setCartQty(index, item.qty + 1)}
                        >
                          <span aria-hidden="true">+</span>
                          <span className="sr-only">Tambah {product.shortName}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          className="ml-auto min-h-9 rounded-full px-3 text-sm text-muted underline underline-offset-2 hover:text-mocha"
                        >
                          Hapus<span className="sr-only"> {product.shortName}</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line px-5 py-4">
                <label htmlFor="keranjang-nama" className="text-sm font-semibold">
                  Nama Kakak <span className="font-normal text-muted">(opsional)</span>
                </label>
                <input
                  id="keranjang-nama"
                  value={name}
                  maxLength={40}
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-line bg-surface px-3"
                />
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-sm text-muted">Total perkiraan (belum ongkir)</span>
                  <span className="text-xl font-bold">{formatRupiah(total)}</span>
                </div>
                <a
                  href={buildWhatsAppLink(cartMessage(items, name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex min-h-13 items-center justify-center gap-2 rounded-full bg-mocha px-6 font-bold text-background hover:bg-mocha-strong"
                >
                  <WhatsAppIcon />
                  Tanya &amp; pesan via WhatsApp
                  <span className="sr-only"> (tab baru)</span>
                </a>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-2 min-h-11 w-full text-sm text-muted underline underline-offset-2 hover:text-mocha"
                >
                  Kosongkan keranjang
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
