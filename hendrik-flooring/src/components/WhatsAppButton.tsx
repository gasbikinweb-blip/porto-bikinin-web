import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'light';
  size?: 'md' | 'lg';
  className?: string;
};

const variants = {
  solid: 'bg-wa text-white hover:bg-wa-strong',
  outline: 'border border-wa text-wa-strong hover:bg-wa hover:text-white',
  light: 'bg-white text-wa-strong hover:bg-mint',
};

/** Tombol menuju WhatsApp. Semua link WA di situs lewat buildWhatsAppLink. */
export function WhatsAppButton({
  message = defaultMessage,
  children = 'Minta Survei & Penawaran',
  variant = 'solid',
  size = 'md',
  className = '',
}: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${size === 'lg' ? 'min-h-14 px-7 text-lg' : 'min-h-11 px-5'} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon />
      <span>{children}</span>
      <span className="sr-only">(membuka WhatsApp di tab baru)</span>
    </a>
  );
}
