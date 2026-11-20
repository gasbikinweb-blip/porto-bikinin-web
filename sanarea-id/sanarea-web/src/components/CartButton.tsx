'use client';

// Tombol keranjang di navbar dengan jumlah item
import { openCart, useCart } from '@/lib/cart';
import { BagIcon } from './icons';

export function CartButton() {
  const count = useCart().reduce((n, i) => n + i.qty, 0);
  return (
    <button
      type="button"
      onClick={openCart}
      className="relative grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-ink"
    >
      <BagIcon className="size-5" />
      <span className="sr-only">Buka keranjang, {count} item</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.6rem] text-background tabular-nums"
        >
          {count}
        </span>
      )}
    </button>
  );
}
