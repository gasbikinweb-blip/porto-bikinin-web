'use client';

// Navbar transparan di atas, lalu muncul latar blur saat halaman di-scroll
import { useEffect, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`group/header sticky top-0 z-30 border-b border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/85 data-[scrolled=true]:shadow-[0_10px_30px_-12px_rgb(0_0_0/0.18)] data-[scrolled=true]:backdrop-blur-md`}
    >
      {children}
    </header>
  );
}
