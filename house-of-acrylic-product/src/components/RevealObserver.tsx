'use client';

import { useEffect } from 'react';

// Elemen yang otomatis dianimasikan saat masuk layar (hero dikecualikan karena sudah punya animasi sendiri)
const SELECTOR = [
  'main section:not(#beranda) h2',
  'main section:not(#beranda) h2 + p',
  // Track carousel horizontal dianimasikan utuh: kartu yang tergeser ke samping tidak pernah "terlihat" observer
  'main section:not(#beranda) :is(ul:not(#daftar-layanan), ol, dl) > :is(li, div)',
  'main #daftar-layanan',
  'main section:not(#beranda) :is(figure, details, form)',
  'main section:not(#beranda) [data-reveal]',
].join(',');

// Varian arah berdasarkan posisi agar terasa hidup: kiri/kanan bergantian untuk kolom grid
function variantFor(el: Element, index: number): string {
  if (el.tagName === 'H2') return 'reveal-left';
  if (el.tagName === 'FIGURE') return 'reveal-zoom';
  return index % 2 === 0 ? 'reveal-up' : 'reveal-up-alt';
}

/**
 * Animasi saat scroll tanpa library: IntersectionObserver menambah kelas .is-visible.
 * Kelas .reveal-ready di <html> hanya dipasang bila JS aktif, jadi konten tetap tampil tanpa JS.
 * Pengguna dengan prefers-reduced-motion tidak mendapat animasi.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    els.forEach((el) => {
      // Jeda bergiliran antar saudara (maks. 6 langkah) untuk efek stagger
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
      const i = Math.max(0, siblings.indexOf(el));
      el.classList.add('reveal', variantFor(el, i));
      el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 80}ms`);
    });
    document.documentElement.classList.add('reveal-ready');

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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
