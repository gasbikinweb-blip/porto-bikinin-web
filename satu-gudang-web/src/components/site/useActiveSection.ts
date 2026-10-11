'use client';

// Scroll-spy: mengembalikan href section (#id) yang sedang berada di tengah layar
import { useEffect, useState } from 'react';

export function useActiveSection(hrefs: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.join('|');

  useEffect(() => {
    const sections = key
      .split('|')
      .map((h) => document.getElementById(h.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    // Section dianggap aktif saat melewati garis tengah layar
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    sections.forEach((s) => observer.observe(s));

    // Di atas section pertama (hero) tidak ada yang aktif
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [key]);

  return active;
}
