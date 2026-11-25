'use client';

// Menentukan link navbar yang aktif: di beranda mengikuti section yang sedang terlihat
// (mis. /#layanan, /#cara-pesan), di halaman lain mengikuti pathname.
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from './nav-links';

const sectionIds = navLinks.flatMap((l) => (l.href.startsWith('/#') ? [l.href.slice(2)] : []));

export function useActiveNav(): string {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') return;
    const els = sectionIds.flatMap((id) => {
      const el = document.getElementById(id);
      const box = el?.closest('section') ?? el;
      return box ? [{ id, box }] : [];
    });
    const onScroll = () => {
      // Section aktif = section terakhir yang bagian atasnya sudah melewati 40% tinggi layar
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { id, box } of els) {
        const r = box.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname === '/') return section ? `/#${section}` : '/';
  const match = navLinks.find((l) => l.href !== '/' && pathname.startsWith(l.href));
  return match?.href ?? pathname;
}
