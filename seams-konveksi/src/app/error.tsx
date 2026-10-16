'use client';

// Tampilan rapi kalau terjadi error tak terduga di browser
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      <h1 className="font-serif text-3xl sm:text-5xl">Terjadi kesalahan</h1>
      <p className="text-muted">Maaf, halaman gagal dimuat. Silakan coba lagi.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-background hover:bg-plum-strong"
      >
        Coba lagi
      </button>
    </section>
  );
}
