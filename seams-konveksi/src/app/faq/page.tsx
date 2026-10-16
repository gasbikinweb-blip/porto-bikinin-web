import { FaqList } from '@/components/sections';
import { CtaBand, PageHeader, container } from '@/components/ui';
import { faqs } from '@/data/faq';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Pertanyaan umum seputar jasa konveksi abaya dan khimar Seams Konveksi: minimum order, sampel, lama produksi, bahan, pembayaran, dan pengiriman.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Pertanyaan yang sering diajukan"
        intro="Belum menemukan jawabannya? Tanyakan langsung lewat WhatsApp."
      />
      <section className={`${container} max-w-3xl! py-14`}>
        <FaqList items={faqs} />
      </section>
      <CtaBand message={generalMessage} title="Masih ada pertanyaan?" />
    </>
  );
}
