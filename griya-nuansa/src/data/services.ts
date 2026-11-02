import type { Service } from './types';

// Layanan sesuai Brief Web Griya Nuansa: Arsitektur, Interior, Manajemen Properti, Kontraktor, Konsultan.
// Isi layanan lama (kitchen set & renovasi) digabung ke Interior dan Kontraktor.
// TODO: tinjau ulang copywriting (ID & EN) bersama tim Griya Nuansa.
export const services: Service[] = [
  {
    slug: 'arsitektur',
    title: { id: 'Arsitektur', en: 'Architecture' },
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
        'Gambar kerja arsitektur (DED)',
      ],
      en: [
        'Needs consultation and space programming',
        'Design concept and floor plans',
        '3D exterior visualisation',
        'Architectural construction drawings (DED)',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Developer', 'Pemilik usaha', 'Perusahaan'],
      en: ['Homeowners', 'Developers', 'Business owners', 'Companies'],
    },
  },
  {
    slug: 'desain-interior',
    title: { id: 'Interior', en: 'Interior' },
    short: {
      id: 'Desain interior dan furnitur custom untuk rumah, apartemen, dan ruang usaha.',
      en: 'Interior design and custom furniture for homes, apartments, and business spaces.',
    },
    description: {
      id: [
        'Desain interior yang berangkat dari cara Anda menggunakan ruang sehari-hari. Material, warna, dan pencahayaan dipilih agar ruang terasa hangat dan mudah dirawat.',
        'Termasuk kitchen set, wardrobe, backdrop TV, hingga meja kasir yang dibuat presisi sesuai ukuran ruang, untuk rumah, apartemen, kafe, gym, klinik, dan kantor di Jabodetabek.',
      ],
      en: [
        'Interior design that starts from how you use your space every day. Materials, colours, and lighting are chosen so the space feels warm and is easy to maintain.',
        'Including kitchen sets, wardrobes, TV backdrops, and cashier counters made precisely to fit, for homes, apartments, cafés, gyms, clinics, and offices across Greater Jakarta.',
      ],
    },
    scope: {
      id: [
        'Konsep interior dan moodboard',
        'Layout dan zonasi ruang',
        'Visualisasi 3D interior',
        'Kitchen set & furnitur custom',
        'Gambar kerja interior dan detail furnitur',
      ],
      en: [
        'Interior concept and moodboard',
        'Layout and space zoning',
        '3D interior visualisation',
        'Kitchen sets & custom furniture',
        'Interior drawings and furniture details',
      ],
    },
    audience: {
      id: ['Pemilik rumah & apartemen', 'Kafe & bakery', 'Gym & klinik', 'Kantor'],
      en: ['Home & apartment owners', 'Cafés & bakeries', 'Gyms & clinics', 'Offices'],
    },
  },
  {
    slug: 'property-management',
    title: { id: 'Manajemen Properti', en: 'Property Management' },
    short: {
      id: 'Pengelolaan, perawatan, dan maintenance properti agar tetap terawat dan bernilai.',
      en: 'Management, upkeep, and maintenance so properties stay well-kept and valuable.',
    },
    description: {
      id: [
        'Untuk pemilik rumah, kost, dan properti sewa, kami membantu dari sisi desain hingga pengelolaan agar properti tetap nyaman, menarik, dan bernilai jangka panjang.',
        'TODO: lengkapi rincian layanan manajemen properti sesuai praktik Griya Nuansa.',
      ],
      en: [
        'For homeowners, boarding houses, and rental properties, we help with everything from design to management so the property stays comfortable, attractive, and valuable in the long run.',
      ],
    },
    scope: {
      id: [
        'Perawatan dan perbaikan berkala (maintenance)', // TODO: verifikasi ruang lingkup
        'Penataan dan pembaruan unit sewa', // TODO
        'Pendampingan operasional properti', // TODO
      ],
      en: [
        'Routine maintenance and repairs',
        'Styling and refreshing rental units',
        'Property operations support',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Pemilik kost & properti sewa', 'Developer'],
      en: ['Homeowners', 'Boarding & rental property owners', 'Developers'],
    },
  },
  {
    slug: 'kontraktor',
    title: { id: 'Kontraktor', en: 'Contractor' },
    short: {
      id: 'Pembangunan dan renovasi, dari pekerjaan sipil hingga interior, sesuai gambar kerja.',
      en: 'Construction and renovation, from civil works to interiors, built to the drawings.',
    },
    description: {
      id: [
        'Tim kontraktor kami mewujudkan desain menjadi bangunan: pembangunan baru, renovasi parsial maupun menyeluruh, hingga pengerjaan interior dan furnitur custom.',
        'Setiap pekerjaan diawasi dengan kontrol kualitas harian dan laporan progres rutin, sehingga hasil akhir sesuai dengan gambar dan anggaran yang disepakati.',
      ],
      en: [
        'Our contractor team turns designs into buildings: new construction, partial or full renovation, and interior and custom furniture works.',
        'Every job is supervised with daily quality control and regular progress reports, so the result matches the agreed drawings and budget.',
      ],
    },
    scope: {
      id: [
        'Survei kondisi eksisting',
        'Rencana anggaran biaya (RAB)',
        'Pembangunan & renovasi',
        'Pengerjaan interior dan furnitur',
        'Pengawasan konstruksi dan serah terima',
      ],
      en: [
        'Survey of existing conditions',
        'Cost estimate (RAB)',
        'Construction & renovation',
        'Interior and furniture works',
        'Construction supervision and handover',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Pemilik usaha', 'Perusahaan'],
      en: ['Homeowners', 'Business owners', 'Companies'],
    },
  },
  {
    slug: 'konsultan',
    title: { id: 'Konsultan', en: 'Consultant' },
    short: {
      id: 'Pendampingan ahli untuk perencanaan, anggaran, dan keputusan teknis proyek Anda.',
      en: 'Expert guidance on planning, budgeting, and technical decisions for your project.',
    },
    description: {
      id: [
        'Belum yakin harus mulai dari mana? Kami membantu memetakan kebutuhan, memperkirakan anggaran, dan menilai kelayakan rencana sebelum Anda memulai pembangunan atau renovasi.',
        'Layanan konsultasi juga cocok bagi Anda yang sudah memiliki desain atau kontraktor sendiri dan membutuhkan pendapat profesional yang independen.',
      ],
      en: [
        'Not sure where to start? We help map your needs, estimate the budget, and assess the feasibility of your plans before you begin construction or renovation.',
        'Consulting also suits clients who already have their own design or contractor and want an independent professional opinion.',
      ],
    },
    scope: {
      // TODO: verifikasi ruang lingkup layanan konsultan bersama Griya Nuansa
      id: [
        'Konsultasi kebutuhan dan konsep',
        'Estimasi anggaran',
        'Kajian desain dan teknis',
        'Pendampingan perizinan bangunan (PBG)',
      ],
      en: [
        'Needs and concept consultation',
        'Budget estimation',
        'Design and technical review',
        'Building permit (PBG) assistance',
      ],
    },
    audience: {
      id: ['Pemilik rumah', 'Pemilik usaha', 'Developer'],
      en: ['Homeowners', 'Business owners', 'Developers'],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
