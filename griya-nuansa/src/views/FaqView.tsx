import { Container, PageHeader } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { faqs } from '@/data/faq';
import { getProject } from '@/data/projects';
import type { Lang } from '@/i18n';

export const faqCopy = {
  id: {
    metaTitle: 'FAQ',
    metaDesc:
      'Pertanyaan yang sering diajukan seputar jasa desain arsitektur, interior, dan renovasi Griya Nuansa.',
    title: (
      <>
        Pertanyaan <em>yang sering diajukan</em>
      </>
    ),
    more: 'Pertanyaan Anda belum terjawab?',
    askWa: 'Halo Griya Nuansa, saya punya pertanyaan:',
    ask: 'Tanya via WhatsApp',
  },
  en: {
    metaTitle: 'FAQ',
    metaDesc:
      'Frequently asked questions about Griya Nuansa architecture, interior design, and renovation services.',
    title: (
      <>
        Frequently <em>asked questions</em>
      </>
    ),
    more: "Didn't find your answer?",
    askWa: 'Hello Griya Nuansa, I have a question:',
    ask: 'Ask via WhatsApp',
  },
};

export function FaqView({ lang }: { lang: Lang }) {
  const c = faqCopy[lang];
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        image={getProject('orange-country-apartment', lang)?.cover}
        title={c.title}
      />
      <Container className="max-w-4xl py-16 md:py-24">
        <div className="divide-y divide-line border-y border-line">
          {faqs[lang].map((f) => (
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
          <p className="mb-6 text-lg">{c.more}</p>
          <WhatsAppButton lang={lang} message={c.askWa}>
            {c.ask}
          </WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
