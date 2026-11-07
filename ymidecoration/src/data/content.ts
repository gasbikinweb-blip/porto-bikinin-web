// Layanan, alur booking, dan FAQ. Yang belum dikonfirmasi pemilik ditandai TODO.
import type { EventType } from './events';

export type Service = {
  type: EventType;
  title: string;
  text: string;
  image: [slug: string, index: number];
};

export const services: Service[] = [
  {
    type: 'wedding',
    title: 'Wedding & Resepsi',
    text: 'Pelaminan, lorong masuk, hingga galeri foto pasangan, dari intimate sampai megah.',
    image: ['della-adil', 1],
  },
  {
    type: 'akad',
    title: 'Akad',
    text: 'Meja akad dan backdrop yang tenang dan khidmat untuk momen paling sakral.',
    image: ['berlin-aziz', 0],
  },
  {
    type: 'engagement',
    title: 'Engagement & Lamaran',
    text: 'Panel nama pasangan, kursi, dan rangkaian bunga untuk acara lamaran yang hangat.',
    image: ['dita-iqbal', 0],
  },
  {
    type: 'birthday',
    title: 'Ulang Tahun',
    // TODO: ganti foto dengan dokumentasi dekorasi ulang tahun asli
    text: 'Dekorasi ulang tahun dengan tema dan warna sesuai keinginan Anda.',
    image: ['putri-luthfi', 0],
  },
  {
    type: 'other',
    title: 'Acara Lainnya',
    text: 'Acara keluarga, syukuran, atau momen spesial lainnya. Ceritakan rencananya pada kami.',
    image: ['shinta-aufar', 0],
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
