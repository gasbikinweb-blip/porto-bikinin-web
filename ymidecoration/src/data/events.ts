// Data portofolio. Nama, venue, tanggal, dan kredit HANYA dari caption Instagram.
// Pemilik menyatakan semua pasangan mengizinkan fotonya tampil, jadi showFaces = true.
import generated from './images.generated.json';
import videoList from './videos.generated.json';

export const eventTypes = {
  wedding: 'Wedding',
  akad: 'Akad',
  engagement: 'Engagement',
  birthday: 'Ulang Tahun',
  other: 'Acara Lainnya',
} as const;
export type EventType = keyof typeof eventTypes;

export const palettes = [
  'Bold & Berwarna',
  'Merah & Putih',
  'Pastel',
  'Hijau & Kuning',
  'Terakota & Putih',
] as const;
export type Palette = (typeof palettes)[number];

export type EventImage = { src: string; thumb: string; width: number; height: number; alt: string };
export type Credit = { role: string; name: string };

type RawEvent = {
  slug: string;
  title: string;
  type: EventType;
  palette: Palette;
  paletteNote: string;
  venue?: string;
  date?: string;
  year?: number;
  concept: string;
  credits?: Credit[];
  featured?: boolean;
  showFaces: boolean;
  sourceFolders: string[];
  alts: string[];
};

export type EventVideo = { src: string; poster: string };
export type PortfolioEvent = Omit<RawEvent, 'alts'> & {
  images: EventImage[];
  cover: EventImage;
  video?: EventVideo;
};

const raw: RawEvent[] = [
  {
    slug: 'della-adil',
    title: 'Della & Adil',
    type: 'wedding',
    palette: 'Bold & Berwarna',
    paletteNote: 'Biru royal, oranye, dan kuning',
    venue: 'Gedung Dana Warih Pangestu',
    year: 2026,
    concept:
      'Intimate wedding dengan tirai biru royal dan oranye, untaian bunga oranye yang menggantung, serta rangkaian bunga biru dan kuning yang tumbuh liar di sisi pelaminan. Lorong masuk berbingkai tirai krem dan galeri foto pasangan menyambut tamu.',
    credits: [
      { role: 'Foto', name: '@madhani.story' },
      { role: 'WO', name: '@sora.moment' },
    ],
    featured: true,
    showFaces: true,
    sourceFolders: ['Folder 1'],
    alts: [
      'Lorong masuk bertirai krem dengan rangkaian bunga biru, oranye, dan kuning di kedua sisi',
      'Backdrop pelaminan tirai biru royal dan oranye dengan untaian bunga oranye menggantung',
      'Galeri foto pasangan berbingkai putih dihiasi bunga biru dan oranye',
      'Pasangan pengantin berdiri di depan backdrop tirai biru dan rangkaian bunga',
      'Pengantin berpose di pelaminan berbunga oranye dan biru',
      'Pengantin tersenyum menunjukkan cincin di depan tirai biru',
      'Rangkaian bunga biru dan kuning menghiasi jalur tamu',
      'Detail galeri foto pasangan dari balik dedaunan',
    ],
  },
  {
    slug: 'berlin-aziz',
    title: 'Berlin & Aziz',
    type: 'wedding',
    palette: 'Merah & Putih',
    paletteNote: 'Merah marun, merah menyala, dan putih',
    venue: 'et.space',
    date: '9 September 2026',
    year: 2026,
    concept:
      'Akad dan wedding intimate dengan panel lengkung putih bermonogram "AB", rangkaian bunga merah yang menjuntai, dan meja akad bertaplak putih yang dipenuhi bunga merah. Tirai krem di belakang memberi kesan hangat.',
    featured: true,
    showFaces: true,
    sourceFolders: ['Folder 2'],
    alts: [
      'Meja akad bertaplak putih dengan rangkaian bunga merah di depan panel lengkung putih',
      'Pengantin di depan panel lengkung bermonogram AB dengan bunga merah menjuntai',
      'Detail bunga merah di meja akad dengan kursi kayu',
      'Pengantin menunjukkan buku nikah di depan dekorasi bunga merah',
    ],
  },
  {
    slug: 'shinta-aufar',
    title: 'Shinta & Aufar',
    type: 'akad',
    palette: 'Pastel',
    paletteNote: 'Biru muda, putih, dan kuning lembut',
    venue: 'Stay.vie',
    year: 2025,
    concept:
      'Akad bernuansa biru muda dan putih dengan backdrop putih yang dipenuhi bunga biru, payung kertas putih, dan aksen kuning. Papan "Welcome" berbingkai lengkung dan galeri foto pasangan menyambut tamu di area greenhouse.',
    credits: [
      { role: 'Foto', name: '@_storymylifee_' },
      { role: 'MUA', name: '@alsalman_mua' },
    ],
    featured: true,
    showFaces: true,
    sourceFolders: ['Folder 3'],
    alts: [
      'Papan Welcome berbingkai lengkung dengan rangkaian bunga biru dan kuning',
      'Pengantin di depan rangkaian bunga biru dan payung kertas putih',
      'Galeri foto pasangan dihiasi bunga biru dan kuning di area greenhouse',
      'Pengantin berdiri di depan backdrop putih penuh bunga biru muda',
      'Pengantin di depan backdrop biru dan putih dengan payung kertas',
      'Pengantin berpose di pelaminan bernuansa biru pastel',
      'Pengantin bersama buket bunga biru di depan backdrop putih',
      'Prosesi akad di meja dengan latar bunga biru dan putih',
      'Keluarga dalam prosesi akad di depan dekorasi biru pastel',
    ],
  },
  {
    slug: 'dita-iqbal',
    title: 'Dita & Iqbal',
    type: 'engagement',
    palette: 'Pastel',
    paletteNote: 'Pink, biru muda, dan putih',
    venue: 'Sult Cafe',
    year: 2024,
    concept:
      'Engagement dengan panel lengkung putih bertuliskan nama pasangan, dikelilingi bunga pink dan biru muda serta rangkaian bunga yang menggantung dari plafon. Dua kursi putih berdiri di atas karpet bermotif.',
    credits: [
      { role: 'Foto', name: '@ourme.moriesid' },
      { role: 'MUA', name: '@maziyan_makeup' },
    ],
    showFaces: true,
    sourceFolders: ['Folder 4'],
    alts: [
      'Panel lengkung putih dengan bunga pink dan biru serta dua kursi putih',
      'Dekorasi engagement bernuansa pastel dengan bunga menggantung dari plafon',
    ],
  },
  {
    slug: 'putri-luthfi',
    title: 'Putri & Luthfi',
    type: 'engagement',
    palette: 'Hijau & Kuning',
    paletteNote: 'Hijau daun, kuning, dan putih',
    date: '27 September 2026',
    year: 2026,
    concept:
      'Engagement bernuansa taman dengan rangkaian dedaunan hijau, bunga kuning, dan anggrek putih yang tumbuh rimbun dari dua sisi, di bawah langit-langit berlukis awan senja.',
    showFaces: true,
    sourceFolders: ['2026-10-12_DeYK-MbCwuc (frame video)'],
    alts: [
      'Rangkaian dedaunan hijau dan bunga kuning di bawah langit-langit berlukis awan',
      'Detail anggrek putih dan bunga kuning di antara dedaunan',
      'Sudut rangkaian bunga kuning dan dedaunan rimbun',
    ],
  },
  {
    slug: 'nina-andre',
    title: 'Nina & Andre',
    type: 'engagement',
    palette: 'Pastel',
    paletteNote: 'Pink, peach, dan putih',
    year: 2023,
    concept:
      'Engagement dengan panel lengkung putih dan pink bertuliskan nama pasangan, bunga pink dan peach di kedua sisi, serta dua kursi kayu untuk pasangan.',
    showFaces: true,
    sourceFolders: ['Folder 5'],
    alts: [
      'Pasangan di depan panel lengkung pink dengan rangkaian bunga pink dan peach',
      'Pasangan duduk di kursi kayu di depan dekorasi pink',
      'Pasangan berpose di depan backdrop pink dan putih',
    ],
  },
  {
    slug: 'felix-hana',
    title: 'Felix & Hana',
    type: 'engagement',
    palette: 'Terakota & Putih',
    paletteNote: 'Oranye terakota, putih, dan krem',
    venue: 'Sult Cafe',
    year: 2024,
    concept:
      'Engagement hangat dengan panel lengkung putih bertuliskan nama pasangan, rangkaian bunga kering oranye terakota dan putih di kedua sisi, serta kursi pasangan di tengah panggung kecil.',
    credits: [{ role: 'Foto', name: '@oxxyphotography' }],
    showFaces: true,
    sourceFolders: ['Folder 10'],
    alts: [
      'Pasangan duduk di depan panel lengkung putih dengan bunga oranye terakota',
      'Pasangan tersenyum menunjukkan cincin di depan dekorasi oranye dan putih',
      'Pasangan berpose dengan buket bunga kering di depan rangkaian terakota',
      'Pasangan bersama keluarga di depan panel lengkung putih',
    ],
  },
  {
    slug: 'dodo-henti',
    title: 'Dodo & Henti',
    type: 'engagement',
    palette: 'Pastel',
    paletteNote: 'Putih, krem, dan biru lembut',
    year: 2023,
    concept:
      'Engagement sederhana namun rapi: panel lengkung putih bertuliskan nama, bunga biru dan putih di kaki panel, untaian bunga dari plafon, dan kursi kayu untuk pasangan. Paket dekorasi hemat yang tetap terlihat mewah.',
    credits: [{ role: 'Foto', name: '@bluudz' }],
    showFaces: true,
    sourceFolders: ['Folder 8'],
    alts: [
      'Pasangan berdiri di ruangan dengan panel lengkung putih dan bunga biru',
      'Pasangan saling menatap di depan dekorasi lengkung putih dan biru',
    ],
  },
  {
    slug: 'lamaran-taman-pastel',
    title: 'Lamaran Taman Pastel',
    type: 'engagement',
    palette: 'Pastel',
    paletteNote: 'Pink, biru, dan hijau daun',
    year: 2022,
    concept:
      'Dekorasi lamaran bergaya taman dengan rangkaian mawar pink dan biru yang merambat di rangka kayu, dedaunan hijau segar, dan kursi bambu untuk pasangan.',
    showFaces: true,
    sourceFolders: ['Folder 6'],
    alts: ['Rangkaian mawar pink dan biru dengan dedaunan hijau di atas kursi bambu'],
  },
  {
    slug: 'lamaran-warna-warni',
    title: 'Lamaran Warna-warni',
    type: 'engagement',
    palette: 'Bold & Berwarna',
    paletteNote: 'Merah, oranye, pink, dan putih',
    year: 2023,
    concept:
      'Lamaran ceria dengan rangkaian bunga merah, oranye, dan pink, papan welcome berbingkai emas, dua kursi kayu, serta karpet bermotif. Buket mawar dan lili putih menghiasi meja seserahan.',
    showFaces: true,
    sourceFolders: ['Folder 7'],
    alts: [
      'Papan welcome berbingkai emas dengan rangkaian bunga merah, oranye, dan pink',
      'Rangkaian mawar putih dan lili di samping kursi kayu',
    ],
  },
  {
    slug: 'launching-cafe-pink',
    title: 'Launching Produk di Cafe',
    type: 'other',
    palette: 'Pastel',
    paletteNote: 'Pink, putih, dan peach',
    year: 2023,
    concept:
      'Dekorasi acara launching brand kecantikan di cafe Surabaya: panel lengkung pink bertuliskan nama produk, diapit rangkaian bunga pink, putih, dan anggrek yang menjulang. Bukti YMI juga menangani acara di luar pernikahan.',
    showFaces: true,
    sourceFolders: ['Folder 9'],
    alts: [
      'Panel lengkung pink diapit rangkaian bunga pink di area cafe',
      'Close-up panel lengkung pink dengan bunga pink dan anggrek putih',
    ],
  },
  {
    slug: 'hana-felix-wedding',
    title: 'Hana & Felix',
    type: 'wedding',
    palette: 'Pastel',
    paletteNote: 'Putih, hijau daun, dan cahaya lilin',
    venue: 'Rooftop Maxone Tidar',
    date: '24 Agustus 2024',
    year: 2024,
    concept:
      'Wedding rooftop saat senja dengan lengkung besar bunga putih, papan welcome bening berhias bunga putih dan lilin, serta meja tamu bundar dengan rangkaian bunga putih di tiap meja.',
    showFaces: true,
    sourceFolders: ['Highlight Hana & Felix'],
    alts: [
      'Pasangan di depan lengkung besar bunga putih saat senja',
      'Papan welcome bening dengan bunga putih dan lilin di koridor rooftop',
      'Tamu duduk di meja bundar berhias bunga putih',
    ],
  },
  {
    slug: 'kada-elen',
    title: 'Kada & Elen',
    type: 'engagement',
    palette: 'Merah & Putih',
    paletteNote: 'Putih, emas, dan karpet merah',
    date: '21 April 2024',
    year: 2024,
    concept:
      'Engagement di rumah dengan rangka lengkung emas berhias bunga putih dan dedaunan, papan welcome lengkung, serta dua kursi kayu berbantal putih di atas karpet merah bermotif.',
    showFaces: true,
    sourceFolders: ['Highlight Kada & Elen'],
    alts: [
      'Rangka lengkung emas dengan bunga putih dan dua kursi kayu',
      'Dua kursi kayu berbantal putih di atas karpet merah bermotif',
    ],
  },
  {
    slug: 'ivon-bryan',
    title: 'Ivon & Bryan',
    type: 'engagement',
    palette: 'Bold & Berwarna',
    paletteNote: 'Pink, merah, putih, dan lampion warna-warni',
    date: '13 April 2024',
    year: 2024,
    concept:
      'Engagement di restoran dengan papan welcome berbunga pink dan merah, kursi pasangan bergaya emas, serta lampion kertas warna-warni yang menggantung di sepanjang ruangan.',
    showFaces: true,
    sourceFolders: ['Highlight Ivon & Bryan'],
    alts: [
      'Papan welcome dengan rangkaian bunga putih, pink, dan merah',
      'Pasangan di depan backdrop bunga merah dan kursi emas',
    ],
  },
  {
    slug: 'novi-arif',
    title: 'Novi & Arif',
    type: 'wedding',
    palette: 'Pastel',
    paletteNote: 'Pink, putih, dan hijau',
    concept:
      'Wedding di greenhouse kaca dengan backdrop putih yang dipenuhi bunga pink dan putih, payung kertas, dan rangkaian bunga di sepanjang jalur pengantin.',
    credits: [{ role: 'WO', name: 'Sukses Manten' }],
    showFaces: true,
    sourceFolders: ['Highlight Novi & Arif'],
    alts: [
      'Pengantin dan keluarga di depan backdrop bunga pink di greenhouse',
      'Prosesi keluarga di depan dekorasi pink dan putih',
    ],
  },
];

const images = generated.events as Record<string, Omit<EventImage, 'alt'>[]>;

export const events: PortfolioEvent[] = raw.map(({ alts, ...e }) => {
  const list = (images[e.slug] ?? []).map((img, i) => ({ ...img, alt: alts[i] ?? e.title }));
  const cover = list[0];
  if (!cover)
    throw new Error(`Foto acara ${e.slug} belum dibuat. Jalankan npm run optimize-images.`);
  const video = (videoList as Record<string, EventVideo>)[e.slug];
  return { ...e, images: list, cover, ...(video ? { video } : {}) };
});

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

export const hero = generated.hero;
