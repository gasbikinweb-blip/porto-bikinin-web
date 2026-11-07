// Foto yang dipakai di website. `src` relatif terhadap folder sirait-printing/ (berisi assets/ dan frames/).
// `crop` (opsional, dalam persen 0–1) untuk crop ringan yang sudah disetujui.
// Catatan: frame papan nama toko (2026-03-11) tidak dipakai karena memuat deretan logo kampus.
// Foto dengan wajah jelas, logo kampus besar, nama mahasiswa, atau teks overlay besar sengaja tidak dipakai.
// Entri dengan `at` = frame dari video pada detik tersebut (resolusi penuh, tanpa metadata).
export const manifest = [
  { name: 'jilid-lux-tumpukan-hijau-biru', src: 'assets/2026-10-12_DeX6rakEwMb/02.jpg' },
  { name: 'jilid-lux-sampul-biru', src: 'assets/2026-04-10_DW7j5IGE9U3/04.jpg' },
  { name: 'jilid-lux-detail-pita', src: 'assets/2026-04-10_DW7j5IGE9U3/03.jpg' },
  { name: 'jilid-lux-menara-warna', src: 'assets/2026-10-18_DeomG4nk9M1/03.jpg' },
  { name: 'meja-toko-penuh-skripsi', src: 'assets/2026-07-26_DbQI5uPk6rO/03.jpg' },
  { name: 'menara-skripsi-jilid', src: 'assets/2026-07-08_Dag1u7TTcc9/01.jpg' },
  { name: 'print-skripsi-tebal', src: 'frames/2026-05-03_DX3hII6TaVr-1.jpg' },
  { name: 'tumpukan-lux-di-toko', src: 'frames/2026-07-18_Da7ZTjJT9QT-1.jpg' },
  {
    name: 'interior-toko-banner-harga',
    src: 'assets/2026-05-03_DX3hII6TaVr/01.mp4',
    at: 6.5,
    // Buang pita hitam atas-bawah dari layout video
    crop: { left: 0, top: 0.27, width: 1, height: 0.46 },
  },
  { name: 'printer-sedang-mencetak', src: 'assets/2026-05-03_DX3hII6TaVr/01.mp4', at: 20 },
  { name: 'tumpukan-print-siap-jilid', src: 'assets/2026-05-03_DX3hII6TaVr/01.mp4', at: 16 },
  { name: 'printer-dan-komputer', src: 'assets/2026-05-03_DX3hII6TaVr/01.mp4', at: 30 },
  { name: 'meja-kerja-admin', src: 'assets/2026-06-15_DZmerGazM1y/01.mp4', at: 12 },
  { name: 'menara-jilid-lux-teal', src: 'assets/2026-07-09_DajZ9QRzZUH/01.mp4', at: 10 },
  { name: 'deretan-lux-di-meja', src: 'assets/2026-07-18_Da7ZTjJT9QT/01.mp4', at: 12 },
];
