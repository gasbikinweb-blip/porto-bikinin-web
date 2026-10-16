// Komponen tampilan kecil yang dipakai banyak halaman (server component)
import Link from 'next/link';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';

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

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-plum underline-offset-4 hover:underline"
    >
      {children}
      <ArrowIcon />
    </Link>
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

// Judul halaman dalam (satu h1 per halaman)
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className={`${container} py-14 sm:py-20`}>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-plum uppercase">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-muted">{intro}</p>
      </div>
    </section>
  );
}

// Label kecil untuk foto yang bukan hasil produksi nyata
export function IllustrationBadge() {
  return (
    <span className="absolute top-2 left-2 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground">
      Ilustrasi
    </span>
  );
}

// Ajakan konsultasi di bagian bawah halaman
export function CtaBand({ message, title }: { message: string; title?: string }) {
  return (
    <section className="bg-plum text-background">
      <div
        className={`${container} flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between`}
      >
        <div>
          <h2 className="font-serif text-3xl">{title ?? 'Siap mulai produksi koleksi Anda?'}</h2>
          <p className="mt-2 text-background/85">
            Ceritakan desain dan jumlahnya, kami bantu hitungkan penawarannya.
          </p>
        </div>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-plum hover:bg-surface"
        >
          <WhatsAppIcon />
          Konsultasi via WhatsApp
          <span className="sr-only">(membuka tab baru)</span>
        </a>
      </div>
    </section>
  );
}
