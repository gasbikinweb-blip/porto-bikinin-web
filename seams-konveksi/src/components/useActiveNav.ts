'use client';

// Menu navbar yang aktif mengikuti section yang sedang berada di tengah layar
// (atribut data-nav="#id" pada <section> di beranda).
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useActiveNav(): string | null {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-nav]');
    // Garis deteksi tipis di tengah layar: section yang melewatinya menjadi aktif
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.getAttribute('data-nav') || null);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return pathname === '/' ? section : null;
}

/** Cocokkan href menu (mis. "/#faq") dengan section aktif (mis. "#faq") */
export const isActive = (href: string, active: string | null) =>
  active !== null && href.endsWith(active);
