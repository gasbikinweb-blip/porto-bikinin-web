'use client';

import { Container, PageHeader } from '@/components/ui';
import { useLang } from '@/i18n/client';

// Error boundary: tampilkan pesan netral tanpa membocorkan detail error ke pengunjung
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t.error.eyebrow} title={t.error.title} intro={t.error.intro} />
      <Container className="pt-12">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-fg px-6 py-3 text-sm hover:bg-fg hover:text-bg"
        >
          {t.error.retry}
        </button>
      </Container>
    </>
  );
}
