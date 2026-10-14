import type { Metadata } from 'next';
import { ClockIcon, PinIcon, WhatsAppIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { fullAddress, siteConfig } from '@/lib/config';
import { buildWhatsAppLink, consultMessage, generalMessage } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi',
  description: `Hubungi ${siteConfig.name} via WhatsApp ${siteConfig.waDisplay} atau kunjungi toko kami di ${siteConfig.address.street}, Batam.`,
  alternates: { canonical: '/kontak' },
};

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const card = 'reveal rounded-2xl border border-line bg-surface p-7';

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Kontak"
        title="Mari Atur Jadwal Ukur"
        description="Konsultasi, ukur, dan penawaran semuanya lewat WhatsApp. Atau mampir langsung ke toko kami."
        align="center"
      />

      <div data-stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className={card}>
          <WhatsAppIcon className="size-7 text-accent" />
          <h2 className="mt-4 font-serif text-2xl">WhatsApp</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="font-semibold hover:text-accent-strong"
              >
                {siteConfig.waDisplay} <span className="font-normal text-muted">(utama)</span>
              </a>
            </li>
            {siteConfig.waExtra.map((n) => (
              <li key={n.number}>
                <a
                  href={buildWhatsAppLink(generalMessage, n.number)}
                  {...external}
                  className="text-muted hover:text-accent-strong"
                >
                  {n.display}
                </a>
              </li>
            ))}
          </ul>
          <WhatsAppButton message={consultMessage()} className="mt-6 w-full">
            Minta Ukur Gratis
          </WhatsAppButton>
        </div>

        <div className={card}>
          <PinIcon className="size-7 text-accent" />
          <h2 className="mt-4 font-serif text-2xl">Alamat Toko</h2>
          <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
            {fullAddress}
          </address>
          <a
            href={siteConfig.mapsUrl}
            {...external}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-strong"
          >
            Buka di Google Maps
            <span className="sr-only"> (tab baru)</span>
          </a>
        </div>

        <div className={card}>
          <ClockIcon className="size-7 text-accent" />
          <h2 className="mt-4 font-serif text-2xl">Jam Buka</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {siteConfig.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt className="text-muted">{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Di luar jam buka, pesan WhatsApp tetap bisa dikirim dan akan kami balas pada hari kerja
            berikutnya.
          </p>
        </div>
      </div>

      <div className="reveal mt-10 flex flex-wrap justify-center gap-3 text-sm">
        {[
          { href: siteConfig.instagram, label: 'Instagram @saliving.id' },
          { href: siteConfig.threads, label: 'Threads' },
          { href: siteConfig.linkPage, label: 'Semua link' },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            {...external}
            className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent"
          >
            {l.label}
          </a>
        ))}
        {siteConfig.email && (
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border border-line px-5 py-2.5 transition-colors hover:border-accent"
          >
            {siteConfig.email}
          </a>
        )}
      </div>
    </section>
  );
}
