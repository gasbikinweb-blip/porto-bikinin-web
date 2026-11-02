import type { L } from '@/i18n';
import { config } from '@/lib/config';

// Data identitas studio. Data yang belum tersedia ditandai TODO.
export const site = {
  name: config.siteName,
  url: config.siteUrl,
  tagline: 'Architecture · Interior Design · Property Management',
  description:
    'Griya Nuansa adalah studio arsitektur, desain interior, dan property management di Serpong, Tangerang Selatan, yang melayani area Jabodetabek.',
  descriptionL: {
    id: 'Griya Nuansa adalah studio arsitektur, desain interior, dan property management di Serpong, Tangerang Selatan, yang melayani area Jabodetabek.',
    en: 'Griya Nuansa is an architecture, interior design, and property management studio in Serpong, South Tangerang, serving Greater Jakarta.',
  } satisfies L,
  city: 'Serpong, Tangerang Selatan',
  cityL: { id: 'Serpong, Tangerang Selatan', en: 'Serpong, South Tangerang' } satisfies L,
  // Sumber: assets_baru/informasi.txt
  address:
    'Ruko Victoria Square, Jl. Buaran Raya No. 8, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310',
  mapsUrl: 'https://maps.app.goo.gl/Yjwyk5oia8XtGAyL6',
  // Peta tersemat (iframe) di halaman Kontak. Domain www.google.com sudah diizinkan di CSP frame-src.
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7930.804198730527!2d106.685946!3d-6.3419384!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1b2303c345d%3A0x78c04fc375d6daab!2sGriya%20Nuansa!5e0!3m2!1sid!2sid!4v1793661050352!5m2!1sid!2sid',
  email: 'halo@griyanuansa.id', // TODO: ganti dengan email resmi
  // Sumber: informasi.txt (08:30–17:30). TODO: konfirmasi hari kerja
  hours: { id: '08.30–17.30 WIB', en: '8:30 AM – 5:30 PM (WIB)' } satisfies L,
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
