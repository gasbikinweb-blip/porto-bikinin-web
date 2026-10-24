import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'light';
  size?: 'md' | 'sm';
  className?: string;
};

const variants = {
  solid: 'bg-wood text-white hover:bg-wood-strong',
  outline: 'border border-wood/40 text-wood-strong hover:border-wood hover:bg-wood/5',
  light: 'bg-white text-foreground hover:bg-surface',
} as const;

// Tombol WhatsApp standar; selalu membuka tab baru dengan rel aman
export function WhatsAppButton({
  message = generalMessage,
  children = 'Pesan Custom via WhatsApp',
  variant = 'solid',
  size = 'md',
  className = '',
}: Props) {
  const sizing = size === 'md' ? 'min-h-12 px-6 text-base' : 'min-h-10 px-4 text-sm';
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${sizing} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className={size === 'md' ? 'size-5' : 'size-4'} />
      {children}
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  );
}
