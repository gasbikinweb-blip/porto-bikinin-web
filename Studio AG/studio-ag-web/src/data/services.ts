// Layanan utama. Isi disarikan dari Portfolio.pdf (Introduction, What We Do, Our Workshop).
export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  points: { title: string; text: string }[];
  /** Slug proyek terkait untuk contoh */
  projects: string[];
  /** Slug proyek yang sampulnya dipakai */
  coverProject: string;
};

export const services: Service[] = [
  {
    slug: 'desain-interior',
    title: 'Desain Interior',
    short: 'Konsep, layout, visual 3D, dan gambar teknis yang siap dikerjakan.',
    intro:
      'Kami memulai dari kebiasaan dan kebutuhan Anda, lalu menerjemahkannya menjadi konsep desain, layout yang efisien, visualisasi 3D, spesifikasi material, hingga gambar teknis detail.',
    points: [
      {
        title: 'Konsultasi',
        text: 'Memahami kebutuhan owner dan menentukan solusi untuk mentransformasikan ruang impian Anda.',
      },
      {
        title: 'Digital Rendering',
        text: 'Visualisasi 3D agar Anda bisa melihat gambaran ruang secara menyeluruh sebelum produksi.',
      },
      {
        title: 'Gambar Teknis & Material',
        text: 'Konsep desain, spesifikasi material, dan gambar kerja detail untuk perencanaan yang terarah.',
      },
    ],
    projects: ['d-a-park-serpong', 's-r-kids-bedroom', 'kafe-singkawang'],
    coverProject: 's-r-kids-bedroom',
  },
  {
    slug: 'build-produksi-furnitur',
    title: 'Build & Produksi Furnitur',
    short: 'Furnitur custom diproduksi di workshop kami sendiri, lalu dipasang di lokasi.',
    intro:
      'Seluruh proses produksi dikerjakan melalui workshop kami dengan perhatian pada detail: persiapan, produksi, quality check, hingga instalasi dan finishing di lapangan.',
    points: [
      {
        title: 'Workshop Sendiri',
        text: 'Kabinet, kitchen set, wardrobe, backdrop TV, hingga meja kantor dibuat sesuai gambar kerja.',
      },
      {
        title: 'Quality Check',
        text: 'Setiap proyek yang berjalan selalu melalui QC agar hasil sesuai rencana dan rapi.',
      },
      {
        title: 'Instalasi',
        text: 'Pemasangan dan sentuhan akhir di lokasi oleh tim kami.',
      },
    ],
    projects: ['furnitur-kantor-custom', 'b-a-house', 't-kitchen-living'],
    coverProject: 'b-a-house',
  },
  {
    slug: 'renovasi-interior',
    title: 'Renovasi Interior',
    short: 'Dari pekerjaan sipil hingga interior, dalam satu manajemen.',
    intro:
      'Untuk rumah, apartemen, maupun kantor yang ingin ditata ulang. Kami menangani tata ruang baru, pekerjaan sipil, hingga interior agar setiap area terasa lebih lega dan fungsional.',
    points: [
      {
        title: 'Tata Ruang Baru',
        text: 'Mengoptimalkan layout yang terbatas agar sirkulasi lebih nyaman.',
      },
      {
        title: 'Sipil & Interior',
        text: 'Satu tim untuk pekerjaan sipil dan interior, tanpa koordinasi berlapis.',
      },
      {
        title: 'Project Plan & Schedule',
        text: 'Perencanaan dan jadwal proyek yang jelas sejak awal.',
      },
    ],
    projects: ['a-f-house', 'kantor-jatiwarna', 'e-s-bedroom'],
    coverProject: 'a-f-house',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
