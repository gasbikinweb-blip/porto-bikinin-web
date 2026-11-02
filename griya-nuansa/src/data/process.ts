import type { L } from '@/i18n';

// Alur kerja sesuai Brief Web Griya Nuansa:
// Konsultasi → Perancangan → Persetujuan Desain → Koordinasi Teknis → Pengawasan Konstruksi → Serah Terima.
// Deskripsi tiap langkah mengikuti website griyanuansa.id.
export const workflow: L<{ title: string; text: string }[]> = {
  id: [
    {
      title: 'Konsultasi',
      text: 'Pertemuan awal untuk membahas visi, anggaran, kebutuhan ruang, dan survei lokasi awal.',
    },
    {
      title: 'Perancangan',
      text: 'Penyusunan konsep desain makro, tata letak ruang, dan visualisasi 3D awal.',
    },
    {
      title: 'Persetujuan Desain',
      text: 'Finalisasi gambar kerja detail (DED), pemilihan material akhir, dan persetujuan RAB resmi.',
    },
    {
      title: 'Koordinasi Teknis',
      text: 'Persiapan tim konstruksi, mobilisasi alat/material, dan pengurusan perizinan bangunan (PBG).',
    },
    {
      title: 'Pengawasan Konstruksi',
      text: 'Pelaksanaan fisik bangunan di lokasi dengan kontrol kualitas harian dan laporan progres rutin kepada Anda.',
    },
    {
      title: 'Serah Terima',
      text: 'Inspeksi akhir bersama (checklist) dan serah terima kunci beserta dokumen garansi proyek.',
    },
  ],
  en: [
    {
      title: 'Consultation',
      text: 'Initial meeting to discuss vision, budget, space requirements, and an initial site survey.',
    },
    {
      title: 'Design Development',
      text: 'Preparation of macro design concepts, space layouts, and initial 3D visualisation.',
    },
    {
      title: 'Design Approval',
      text: 'Finalisation of detailed working drawings (DED), final material selection, and official budget (RAB) approval.',
    },
    {
      title: 'Technical Coordination',
      text: 'Construction team preparation, mobilisation of equipment/materials, and building permit (PBG) processing.',
    },
    {
      title: 'Construction Supervision',
      text: 'Physical building execution on site with daily quality control and regular progress reports to you.',
    },
    {
      title: 'Handover',
      text: 'Joint final inspection (checklist) and key handover along with project warranty documents.',
    },
  ],
};
