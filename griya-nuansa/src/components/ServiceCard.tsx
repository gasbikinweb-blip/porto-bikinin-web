import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from './icons';
import { getProjectsByService } from '@/data/projects';
import type { Service, ServiceSlug } from '@/data/types';
import { type Lang, lp } from '@/i18n';
import { ui } from '@/i18n/ui';

// Ikon garis sederhana per layanan
const iconPaths: Record<ServiceSlug, string> = {
  arsitektur: 'M3 20h18M5 20V10l7-6 7 6v10M9 20v-6h6v6',
  'desain-interior': 'M4 13v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 13h18v4H3zM5 17v2M19 17v2',
  'property-management': 'M4 21V9l8-6 8 6v12zM9 21v-5h6v5M12 11.5v.01',
  kontraktor: 'M3 20h18M5 20v-6l7-5 7 5v6M12 9V4M9 6h6M8 20v-3h8v3',
  konsultan: 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5',
};

export function ServiceCard({
  service,
  index,
  lang = 'id',
}: {
  service: Service;
  index?: number;
  lang?: Lang;
}) {
  const img = getProjectsByService(service.slug, lang)[0]?.cover;
  return (
    <Link
      href={lp(lang, `/layanan/${service.slug}/`)}
      className="group flex h-full flex-col overflow-hidden rounded-md bg-bg ring-1 ring-line transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {img && (
          <Image
            src={img.thumb}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="relative flex flex-1 flex-col px-6 pb-6">
        <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-bg ring-1 ring-line">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPaths[service.slug]} />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-2xl">
          {index !== undefined && <span className="mr-2 text-base text-muted">0{index + 1}</span>}
          {service.title[lang]}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short[lang]}</p>
        <span className="mt-6 flex items-center justify-between text-[11px] font-medium tracking-[0.18em] uppercase">
          {ui[lang].more}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
