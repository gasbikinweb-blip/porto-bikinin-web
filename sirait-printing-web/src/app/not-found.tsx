import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="font-display text-8xl font-extrabold text-red">404</p>
      <h1 className="font-display text-section font-extrabold">Halamannya nggak ketemu</h1>
      <p className="text-muted">Mungkin link-nya salah ketik. Yuk balik ke beranda.</p>
      <Link
        href="/"
        className="mt-4 inline-flex min-h-12 items-center rounded-full bg-red px-7 font-bold text-white hover:bg-red-strong"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
