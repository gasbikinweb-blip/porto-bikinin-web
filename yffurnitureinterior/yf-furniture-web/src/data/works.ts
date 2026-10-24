import type { CategorySlug } from './categories';
import imageSizes from './images.generated.json';

export type WorkImage = {
  src: string;
  /** Versi kecil untuk grid (lebar 640px) */
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type Work = {
  slug: string;
  title: string;
  category: CategorySlug;
  /** Tanggal posting Instagram (YYYY-MM-DD), dari nama folder */
  date: string;
  /** 'proses' = foto masih di workshop / masih terbungkus plastik */
  status: 'selesai' | 'proses';
  summary: string;
  cover: WorkImage;
  images: readonly WorkImage[];
  featured: boolean;
  instagramUrl?: string;
};

type WorkInput = Omit<Work, 'cover' | 'images' | 'instagramUrl'> & {
  /** Kode postingan Instagram (bagian akhir nama folder) */
  igCode?: string;
  /** Alt per foto, urutan sama dengan scripts/katalog.manifest.mjs */
  alts: readonly string[];
};

const sizes: Record<string, { width: number; height: number }> = imageSizes;

function build(input: WorkInput): Work {
  const { igCode, alts, ...rest } = input;
  const images = alts.map((alt, i) => {
    const base = `/images/katalog/${rest.slug}/${rest.slug}-${i + 1}`;
    const size = sizes[`${base}.webp`];
    if (!size) throw new Error(`Gambar ${base}.webp belum ada. Jalankan npm run optimize-images.`);
    return { src: `${base}.webp`, thumb: `${base}-thumb.webp`, alt, ...size };
  });
  const cover = images[0];
  if (!cover) throw new Error(`Karya ${rest.slug} belum punya foto.`);
  return {
    ...rest,
    cover,
    images,
    instagramUrl: igCode ? `https://www.instagram.com/p/${igCode}/` : undefined,
  };
}

// Judul & deskripsi disusun dari caption + isi foto. Tidak ada klaim harga/garansi/lama pengerjaan.
const inputs: readonly WorkInput[] = [
  {
    slug: 'meja-belajar-anak-pink',
    title: 'Meja Belajar Anak Pink',
    category: 'meja-belajar',
    date: '2026-10-15',
    status: 'selesai',
    featured: true,
    igCode: 'Deg9qPOktDZ',
    summary: 'Meja belajar anak warna pink dengan rak atas, laci, dan kabinet pintu putih.',
    alts: [
      'Meja belajar anak warna pink dengan rak atas, laci, dan kabinet pintu putih',
      'Meja belajar anak pink dengan laci dan pintu kabinet terbuka',
      'Tampak samping meja belajar anak pink dengan rak atas',
    ],
  },
  {
    slug: 'meja-resepsionis-putih',
    title: 'Meja Resepsionis / Kasir Putih',
    category: 'meja-kasir-resepsionis',
    date: '2026-10-15',
    status: 'proses',
    featured: false,
    igCode: 'Deg9TEPkp1d',
    summary: 'Meja resepsionis putih dengan laci berkunci, siap dikirim via kargo.',
    alts: [
      'Meja resepsionis putih dengan laci berkunci, masih berlapis plastik pelindung',
      'Meja kasir putih dengan susunan laci di sisi kiri dan kanan',
      'Bagian depan meja resepsionis putih yang masih terbungkus plastik',
    ],
  },
  {
    slug: 'meja-credenza-laci-putih',
    title: 'Meja Credenza Laci Putih Top Kayu',
    category: 'rak-kabinet',
    date: '2026-10-15',
    status: 'selesai',
    featured: true,
    igCode: 'Deg9-cMEosg',
    summary: 'Credenza enam laci warna putih dengan top motif kayu dan handle bulat.',
    alts: [
      'Meja credenza enam laci putih dengan top motif kayu di ruang tamu',
      'Detail sudut credenza putih dengan top motif kayu membulat',
      'Tampak samping credenza laci putih dengan top kayu',
      'Credenza laci abu-abu muda dengan handle bulat kayu',
    ],
  },
  {
    slug: 'bangku-taman-kayu',
    title: 'Bangku Taman Kayu',
    category: 'lainnya',
    date: '2026-10-15',
    status: 'selesai',
    featured: false,
    igCode: 'Deg8yEckv5v',
    summary: 'Bangku taman kayu memanjang dengan meja kotak mengelilingi pohon.',
    alts: [
      'Bangku taman kayu memanjang dan meja kotak mengelilingi pohon di taman',
      'Bangku taman kayu dan meja pohon dilihat dari sisi jalan setapak',
      'Detail meja taman kayu mengelilingi batang pohon',
    ],
  },
  {
    slug: 'backdrop-ruang-pelayanan-kantor-desa',
    title: 'Backdrop Ruang Pelayanan Kantor Desa',
    category: 'interior-ruangan',
    date: '2026-10-15',
    status: 'selesai',
    featured: false,
    igCode: 'Deg8fstkrk-',
    summary: 'Backdrop motif marmer dengan lampu LED dan meja pelayanan kayu untuk kantor desa.',
    alts: [
      'Backdrop motif marmer dengan lampu LED dan meja pelayanan kayu di kantor desa',
      'Ruang pelayanan publik dengan backdrop marmer dan meja panjang motif kayu',
      'Backdrop ruang pelayanan desa dilihat dari samping',
      'Meja pelayanan kayu memanjang di depan backdrop marmer',
    ],
  },
  {
    slug: 'ranjang-tingkat-anak-lemari',
    title: 'Ranjang Tingkat Anak dengan Lemari',
    category: 'lainnya',
    date: '2026-10-15',
    status: 'proses',
    featured: false,
    igCode: 'Deg8L9bEnwA',
    summary: 'Ranjang tingkat anak dengan lemari pintu geser dan rak terbuka di bawahnya.',
    alts: [
      'Ranjang tingkat anak dengan lemari pintu geser dan rak terbuka, di workshop',
      'Lemari pintu geser dan rak di bawah ranjang tingkat, pintu dibuka',
      'Ranjang tingkat anak dengan pagar kayu dan rak bawah',
    ],
  },
  {
    slug: 'meja-barbershop-hitam',
    title: 'Meja Barbershop Hitam',
    category: 'rak-kabinet',
    date: '2026-10-15',
    status: 'selesai',
    featured: true,
    igCode: 'Deg71SektGR',
    summary: 'Kabinet barbershop hitam dengan dua laci, rak terbuka, dan pintu bawah.',
    alts: [
      'Kabinet meja barbershop hitam dengan dua laci, rak terbuka, dan pintu bawah',
      'Kabinet barbershop hitam dilihat dari samping',
      'Detail laci kabinet barbershop hitam dengan handle perak',
      'Laci kabinet barbershop hitam dalam keadaan terbuka',
    ],
  },
  {
    slug: 'set-kamar-backdrop-tv-panel-daun',
    title: 'Set Kamar: Backdrop TV & Panel Daun',
    category: 'interior-ruangan',
    date: '2026-10-05',
    status: 'selesai',
    featured: true,
    igCode: 'DeHXTY9kmSC',
    summary:
      'Backdrop TV motif marmer dengan LED, panel kisi kayu, headboard, dan panel relief daun.',
    alts: [
      'Backdrop TV motif marmer dengan lampu LED, rak samping, dan meja kayu memanjang',
      'Backdrop TV marmer dan panel kisi kayu dilihat dari samping',
      'Nakas kayu, headboard, dan panel kisi dengan lampu gantung bulat',
      'Panel relief motif daun dengan headboard dan lampu gantung',
      'Detail lampu gantung bulat di depan panel kisi dan relief daun',
    ],
  },
  {
    slug: 'meja-tv-minimalis-kayu-putih',
    title: 'Meja TV Minimalis Kayu-Putih',
    category: 'rak-kabinet',
    date: '2026-09-02',
    status: 'selesai',
    featured: true,
    igCode: 'Dcx8VSIEofz',
    summary: 'Meja TV panjang motif kayu dengan laci putih dan meja tambahan menyambung.',
    alts: [
      'Meja TV minimalis motif kayu dengan laci putih dan meja tambahan di ujung',
      'Meja TV kayu dengan laci putih dilihat dari depan',
      'Meja TV minimalis dan meja kecil menyambung di sudut ruangan',
      'Laci putih meja TV dalam keadaan terbuka',
      'Laci bawah meja TV dan laci meja tambahan terbuka',
      'Meja TV minimalis kayu-putih dilihat dari samping',
    ],
  },
  {
    slug: 'kamar-set-pink-estetik',
    title: 'Kamar Set Pink Estetik',
    category: 'interior-ruangan',
    date: '2026-08-28',
    status: 'selesai',
    featured: true,
    igCode: 'DcjZRiiEgzu',
    summary: 'Kamar set pink: headboard lengkung dengan LED, lemari pintu geser, dan meja rias.',
    alts: [
      'Kamar set pink dengan headboard lengkung berlampu LED dan lemari pintu geser',
      'Lemari pink pintu geser dengan rak putih di dalamnya',
      'Headboard lengkung motif marmer dengan lampu LED dan sandaran pink',
      'Meja rias pink dengan cermin oval berlampu dan rak kaca',
    ],
  },
  {
    slug: 'backdrop-tv-led-full-plafon',
    title: 'Backdrop TV LED Full Plafon',
    category: 'tv-panel-backdrop',
    date: '2026-08-22',
    status: 'selesai',
    featured: true,
    igCode: 'DcWEvNMEjlq',
    summary: 'Backdrop TV full plafon warna abu gelap dengan rak samping dan lampu LED hangat.',
    alts: [
      'Backdrop TV full plafon abu gelap dengan rak samping dan lampu LED hangat',
      'Backdrop TV LED dengan kabinet bawah dan panel motif marmer',
      'Backdrop TV full plafon dilihat dari depan',
      'Backdrop TV LED full plafon dilihat dari sudut ruangan',
      'Backdrop TV dan rak LED dilihat dari samping',
      'Detail kabinet bawah dan rak LED backdrop TV',
      'Rak samping backdrop TV dengan lampu LED',
      'Backdrop TV full plafon abu gelap dengan rak LED',
    ],
  },
  {
    slug: 'meja-rias-gantung-panel-kisi',
    title: 'Meja Rias Gantung dengan Panel Kisi',
    category: 'lainnya',
    date: '2026-08-21',
    status: 'selesai',
    featured: false,
    igCode: 'DcSNSTbkpoX',
    summary:
      'Meja rias gantung abu dengan cermin lengkung dan panel kisi kayu, menyatu dengan lemari.',
    alts: [
      'Meja rias gantung abu dengan cermin lengkung dan panel kisi kayu di samping lemari',
      'Meja rias gantung dan cermin lengkung di depan panel kisi kayu',
      'Detail meja rias gantung abu dengan laci',
    ],
  },
  {
    slug: 'wardrobe-walk-in-meja-rias-led',
    title: 'Wardrobe Walk-in dengan Meja Rias & LED',
    category: 'lemari-wardrobe',
    date: '2026-08-15',
    status: 'selesai',
    featured: true,
    igCode: 'DcD9TZaEnjR',
    summary: 'Wardrobe full plafon pintu kaca dengan meja rias, cermin LED, dan laci perhiasan.',
    alts: [
      'Wardrobe motif kayu dengan pintu kaca, meja rias, dan rak berlampu LED',
      'Wardrobe full plafon abu gelap dengan pintu kaca bingkai hitam',
      'Wardrobe pintu kaca terbuka dengan laci dan meja rias di dalamnya',
      'Meja rias wardrobe dengan cermin oval LED dan laci sekat perhiasan',
      'Wardrobe dengan rak putih di sisi kiri dan pintu kaca terbuka',
      'Laci sekat perhiasan dengan tutup kaca di meja rias wardrobe',
      'Laci-laci motif kayu di dalam wardrobe',
      'Cermin oval berlampu dan laci sekat di wardrobe',
    ],
  },
  {
    slug: 'kitchen-set-abu-top-marmer',
    title: 'Kitchen Set Abu Doff Top Marmer',
    category: 'kitchen-set',
    date: '2026-01-21',
    status: 'selesai',
    featured: true,
    igCode: 'DTxcjmIEuDA',
    summary:
      'Kitchen set atas-bawah abu doff dengan top motif marmer, rak aksen kayu, dan lemari kaca.',
    alts: [
      'Kitchen set atas-bawah abu doff dengan top motif marmer dan rak aksen kayu',
      'Kitchen set abu dengan rak piring dan laci terbuka',
      'Laci kitchen set abu dengan rak piring stainless',
      'Rak bumbu tarik dan laci kitchen set abu',
      'Kabinet atas kitchen set dengan rak aksen motif kayu',
      'Lemari kaca bingkai hitam di kitchen set atas',
      'Detail top motif marmer di kabinet bawah kitchen set',
      'Kitchen set abu doff top marmer dilihat dari samping',
    ],
  },
];

// Urut terbaru dulu
export const works: readonly Work[] = inputs
  .map(build)
  .sort((a, b) => b.date.localeCompare(a.date));

/** Ambil karya berdasarkan slug; gagalkan build kalau slug salah */
export function getWork(slug: string): Work {
  const work = works.find((w) => w.slug === slug);
  if (!work) throw new Error(`Karya ${slug} tidak ditemukan.`);
  return work;
}

export const getWorksByCategory = (slug: CategorySlug) => works.filter((w) => w.category === slug);
export const featuredWorks = works.filter((w) => w.featured && w.status === 'selesai');
