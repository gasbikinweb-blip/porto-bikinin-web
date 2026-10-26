// Program reseller & grosir. Sumber: caption Instagram (Mei–Okt 2026).
// TODO: SEMUA angka & syarat perlu diverifikasi admin sebelum rilis.

export const resellerPerks = [
  { title: 'Harga grosir', text: 'Harga khusus untuk pembelian jumlah banyak, bisa mix model.' }, // IG 23 Okt: "Bisa MIX"
  {
    title: 'Free foto untuk jualan',
    text: 'Dapat foto produk siap pakai untuk promosi di toko online Kakak.',
  }, // IG 23 Okt
  {
    title: 'Tanpa label',
    text: 'Beberapa produk tanpa label, aman untuk dijual kembali dengan brand sendiri.',
  }, // caption Naima & Khiban
  {
    title: 'Bisa visit Bandung',
    text: 'Mau lihat langsung? Bisa datang ke lokasi kami di Bandung.',
  }, // IG 23 Okt
] as const;

export const resellerTerms = [
  'Minimal order grosir mulai 10–20 pcs, tergantung produk.', // TODO: IG menyebut min 10 pcs (khiban) & min 20 pcs (two tone)
  'Boleh mix model dan warna.', // TODO: konfirmasi berlaku untuk semua produk
  'Pemesanan grosir dilayani lewat WhatsApp (bukan Shopee).',
] as const;

export type WholesaleRow = {
  product: string;
  tiers: readonly { minQty: number; price: number }[];
  note?: string;
};

// Harga grosir per jumlah (via WhatsApp)
export const wholesaleTable: readonly WholesaleRow[] = [
  {
    product: 'Syaima Khiban Voal Miracle',
    tiers: [
      { minQty: 10, price: 52000 },
      { minQty: 50, price: 48000 },
      { minQty: 100, price: 46000 },
      { minQty: 200, price: 44000 },
    ],
    note: 'Ecer via WA Rp54.900', // IG 22 Mei 2026
  },
];

// Produk yang harga grosirnya "mulai dari" (tanpa tabel lengkap)
export const wholesaleFrom = [
  { product: 'Hijab instan rayon (Aisha, Maryam, Rania)', from: 25000, minQty: null }, // IG 12 Sep 2026
  { product: 'Mayra Twotone', from: 19000, minQty: 20, note: 'Poster menulis “mulai 20.000an”' }, // IG 23 Okt 2026, TODO
] as const;

export const joinSteps = [
  {
    title: 'Chat admin',
    text: 'Klik tombol Daftar Reseller, pesan WhatsApp sudah tersusun otomatis.',
  },
  { title: 'Pilih produk', text: 'Admin kirim katalog dan daftar harga grosir terbaru.' },
  { title: 'Order & bayar', text: 'Tentukan model, warna, dan jumlah. Boleh mix.' },
  { title: 'Mulai jualan', text: 'Pakai foto dari kami dan atur sendiri harga jualmu.' },
] as const;
