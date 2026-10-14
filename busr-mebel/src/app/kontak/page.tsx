import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppInquiryBuilder } from '@/components/WhatsAppInquiryBuilder';
import { ArrowIcon, WhatsAppIcon } from '@/components/icons';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Hubungi Kami & Layanan Konsultasi',
  description: `Hubungi ${siteConfig.name} via WhatsApp untuk konsultasi custom furniture, pemesanan katalog, dan jadwal survei workshop di Jepara.`,
  alternates: { canonical: '/kontak' },
};

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Kontak & Konsultasi"
        title="Diskusikan Kebutuhan Furnitur Anda"
        description="Semua konsultasi spesifikasi, custom order, negosiasi volume B2B, dan jadwal pengiriman dilayani langsung lewat WhatsApp tanpa perantara."
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* WhatsApp Card */}
        <div className="reveal rounded-2xl border border-line bg-surface p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl text-foreground font-medium">WhatsApp Resmi</h2>
            <p className="mt-3 text-sm text-accent-strong font-medium">{siteConfig.waDisplay}</p>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Respon cepat untuk tanya stok, estimasi harga custom, dan pengiriman katalog.
            </p>
          </div>
          <a
            href={buildWhatsAppLink(generalMessage)}
            {...external}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-xs font-semibold text-background hover:bg-accent-strong transition-colors"
          >
            <WhatsAppIcon className="size-4" />
            Chat WhatsApp
          </a>
        </div>

        {/* Email Card */}
        <div className="reveal rounded-2xl border border-line bg-surface p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl text-foreground font-medium">Email Penawaran</h2>
            <p className="mt-3 text-sm text-foreground font-medium break-all">{siteConfig.email}</p>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Untuk pengiriman berkas tender, gambar denah CAD, file 3D, atau penawaran resmi B2B.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-3 text-xs font-semibold text-foreground hover:border-accent transition-colors"
          >
            Kirim Email
          </a>
        </div>

        {/* Alamat & Maps Link */}
        <div className="reveal rounded-2xl border border-line bg-surface p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl text-foreground font-medium">Workshop & Kantor</h2>
            <address className="mt-3 text-xs leading-relaxed text-muted not-italic">
              {siteConfig.address}
            </address>
            <p className="mt-2 text-[11px] text-accent">
              Kunjungan workshop dengan janji temu terlebih dahulu.
            </p>
          </div>
          {/* Peta hanya link keluar, tanpa iframe */}
          <a
            href={siteConfig.mapsUrl}
            {...external}
            className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 py-3 text-xs font-semibold text-foreground hover:border-accent transition-colors"
          >
            Buka di Google Maps <ArrowIcon className="size-3" />
          </a>
        </div>

        {/* Jam Operasional */}
        <div className="reveal rounded-2xl border border-line bg-surface p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl text-foreground font-medium">Jam Operasional</h2>
            <dl className="mt-3 space-y-2.5 text-xs">
              {siteConfig.hours.map((h) => (
                <div key={h.day} className="flex flex-col gap-0.5 border-b border-line/40 pb-2">
                  <dt className="text-muted">{h.day}</dt>
                  <dd className="font-medium text-foreground">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Jangkauan Pengiriman */}
      <div className="reveal mt-12 rounded-2xl border border-line/80 bg-surface p-6 sm:p-8">
        <h3 className="font-serif text-xl font-medium text-foreground">Jangkauan Pengiriman & Logistik</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {siteConfig.shippingCoverage}. Kami bekerjasama dengan ekspedisi kargo furnitur terpercaya yang menyediakan proteksi packing kayu dan opsi perakitan langsung di lokasi Anda.
        </p>
      </div>

      {/* WhatsApp Inquiry Builder */}
      <div className="mt-16 max-w-4xl mx-auto">
        <WhatsAppInquiryBuilder />
      </div>

      {/* Media Sosial */}
      <div className="reveal mt-12 flex flex-wrap justify-center gap-4 text-sm">
        <a
          href={siteConfig.instagram}
          {...external}
          className="rounded-full border border-line bg-surface px-6 py-2.5 text-xs font-medium transition-colors hover:border-accent"
        >
          Instagram: @busrmebel
        </a>
        <a
          href={siteConfig.tiktok}
          {...external}
          className="rounded-full border border-line bg-surface px-6 py-2.5 text-xs font-medium transition-colors hover:border-accent"
        >
          TikTok
        </a>
      </div>
    </section>
  );
}
