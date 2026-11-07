import imageSizes from './images.generated.json';

export type GalleryImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

const sizes: Record<string, { width: number; height: number }> = imageSizes;

// Nama file sama dengan scripts/gallery.manifest.mjs
const items: readonly { name: string; alt: string }[] = [
  {
    name: 'jilid-lux-tumpukan-hijau-biru',
    alt: 'Tumpukan skripsi jilid lux sampul hijau dan biru dengan pita',
  },
  {
    name: 'jilid-lux-sampul-biru',
    alt: 'Skripsi jilid hard cover sampul biru muda, dibuka di bagian depan',
  },
  { name: 'jilid-lux-detail-pita', alt: 'Detail punggung jilid lux biru dengan pita pembatas' },
  {
    name: 'jilid-lux-menara-warna',
    alt: 'Menara skripsi jilid lux warna merah, biru, kuning, dan hijau',
  },
  {
    name: 'meja-toko-penuh-skripsi',
    alt: 'Meja di dalam toko penuh tumpukan skripsi siap diambil',
  },
  { name: 'menara-skripsi-jilid', alt: 'Tumpukan tinggi skripsi jilid di dalam toko' },
  { name: 'print-skripsi-tebal', alt: 'Hasil print skripsi tebal dirapikan sebelum dijilid' },
  { name: 'tumpukan-lux-di-toko', alt: 'Tumpukan jilid lux hasil hari ini di meja toko' },
  {
    name: 'menara-jilid-lux-teal',
    alt: 'Menara jilid lux sampul hijau tosca dan krem di dalam toko',
  },
  {
    name: 'deretan-lux-di-meja',
    alt: 'Dua tumpukan jilid lux sampul biru dan krem dengan pita berwarna',
  },
  {
    name: 'tumpukan-print-siap-jilid',
    alt: 'Tumpukan hasil print skripsi siap dijilid di atas kursi',
  },
  { name: 'printer-sedang-mencetak', alt: 'Printer sedang mencetak dokumen di meja kerja toko' },
  {
    name: 'printer-dan-komputer',
    alt: 'Komputer admin untuk menerima dan mencetak file pelanggan',
  },
  { name: 'meja-kerja-admin', alt: 'Meja kerja admin dengan komputer dan tumpukan jilid' },
];

/** Foto suasana toko untuk section Lokasi (tidak ikut grid galeri) */
export const storePhoto = (() => {
  const src = '/images/interior-toko-banner-harga.webp';
  const size = sizes[src];
  if (!size) throw new Error(`${src} belum ada. Jalankan npm run optimize-images.`);
  return {
    src,
    thumb: '/images/interior-toko-banner-harga-thumb.webp',
    alt: 'Interior Sirait Printing: banner harga print Rp195 dan deretan printer',
    ...size,
  };
})();

export const gallery: readonly GalleryImage[] = items.map(({ name, alt }) => {
  const src = `/images/${name}.webp`;
  const size = sizes[src];
  if (!size) throw new Error(`${src} belum ada. Jalankan npm run optimize-images.`);
  return { src, thumb: `/images/${name}-thumb.webp`, alt, ...size };
});
