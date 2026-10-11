import Link from 'next/link';
import { Container } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold tracking-wider text-accent uppercase">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Kembali ke beranda
          </Link>
          <WhatsAppButton variant="outline">Tanya lewat WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
