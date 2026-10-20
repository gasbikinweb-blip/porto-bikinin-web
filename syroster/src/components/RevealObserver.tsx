'use client';

// Memunculkan elemen .reveal saat masuk layar. Elemen yang ditambahkan belakangan (mis. hasil filter)
// ikut dipantau lewat MutationObserver. Tanpa JavaScript / dengan reduced motion, kelas "reveal-ready"
// tidak dipasang sehingga konten tetap terlihat.
import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const scan = () => {
      // Anak dari [data-stagger] muncul bergiliran (maks. 6 langkah agar tidak terlalu lama)
      document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
        Array.from(parent.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty('--reveal-delay', `${(i % 6) * 90}ms`);
        });
      });
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    };

    scan();
    document.documentElement.classList.add('reveal-ready');

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
