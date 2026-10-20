// Data foto. Gambar hasil `npm run optimize-images` di public/images/galeri/.
// kind: 'proyek' = foto nyata, 'ilustrasi' = render/CGI/hasil edit (UI otomatis menampilkan label "Ilustrasi").

export type GalleryCategory = 'roster' | 'bata-tempel' | 'pemasangan';
export type ProductType = 'geometris' | 'lingkaran' | 'sirip' | 'bata';

export type GalleryItem = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  productType: ProductType;
  area?: string;
  kind: 'proyek' | 'ilustrasi';
  width: number;
  height: number;
};

export const categoryLabels: Record<GalleryCategory, string> = {
  roster: 'Roster beton',
  'bata-tempel': 'Bata tempel',
  pemasangan: 'Contoh pemasangan',
};

const photo = (
  slug: string,
  width: number,
  height: number,
  data: Pick<GalleryItem, 'alt' | 'caption' | 'category' | 'productType'>,
): GalleryItem => ({
  id: slug,
  src: `/images/galeri/${slug}.webp`,
  thumb: `/images/galeri/${slug}-thumb.webp`,
  kind: 'proyek',
  width,
  height,
  ...data,
});

// Sumber: foto produk asli + unggahan Instagram/Threads @sy_roster.industrie.
// TODO: konfirmasi foto "pemasangan" memang proyek Syroster dan pemilik bangunan mengizinkan publikasi.
export const gallery: GalleryItem[] = [
  // ---------- Contoh pemasangan ----------
  photo('pemasangan-roster-terakota-area-duduk', 736, 1104, {
    alt: 'Dinding roster terakota berpola kotak di samping area duduk dengan tanaman',
    caption: 'Roster terakota sebagai dinding area duduk',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-roster-terakota-pagar', 1448, 1086, {
    alt: 'Deretan roster terakota dipasang di bagian atas dinding pagar lantai dua',
    caption: 'Roster terakota di atas dinding pagar',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-roster-putih-teras', 736, 1307, {
    alt: 'Roster krem bermotif kotak berlapis mengisi bukaan dinding putih di samping pintu',
    caption: 'Roster krem pada bukaan dinding',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-roster-krem-kafe', 675, 1200, {
    alt: 'Dinding roster krem bermotif kotak di belakang meja dan kursi kafe',
    caption: 'Roster krem sebagai latar area makan',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-roster-sirip-terakota', 736, 981, {
    alt: 'Dinding roster sirip terakota tinggi di belakang dua kursi rotan',
    caption: 'Roster sirip terakota untuk dinding aksen',
    category: 'pemasangan',
    productType: 'sirip',
  }),
  photo('pemasangan-bata-tempel-dinding', 480, 645, {
    alt: 'Dinding bata tempel merah tersusun rapi di samping pintu rumah',
    caption: 'Bata tempel merah untuk dinding aksen',
    category: 'pemasangan',
    productType: 'bata',
  }),

  // Foto berikut menampilkan nama usaha/alamat; dipublikasikan atas persetujuan pemilik website.
  photo('pemasangan-roster-terakota-pintu-masuk', 736, 981, {
    alt: 'Dinding roster terakota di area pintu masuk bangunan, bersebelahan dengan dinding lengkung berjendela',
    caption: 'Roster terakota di area pintu masuk',
    category: 'pemasangan',
    productType: 'sirip',
  }),
  photo('pemasangan-roster-fasad-kafe', 736, 976, {
    alt: 'Fasad kafe bata merah dengan dinding roster terakota di lantai atas dan deretan roster di atas pot tanaman',
    caption: 'Roster terakota pada fasad kafe',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-roster-terakota-pagar-2', 1448, 1086, {
    alt: 'Roster terakota memanjang di atas dinding pagar putih dengan langit biru',
    caption: 'Roster terakota di atas pagar, sudut lain',
    category: 'pemasangan',
    productType: 'geometris',
  }),
  photo('pemasangan-bata-tempel-pagar', 736, 736, {
    alt: 'Dinding pagar berlapis bata tempel merah di depan rumah',
    caption: 'Bata tempel merah untuk dinding pagar',
    category: 'pemasangan',
    productType: 'bata',
  }),
  photo('proses-pemasangan-bata-tempel', 736, 1308, {
    alt: 'Tiga tahap pemasangan bata tempel merah di dinding, dari proses pemasangan hingga selesai',
    caption: 'Proses pemasangan bata tempel',
    category: 'pemasangan',
    productType: 'bata',
  }),

  // ---------- Roster beton ----------
  photo('roster-segitiga-tiga-warna', 1024, 1024, {
    alt: 'Roster beton motif segitiga dalam warna putih, abu tua, dan terakota',
    caption: 'Motif segitiga, tiga pilihan warna',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-motif-lengkung-abu', 1024, 1024, {
    alt: 'Empat roster beton abu muda motif lengkung dan kotak disusun menjadi satu pola',
    caption: 'Motif lengkung, susunan empat keping',
    category: 'roster',
    productType: 'lingkaran',
  }),
  photo('roster-sirip-tiga-warna', 1024, 1024, {
    alt: 'Tumpukan roster sirip berwarna putih, terakota, dan abu',
    caption: 'Roster sirip warna putih, terakota, dan abu',
    category: 'roster',
    productType: 'sirip',
  }),
  photo('roster-lingkaran-putih', 1024, 1024, {
    alt: 'Susunan roster beton putih dengan lubang lingkaran berbagai ukuran',
    caption: 'Motif lingkaran putih',
    category: 'roster',
    productType: 'lingkaran',
  }),
  photo('roster-piramida-abu', 1024, 1024, {
    alt: 'Susunan roster beton abu motif piramida dengan lubang kotak kecil',
    caption: 'Motif piramida abu',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-kotak-terakota', 1024, 1024, {
    alt: 'Roster beton warna terakota motif kotak berbingkai disusun tiga baris',
    caption: 'Motif kotak warna terakota',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-nako-putih', 1024, 1024, {
    alt: 'Dua roster nako beton putih ditumpuk dengan bukaan sempit di satu sisi',
    caption: 'Roster nako putih',
    category: 'roster',
    productType: 'sirip',
  }),
  photo('roster-sirip-krem-abu', 736, 736, {
    alt: 'Roster sirip berwarna krem dan abu tua disusun berselang-seling',
    caption: 'Roster sirip krem dan abu tua',
    category: 'roster',
    productType: 'sirip',
  }),
  photo('roster-sirip-terakota', 736, 736, {
    alt: 'Roster sirip terakota disusun tinggi menjadi satu bidang dinding',
    caption: 'Roster sirip terakota',
    category: 'roster',
    productType: 'sirip',
  }),
  photo('roster-bintang-putih-abu', 640, 640, {
    alt: 'Roster beton motif bintang lipat dalam warna putih dan abu tua',
    caption: 'Motif bintang putih dan abu',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-lengkung-krem', 1024, 1024, {
    alt: 'Sembilan roster beton krem dengan bukaan setengah lingkaran',
    caption: 'Motif setengah lingkaran krem',
    category: 'roster',
    productType: 'lingkaran',
  }),
  photo('roster-lubang-bulat-putih', 712, 690, {
    alt: 'Tumpukan roster beton putih dengan satu lubang bulat besar di tengah',
    caption: 'Roster lubang bulat putih',
    category: 'roster',
    productType: 'lingkaran',
  }),
  photo('roster-motif-labirin-abu', 510, 510, {
    alt: 'Roster beton abu motif labirin disusun di atas tumpukan roster',
    caption: 'Motif labirin abu',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-diagonal-krem-dan-abu', 1280, 1280, {
    alt: 'Roster beton motif diagonal berukuran 20 x 20 cm dalam warna krem dan abu gelap',
    caption: 'Motif diagonal krem dan abu, 20 × 20 cm',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-kotak-putih-dan-abu', 1280, 1280, {
    alt: 'Susunan roster beton motif kotak berwarna krem dan abu tua berselang-seling di atas lantai semen',
    caption: 'Motif kotak krem dan abu tua',
    category: 'roster',
    productType: 'geometris',
  }),
  photo('roster-krem-motif-lingkaran', 1263, 1280, {
    alt: 'Dinding roster beton krem dengan motif lubang lingkaran berbagai ukuran',
    caption: 'Motif lingkaran krem natural',
    category: 'roster',
    productType: 'lingkaran',
  }),

  // ---------- Bata tempel ----------
  photo('bata-tempel-bevel-putih-abu', 736, 736, {
    alt: 'Empat keping bata tempel bevel dalam warna putih dan abu',
    caption: 'Bata tempel bevel putih dan abu',
    category: 'bata-tempel',
    productType: 'bata',
  }),
  photo('bata-tempel-terakota', 736, 736, {
    alt: 'Tangan memegang dua keping bata tempel tipis berwarna terakota',
    caption: 'Bata tempel terakota',
    category: 'bata-tempel',
    productType: 'bata',
  }),
];

export const galleryById = (id: string) => gallery.find((g) => g.id === id);

export type VideoItem = {
  id: string;
  src: string;
  poster: string;
  title: string;
  /** Label kecil di atas judul (mis. lokasi/jenis kegiatan) */
  meta: string;
  tag: string;
  width: number;
  height: number;
};

// Video dari akun @sy_roster.industrie (metadata dihapus, lihat public/videos/).
// Tiga video inspirasi memuat watermark akun lain; dipakai atas izin pemiliknya.
export const videos: VideoItem[] = [
  {
    id: 'roster-minimalis-fasad-putih',
    src: '/videos/roster-minimalis-fasad-putih.mp4',
    poster: '/videos/roster-minimalis-fasad-putih-poster.webp',
    title: 'Roster beton minimalis putih memanjang di fasad',
    meta: 'Inspirasi • Fasad',
    tag: 'Roster minimalis',
    width: 360,
    height: 640,
  },
  {
    id: 'roster-dinding-aksen-rumah',
    src: '/videos/roster-dinding-aksen-rumah.mp4',
    poster: '/videos/roster-dinding-aksen-rumah-poster.webp',
    title: 'Dinding roster berlampu pada fasad rumah',
    meta: 'Inspirasi • Dinding aksen',
    tag: 'Berbagai motif',
    width: 360,
    height: 640,
  },
  {
    id: 'roster-pagar-depan-rumah',
    src: '/videos/roster-pagar-depan-rumah.mp4',
    poster: '/videos/roster-pagar-depan-rumah-poster.webp',
    title: 'Pagar roster putih sebagai penghemat biaya rumah',
    meta: 'Inspirasi • Pagar',
    tag: 'Roster putih',
    width: 576,
    height: 1024,
  },
  {
    id: 'pemasangan-roster-nako',
    src: '/videos/pemasangan-roster-nako.mp4',
    poster: '/videos/pemasangan-roster-nako-poster.webp',
    title: 'Pemasangan roster nako 25 × 15 cm pada bangunan baru',
    meta: 'Pemasangan • Fasad',
    tag: 'Roster nako',
    width: 576,
    height: 1024,
  },
  {
    id: 'stok-roster-di-pabrik',
    src: '/videos/stok-roster-di-pabrik.mp4',
    poster: '/videos/stok-roster-di-pabrik-poster.webp',
    title: 'Stok roster terakota siap kirim di pabrik',
    meta: 'Pabrik • Stok siap',
    tag: 'Roster terakota',
    width: 720,
    height: 1280,
  },
];
