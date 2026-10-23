import { Container, PageHeader, PillLink } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title={
          <>
            Ruang ini <em>belum dibangun</em>
          </>
        }
        intro="Halaman yang Anda cari tidak ditemukan."
      />
      <Container className="flex flex-wrap gap-3 pt-12">
        <PillLink href="/">Ke beranda</PillLink>
        <PillLink href="/proyek/">Lihat proyek</PillLink>
      </Container>
    </>
  );
}
