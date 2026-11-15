// Portofolio proyek dari Instagram @akaa.construction.
// Foto dihasilkan oleh `npm run optimize-images` (lihat scripts/optimize-images.mjs).
// Lokasi cukup tingkat kawasan/kota. Nama klien dan alamat rumah tidak ditampilkan.
import type { Project, ProjectImage } from './types';

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

function img(
  slug: string,
  name: string,
  alt: string,
  width: number,
  height: number,
  kind: ProjectImage['kind'] = 'foto',
): ProjectImage {
  const base = `/images/proyek/${slug}/${name}`;
  return { src: `${base}.webp`, thumb: `${base}-thumb.webp`, alt, width, height, kind };
}

const sn = {
  a: img(
    'sn-house-rancamaya',
    '01',
    'Pemasangan bekisting kolom dan sloof villa SN House di Rancamaya, Bogor',
    1152,
    1238,
    'progress',
  ),
  b: img(
    'sn-house-rancamaya',
    '02',
    'Pekerjaan struktur awal di area proyek villa SN House, Rancamaya',
    1440,
    1267,
    'progress',
  ),
  // Frame dari video IG 2026 (teks overlay & stempel waktu bawaan video AKAA)
  jun27: img(
    'sn-house-rancamaya',
    '03',
    'Struktur villa SN House, 27 Juni 2026',
    480,
    360,
    'progress',
  ),
  jul25: img(
    'sn-house-rancamaya',
    '04',
    'Progress villa SN House, 25 Juli 2026',
    960,
    720,
    'progress',
  ),
  jul31: img(
    'sn-house-rancamaya',
    '05',
    'Pemasangan dinding dan besi kolom SN House, 31 Juli 2026',
    720,
    540,
    'progress',
  ),
  aug08: img(
    'sn-house-rancamaya',
    '06',
    'Bangunan dua lantai SN House dengan perancah, Agustus 2026',
    960,
    720,
    'progress',
  ),
  sep18: img(
    'sn-house-rancamaya',
    '07',
    'Progress SN House 18 September 2026',
    720,
    540,
    'progress',
  ),
  atap: img('sn-house-rancamaya', '08', 'Pemasangan rangka atap SN House', 720, 960, 'progress'),
  piping: img(
    'sn-house-rancamaya',
    '09',
    'Instalasi piping dan wiring di dalam SN House',
    720,
    960,
    'progress',
  ),
  sep29: img(
    'sn-house-rancamaya',
    '10',
    'Progress SN House 29 September 2026',
    960,
    720,
    'progress',
  ),
};

const harvest = [
  img(
    'renovasi-harvest-city',
    '01',
    'Dapur hasil renovasi dengan meja beton dan backsplash granit abu-abu',
    720,
    540,
  ),
  img(
    'renovasi-harvest-city',
    '02',
    'Lorong rumah setelah renovasi di Perumahan Harvest City',
    848,
    478,
  ),
  img(
    'renovasi-harvest-city',
    '03',
    'Plafon dan dinding ruangan setelah renovasi selesai',
    848,
    478,
  ),
];

const hotel = [
  img(
    'hotel-kemang',
    '01',
    'Area kolam renang hotel dengan lantai deck kayu yang sedang diperbarui',
    1080,
    1080,
  ),
  img(
    'hotel-kemang',
    '02',
    'Persiapan rangka lantai deck di area kolam hotel',
    1080,
    1080,
    'progress',
  ),
  img(
    'hotel-kemang',
    '03',
    'Pemasangan rangka lantai di sisi pintu kaca hotel',
    1080,
    1080,
    'progress',
  ),
  img(
    'hotel-kemang',
    '04',
    'Rangka lantai deck tersusun rapi sebelum papan dipasang',
    1080,
    1080,
    'progress',
  ),
  img(
    'hotel-kemang',
    '05',
    'Detail perbaikan saluran filter kolam renang hotel',
    1080,
    1080,
    'progress',
  ),
  img('hotel-kemang', '06', 'Area lounge hotel setelah pekerjaan selesai', 1080, 1080),
];

const renov = [
  img(
    'renovasi-rumah-office',
    '01',
    'Renovasi rumah dua lantai tahap dinding bata lantai atas',
    1080,
    1080,
    'progress',
  ),
  img(
    'renovasi-rumah-office',
    '02',
    'Pembesian dan bekisting dak lantai roof sebelum pengecoran',
    1080,
    1080,
    'progress',
  ),
  img(
    'renovasi-rumah-office',
    '03',
    'Pengecoran lantai roof rumah renovasi',
    1080,
    1080,
    'progress',
  ),
];

export const projects: readonly Project[] = [
  {
    slug: 'sn-house-rancamaya',
    name: 'SN House Villa',
    workType: 'bangun-baru',
    location: 'Rancamaya, Bogor',
    status: 'berjalan',
    year: 2026,
    scope: 'Pembangunan villa dari struktur, atap, hingga instalasi piping dan wiring.',
    // TODO: konfirmasi bahwa kedua foto Mei 2026 adalah lokasi SN House
    cover: sn.aug08,
    images: [
      sn.aug08,
      sn.sep29,
      sn.sep18,
      sn.atap,
      sn.piping,
      sn.jul31,
      sn.jul25,
      sn.jun27,
      sn.a,
      sn.b,
    ],
    progress: [
      { date: '2026-05-13', stage: 'Pekerjaan struktur awal', images: [sn.b] },
      { date: '2026-05-18', stage: 'Bekisting kolom & sloof', images: [sn.a] },
      { date: '2026-06-27', stage: 'Struktur lantai dasar', images: [sn.jun27] },
      { date: '2026-07-25', stage: 'Update progress villa', images: [sn.jul25] },
      { date: '2026-07-31', stage: 'Dinding & besi kolom lantai atas', images: [sn.jul31] },
      { date: '2026-08-08', stage: 'Struktur dua lantai berdiri', images: [sn.aug08] },
      { date: '2026-09-18', stage: 'Update progress villa', images: [sn.sep18] },
      { date: '2026-09-22', stage: 'Pekerjaan rangka atap', images: [sn.atap] },
      { date: '2026-09-22', stage: 'Instalasi piping & wiring', images: [sn.piping] },
      { date: '2026-09-29', stage: 'Update progress terbaru', images: [sn.sep29] },
    ],
    featured: true,
    sourcePosts: [
      ig('DXfzt3akXc7'),
      ig('DaFvsreTx2s'),
      ig('DbN_9CpTpBW'),
      ig('DdmDudIz9jT'),
      ig('DdmEhY1Tg70'),
      ig('Dd54o9ZxD-0'),
    ],
  },
  {
    slug: 'renovasi-harvest-city',
    name: 'Renovasi Rumah Harvest City',
    workType: 'renovasi',
    location: 'Harvest City, Cileungsi',
    status: 'selesai',
    year: 2026,
    scope: 'Renovasi dapur dengan meja beton dan backsplash granit, serta perapian ruangan rumah.',
    cover: harvest[0]!,
    images: harvest,
    progress: [
      { date: '2026-08-21', stage: 'Renovasi dapur', images: [harvest[0]!] },
      { date: '2026-09-05', stage: 'Renovasi selesai', images: [harvest[1]!, harvest[2]!] },
    ],
    featured: true,
    sourcePosts: [ig('Dcf2QIKxBJj'), ig('Dc7nVcAxVMU')],
  },
  {
    slug: 'renovasi-rumah-office',
    name: 'Renovasi 1 Rumah Jadi 2 Rumah & Office',
    workType: 'renovasi',
    location: undefined, // TODO: kota/kecamatan proyek
    status: 'selesai',
    year: 2020,
    scope:
      'Renovasi satu rumah menjadi dua rumah sekaligus kantor, tambah lantai 2 dan lantai roof.',
    cover: renov[2]!,
    images: renov,
    progress: [
      { date: '2020-11-23', stage: 'Progress 70%: dinding lantai atas', images: [renov[0]!] },
      { date: '2020-11-26', stage: 'Persiapan cor lantai roof', images: [renov[1]!] },
      { date: '2020-11-27', stage: 'Pengecoran lantai roof selesai', images: [renov[2]!] },
    ],
    featured: true,
    sourcePosts: [ig('CH7IXdHH-11'), ig('CICewuZnp9T'), ig('CIF6mHLHV37')],
  },
  {
    slug: 'hotel-kemang',
    name: 'Paket Pekerjaan Hotel',
    workType: 'renovasi',
    location: 'Kemang, Jakarta Selatan',
    status: 'selesai',
    year: 2020,
    scope: 'Pembaruan lantai deck area kolam renang dan perbaikan fasilitas pendukung.', // TODO: lingkup lengkap
    cover: hotel[0]!,
    images: hotel,
    featured: true,
    sourcePosts: [ig('CJPiyDtn863')],
  },
  {
    slug: 'perbaikan-kebocoran',
    name: 'Perbaikan Kebocoran & Manhole Pompa',
    workType: 'renovasi',
    location: undefined, // TODO: kota/kecamatan proyek
    status: 'selesai',
    year: 2020,
    scope: 'Perbaikan kebocoran dan pembuatan manhole pompa air rumah tinggal.',
    cover: img(
      'perbaikan-kebocoran',
      '01',
      'Pembuatan manhole pompa air di area rumah',
      1080,
      1080,
    ),
    images: [
      img('perbaikan-kebocoran', '01', 'Pembuatan manhole pompa air di area rumah', 1080, 1080),
    ],
    featured: false,
    sourcePosts: [ig('CIpDo5fnDtO')],
  },
  {
    slug: 'fasad-gedung-sudirman',
    name: 'Persiapan Pengecatan Fasad ACP Gedung',
    workType: 'renovasi',
    location: 'Sudirman, Jakarta',
    status: 'selesai',
    year: 2020,
    scope: 'Persiapan pengecatan Aluminium Composite Panel (ACP) bagian depan gedung.',
    cover: img(
      'fasad-gedung-sudirman',
      '01',
      'Fasad ACP gedung perkantoran di kawasan Sudirman',
      1080,
      1080,
    ),
    images: [
      img(
        'fasad-gedung-sudirman',
        '01',
        'Fasad ACP gedung perkantoran di kawasan Sudirman',
        1080,
        1080,
      ),
    ],
    featured: false,
    sourcePosts: [ig('CJV_FZbHaRT')],
  },
  {
    slug: 'canopy-pintu-sliding',
    name: 'Canopy Membrane & Pintu Sliding',
    workType: 'renovasi',
    location: 'Jakarta',
    status: 'selesai',
    year: 2021,
    scope:
      'Pembuatan dan pemasangan canopy membrane serta pintu sliding kayu untuk gedung yayasan.',
    cover: img(
      'canopy-pintu-sliding',
      '02',
      'Pintu sliding kayu terpasang di dalam gedung',
      1080,
      1350,
    ),
    images: [
      img('canopy-pintu-sliding', '02', 'Pintu sliding kayu terpasang di dalam gedung', 1080, 1350),
      img(
        'canopy-pintu-sliding',
        '01',
        'Canopy membrane putih terpasang di area parkir gedung',
        1080,
        566,
      ),
    ],
    featured: false,
    sourcePosts: [ig('CNYxeSwH383'), ig('CN3mxt3nZJc')],
  },
];

export const workTypeLabel: Record<Project['workType'], string> = {
  'bangun-baru': 'Bangun Baru',
  renovasi: 'Renovasi',
  interior: 'Interior',
  taman: 'Taman',
};

export const statusLabel: Record<Project['status'], string> = {
  selesai: 'Selesai',
  berjalan: 'Sedang Berjalan',
};

export const projectSlugs = new Set(projects.map((p) => p.slug));
