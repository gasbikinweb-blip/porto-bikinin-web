// Komponen tampilan kecil yang dipakai banyak halaman (server component)
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6';

type WaProps = {
  message: string;
  label?: string;
  variant?: 'solid' | 'outline';
  className?: string;
};

// Tombol WhatsApp utama; semua link lewat buildWhatsAppLink
export function WhatsAppButton({
  message,
  label = 'Konsultasi & Minta Penawaran',
  variant = 'solid',
  className = '',
}: WaProps) {
  const style =
    variant === 'solid'
      ? 'bg-plum text-background hover:bg-plum-strong'
      : 'border border-plum text-plum hover:bg-plum hover:text-background';
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${style} ${className}`}
    >
      <WhatsAppIcon />
      {label}
      <span className="sr-only">(membuka WhatsApp di tab baru)</span>
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="reveal mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-plum uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="font-serif text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </div>
  );
}
