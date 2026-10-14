import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
};

// Tombol WhatsApp standar; selalu membuka tab baru dengan rel aman
export function WhatsAppButton({
  message = generalMessage,
  children = 'Tanya via WhatsApp',
  variant = 'solid',
  className = '',
}: Props) {
  const styles =
    variant === 'solid'
      ? 'bg-foreground text-background hover:bg-accent'
      : 'border border-foreground/25 text-foreground hover:border-foreground';
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${styles} ${className}`}
    >
      <WhatsAppIcon className="size-4" />
      {children}
      <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
    </a>
  );
}
