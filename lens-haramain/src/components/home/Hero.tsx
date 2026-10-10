import type { Content } from '@/content/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from '../icons';
import { HeroReel } from './HeroReel';

// Lencana melingkar berputar di tepi bingkai video
function SealBadge() {
  return (
    <div aria-hidden="true" className="absolute -bottom-10 -left-10 hidden size-32 sm:block lg:-left-14 lg:size-36">
      <svg viewBox="0 0 120 120" className="animate-spin-slow size-full text-foreground">
        <defs>
          <path id="seal" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <circle cx="60" cy="60" r="59" className="fill-background" />
        <text className="fill-current text-[9.5px] tracking-[0.32em] uppercase">
          <textPath href="#seal">Lens Haramain · Photo &amp; Video · Makkah · Madinah ·</textPath>
        </text>
      </svg>
      <span className="logo-mark absolute inset-0 m-auto size-9 text-accent" />
    </div>
  );
}

export function Hero({ t }: { t: Content }) {
  const [a, b, c] = t.hero.title;
  return (
    <section className="relative isolate overflow-hidden">
      {/* Kaligrafi "Al-Haramain" samar sebagai latar */}
      <p
        aria-hidden="true"
        lang="ar"
        className="pointer-events-none absolute -top-10 right-[-6%] -z-10 font-arabic text-[38vw] leading-none text-foreground/[0.035] select-none lg:text-[26vw]"
      >
        الحرمين
      </p>

      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl items-center gap-14 px-4 pt-8 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pt-4">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-in flex items-center gap-3 text-accent">
            <span className="star8" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-7 font-serif text-[clamp(2.9rem,7.4vw,6.6rem)] leading-[0.95] font-light tracking-[-0.02em]">
            <span className="animate-in block" style={{ '--delay': '120ms' } as React.CSSProperties}>
              {a}
            </span>
            <span
              className="animate-in block pl-[8%] text-accent italic"
              style={{ '--delay': '240ms' } as React.CSSProperties}
            >
              {b}
            </span>
            <span className="animate-in block" style={{ '--delay': '360ms' } as React.CSSProperties}>
              {c}
            </span>
          </h1>
          <p
            className="animate-in mt-8 max-w-lg text-[1.05rem] leading-relaxed text-muted"
            style={{ '--delay': '520ms' } as React.CSSProperties}
          >
            {t.hero.lead}
          </p>
          <div
            className="animate-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ '--delay': '640ms' } as React.CSSProperties}
          >
            <a
              href={buildWhatsAppLink(t.wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground py-2 pr-6 pl-2 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              <span className="grid size-10 place-items-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-[360deg]">
                <WhatsAppIcon className="size-5" />
              </span>
              {t.hero.cta}
              <span className="sr-only">{t.wa.newTab}</span>
            </a>
            <a href="#cerita" className="group inline-flex items-center gap-3 text-sm font-medium">
              <span className="link-line pb-0.5">{t.hero.secondary}</span>
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none lg:pl-8">
          <figure className="relative">
            <div className="arch animate-arch relative aspect-[3/4.3] overflow-hidden bg-surface-2 shadow-[0_40px_80px_-30px_rgb(40_28_10/0.45)]">
              <HeroReel captions={t.hero.clips} />
            </div>
            {/* Garis lengkung tipis di luar bingkai, seperti lapisan mihrab */}
            <div aria-hidden="true" className="arch pointer-events-none absolute -inset-3 border border-accent/40" />
            <SealBadge />
            <figcaption className="mt-6 flex items-center justify-end gap-3 text-xs tracking-[0.2em] text-muted uppercase">
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              {t.hero.caption}
            </figcaption>
          </figure>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-[0.6rem] text-muted">{t.hero.scroll}</span>
        <span className="animate-scroll-line block h-10 w-px bg-foreground/50" />
      </div>
    </section>
  );
}
