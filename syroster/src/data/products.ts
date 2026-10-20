import { galleryById, type GalleryItem, type ProductType } from './projects';

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  summary: string;
  suitableFor: string[];
  colors: string[];
  /** Ukuran nominal. null = belum ada data. */
  size: string | null;
  /** Bahan. null = belum dikonfirmasi. */
  material: string | null;
  /** Foto tambahan yang benar-benar produk/motif yang sama (untuk galeri di pop-up detail). */
  extraImages?: GalleryItem[];
  /** Label kecil di pojok kartu (mis. "Stok siap"). */
  badge?: string;
  /** Jumlah keping per m² untuk kalkulator. null = belum ada data (kalkulator memakai perkiraan dari ukuran). */
  piecesPerM2: number | null;
  image: GalleryItem;
};

const photo = (id: string): GalleryItem => {
  const item = galleryById(id);
  if (!item) throw new Error(`Foto galeri "${id}" tidak ditemukan`);
  return item;
};

export const typeLabels: Record<ProductType, string> = {
  geometris: 'Motif geometris',
  lingkaran: 'Motif lingkaran',
  sirip: 'Sirip & nako',
  bata: 'Bata tempel',
  custom: 'Custom',
};

// Ukuran yang disebut di unggahan Instagram: 20 × 20 cm, 15 × 30 cm, dan nako 25 × 15 cm.
// TODO: nama motif masih nama deskriptif dari foto; ganti dengan nama resmi & ukuran per motif.
// JANGAN isi berat, kuat tekan, daya serap air, dsb. sebelum ada data resmi.
export const products: Product[] = [
  {
    slug: 'roster-segitiga',
    name: 'Roster Segitiga',
    type: 'geometris',
    material: 'Beton',
    summary: 'Bidang segitiga timbul yang memberi bayangan tegas di dinding.',
    suitableFor: ['Fasad rumah', 'Dinding aksen'],
    colors: ['Putih', 'Abu tua', 'Terakota'],
    size: null, // TODO
    badge: '3 warna',
    piecesPerM2: null,
    image: photo('roster-segitiga-tiga-warna'),
  },
  {
    slug: 'roster-lengkung',
    name: 'Roster Lengkung',
    type: 'lingkaran',
    material: 'Beton',
    summary: 'Empat keping membentuk satu pola lengkung yang utuh.',
    suitableFor: ['Partisi ruang', 'Fasad ruko'],
    colors: ['Abu muda'], // TODO
    size: null,
    piecesPerM2: null,
    image: photo('roster-motif-lengkung-abu'),
  },
  {
    slug: 'roster-sirip',
    name: 'Roster Sirip',
    type: 'sirip',
    material: 'Beton',
    summary: 'Sirip tegak meloloskan udara, menyaring pandangan dari samping.',
    suitableFor: ['Pagar', 'Tangga & void'],
    colors: ['Putih', 'Terakota', 'Abu', 'Krem'],
    size: null,
    badge: '4 warna',
    piecesPerM2: null,
    image: photo('roster-sirip-tiga-warna'),
    extraImages: [
      photo('roster-sirip-krem-abu'),
      photo('roster-sirip-terakota'),
      photo('pemasangan-roster-sirip-terakota'),
    ],
  },
  {
    slug: 'roster-nako',
    name: 'Roster Nako',
    type: 'sirip',
    material: 'Beton',
    summary: 'Bukaan sempit di satu sisi, cocok untuk ventilasi yang tetap privat.',
    suitableFor: ['Kamar mandi luar', 'Area servis'],
    colors: ['Putih'], // TODO
    size: '25 × 15 cm', // disebut di caption video pemasangan; TODO verifikasi
    piecesPerM2: null,
    image: photo('roster-nako-putih'),
  },
  {
    slug: 'roster-lingkaran',
    name: 'Roster Lingkaran',
    type: 'lingkaran',
    material: 'Beton',
    summary: 'Lubang lingkaran beragam ukuran, kesan ringan dan playful.',
    suitableFor: ['Teras', 'Carport'],
    colors: ['Putih', 'Krem natural'],
    size: '20 × 20 cm', // TODO verifikasi
    piecesPerM2: null,
    image: photo('roster-lingkaran-putih'),
    extraImages: [photo('roster-krem-motif-lingkaran')],
  },
  {
    slug: 'roster-piramida',
    name: 'Roster Piramida',
    type: 'geometris',
    material: 'Beton',
    summary: 'Sisi miring empat arah dengan lubang kotak kecil di tengah.',
    suitableFor: ['Dinding aksen', 'Fasad minimalis'],
    colors: ['Abu'], // TODO
    size: null,
    piecesPerM2: null,
    image: photo('roster-piramida-abu'),
  },
  {
    slug: 'roster-kotak-terakota',
    name: 'Roster Kotak',
    type: 'geometris',
    material: 'Beton',
    summary: 'Bingkai kotak dengan bukaan lebar untuk sirkulasi maksimal.',
    suitableFor: ['Gudang', 'Area servis', 'Carport'],
    colors: ['Terakota', 'Putih', 'Abu tua'],
    size: null,
    piecesPerM2: null,
    image: photo('roster-kotak-terakota'),
  },
  {
    slug: 'roster-bintang',
    name: 'Roster Bintang',
    type: 'geometris',
    material: 'Beton',
    summary: 'Lipatan bintang yang tampil beda saat terkena cahaya samping.',
    suitableFor: ['Dinding aksen', 'Lobi'],
    colors: ['Putih', 'Abu tua'],
    size: null,
    piecesPerM2: null,
    image: photo('roster-bintang-putih-abu'),
  },
  {
    slug: 'roster-setengah-lingkaran',
    name: 'Roster Setengah Lingkaran',
    type: 'lingkaran',
    material: 'Beton',
    summary: 'Bukaan setengah lingkaran yang lembut untuk fasad bergaya tropis.',
    suitableFor: ['Fasad rumah', 'Kafe'],
    colors: ['Krem'],
    size: null,
    piecesPerM2: null,
    image: photo('roster-lengkung-krem'),
  },
  {
    slug: 'roster-labirin',
    name: 'Roster Labirin',
    type: 'geometris',
    material: 'Beton',
    summary: 'Pola labirin yang padat, privasi tinggi namun tetap berventilasi.',
    suitableFor: ['Pagar atas', 'Dinding pembatas'],
    colors: ['Abu'],
    size: null,
    piecesPerM2: null,
    image: photo('roster-motif-labirin-abu'),
  },
  {
    slug: 'roster-diagonal',
    name: 'Roster Diagonal',
    type: 'geometris',
    material: 'Beton',
    summary: 'Sirip diagonal di dalam bingkai persegi.',
    suitableFor: ['Kamar mandi luar', 'Pagar rumah'],
    colors: ['Krem', 'Abu tua'],
    size: '20 × 20 cm', // tertulis di foto produk
    piecesPerM2: null,
    image: photo('roster-diagonal-krem-dan-abu'),
  },
  {
    slug: 'bata-tempel-bevel',
    name: 'Bata Tempel Bevel',
    type: 'bata',
    material: null, // TODO: konfirmasi bahan bata tempel
    summary: 'Pelapis dinding dengan tepi miring (bevel) untuk tampilan rapi.',
    suitableFor: ['Fasad', 'Dinding interior'],
    colors: ['Putih', 'Abu'],
    size: null,
    badge: 'Stok siap', // caption Threads: stok 2.000 m². TODO: verifikasi stok terkini
    piecesPerM2: null,
    image: photo('bata-tempel-bevel-putih-abu'),
  },
  {
    slug: 'bata-tempel-terakota',
    name: 'Bata Tempel Terakota',
    type: 'bata',
    material: null, // TODO: konfirmasi bahan bata tempel
    summary: 'Bata tipis warna merah bata untuk dinding bernuansa hangat.',
    suitableFor: ['Dinding aksen', 'Pagar'],
    colors: ['Terakota'],
    size: null,
    piecesPerM2: null,
    image: photo('bata-tempel-terakota'),
    extraImages: [photo('pemasangan-bata-tempel-dinding')],
  },
];
