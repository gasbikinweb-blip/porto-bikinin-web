'use client';

// Navbar transparan di atas, lalu muncul latar blur saat halaman di-scroll.
// Garis emas tipis di bawahnya menunjukkan seberapa jauh halaman sudah dibaca.
import { useEffect, useRef, useState } from 'react';

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
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
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-500 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
      <span
        ref={bar}
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
