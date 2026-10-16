'use client';

// Navbar sticky: transparan di posisi paling atas, latar & garis muncul setelah halaman di-scroll
import { useEffect, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/90 data-[scrolled=true]:shadow-[0_8px_30px_-12px_rgb(46_38_41/0.25)] data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
