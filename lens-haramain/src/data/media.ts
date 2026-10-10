// Data foto & video. Teks yang tampil (judul, deskripsi) ada di src/content/{id,en}.ts
// supaya dua bahasa tetap sinkron; di sini hanya file, ukuran, dan alt.
import type { Lang } from '@/content/types';

type Text = Record<Lang, string>;

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: Text;
};

export type StorySlug =
  | 'teduh-di-nabawi'
  | 'rindu-madinah'
  | 'senja-di-bukit-makkah'
  | 'berdua-di-baitullah';

export type Story = {
  slug: StorySlug;
  photos: Photo[];
};

// Ukuran = hasil WebP di public/stories (lebar maks 1600px)
const tall = { width: 1440, height: 1920 }; // 3:4
const big = { width: 1600, height: 2133 }; // 3:4
const ig = { width: 512, height: 640 }; // 4:5 (foto asli kecil dari Instagram)

const p = (slug: StorySlug, n: number, size: { width: number; height: number }, alt: Text): Photo => ({
  src: `/stories/${slug}/${String(n).padStart(2, '0')}.webp`,
  ...size,
  alt,
});

export const stories: Story[] = [
  {
    slug: 'senja-di-bukit-makkah',
    photos: [
      p('senja-di-bukit-makkah', 1, ig, {
        id: 'Pasangan duduk di atas karpet merah di bukit saat senja, menara jam Makkah di belakang',
        en: 'Couple sitting on a red rug on a hilltop at sunset, the Makkah clock tower behind them',
      }),
      p('senja-di-bukit-makkah', 2, ig, {
        id: 'Pasangan bergandengan membawa lentera di depan menara jam Makkah',
        en: 'Couple holding hands with lanterns in front of the Makkah clock tower',
      }),
      p('senja-di-bukit-makkah', 3, ig, {
        id: 'Kolase pasangan di bebatuan bukit dengan latar kota Makkah',
        en: 'Collage of the couple on the rocky hill overlooking Makkah',
      }),
      p('senja-di-bukit-makkah', 4, ig, {
        id: 'Pasangan berdiri bersandar punggung, langit jingga dan menara jam',
        en: 'Couple standing back to back under an orange sky and the clock tower',
      }),
      p('senja-di-bukit-makkah', 5, ig, {
        id: 'Pasangan di puncak bukit berlangit biru dengan rumput kering',
        en: 'Couple on the hilltop under a blue sky with dry grass',
      }),
      p('senja-di-bukit-makkah', 6, ig, {
        id: 'Kolase pasangan di atas karpet dan berdiri di bukit saat senja',
        en: 'Collage of the couple on the rug and standing on the hill at dusk',
      }),
    ],
  },
  {
    slug: 'teduh-di-nabawi',
    photos: [
      p('teduh-di-nabawi', 1, big, {
        id: 'Perempuan berhijab cokelat duduk di karpet di bawah payung raksasa Masjid Nabawi',
        en: 'Woman in a brown hijab sitting on the carpet beneath the giant umbrellas of Masjid an-Nabawi',
      }),
      p('teduh-di-nabawi', 2, big, {
        id: 'Halaman album bertajuk Moment: tiga foto di pelataran Masjid Nabawi',
        en: 'Album page titled Moment: three photos in the courtyard of Masjid an-Nabawi',
      }),
      p('teduh-di-nabawi', 3, big, {
        id: 'Halaman album Madinah dengan kubah hijau dan payung Nabawi',
        en: 'Madinah album page with the Green Dome and the Nabawi umbrellas',
      }),
    ],
  },
  {
    slug: 'berdua-di-baitullah',
    photos: [
      p('berdua-di-baitullah', 1, ig, {
        id: 'Pasangan saling menatap dengan latar menara Masjidil Haram',
        en: 'Couple facing each other with the minarets of Masjid al-Haram behind',
      }),
      p('berdua-di-baitullah', 2, ig, {
        id: 'Pasangan berpakaian putih berdiri di pelataran Masjidil Haram',
        en: 'Couple in white standing in the courtyard of Masjid al-Haram',
      }),
      p('berdua-di-baitullah', 3, ig, {
        id: 'Pasangan tersenyum di depan menara dan pintu Masjidil Haram',
        en: 'Couple smiling in front of the minarets and gate of Masjid al-Haram',
      }),
      p('berdua-di-baitullah', 4, ig, {
        id: 'Pasangan bergandengan di eskalator dengan gerbang Abraj Al-Bait di atas',
        en: 'Couple holding hands on an escalator beneath the Abraj Al-Bait gate',
      }),
    ],
  },
  {
    slug: 'rindu-madinah',
    photos: [
      p('rindu-madinah', 1, tall, {
        id: 'Perempuan berbusana dusty pink melambai di pelataran Masjid Nabawi',
        en: 'Woman in dusty pink waving in the courtyard of Masjid an-Nabawi',
      }),
      p('rindu-madinah', 2, tall, {
        id: 'Perempuan berkacamata hitam di bawah payung Nabawi saat matahari terbit',
        en: 'Woman in sunglasses beneath the Nabawi umbrellas at sunrise',
      }),
      p('rindu-madinah', 3, tall, {
        id: 'Perempuan membentuk hati dengan tangan ke arah kubah hijau',
        en: 'Woman making a heart with her hands towards the Green Dome',
      }),
      p('rindu-madinah', 4, tall, {
        id: 'Potret perempuan di bawah payung Nabawi yang terbuka',
        en: 'Portrait of the woman beneath the open Nabawi umbrellas',
      }),
    ],
  },
];

export const getStory = (slug: StorySlug) => stories.find((s) => s.slug === slug)!;

/** Foto ke-n (mulai 0) dari sebuah cerita; build gagal bila indeks salah */
export function photo(slug: StorySlug, n: number): Photo {
  const found = getStory(slug).photos[n];
  if (!found) throw new Error(`Foto ${n} tidak ada di cerita ${slug}`);
  return found;
}

export type ReelSlug =
  | 'senja-berdua'
  | 'rindu-kembali'
  | 'hati-tenang-jiwa-pulang'
  | 'langkah-di-tanah-haram'
  | 'berlandaskan-iman'
  | 'berdampingan-di-rumah-nya';

// Video vertikal 9:16 di public/videos, sampul di public/posters
export const reels: ReelSlug[] = [
  'senja-berdua',
  'rindu-kembali',
  'hati-tenang-jiwa-pulang',
  'langkah-di-tanah-haram',
  'berlandaskan-iman',
  'berdampingan-di-rumah-nya',
];

// Foto untuk daftar lokasi (urutan sama dengan content.places.items)
export const placePhotos: Photo[] = [
  photo('teduh-di-nabawi', 0),
  photo('rindu-madinah', 2),
  photo('berdua-di-baitullah', 1),
  photo('berdua-di-baitullah', 3),
  photo('senja-di-bukit-makkah', 0),
];
