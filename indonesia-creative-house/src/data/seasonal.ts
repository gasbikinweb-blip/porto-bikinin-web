// Banner hanya tampil kalau tanggal build ada di rentang startDate..endDate. Perlu build ulang untuk berganti.
export type Seasonal = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  itemSlugs: string[];
};

// TODO: konfirmasi tanggal dan isi tiap musim ke pemilik
export const seasonal: Seasonal[] = [
  {
    id: 'natal',
    title: 'Hantaran Natal & Tahun Baru',
    description: 'Siapkan hantaran untuk keluarga dan sahabat, Kak. Tanyakan pilihannya ke admin.',
    startDate: '2026-12-01',
    endDate: '2026-12-31',
    itemSlugs: ['lapis-legit', 'hantaran-rantang-cantik'],
  },
  {
    id: 'ramadhan',
    title: 'Takjil & Hantaran Ramadhan',
    description: 'Aneka takjil dan hampers untuk berbagi kebahagiaan Ramadhan.',
    startDate: '2027-01-25',
    endDate: '2027-03-08',
    itemSlugs: ['hampers-takjil-ramadhan', 'snack-besekan'],
  },
];

export function activeSeasonal(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return seasonal.find((s) => s.startDate <= today && today <= s.endDate);
}
