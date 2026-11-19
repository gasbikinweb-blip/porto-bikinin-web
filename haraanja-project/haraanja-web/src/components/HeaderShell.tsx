'use client';

// Navbar selalu berlatar (supaya logo & menu jelas), bayangan muncul saat halaman di-scroll
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
      className="group/header sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur-md transition-shadow duration-500 data-[scrolled=true]:shadow-[0_10px_40px_-14px_rgb(0_0_0/0.25)]"
    >
      {children}
    </header>
  );
}
