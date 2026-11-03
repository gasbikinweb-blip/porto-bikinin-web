import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-serif text-5xl">Halaman tidak ditemukan</h1>
      <p className="text-muted">Maaf, halaman yang Anda cari tidak ada.</p>
      <Link href="/" className="inline-flex min-h-11 items-center bg-ink px-6 text-sm text-white">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
