'use client';

// Animasi muncul saat di-scroll: elemen ber-atribut data-reveal tampil dengan fade + geser ke atas
// ketika masuk layar. Anak di dalam data-reveal-group muncul bergantian (stagger).
// Elemen yang terlewati karena scroll cepat / lompat lewat menu anchor juga langsung dimunculkan,
// jadi tidak ada konten yang tertinggal tersembunyi.
// Tanpa JavaScript / dengan gerakan minimal, semua konten langsung terlihat (lihat globals.css).
import { useEffect } from 'react';

// Elemen dianggap "masuk" saat bagian atasnya melewati 92% tinggi layar
const TRIGGER = 0.92;

export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('reveal-ready');

    const stagger = () =>
      document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
          el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`);
        });
      });

    // Munculkan semua elemen yang sudah masuk atau terlewati di atas layar
    let queued = false;
    const check = () => {
      queued = false;
      const limit = window.innerHeight * TRIGGER;
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add('is-visible');
      });
    };
    const schedule = () => {
      if (queued) return;
      queued = true;
      // setTimeout (bukan rAF) supaya tetap jalan meski browser memperlambat rendering
      window.setTimeout(check, 50);
    };

    stagger();
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Elemen yang muncul belakangan (mis. hasil filter koleksi) juga ikut dicek
    const mutations = new MutationObserver(() => {
      stagger();
      schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mutations.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
