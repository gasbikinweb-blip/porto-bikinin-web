'use client';

// Link navbar yang tahu section mana yang sedang dilihat (scrollspy):
// garis bawah emas tetap muncul pada section aktif, bukan hanya saat hover.
import { useEffect, useState } from 'react';

type Link = { href: string; label: string };

export function NavLinks({ links, label }: { links: Link[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    let frame = 0;
    const update = () => {
      frame = 0;
      // Section aktif = section terakhir yang bagian atasnya sudah melewati 40% tinggi layar
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line && el.getBoundingClientRect().bottom > line) current = id;
      }
      setActive(current);
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
  }, [links]);

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-6 text-[0.75rem] tracking-[0.12em] whitespace-nowrap uppercase xl:gap-9 xl:text-[0.8rem] xl:tracking-[0.14em]">
        {links.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative flex items-center gap-2 pb-1 transition-colors duration-300 ${
                  isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                } group`}
              >
                {/* Bintang kecil muncul di depan link aktif */}
                <span
                  aria-hidden="true"
                  className={`star8 text-[0.5rem] text-accent transition-all duration-500 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 -bottom-0.5 left-0 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
