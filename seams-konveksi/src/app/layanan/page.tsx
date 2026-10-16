import { CatalogDownload, ProcessSteps } from '@/components/sections';
import { CtaBand, PageHeader, WhatsAppButton, container } from '@/components/ui';
import { services, terms } from '@/data/solutions';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage, serviceMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Layanan',
  description:
    'Layanan jasa CMT abaya dan khimar: konsultasi desain, pembuatan pola dan sampel, produksi jahit, quality control, dan packing.',
  path: '/layanan',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Layanan"
        title="Layanan konveksi dari sampel sampai packing"
        intro="Jasa CMT (Cut, Make, Trim) untuk busana muslimah. Anda bisa memakai satu tahap atau seluruh rangkaian layanan."
      />

      <section className={`${container} py-14`}>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id} className="reveal flex flex-col rounded-2xl border border-line p-6">
              <span className="font-serif text-2xl text-plum">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 font-serif text-2xl">{s.name}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{s.description}</p>
              <p className="mt-4 text-sm font-semibold text-sage-strong">{s.duration}</p>
              <WhatsAppButton
                message={serviceMessage(s.name.toLowerCase())}
                label="Tanyakan"
                variant="outline"
                className="mt-4 self-start min-h-10! px-4! py-2!"
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          Estimasi waktu bersifat perkiraan dan dipastikan saat konsultasi.
        </p>
      </section>

      <section aria-labelledby="tahapan" className="bg-surface py-14">
        <div className={container}>
          <h2 id="tahapan" className="mb-8 font-serif text-3xl">
            Tahapan kerja
          </h2>
          <ProcessSteps />
        </div>
      </section>

      <section aria-labelledby="ketentuan" className={`${container} grid gap-6 py-14`}>
        <div>
          <h2 id="ketentuan" className="mb-6 font-serif text-3xl">
            Ketentuan order
          </h2>
          <dl className="grid gap-4 sm:grid-cols-3">
            {terms.map((t) => (
              <div key={t.label} className="rounded-xl border border-line p-5">
                <dt className="text-sm text-muted">{t.label}</dt>
                <dd className="mt-1 font-semibold">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CatalogDownload />
      </section>

      <CtaBand message={generalMessage} />
    </>
  );
}
