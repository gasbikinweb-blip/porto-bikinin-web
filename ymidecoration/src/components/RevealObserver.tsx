'use client';

// Memunculkan elemen .reveal saat masuk layar (IntersectionObserver, jalan di semua browser).
// Tanpa JavaScript / dengan reduced motion, kelas "reveal-ready" tidak dipasang sehingga konten tetap terlihat.
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Anak dari [data-stagger] muncul bergiliran
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty('--reveal-delay', `${i * 110}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Di dalam carousel geser, kartu di luar layar ikut dimunculkan bersama kartu pertama
          const parent = entry.target.parentElement;
          const group = parent?.classList.contains('overflow-x-auto')
            ? Array.from(parent.children)
            : [entry.target];
          for (const el of group) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
      observer.observe(el);
    });
    document.documentElement.classList.add('reveal-ready');

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
