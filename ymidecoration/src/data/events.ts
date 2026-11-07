// Data portofolio. Nama, venue, tanggal, dan kredit HANYA dari caption Instagram.
// Pemilik menyatakan semua pasangan mengizinkan fotonya tampil, jadi showFaces = true.
import generated from './images.generated.json';

export const eventTypes = {
  wedding: 'Wedding',
  akad: 'Akad',
  engagement: 'Engagement',
  birthday: 'Ulang Tahun',
  other: 'Acara Lainnya',
} as const;
export type EventType = keyof typeof eventTypes;

export const palettes = ['Bold & Berwarna', 'Merah & Putih', 'Pastel', 'Hijau & Kuning'] as const;
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

export type PortfolioEvent = Omit<RawEvent, 'alts'> & { images: EventImage[]; cover: EventImage };

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
];

const images = generated.events as Record<string, Omit<EventImage, 'alt'>[]>;

export const events: PortfolioEvent[] = raw.map(({ alts, ...e }) => {
  const list = (images[e.slug] ?? []).map((img, i) => ({ ...img, alt: alts[i] ?? e.title }));
  const cover = list[0];
  if (!cover)
    throw new Error(`Foto acara ${e.slug} belum dibuat. Jalankan npm run optimize-images.`);
  return { ...e, images: list, cover };
});

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

export const hero = generated.hero;
