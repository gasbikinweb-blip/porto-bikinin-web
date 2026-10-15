// Konten brand untuk beranda, tentang, dan kontak.

export interface Highlight {
  title: string;
  description: string;
}

// TODO: verifikasi dengan spesifikasi produk asli
export const highlights: readonly Highlight[] = [
  {
    title: 'Bahan Premium',
    description: 'Kain pilihan yang adem, jatuh, dan tidak menerawang.',
  },
  {
    title: 'Jahitan Butik',
    description: 'Dijahit rapi dengan bordir detail yang dikerjakan teliti.',
  },
  {
    title: 'Desain Eksklusif',
    description: 'Diproduksi terbatas lewat sistem PO, tidak pasaran.',
  },
  {
    title: 'Nyaman Seharian',
    description: 'Cutting lapang dan ringan, leluasa untuk beraktivitas.',
  },
];

export interface OrderStep {
  title: string;
  description: string;
}

export const orderSteps: readonly OrderStep[] = [
  {
    title: 'Pilih Produk',
    description: 'Lihat katalog, catat nama produk, ukuran, dan warna yang Anda inginkan.',
  },
  {
    title: 'Chat Admin',
    description:
      'Klik tombol WhatsApp. Admin mengonfirmasi ketersediaan, periode PO, dan total biaya.',
  },
  {
    title: 'Pembayaran',
    // TODO: verifikasi ketentuan pembayaran PO (lunas / DP)
    description:
      'Transfer sesuai instruksi admin. Untuk Pre-Order, pembayaran dilakukan selama periode PO dibuka.',
  },
  {
    title: 'Pengiriman',
    // TODO: verifikasi estimasi produksi
    description:
      'Ready stock dikirim 1–2 hari kerja. Pesanan PO dikirim setelah produksi selesai, resi via WhatsApp.',
  },
];

// TODO: verifikasi kota asal dan ekspedisi
export const shippingInfo = {
  origin: 'Indonesia',
  couriers: ['JNE', 'J&T Express', 'SiCepat', 'AnterAja'],
  notes: [
    'Pengiriman ke seluruh Indonesia.',
    'Ongkir dihitung admin sesuai alamat dan berat paket.',
    'Nomor resi dikirim via WhatsApp setelah paket diserahkan ke kurir.',
    'Wajib video unboxing tanpa jeda untuk klaim kerusakan atau salah kirim.',
  ],
} as const;

// Flash sale CONTOH untuk tampilan. TODO: ganti dengan promo asli atau matikan (enabled: false)
export const flashSale = {
  enabled: true,
  title: 'Flash Sale!',
  subtitle: 'Diskon 25% untuk Nehir Abaya · penawaran terbatas',
  /** Durasi hitung mundur dummy (jam), dihitung ulang tiap kali halaman dibuka */
  hours: 52,
  images: [
    {
      src: '/products/nehir-abaya-baby-yellow/01.webp',
      alt: 'Model mengenakan Nehir Abaya baby yellow di kafe',
    },
    {
      src: '/products/nehir-abaya-jetblack/01.webp',
      alt: 'Model mengenakan Nehir Abaya jetblack di taman kota',
    },
  ],
} as const;
