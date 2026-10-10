// Bentuk konten satu bahasa. id.ts dan en.ts wajib memenuhi tipe ini,
// jadi kalau satu teks ditambah di satu bahasa, TypeScript mengingatkan bahasa lainnya.
import type { ReelSlug, StorySlug } from '@/data/media';

export type Lang = 'id' | 'en';

export type Package = {
  name: string;
  /** Nama dalam aksara Arab, dekoratif */
  arabic: string;
  meaning: string;
  audience: string;
  features: string[];
  featured?: boolean;
};

export type Content = {
  lang: Lang;
  /** Path beranda bahasa ini */
  home: string;
  meta: { title: string; description: string; ogLocale: string };
  skip: string;
  nav: { href: string; label: string }[];
  navCta: string;
  menu: { open: string; close: string; label: string };
  theme: { toLight: string; toDark: string };
  switchLang: { href: string; label: string; aria: string };
  wa: { general: string; floating: string; newTab: string };

  hero: {
    eyebrow: string;
    title: [string, string, string];
    lead: string;
    cta: string;
    secondary: string;
    /** Keterangan lokasi tiap klip video hero */
    clips: Record<ReelSlug, string>;
    caption: string;
    scroll: string;
  };
  places_marquee: string[];
  manifesto: { label: string; before: string; middle: string; after: string };

  stories: {
    label: string;
    title: string;
    intro: string;
    items: Record<StorySlug, { title: string; place: string; blurb: string }>;
    photos: string;
    ask: string;
    /** Pesan WA; {story} diganti judul cerita */
    askMessage: string;
    endTitle: string;
  };

  places: {
    label: string;
    title: string;
    intro: string;
    items: { name: string; arabic: string; city: string; note: string }[];
    more: string;
  };

  reels: {
    label: string;
    title: string;
    intro: string;
    play: string;
    items: Record<ReelSlug, string>;
  };

  wall: { title: [string, string]; body: string };

  testimonials: {
    label: string;
    title: string;
    /** true = masih contoh: section hanya tampil saat npm run dev, disembunyikan di build production */
    sample: boolean;
    sampleNote: string;
    items: { quote: string; name: string; detail: string; story: StorySlug }[];
  };

  packages: {
    label: string;
    title: string;
    intro: string;
    price: string;
    popular: string;
    cta: string;
    /** Pesan WA; {package} diganti nama paket */
    message: string;
    custom: string;
    items: Package[];
  };

  process: { label: string; title: string; steps: { title: string; body: string }[] };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  closing: { title: [string, string]; body: string; cta: string };

  footer: {
    tagline: string;
    base: string;
    contact: string;
    follow: string;
    nav: string;
    rights: string;
  };
};
