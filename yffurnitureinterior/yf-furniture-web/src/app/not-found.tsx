import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 pt-32 pb-24 text-center">
      <p className="font-serif text-8xl text-wood">404</p>
      <h1 className="font-serif text-4xl sm:text-5xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center bg-foreground px-6 text-xs font-semibold tracking-[0.18em] text-background uppercase hover:bg-wood-strong"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/#katalog"
          className="inline-flex min-h-12 items-center border border-foreground/25 px-6 text-xs font-semibold tracking-[0.18em] uppercase hover:border-foreground"
        >
          Lihat Katalog
        </Link>
      </div>
    </section>
  );
}
