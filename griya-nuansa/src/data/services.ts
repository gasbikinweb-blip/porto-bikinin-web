import type { Service } from './types';

// Deskripsi umum layanan. TODO: tinjau ulang copywriting (ID & EN) bersama tim Griya Nuansa.
export const services: Service[] = [
  {
    slug: 'arsitektur',
    title: { id: 'Desain Arsitektur', en: 'Architectural Design' },
    short: {
      id: 'Perancangan rumah tinggal dan bangunan komersial dari konsep hingga gambar kerja.',
      en: 'Design of homes and commercial buildings, from concept to construction drawings.',
    },
    description: {
      id: [
        'Kami merancang bangunan yang menjawab kebutuhan penghuninya: tata ruang yang efisien, pencahayaan alami, dan tampilan yang tenang serta berumur panjang.',
        'Sebagai jasa arsitek di Serpong yang melayani Jabodetabek, kami mendampingi proses dari diskusi kebutuhan, konsep massa bangunan, hingga gambar kerja yang siap dibangun.',
      ],
      en: [
        'We design buildings that answer the needs of the people who live in them: efficient layouts, natural light, and a calm, timeless appearance.',
        'As an architecture studio in Serpong serving Greater Jakarta, we guide the process from discussing your needs and the building concept to construction-ready drawings.',
      ],
    },
    scope: {
      id: [
        'Konsultasi kebutuhan dan program ruang',
        'Konsep desain dan denah',
        'Visualisasi 3D eksterior',
        'Gambar kerja arsitektur',
        'Pendampingan saat pembangunan', // TODO: konfirmasi apakah termasuk
      ],
      en: [
        'Needs consultation and space programming',
        'Design concept and floor plans',
        '3D exterior visualisation',
        'Architectural construction drawings',
        'Support during construction',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Developer', 'Pemilik usaha', 'Industri'],
      en: ['Homeowners', 'Developers', 'Business owners', 'Industry'],
    },
  },
  {
    slug: 'desain-interior',
    title: { id: 'Desain Interior', en: 'Interior Design' },
    short: {
      id: 'Interior rumah, apartemen, dan ruang usaha yang fungsional dan bernuansa.',
      en: 'Functional, atmospheric interiors for homes, apartments, and business spaces.',
    },
    description: {
      id: [
        'Desain interior yang berangkat dari cara Anda menggunakan ruang sehari-hari. Material, warna, dan pencahayaan dipilih agar ruang terasa hangat dan mudah dirawat.',
        'Kami menangani desain interior di Tangerang Selatan dan sekitarnya untuk rumah, apartemen, kafe, gym, klinik, hingga kantor.',
      ],
      en: [
        'Interior design that starts from how you use your space every day. Materials, colours, and lighting are chosen so the space feels warm and is easy to maintain.',
        'We handle interior design in South Tangerang and the surrounding area for homes, apartments, cafés, gyms, clinics, and offices.',
      ],
    },
    scope: {
      id: [
        'Konsep interior dan moodboard',
        'Layout dan zonasi ruang',
        'Visualisasi 3D interior',
        'Gambar kerja interior dan detail furnitur',
        'Pengerjaan (build) interior',
      ],
      en: [
        'Interior concept and moodboard',
        'Layout and space zoning',
        '3D interior visualisation',
        'Interior drawings and furniture details',
        'Interior build',
      ],
    },
    audience: {
      id: ['Pemilik rumah & apartemen', 'Kafe & bakery', 'Gym & klinik', 'Kantor'],
      en: ['Home & apartment owners', 'Cafés & bakeries', 'Gyms & clinics', 'Offices'],
    },
  },
  {
    slug: 'kitchen-set-furnitur',
    title: { id: 'Kitchen Set & Furnitur Custom', en: 'Kitchen Set & Custom Furniture' },
    short: {
      id: 'Kitchen set, lemari, dan furnitur built-in yang dibuat sesuai ukuran ruang.',
      en: 'Kitchen sets, wardrobes, and built-in furniture made to fit your space.',
    },
    description: {
      id: [
        'Furnitur custom membuat setiap sentimeter ruang bekerja. Kami merancang kitchen set, wardrobe, backdrop TV, hingga meja kasir yang presisi dengan ruang Anda.',
        'Melayani jasa kitchen set di BSD, Serpong, dan area Jabodetabek lainnya.',
      ],
      en: [
        'Custom furniture makes every centimetre of a room work. We design kitchen sets, wardrobes, TV backdrops, and cashier counters that fit your space precisely.',
        'Kitchen set services in BSD, Serpong, and across Greater Jakarta.',
      ],
    },
    scope: {
      id: [
        'Survei dan pengukuran',
        'Desain dan pemilihan material',
        'Produksi furnitur',
        'Pemasangan di lokasi',
      ],
      en: [
        'Site survey and measuring',
        'Design and material selection',
        'Furniture production',
        'On-site installation',
      ],
    },
    audience: {
      id: ['Pemilik rumah & apartemen', 'Pemilik usaha', 'Pemilik kost'],
      en: ['Home & apartment owners', 'Business owners', 'Boarding house owners'],
    },
  },
  {
    slug: 'renovasi',
    title: { id: 'Renovasi', en: 'Renovation' },
    short: {
      id: 'Memperbarui rumah dan ruang usaha tanpa harus membangun dari nol.',
      en: 'Refreshing homes and business spaces without building from scratch.',
    },
    description: {
      id: [
        'Renovasi yang terencana dimulai dari desain yang jelas. Kami membantu menata ulang ruang, memperbarui tampilan, dan memperbaiki fungsi bangunan.',
        'Melayani renovasi rumah di Tangerang dan sekitarnya, dari skala parsial hingga menyeluruh.',
      ],
      en: [
        'A well-planned renovation starts with a clear design. We help rearrange spaces, refresh their look, and improve how the building works.',
        'Home renovations in Tangerang and the surrounding area, from partial to full-scale.',
      ],
    },
    scope: {
      id: [
        'Survei kondisi eksisting',
        'Desain renovasi',
        'Rencana anggaran biaya', // TODO: konfirmasi istilah/format penawaran
        'Pelaksanaan pekerjaan dan serah terima',
      ],
      en: [
        'Survey of existing conditions',
        'Renovation design',
        'Cost estimate',
        'Construction and handover',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Pemilik usaha', 'Pemilik kost'],
      en: ['Homeowners', 'Business owners', 'Boarding house owners'],
    },
  },
  {
    slug: 'property-management',
    title: { id: 'Property Management', en: 'Property Management' },
    short: {
      id: 'Pengelolaan properti sewa agar tetap terawat, terisi, dan bernilai.',
      en: 'Managing rental properties so they stay well-kept, occupied, and valuable.',
    },
    description: {
      id: [
        'Untuk pemilik kost dan properti sewa, kami membantu dari sisi desain hingga pengelolaan agar properti tetap menarik bagi penyewa.',
        'TODO: lengkapi rincian layanan property management sesuai praktik Griya Nuansa.',
      ],
      en: [
        'For boarding house and rental property owners, we help with everything from design to management so the property stays attractive to tenants.',
      ],
    },
    scope: {
      id: [
        'Desain dan penataan unit sewa', // TODO: verifikasi ruang lingkup
        'Perawatan dan perbaikan berkala', // TODO
        'Pendampingan operasional properti', // TODO
      ],
      en: [
        'Rental unit design and styling',
        'Routine maintenance and repairs',
        'Property operations support',
      ],
    },
    audience: {
      id: ['Pemilik kost', 'Pemilik properti sewa', 'Developer'],
      en: ['Boarding house owners', 'Rental property owners', 'Developers'],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
