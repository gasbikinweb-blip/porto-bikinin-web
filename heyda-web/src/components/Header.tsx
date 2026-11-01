import { navLinks } from '@/data/site';
import { Logo } from './Logo';

// Navbar sticky. Menu HP memakai <details> sehingga tidak perlu JavaScript.
export function Header() {
  return (
    // Sticky: menempel di atas saat di-scroll; data-scrolled (dari ScrollEffects) menambah bayangan
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/85 backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-background/95 data-[scrolled=true]:shadow-[0_8px_30px_-12px_rgb(31_58_36/0.35)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a
          href="#beranda"
          className="flex min-h-11 items-center gap-2 font-serif text-xl"
          aria-label="Heyda, ke beranda"
        >
          <Logo />
          <span aria-hidden="true">heyda</span>
        </a>

        <nav aria-label="Menu utama" data-nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center rounded-full px-4 text-sm font-semibold hover:bg-surface-2 aria-[current=true]:bg-accent aria-[current=true]:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#pesan"
                className="ml-2 flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-bold text-white hover:bg-accent-strong"
              >
                Pesan Sekarang
              </a>
            </li>
          </ul>
        </nav>

        <details className="group relative md:hidden">
          <summary className="grid size-11 cursor-pointer place-items-center rounded-full border border-line">
            <span className="sr-only">Buka menu</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="group-open:hidden"
              />
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="hidden group-open:block"
              />
            </svg>
          </summary>
          <nav
            aria-label="Menu HP"
            data-nav
            className="absolute top-14 right-0 w-64 rounded-2xl border border-line bg-background p-2 shadow-xl"
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex min-h-11 items-center rounded-xl px-4 font-semibold hover:bg-surface-2 aria-[current=true]:bg-accent aria-[current=true]:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pesan"
                  className="mt-1 flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 font-bold text-white"
                >
                  Pesan Sekarang
                </a>
              </li>
            </ul>
          </nav>
        </details>
      </div>
      {/* Garis progres baca, diisi ScrollEffects */}
      <div
        aria-hidden="true"
        id="scroll-progress"
        style={{ transform: 'scaleX(0)' }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
      />
    </header>
  );
}
