// Video yang ditampilkan di website. `src` relatif terhadap folder sirait-printing/.
// `start`/`duration` (detik) memotong bagian yang menampilkan wajah jelas, papan berlogo kampus,
// atau sampul skripsi yang terbaca. Audio selalu dibuang (musik Reels berlisensi khusus Instagram).
// Video yang sengaja TIDAK dipakai: 2026-07-09 & 2026-03-31 (wajah), 2026-09-22_Ddlp (sampul Unimed),
// 2026-06-15 (dokumen berlogo kampus), 2026-02-23 & 2026-02-02 (branding VP3).
export const videos = [
  {
    name: 'tur-toko-print-kilat',
    src: 'assets/2026-05-03_DX3hII6TaVr/01.mp4',
    start: 3,
    duration: 33,
    title: 'Print kilat, hasil rapi',
    poster: 3, // detik dari awal potongan
  },
  {
    name: 'tumpukan-jilid-lux',
    src: 'assets/2026-07-18_Da7ZTjJT9QT/01.mp4',
    start: 0,
    duration: 16,
    title: 'Jilid lux siap diambil',
    poster: 6,
  },
  {
    name: 'senin-keramean',
    src: 'assets/2026-07-26_DbQGS7Gzi9F/01.mp4',
    start: 0,
    duration: 14,
    title: 'Senin keramean',
    poster: 10,
  },
  {
    name: 'promo-print-195',
    src: 'assets/2026-09-28_Dd0dzzsTlpk/01.mp4',
    start: 0,
    duration: 24,
    title: 'Rp195/lembar, rapi & cepat',
    poster: 6,
  },
  {
    name: 'cetak-a3',
    src: 'assets/2026-09-25_Ddti_zSz8Ex/01.mp4',
    start: 0,
    duration: 18,
    title: 'Cetak A3 sudah bisa',
    poster: 6,
  },
];
