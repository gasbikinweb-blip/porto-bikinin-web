// Video dari Instagram @nadira.furniture, dipotong maks. 23 detik (ffmpeg) ke public/stories/.
// Hanya video tanpa wajah orang.

export type StoryTag = 'Kitchen Set' | 'Lemari & Kamar' | 'Proses';

export type Story = {
  slug: string;
  tag: StoryTag;
  title: string;
  place?: string;
  /** true = ada /stories/[slug].mp4, poster di /stories/[slug].webp */
  video: boolean;
  /** true = video punya suara */
  sound: boolean;
  alt: string;
};

const BDG = 'Bandung';

export const stories: readonly Story[] = [
  {
    slug: 'kitchen-set-tosca',
    tag: 'Kitchen Set',
    title: 'Kitchen Set Tosca & Kayu',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video kitchen set warna tosca dengan rak lengkung kayu',
  },
  {
    slug: 'kitchen-set-abu-kayu',
    tag: 'Kitchen Set',
    title: 'Kitchen Set Abu & Kayu',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video kitchen set abu dengan lampu LED dan laci',
  },
  {
    slug: 'kitchen-set-lampu-kabinet',
    tag: 'Kitchen Set',
    title: 'Kitchen Set Kabinet Kaca LED',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video kitchen set hitam dengan kabinet kaca berlampu',
  },
  {
    slug: 'kitchen-island-modern',
    tag: 'Kitchen Set',
    title: 'Kitchen Island Modern',
    place: BDG,
    video: true,
    sound: false,
    alt: 'Video kitchen set modern dengan meja island',
  },
  {
    slug: 'kitchen-set-marmer-hitam',
    tag: 'Kitchen Set',
    title: 'Kitchen Set & Minibar',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video kitchen set backsplash marmer hitam dan minibar kisi',
  },
  {
    slug: 'kitchen-set-hijau-minibar',
    tag: 'Kitchen Set',
    title: 'Kitchen Set Hijau & Minibar',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video kitchen set hijau dengan minibar kisi kayu',
  },
  {
    slug: 'lemari-kaca-backdrop',
    tag: 'Lemari & Kamar',
    title: 'Lemari Kaca & Backdrop',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video lemari kaca putih dan backdrop motif marmer',
  },
  {
    slug: 'lemari-meja-belajar',
    tag: 'Lemari & Kamar',
    title: 'Lemari & Meja Belajar',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video lemari putih dengan meja belajar di kamar',
  },
  {
    slug: 'meja-rias-led',
    tag: 'Lemari & Kamar',
    title: 'Meja Rias Cermin LED',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video meja rias putih dengan cermin LED',
  },
  {
    slug: 'tangga-laci',
    tag: 'Lemari & Kamar',
    title: 'Tangga Laci Kamar Anak',
    place: BDG,
    video: true,
    sound: true,
    alt: 'Video tangga dengan laci penyimpanan untuk ranjang susun',
  },
  {
    slug: 'proses-kitchen-set',
    tag: 'Proses',
    title: 'Dari Dapur Kosong',
    place: BDG,
    video: true,
    sound: false,
    alt: 'Video proses pemasangan kitchen set dari dapur kosong',
  },
];
