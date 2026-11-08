// Promo dengan masa berlaku. Promo kedaluwarsa otomatis disembunyikan saat build.
// Setelah promo berakhir, build ulang (deploy) agar banner hilang.

export type Promo = { id: string; title: string; text: string; start: string; end: string };

const promos: Promo[] = [
  {
    // Sumber: caption Threads @klaurist.akrilik (DeqhDmBH3Sd)
    id: 'oktober-november',
    title: 'Promo Oktober–November',
    text: 'Papan bunga akrilik mulai 40 ribuan & free ongkir Jakal (Jalan Kaliurang) sekitarnya.',
    start: '2026-10-01', // TODO: konfirmasi tahun & tanggal promo
    end: '2026-11-30',
  },
];

/** Promo yang sedang berlaku (dihitung saat build) */
export const activePromos = () => {
  const today = new Date().toISOString().slice(0, 10);
  return promos.filter((p) => p.start <= today && today <= p.end);
};
