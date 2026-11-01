// Daftar lengkap 78 kecamatan di Daerah Istimewa Yogyakarta (5 kabupaten/kota).
// Dipakai untuk pencarian area pengiriman di penyusun pesanan.

export type Kecamatan = {
  /** id unik, mis. 'sleman-depok' */
  id: string;
  name: string;
  /** Nama kabupaten/kota lengkap, mis. 'Kab. Sleman' */
  region: string;
};

const DATA: Record<string, readonly string[]> = {
  'Kota Yogyakarta': [
    'Danurejan',
    'Gedongtengen',
    'Gondokusuman',
    'Gondomanan',
    'Jetis',
    'Kotagede',
    'Kraton',
    'Mantrijeron',
    'Mergangsan',
    'Ngampilan',
    'Pakualaman',
    'Tegalrejo',
    'Umbulharjo',
    'Wirobrajan',
  ],
  'Kab. Sleman': [
    'Berbah',
    'Cangkringan',
    'Depok',
    'Gamping',
    'Godean',
    'Kalasan',
    'Minggir',
    'Mlati',
    'Moyudan',
    'Ngaglik',
    'Ngemplak',
    'Pakem',
    'Prambanan',
    'Seyegan',
    'Sleman',
    'Tempel',
    'Turi',
  ],
  'Kab. Bantul': [
    'Bambanglipuro',
    'Banguntapan',
    'Bantul',
    'Dlingo',
    'Imogiri',
    'Jetis',
    'Kasihan',
    'Kretek',
    'Pajangan',
    'Pandak',
    'Piyungan',
    'Pleret',
    'Pundong',
    'Sanden',
    'Sedayu',
    'Sewon',
    'Srandakan',
  ],
  'Kab. Kulon Progo': [
    'Galur',
    'Girimulyo',
    'Kalibawang',
    'Kokap',
    'Lendah',
    'Nanggulan',
    'Panjatan',
    'Pengasih',
    'Samigaluh',
    'Sentolo',
    'Temon',
    'Wates',
  ],
  'Kab. Gunungkidul': [
    'Gedangsari',
    'Girisubo',
    'Karangmojo',
    'Ngawen',
    'Nglipar',
    'Paliyan',
    'Panggang',
    'Patuk',
    'Playen',
    'Ponjong',
    'Purwosari',
    'Rongkop',
    'Saptosari',
    'Semanu',
    'Semin',
    'Tanjungsari',
    'Tepus',
    'Wonosari',
  ],
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/^(kota|kab\.)\s+/, '')
    .replace(/[^a-z0-9]+/g, '-');

export const kecamatanList: readonly Kecamatan[] = Object.entries(DATA).flatMap(([region, names]) =>
  names.map((name) => ({ id: `${slug(region)}-${slug(name)}`, name, region })),
);

export const regions = Object.keys(DATA);

/** Label lengkap untuk pesan WA, mis. 'Kec. Depok, Kab. Sleman' */
export const kecamatanLabel = (k: Kecamatan) => `Kec. ${k.name}, ${k.region}`;
