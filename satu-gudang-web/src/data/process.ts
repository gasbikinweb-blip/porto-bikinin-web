// Langkah proses kerja. Foto = dokumentasi asli dari PDF portofolio (sebelum & progres pengerjaan).
// TODO: tambahkan foto proses produksi di workshop bila ada (sekarang: foto memilih sample HPL di workshop)

export const processStepIds = ['consult', 'design', 'produce', 'install'] as const;
export type ProcessStepId = (typeof processStepIds)[number];

export type ProcessStep = {
  id: ProcessStepId;
  /** null = belum ada foto asli (tampil sebagai kartu teks) */
  image: string | null;
};

export const processSteps: readonly ProcessStep[] = [
  { id: 'consult', image: '/process/before-1' },
  { id: 'design', image: '/design/03' },
  { id: 'produce', image: '/process/sample-request-1' },
  { id: 'install', image: '/process/progress-kitchen' },
];
