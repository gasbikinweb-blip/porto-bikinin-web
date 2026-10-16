import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      <p className="text-8xl font-extrabold text-silver">404</p>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Halaman Tidak Ditemukan</h1>
      <p className="text-steel">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-3"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
