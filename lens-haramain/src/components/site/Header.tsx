import Link from 'next/link';
import type { Content } from '@/content/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';
import { ThemeToggle } from '../ThemeToggle';
import { HeaderShell } from './HeaderShell';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

export function Header({ t }: { t: Content }) {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-10">
        <Link href={t.home} className="shrink-0">
          <Logo />
        </Link>

        <NavLinks links={t.nav} label={t.menu.label} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href={t.switchLang.href}
            hrefLang={t.lang === 'id' ? 'en' : 'id'}
            aria-label={t.switchLang.aria}
            className="grid h-9 min-w-9 place-items-center rounded-full border border-line px-2.5 sm:h-10 sm:min-w-10 sm:px-3 text-xs font-medium tracking-[0.2em] transition-colors hover:border-accent hover:text-accent"
          >
            {t.switchLang.label}
          </Link>
          <ThemeToggle labels={t.theme} />
          <a
            href={buildWhatsAppLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 whitespace-nowrap text-[0.8rem] font-medium tracking-wide text-background transition-colors hover:bg-accent sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            {t.navCta}
            <span className="sr-only">{t.wa.newTab}</span>
          </a>
          <MobileNav t={{ nav: t.nav, menu: t.menu, wa: t.wa, navCta: t.navCta }} />
        </div>
      </div>
    </HeaderShell>
  );
}
