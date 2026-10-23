import { Container, PageHeader } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { faqs } from '@/data/faq';
import { getProject } from '@/data/projects';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'FAQ',
  description:
    'Pertanyaan yang sering diajukan seputar jasa desain arsitektur, interior, dan renovasi Griya Nuansa.',
  path: '/faq/',
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        image={getProject('orange-country-apartment')?.cover}
        title={
          <>
            Pertanyaan <em>yang sering diajukan</em>
          </>
        }
      />
      <Container className="max-w-4xl py-16 md:py-24">
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-2xl">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-2xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-16">
          <p className="mb-6 text-lg">Pertanyaan Anda belum terjawab?</p>
          <WhatsAppButton message="Halo Griya Nuansa, saya punya pertanyaan:">
            Tanya via WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
