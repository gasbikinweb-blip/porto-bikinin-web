import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan' };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-red">404</p>
      <h1 className="text-2xl font-extrabold sm:text-4xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Halaman yang Kakak cari tidak ada. Yuk kembali ke beranda.</p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-12 items-center rounded-lg bg-red px-6 font-bold text-white hover:bg-red-strong"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
