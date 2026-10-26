// Keranjang tanya-pesan: hanya daftar titipan di localStorage browser pengunjung.
// Tidak ada checkout/pembayaran/server; isinya dirangkai jadi satu pesan WhatsApp yang rapi.
import { useSyncExternalStore } from 'react';
import { formatRupiah, getProduct, type Product } from '@/data/products';

export type CartItem = { slug: string; size: string | null; color: string | null; qty: number };

const KEY = 'farwa-keranjang';
const EVENT = 'keranjang-berubah';
/** Event untuk membuka laci keranjang dari mana saja */
export const OPEN_CART_EVENT = 'buka-keranjang';
export const MAX_QTY = 500;
const EMPTY: readonly CartItem[] = [];

let cache: { raw: string | null; items: readonly CartItem[] } = { raw: null, items: EMPTY };

function read(): readonly CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return cache.items;
  }
  if (raw === cache.raw) return cache.items;
  let items: readonly CartItem[] = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    // Data dari storage tidak dipercaya: saring yang produknya masih ada & jumlahnya wajar
    if (Array.isArray(parsed)) {
      items = parsed.filter(
        (i): i is CartItem =>
          typeof i?.slug === 'string' &&
          !!getProduct(i.slug) &&
          Number.isInteger(i.qty) &&
          i.qty >= 1 &&
          i.qty <= MAX_QTY &&
          (i.size === null || typeof i.size === 'string') &&
          (i.color === null || typeof i.color === 'string'),
      );
    }
  } catch {
    // isi rusak: anggap kosong
  }
  cache = { raw, items };
  return items;
}

function write(items: readonly CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // storage diblokir: simpan di memori untuk sesi ini saja
    cache = { raw: cache.raw, items };
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && onChange();
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onStorage); // sinkron antar tab
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCart(): readonly CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

const same = (a: CartItem, b: Omit<CartItem, 'qty'>) =>
  a.slug === b.slug && a.size === b.size && a.color === b.color;

/** Tambah ke keranjang; varian yang sama (produk+ukuran+warna) jumlahnya digabung */
export function addToCart(item: CartItem) {
  const items = read();
  const found = items.find((i) => same(i, item));
  write(
    found
      ? items.map((i) => (i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i))
      : [...items, item],
  );
}

export function setCartQty(index: number, qty: number) {
  write(
    read().map((i, n) => (n === index ? { ...i, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : i)),
  );
}

export function removeFromCart(index: number) {
  write(read().filter((_, n) => n !== index));
}

export function clearCart() {
  write(EMPTY);
}

/** Harga per pcs mengikuti ukuran; grosir bila jumlah memenuhi minimum */
export function unitPrice(product: Product, item: CartItem) {
  const retail = product.sizes?.find((s) => s.name === item.size)?.price ?? product.priceRetail;
  const wholesale =
    !!product.priceWholesale && !!product.wholesaleMinQty && item.qty >= product.wholesaleMinQty;
  return { price: wholesale ? (product.priceWholesale ?? retail) : retail, wholesale };
}

/** Pesan WA: satu paragraf per produk (dipisah garis), lalu total perkiraan */
export function cartMessage(items: readonly CartItem[], name: string) {
  const line = '━━━━━━━━━━━━';
  let total = 0;
  const blocks = items.flatMap((item, n) => {
    const product = getProduct(item.slug);
    if (!product) return [];
    const { price, wholesale } = unitPrice(product, item);
    total += price * item.qty;
    return [
      [
        `*${n + 1}. ${product.name}*`,
        item.size && `• Ukuran: ${item.size}`,
        `• Warna: ${item.color ?? 'belum dipilih (mohon dibantu)'}`,
        `• Jumlah: ${item.qty} pcs`,
        `• Harga: ${formatRupiah(price)}/pcs${wholesale ? ' (grosir)' : ''}`,
        `• Subtotal: ${formatRupiah(price * item.qty)}`,
      ]
        .filter(Boolean)
        .join('\n'),
    ];
  });
  const greeting = name.trim() ? `Halo Farwa, saya ${name.trim()}.` : 'Halo Farwa,';
  return [
    `${greeting}\nSaya ingin memesan:`,
    line,
    blocks.join(`\n\n${line}\n\n`),
    line,
    `*Total perkiraan: ${formatRupiah(total)}*\n(belum termasuk ongkir)`,
    'Mohon dicek ketersediaan stok dan total ongkirnya ya, Kak. Terima kasih!',
  ].join('\n\n');
}
