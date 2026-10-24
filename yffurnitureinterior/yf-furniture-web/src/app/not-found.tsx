import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-wood">404</p>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-full bg-wood px-6 font-semibold text-white hover:bg-wood-strong"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-semibold hover:border-wood"
        >
          Lihat Katalog
        </Link>
      </div>
    </section>
  );
}
