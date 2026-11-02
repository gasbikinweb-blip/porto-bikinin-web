import { ExternalLink } from './WhatsApp';
import { site } from '@/data/site';
import type { Lang } from '@/i18n';

type IconProps = { className?: string };

export function ArrowUpRight({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M17 8.5C16 5.5 13.8 4 11.8 4 7.5 4 5 7.3 5 12s2.5 8 6.8 8c3.5 0 6.2-2 6.2-5 0-2.7-2.3-4.2-5.4-4.2-2.2 0-3.6 1.1-3.6 2.6 0 1.4 1.2 2.4 2.9 2.4 2.6 0 3.6-2.2 3.6-5.6" />
    </svg>
  );
}

export function YoutubeIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.6 2.3 4.3 5 4.5" />
    </svg>
  );
}

export function PinterestIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M11 9.5c.6-1.5 3.8-1.6 4.2.7.4 2.4-1.6 4.6-3.3 3.6M11.6 10.5 9.8 19" />
    </svg>
  );
}

const socials = [
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.social.threads, label: 'Threads', Icon: ThreadsIcon },
  { href: site.social.youtube, label: 'YouTube', Icon: YoutubeIcon },
  { href: site.social.tiktok, label: 'TikTok', Icon: TiktokIcon },
  { href: site.social.pinterest, label: 'Pinterest', Icon: PinterestIcon },
];

/** Deretan ikon media sosial bulat (dipakai di hero dan footer) */
export function SocialIcons({
  className = '',
  tone = 'light',
  lang = 'id',
}: {
  className?: string;
  tone?: 'light' | 'dark';
  lang?: Lang;
}) {
  const style =
    tone === 'light'
      ? 'border border-white/30 text-white hover:bg-white hover:text-neutral-900'
      : 'bg-surface text-fg hover:bg-fg hover:text-bg';
  return (
    <ul className={`flex gap-2 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <li key={label}>
          <ExternalLink
            lang={lang}
            href={href}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${style}`}
          >
            <Icon />
            <span className="sr-only">{label} Griya Nuansa</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
