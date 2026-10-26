import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="font-serif text-8xl text-rose italic">404</p>
      <h1 className="font-serif text-section">Halamannya tidak ketemu, Kak</h1>
      <p className="text-muted">Mungkin link-nya sudah berubah. Yuk lihat koleksi kami.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-full bg-mocha px-6 font-bold text-background hover:bg-mocha-strong"
        >
          Ke Beranda
        </Link>
        <Link
          href="/#koleksi"
          className="inline-flex min-h-12 items-center rounded-full border-2 border-mocha px-6 font-bold hover:bg-mocha hover:text-background"
        >
          Lihat Katalog
        </Link>
      </div>
    </section>
  );
}
