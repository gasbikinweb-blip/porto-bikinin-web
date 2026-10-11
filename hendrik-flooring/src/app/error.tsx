'use client';

// Penangkap error saat halaman dirender di browser. Tidak mengirim log ke mana pun.
import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex flex-1 items-center py-24">
      <div className="mx-auto max-w-md px-4 text-center">
        <h1 className="text-3xl font-bold">Terjadi kesalahan</h1>
        <p className="mt-3 text-muted">Maaf, halaman ini gagal dimuat. Silakan coba lagi.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Coba lagi
          </button>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold"
          >
            Ke beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
