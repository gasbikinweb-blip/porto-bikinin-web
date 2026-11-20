import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan | SANARÉA' };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-caps mt-6 text-3xl sm:text-4xl">Halaman tidak ditemukan</h1>
      <p className="mt-5 text-muted">
        Maaf, Kak, halaman yang dicari tidak ada atau sudah dipindahkan.
      </p>
      <Link href="/" className="btn btn-solid mt-10">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
