import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-5xl text-accent">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-muted">Yuk, kembali ke beranda dan lihat menu kami, Kak.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-7 font-bold text-white"
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
