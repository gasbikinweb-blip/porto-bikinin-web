'use client';

// Navbar transparan di atas hero, lalu berubah menjadi bilah solid + blur + bayangan saat di-scroll.
// Juga menampilkan garis progres baca di bagian bawah navbar.
import { useEffect, useRef, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current)
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };
    const onScroll = () => {
      // Status navbar langsung diperbarui; progres bar cukup per frame
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 12);
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* Pengganti ruang navbar fixed agar konten tidak tertutup */}
      <div aria-hidden="true" className="h-16 shrink-0 sm:h-20" />
      <header
        data-scrolled={scrolled}
        className={`site-header group/header fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-500`}
      >
        {children}
        <span
          ref={bar}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-strong via-teak to-accent-strong opacity-0 transition-opacity duration-500 group-data-[scrolled=true]/header:opacity-100"
        />
      </header>
    </>
  );
}
