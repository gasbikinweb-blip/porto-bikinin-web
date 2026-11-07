export type Service = {
  id: string;
  name: string;
  text: string;
  /** Path SVG 24x24 (stroke) */
  icon: string;
};

export const services: readonly Service[] = [
  {
    id: 'print',
    name: 'Print',
    text: 'Hitam putih & warna, harga sama. Proposal, skripsi, tesis, makalah.',
    icon: 'M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z',
  },
  {
    id: 'fotocopy',
    name: 'Fotocopy',
    text: 'Fotocopy dokumen, KTP, dan berkas kuliah.',
    icon: 'M8 4h9l3 3v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM4 8v12a2 2 0 0 0 2 2h10',
  },
  {
    id: 'jilid-biasa',
    name: 'Jilid Biasa',
    text: 'Jilid rapi untuk makalah, laporan PKL, dan KKN.',
    icon: 'M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Zm4-2v18M11 8h4',
  },
  {
    id: 'jilid-lux',
    name: 'Jilid Lux / Hard Cover',
    text: 'Hard cover skripsi presisi & mulus, lengkap dengan pita.',
    icon: 'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm0 14a2 2 0 0 1 2-2h12M14 4v7l-2-1.5L10 11V4',
  },
  {
    id: 'laminating',
    name: 'Laminating',
    text: 'Laminating dokumen penting supaya awet.',
    icon: 'M5 3h14v18H5zM9 7h6M9 11h6M9 15h3M3 6v15M21 6v15',
  },
  {
    id: 'pas-foto',
    name: 'Cetak Pas Foto',
    text: 'Cetak pas foto untuk berkas wisuda & administrasi.',
    icon: 'M4 5h16v14H4zM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-4 4a4 4 0 0 1 8 0',
  },
  {
    id: 'sertifikat',
    name: 'Cetak Sertifikat',
    text: 'Sertifikat seminar & lomba, mulai Rp2.000 (min. 100 lembar).',
    icon: 'M4 4h16v12H4zM8 8h8M8 11h5M15 16v5l2-1.5 2 1.5v-5',
  },
  {
    id: 'atk',
    name: 'ATK & Lainnya',
    text: 'Map, alat tulis, dan kebutuhan kuliah lainnya.',
    icon: 'M14 4l6 6-10 10H4v-6L14 4Zm-2 2 6 6',
  },
];
