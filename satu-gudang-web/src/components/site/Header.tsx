import Link from 'next/link';
import { homePath, otherLocale } from '@/content';
import type { SiteContent } from '@/content/types';
import { siteConfig } from '@/lib/config';
import { waLink } from '@/lib/whatsapp';
import { DesktopNav } from './DesktopNav';
import { HeaderShell } from './HeaderShell';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navItems } from './nav';
import { ThemeToggle } from './ThemeToggle';

export function Header({ content }: { content: SiteContent }) {
  const { common, nav, locale } = content;
  const items = navItems(nav);
  const cta = { href: waLink(content.wa.consultation), label: common.freeConsultation };
  // Tombol ganti bahasa hanya muncul bila ada bahasa lain yang aktif (lihat src/content/index.ts)
  const target = otherLocale(locale);
  const language = target
    ? { href: homePath(target), label: common.languageSwitch.label, hrefLang: target }
    : null;

  return (
    <HeaderShell>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={homePath(locale)} aria-label={`${siteConfig.name} — ${common.tagline}`}>
          <Logo name={siteConfig.name} priority />
        </Link>

        <DesktopNav items={items} label={common.mainMenu} />

        <div className="flex items-center gap-2">
          {language && (
            <a
              href={language.href}
              hrefLang={language.hrefLang}
              aria-label={language.label}
              className="grid size-11 place-items-center rounded-full border border-line text-xs font-extrabold tracking-wider transition-colors hover:border-accent"
            >
              {common.languageSwitch.target}
            </a>
          )}
          <ThemeToggle label={common.themeToggle} />
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-foreground hover:text-background sm:inline-flex"
          >
            {cta.label}
          </a>
          <MobileNav
            items={items}
            labels={{ open: common.openMenu, close: common.closeMenu, menu: common.mainMenu }}
            cta={cta}
            language={language}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
