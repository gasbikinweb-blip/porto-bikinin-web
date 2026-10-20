import { company } from '@/data/site';
import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';
import { InstagramIcon, ShopeeIcon, ThreadsIcon, TikTokIcon, WhatsAppIcon } from './icons';

const links = [
  { label: 'WhatsApp', href: buildWhatsAppLink(defaultQuoteMessage), Icon: WhatsAppIcon },
  { label: 'Instagram', href: company.instagram, Icon: InstagramIcon },
  { label: 'Threads', href: company.threads, Icon: ThreadsIcon },
  { label: 'TikTok', href: company.tiktok, Icon: TikTokIcon },
  { label: 'Shopee', href: company.shopee, Icon: ShopeeIcon },
];

/** Deretan ikon media sosial & toko. tone 'dark' untuk latar gelap (footer). */
export function SocialLinks({
  tone = 'light',
  withLabel = false,
}: {
  tone?: 'light' | 'dark';
  withLabel?: boolean;
}) {
  const style =
    tone === 'dark'
      ? 'border-white/20 text-white hover:border-gold hover:bg-gold hover:text-night'
      : 'border-line bg-white text-ink hover:border-brand hover:bg-brand hover:text-white';
  return (
    <ul className="flex flex-wrap gap-2.5">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={withLabel ? undefined : `${label} (tab baru)`}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border transition-colors ${withLabel ? 'px-4' : 'size-11 justify-center'} ${style}`}
          >
            <Icon className="size-5" />
            {withLabel && (
              <span className="text-sm font-semibold">
                {label} <span className="sr-only">(tab baru)</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
