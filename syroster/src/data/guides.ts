import type { ProductType } from './projects';

export type Guide = {
  id: string;
  title: string;
  need: string;
  recommendation: string;
  types: ProductType[];
};

// TODO: verifikasi rekomendasi dengan pengalaman lapangan Syroster Industrie
export const guides: Guide[] = [
  {
    id: 'rumah',
    title: 'Rumah tinggal',
    need: 'Fasad, teras, dan carport yang butuh sirkulasi udara tanpa mengorbankan privasi.',
    recommendation: 'Motif lingkaran atau sirip memberi privasi yang baik dengan tampilan hangat.',
    types: ['lingkaran', 'sirip'],
  },
  {
    id: 'ruko',
    title: 'Ruko & bangunan komersial',
    need: 'Fasad yang menonjol dan mudah dikenali, sekaligus menyaring panas matahari.',
    recommendation: 'Motif geometris dua warna membuat fasad mudah dikenali dan terlihat modern.',
    types: ['geometris'],
  },
  {
    id: 'gudang',
    title: 'Gudang, pabrik & area servis',
    need: 'Ventilasi maksimal untuk mengurangi panas dan kelembapan di dalam ruangan.',
    recommendation: 'Roster kotak atau sirip dengan bukaan lebar mengalirkan udara paling leluasa.',
    types: ['geometris'],
  },
  {
    id: 'iklim',
    title: 'Iklim panas & lembap',
    need: 'Mengurangi panas langsung dan menjaga ruangan tetap kering.',
    recommendation:
      'Pilih motif dengan bukaan sedang hingga besar dan pasang di sisi datangnya angin. Warna terang memantulkan lebih banyak panas.',
    types: ['geometris', 'lingkaran'],
  },
  {
    id: 'privasi',
    title: 'Butuh privasi tinggi',
    need: 'Area seperti kamar mandi luar atau tangga yang menghadap tetangga atau jalan.',
    recommendation: 'Roster nako, sirip, atau labirin menyaring pandangan dari samping.',
    types: ['sirip', 'geometris'],
  },
];

export const calculatorDefaults = {
  // TODO: ganti dengan jumlah keping per m² asli tiap produk (isi `piecesPerM2` di products.ts).
  // Sementara: perkiraan dari ukuran nominal 20 × 20 cm tanpa memperhitungkan nat → 1 / (0,2 × 0,2) = 25 keping/m².
  fallbackPiecesPerM2: 25,
  // TODO: verifikasi persentase cadangan (pecah/potong) yang disarankan
  wastePercent: 5,
};
