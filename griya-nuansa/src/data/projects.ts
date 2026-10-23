import manifest from './images.generated.json';
import { getCategory } from './categories';
import type { CategorySlug, ImageKind, Project, ProjectImage, ServiceSlug } from './types';

/*
 * Data proyek.
 * - Foto & ukuran diambil otomatis dari `images.generated.json` (hasil `npm run optimize-images`).
 * - Metadata (judul, kategori, lingkup, dll.) diatur di `meta` di bawah.
 * - Folder baru di assets/ tanpa entri `meta` tetap tampil dengan nilai default (kategori "rumah").
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
  subject: string;
  summary?: string;
}

// TODO: verifikasi lingkup pekerjaan & lokasi tiap proyek. Lokasi hanya tingkat kota.
const meta: Record<string, ProjectMeta> = {
  'aa-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    featured: true,
    subject: 'interior rumah tinggal',
  },
  'al-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    subject: 'interior rumah tinggal',
  },
  'altuera-tower-southgate': {
    title: 'Altuera Tower at Southgate',
    category: 'apartemen',
    location: 'Jakarta Selatan', // TODO: verifikasi
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    featured: true,
    subject: 'interior unit apartemen',
  },
  'ap-house': {
    category: 'rumah',
    scope: ['Desain Interior'],
    services: ['desain-interior'],
    subject: 'interior rumah tinggal',
  },
  'gr-kost': {
    category: 'kost',
    scope: ['Desain Interior', 'Build', 'Property Management'], // TODO: verifikasi
    services: ['desain-interior', 'property-management'],
    featured: true,
    subject: 'interior kamar kost',
  },
  'im-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    featured: true,
    subject: 'interior rumah tinggal',
  },
  'j-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'renovasi'],
    subject: 'interior rumah tinggal',
  },
  'kj-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    subject: 'interior rumah tinggal',
  },
  'marigold-tower': {
    category: 'apartemen',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    subject: 'interior unit apartemen',
  },
  'menteng-park-apartment': {
    category: 'apartemen',
    location: 'Jakarta', // TODO: verifikasi
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior'],
    subject: 'interior unit apartemen',
  },
  'mitra-inti-pranata-office': {
    category: 'kantor',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior'],
    featured: true,
    subject: 'interior ruang kantor',
  },
  'monts-bakehouse': {
    title: "Mont's Bakehouse",
    category: 'komersial',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    featured: true,
    subject: 'interior bakery',
  },
  'orange-country-apartment': {
    category: 'apartemen',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    subject: 'interior unit apartemen',
  },
  'paradigm-fitness': {
    category: 'kesehatan-kebugaran',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior'],
    featured: true,
    subject: 'interior pusat kebugaran',
  },
  'physical-best-physiotherapy-jakarta': {
    category: 'kesehatan-kebugaran',
    location: 'Jakarta',
    scope: ['Desain Interior'],
    services: ['desain-interior'],
    // TODO: konfirmasi apakah gambar proyek ini foto asli atau render 3D
    subject: 'interior klinik fisioterapi',
  },
  'pt-suryaraya-rubberindo-industries': {
    title: 'PT Suryaraya Rubberindo Industries',
    category: 'industri',
    scope: ['Desain Arsitektur'], // TODO: verifikasi
    services: ['arsitektur'],
    kind: 'render', // file bernama Enscape_* = render 3D
    subject: 'desain bangunan industri',
  },
  'yk-house': {
    category: 'rumah',
    scope: ['Desain Interior', 'Build'],
    services: ['desain-interior', 'kitchen-set-furnitur'],
    subject: 'interior rumah tinggal',
  },
};

type Manifest = Record<
  string,
  { folder: string; images: { file: string; width: number; height: number }[] }
>;

const DEFAULT_META: ProjectMeta = {
  category: 'rumah',
  scope: ['Desain Interior'],
  services: ['desain-interior'],
  subject: 'proyek',
};

function titleFromFolder(folder: string) {
  return folder.replace(/_s\b/g, "'s").trim();
}

function buildProject(slug: string, entry: Manifest[string]): Project | null {
  const m = meta[slug] ?? DEFAULT_META;
  const title = m.title ?? titleFromFolder(entry.folder);
  const label = getCategory(m.category).label;

  const images: ProjectImage[] = entry.images.map((img, i) => {
    const kind = m.kinds?.[img.file] ?? m.kind ?? 'foto';
    const base = `/images/proyek/${slug}/${img.file}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      width: img.width,
      height: img.height,
      kind,
      // TODO: ganti alt default dengan deskripsi spesifik tiap foto lewat `alts`
      alt:
        m.alts?.[img.file] ??
        `${kind === 'render' ? 'Render desain ' : ''}${m.subject} ${title} (${label}), gambar ${i + 1}`,
    };
  });

  const cover = images[0];
  if (!cover) return null;

  return {
    slug,
    title,
    category: m.category,
    location: m.location,
    scope: m.scope,
    services: m.services,
    year: m.year,
    summary: m.summary,
    cover,
    images,
    featured: m.featured ?? false,
  };
}

export const projects: Project[] = Object.entries(manifest as Manifest)
  .map(([slug, entry]) => buildProject(slug, entry))
  .filter((p): p is Project => p !== null)
  // Proyek unggulan tampil lebih dulu
  .sort((a, b) => Number(b.featured) - Number(a.featured));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(service: ServiceSlug): Project[] {
  return projects.filter((p) => p.services.includes(service));
}

/** Pasangan before/after dari seluruh proyek (berdasarkan field `kinds`). */
export function getBeforeAfterPairs() {
  return projects.flatMap((p) => {
    const before = p.images.filter((i) => i.kind === 'before');
    const after = p.images.filter((i) => i.kind === 'after');
    return before
      .map((b, i) => ({ project: p, before: b, after: after[i] }))
      .filter((x): x is { project: Project; before: ProjectImage; after: ProjectImage } =>
        Boolean(x.after),
      );
  });
}
