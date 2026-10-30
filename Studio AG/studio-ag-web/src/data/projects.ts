// Data proyek. Sumber: caption Instagram (assets/) + Portfolio.pdf.
// Nama klien hanya inisial. Klien korporat tidak disebut namanya.
// Tidak ada harga, durasi, merek, atau testimoni karangan.
import { generatedImages, type GeneratedImage } from './images.generated';

export type Category = 'Hunian' | 'Kamar Tidur' | 'Kantor' | 'Komersial' | 'Furnitur Custom';

export type ProjectImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  kind: GeneratedImage['kind'];
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  propertyType: string;
  location?: string;
  scope: string[];
  style?: string;
  year?: number;
  summary: string;
  cover: ProjectImage;
  images: ProjectImage[];
  featured: boolean;
};

type ProjectInput = Omit<Project, 'cover' | 'images'> & {
  /** Deskripsi dasar untuk teks alt tiap gambar */
  alt: string;
  /** Teks alt khusus per nomor gambar (opsional) */
  altOverrides?: Record<number, string>;
};

const kindLabel: Record<GeneratedImage['kind'], string> = {
  foto: 'foto hasil pengerjaan',
  render: 'visual desain 3D',
  before: 'kondisi sebelum',
  after: 'hasil sesudah',
  workshop: 'proses di workshop',
};

function withImages(p: ProjectInput): Project {
  const raw = generatedImages[p.slug] ?? [];
  const images = raw.map((img, i) => ({
    ...img,
    alt: p.altOverrides?.[i + 1] ?? `${p.alt}, ${kindLabel[img.kind]} ${i + 1}`,
  }));
  if (!images[0])
    throw new Error(`Proyek ${p.slug} belum punya gambar. Jalankan npm run optimize-images.`);
  const { alt, altOverrides, ...rest } = p;
  void alt;
  void altOverrides;
  return { ...rest, images, cover: images[0] };
}

const input: ProjectInput[] = [
  {
    slug: 'a-f-house',
    title: 'A+F House',
    category: 'Hunian',
    propertyType: 'Rumah tinggal',
    location: 'Pavillion Residence, BSD',
    scope: ['Desain interior', 'Pekerjaan sipil', 'Build furnitur', 'Ruang kerja', 'Area laundry'],
    style: 'Minimalist warm',
    summary:
      'Renovasi dari pekerjaan sipil hingga interior. Layout yang terbatas ditata ulang agar setiap area terasa lebih lega dan fungsional, dengan dominasi elemen kayu pada foyer dan ruang keluarga, ruang kerja serbaguna di lantai dua, serta area laundry yang terang dan berventilasi baik.',
    alt: 'Interior rumah A+F di Pavillion Residence BSD',
    featured: true,
  },
  {
    slug: 'b-a-house',
    title: 'B+A House',
    category: 'Hunian',
    propertyType: 'Rumah tinggal',
    // TODO: konfirmasi kota; caption IG menyebut Singkawang, Kalimantan Barat
    location: 'Lotus Garden Residence, Singkawang',
    scope: [
      'Desain interior',
      'Build furnitur',
      'Ruang keluarga',
      'Kamar utama',
      'Kitchen & home bar',
    ],
    style: 'Modern timeless',
    summary:
      'Interior bernuansa hangat dan intim yang direalisasikan selaras dengan visual 3D yang disepakati. Kitchen dan bar dirancang menjadi satu kesatuan dengan zonasi yang jelas, dipadukan permainan bentuk lengkung dan rak display berlampu.',
    alt: 'Interior rumah B+A di Lotus Garden Residence',
    featured: true,
  },
  {
    slug: 'e-s-bedroom',
    title: 'E+S Bedroom',
    category: 'Kamar Tidur',
    propertyType: 'Kamar tidur',
    location: 'Casa Jardin Residence',
    scope: ['Desain interior', 'Build furnitur', 'Wardrobe', 'Work desk & vanity'],
    style: 'Modern, minimalist & clean',
    summary:
      'Kamar dengan luasan terbatas yang tetap terasa lega. Wardrobe, work desk, vanity dengan pencahayaan maksimal, storage, dan display disusun berdasarkan kebutuhan dengan tone material yang ringan.',
    alt: 'Kamar tidur E+S di Casa Jardin Residence',
    altOverrides: {
      4: 'Kamar tidur E+S sebelum direnovasi: dinding polos dengan kasur dan tangga lipat',
      5: 'Kamar tidur E+S sesudah direnovasi: wardrobe putih built-in dan tempat tidur',
    },
    featured: true,
  },
  {
    slug: 'd-a-park-serpong',
    title: 'D+A Home',
    category: 'Kamar Tidur',
    propertyType: 'Master bedroom & kamar anak',
    location: 'Park Serpong, Tangerang',
    scope: ['Desain interior', 'Master bedroom', 'Kamar anak'],
    style: 'Modern & minimalist',
    summary:
      'Dua kamar dengan luasan terbatas. Setiap elemen dirancang seefisien mungkin tanpa mengorbankan kenyamanan dan sirkulasi, dengan permainan garis tegas, material kayu, dan tone netral yang terang.',
    alt: 'Desain kamar D+A di Park Serpong',
    featured: true,
  },
  {
    slug: 't-kitchen-living',
    title: 'T Kitchen & Living',
    category: 'Hunian',
    propertyType: 'Kitchen & ruang keluarga',
    location: 'Jati Melati, Bekasi',
    scope: ['Renovasi', 'Kitchen set custom', 'Backdrop TV'],
    style: 'Modern minimalist',
    summary:
      'Kitchen dan ruang keluarga yang paling sering digunakan sehari-hari, dirancang dengan layout efisien, material bernuansa hangat, dan pencahayaan alami.',
    alt: 'Kitchen set dan ruang keluarga di Jati Melati Bekasi',
    featured: true,
  },
  {
    slug: 'kantor-jatiwarna',
    title: 'Kantor Jatiwarna',
    category: 'Kantor',
    propertyType: 'Kantor',
    location: 'Jatiwarna, Bekasi',
    scope: ['Renovasi kantor', 'Desain interior', 'Partisi', 'Furnitur kantor'],
    style: 'Modern & clean',
    summary:
      'Interior kantor dengan garis-garis tegas dan finishing yang selaras, menghadirkan suasana kerja yang bersih, nyaman, dan produktif. Partisi dirancang untuk mempertahankan identitas kantor.',
    alt: 'Interior kantor di Jatiwarna Bekasi',
    featured: true,
  },
  {
    slug: 'a-v-living-room',
    title: 'A+V Living Room',
    category: 'Hunian',
    propertyType: 'Ruang tamu',
    location: 'Pucuk Merah Garden Residence',
    scope: ['Desain interior', 'Backdrop TV', 'Kabinet display'],
    style: 'Modern elegant',
    summary:
      'TV backdrop dan kabinet sebagai focal point ruang tamu, sekaligus menampung koleksi dan dekorasi milik klien. Beberapa material dan finishing dikomposisikan secara proporsional.',
    alt: 'Backdrop TV dan kabinet ruang tamu A+V',
    featured: true,
  },
  {
    slug: 's-r-kids-bedroom',
    title: "S+R Kid's Bedroom",
    category: 'Kamar Tidur',
    propertyType: 'Kamar anak',
    location: 'Pluit, Jakarta Utara',
    scope: ['Desain interior', 'Area belajar', 'Rak display'],
    summary: 'Kamar anak dengan area belajar dan rak display koleksi yang menyatu dengan dinding.',
    alt: 'Desain kamar anak S+R di Pluit Jakarta Utara',
    featured: true,
  },
  {
    slug: 'ruang-direksi-kuningan',
    title: 'Ruang Direksi Kuningan',
    category: 'Kantor',
    propertyType: 'Kantor',
    location: 'Kuningan, Jakarta Selatan',
    scope: ['Desain interior', 'Private room', 'Meeting room'],
    summary:
      'Desain private room dan meeting room dengan rak display, storage built-in, dan partisi.',
    alt: 'Desain ruang direksi dan meeting room di Kuningan',
    featured: false,
  },
  {
    slug: 'furnitur-kantor-custom',
    title: 'Meja Kerja Custom',
    category: 'Furnitur Custom',
    propertyType: 'Kantor',
    location: 'Kuningan & IDX Office Tower, Jakarta',
    scope: ['Design & build', 'Meja kerja BOD & direktur', 'Side table kantor'],
    summary:
      'Meja kerja custom untuk ruang BOD dan direktur, serta side table kantor, diproduksi di workshop kami dan dipasang di lokasi.',
    alt: 'Meja kerja dan side table kantor custom',
    featured: false,
  },
  {
    slug: 'kafe-singkawang',
    title: 'Kafe & Eatery',
    category: 'Komersial',
    propertyType: 'Kafe',
    location: 'Singkawang',
    scope: ['Desain interior'],
    summary: 'Desain interior kafe dengan area bar, display menu, dan area duduk bernuansa hangat.',
    alt: 'Desain interior kafe di Singkawang',
    featured: false,
  },
  {
    slug: 'kamar-ruang-kerja',
    title: 'Kamar & Ruang Kerja',
    category: 'Kamar Tidur',
    propertyType: 'Kamar tidur',
    // TODO: nama proyek & lokasi belum ada di caption
    scope: ['Desain interior', 'Wardrobe', 'Meja kerja'],
    summary:
      'Berawal dari kebiasaan owner, setiap sudut dan furnitur dieksplorasi untuk memaksimalkan fungsi ruang yang terbatas, dengan material yang lebih hangat.',
    alt: 'Desain kamar tidur dengan meja kerja dan wardrobe',
    featured: false,
  },
];

export const projects: Project[] = input.map(withImages);

export const categories: Category[] = [
  'Hunian',
  'Kamar Tidur',
  'Kantor',
  'Komersial',
  'Furnitur Custom',
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);

export const siteImages = generatedImages._situs ?? [];
export const siteImage = (name: string) => siteImages.find((i) => i.src.endsWith(`/${name}.webp`));
