import Link from 'next/link';
import { SocialIcons } from './icons';
import { Logo } from './Logo';
import { navItems } from './nav';
import { ExternalLink, WhatsAppButton } from './WhatsApp';
import { services } from '@/data/services';
import { defaultWaMessage, site } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/config';

export const socialLinks = [
  { href: site.social.instagram, label: 'Instagram' },
  { href: site.social.threads, label: 'Threads' },
  { href: site.social.youtube, label: 'YouTube' },
  { href: site.social.tiktok, label: 'TikTok' },
];

const colTitle = 'text-xs tracking-[0.2em] text-white/50 uppercase';
const colLink = 'text-white/80 hover:text-white';

export function Footer() {
  return (
    <footer className="mt-24 px-2 pb-2 md:mt-32 md:px-3 md:pb-3">
      {/* Siluet deretan atap rumah sebagai batas atas footer (dekoratif) */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="-mb-px block h-16 w-full text-ink md:h-28"
      >
        <path
          fill="currentColor"
          d="M0 140 L0 118 L0 118 L0 82 L44.5 53 L89 82 L89 118 L89 118 L91 118 L91 118 L91 58 L173 58 L173 118 L173 118 L174 118 L174 118 L174 64 L271 64 L271 118 L271 118 L284 118 L284 118 L284 77 L362 47 L362 118 L362 118 L364 118 L364 118 L364 48 L488 48 L488 118 L488 118 L491 118 L491 118 L491 90 L566.0 61 L641 90 L641 118 L641 118 L659 118 L659 118 L659 71 L719.0 36 L779 71 L779 118 L779 118 L780 118 L780 118 L780 61 L867 61 L867 118 L867 118 L871 118 L871 118 L871 74 L956 74 L956 118 L956 118 L973 118 L973 118 L973 73 L1019.5 39 L1038.1 52.6 L1038.1 34.6 L1050.1 34.6 L1050.1 61.4 L1066 73 L1066 118 L1066 118 L1077 118 L1077 118 L1077 92 L1147.0 62 L1217 92 L1217 118 L1217 118 L1235 118 L1235 118 L1235 76 L1309.5 33 L1384 76 L1384 118 L1384 118 L1401 118 L1401 118 L1401 84 L1440 54 L1440 118 L1440 118 L1440 140 Z"
        />
      </svg>
      <div className="overflow-hidden rounded-b-[1.75rem] bg-ink text-white md:rounded-b-[2.25rem]">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-white/10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-12 md:py-20">
          {/* TODO: konfirmasi apakah konsultasi memang gratis */}
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] font-light md:text-6xl">
            Punya rencana membangun atau <em>menata ulang ruang?</em>
          </h2>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton message={defaultWaMessage} variant="light">
              Konsultasi Gratis
            </WhatsAppButton>
            <WhatsAppButton
              variant="ghost"
              message="Halo Griya Nuansa, saya ingin minta penawaran untuk proyek saya."
            >
              Minta Penawaran
            </WhatsAppButton>
          </div>
        </div>

        <div className="grid gap-10 px-5 py-14 text-sm sm:grid-cols-2 md:px-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <span className="font-serif text-2xl">{site.name}</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">
              Studio arsitektur, desain interior, dan property management di {site.city}. Melayani
              area Jabodetabek.
            </p>
            <p className="mt-4 text-white/50">{site.hashtags.join(' ')}</p>
            <SocialIcons className="mt-6" />
          </div>
          <div>
            <h2 className={colTitle}>Menu</h2>
            <ul className="mt-4 space-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={colLink}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={colTitle}>Layanan</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/layanan/${s.slug}/`} className={colLink}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={colTitle}>Hubungi</h2>
            <ul className="mt-4 space-y-2">
              {site.whatsapp.map((w) => (
                <li key={w.number}>
                  <ExternalLink href={buildWhatsAppLink('', w.number)} className={colLink}>
                    WA {w.label}
                  </ExternalLink>
                </li>
              ))}
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <ExternalLink href={s.href} className={colLink}>
                    {s.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="px-5 text-xs text-white/50 md:px-12">
          © {new Date().getFullYear()} {site.name}. Seluruh foto adalah karya dan dokumentasi proyek{' '}
          {site.name}.
        </p>

        {/* Wordmark raksasa, dekoratif */}
        <p
          aria-hidden="true"
          className="mt-8 -mb-[0.18em] overflow-hidden font-serif text-[17vw] leading-none font-light whitespace-nowrap text-white/90 select-none"
        >
          Griya Nuansa <span className="text-amber">✱</span> Griya Nuansa
        </p>
      </div>
    </footer>
  );
}
