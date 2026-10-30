'use client';

// Mengembalikan id section yang sedang dilihat (untuk menandai menu navbar yang aktif).
// Section aktif = section terakhir yang bagian atasnya sudah melewati ~35% tinggi layar.
// Di dasar halaman, section terakhir (Kontak) dipaksa aktif karena tidak bisa di-scroll lebih jauh.
import { useEffect, useState } from 'react';
import { navLinks } from './nav-links';

const ids = navLinks.map((l) => l.href.replace('/#', ''));

export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(atBottom ? (ids.at(-1) ?? current) : current);
    };

    // Dibatasi sekali per 100 ms (setTimeout, bukan rAF yang berhenti di tab latar)
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      setTimeout(update, 100);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
}
