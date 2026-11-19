'use client';

// Scrollspy: mengembalikan id section yang sedang dibaca (untuk menandai menu navbar aktif)
import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [id, setId] = useState('');
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur = '';
      for (const s of document.querySelectorAll<HTMLElement>('main section[id]')) {
        if (s.getBoundingClientRect().top <= line) cur = s.id;
      }
      // Sudah mentok bawah: aktifkan section terakhir
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        cur = document.querySelector<HTMLElement>('main section[id]:last-of-type')?.id ?? cur;
      }
      setId(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return id;
}
