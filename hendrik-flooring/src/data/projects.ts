import type { FacilityType, RoomType } from './types';

export type ProjectCategory = 'lantai' | 'handrail' | 'karpet';

export const categoryLabels: Record<ProjectCategory, string> = {
  lantai: 'Lantai vinyl',
  handrail: 'Handrail',
  karpet: 'Karpet roll',
};

export type Project = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  facilityType: FacilityType;
  roomType: RoomType;
  floorType: string;
  /** Luas terpasang dalam m² (opsional) */
  area?: number;
  /** Jenis pekerjaan; default 'lantai' */
  category?: ProjectCategory;
  kind: 'proyek' | 'ilustrasi';
  width: number;
  height: number;
};

const img = (name: string) => ({
  src: `/img/proyek/${name}.webp`,
  thumb: `/img/proyek/${name}-thumb.webp`,
});

// TODO: verifikasi tipe fasilitas, tipe ruangan, jenis lantai, dan luas tiap foto dengan data proyek asli.
// Jangan tampilkan nama rumah sakit/klinik, logo, atau data pasien. Pastikan klien sudah memberi izin publikasi.
// Urutan di sini = urutan tampil di galeri (8 pertama tampil sebelum "Tampilkan semua").
export const projects: Project[] = [
  {
    id: 'rs-ruang-rawat-biru-luas',
    ...img('rs-ruang-rawat-vinyl-biru-luas'),
    alt: 'Lantai vinyl biru muda di ruang rawat rumah sakit yang luas dengan panel gas medis di dinding',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'vinyl-heterogen-motif-kayu',
    ...img('vinyl-heterogen-motif-kayu-ruang-luas'),
    alt: 'Lantai vinyl roll heterogen motif kayu cokelat di ruangan luas dengan plint kayu di dinding',
    facilityType: 'kantor', // TODO: verifikasi tipe fasilitas
    roomType: 'ruang-kerja', // TODO: verifikasi
    floorType: 'Vinyl roll heterogen motif kayu',
    category: 'lantai',
    kind: 'proyek',
    width: 1170,
    height: 1551,
  },
  {
    id: 'vinyl-pola-custom-ruang-terbuka',
    ...img('vinyl-pola-custom-ruang-terbuka'),
    alt: 'Lantai vinyl krem dengan pola gelombang biru muda yang dipotong custom di ruangan terbuka',
    facilityType: 'klinik', // TODO: verifikasi tipe fasilitas
    roomType: 'lobi', // TODO: verifikasi
    floorType: 'Vinyl lembaran dengan pola custom (inlay)', // TODO: verifikasi
    category: 'lantai',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
  {
    id: 'handrail-koridor-rs',
    ...img('handrail-koridor-rs'),
    alt: 'Handrail putih dengan aksen kayu terpasang di sepanjang koridor rumah sakit',
    facilityType: 'rumah-sakit', // TODO: verifikasi
    roomType: 'koridor',
    floorType: 'Handrail anti benturan', // TODO: isi merek yang dipasang
    category: 'handrail',
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'karpet-roll-lobi-lift',
    ...img('karpet-roll-lobi-lift'),
    alt: 'Karpet bermotif abu-abu terpasang rapi di lobi lift gedung perkantoran',
    facilityType: 'kantor',
    roomType: 'lobi',
    floorType: 'Karpet roll motif abu-abu', // TODO: verifikasi
    category: 'karpet',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
  {
    id: 'vinyl-pola-custom-area-resepsionis',
    ...img('vinyl-pola-custom-area-resepsionis'),
    alt: 'Area resepsionis dengan lantai vinyl krem dan potongan pola biru muda yang mengalir',
    facilityType: 'klinik', // TODO: verifikasi tipe fasilitas
    roomType: 'lobi', // TODO: verifikasi
    floorType: 'Vinyl lembaran dengan pola custom (inlay)', // TODO: verifikasi
    category: 'lantai',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
  {
    id: 'handrail-ruang-tunggu',
    ...img('handrail-ruang-tunggu'),
    alt: 'Handrail dengan bumper merah-biru di dinding ruang tunggu dekat meja pendaftaran',
    facilityType: 'rumah-sakit', // TODO: verifikasi
    roomType: 'lobi',
    floorType: 'Handrail anti benturan', // TODO: isi merek yang dipasang
    category: 'handrail',
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'karpet-roll-biru-ruang-kerja',
    ...img('karpet-roll-biru-ruang-kerja'),
    alt: 'Karpet biru polos terpasang di ruang kerja dengan deretan meja panjang',
    facilityType: 'kantor',
    roomType: 'ruang-kerja',
    floorType: 'Karpet roll biru', // TODO: verifikasi
    category: 'karpet',
    kind: 'proyek',
    width: 1088,
    height: 1445,
  },
  {
    id: 'rs-ruang-tindakan-hijau',
    ...img('rs-ruang-tindakan-vinyl-hijau'),
    alt: 'Ruang tindakan rumah sakit dengan lantai vinyl hijau tanpa sambungan terlihat dan pintu kedap',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-tindakan',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'klinik-toilet-abu',
    ...img('klinik-toilet-vinyl-abu-coving'),
    alt: 'Lantai vinyl abu-abu dengan plint naik ke dinding di toilet klinik, di samping wastafel',
    facilityType: 'klinik', // TODO: verifikasi
    roomType: 'toilet',
    floorType: 'Vinyl lembaran anti-slip', // TODO: verifikasi
    kind: 'proyek',
    width: 963,
    height: 1280,
  },
  {
    id: 'rs-sudut-coving-biru',
    ...img('rs-sudut-coving-vinyl-biru'),
    alt: 'Detail sudut lantai vinyl biru dengan plint coving naik ke dinding di samping kusen pintu',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1200,
    height: 1600,
  },
  {
    id: 'lab-ruang-kabinet-abu',
    ...img('lab-ruang-kabinet-vinyl-abu-coving'),
    alt: 'Lantai vinyl abu-abu bertekstur bintik dengan plint coving di ruang laboratorium',
    facilityType: 'laboratorium', // TODO: verifikasi
    roomType: 'laboratorium',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 490,
    height: 980,
  },
  {
    id: 'ilustrasi-klinik-gigi-hijau',
    ...img('ilustrasi-klinik-gigi-vinyl-hijau'),
    alt: 'Ilustrasi ruang praktik dokter gigi dengan lantai vinyl hijau muda',
    facilityType: 'klinik-gigi',
    roomType: 'klinik-gigi',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'ilustrasi',
    width: 1080,
    height: 1350,
  },
  {
    id: 'rs-ruang-rawat-biru-panel',
    ...img('rs-ruang-vinyl-biru-panel-gas'),
    alt: 'Ruang rawat rumah sakit berlantai vinyl biru dengan plint melengkung naik ke dinding',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'rs-ruang-biru-ac',
    ...img('rs-ruang-vinyl-biru-ac'),
    alt: 'Ruangan rumah sakit yang siap pakai dengan lantai vinyl biru muda dan dinding putih',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1200,
    height: 1600,
  },
  {
    id: 'rs-ruang-tindakan-hijau-2',
    ...img('rs-ruang-tindakan-vinyl-hijau-pintu-ganda'),
    alt: 'Lantai vinyl hijau rata di ruang tindakan rumah sakit dengan pintu ganda menuju ruang berikutnya',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-tindakan',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'klinik-akses-toilet-abu',
    ...img('klinik-akses-toilet-vinyl-abu-coving'),
    alt: 'Lantai vinyl abu-abu menerus dari ruang depan hingga pintu kaca toilet klinik',
    facilityType: 'klinik', // TODO: verifikasi
    roomType: 'toilet',
    floorType: 'Vinyl lembaran anti-slip', // TODO: verifikasi
    kind: 'proyek',
    width: 963,
    height: 1280,
  },
  {
    id: 'klinik-ruang-kecil-abu',
    ...img('klinik-ruang-kecil-vinyl-abu-coving'),
    alt: 'Plint vinyl abu-abu yang naik rapi ke dinding di sudut ruangan klinik',
    facilityType: 'klinik', // TODO: verifikasi
    roomType: 'toilet', // TODO: verifikasi tipe ruangan
    floorType: 'Vinyl lembaran anti-slip', // TODO: verifikasi
    kind: 'proyek',
    width: 963,
    height: 1280,
  },
  {
    id: 'ilustrasi-klinik-gigi-plafon',
    ...img('ilustrasi-klinik-gigi-plafon-lampu'),
    alt: 'Ilustrasi ruang praktik dokter gigi dengan lantai vinyl hijau dan plafon berlampu',
    facilityType: 'klinik-gigi',
    roomType: 'klinik-gigi',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'ilustrasi',
    width: 1122,
    height: 1402,
  },
  {
    id: 'rs-ruang-rawat-biru-tahap-akhir',
    ...img('rs-ruang-rawat-vinyl-biru-proses'),
    alt: 'Ruang rawat rumah sakit berlantai vinyl biru pada tahap akhir pekerjaan',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'rs-ruang-rawat-biru-proteksi',
    ...img('rs-ruang-rawat-vinyl-biru-proteksi'),
    alt: 'Lantai vinyl biru yang baru terpasang dan masih dilindungi lembar plastik',
    facilityType: 'rumah-sakit',
    roomType: 'ruang-rawat',
    floorType: 'Vinyl lembaran homogen', // TODO: verifikasi
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'vinyl-pola-custom-lorong',
    ...img('vinyl-pola-custom-lorong'),
    alt: 'Lorong dengan lantai vinyl krem dan aksen pola biru muda menuju ruang dalam',
    facilityType: 'klinik', // TODO: verifikasi tipe fasilitas
    roomType: 'koridor',
    floorType: 'Vinyl lembaran dengan pola custom (inlay)', // TODO: verifikasi
    category: 'lantai',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
  {
    id: 'handrail-lorong-baru',
    ...img('handrail-lorong-baru'),
    alt: 'Handrail putih dengan aksen kayu di dinding lorong yang baru selesai dibangun',
    facilityType: 'rumah-sakit', // TODO: verifikasi
    roomType: 'koridor',
    floorType: 'Handrail anti benturan', // TODO: isi merek yang dipasang
    category: 'handrail',
    kind: 'proyek',
    width: 1600,
    height: 1200,
  },
  {
    id: 'karpet-roll-lobi-resepsionis',
    ...img('karpet-roll-lobi-resepsionis'),
    alt: 'Karpet bermotif abu-abu di lobi resepsionis dengan meja berlampu',
    facilityType: 'kantor',
    roomType: 'lobi',
    floorType: 'Karpet roll motif abu-abu', // TODO: verifikasi
    category: 'karpet',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
  {
    id: 'karpet-roll-area-tunggu',
    ...img('karpet-roll-area-tunggu'),
    alt: 'Karpet bermotif abu-abu di area tunggu dengan sofa hitam dekat tangga',
    facilityType: 'kantor',
    roomType: 'lobi',
    floorType: 'Karpet roll motif abu-abu', // TODO: verifikasi
    category: 'karpet',
    kind: 'proyek',
    width: 1204,
    height: 1600,
  },
];

export function getProject(id: string): Project {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`Proyek "${id}" tidak ditemukan`);
  return p;
}
