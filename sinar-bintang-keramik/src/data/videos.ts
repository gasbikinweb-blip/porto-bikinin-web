// Video asli dari Instagram @sinarbintang.keramik (dikompres oleh `npm run optimize-videos`).
// Urutan di sini = urutan tampil. Slug harus sama dengan scripts/videos.manifest.mjs.

export type StoreVideo = {
  slug: string;
  title: string;
  caption: string;
  /** Detik, untuk label durasi */
  duration: number;
};

export const storeVideos: readonly StoreVideo[] = [
  {
    slug: 'keliling-toko',
    title: 'Keliling toko',
    caption: 'Dari pintu sampai sanitary, semua ada di satu tempat.',
    duration: 42,
  },
  {
    slug: 'suasana-ramai',
    title: 'Suasana toko ramai',
    caption: 'Pelanggan berdatangan, 24 Oktober 2026.',
    duration: 35,
  },
  {
    slug: 'belanja-dari-rumah',
    title: 'Belanja dari rumah',
    caption: 'Hujan? Pesan lewat Shopee atau Tokopedia saja.',
    duration: 30,
  },
  {
    slug: 'granit-eleganza',
    title: 'Granit Eleganza',
    caption: 'Ukuran 60x60, 80x80, sampai 100x100 cm.',
    duration: 41,
  },
  {
    slug: 'granit-napoleon-black',
    title: 'Granit Napoleon Black',
    caption: 'Granit 60x60 bertampilan mewah dan elegan.',
    duration: 25,
  },
  {
    slug: 'granit-putih-modison',
    title: 'Granit putih Modison White',
    caption: 'Granit putih motif marmer 60x60, glossy.',
    duration: 10,
  },
  {
    slug: 'pintu-baja-fortress',
    title: 'Pintu Baja Fortress',
    caption: 'Pintu baja Fortress warna Black Carbon.',
    duration: 16,
  },
];
