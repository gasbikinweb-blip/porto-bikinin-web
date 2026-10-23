import type { Service } from './types';

// Deskripsi umum layanan. TODO: tinjau ulang copywriting bersama tim Griya Nuansa.
export const services: Service[] = [
  {
    slug: 'arsitektur',
    title: 'Desain Arsitektur',
    short: 'Perancangan rumah tinggal dan bangunan komersial dari konsep hingga gambar kerja.',
    description: [
      'Kami merancang bangunan yang menjawab kebutuhan penghuninya: tata ruang yang efisien, pencahayaan alami, dan tampilan yang tenang serta berumur panjang.',
      'Sebagai jasa arsitek di Serpong yang melayani Jabodetabek, kami mendampingi proses dari diskusi kebutuhan, konsep massa bangunan, hingga gambar kerja yang siap dibangun.',
    ],
    scope: [
      'Konsultasi kebutuhan dan program ruang',
      'Konsep desain dan denah',
      'Visualisasi 3D eksterior',
      'Gambar kerja arsitektur',
      'Pendampingan saat pembangunan', // TODO: konfirmasi apakah termasuk
    ],
    audience: ['Pemilik rumah', 'Developer', 'Pemilik usaha', 'Industri'],
  },
  {
    slug: 'desain-interior',
    title: 'Desain Interior',
    short: 'Interior rumah, apartemen, dan ruang usaha yang fungsional dan bernuansa.',
    description: [
      'Desain interior yang berangkat dari cara Anda menggunakan ruang sehari-hari. Material, warna, dan pencahayaan dipilih agar ruang terasa hangat dan mudah dirawat.',
      'Kami menangani desain interior di Tangerang Selatan dan sekitarnya untuk rumah, apartemen, kafe, gym, klinik, hingga kantor.',
    ],
    scope: [
      'Konsep interior dan moodboard',
      'Layout dan zonasi ruang',
      'Visualisasi 3D interior',
      'Gambar kerja interior dan detail furnitur',
      'Pengerjaan (build) interior',
    ],
    audience: ['Pemilik rumah & apartemen', 'Kafe & bakery', 'Gym & klinik', 'Kantor'],
  },
  {
    slug: 'kitchen-set-furnitur',
    title: 'Kitchen Set & Furnitur Custom',
    short: 'Kitchen set, lemari, dan furnitur built-in yang dibuat sesuai ukuran ruang.',
    description: [
      'Furnitur custom membuat setiap sentimeter ruang bekerja. Kami merancang kitchen set, wardrobe, backdrop TV, hingga meja kasir yang presisi dengan ruang Anda.',
      'Melayani jasa kitchen set di BSD, Serpong, dan area Jabodetabek lainnya.',
    ],
    scope: [
      'Survei dan pengukuran',
      'Desain dan pemilihan material',
      'Produksi furnitur',
      'Pemasangan di lokasi',
    ],
    audience: ['Pemilik rumah & apartemen', 'Pemilik usaha', 'Pemilik kost'],
  },
  {
    slug: 'renovasi',
    title: 'Renovasi',
    short: 'Memperbarui rumah dan ruang usaha tanpa harus membangun dari nol.',
    description: [
      'Renovasi yang terencana dimulai dari desain yang jelas. Kami membantu menata ulang ruang, memperbarui tampilan, dan memperbaiki fungsi bangunan.',
      'Melayani renovasi rumah di Tangerang dan sekitarnya, dari skala parsial hingga menyeluruh.',
    ],
    scope: [
      'Survei kondisi eksisting',
      'Desain renovasi',
      'Rencana anggaran biaya', // TODO: konfirmasi istilah/format penawaran
      'Pelaksanaan pekerjaan dan serah terima',
    ],
    audience: ['Pemilik rumah', 'Pemilik usaha', 'Pemilik kost'],
  },
  {
    slug: 'property-management',
    title: 'Property Management',
    short: 'Pengelolaan properti sewa agar tetap terawat, terisi, dan bernilai.',
    description: [
      'Untuk pemilik kost dan properti sewa, kami membantu dari sisi desain hingga pengelolaan agar properti tetap menarik bagi penyewa.',
      'TODO: lengkapi rincian layanan property management sesuai praktik Griya Nuansa.',
    ],
    scope: [
      'Desain dan penataan unit sewa', // TODO: verifikasi ruang lingkup
      'Perawatan dan perbaikan berkala', // TODO
      'Pendampingan operasional properti', // TODO
    ],
    audience: ['Pemilik kost', 'Pemilik properti sewa', 'Developer'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
