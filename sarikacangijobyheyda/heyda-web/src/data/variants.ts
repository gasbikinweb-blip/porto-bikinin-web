// Data varian. Ubah file ini untuk mengganti harga, ukuran, foto, atau deskripsi.
// ATURAN: jangan isi harga, ukuran, komposisi, atau klaim kesehatan karangan. Kosongkan (undefined) bila belum pasti.
// TODO: konfirmasi perbedaan komposisi varian ke owner

export type VariantImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** 'foto' = foto produk asli; 'ilustrasi' = gambar desain/AI (wajib diberi label "Ilustrasi") */
  kind: 'foto' | 'ilustrasi';
};

export type Variant = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  forWho: string;
  /** Contoh: '250 ml'. Kosong = tampil "Ukuran segera diinfokan" */
  size?: string;
  /** Harga per botol dalam Rupiah. Kosong = tampil "Tanya harga via WA" */
  price?: number;
  /** Warna aksen kartu (hex), dipakai secukupnya */
  accentColor: string;
  /** Kosong = pakai botol SVG placeholder "Foto produk segera hadir" */
  image?: VariantImage;
  available: boolean;
};

export const variants: readonly Variant[] = [
  {
    slug: 'ori',
    name: 'Sari Kacang Ijo ORI',
    shortName: 'ORI',
    description: 'Rasa sari kacang ijo yang klasik, pilihan aman buat dinikmati kapan saja.',
    forWho: 'Untuk semua anggota keluarga',
    size: undefined, // TODO: ukuran botol (poster menulis 250 ml, belum terverifikasi)
    price: undefined, // TODO: harga dari owner
    accentColor: '#4f8a3c',
    available: true,
  },
  {
    slug: 'bumil-busui',
    name: 'Sari Kacang Ijo Bumil dan Busui',
    shortName: 'Bumil & Busui',
    // Sengaja tanpa klaim manfaat kesehatan
    description: 'Varian yang disiapkan khusus untuk Kakak yang sedang hamil atau menyusui.',
    forWho: 'Untuk ibu hamil & menyusui',
    size: undefined, // TODO
    price: undefined, // TODO
    accentColor: '#c95a7a',
    available: true,
  },
  {
    slug: 'kids',
    name: 'Sari Kacang Ijo Kids',
    shortName: 'Kids',
    description: 'Varian yang disiapkan untuk si kecil, enak dibawa sebagai bekal.',
    forWho: 'Untuk anak-anak',
    size: undefined, // TODO
    price: undefined, // TODO
    accentColor: '#c98a12',
    available: true,
  },
  {
    slug: 'no-sugar',
    name: 'Sari Kacang Ijo No Sugar',
    shortName: 'No Sugar',
    description: 'Varian tanpa tambahan gula untuk Kakak yang sedang membatasi gula.', // TODO: konfirmasi "tanpa tambahan gula"
    forWho: 'Untuk yang membatasi gula',
    size: undefined, // TODO
    price: undefined, // TODO
    accentColor: '#1f8a8a',
    available: true,
  },
];
