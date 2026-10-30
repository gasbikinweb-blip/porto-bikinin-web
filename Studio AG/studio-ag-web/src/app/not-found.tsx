import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      <p className="font-serif text-8xl text-accent-ink italic">404</p>
      <span className="rule-motif text-accent" aria-hidden="true" />
      <h1 className="font-serif text-3xl sm:text-5xl">Ruangan ini belum kami rancang</h1>
      <p className="text-muted">Halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-ink"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/#proyek"
          className="rounded-full border border-line px-6 py-3 text-sm hover:border-accent"
        >
          Lihat Proyek
        </Link>
      </div>
    </section>
  );
}
