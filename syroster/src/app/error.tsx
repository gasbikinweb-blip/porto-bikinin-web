'use client';

import Link from 'next/link';

// Tampilan rapi bila terjadi error di sisi browser
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold text-ink">Terjadi kesalahan</h1>
      <p className="mt-3 text-muted">Maaf, halaman gagal dimuat. Silakan coba lagi.</p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="rounded-lg border-2 border-brand px-5 py-3 font-semibold text-brand"
        >
          Ke beranda
        </Link>
      </div>
    </section>
  );
}
