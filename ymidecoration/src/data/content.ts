// Layanan, alur booking, dan FAQ. Yang belum dikonfirmasi pemilik ditandai TODO.
import type { EventType } from './events';

export type Service = {
  type: EventType;
  title: string;
  text: string;
  image: [slug: string, index: number];
  // Unsur dekorasi yang terlihat di portofolio. TODO: konfirmasi isi paket ke pemilik
  includes: string[];
};

export const services: Service[] = [
  {
    type: 'wedding',
    title: 'Wedding & Resepsi',
    text: 'Pelaminan, lorong masuk, hingga galeri foto pasangan, dari intimate sampai megah. Warna dan rangkaian bunga disusun mengikuti ruang venue dan cerita Anda berdua.',
    image: ['della-adil', 1],
    includes: [
      'Backdrop pelaminan',
      'Lorong & pintu masuk',
      'Galeri foto pasangan',
      'Rangkaian bunga',
    ],
  },
  {
    type: 'akad',
    title: 'Akad',
    text: 'Meja akad dan backdrop yang tenang dan khidmat untuk momen paling sakral, dengan rangkaian bunga yang tidak berlebihan namun tetap berkesan.',
    image: ['berlin-aziz', 0],
    includes: ['Meja akad', 'Backdrop & panel nama', 'Kursi akad', 'Papan welcome'],
  },
  {
    type: 'engagement',
    title: 'Engagement & Lamaran',
    text: 'Panel nama pasangan, kursi, dan rangkaian bunga untuk acara lamaran yang hangat bersama keluarga.',
    image: ['dita-iqbal', 0],
    includes: ['Panel nama pasangan', 'Kursi pasangan', 'Bunga gantung', 'Karpet & alas'],
  },
  {
    type: 'birthday',
    title: 'Ulang Tahun',
    // TODO: ganti foto dengan dokumentasi dekorasi ulang tahun asli
    text: 'Dekorasi ulang tahun dengan tema dan warna sesuai keinginan Anda, dari perayaan kecil di rumah sampai acara di venue.',
    image: ['putri-luthfi', 0],
    includes: ['Backdrop tema', 'Rangkaian bunga', 'Sudut foto'],
  },
  {
    type: 'other',
    title: 'Acara Lainnya',
    text: 'Acara keluarga, syukuran, atau momen spesial lainnya. Ceritakan rencananya, lalu kami bantu wujudkan konsepnya.',
    image: ['shinta-aufar', 0],
    includes: ['Konsep sesuai acara', 'Papan welcome', 'Rangkaian bunga'],
  },
];

// TODO: konfirmasi alur booking asli
export const steps = [
  { title: 'Konsultasi', text: 'Ceritakan tanggal, venue, dan konsep acara lewat WhatsApp.' },
  {
    title: 'Survei venue',
    text: 'Kami melihat dan mengukur lokasi agar dekorasi pas dengan ruangannya.',
  },
  {
    title: 'Moodboard & penawaran',
    text: 'Anda menerima usulan konsep, warna, dan rincian penawaran.',
  },
  { title: 'DP & kunci tanggal', text: 'Tanggal acara kami kunci setelah pembayaran DP.' },
  {
    title: 'Hari H',
    text: 'Tim kami memasang dekorasi sebelum acara dan membongkarnya setelah selesai.',
  },
];

// TODO: semua jawaban perlu dikonfirmasi pemilik
export const faqs = [
  {
    q: 'Berapa lama sebelumnya saya harus booking?',
    a: 'Semakin awal semakin baik, karena tanggal ramai cepat penuh. Hubungi kami untuk mengecek ketersediaan tanggal Anda.',
  },
  {
    q: 'Apakah melayani di luar Surabaya?',
    a: 'Kami melayani Surabaya, Sidoarjo, Gresik, dan sekitarnya. Untuk kota lain, silakan tanyakan lewat WhatsApp.',
  },
  {
    q: 'Apakah bisa request tema dan warna?',
    a: 'Bisa. Kirimkan referensi warna atau foto inspirasi, lalu kami bantu wujudkan dalam moodboard.',
  },
  {
    q: 'Bunganya asli atau artificial?',
    a: 'Silakan tanyakan ke admin sesuai konsep dan budget yang Anda pilih.',
  },
  {
    q: 'Bagaimana sistem DP dan pelunasan?',
    a: 'Tanggal acara dikunci dengan DP. Rincian besaran dan waktu pelunasan dijelaskan saat penawaran.',
  },
  {
    q: 'Apakah sudah termasuk pemasangan dan bongkar?',
    a: 'Silakan konfirmasi ke admin, karena rinciannya bergantung pada paket dan venue.',
  },
  {
    q: 'Apakah bisa survei venue?',
    a: 'Bisa diatur bersama admin sebelum konsep final disepakati.',
  },
];

// TODO: tentukan rentang budget bersama pemilik
export const budgets = [
  'Belum tahu, mohon dibantu',
  'Di bawah Rp10 juta',
  'Rp10–25 juta',
  'Di atas Rp25 juta',
] as const;
