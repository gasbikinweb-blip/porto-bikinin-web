'use client';

// Efek scroll: (1) elemen [data-reveal] muncul saat masuk layar, (2) menu navbar menyala
// sesuai section yang sedang dibaca, (3) garis progres baca di bawah navbar,
// (4) menu HP tertutup otomatis setelah link diklik.
// Tanpa JS / reduced motion: semua konten tetap tampil normal.
import { useEffect } from 'react';

const SECTIONS = ['varian', 'kenapa', 'cara-pesan', 'pesan', 'simpan', 'faq'];

export function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Reveal saat scroll
    let revealObs: IntersectionObserver | undefined;
    if (!reduce && 'IntersectionObserver' in window) {
      root.classList.add('reveal-ready');
      revealObs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              revealObs?.unobserve(e.target);
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
      );
      document.querySelectorAll('[data-reveal]').forEach((el) => revealObs?.observe(el));
    }

    // 2. Menu aktif: section yang melewati garis tengah layar
    const setActive = (id: string | null) => {
      document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]').forEach((a) => {
        if (a.getAttribute('href') === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    const spyObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObs.observe(el);
    });
    const hero = document.getElementById('beranda');
    const heroObs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setActive(null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    if (hero) heroObs.observe(hero);

    // 3. Garis progres baca
    const bar = document.getElementById('scroll-progress');
    const header = document.querySelector('header');
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      header?.setAttribute('data-scrolled', String(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 4. Tutup menu HP (<details>) setelah salah satu link diklik
    const closeMenu = (e: MouseEvent) => {
      const a = (e.target as Element).closest('[data-nav] a');
      const menu = a?.closest('details');
      if (menu) menu.open = false;
    };
    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
      revealObs?.disconnect();
      spyObs.disconnect();
      heroObs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
