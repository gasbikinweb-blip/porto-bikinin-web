'use client';

// Navbar transparan di atas foto hero (teks terang), lalu latar solid + blur saat di-scroll
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
      className={`${scrolled ? '' : 'theme-dark'} fixed inset-x-0 top-0 z-30 border-b border-transparent text-foreground transition-[background-color,border-color,box-shadow] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/90 data-[scrolled=true]:shadow-[0_10px_40px_-14px_rgb(0_0_0/0.3)] data-[scrolled=true]:backdrop-blur-md`}
    >
      {children}
    </header>
  );
}
