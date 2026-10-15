'use client';

// Navbar: muncul garis & bayangan tipis saat halaman di-scroll
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
      className="sticky top-0 z-30 border-b border-transparent bg-background/90 backdrop-blur-md transition-[border-color,box-shadow] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:shadow-[0_8px_30px_-12px_rgb(47_38_32/0.18)]"
    >
      {children}
    </header>
  );
}
