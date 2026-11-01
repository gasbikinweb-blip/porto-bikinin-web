// Merek yang tersedia: otomatis dari data produk + merek yang terlihat di Instagram toko.
// Ditampilkan sebagai teks, bukan logo merek pihak lain.
import { products } from './products';

// Merek dari konten Instagram SBK yang belum punya produk di website
// (Fortress: smart lock di video toko 24-01-2026)
const fromInstagram = ['Fortress'];

export const brands: readonly string[] = [
  ...new Set([...products.flatMap((p) => (p.brand ? [p.brand] : [])), ...fromInstagram]),
].sort((a, b) => a.localeCompare(b, 'id'));
