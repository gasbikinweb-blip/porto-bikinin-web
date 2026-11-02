import { basePath, type Lang, lp } from '@/i18n';
import { ui } from '@/i18n/ui';

const items = [
  { href: '/', key: 'home' },
  { href: '/proyek/', key: 'projects' },
  { href: '/layanan/', key: 'services' },
  { href: '/tentang/', key: 'about' },
  { href: '/media-sosial/', key: 'social' },
  { href: '/faq/', key: 'faq' },
  { href: '/kontak/', key: 'contact' },
] as const;

/** Menu utama dalam bahasa aktif (href sudah diberi awalan /en bila perlu) */
export function navItems(lang: Lang) {
  return items.map((i) => ({ base: i.href, href: lp(lang, i.href), label: ui[lang].nav[i.key] }));
}

/** Menu aktif: Beranda hanya di "/", lainnya juga untuk sub-halaman (mis. /proyek/aa-house/) */
export function isActive(pathname: string, href: string) {
  const path = basePath(pathname);
  if (href === '/') return path === '/';
  return path.startsWith(href) || path === href.replace(/\/$/, '');
}
