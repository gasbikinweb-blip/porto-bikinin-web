// Promo dengan tanggal berakhir. Promo yang sudah lewat otomatis disembunyikan saat build.
export type Promo = {
  id: string;
  title: string;
  text: string;
  /** Hanya berlaku pembelian via WA */
  viaWhatsApp: boolean;
  productSlug?: string;
  /** YYYY-MM-DD (akhir hari, WIB) */
  endsAt: string;
  active: boolean;
};

export const promos: readonly Promo[] = [
  {
    id: 'aisha-3pcs',
    title: 'Aisha 3 pcs',
    text: 'Rp99.000 dapat 3 pcs size S, atau Rp110.000 dapat 3 pcs size M.',
    viaWhatsApp: true,
    productSlug: 'aisha-bergo-bando',
    // TODO: tanggal berakhir belum disebut di Instagram (diposting 17 Sep 2026); aktifkan setelah dikonfirmasi
    endsAt: '2026-09-30',
    active: false,
  },
];

/** Promo aktif & belum lewat tanggal (dievaluasi saat build) */
export function activePromos(now = new Date()): Promo[] {
  return promos.filter((p) => p.active && new Date(`${p.endsAt}T23:59:59+07:00`) >= now);
}
