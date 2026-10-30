// Daftar gambar sumber per proyek untuk `npm run optimize-images`.
// Path relatif terhadap folder "Studio AG/" (assets/ = folder Instagram, _pdf-extract/ = hasil ekstrak PDF).
// kind: 'foto' | 'render' | 'before' | 'after' | 'workshop'
// crop (opsional): { top, height } dalam piksel gambar asli, untuk memotong kolase sebelum/sesudah.
// Kolase berlatar putih sengaja tidak dipakai (lihat laporan Step 0).

const ig = (folder, files, kind) =>
  files.map((n) => ({ src: `assets/${folder}/${String(n).padStart(2, '0')}.jpg`, kind }));

export const manifest = {
  'a-f-house': [
    ...ig('2026-07-23_DbITrBiEjaq', [5, 6, 10, 11, 13, 14, 15], 'foto'),
    ...ig('2026-07-23_DbIUMqUEnnj', [1, 2], 'foto'),
    ...ig('2026-07-23_DbIUdsuEocC', [1, 2, 3], 'foto'),
    ...ig('2025-12-08_DR_CT4CkpKe', [1, 2, 3, 4], 'render'),
  ],
  'b-a-house': [
    ...ig('2026-07-23_DbISJXikk5q', [1, 2, 7, 8], 'foto'),
    ...ig('2026-07-23_DbISZz2kvPH', [4, 6], 'foto'),
    ...ig('2026-10-13_DebAiMmkrj_', [1, 2], 'foto'),
    ...ig('2025-12-10_DSEL1TrEqv3', [1, 2, 3, 4, 5], 'render'),
    ...ig('2025-12-10_DSEL6_dkhqS', [1, 2, 3, 4, 5], 'render'),
  ],
  'a-v-living-room': [
    ...ig('2026-07-23_DbIRGPrEgJo', [3, 6], 'foto'),
    ...ig('2025-09-30_DPNXYLNksS9', [1, 2, 3, 4, 5], 'render'),
  ],
  'e-s-bedroom': [
    ...ig('2026-09-08_DdA4p_4Eqnu', [1, 5, 6], 'foto'),
    {
      src: 'assets/2026-09-15_DdS78c5ErAu/02.jpg',
      kind: 'before',
      crop: { top: 1010, height: 520 },
    },
    { src: 'assets/2026-09-15_DdS78c5ErAu/02.jpg', kind: 'after', crop: { top: 260, height: 520 } },
  ],
  'd-a-park-serpong': [
    ...ig('2026-09-02_DcxHUt0Eq5s', [1], 'render'),
    ...ig('2026-09-02_DcxHW1MEvv3', [1, 5, 6, 7], 'render'),
  ],
  's-r-kids-bedroom': [
    ...ig('2025-09-09_DOXu-mBEhee', [1, 2, 3, 5, 6, 7], 'render'),
    ...ig('2025-09-09_DOXuxjhkmBF', [1, 2, 3, 4], 'render'),
  ],
  't-kitchen-living': [...ig('2026-07-23_DbIPDWNkrBS', [1, 5, 6], 'foto')],
  'kantor-jatiwarna': [
    ...ig('2026-07-23_DbIQkqfEr6m', [1, 4, 7], 'foto'),
    ...ig('2026-07-23_DbIPz4YEq-s', [4, 6], 'foto'),
  ],
  'ruang-direksi-kuningan': [
    ...ig('2025-09-09_DOXuNG4EudV', [1, 2, 3, 4, 5, 6, 7, 8, 9], 'render'),
  ],
  'furnitur-kantor-custom': [
    ...ig('2025-10-09_DPh90wVEnM4', [1, 2, 3], 'foto'),
    ...ig('2025-10-09_DPh9zphEn5k', [1, 3], 'foto'),
    ...ig('2025-10-18_DP70mg0kpXL', [1, 2, 3], 'foto'),
    ...ig('2025-10-07_DPfZA-EEsYn', [1, 2, 3], 'render'),
  ],
  'kafe-singkawang': [
    ...ig('2025-10-21_DQDcI--EgX1', [1, 2, 3, 4, 5], 'render'),
    ...ig('2025-10-21_DQDcKcMEr7P', [1, 2, 4, 5], 'render'),
  ],
  'kamar-ruang-kerja': [...ig('2026-08-25_Dccg8tbEtJV', [1, 5, 6, 8, 11, 12, 13, 14], 'render')],
  // Bukan proyek: foto untuk hero dan bagian "Dari Workshop Kami"
  _situs: [
    { src: '_pdf-extract/p02_01_2309x781.jpg', kind: 'foto', name: 'hero' },
    { src: '_pdf-extract/p10_01_1169x1632.jpg', kind: 'workshop', name: 'workshop-1' },
    { src: '_pdf-extract/p10_02_469x578.jpg', kind: 'workshop', name: 'workshop-2' },
    { src: '_pdf-extract/p11_01_615x995.jpg', kind: 'workshop', name: 'workshop-3' },
    { src: 'assets/2025-10-09_DPh9zphEn5k/02.jpg', kind: 'workshop', name: 'workshop-4' },
    { src: 'assets/2026-09-01_DcuieQcEqwX/10.jpg', kind: 'workshop', name: 'workshop-5' },
  ],
};
