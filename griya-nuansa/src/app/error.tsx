'use client';

import { Container, PageHeader } from '@/components/ui';

// Error boundary: tampilkan pesan netral tanpa membocorkan detail error ke pengunjung
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Kesalahan"
        title="Terjadi kendala"
        intro="Maaf, halaman gagal dimuat. Silakan coba lagi."
      />
      <Container className="pt-12">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-fg px-6 py-3 text-sm hover:bg-fg hover:text-bg"
        >
          Muat ulang
        </button>
      </Container>
    </>
  );
}
