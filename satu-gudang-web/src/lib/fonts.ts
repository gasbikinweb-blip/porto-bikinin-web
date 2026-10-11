import { Fraunces, Manrope } from 'next/font/google';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Fraunces: serif lembut untuk judul (kesan craft & hangat). Manrope: sans bersih untuk teks.
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
  style: ['normal', 'italic'],
});

export const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
