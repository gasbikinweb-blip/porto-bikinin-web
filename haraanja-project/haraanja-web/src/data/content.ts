// Galeri hasil custom (foto pesanan nyata dari Instagram @haraanjaproject_souvenir), cara pesan, dan FAQ.
// Nama pengantin/pelanggan pada foto sudah dipublikasikan brand; tetap konfirmasi izin ke pemilik.
import type { Faq, GalleryItem } from './types';

const g = (file: string, caption: string, alt: string): GalleryItem => ({
  src: `/images/galeri/${file}.webp`,
  thumb: `/images/galeri/${file}-thumb.webp`,
  alt,
  caption,
});

export const gallery: readonly GalleryItem[] = [
  g(
    'mangkok-daun',
    'Mangkok daun + box floral',
    'Souvenir mangkok daun kaca dengan box custom bermotif floral',
  ),
  g('piring-custom-merah', 'Piring custom', 'Souvenir piring motif bunga merah dengan box custom'),
  g('mug-pipit-sakan', 'Mug custom pernikahan', 'Mug custom nama pengantin dengan box biru'),
  g(
    'mangkok-blue-white',
    'Mangkok blue & white',
    'Mangkok motif blue and white dengan box berpita',
  ),
  g('pump-sabun-kaca', 'Pump sabun kaca', 'Pump sabun kaca dengan box custom pernikahan'),
  g('tumbler-pastel', 'Tumbler pastel', 'Tumbler pastel dengan box custom bernuansa ungu'),
  g(
    'piring-kabah',
    'Piring tema Ka’bah',
    'Souvenir piring dengan box bergambar Ka’bah untuk walimah',
  ),
  g('souvenir-bayi', 'Souvenir kelahiran', 'Souvenir kelahiran bayi dengan box biru'),
  g(
    'card-holder-mahira-hafidz',
    'Card holder custom',
    'Card holder dengan box custom ungu berpita',
  ),
  g('jam-dinding-custom', 'Jam dinding custom', 'Souvenir jam dinding custom nama'),
  g('gelas-jar-pastel', 'Gelas jar pastel', 'Gelas jar pastel dengan box custom'),
  g('piring-bunga-box', 'Piring bunga + box', 'Souvenir piring bunga dengan box eksklusif'),
  g('totebag-inisial', 'Totebag inisial', 'Totebag custom dengan sablon inisial'),
  g('mug-biru', 'Mug kaca biru', 'Mug kaca dengan box biru elegan'),
  g('piring-box-elegan', 'Piring box elegan', 'Souvenir piring dengan box elegan'),
  g('piring-box-pita', 'Piring box mewah', 'Piring custom dengan box mewah berpita'),
  g('mangkok-kelas', 'Kenang-kenangan kelas', 'Souvenir mangkok untuk kenang-kenangan kelas'),
  g(
    'gelas-jar-korporat',
    'Pesanan perusahaan',
    'Gelas jar pastel pesanan perusahaan dengan box berpita',
  ),
  g('piring-motif-biru', 'Piring motif biru', 'Piring motif biru dengan box custom'),
  g('mangkok-ungu-box', 'Mangkok + box hijau', 'Mangkok dengan box custom bernuansa hijau'),
  g('piring-floral-box', 'Piring floral', 'Piring floral dengan box custom'),
  g('tumbler-custom-nama', 'Tumbler custom nama', 'Tumbler dengan box custom nama'),
];

// Alur dari katalog PDF resmi 2026 ("Rules Pemesanan")
export const steps = [
  {
    title: 'Pilih souvenir & kemasan',
    text: 'Pilih souvenir, kemasan (box/mika/tile), dan jumlah dari katalog.',
  },
  {
    title: 'Konsultasi via WhatsApp',
    text: 'Admin mengonfirmasi jumlah dan membuatkan invoice (berlaku 1×24 jam).',
  },
  {
    title: 'DP & isi form desain',
    text: 'DP minimal 50%, lalu isi Google Form data nama, tanggal, dan tema.',
  },
  {
    title: 'Preview & approval desain',
    text: 'Tim desain mengirim preview. Revisi gratis hingga 3 kali.',
  },
  {
    title: 'Produksi, pelunasan & kirim',
    text: 'Dikerjakan sesuai antrian, dilunasi, lalu dikirim ke seluruh Indonesia.',
  },
];

export const faqs: readonly Faq[] = [
  {
    q: 'Berapa minimal order?',
    a: 'Tergantung produk, Kak. Contohnya handuk mulai 25 pcs, mangkok twotone dan sendok garpu 50 pcs, mangkok kaca + box 100 pcs. Minimal order tiap produk tertulis di detail produk.',
  },
  {
    q: 'Berapa lama waktu produksi?',
    // TODO: konfirmasi estimasi waktu produksi dengan pemilik
    a: 'Kami sarankan memesan paling lambat H-1 bulan sebelum acara (khusus mangkok kaca H-2 bulan), karena pesanan dikerjakan sesuai antrian.',
  },
  {
    q: 'Apakah desain custom gratis?',
    a: 'Gratis desain, pita hias, dan kartu penukaran souvenir. Revisi desain maksimal 3 kali; revisi berikutnya dikenakan Rp50.000 per revisi.',
  },
  {
    q: 'Apakah bisa sablon atau custom nama?',
    a: 'Bisa, Kak. Banyak produk bisa disablon nama/inisial (minimal sablon umumnya 50 pcs). Pesanan di atas 600 pcs sudah mendapat custom box sesuai tema; di bawah itu memakai motif box yang tersedia.',
  },
  {
    q: 'Apakah ada harga grosir?',
    a: 'Ada. Harga di website adalah harga per pcs di Shopee. Untuk jumlah banyak, harga grosir dikonfirmasi admin lewat WhatsApp.',
  },
  {
    q: 'Bagaimana pengiriman barang kaca? Aman?',
    a: 'Kami kirim ke seluruh Indonesia dengan packing standar dus + bubblewrap 3 lapis. Untuk barang pecah belah wajib tambahan extra packing (bubblewrap/kayu). Ongkir luar kota Probolinggo diinfokan setelah barang jadi.',
  },
  {
    q: 'Bisa minta sampel?',
    a: 'Bisa. Tersedia Sample Box berisi 6 box acak dari sisa produksi di toko Shopee kami. Untuk sampel souvenir, silakan tanya admin.',
  },
  {
    q: 'Bagaimana cara pembayaran?',
    a: 'Pemesanan sah setelah DP minimal 50% dari total. Pelunasan dilakukan setelah produksi selesai, sebelum barang diambil atau dikirim.',
  },
  {
    q: 'Bagaimana jika barang rusak saat diterima?',
    a: 'Mohon cek dan hitung kelengkapan dengan video unboxing. Garansi kerusakan berlaku 2×24 jam setelah barang diterima dan wajib menyertakan video unboxing.',
  },
];
