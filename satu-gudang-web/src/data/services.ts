// Tiga layanan utama. Teks (judul, deskripsi, poin) ada di src/content/{id,en}.ts dengan kunci id yang sama.

export const serviceIds = ['furniture', 'interior', 'build'] as const;
export type ServiceId = (typeof serviceIds)[number];

export type Service = {
  id: ServiceId;
  /** Path gambar tanpa ekstensi; file: <image>.webp & <image>-sm.webp (hasil optimize-images) */
  image: string;
};

export const services: readonly Service[] = [
  { id: 'furniture', image: '/projects/warm-wood-residence/02' },
  { id: 'interior', image: '/projects/spa-seminyak/05' },
  // TODO: belum ada foto proyek arsitektur/bangun dari nol; sementara pakai foto renovasi spa (sesudah)
  { id: 'build', image: '/projects/spa-seminyak/02' },
];
