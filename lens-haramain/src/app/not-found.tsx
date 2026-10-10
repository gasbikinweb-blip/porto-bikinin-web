import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan | Lens Haramain' };

// Halaman 404 custom (diekspor menjadi out/404.html)
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="logo-mark size-12 text-accent" aria-hidden="true" />
      <p className="font-serif text-8xl font-light text-accent">404</p>
      <h1 className="font-serif text-3xl sm:text-5xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
