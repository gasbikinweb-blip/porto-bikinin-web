import type { SiteContent } from '@/content/types';

// Anchor section di beranda (id elemen <section>)
export const sectionIds = {
  about: 'about',
  design: 'design',
  services: 'services',
  work: 'projects',
  packages: 'bedroom-packages',
  materials: 'materials',
  process: 'process',
  faq: 'faq',
  contact: 'contact',
} as const;

export type NavItem = { href: string; label: string };

/** Menu utama; hanya string yang dikirim ke komponen client */
export function navItems(nav: SiteContent['nav']): NavItem[] {
  return [
    { href: `#${sectionIds.about}`, label: nav.about },
    { href: `#${sectionIds.services}`, label: nav.services },
    { href: `#${sectionIds.design}`, label: nav.design },
    { href: `#${sectionIds.work}`, label: nav.work },
    { href: `#${sectionIds.packages}`, label: nav.packages },
    { href: `#${sectionIds.process}`, label: nav.process },
    { href: `#${sectionIds.faq}`, label: nav.faq },
  ];
}
