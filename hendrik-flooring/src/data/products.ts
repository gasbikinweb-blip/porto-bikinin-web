import { getProject } from './projects';
import type { IconName } from './site';
import type { ImageAsset, RoomType } from './types';

export type Highlight = { icon: IconName; label: string };

export type Product = {
  slug: string;
  name: string;
  /** Kata pendek di atas judul modal */
  eyebrow: string;
  /** Ringkasan 1 kalimat untuk kartu */
  summary: string;
  /** Penjelasan singkat di modal */
  description: string;
  areas: RoomType[];
  /** 4 keunggulan singkat (2–3 kata) untuk deretan ikon di modal */
  highlights: Highlight[];
  /** Merek yang dipasang (teks saja, tanpa logo; jangan klaim "resmi" tanpa bukti) */
  brands?: string[];
  image: ImageAsset;
};

// TODO: verifikasi semua deskripsi dan klaim di bawah dengan spesifikasi produk asli.
// JANGAN menambah angka teknis (ketebalan, nilai anti-slip, dll.) tanpa datasheet resmi.
// Foto adalah contoh hasil pemasangan, belum tentu jenis produk yang persis sama.
export const products: Product[] = [
  {
    slug: 'vinyl-homogen',
    name: 'Vinyl Homogen',
    eyebrow: 'Paling banyak dipakai',
    summary: 'Satu lapis bahan dari atas sampai bawah. Kuat untuk area yang ramai dilalui.',
    description:
      'Motifnya menembus sampai ke dasar, jadi tidak cepat pudar walau sering dilalui troli, kursi roda, dan tempat tidur pasien. Dipasang dalam lembaran lebar, sambungannya dilas, lalu dinaikkan ke dinding.',
    areas: ['ruang-rawat', 'ruang-tindakan', 'koridor', 'laboratorium'],
    highlights: [
      { icon: 'seamless', label: 'Rapat tanpa celah' },
      { icon: 'shield', label: 'Kuat & awet' }, // TODO: verifikasi
      { icon: 'coving', label: 'Bisa naik ke dinding' },
      { icon: 'clean', label: 'Mudah dibersihkan' },
    ],
    // Sampel Tarkett Somplan 350 & Marvel Medipure adalah vinyl homogen. TODO: konfirmasi daftar merek
    brands: ['Tarkett', 'Marvel Medipure'],
    image: getProject('rs-ruang-rawat-biru-luas'),
  },
  {
    slug: 'vinyl-heterogen',
    name: 'Vinyl Heterogen',
    eyebrow: 'Pilihan motif lebih banyak',
    summary: 'Berlapis dengan pelindung di atasnya. Cocok untuk klinik dan ruang tunggu.',
    description:
      'Terdiri dari lapisan dasar, lapisan motif, dan lapisan pelindung. Pilihan warna dan motifnya lebih beragam, sehingga ruangan terasa segar dan ramah tanpa repot perawatannya.',
    areas: ['klinik-gigi', 'ruang-rawat', 'koridor'],
    highlights: [
      { icon: 'grip', label: 'Banyak pilihan motif' },
      { icon: 'shield', label: 'Lapisan pelindung' }, // TODO: verifikasi
      { icon: 'seamless', label: 'Permukaan rata' },
      { icon: 'clean', label: 'Mudah dipel' },
    ],
    brands: ['Marvel Decoflex'], // dari buku sampel Decoflex Heterogeneous Flooring
    // Foto sampul buku sampel Marvel Decoflex (vinyl heterogen asli)
    image: {
      src: '/img/sampel/marvel-decoflex.webp',
      thumb: '/img/sampel/marvel-decoflex-thumb.webp',
      alt: 'Buku sampel Marvel Decoflex Heterogeneous Flooring',
      width: 1200,
      height: 820,
      kind: 'proyek',
    },
  },
  {
    slug: 'vinyl-anti-slip',
    name: 'Vinyl Anti-Slip',
    eyebrow: 'Untuk area basah',
    summary: 'Permukaan bertekstur untuk toilet dan kamar mandi pasien.',
    description:
      'Teksturnya membantu mengurangi risiko tergelincir di lantai yang sering basah. Dengan plint yang naik ke dinding, air tidak mudah masuk ke sela antara lantai dan dinding.',
    areas: ['toilet', 'laboratorium'],
    highlights: [
      { icon: 'grip', label: 'Permukaan bertekstur' }, // TODO: isi kelas anti-slip resmi
      { icon: 'coving', label: 'Sudut kedap air' },
      { icon: 'clean', label: 'Tidak mudah kotor' },
      { icon: 'shield', label: 'Aman untuk pasien' }, // TODO: verifikasi
    ],
    image: getProject('klinik-toilet-abu'),
  },
  {
    slug: 'vinyl-antistatik',
    name: 'Vinyl Antistatik',
    eyebrow: 'Untuk ruang khusus',
    summary: 'Membantu menyalurkan listrik statis di ruang dengan alat elektronik sensitif.',
    description:
      'Dipakai di ruangan dengan peralatan elektronik medis yang sensitif, sesuai permintaan perencana proyek. Pemasangannya memerlukan detail tambahan seperti sistem grounding.',
    areas: ['ruang-tindakan', 'laboratorium'],
    highlights: [
      { icon: 'shield', label: 'Untuk alat sensitif' }, // TODO: isi nilai resistansi resmi
      { icon: 'tools', label: 'Dengan grounding' },
      { icon: 'seamless', label: 'Rapat tanpa celah' },
      { icon: 'coving', label: 'Bisa naik ke dinding' },
    ],
    image: getProject('rs-ruang-tindakan-hijau'),
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
