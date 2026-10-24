import type { Metadata } from 'next';
import { PlusIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { faq } from '@/data/faq';

const description =
  'Pertanyaan yang sering diajukan tentang pemesanan furniture custom di YF Furniture & Interior Boyolali: ukuran custom, pengiriman luar kota, DP, dan kunjungan workshop.';

export const metadata: Metadata = {
  title: 'FAQ',
  description,
  alternates: { canonical: '/faq' },
  openGraph: { title: 'FAQ YF Furniture & Interior', description, url: '/faq' },
};

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <SectionHeading as="h1" eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
      {/* Akordeon native: aksesibel & jalan tanpa JavaScript */}
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {faq.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
              {item.question}
              <PlusIcon className="size-5 shrink-0 text-wood transition-transform group-open:rotate-45" />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-muted">Masih ada pertanyaan lain?</p>
        <WhatsAppButton className="mt-3" message="Halo YF Furniture, saya ingin bertanya.">
          Tanya via WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
