import type { L, Lang } from '@/i18n';
import manifest from './images.generated.json';
import { getCategory } from './categories';
import { locationEn, projectFacts } from './project-facts';
import type { CategorySlug, ImageKind, Project, ProjectImage, ServiceSlug } from './types';

/*
 * Data proyek.
 * - Foto & ukuran diambil otomatis dari `images.generated.json` (hasil `npm run optimize-images`).
 * - Metadata (judul, kategori, lingkup, dll.) diatur di `meta` di bawah.
 * - Folder baru di assets/ tanpa entri `meta` tetap tampil dengan nilai default (kategori "residensial").
 * JANGAN mengarang tahun, luas, atau nama klien. Isi hanya jika sudah dikonfirmasi.
 */

interface ProjectMeta {
  title?: string;
  category: CategorySlug;
  location?: string;
  scope: string[];
  services: ServiceSlug[];
  year?: number;
  featured?: boolean;
  /** Jenis semua gambar di proyek ini (default 'foto') */
  kind?: ImageKind;
  /** Jenis per gambar, key = nama file hasil optimasi (mis. '03') */
  kinds?: Record<string, ImageKind>;
  /** Alt teks per gambar, key = nama file hasil optimasi ('cover', '01', ...) */
  alts?: Record<string, string>;
  /** Deskripsi singkat ruang yang tampil pada alt default */
  subject: string | L;
  summary?: string;
}

// TODO: verifikasi lingkup pekerjaan & lokasi tiap proyek. Lokasi hanya tingkat kota.
const meta: Record<string, ProjectMeta> = {
  'aa-house': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior rumah tinggal',
  },
  'al-house': {
    category: 'interior',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior rumah tinggal',
  },
  'altuera-tower-southgate': {
    title: 'Altuera Tower at Southgate',
    category: 'residensial',
    location: 'Jakarta Selatan', // TODO: verifikasi
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior unit apartemen',
  },
  'ap-house': {
    category: 'residensial',
    scope: ['Desain Interior'],
    services: ['desain-interior'],
    subject: 'interior rumah tinggal',
  },
  'gr-kost': {
    category: 'komersial',
    scope: ['Desain Interior', 'Build', 'Property Management'], // TODO: verifikasi
    services: ['desain-interior', 'property-management', 'kontraktor'],
    featured: true,
    subject: 'interior kamar kost',
  },
  'im-house': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior rumah tinggal',
  },
  'j-house': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior rumah tinggal',
  },
  'kj-house': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior rumah tinggal',
  },
  'marigold-tower': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior unit apartemen',
  },
  'menteng-park-apartment': {
    category: 'interior',
    location: 'Jakarta', // TODO: verifikasi
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior unit apartemen',
  },
  'mitra-inti-pranata-office': {
    category: 'kantor',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior ruang kantor',
  },
  'monts-bakehouse': {
    title: "Mont's Bakehouse",
    category: 'komersial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior bakery',
  },
  'orange-country-apartment': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior unit apartemen',
  },
  'paradigm-fitness': {
    category: 'komersial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    featured: true,
    subject: 'interior pusat kebugaran',
  },
  'physical-best-physiotherapy-jakarta': {
    category: 'komersial',
    location: 'Jakarta',
    scope: ['Desain Interior'],
    services: ['desain-interior'],
    // TODO: konfirmasi apakah gambar proyek ini foto asli atau render 3D
    subject: 'interior klinik fisioterapi',
  },
  'pt-suryaraya-rubberindo-industries': {
    title: 'PT Suryaraya Rubberindo Industries',
    category: 'kantor',
    scope: ['Desain Arsitektur'], // TODO: verifikasi
    services: ['arsitektur'],
    kind: 'render', // file bernama Enscape_* = render 3D
    subject: 'desain bangunan industri',
  },
  'yk-house': {
    category: 'residensial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kontraktor'],
    subject: 'interior rumah tinggal',
  },
};

// Terjemahan otomatis untuk nilai yang berulang (subject, lingkup, lokasi)
const EN: Record<string, string> = {
  'interior rumah tinggal': 'house interior',
  'interior unit apartemen': 'apartment unit interior',
  'interior kamar kost': 'boarding room interior',
  'interior ruang kantor': 'office interior',
  'interior bakery': 'bakery interior',
  'interior pusat kebugaran': 'fitness centre interior',
  'interior klinik fisioterapi': 'physiotherapy clinic interior',
  'desain bangunan industri': 'industrial building design',
  proyek: 'project',
  'Desain Interior': 'Interior Design',
  'Desain Arsitektur': 'Architectural Design',
  Build: 'Build',
  'Property Management': 'Property Management',
  Jakarta: 'Jakarta',
  'Jakarta Selatan': 'South Jakarta',
};
const tr = (lang: Lang, v: string | L): string =>
  typeof v === 'string' ? (lang === 'en' ? (EN[v] ?? v) : v) : v[lang];

type Manifest = Record<
  string,
  { folder: string; images: { file: string; width: number; height: number }[] }
>;

const DEFAULT_META: ProjectMeta = {
  category: 'residensial',
  scope: ['Desain Interior'],
  services: ['desain-interior'],
  subject: 'proyek',
};

function titleFromFolder(folder: string) {
  return folder.replace(/_s\b/g, "'s").trim();
}

// Pemisah ribuan: "1.400 m²" (ID) → "1,400 m²" (EN)
const area = (lang: Lang, v: string) => (lang === 'en' ? v.replace(/(\d)\.(\d{3})/g, '$1,$2') : v);

function buildProject(slug: string, entry: Manifest[string], lang: Lang): Project | null {
  const m = meta[slug] ?? DEFAULT_META;
  const facts = projectFacts[slug];
  const title = m.title ?? titleFromFolder(entry.folder);
  const label = getCategory(m.category).label[lang];
  const subject = tr(lang, m.subject);

  const images: ProjectImage[] = entry.images.map((img, i) => {
    const kind = m.kinds?.[img.file] ?? m.kind ?? 'foto';
    const base = `/images/proyek/${slug}/${img.file}`;
    const prefix =
      kind === 'render' ? (lang === 'en' ? 'Design render of ' : 'Render desain ') : '';
    const nth = lang === 'en' ? `image ${i + 1}` : `gambar ${i + 1}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      width: img.width,
      height: img.height,
      kind,
      // TODO: ganti alt default dengan deskripsi spesifik tiap foto lewat `alts`
      alt:
        (lang === 'id' ? m.alts?.[img.file] : undefined) ??
        `${prefix}${subject} ${title} (${label}), ${nth}`,
    };
  });

  const cover = images[0];
  if (!cover) return null;

  return {
    slug,
    title,
    category: m.category,
    // Lokasi & tahun utamakan data xlsx klien (project-facts.ts)
    location: facts
      ? lang === 'en'
        ? locationEn(facts.location)
        : facts.location
      : m.location && tr(lang, m.location),
    region: facts?.region,
    scope: m.scope.map((x) => tr(lang, x)),
    services: m.services,
    year: facts?.year ?? m.year,
    buildingArea: facts?.buildingArea && area(lang, facts.buildingArea),
    landArea: facts?.landArea && area(lang, facts.landArea),
    summary: m.summary,
    cover,
    images,
    featured: m.featured ?? false,
  };
}

function buildAll(lang: Lang): Project[] {
  return (
    Object.entries(manifest as Manifest)
      .map(([slug, entry]) => buildProject(slug, entry, lang))
      .filter((p): p is Project => p !== null)
      // Proyek unggulan tampil lebih dulu, lalu yang terbaru
      .sort((a, b) => Number(b.featured) - Number(a.featured) || (b.year ?? 0) - (a.year ?? 0))
  );
}

const byLang: L<Project[]> = { id: buildAll('id'), en: buildAll('en') };

export function getProjects(lang: Lang = 'id'): Project[] {
  return byLang[lang];
}

/** Daftar proyek versi Indonesia (slug, kategori, jumlah sama di kedua bahasa) */
export const projects: Project[] = byLang.id;

export function getFeaturedProjects(lang: Lang = 'id'): Project[] {
  return byLang[lang].filter((p) => p.featured);
}

export function getProject(slug: string, lang: Lang = 'id'): Project | undefined {
  return byLang[lang].find((p) => p.slug === slug);
}

export function getProjectsByService(service: ServiceSlug, lang: Lang = 'id'): Project[] {
  return byLang[lang].filter((p) => p.services.includes(service));
}

/** Pasangan before/after dari seluruh proyek (berdasarkan field `kinds`). */
export function getBeforeAfterPairs(lang: Lang = 'id') {
  return byLang[lang].flatMap((p) => {
    const before = p.images.filter((i) => i.kind === 'before');
    const after = p.images.filter((i) => i.kind === 'after');
    return before
      .map((b, i) => ({ project: p, before: b, after: after[i] }))
      .filter((x): x is { project: Project; before: ProjectImage; after: ProjectImage } =>
        Boolean(x.after),
      );
  });
}
