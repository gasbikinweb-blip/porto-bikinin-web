'use client';

// Memunculkan elemen .reveal saat masuk layar (IntersectionObserver, jalan di semua browser).
// Tanpa JavaScript / dengan reduced motion, kelas "reveal-ready" tidak dipasang sehingga konten tetap terlihat.
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Section yang belum diberi .reveal: blok-bloknya otomatis ikut muncul saat di-scroll
    const auto = (el: Element) => {
      if (el.closest('.reveal') || el.querySelector('.reveal') || el.matches('dialog, script'))
        return;
      el.classList.add('reveal');
    };
    document.querySelectorAll('main section, footer').forEach((section) => {
      const kids = Array.from(section.children);
      const box = kids.length === 1 && kids[0]!.children.length > 1 ? kids[0]! : section;
      Array.from(box.children).forEach((child) => {
        // Daftar/grid: tiap item muncul bergiliran
        if (child.matches('ul, ol, dl') && !child.querySelector('.reveal')) {
          child.setAttribute('data-stagger', '');
          Array.from(child.children).forEach(auto);
        } else auto(child);
      });
    });

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
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    const watch = () =>
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    watch();
    document.documentElement.classList.add('reveal-ready');

    // Elemen .reveal yang baru muncul (mis. setelah filter katalog) ikut diamati
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
