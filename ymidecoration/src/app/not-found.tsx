import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-dvh place-items-center bg-paper px-4 text-center">
      <div>
        <p className="font-script text-4xl text-gold-text">Oops</p>
        <h1 className="mt-2 font-serif text-5xl sm:text-6xl">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-muted">Halaman yang Anda cari mungkin sudah dipindahkan.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center bg-ink px-8 text-sm tracking-[0.18em] text-paper uppercase"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
