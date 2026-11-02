'use client';

// Animasi muncul saat digulir untuk semua elemen .reveal (termasuk kartu yang ditambah belakangan).
// Tidak merender apa pun; CSS-nya di globals.css dan menghormati prefers-reduced-motion.
import { useEffect } from 'react';

export function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const watch = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)').forEach((el) => {
        // Jeda bergiliran untuk elemen bersebelahan (mis. kartu dalam grid) bila belum diatur manual
        if (!el.style.getPropertyValue('--delay') && el.parentElement) {
          const i = [...el.parentElement.children].indexOf(el) % 4;
          el.style.setProperty('--delay', `${i * 120}ms`);
        }
        io.observe(el);
      });
    };
    watch();
    // Kartu produk baru ("Tampilkan lebih banyak", ganti filter)
    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById('konten') ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
