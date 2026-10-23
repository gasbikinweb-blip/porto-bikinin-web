import { config } from '@/lib/config';

// Data identitas studio. Data yang belum tersedia ditandai TODO.
export const site = {
  name: config.siteName,
  url: config.siteUrl,
  tagline: 'Architecture · Interior Design · Property Management',
  description:
    'Griya Nuansa adalah studio arsitektur, desain interior, dan property management di Serpong, Tangerang Selatan, yang melayani area Jabodetabek.',
  city: 'Serpong, Tangerang Selatan',
  address: 'Serpong, Tangerang Selatan, Banten', // TODO: alamat lengkap
  email: 'halo@griyanuansa.id', // TODO: ganti dengan email resmi
  hours: 'Senin–Sabtu, 09.00–17.00 WIB', // TODO: jam kerja resmi
  foundedYear: undefined as number | undefined, // TODO: tahun berdiri
  serviceArea: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Tangerang Selatan', 'Bekasi'],
  whatsapp: [
    { number: config.waNumber, label: '+62 811-187-001' },
    { number: config.waNumber2, label: '+62 819-0118-7001' },
  ],
  instagramFollowers: '3.100+', // TODO: verifikasi angka saat rilis
  social: {
    instagram: 'https://www.instagram.com/griyanuansa.id/',
    threads: 'https://www.threads.com/@griyanuansa.id',
    youtube: 'https://www.youtube.com/@griyanuansaid',
    tiktok: 'https://www.tiktok.com/@griyanuansa.id',
  },
  hashtags: ['#KaryaNuansa', '#arsitekturjabodetabek'],
  // TODO: taruh file PDF asli di public/files/ dengan nama yang sama
  downloads: {
    companyProfile: '/files/company-profile-griya-nuansa.pdf',
    pricelist: '/files/pricelist-griya-nuansa.pdf',
  },
} as const;

export const defaultWaMessage =
  'Halo Griya Nuansa, saya ingin konsultasi mengenai desain/pengerjaan properti saya.';
