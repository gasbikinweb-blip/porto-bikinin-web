import { getProject } from './projects';
import type { ImageAsset, RoomType } from './types';

export type Solution = {
  room: RoomType;
  title: string;
  summary: string;
  needs: string[];
  /** Slug produk yang direkomendasikan (lihat products.ts) */
  recommended: string[];
  image: ImageAsset;
};

// TODO: verifikasi rekomendasi dengan tim teknis / spesifikasi produk asli
export const solutions: Solution[] = [
  {
    room: 'ruang-rawat',
    title: 'Ruang Rawat Inap',
    summary:
      'Lantai yang tenang dipandang, kuat dilalui tempat tidur pasien, dan cepat dibersihkan setiap hari.',
    needs: [
      'Tahan lalu lintas troli dan tempat tidur pasien',
      'Permukaan rapat tanpa celah agar debu dan cairan tidak menumpuk',
      'Warna lembut yang menenangkan pasien',
    ],
    recommended: ['vinyl-homogen', 'vinyl-heterogen'],
    image: getProject('rs-ruang-rawat-biru-panel'),
  },
  {
    room: 'ruang-tindakan',
    title: 'Ruang Tindakan',
    summary:
      'Area dengan standar kebersihan tinggi yang sering disanitasi dengan cairan pembersih.',
    needs: [
      'Sambungan dilas agar tidak ada celah tempat kotoran',
      'Plint naik ke dinding untuk sudut yang mudah dibersihkan',
      'Tahan cairan pembersih sesuai rekomendasi produsen', // TODO: verifikasi
    ],
    recommended: ['vinyl-homogen', 'vinyl-antistatik'],
    image: getProject('rs-ruang-tindakan-hijau'),
  },
  {
    room: 'laboratorium',
    title: 'Laboratorium',
    summary: 'Lantai vinyl laboratorium yang rapat dan mudah dibersihkan bila terkena tumpahan.',
    needs: [
      'Permukaan rapat sehingga tumpahan mudah dibersihkan',
      'Ketahanan terhadap bahan kimia sesuai datasheet', // TODO: verifikasi
      'Opsi antistatik untuk ruang peralatan sensitif',
    ],
    recommended: ['vinyl-homogen', 'vinyl-antistatik'],
    image: getProject('lab-ruang-kabinet-abu'),
  },
  {
    room: 'klinik-gigi',
    title: 'Klinik Gigi',
    summary: 'Tampilan bersih dan ramah untuk ruang praktik, ruang sterilisasi, dan ruang tunggu.',
    needs: [
      'Mudah dibersihkan di sekitar dental unit',
      'Pilihan warna yang membuat ruangan terasa segar',
      'Plint naik ke dinding di area kabinet',
    ],
    recommended: ['vinyl-heterogen', 'vinyl-homogen'],
    image: getProject('ilustrasi-klinik-gigi-hijau'),
  },
  {
    room: 'toilet',
    title: 'Toilet & Kamar Mandi Pasien',
    summary: 'Area basah yang membutuhkan permukaan bertekstur dan sudut yang kedap air.',
    needs: [
      'Permukaan bertekstur untuk area basah',
      'Plint naik ke dinding agar air tidak masuk ke sela',
      'Tidak mudah berjamur di sudut ruangan', // TODO: verifikasi
    ],
    recommended: ['vinyl-anti-slip'],
    image: getProject('klinik-toilet-abu'),
  },
  {
    room: 'koridor',
    title: 'Koridor & Area Publik',
    summary: 'Jalur utama pasien, petugas, dan pengunjung dengan lalu lintas paling padat.',
    needs: [
      'Tahan lalu lintas tinggi dan roda troli',
      'Lembaran lebar sehingga sambungan lebih sedikit',
      'Warna yang membantu orientasi arah', // TODO: verifikasi
    ],
    recommended: ['vinyl-homogen'],
    // TODO: ganti dengan foto koridor hasil proyek
    image: getProject('rs-ruang-biru-ac'),
  },
];
