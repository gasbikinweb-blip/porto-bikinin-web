'use client';

import { Container, PageHeader, ButtonLink } from '@/components/ui';
import { lp } from '@/i18n';
import { useLang } from '@/i18n/client';

// Satu halaman 404 untuk kedua bahasa; bahasa dibaca dari URL yang diminta
export default function NotFound() {
  const { lang, t } = useLang();
  const n = t.notFound;
  return (
    <>
      <PageHeader
        eyebrow="404"
        title={
          <>
            {n.title1} <em>{n.title2}</em>
          </>
        }
        intro={n.intro}
      />
      <Container className="flex flex-wrap gap-3 py-12">
        <ButtonLink href={lp(lang, '/')}>{n.home}</ButtonLink>
        <ButtonLink href={lp(lang, '/proyek/')}>{n.projects}</ButtonLink>
      </Container>
    </>
  );
}
