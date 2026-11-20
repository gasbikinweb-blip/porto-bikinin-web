'use client';

// Keranjang tanya-pesan: hanya di browser pengunjung (localStorage), tidak dikirim ke server.
// Isinya dikirim sebagai pesan WhatsApp saat pengunjung menekan "Kirim pesanan".
import { useSyncExternalStore } from 'react';
import { getProduct } from '@/data/products';

export type CartItem = { slug: string; color?: string; qty: number };

const KEY = 'sanarea-keranjang';
const EVENT = 'sanarea:keranjang';
const EMPTY: CartItem[] = [];
let cache: CartItem[] | null = null;

// Baca & validasi isi storage terhadap data produk (whitelist)
function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    cache = Array.isArray(raw)
      ? raw.flatMap((x: Partial<CartItem>) => {
          const p = typeof x?.slug === 'string' ? getProduct(x.slug) : undefined;
          const qty = Number(x?.qty);
          if (!p || !Number.isInteger(qty) || qty < 1 || qty > 50) return [];
          const color = p.colors.some((c) => c.slug === x.color) ? x.color : undefined;
          return [{ slug: p.slug, color, qty }];
        })
      : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage diblokir: keranjang tetap berlaku selama halaman terbuka
  }
  window.dispatchEvent(new Event(EVENT));
}

const same = (a: CartItem, slug: string, color?: string) => a.slug === slug && a.color === color;

export const cart = {
  add(slug: string, color: string | undefined, qty: number) {
    const items = read();
    const found = items.find((i) => same(i, slug, color));
    write(
      found
        ? items.map((i) => (i === found ? { ...i, qty: Math.min(50, i.qty + qty) } : i))
        : [...items, { slug, color, qty }],
    );
  },
  setQty(slug: string, color: string | undefined, qty: number) {
    const n = Math.min(50, Math.max(1, Math.round(qty) || 1));
    write(read().map((i) => (same(i, slug, color) ? { ...i, qty: n } : i)));
  },
  remove(slug: string, color: string | undefined) {
    write(read().filter((i) => !same(i, slug, color)));
  },
  clear() {
    write([]);
  },
};

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** Buka panel keranjang dari mana saja */
export const OPEN_CART_EVENT = 'sanarea:buka-keranjang';
export const openCart = () => window.dispatchEvent(new Event(OPEN_CART_EVENT));
