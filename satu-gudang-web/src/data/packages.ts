// Paket Furniture Kamar Tidur (produk pintu masuk). Nama & isi paket ada di src/content.

export const packageIds = ['essential', 'signature', 'villa'] as const;
export type PackageId = (typeof packageIds)[number];

export type BedroomPackage = {
  id: PackageId;
  /** Harga mulai (IDR). null = belum ada harga resmi → tampil "Harga menyusul / tanya via WA". */
  priceFrom: number | null; // TODO: ganti dengan harga asli dari Satu Gudang
  /** Paket yang disorot (label "Paling diminati") */
  featured?: boolean;
  /** Foto contoh dari proyek nyata (path tanpa ekstensi) */
  image: string;
};

export const bedroomPackages: readonly BedroomPackage[] = [
  { id: 'essential', priceFrom: null, image: '/projects/bedroom-tabanan/02' },
  { id: 'signature', priceFrom: null, featured: true, image: '/projects/bedroom-tabanan/01' },
  { id: 'villa', priceFrom: null, image: '/projects/warm-wood-residence/01' },
];
