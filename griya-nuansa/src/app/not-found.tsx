import { Container, PageHeader, ButtonLink } from '@/components/ui';

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
      <Container className="flex flex-wrap gap-3 py-12">
        <ButtonLink href="/">Ke beranda</ButtonLink>
        <ButtonLink href="/proyek/">Lihat proyek</ButtonLink>
      </Container>
    </>
  );
}
