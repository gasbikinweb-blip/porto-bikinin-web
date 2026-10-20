import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'light';
  className?: string;
};

const styles = {
  primary: 'bg-wa text-white hover:bg-wa-dark',
  outline: 'border-2 border-brand text-brand hover:bg-brand hover:text-white',
  light: 'bg-white text-night hover:bg-gold-soft',
};

/** Tombol WhatsApp. Link eksternal selalu memakai target _blank + rel noopener noreferrer. */
export function WaButton({
  message = defaultQuoteMessage,
  children = 'Minta Penawaran',
  variant = 'primary',
  className = '',
}: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      <WhatsAppIcon />
      <span>{children}</span>
      <span className="sr-only">(membuka WhatsApp di tab baru)</span>
    </a>
  );
}
