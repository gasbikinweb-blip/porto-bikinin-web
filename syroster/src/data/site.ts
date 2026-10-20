// Data perusahaan dan konten umum. Semua data contoh ditandai TODO.

export type Stat = { value: string; label: string };
export type Perk = { title: string; description: string; icon: 'truck' | 'cash' | 'factory' };

// Fakta dari caption Instagram/Threads @sy_roster.industrie. TODO: verifikasi syarat & ketentuannya
export const perks: Perk[] = [
  {
    title: 'Gratis ongkir Jabodetabek',
    description: 'Dikirim langsung ke lokasi proyek.',
    icon: 'truck',
  },
  { title: 'Bisa bayar di tempat', description: 'Pembayaran COD saat barang tiba.', icon: 'cash' },
  {
    title: 'Langsung dari pabrik',
    description: 'Harga partai besar bisa dinegosiasi.',
    icon: 'factory',
  },
];

// Ukuran yang disebut di unggahan Instagram. TODO: lengkapi ukuran per motif
export const sizes = ['20 × 20 cm', '15 × 30 cm', 'Nako 25 × 15 cm'];
export type Feature = { title: string; description: string };
export type Step = { title: string; description: string };
export type Service = { title: string; description: string; duration: string };

export const company = {
  legalName: 'Syroster Industrie', // TODO: nama badan usaha resmi (CV/PT) bila ada
  tagline: 'Produsen roster beton minimalis, langsung dari pabrik',
  description:
    'Syroster Industrie adalah produsen roster beton minimalis, bata tempel, wall panel beton, dan lisplang beton. Melayani pemilik rumah hingga kontraktor, dengan pengiriman ke seluruh Jabodetabek.',
  // TODO: semua data kontak di bawah masih placeholder
  email: 'halo@example.com', // TODO: email asli
  waDisplay: '0821-2472-3648', // dari bio Instagram
  address: 'Jl. Contoh No. 1, Kota, Provinsi', // TODO: alamat workshop/pabrik
  city: 'Kota', // TODO: kota
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Indonesia', // TODO: link Google Maps lokasi asli
  instagram: 'https://www.instagram.com/sy_roster.industrie/',
  instagramHandle: '@sy_roster.industrie',
  shopee: 'https://shopee.co.id/syrosterminimalis',
  foundedYear: null as number | null, // TODO: tahun berdiri
  hours: [
    { day: 'Senin – Jumat', time: '08.00 – 17.00 WIB' }, // TODO: verifikasi jam kerja
    { day: 'Sabtu', time: '08.00 – 14.00 WIB' }, // TODO
    { day: 'Minggu & libur nasional', time: 'Tutup' }, // TODO
  ],
  // Dari unggahan Threads: kirim ke seluruh Jabodetabek, gratis ongkir. TODO: verifikasi syarat gratis ongkir
  serviceAreas: ['Jabodetabek (gratis ongkir)', 'Luar Jabodetabek: tanyakan ongkir'],
  threads: 'https://www.threads.com/@sy_roster.industrie',
};

// TODO: ganti dengan angka asli. Selama "—", UI menampilkan label "data menyusul".
export const stats: Stat[] = [
  { value: '—', label: 'Proyek terlayani' }, // TODO
  { value: '—', label: 'Tahun pengalaman' }, // TODO
  { value: '—', label: 'Kapasitas produksi / bulan' }, // TODO
  { value: '5+', label: 'Pilihan motif di katalog' }, // dihitung dari foto yang tersedia
];

export const advantages: Feature[] = [
  {
    title: 'Sirkulasi udara & cahaya',
    description: 'Lubang roster membantu udara dan cahaya alami masuk, ruangan terasa lebih segar.',
  },
  {
    title: 'Tetap menjaga privasi',
    description: 'Motif berlubang menyaring pandangan dari luar tanpa menutup ruangan sepenuhnya.',
  },
  {
    title: 'Desain custom',
    description:
      'Bisa dibuat sesuai motif, warna, atau ukuran yang Anda inginkan. Diskusikan lewat WhatsApp.', // TODO: verifikasi batasan custom
  },
  {
    title: 'Pilihan motif & warna',
    description:
      'Motif lingkaran, piramida, kotak, diagonal, dan kombinasi warna natural hingga gelap.',
  },
  {
    title: 'Kuat untuk dinding luar',
    description: 'Dibuat dari material beton untuk pemakaian fasad dan pagar.', // TODO: verifikasi dengan spesifikasi produk asli
  },
  {
    title: 'Tampilan rapi & modern',
    description: 'Ukuran seragam sehingga mudah disusun menjadi pola dinding yang rapi.', // TODO: verifikasi dengan spesifikasi produk asli
  },
];

export const orderSteps: Step[] = [
  {
    title: 'Konsultasi & pilih motif',
    description: 'Ceritakan kebutuhan Anda dan pilih motif lewat WhatsApp.',
  },
  {
    title: 'Hitung kebutuhan',
    description: 'Kami bantu menghitung jumlah roster dari luas bidang dinding.',
  },
  {
    title: 'Terima penawaran',
    description: 'Anda menerima rincian harga, waktu produksi, dan ongkos kirim.',
  },
  {
    title: 'Produksi & pengiriman',
    description: 'Roster diproduksi lalu dikirim ke lokasi proyek Anda.',
  },
];

// TODO: semua estimasi waktu masih contoh, sesuaikan dengan kapasitas asli
export const services: Service[] = [
  {
    title: 'Penjualan & pengadaan',
    description: 'Roster motif katalog untuk rumah tinggal hingga proyek komersial.',
    duration: 'Stok siap: 1–3 hari kerja', // TODO
  },
  {
    title: 'Produksi desain custom',
    description: 'Motif, warna, atau ukuran khusus sesuai desain arsitek atau keinginan Anda.',
    duration: 'Estimasi 2–4 minggu', // TODO
  },
  {
    title: 'Pengiriman',
    description: 'Pengiriman ke lokasi proyek dengan armada sendiri atau ekspedisi.',
    duration: 'Tergantung jarak', // TODO
  },
  {
    title: 'Konsultasi kebutuhan',
    description: 'Bantuan memilih motif dan menghitung jumlah roster, gratis lewat WhatsApp.',
    duration: 'Respons di jam kerja', // TODO
  },
  {
    title: 'Pembelian partai besar',
    description: 'Untuk developer, kontraktor, dan toko bangunan. Harga khusus dibahas per proyek.',
    duration: 'Jadwal disepakati bersama', // TODO
  },
  {
    title: 'Jasa pemasangan',
    description: 'Ketersediaan jasa pemasangan sedang dikonfirmasi. Tanyakan lewat WhatsApp.', // TODO: konfirmasi apakah ada
    duration: '—',
  },
];

export const principles: Feature[] = [
  {
    title: 'Kualitas terjaga',
    description: 'Setiap roster dicek sebelum dikirim agar ukuran dan permukaannya rapi.',
  },
  {
    title: 'Tepat waktu',
    description: 'Jadwal produksi dan pengiriman disepakati di awal dan kami jaga.',
  },
  {
    title: 'Harga transparan',
    description: 'Penawaran tertulis dengan rincian jelas, tanpa biaya tersembunyi.',
  },
];

// Website satu halaman: navigasi menuju section (anchor) di beranda
export const navLinks = [
  { href: '/#produk', label: 'Produk' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/#video', label: 'Video' },
  { href: '/#panduan', label: 'Panduan' },
  { href: '/#cara-order', label: 'Cara Order' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#kontak', label: 'Kontak' },
] as const;

// Produk lain yang disebut di bio Instagram & Threads. Belum ada fotonya, jadi tampil sebagai daftar teks.
// TODO: tambahkan foto & detail bila tersedia
export const otherProducts: Feature[] = [
  { title: 'Wall panel beton', description: 'Panel beton untuk dinding fasad dan interior.' },
  { title: 'Lisplang beton', description: 'Lisplang beton untuk tepi atap yang awet.' },
  { title: 'Roster terakota', description: 'Roster tanah liat bakar berwarna merah bata alami.' },
  { title: 'Paving block', description: 'Untuk carport, halaman, dan jalur pejalan kaki.' },
];
