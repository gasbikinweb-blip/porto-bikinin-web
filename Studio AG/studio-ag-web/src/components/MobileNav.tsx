'use client';

// Menu mobile memakai <dialog> + showModal (fokus terkunci & Esc otomatis dari browser)
import { useRef } from 'react';
import { navLinks } from './nav-links';
import { useActiveSection } from './useActiveSection';

export function MobileNav() {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  const active = useActiveSection();

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="grid size-11 place-items-center rounded-full border border-line md:hidden"
        aria-label="Buka menu"
        aria-haspopup="dialog"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M4 8h16M4 16h16" strokeLinecap="round" />
        </svg>
      </button>
      <dialog
        ref={ref}
        aria-label="Menu navigasi"
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] bg-background p-6 text-foreground"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={close}
            className="grid size-11 place-items-center rounded-full border border-line"
            aria-label="Tutup menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Navigasi mobile">
          <ul className="mt-8 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  aria-current={l.href === `/#${active}` ? 'location' : undefined}
                  className="block py-3 font-serif text-3xl aria-[current]:text-accent-ink aria-[current]:italic"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
