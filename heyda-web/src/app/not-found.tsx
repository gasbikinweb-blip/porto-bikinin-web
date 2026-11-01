import type { Metadata } from 'next';
import Link from 'next/link';
import { Bottle } from '@/components/Bottle';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <Bottle color="#4f8a3c" label="404" className="w-24" />
      <h1 className="font-serif text-3xl sm:text-4xl">Waduh, halamannya nggak ketemu, Kak</h1>
      <p className="text-muted">Mungkin link-nya salah ketik atau halamannya sudah dipindah.</p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-bold text-white hover:bg-accent-strong"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
