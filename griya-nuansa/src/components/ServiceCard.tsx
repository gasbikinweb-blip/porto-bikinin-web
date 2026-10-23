import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from './icons';
import { getProjectsByService } from '@/data/projects';
import type { Service, ServiceSlug } from '@/data/types';

// Ikon garis sederhana per layanan
const iconPaths: Record<ServiceSlug, string> = {
  arsitektur: 'M3 20h18M5 20V10l7-6 7 6v10M9 20v-6h6v6',
  'desain-interior': 'M4 13v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 13h18v4H3zM5 17v2M19 17v2',
  'kitchen-set-furnitur': 'M4 4h16v16H4zM4 10h16M10 10v10M7 7h1M16 7h1M13 14h4',
  renovasi: 'M14 6l4 4M4 20l3-1 11-11-2-2L5 17zM15 3l6 6',
  'property-management': 'M4 21V9l8-6 8 6v12zM9 21v-5h6v5M12 11.5v.01',
};

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const img = getProjectsByService(service.slug)[0]?.cover;
  return (
    <Link
      href={`/layanan/${service.slug}/`}
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
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>
        <span className="mt-6 flex items-center justify-between text-[11px] font-medium tracking-[0.18em] uppercase">
          Selengkapnya
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
