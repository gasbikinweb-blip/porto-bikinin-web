export const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/proyek/', label: 'Proyek' },
  { href: '/layanan/', label: 'Layanan' },
  { href: '/tentang/', label: 'Tentang' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/kontak/', label: 'Kontak' },
] as const;

/** Menu aktif: Beranda hanya di "/", lainnya juga untuk sub-halaman (mis. /proyek/aa-house/) */
export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href) || pathname === href.replace(/\/$/, '');
}
