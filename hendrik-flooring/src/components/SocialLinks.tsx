// Link media sosial (link keluar biasa, tanpa embed atau script pihak ketiga)
import { siteConfig } from '@/lib/config';

type Name = (typeof siteConfig.socials)[number]['name'];

// Ikon sederhana buatan sendiri (bukan logo resmi)
const icons: Record<Name, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  TikTok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" />,
  Facebook: (
    <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.6l.4-3.5h-3V9a1 1 0 0 1 1-1Z" />
  ),
  Shopee: (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1M10 15.5c.5.7 1.2 1 2 1 1.1 0 2-.6 2-1.5 0-2-4-1-4-3 0-.8.8-1.5 2-1.5.8 0 1.4.3 1.8.8" />
    </>
  ),
};

export function SocialLinks({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {siteConfig.socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 items-center gap-2.5 rounded-full border px-4 font-semibold transition-colors ${tone === 'dark' ? 'border-white/30 text-white hover:bg-white/10' : 'border-line bg-background hover:border-accent hover:text-accent-strong'}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-5"
            >
              {icons[s.name]}
            </svg>
            {s.name}
            <span className="sr-only"> {s.handle} (tab baru)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
