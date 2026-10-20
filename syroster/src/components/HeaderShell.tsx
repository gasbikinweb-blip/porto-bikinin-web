'use client';

// Header putih yang menempel di atas; garis bawah & bayangan muncul setelah halaman di-scroll
import { useEffect, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-30 border-b border-transparent bg-surface/95 backdrop-blur transition-[border-color,box-shadow,background-color] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-white/95 data-[scrolled=true]:shadow-[0_8px_30px_-18px_rgb(28_33_80/0.3)]"
    >
      {children}
    </header>
  );
}
