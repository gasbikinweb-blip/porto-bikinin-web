import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Kontak',
  description: `Hubungi ${siteConfig.name} via WhatsApp untuk konsultasi dan pemesanan mebel jati.`,
  alternates: { canonical: '/kontak' },
};

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Kontak"
        title="Mari Berbincang"
        description="Semua pertanyaan dan pemesanan kami layani langsung lewat WhatsApp. Kami siap membantu memilih furnitur yang tepat."
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="reveal rounded-2xl border border-line bg-surface p-8">
          <h2 className="font-serif text-2xl">WhatsApp</h2>
          <p className="mt-3 text-sm text-muted">{siteConfig.waDisplay}</p>
          <WhatsAppButton className="mt-6 w-full">Chat Sekarang</WhatsAppButton>
        </div>

        <div className="reveal rounded-2xl border border-line bg-surface p-8">
          <h2 className="font-serif text-2xl">Alamat</h2>
          <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
            {siteConfig.address}
          </address>
          <p className="mt-4 text-xs text-muted">
            Kunjungan workshop dengan janji temu terlebih dahulu.
          </p>
        </div>

        <div className="reveal rounded-2xl border border-line bg-surface p-8">
          <h2 className="font-serif text-2xl">Jam Buka</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {siteConfig.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt className="text-muted">{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="reveal mt-12 flex flex-wrap justify-center gap-4 text-sm">
        <a
          href={siteConfig.instagram}
          {...external}
          className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent"
        >
          Instagram @linirumahjepara
        </a>
        <a
          href={siteConfig.tiktok}
          {...external}
          className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent"
        >
          TikTok @linirumahjepara
        </a>
      </div>
    </section>
  );
}
