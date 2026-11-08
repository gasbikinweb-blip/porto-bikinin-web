import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowerSprig } from '@/components/decor';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan', robots: { index: false } };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <FlowerSprig className="w-20 text-rose" />
      <p className="font-script text-6xl text-rose">Oops</p>
      <h1 className="font-serif text-3xl font-semibold">Halamannya nggak ketemu, Kak</h1>
      <p className="text-muted">Mungkin link-nya salah ketik. Yuk, balik ke beranda.</p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-12 items-center rounded-full bg-rose px-6 font-medium text-on-rose hover:bg-rose-strong"
      >
        Kembali ke Beranda
      </Link>
    </section>
  );
}
