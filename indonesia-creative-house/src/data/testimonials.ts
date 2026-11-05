export type Testimonial = {
  id: string;
  text: string;
  name: string; // disamarkan
  event?: string;
  source: string;
  isPlaceholder: boolean; // true: contoh, tampil dengan label "Contoh"
};

// TODO: ganti dengan testimoni asli beserta izin pelanggan sebelum website dipublikasikan.
// Semua di bawah ini DUMMY untuk melihat tampilan.
export const testimonials: Testimonial[] = [
  {
    id: 'dummy-1',
    text: 'Tampahnya cantik dan rapi, tamu arisan banyak yang tanya pesan di mana.',
    name: 'Ibu A.',
    event: 'Arisan',
    source: 'dummy',
    isPlaceholder: true,
  },
  {
    id: 'dummy-2',
    text: 'Snack boxnya datang tepat waktu untuk rapat kantor, adminnya juga ramah.',
    name: 'Kak R.',
    event: 'Rapat kantor',
    source: 'dummy',
    isPlaceholder: true,
  },
  {
    id: 'dummy-3',
    text: 'Nasi tumpengnya enak dan tampilannya bagus untuk syukuran keluarga.',
    name: 'Ibu S.',
    event: 'Syukuran',
    source: 'dummy',
    isPlaceholder: true,
  },
  {
    id: 'dummy-4',
    text: 'Hantarannya tertata manis, keluarga besar suka sekali waktu lamaran.',
    name: 'Kak D.',
    event: 'Lamaran',
    source: 'dummy',
    isPlaceholder: true,
  },
];
