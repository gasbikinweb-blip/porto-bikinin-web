import { InstagramIcon, PinterestIcon, TiktokIcon, YoutubeIcon } from './icons';
import { ExternalLink } from './WhatsApp';
import { site } from '@/data/site';
import type { Lang } from '@/i18n';

// Kartu media sosial (YouTube, Instagram, TikTok, Pinterest) sesuai brief.
// Tautan keluar saja, tanpa embed/skrip pihak ketiga. Dipakai di Beranda dan halaman Media Sosial.
const copy = {
  id: {
    more: 'Lihat Selengkapnya',
    youtube: 'Video perjalanan proyek, dari konsep hingga serah terima.',
    instagram: 'Foto proyek terbaru dan inspirasi ruang.',
    tiktok: 'Cuplikan singkat proses dan hasil pengerjaan.',
    pinterest: 'Kumpulan inspirasi desain arsitektur dan interior.',
  },
  en: {
    more: 'See More',
    youtube: 'Project journey videos, from concept to handover.',
    instagram: 'Latest project photos and space inspiration.',
    tiktok: 'Short clips of our process and finished work.',
    pinterest: 'A collection of architecture and interior design inspiration.',
  },
};

export function SocialCards({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const items = [
    {
      name: 'YouTube',
      href: site.social.youtube,
      Icon: YoutubeIcon,
      text: c.youtube,
      handle: '@griyanuansaid',
    },
    {
      name: 'Instagram',
      href: site.social.instagram,
      Icon: InstagramIcon,
      text: c.instagram,
      handle: '@griyanuansa.id',
    },
    {
      name: 'TikTok',
      href: site.social.tiktok,
      Icon: TiktokIcon,
      text: c.tiktok,
      handle: '@griyanuansa.id',
    },
    {
      name: 'Pinterest',
      href: site.social.pinterest,
      Icon: PinterestIcon,
      text: c.pinterest,
      handle: 'griyanuansaid',
    },
  ];

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ name, href, Icon, text, handle }) => (
        <li key={name}>
          <ExternalLink
            lang={lang}
            href={href}
            className="group flex h-full flex-col rounded-md bg-surface p-6 transition-shadow hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg ring-1 ring-line">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-5 font-serif text-2xl">{name}</span>
            <span className="mt-1 text-xs tracking-wider text-muted">{handle}</span>
            <span className="mt-3 flex-1 text-sm leading-relaxed font-light text-muted">
              {text}
            </span>
            <span className="mt-6 text-[11px] font-medium tracking-[0.18em] uppercase group-hover:underline group-hover:underline-offset-4">
              {c.more} ↗
            </span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
