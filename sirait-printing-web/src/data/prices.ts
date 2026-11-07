// Daftar harga. Kalkulator & tabel harga HANYA membaca dari file ini.
// TODO: verifikasi semua harga terbaru ke pemilik sebelum rilis.

export const PRICE_UPDATED_AT = '2026-10-12'; // tanggal poster/caption harga terbaru

export type PriceId =
  | 'print-75'
  | 'print-promo'
  | 'print-80'
  | 'lux-1'
  | 'lux-2-9'
  | 'lux-10'
  | 'jilid-biasa'
  | 'sertifikat'
  | 'map-biru'
  | 'fotocopy'
  | 'laminating'
  | 'pas-foto'
  | 'print-a3';

export type PriceGroup = 'print' | 'jilid' | 'lainnya';

export type Price = {
  id: PriceId;
  group: PriceGroup;
  label: string;
  /** Rupiah. null = belum ada harga resmi, tampil "Tanya admin" */
  price: number | null;
  unit: string;
  note?: string;
  /** Tampilkan sebagai "mulai dari" */
  from?: boolean;
  highlight?: boolean;
};

export const prices: readonly Price[] = [
  {
    id: 'print-75',
    group: 'print',
    label: 'Print proposal / skripsi / tesis (HVS 75 gr)',
    price: 195, // sumber: caption & poster Des 2025–Sep 2026
    unit: 'per lembar',
    note: 'Hitam putih dan warna sama harga',
    highlight: true,
  },
  {
    id: 'print-promo',
    group: 'print',
    label: 'Promo sempro / semhas / sidang',
    price: 190, // sumber: poster 12 Okt 2026
    unit: 'per lembar',
    note: 'Minimal 4 rangkap, hitam putih dan warna sama harga',
    highlight: true,
  },
  {
    id: 'print-80',
    group: 'print',
    label: 'Print kertas 80 gr',
    price: 270, // sumber: poster Feb 2026
    unit: 'per lembar',
  },
  { id: 'print-a3', group: 'print', label: 'Print A3', price: null, unit: 'per lembar' },
  {
    id: 'lux-1',
    group: 'jilid',
    label: 'Jilid lux / hard cover (1 rangkap)',
    price: 25000, // sumber: poster Feb 2026
    unit: 'per buku',
    note: 'Pengerjaan 1 hari',
  },
  {
    id: 'lux-2-9',
    group: 'jilid',
    label: 'Jilid lux (2–9 rangkap)',
    price: 22000,
    unit: 'per buku',
  },
  {
    id: 'lux-10',
    group: 'jilid',
    label: 'Jilid lux (10+ rangkap)',
    price: 18000,
    unit: 'per buku',
  },
  { id: 'jilid-biasa', group: 'jilid', label: 'Jilid biasa', price: null, unit: 'per buku' },
  {
    id: 'sertifikat',
    group: 'lainnya',
    label: 'Cetak sertifikat',
    price: 2000, // sumber: caption Agu & Sep 2026
    unit: 'per lembar',
    note: 'Minimal 100 lembar',
    from: true,
  },
  { id: 'map-biru', group: 'lainnya', label: 'Map biru', price: 1400, unit: 'per buah' }, // poster Des 2025
  { id: 'fotocopy', group: 'lainnya', label: 'Fotocopy', price: null, unit: 'per lembar' },
  { id: 'laminating', group: 'lainnya', label: 'Laminating', price: null, unit: 'per lembar' },
  { id: 'pas-foto', group: 'lainnya', label: 'Cetak pas foto', price: null, unit: 'per lembar' },
];

export const priceGroups: Record<PriceGroup, string> = {
  print: 'Print',
  jilid: 'Jilid',
  lainnya: 'Lainnya',
};

export function getPrice(id: PriceId): Price {
  const p = prices.find((x) => x.id === id);
  if (!p) throw new Error(`Harga ${id} tidak ditemukan`);
  return p;
}

/** Aturan kalkulator, semua angka diambil dari daftar harga di atas */
export const calcRules = {
  /** Minimal rangkap untuk harga promo */
  promoMinCopies: 4,
  /** Jilid lux bertingkat berdasarkan jumlah rangkap */
  luxTiers: [
    { min: 10, id: 'lux-10' },
    { min: 2, id: 'lux-2-9' },
    { min: 1, id: 'lux-1' },
  ] as const satisfies readonly { min: number; id: PriceId }[],
  maxPages: 2000,
  maxCopies: 50,
} as const;

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export const formatRupiah = (n: number) => rupiah.format(n);
