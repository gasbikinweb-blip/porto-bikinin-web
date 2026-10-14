import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { ArrowIcon, CheckIcon, WhatsAppIcon } from '@/components/icons';
import { getRooms } from '@/data/rooms';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Inspirasi Penataan Ruangan & Konsep Interior',
  description:
    'Rekomendasi penataan dan kurasi furnitur untuk Open Space Office, Ruang Direktur, Cafe/Resto, dan Ruang Tamu Minimalis.',
  alternates: { canonical: '/inspirasi' },
  openGraph: {
    type: 'website',
    url: '/inspirasi',
    title: `Inspirasi Penataan Ruangan | ${siteConfig.name}`,
    description:
      'Ide penataan ruang kantor, kafe, dan hunian dengan furnitur kayu solid & modern dari Busr Mebel.',
    images: [
      {
        url: '/products/sofa-modular-aera-curve/og.jpg',
        width: 600,
        height: 750,
        alt: 'Inspirasi Penataan Ruangan Busr Mebel',
      },
    ],
  },
};

export default function InspirationPage() {
  const rooms = getRooms();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Inspirasi Ruangan"
        title="Harmoni Desain & Penataan Furnitur"
        description="Eksplorasi kurasi tata ruang siap pakai untuk perkantoran modern, bisnis komersial, maupun hunian pribadi idaman Anda."
        align="center"
      />

      <div className="mt-16 space-y-24">
        {rooms.map((room, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <section
              key={room.id}
              aria-labelledby={`room-${room.id}`}
              className="rounded-3xl border border-line bg-surface p-6 sm:p-12 shadow-sm"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Deskripsi & Tips */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                    Konsep #{idx + 1}
                  </span>
                  <h2
                    id={`room-${room.id}`}
                    className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-foreground"
                  >
                    {room.name}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-accent-strong">{room.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{room.description}</p>

                  <div className="mt-6 border-t border-line pt-6">
                    <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                      Tips Penataan Profesional:
                    </h3>
                    <ul className="mt-3 space-y-2 text-xs text-muted">
                      {room.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2.5">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <a
                      href={buildWhatsAppLink(
                        `Halo Busr Mebel, saya tertarik dengan konsep penataan "${room.name}". Bisakah kami konsultasi kebutuhan furnitur untuk ruangan ini?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
                    >
                      <WhatsAppIcon className="size-4" />
                      Konsultasi Tata Ruang Ini
                    </a>
                  </div>
                </div>

                {/* Grid Produk Pilihan Ruangan */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="grid grid-cols-2 gap-4">
                    {room.items.slice(0, 4).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/produk/${item.slug}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all hover:border-accent"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-background">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            sizes="(min-width: 1024px) 20vw, 45vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3.5">
                          <p className="text-[10px] tracking-wider text-muted uppercase">
                            {item.category}
                          </p>
                          <h4 className="mt-1 font-serif text-sm font-medium text-foreground line-clamp-1 group-hover:text-accent-strong">
                            {item.name}
                          </h4>
                          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                            Lihat detail <ArrowIcon className="size-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
