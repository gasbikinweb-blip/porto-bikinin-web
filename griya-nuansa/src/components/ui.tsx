import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from './icons';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-screen-2xl px-5 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = 'text-amber',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xs font-medium tracking-[0.25em] uppercase ${className}`}>{children}</p>
  );
}

/** Link berbentuk pill dengan lingkaran panah, gaya utama tombol sekunder */
export function PillLink({
  href,
  children,
  tone = 'dark',
  className = '',
}: {
  href: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const s =
    tone === 'dark'
      ? { pill: 'border-fg/25 text-fg hover:border-fg', dot: 'bg-fg text-bg' }
      : { pill: 'border-white/40 text-white hover:border-white', dot: 'bg-white text-neutral-900' };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-5 text-xs font-medium tracking-wider uppercase transition-colors ${s.pill} ${className}`}
    >
      {children}
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:rotate-45 ${s.dot}`}
      >
        <ArrowUpRight />
      </span>
    </Link>
  );
}

/** Kartu gelap membulat di puncak halaman. Header melayang di atasnya. */
export function HeroFrame({
  children,
  image,
  priority = false,
  className = '',
}: {
  children: ReactNode;
  image?: { src: string; alt: string };
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className="px-2 pt-2 md:px-3 md:pt-3">
      <div
        className={`relative overflow-hidden rounded-[1.75rem] bg-ink text-white md:rounded-[2.25rem] ${className}`}
      >
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              fetchPriority={priority ? 'high' : undefined}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
          </>
        ) : (
          // Tanpa foto: cahaya hangat lembut agar kartu tidak datar
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,145,74,0.28),transparent_55%)]" />
        )}
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/** Judul halaman (h1) di dalam kartu gelap */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: { src: string; alt: string };
  breadcrumb?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <HeroFrame
      image={image}
      priority={!!image}
      className={image ? 'min-h-[520px] md:min-h-[640px]' : ''}
    >
      <div
        className={`flex flex-col justify-end px-5 pt-32 pb-10 md:px-12 md:pt-44 md:pb-14 ${image ? 'min-h-[520px] md:min-h-[640px]' : ''}`}
      >
        {breadcrumb && <div className="mb-6 text-sm text-white/70">{breadcrumb}</div>}
        <div className="fade-up max-w-5xl">
          <Eyebrow className="text-white/70">{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[1] font-light md:text-8xl">{title}</h1>
          {intro && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</div>
          )}
        </div>
        {children}
      </div>
    </HeroFrame>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-light md:text-6xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
