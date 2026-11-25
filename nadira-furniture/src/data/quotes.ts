// Kutipan inspiratif tentang desain & rumah. Hanya kutipan yang atribusinya jelas.
export type Quote = {
  text: string;
  author: string;
  role: string;
};

// TODO: isi kutipan (opsional). Section kutipan disembunyikan bila kosong.
export const quotes: readonly Quote[] = [];
