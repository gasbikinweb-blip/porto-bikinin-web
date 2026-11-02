// Data proyek dari "Data Website Griya Nuansa.xlsx" (assets_baru).
// Lokasi sengaja hanya tingkat area/kota (permintaan klien, demi privasi pemilik rumah).
// region = kelompok untuk filter lokasi (sesuai brief: Jakarta, Tangerang, Bekasi, Bogor, Depok, Yogyakarta).

export type Region = 'jakarta' | 'tangerang' | 'bekasi' | 'bogor' | 'depok' | 'yogyakarta';

export interface ProjectFacts {
  location: string;
  region?: Region;
  year: number;
  /** Luas bangunan, apa adanya dari data klien (mis. "130 m²") */
  buildingArea?: string;
  landArea?: string;
}

export const regions: { slug: Region; label: string }[] = [
  { slug: 'jakarta', label: 'Jakarta' },
  { slug: 'tangerang', label: 'Tangerang' },
  { slug: 'bekasi', label: 'Bekasi' },
  { slug: 'bogor', label: 'Bogor' },
  { slug: 'depok', label: 'Depok' },
  { slug: 'yogyakarta', label: 'Yogyakarta' },
];

export const projectFacts: Record<string, ProjectFacts> = {
  // TODO: konfirmasi wilayah Kawasan Industri Menara Permai (tidak dimasukkan ke filter lokasi)
  'pt-suryaraya-rubberindo-industries': {
    location: 'Kawasan Industri Menara Permai',
    year: 2025,
    buildingArea: '700 m² + 256 m²',
  },
  'gr-kost': {
    location: 'Cisauk, Banten',
    region: 'tangerang',
    year: 2024,
    buildingArea: '455 m²',
    landArea: '510 m²',
  },
  'physical-best-physiotherapy-jakarta': {
    location: 'Jakarta Selatan',
    region: 'jakarta',
    year: 2026,
    buildingArea: '130 m²',
  },
  'menteng-park-apartment': {
    location: 'Cikini, Jakarta Pusat',
    region: 'jakarta',
    year: 2023,
    buildingArea: '47 m²',
  },
  'aa-house': {
    location: 'Cempaka Putih, Jakarta Pusat',
    region: 'jakarta',
    year: 2026,
    buildingArea: '130 m²',
    landArea: '100 m²',
  },
  'ap-house': {
    location: 'Cisauk, Banten',
    region: 'tangerang',
    year: 2026,
    buildingArea: '32 m²',
    landArea: '60 m²',
  },
  'kj-house': {
    location: 'Pondok Cabe, Tangerang Selatan',
    region: 'tangerang',
    year: 2022,
    buildingArea: '73 m²',
    landArea: '105 m²',
  },
  'yk-house': {
    location: 'Pondok Aren, Tangerang Selatan',
    region: 'tangerang',
    year: 2026,
    buildingArea: '157 m²',
    landArea: '96 m²',
  },
  'altuera-tower-southgate': {
    location: 'Tanjung Barat, Jakarta Selatan',
    region: 'jakarta',
    year: 2023,
    buildingArea: '50 m²',
  },
  'j-house': {
    location: 'Pondok Aren, Tangerang Selatan',
    region: 'tangerang',
    year: 2023,
    buildingArea: '180 m²',
    landArea: '215 m²',
  },
  'monts-bakehouse': {
    location: 'Kalideres, Jakarta Barat',
    region: 'jakarta',
    year: 2024,
    buildingArea: '84 m²',
  },
  'marigold-tower': {
    location: 'BSD City, Tangerang',
    region: 'tangerang',
    year: 2023,
    buildingArea: '86 m²',
  },
  'orange-country-apartment': {
    location: 'Cikarang Selatan, Bekasi',
    region: 'bekasi',
    year: 2024,
    buildingArea: '57 m²',
  },
  'al-house': {
    location: 'Rempoa, Tangerang Selatan',
    region: 'tangerang',
    year: 2023,
    buildingArea: '170 m²',
  },
  'im-house': {
    location: 'Cinere, Tangerang Selatan',
    region: 'tangerang',
    year: 2024,
    buildingArea: '164 m²',
    landArea: '144 m²',
  },
  'paradigm-fitness': {
    location: 'Sudirman, Jakarta Selatan',
    region: 'jakarta',
    year: 2018,
    buildingArea: '1.400 m²',
  },
  'mitra-inti-pranata-office': {
    location: 'Puri Kencana, Jakarta Barat',
    region: 'jakarta',
    year: 2019,
    buildingArea: '1.250 m²',
  },
};

// Nama wilayah dalam bahasa Inggris (untuk halaman /en)
const EN_PLACES: [RegExp, string][] = [
  [/Jakarta Selatan/g, 'South Jakarta'],
  [/Jakarta Pusat/g, 'Central Jakarta'],
  [/Jakarta Barat/g, 'West Jakarta'],
  [/Tangerang Selatan/g, 'South Tangerang'],
  [/Cikarang Selatan/g, 'South Cikarang'],
  [/Kawasan Industri/g, 'Industrial Estate'],
];

export function locationEn(loc: string): string {
  return EN_PLACES.reduce((s, [re, en]) => s.replace(re, en), loc);
}
