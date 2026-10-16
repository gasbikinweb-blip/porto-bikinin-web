import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Props = {
  message: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'dark';
  className?: string;
};

const styles = {
  primary: 'bg-accent text-ink hover:bg-accent-strong',
  outline: 'border border-current hover:bg-white/10',
  dark: 'bg-ink text-paper hover:bg-ink-3',
} as const;

// Tombol WhatsApp standar (membuka tab baru)
export function WaLink({ message, children, variant = 'primary', className = '' }: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      <WhatsAppIcon className="size-5" />
      {children}
      <span className="sr-only">(membuka WhatsApp di tab baru)</span>
    </a>
  );
}
