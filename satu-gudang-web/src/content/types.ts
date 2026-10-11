// Bentuk SEMUA teks situs. id.ts dan en.ts wajib memenuhi tipe ini (TypeScript menolak kunci yang hilang).
import type { MaterialId } from '@/data/materials';
import type { PackageId } from '@/data/packages';
import type { ProcessStepId } from '@/data/process';
import type { ProjectCategory, ProjectSlug } from '@/data/projects';
import type { ServiceId } from '@/data/services';

export type Locale = 'en' | 'id';

/** Teks pesan WhatsApp. Placeholder {nama} diganti oleh fillTemplate() di src/lib/whatsapp.ts */
export type WaTemplates = {
  general: string;
  consultation: string;
  /** {service} */
  service: string;
  /** {project} */
  project: string;
  /** {package} */
  bedroomPackage: string;
  material: string;
  design: string;
  sample: string;
};

export type SiteContent = {
  locale: Locale;
  /** Kode bahasa untuk atribut lang & og:locale */
  htmlLang: string;
  ogLocale: string;
  meta: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
  common: {
    skipToContent: string;
    mainMenu: string;
    tagline: string;
    freeConsultation: string;
    chatWhatsApp: string;
    languageSwitch: { label: string; target: string };
    themeToggle: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    previous: string;
    next: string;
    priceOnRequest: string;
    priceFrom: string;
    todoBadge: string;
  };
  nav: {
    about: string;
    design: string;
    services: string;
    work: string;
    packages: string;
    process: string;
    faq: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    /** 3 slide hero: gambar berganti otomatis, kalimat di bawah judul ikut berganti (siapa kami, visi, misi) */
    slides: readonly { label: string; text: string; imageAlt: string }[];
    slideNav: string;
    pause: string;
    play: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    pillars: readonly string[];
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    /** Fakta singkat; hanya isi dengan data yang benar */
    facts: readonly { value: string; label: string }[];
    values: readonly { title: string; text: string }[];
    cta: string;
    imageAlt: string;
    secondImageAlt: string;
  };
  /** Kata-kata pada pita teks berjalan */
  marquee: readonly string[];
  design: {
    eyebrow: string;
    title: string;
    lead: string;
    points: readonly string[];
    cta: string;
    note: string;
    /** alt per render, urutan sama dengan src/data/design.ts */
    alts: readonly string[];
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    items: Record<
      ServiceId,
      { title: string; summary: string; points: readonly string[]; imageAlt: string }
    >;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    lead: string;
    filterLabel: string;
    filters: Record<'all' | ProjectCategory, string>;
    categoryLabels: Record<ProjectCategory, string>;
    viewGallery: string;
    photos: string;
    askSimilar: string;
    galleryLabel: string;
    items: Record<
      ProjectSlug,
      {
        title: string;
        location: string;
        summary: string;
        scope: readonly string[];
        alts: readonly string[];
      }
    >;
  };
  packages: {
    eyebrow: string;
    title: string;
    lead: string;
    featuredBadge: string;
    includesLabel: string;
    cta: string;
    note: string;
    items: Record<
      PackageId,
      { name: string; forWho: string; includes: readonly string[]; imageAlt: string }
    >;
  };
  materials: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    note: string;
    sample: {
      title: string;
      text: string;
      cta: string;
      gallery: string;
      hint: string;
      alts: readonly [string, string, string];
    };
    items: Record<MaterialId, { name: string; detail: string; seenIn: string; imageAlt: string }>;
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Record<ProcessStepId, { title: string; text: string; imageAlt: string }>;
    beforeAfter: {
      title: string;
      before: string;
      after: string;
      beforeAlt: string;
      afterAlt: string;
    };
  };
  testimonials: {
    eyebrow: string;
    title: string;
    /** TODO: testimoni contoh, disembunyikan otomatis di build production */
    items: readonly { quote: string; name: string; role: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    items: readonly { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    steps: readonly string[];
    whatsappLabel: string;
    socialLabel: string;
    areaLabel: string;
    area: string;
  };
  footer: {
    blurb: string;
    servicesTitle: string;
    exploreTitle: string;
    contactTitle: string;
    rights: string;
  };
  notFound: { title: string; text: string; back: string };
  wa: WaTemplates;
};
