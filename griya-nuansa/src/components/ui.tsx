import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from './icons';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-screen-xl px-5 md:px-10 ${className}`}>{children}</div>;
}

/** Label kecil huruf kapital di atas judul */
export function Eyebrow({
  children,
  className = 'text-muted',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[11px] font-medium tracking-[0.22em] uppercase ${className}`}>{children}</p>
  );
}

const buttonStyles = {
  solid: 'bg-fg text-bg hover:opacity-85',
  outline: 'border border-fg/30 text-fg hover:border-fg',
};

/** Tombol-link kotak dengan panah, gaya utama tombol di seluruh website */
export function ButtonLink({
  href,
  children,
  variant = 'outline',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-sm px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] uppercase transition-all ${buttonStyles[variant]} ${className}`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * Banner (jumbotron) di puncak setiap halaman: foto lebar dengan gradasi terang di kiri
 * tempat judul berada. Tinggi lebih besar untuk beranda (`size="lg"`).
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  breadcrumb,
  children,
  size = 'md',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: { src: string; alt: string };
  breadcrumb?: ReactNode;
  children?: ReactNode;
  size?: 'md' | 'lg';
}) {
  return (
    <section className="relative overflow-hidden bg-surface">
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradasi agar teks tetap terbaca: penuh di HP, dari kiri di layar lebar */}
          <div className="absolute inset-0 bg-bg/75 md:bg-transparent md:bg-gradient-to-r md:from-bg md:via-bg/80 md:to-bg/0" />
        </>
      )}
      <Container
        className={`relative flex flex-col justify-center py-20 ${
          size === 'lg' ? 'min-h-[calc(100svh-5rem)]' : 'min-h-[420px] md:min-h-[520px]'
        }`}
      >
        {breadcrumb && <div className="mb-6 text-xs text-muted">{breadcrumb}</div>}
        <div className="fade-up max-w-xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            className={`mt-4 font-serif leading-[1.05] ${size === 'lg' ? 'text-5xl md:text-7xl' : 'text-5xl md:text-6xl'}`}
          >
            {title}
          </h1>
          {intro && <div className="mt-6 max-w-md leading-relaxed text-muted">{intro}</div>}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  if (center) {
    return (
      <div className="text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-4xl leading-[1.1] md:text-5xl">
          {title}
        </h2>
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
