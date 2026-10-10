import { siteConfig } from '@/lib/config';
import type { Content } from './types';

const name = siteConfig.name;

export const id: Content = {
  lang: 'id',
  home: '/',
  meta: {
    title: `${name} | Fotografer & Videografer Umrah di Makkah dan Madinah`,
    description:
      'Jasa foto dan video umrah di Makkah & Madinah. Solo, pasangan, keluarga, hingga rombongan travel. Pesan jadwal langsung lewat WhatsApp.',
    ogLocale: 'id_ID',
  },
  skip: 'Lewati ke konten utama',
  nav: [
    { href: '#cerita', label: 'Cerita' },
    { href: '#lokasi', label: 'Lokasi' },
    { href: '#video', label: 'Video' },
    { href: '#paket', label: 'Paket' },
    { href: '#tanya', label: 'Tanya Jawab' },
  ],
  navCta: 'Pesan Jadwal',
  menu: { open: 'Buka menu', close: 'Tutup menu', label: 'Menu utama' },
  theme: { toLight: 'Ganti ke mode terang', toDark: 'Ganti ke mode gelap' },
  switchLang: { href: '/en', label: 'EN', aria: 'Read in English' },
  wa: {
    general: `Assalamualaikum ${name}, saya ingin bertanya tentang jadwal foto/video umrah.`,
    floating: 'Chat WhatsApp',
    newTab: '(membuka tab baru)',
  },

  hero: {
    eyebrow: 'Foto & Video · Makkah — Madinah',
    title: ['Perjalanan sekali', 'seumur hidup,', 'layak diabadikan.'],
    lead: 'Fokuslah beribadah. Kami yang menangkap tatapan haru di pelataran Nabawi, langkah pelan menuju Baitullah, dan senja yang ingin kamu ceritakan sepulang nanti.',
    cta: 'Pesan Jadwal Foto',
    secondary: 'Lihat Karya',
    caption: 'Momen klien kami di Tanah Suci',
    clips: {
      'senja-berdua': 'Senja di bukit Makkah',
      'rindu-kembali': 'Pelataran Masjidil Haram',
      'hati-tenang-jiwa-pulang': 'Abraj Al-Bait, Makkah',
      'langkah-di-tanah-haram': 'Langkah berdua di Makkah',
      'berlandaskan-iman': 'Di hadapan Baitullah',
      'berdampingan-di-rumah-nya': 'Gerbang Masjidil Haram',
    },
    scroll: 'Gulir',
  },
  places_marquee: [
    'Masjid Nabawi',
    'Masjidil Haram',
    'Kubah Hijau',
    'Abraj Al-Bait',
    'Bukit Makkah',
    'Pelataran Payung Nabawi',
  ],
  manifesto: {
    label: 'Kenapa diabadikan',
    before: 'Doa yang kamu panjatkan akan tersimpan di langit.',
    middle: 'Wajah-wajah yang menemanimu,',
    after: 'biar kami simpan di sini, untuk kamu buka lagi kapan pun rindu datang.',
  },

  stories: {
    label: 'Cerita',
    title: 'Setiap tamu Allah membawa kisahnya sendiri',
    intro: 'Bukan sekadar kumpulan foto. Ini potongan perjalanan klien kami, dari pelataran Nabawi sampai senja di bukit Makkah.',
    photos: 'foto',
    items: {
      'senja-di-bukit-makkah': {
        title: 'Senja di Bukit Makkah',
        place: 'Makkah',
        blurb: 'Karpet, lentera, dan menara jam yang perlahan menyala. Sesi pasangan menjelang magrib.',
      },
      'teduh-di-nabawi': {
        title: 'Teduh di Nabawi',
        place: 'Madinah',
        blurb: 'Di bawah payung-payung raksasa, satu jam yang tenang, dirangkai menjadi album.',
      },
      'berdua-di-baitullah': {
        title: 'Berdua di Baitullah',
        place: 'Makkah',
        blurb: 'Datang sebagai pasangan, pulang dengan kenangan yang lebih dalam.',
      },
      'rindu-madinah': {
        title: 'Rindu Madinah',
        place: 'Madinah',
        blurb: 'Pagi di kota Nabi: kubah hijau, langit biru, dan senyum yang tidak dibuat-buat.',
      },
    },
    ask: 'Mau sesi seperti ini',
    askMessage: 'Assalamualaikum Lens Haramain, saya suka cerita "{story}". Apakah bisa dibuatkan sesi serupa?',
    endTitle: 'Bab berikutnya bisa jadi milikmu.',
  },

  places: {
    label: 'Lokasi',
    title: 'Tempat yang paling sering kami datangi',
    intro: 'Jadwal sesi menyesuaikan itinerary travel kamu, di luar waktu salat dan mengikuti aturan pengelola setempat.',
    items: [
      { name: 'Pelataran Payung Nabawi', arabic: 'المسجد النبوي', city: 'Madinah', note: 'Teduh, bersih, cahaya lembut di pagi hari.' },
      { name: 'Kubah Hijau', arabic: 'القبة الخضراء', city: 'Madinah', note: 'Ikon kota Nabi, cantik di bawah langit biru.' },
      { name: 'Pelataran Masjidil Haram', arabic: 'المسجد الحرام', city: 'Makkah', note: 'Menara dan gerbang megah di sekitar Baitullah.' },
      { name: 'Abraj Al-Bait', arabic: 'أبراج البيت', city: 'Makkah', note: 'Gerbang dan menara jam, latar paling dikenal.' },
      { name: 'Bukit Panorama Makkah', arabic: 'جبال مكة', city: 'Makkah', note: 'Senja dengan pemandangan kota dan menara jam.' },
    ],
    more: 'Punya lokasi impian lain? Ceritakan saja, kami bantu cek kemungkinannya.',
  },

  reels: {
    label: 'Video',
    title: 'Karena sebagian momen perlu bergerak',
    intro: 'Video sinematik vertikal, siap dibagikan ke keluarga di rumah dan Instagram.',
    play: 'Putar video',
    items: {
      'senja-berdua': 'Mencintaimu sampai akhir hayat',
      'rindu-kembali': 'Izinkan kami kembali menjadi tamu-Mu',
      'hati-tenang-jiwa-pulang': 'Hati tenang, jiwa pulang',
      'langkah-di-tanah-haram': 'Langkah berdua di Tanah Haram',
      'berlandaskan-iman': 'Cinta yang berlandaskan iman',
      'berdampingan-di-rumah-nya': 'Berdampingan di rumah-Nya',
    },
  },

  wall: {
    title: ['Setiap bingkai,', 'sebuah doa.'],
    body: 'Ratusan langkah di dua kota suci, kami jaga satu per satu, agar kenangannya tidak memudar bersama waktu.',
  },

  testimonials: {
    label: 'Kata mereka',
    title: 'Pulang dengan kenangan yang bisa dibuka lagi',
    // TODO: CONTOH, bukan testimoni asli. Ganti dengan kata-kata klien sungguhan (minta izin dulu),
    // lalu ubah sample menjadi false agar section ini tampil di website live.
    sample: true,
    sampleNote: 'Contoh — ganti dengan testimoni asli sebelum live',
    items: [
      {
        quote: 'Kami cuma punya waktu satu jam di sela jadwal travel, tapi hasilnya seperti satu hari penuh. Senja di bukit itu sekarang jadi foto utama di ruang tamu kami.',
        name: 'Nama Klien',
        detail: 'Pasangan · Umrah bulan madu',
        story: 'senja-di-bukit-makkah',
      },
      {
        quote: 'Saya umrah sendirian dan khawatir canggung difoto. Ternyata diarahkan dengan sangat santun, sama sekali tidak mengganggu ibadah.',
        name: 'Nama Klien',
        detail: 'Jamaah solo · Madinah',
        story: 'teduh-di-nabawi',
      },
      {
        quote: 'Foto pilihan sudah dikirim waktu kami masih di Makkah, jadi keluarga di rumah bisa ikut merasakan.',
        name: 'Nama Klien',
        detail: 'Pasangan · Makkah',
        story: 'berdua-di-baitullah',
      },
      {
        quote: 'Lokasinya dipilihkan yang pas dengan cahaya pagi. Kubah hijau di foto saya terlihat persis seperti yang saya ingat.',
        name: 'Nama Klien',
        detail: 'Jamaah solo · Madinah',
        story: 'rindu-madinah',
      },
      {
        quote: 'Videonya bikin kami menangis lagi waktu menonton di rumah. Rasanya seperti kembali ke sana.',
        name: 'Nama Klien',
        detail: 'Pasangan · Video reel',
        story: 'senja-di-bukit-makkah',
      },
    ],
  },

  packages: {
    label: 'Paket',
    title: 'Pilih cara kamu ingin mengenang',
    intro: 'Semua paket bisa disesuaikan durasi, lokasi, dan jumlah orangnya.',
    price: 'Harga via WhatsApp',
    popular: 'Paling diminati',
    cta: 'Tanya paket ini',
    message: `Assalamualaikum ${name}, saya tertarik dengan paket {package}. Boleh minta info harga dan jadwal yang tersedia?`,
    custom: 'Rombongan travel umrah atau butuh dokumentasi beberapa hari? Kami buatkan penawaran khusus.',
    // TODO: ganti dengan isi paket & harga asli dari klien
    items: [
      {
        name: 'Sakinah',
        arabic: 'سكينة',
        meaning: 'ketenangan',
        audience: 'Untuk jamaah yang datang sendiri',
        features: ['Sesi foto di 1 lokasi', 'Semua foto terbaik sudah diedit', 'Arahan pose yang santun', 'Hasil dikirim lewat link digital'],
      },
      {
        name: 'Mawaddah',
        arabic: 'مودة',
        meaning: 'kasih sayang',
        audience: 'Untuk pasangan & umrah bulan madu',
        features: ['Sesi foto di 2 lokasi', 'Video reel sinematik vertikal', 'Properti karpet & lentera', 'Semua foto terbaik sudah diedit'],
        featured: true,
      },
      {
        name: 'Barakah',
        arabic: 'بركة',
        meaning: 'keberkahan',
        audience: 'Untuk keluarga & rombongan',
        features: ['Foto keluarga & foto bersama', 'Video dokumentasi perjalanan', 'Bisa lebih dari satu sesi', 'Jadwal mengikuti itinerary travel'],
      },
    ],
  },

  process: {
    label: 'Cara pesan',
    title: 'Empat langkah, tanpa ribet',
    steps: [
      { title: 'Chat WhatsApp', body: 'Ceritakan tanggal kamu di Makkah atau Madinah dan siapa saja yang ikut.' },
      { title: 'Atur jadwal', body: 'Kami cocokkan dengan itinerary travel, di luar waktu ibadah utama.' },
      { title: 'Sesi foto', body: 'Santai dan tidak mengganggu ibadah. Kami bantu arahkan gaya.' },
      { title: 'Terima hasil', body: 'Foto dan video yang sudah diedit dikirim lewat link digital.' },
    ],
  },

  faq: {
    label: 'Tanya jawab',
    title: 'Yang sering ditanyakan',
    // TODO: sesuaikan jawaban (terutama durasi pengerjaan) dengan kebijakan klien
    items: [
      {
        q: 'Apakah sesi foto mengganggu ibadah?',
        a: 'Tidak. Sesi dijadwalkan di luar waktu salat dan ibadah utama, biasanya pagi setelah syuruq atau sore menjelang magrib.',
      },
      {
        q: 'Apakah boleh memotret di area masjid?',
        a: 'Kami memotret di area pelataran dan sekitar masjid serta selalu mengikuti aturan petugas setempat. Lokasi pastinya kami diskusikan sebelum sesi.',
      },
      {
        q: 'Saya ikut rombongan travel, jadwalnya padat. Bisa?',
        a: 'Bisa. Kirim itinerary kamu, kami carikan jeda waktu yang pas. Sesi singkat 30–60 menit pun sudah menghasilkan banyak foto.',
      },
      {
        q: 'Berapa lama hasilnya jadi?',
        a: 'Foto pilihan biasanya bisa dikirim lebih dulu selama kamu masih di Tanah Suci, sisanya menyusul lewat link digital.',
      },
      {
        q: 'Perlu bawa baju atau properti khusus?',
        a: 'Cukup busana yang nyaman dan senada. Untuk paket tertentu kami menyediakan properti seperti karpet dan lentera.',
      },
      {
        q: 'Bagaimana cara pembayarannya?',
        a: 'Detail pembayaran dan uang muka dijelaskan langsung lewat WhatsApp setelah jadwal disepakati.',
      },
    ],
  },

  closing: {
    title: ['Kamu fokus berdoa.', 'Kami yang mengingatnya.'],
    body: 'Slot setiap pekan terbatas karena kami mengikuti jadwal jamaah. Amankan tanggalmu dari sekarang.',
    cta: 'Cek Ketersediaan Jadwal',
  },

  footer: {
    tagline: 'Fotografer & videografer perjalanan umrah di Tanah Suci.',
    base: 'Berbasis di Makkah & Madinah, Arab Saudi',
    contact: 'Kontak',
    follow: 'Ikuti',
    nav: 'Jelajahi',
    rights: 'Seluruh foto & video milik',
  },
};
