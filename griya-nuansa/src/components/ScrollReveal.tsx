'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/*
 * Animasi "muncul saat di-scroll" untuk semua halaman, tanpa perlu menandai elemen satu per satu.
 * - Target otomatis: judul, paragraf, kartu/foto, item daftar, FAQ, dan figur di dalam <main>,
 *   kecuali bagian paling atas (hero / PageHeader) yang sudah punya animasi sendiri.
 * - Elemen yang induknya sudah jadi target dilewati agar tidak beranimasi dobel.
 * - Item bersebelahan muncul bergiliran (stagger).
 * - Elemen yang baru masuk ke halaman belakangan (isi halaman yang dimuat bertahap setelah pindah
 *   menu, hasil filter proyek) ikut ditandai lewat MutationObserver.
 * - Tanpa JavaScript atau dengan "kurangi animasi", semua konten tetap terlihat normal.
 */
const TARGETS = [
  // Blok yang dianimasikan utuh (isinya dilewati), mis. carousel yang kartunya di luar layar ke samping
  '[data-reveal-block]',
  'h2',
  'h3',
  'p',
  'dl',
  'figure',
  'details',
  'ul > li',
  'ol > li',
  '.rounded-md',
].join(',');

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.getElementById('konten');
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('rv-in');
          observer.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    // Pindai isi <main> dan tandai target yang belum ditandai (aman dipanggil berulang)
    const scan = () => {
      // Hero/PageHeader selalu berupa <section> pertama; halaman detail proyek dibungkus <article>
      const first = main.firstElementChild;
      const hero = first?.tagName === 'SECTION' ? first : null;

      const all = Array.from(main.querySelectorAll<HTMLElement>(TARGETS)).filter(
        (el) =>
          !hero?.contains(el) &&
          !el.closest('[data-no-reveal]') &&
          !el.classList.contains('sr-only'),
      );
      const set = new Set(all);
      for (const el of all) {
        if (el.classList.contains('rv')) continue;
        // Ambil elemen terluar saja: lewati yang punya leluhur yang juga target
        let nested = false;
        for (let p = el.parentElement; p && p !== main; p = p.parentElement) {
          if (set.has(p)) {
            nested = true;
            break;
          }
        }
        if (nested) continue;
        // Item daftar bergiliran berdasarkan urutannya
        const li =
          el.tagName === 'LI' ? Array.from(el.parentElement?.children ?? []).indexOf(el) : 0;
        el.style.setProperty('--rv-delay', `${(li % 6) * 90}ms`);
        el.classList.add('rv');
        observer.observe(el);
      }
    };

    scan();
    document.documentElement.classList.add('rv-ready');

    // Isi baru yang masuk belakangan: pindai ulang sekali setelah perubahan DOM mereda
    let timer: number | undefined;
    const mutations = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 30);
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
