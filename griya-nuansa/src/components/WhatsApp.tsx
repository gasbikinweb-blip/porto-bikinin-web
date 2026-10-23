import type { ReactNode } from 'react';
import { buildWhatsAppLink } from '@/lib/config';

type Variant = 'solid' | 'outline' | 'light' | 'ghost';

const styles: Record<Variant, string> = {
  solid: 'bg-fg text-bg hover:opacity-85',
  outline: 'border border-fg/40 text-fg hover:border-fg hover:bg-fg hover:text-bg',
  light: 'bg-white/95 text-neutral-900 hover:bg-white',
  ghost: 'border border-white/40 text-white hover:border-white hover:bg-white/10',
};

export const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm tracking-wide transition-colors duration-300';

export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 21.8h0a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.7 9.7 0 0 1 2.9 7c0 5.4-4.4 9.8-9.9 9.8m8.4-18.2A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7a11.9 11.9 0 0 0 5.7 1.4c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4" />
    </svg>
  );
}

/** Tombol/link WhatsApp. Selalu membuka tab baru dengan rel aman. */
export function WhatsAppButton({
  message,
  number,
  children,
  variant = 'solid',
  className = '',
}: {
  message: string;
  number?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink(message, number)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} ${styles[variant]} ${className}`}
    >
      <WhatsAppIcon />
      {children}
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (tab baru)</span>
    </a>
  );
}
