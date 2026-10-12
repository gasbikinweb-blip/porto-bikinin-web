// Tipe data bersama untuk seluruh situs

export const FACILITY_TYPES = [
  'rumah-sakit',
  'klinik',
  'klinik-gigi',
  'laboratorium',
  'kantor',
] as const;
export type FacilityType = (typeof FACILITY_TYPES)[number];

export const ROOM_TYPES = [
  'ruang-rawat',
  'ruang-tindakan',
  'laboratorium',
  'klinik-gigi',
  'toilet',
  'koridor',
  'lobi',
  'ruang-kerja',
] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const facilityLabels: Record<FacilityType, string> = {
  'rumah-sakit': 'Rumah Sakit',
  klinik: 'Klinik',
  'klinik-gigi': 'Klinik Gigi',
  laboratorium: 'Laboratorium',
  kantor: 'Kantor & Gedung',
};

export const roomLabels: Record<RoomType, string> = {
  'ruang-rawat': 'Ruang Rawat',
  'ruang-tindakan': 'Ruang Tindakan',
  laboratorium: 'Laboratorium',
  'klinik-gigi': 'Ruang Praktik Gigi',
  toilet: 'Toilet & Kamar Mandi',
  koridor: 'Koridor',
  lobi: 'Lobi & Ruang Tunggu',
  'ruang-kerja': 'Ruang Kerja',
};

/** Gambar dengan ukuran asli agar tidak terjadi layout shift */
export type ImageAsset = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  /** 'ilustrasi' = render/gambar ilustrasi, wajib berlabel "Ilustrasi" di UI */
  kind: 'proyek' | 'ilustrasi';
};
