import Link from 'next/link';
import { ArrowIcon, WhatsAppIcon } from './icons';

// Gaya tombol bersama. Tombol oranye memakai teks gelap (kontras 6.3:1), bukan putih.
const base =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98]';
const variants = {
  primary: 'bg-accent text-on-accent hover:bg-foreground hover:text-background',
  outline: 'border border-current/30 text-foreground hover:border-accent hover:text-accent-text',
  ghost: 'text-foreground underline-offset-4 hover:text-accent-text hover:underline px-0',
} as const;

type Variant = keyof typeof variants;

/** Tombol ke WhatsApp (link eksternal, href dibuat di server lewat waLink) */
export function WaButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

/** Tombol ke anchor/halaman internal */
export function LinkButton({
  href,
  children,
  variant = 'outline',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
