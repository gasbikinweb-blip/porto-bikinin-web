import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppBuilder } from '@/components/WhatsAppBuilder';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { fullAddress, site } from '@/data/site';

const description =
  'Hubungi YF Furniture & Interior via WhatsApp 0898-8747-150. Workshop di Dk. Bakalan, Selodoko, Ampel, Boyolali, Jawa Tengah.';

export const metadata: Metadata = {
  title: 'Kontak',
  description,
  alternates: { canonical: '/kontak' },
  openGraph: { title: 'Kontak YF Furniture & Interior', description, url: '/kontak' },
};

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function KontakPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Kontak"
        title="Konsultasi gratis via WhatsApp"
        description="Kirim ukuran ruangan dan foto contoh model, kami balas secepatnya."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold">WhatsApp</h2>
            <p className="mt-1 text-2xl font-extrabold">{site.waDisplay}</p>
            <WhatsAppButton className="mt-4 w-full sm:w-auto" />
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold">Alamat workshop</h2>
            <address className="mt-1 leading-relaxed text-muted not-italic">{fullAddress}</address>
            <a
              href={site.mapsUrl}
              {...external}
              className="mt-3 inline-flex min-h-10 items-center font-semibold text-wood underline underline-offset-4"
            >
              Buka di Google Maps<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-bold">Jam kerja</h2>
              {/* TODO: konfirmasi jam kerja */}
              <dl className="mt-2 space-y-1 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-3">
                    <dt className="text-muted">{h.day}</dt>
                    <dd className="font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-bold">Area layanan</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {site.serviceAreas.join(', ')}. Bisa kirim luar kota.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold">Media sosial</h2>
            <ul className="mt-2 flex flex-wrap gap-3">
              <li>
                <a
                  href={site.instagram}
                  {...external}
                  className="inline-flex min-h-10 items-center rounded-full border border-line px-4 font-medium hover:border-wood"
                >
                  Instagram @yffurnitureinterior<span className="sr-only"> (tab baru)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.threads}
                  {...external}
                  className="inline-flex min-h-10 items-center rounded-full border border-line px-4 font-medium hover:border-wood"
                >
                  Threads<span className="sr-only"> (tab baru)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <section aria-labelledby="buat-pesan">
          <h2 id="buat-pesan" className="mb-4 text-xl font-bold">
            Susun pesan pesanan
          </h2>
          <WhatsAppBuilder />
        </section>
      </div>
    </div>
  );
}
