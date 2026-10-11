import type { SiteContent } from './types';

// Teks bahasa Indonesia (URL "/id").
export const id: SiteContent = {
  locale: 'id',
  htmlLang: 'id',
  ogLocale: 'id_ID',
  meta: {
    title: 'Satu Gudang — Custom Furniture, Desain Interior & Bangun di Bali',
    description:
      'Custom furniture, kitchen set, desain interior dan renovasi untuk villa, rumah, dan spa di Bali. Didesain, diproduksi di workshop sendiri, dan dipasang oleh satu tim. Konsultasi gratis.',
    keywords: [
      'custom furniture Bali',
      'desain interior Bali',
      'kitchen set Bali',
      'desain interior spa Bali',
      'interior villa Bali',
      'paket furniture kamar tidur Bali',
    ],
  },
  common: {
    skipToContent: 'Lewati ke konten utama',
    mainMenu: 'Menu utama',
    tagline: 'We design. We build. You live it.',
    freeConsultation: 'Konsultasi gratis',
    chatWhatsApp: 'Chat via WhatsApp',
    languageSwitch: { label: 'English', target: 'EN' },
    themeToggle: 'Ganti mode terang / gelap',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    close: 'Tutup',
    previous: 'Foto sebelumnya',
    next: 'Foto berikutnya',
    priceOnRequest: 'Harga sesuai budget',
    priceFrom: 'Mulai',
    todoBadge: 'Draf',
  },
  nav: {
    about: 'Tentang',
    design: 'Desain 3D',
    services: 'Layanan',
    work: 'Proyek',
    packages: 'Paket kamar tidur',
    process: 'Proses',
    faq: 'FAQ',
    contact: 'Kontak',
  },
  hero: {
    eyebrow: 'Custom furniture · Interior · Bangun — Bali',
    title: 'We design. We build.',
    titleAccent: 'You live it.',
    // TODO: konfirmasi visi & misi resmi Satu Gudang
    slides: [
      {
        label: 'Siapa kami',
        text: 'Satu Gudang adalah studio di Bali yang mendesain ruangmu, memproduksi furniturnya di workshop sendiri, lalu memasangnya di lokasi — satu tim dari sketsa pertama sampai baut terakhir.',
        imageAlt:
          'Ruang pijat kaki spa karya Satu Gudang: kursi santai biru, plafon kayu, partisi kayu berukir, dan dinding tanaman hijau',
      },
      {
        label: 'Visi kami',
        text: 'Menjadi studio yang dipercaya di Bali untuk mewujudkan ide menjadi ruang yang hangat dan jujur — rumah, villa, dan tempat usaha yang nyaman ditinggali dan dipakai setiap hari.',
        imageAlt:
          'Desain 3D kamar tidur tenang dengan ranjang berlapis kain melengkung, panel dinding kayu, dan lampu tersembunyi hangat',
      },
      {
        label: 'Misi kami',
        text: 'Mendesain bersamamu, membangun dengan teliti, dan selesai tepat waktu — dengan material asli, penawaran yang jelas, dan tim yang menemanimu sampai serah terima.',
        imageAlt:
          'Desain 3D ruang makan dengan meja kayu bundar, kabinet terakota, dan lampu gantung kertas',
      },
    ],
    slideNav: 'Pilih slide',
    pause: 'Jeda slideshow',
    play: 'Putar slideshow',
    primaryCta: 'Konsultasi gratis',
    secondaryCta: 'Lihat proyek kami',
    imageAlt:
      'Ruang pijat kaki spa karya Satu Gudang: kursi santai biru, plafon kayu, partisi kayu berukir, dan dinding tanaman hijau',
    pillars: ['Desain', 'Produksi di workshop', 'Pemasangan & pembangunan'],
    scrollHint: 'Gulir',
  },
  about: {
    eyebrow: 'Tentang kami',
    // TODO: tambahkan cerita singkat pendiri, tahun berdiri, dan arti nama "Satu Gudang" bila sudah dikonfirmasi
    title: 'Studio di Bali tempat desain, workshop, dan pembangunan jadi satu atap',
    paragraphs: [
      'Satu Gudang Project mendesain interior, membuat furnitur di workshop sendiri, lalu membangun atau merenovasi ruangnya — jadi orang yang menggambar ruanganmu adalah orang yang sama yang membuat dan memasangnya.',
      'Kami mengerjakan rumah, villa, dan ruang usaha di seluruh Bali, dari satu kitchen set sampai renovasi spa lengkap. Kayu yang hangat, tekstur alami, dan tanaman adalah material yang paling kami sukai.',
    ],
    facts: [
      { value: '3', label: 'layanan, satu tim' },
      { value: '1', label: 'workshop produksi sendiri' },
      { value: 'Bali', label: 'Seminyak · Benoa · Tabanan & sekitarnya' },
    ],
    values: [
      {
        title: 'Satu tim, satu tanggung jawab',
        text: 'Tidak ada lempar tanggung jawab antara desainer, tukang kayu, dan kontraktor.',
      },
      {
        title: 'Dibuat sesuai ukuran',
        text: 'Setiap furnitur dibuat untuk ruangan dan budget-mu.',
      },
      {
        title: 'Material nyata, proyek nyata',
        text: 'Foto di website ini adalah hasil kerja kami sendiri.',
      },
    ],
    cta: 'Ngobrol dengan tim kami',
    imageAlt: 'Tim Satu Gudang memasang kabinet dapur putih di lokasi',
    secondImageAlt:
      'Meja resepsionis di bawah plafon kayu melengkung di spa hasil renovasi Satu Gudang',
  },
  marquee: [
    'Custom furniture',
    'Desain interior',
    'Desain 3D',
    'Kitchen set',
    'Lemari pakaian',
    'Interior villa',
    'Spa & hospitality',
    'Renovasi',
    'Dibuat di Bali',
  ],
  design: {
    eyebrow: 'Desain 3D',
    title: 'Lihat ruanganmu sebelum satu papan pun dipotong',
    lead: 'Belum tahu mau seperti apa? Kami desainkan bersamamu. Ceritakan gaya, ukuran, dan budget-mu, kami wujudkan dalam visual 3D yang realistis — lalu kami bangun persis seperti itu.',
    points: [
      'Desain sesuai keinginan, gaya, dan budget-mu',
      'Visual 3D realistis sebelum produksi',
      'Revisi sampai kamu merasa pas',
    ],
    cta: 'Minta dibuatkan desain',
    note: 'Visual desain 3D karya Satu Gudang.',
    alts: [
      'Desain 3D kamar tidur ceria dengan lampu gantung merah, lemari biru, dan karpet kotak-kotak',
      'Desain 3D dapur dan ruang makan terbuka dengan kabinet kayu, backsplash terrazzo, dan kursi rotan',
      'Desain 3D kamar tidur hijau sage dengan lemari rotan, panel dinding berlapis kain, dan ranjang kayu',
      'Desain 3D ruang makan dengan kabinet terakota, meja kayu bundar, dan lampu gantung kertas',
      'Desain 3D kamar tidur hangat dengan ranjang berlapis kain melengkung, panel dinding kayu, dan lampu tersembunyi',
    ],
  },
  services: {
    eyebrow: 'Layanan kami',
    title: 'Tiga layanan, satu tim yang bertanggung jawab',
    lead: 'Pilih satu atau gabungkan. Karena desain, produksi, dan pemasangan ada di satu tangan, yang kamu setujui di gambar itulah yang jadi di ruanganmu.',
    cta: 'Tanya layanan ini',
    items: {
      furniture: {
        title: 'Custom Furniture',
        summary:
          'Kitchen set, lemari, tempat tidur, kabinet wastafel, dan lemari display yang dibuat sesuai ukuran di workshop kami.',
        points: [
          'Pas dengan ukuran ruanganmu',
          'Kitchen set, lemari, tempat tidur, vanity',
          'Finishing dipilih bersama dari sample',
        ],
        imageAlt: 'Lemari display pintu kaca dengan lampu LED hangat dan rangka motif kayu',
      },
      interior: {
        title: 'Desain Interior',
        summary:
          'Tata letak, plafon, pencahayaan, dan material untuk villa, rumah, serta ruang komersial seperti spa dan salon.',
        points: [
          'Konsep, layout & papan material',
          'Ruang residensial dan komersial',
          'Furnitur didesain sesuai konsep',
        ],
        imageAlt: 'Sudut wastafel spa di bawah plafon kayu melengkung dengan tanaman gantung',
      },
      build: {
        title: 'Arsitektur & Bangun',
        summary:
          'Pekerjaan renovasi dan konstruksi dikelola tim kami sendiri, sehingga bangunan dan interior selesai bersamaan.',
        points: [
          'Renovasi bangunan yang sudah ada',
          'Plafon, dinding, lantai & finishing',
          'Satu jadwal dari struktur sampai penataan',
        ],
        imageAlt: 'Ruang spa hasil renovasi dengan plafon kayu dan partisi kayu berukir',
      },
    },
  },
  portfolio: {
    eyebrow: 'Portofolio',
    title: 'Proyek nyata, difoto setelah serah terima',
    lead: 'Ruang komersial dan residensial yang kami desain, produksi, dan pasang di berbagai area Bali.',
    filterLabel: 'Saring proyek',
    filters: { all: 'Semua', commercial: 'Komersial', residential: 'Residensial' },
    categoryLabels: { commercial: 'Komersial', residential: 'Residensial' },
    viewGallery: 'Lihat foto',
    photos: 'foto',
    askSimilar: 'Saya mau yang seperti ini',
    galleryLabel: 'Galeri foto proyek',
    items: {
      'spa-seminyak': {
        title: 'Renovasi Spa',
        location: 'Sunset Road, Seminyak',
        summary:
          'Ruko yang kusam dan rusak kena air diubah menjadi spa yang tenang: plafon kayu melengkung dengan tanaman gantung, ruang perawatan bergorden, loker tamu bernomor, ruang pijat kaki, area nail care, dan area styling.',
        scope: ['Desain interior', 'Renovasi', 'Custom furniture'],
        alts: [
          'Area pijat badan dengan bed bergorden, panel dinding kayu, dan dinding tanaman berbunga',
          'Ruang pijat kaki dengan empat kursi santai biru, plafon kayu, dan partisi kayu berukir',
          'Ruang pijat kaki dari samping, dengan dinding tanaman hijau dan bak rendam kaki',
          'Lorong dengan plafon kayu melengkung, wisteria gantung, dan gorden krem',
          'Sudut wastafel dengan cermin bulat dan kabinet gelap di bawah plafon kayu melengkung bertanaman',
          'Loker tamu kayu bernomor di samping meja wastafel hitam',
          'Meja resepsionis dengan lukisan besar di dinding hijau sage di bawah plafon melengkung',
          'Area nail care dengan meja kayu, kursi biru, dan plafon kayu melengkung bertanaman',
          'Area styling dengan kabinet cermin hitam berbingkai tanaman gantung',
        ],
      },
      'warm-wood-residence': {
        // TODO: konfirmasi nama klien/lokasi proyek ini (foto WhatsApp 11 Okt 2026, lokasi belum diketahui)
        title: 'Rumah Nuansa Kayu',
        location: 'Bali',
        summary:
          'Satu set furnitur custom bermotif kayu hangat: dapur terbuka dengan island, lemari display built-in dengan rak berlampu LED, ruang ganti dengan lemari kaca, vanity gantung, dan rak kamar tidur.',
        scope: ['Custom furniture', 'Kitchen set', 'Lemari'],
        alts: [
          'Ruang ganti dengan cermin berlampu LED, meja rias kayu, dan rak berlampu',
          'Lemari pintu kaca berbingkai kayu dengan lampu strip LED hangat',
          'Lemari display built-in kayu dengan kisi di atas dan rak berlampu oranye',
          'Dapur kayu dan putih dengan meja panjang dan kulkas tanam',
          'Semenanjung dapur dengan kabinet bawah kayu dan lemari pantry tinggi',
          'Kamar tidur dengan rak kayu built-in, plafon kayu, dan ranjang platform rendah',
          'Vanity gantung motif kayu dengan rak samping terbuka dan wastafel mangkuk',
          'Dapur plafon tinggi dengan kabinet motif kayu dan tiga lampu gantung kaca',
        ],
      },
      'kitchen-benoa': {
        title: 'Kitchen Set Putih',
        location: 'Benoa, Kuta Selatan',
        summary:
          'Dapur bentuk L serba putih dengan top hitam motif batu, rak kayu melayang, dan penyimpanan praktis: rak tarik di sudut dan organizer sendok di laci.',
        scope: ['Kitchen set', 'Pemasangan'],
        alts: [
          'Dapur putih bentuk L dengan top hitam, rak kayu melayang, dan kulkas stainless',
          'Dapur putih yang sama dengan semua pintu dan laci terbuka memperlihatkan penyimpanan',
          'Dapur putih dengan tangga spiral dan lampu gantung tembaga',
          'Kabinet atas putih dengan cooker hood di atas kompor berdiri',
          'Laci terbuka dengan organizer sendok putih',
          'Rak tarik ramping di samping oven',
        ],
      },
      'bedroom-tabanan': {
        title: 'Renovasi Kamar Tidur',
        location: 'Tabanan',
        summary:
          'Penyegaran kamar tidur dengan dinding aksen lengkung dan lis LED, headboard berlapis kain, tempat tidur dengan laci penyimpanan, lemari tinggi, dan nakas laci yang serasi.',
        scope: ['Renovasi interior', 'Furniture kamar tidur'],
        alts: [
          'Kamar tidur dengan dinding aksen lengkung abu-abu, headboard berlapis kain, ranjang laci, dan lemari putih',
          'Lemari laci putih di bawah TV dinding dengan lis lampu LED',
        ],
      },
    },
  },
  packages: {
    eyebrow: 'Mulai dari sini',
    title: 'Paket furniture kamar tidur lengkap',
    lead: 'Tempat tidur, nakas, lemari pakaian, dan furnitur pendukung — didesain sebagai satu set dan disesuaikan dengan budget serta ukuran kamarmu.',
    featuredBadge: 'Paling diminati',
    includesLabel: 'Termasuk',
    cta: 'Ceritakan budget-mu',
    note: 'Semua paket dibuat sesuai ukuran. Kirim ukuran kamar dan budget-mu via WhatsApp, kami sarankan set yang paling pas.',
    items: {
      essential: {
        name: 'Essential',
        forWho: 'Untuk kamar tamu, unit sewa, dan rumah pertama',
        // TODO: konfirmasi isi paket
        includes: ['Rangka tempat tidur', '2 nakas', 'Lemari 2 pintu'],
        imageAlt: 'Lemari laci putih dan lantai motif kayu di kamar tidur hasil renovasi',
      },
      signature: {
        name: 'Signature',
        forWho: 'Untuk kamar utama yang butuh banyak penyimpanan',
        // TODO: konfirmasi isi paket
        includes: [
          'Tempat tidur laci & headboard berlapis kain',
          '2 nakas',
          'Lemari pakaian setinggi plafon',
          'Lemari laci atau meja rias',
        ],
        imageAlt:
          'Kamar tidur dengan headboard berlapis kain, ranjang laci, dan lemari putih tinggi',
      },
      villa: {
        name: 'Villa',
        forWho: 'Untuk villa dan kamar premium',
        // TODO: konfirmasi isi paket
        includes: [
          'Tempat tidur custom & dinding headboard',
          'Nakas',
          'Walk-in closet atau lemari kaca ber-LED',
          'Meja rias & cermin',
          'Rak built-in',
        ],
        imageAlt: 'Ruang ganti dengan cermin berlampu, meja rias kayu, dan rak berlampu',
      },
    },
  },
  materials: {
    eyebrow: 'Material',
    title: 'Pilih finishing yang bisa kamu sentuh dulu',
    lead: 'Beberapa finishing dari proyek terbaru kami. Minta kami membawa sample fisik saat konsultasi.',
    cta: 'Minta sample material',
    note: 'Foto detail diambil dari foto proyek kami.',
    sample: {
      title: 'Request sample warna sebelum pengerjaan',
      text: 'Pilih warna HPL dan lantai dari papan sample fisik sebelum produksi — jadi warna yang kamu setujui adalah warna yang kamu dapat.',
      cta: 'Request sample warna',
      gallery: 'Galeri sample warna',
      hint: 'Ketuk foto untuk melihat sample lebih dekat',
      alts: [
        'Tangan memegang papan sample HPL motif kayu dan hitam di workshop Satu Gudang',
        'Papan sample HPL, lantai SPC, dan motif batu dalam berbagai warna',
        'Katalog warna HPL terbuka berisi pilihan warna solid dari netral sampai cerah',
      ],
    },
    items: {
      'wood-grain': {
        name: 'Motif kayu hangat',
        detail: 'Serat warna jati untuk kabinet, vanity, dan lemari.', // TODO: konfirmasi (HPL / veneer / kayu solid)
        seenIn: 'Rumah Nuansa Kayu',
        imageAlt: 'Detail pintu kabinet motif kayu warna jati',
      },
      'slatted-timber': {
        name: 'Kisi kayu',
        detail: 'Bilah vertikal untuk ventilasi, partisi, dan panel aksen.',
        seenIn: 'Rumah Nuansa Kayu',
        imageAlt: 'Detail bilah kayu vertikal warna terang',
      },
      'matte-white': {
        name: 'Kabinet putih bersih',
        detail: 'Muka kabinet putih halus dengan laci yang tertata.', // TODO: konfirmasi (HPL / duco)
        seenIn: 'Kitchen Set Putih',
        imageAlt: 'Laci putih terbuka dengan organizer sendok',
      },
      'glass-led': {
        name: 'Kaca & lampu LED',
        detail: 'Pintu dan rak kaca dengan lampu strip LED hangat.',
        seenIn: 'Rumah Nuansa Kayu',
        imageAlt: 'Rak display kaca diterangi lampu strip LED hangat dalam rangka kayu',
      },
      'curved-ceiling': {
        name: 'Plafon kayu melengkung',
        detail: 'Plafon finishing kayu yang mengalir dengan downlight tersembunyi.',
        seenIn: 'Renovasi Spa',
        imageAlt: 'Plafon kayu melengkung dengan downlight mengelilingi bukaan tanaman gantung',
      },
      'green-wall': {
        name: 'Dinding hijau',
        detail: 'Dinding tanaman rendah perawatan untuk nuansa tropis yang tenang.', // TODO: konfirmasi (artificial / asli)
        seenIn: 'Renovasi Spa',
        imageAlt: 'Detail dinding tanaman hijau yang rapat',
      },
    },
  },
  process: {
    eyebrow: 'Cara kerja kami',
    title: 'Dari ruang kosong sampai serah terima, satu tim',
    lead: 'Tidak ada lempar tanggung jawab antara desainer, tukang kayu, dan kontraktor. Kamu berbicara dengan orang yang sama dari awal sampai akhir.',
    items: {
      consult: {
        title: 'Konsultasi gratis & survei lokasi',
        text: 'Ceritakan ruang, gaya, dan budget-mu. Kami lihat lokasi dan mengukur.',
        imageAlt: 'Ruangan kosong dengan dinding rusak sebelum renovasi spa',
      },
      design: {
        title: 'Desain 3D & penawaran',
        text: 'Kamu menerima desain 3D, pilihan material, dan penawaran harga yang jelas sebelum produksi.',
        imageAlt: 'Desain 3D kamar tidur hijau sage dengan lemari rotan dan ranjang kayu',
      },
      produce: {
        title: 'Produksi di workshop sendiri',
        text: 'Furnitur dan kabinet dibuat di workshop kami sendiri, jadi kualitas dan waktu tetap terkontrol.',
        imageAlt: 'Memilih sample warna HPL di workshop sebelum produksi',
      },
      install: {
        title: 'Pemasangan & serah terima',
        text: 'Tim kami memasang, merapikan, dan membersihkan, lalu menunjukkan hasilnya kepadamu.',
        imageAlt: 'Tim Satu Gudang memasang kabinet dapur di lokasi',
      },
    },
    beforeAfter: {
      title: 'Renovasi Spa: sebelum dan sesudah',
      before: 'Sebelum',
      after: 'Sesudah',
      beforeAlt:
        'Ruang spa sebelum renovasi: ruangan keramik kosong dengan dinding mengelupas dan bernoda air',
      afterAlt:
        'Ruang yang sama setelah renovasi: ruang pijat kaki dengan plafon kayu dan dinding tanaman',
    },
  },
  testimonials: {
    eyebrow: 'Kata klien',
    title: 'Apa kata klien kami',
    // TODO: testimoni contoh — ganti dengan testimoni asli (tersembunyi di build production)
    items: [
      {
        quote: 'Contoh testimoni — ganti dengan kutipan klien asli.',
        name: 'Nama klien',
        role: 'Pemilik villa',
      },
      {
        quote: 'Contoh testimoni — ganti dengan kutipan klien asli.',
        name: 'Nama klien',
        role: 'Pemilik spa',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Pertanyaan yang sering muncul',
    lead: 'Belum menemukan jawabannya? Tanyakan langsung via WhatsApp.',
    // TODO: konfirmasi semua jawaban FAQ (durasi, area layanan, pembayaran, garansi) dengan Satu Gudang
    items: [
      {
        q: 'Apakah konsultasinya benar-benar gratis?',
        a: 'Ya. Konsultasi pertama untuk membahas ruang, gaya, dan budget-mu gratis dan tanpa kewajiban.',
      },
      {
        q: 'Area mana saja di Bali yang dilayani?',
        a: 'Kami bekerja di seluruh Bali — proyek terbaru kami ada di Seminyak, Benoa (Kuta Selatan), dan Tabanan. Sebutkan lokasimu, kami konfirmasi.',
      },
      {
        q: 'Apakah harus memakai ketiga layanan?',
        a: 'Tidak. Kamu bisa pesan custom furniture saja, desain interior saja, atau paket lengkap desain dan bangun.',
      },
      {
        q: 'Berapa lama pengerjaan proyek?',
        a: 'Tergantung ukuran dan material. Kami berikan jadwal bersama penawaran harga, sebelum produksi dimulai.',
      },
      {
        q: 'Apakah paket kamar tidur bisa disesuaikan budget?',
        a: 'Bisa. Paket hanyalah titik awal; ukuran, material, dan isi paket kami sesuaikan dengan budget-mu.',
      },
      {
        q: 'Bisakah saya melihat materialnya dulu?',
        a: 'Bisa. Minta sample saat konsultasi supaya kamu bisa memilih finishing secara langsung.',
      },
    ],
  },
  contact: {
    eyebrow: 'Konsultasi gratis',
    title: 'Ceritakan ruangmu kepada kami',
    lead: 'Kirim pesan via WhatsApp — foto ruangan, perkiraan ukuran, dan budget sudah cukup untuk memulai.',
    cta: 'Mulai percakapan',
    steps: [
      'Kirim foto & ukuran ruangan',
      'Ceritakan gaya dan budget-mu',
      'Terima ide dan penawaran',
    ],
    whatsappLabel: 'WhatsApp',
    socialLabel: 'Instagram & Threads',
    areaLabel: 'Area layanan',
    area: 'Seluruh Bali',
  },
  footer: {
    blurb:
      'Studio custom furniture, desain interior, dan bangun di Bali. Didesain, dibuat, dan dipasang oleh satu tim.',
    servicesTitle: 'Layanan',
    exploreTitle: 'Jelajahi',
    contactTitle: 'Kontak',
    rights: 'Hak cipta dilindungi.',
  },
  notFound: {
    title: 'Halaman tidak ditemukan',
    text: 'Halaman yang kamu cari tidak ada atau sudah dipindahkan.',
    back: 'Kembali ke beranda',
  },
  wa: {
    general: 'Halo Satu Gudang, saya ingin bertanya tentang layanan Anda.',
    consultation:
      'Halo Satu Gudang, saya ingin konsultasi gratis.\n\nJenis proyek: \nLokasi: \nPerkiraan budget: ',
    service:
      'Halo Satu Gudang, saya tertarik dengan layanan {service}. Bisa diskusi proyek saya?\n\nLokasi: \nPerkiraan budget: ',
    project: 'Halo Satu Gudang, saya melihat proyek "{project}" di website dan ingin yang serupa.',
    bedroomPackage:
      'Halo Satu Gudang, saya tertarik paket kamar tidur {package}. Budget saya sekitar ... dan ukuran kamar saya sekitar ...',
    material: 'Halo Satu Gudang, apakah saya bisa melihat sample material saat konsultasi?',
    design:
      'Halo Satu Gudang, saya ingin dibuatkan desain 3D untuk ruangan saya.\n\nJenis ruangan: \nPerkiraan ukuran: \nGaya yang saya suka: \nPerkiraan budget: ',
    sample: 'Halo Satu Gudang, saya ingin request sample warna (HPL / lantai) sebelum pengerjaan.',
  },
};
