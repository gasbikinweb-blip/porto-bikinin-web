import { sectionIds } from '@/components/site/nav';
import { LinkButton, WaButton } from '@/components/ui/Button';
import type { SiteContent } from '@/content/types';
import { heroImages } from '@/data/hero';
import { imgLarge } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';
import { type HeroSlide, HeroSlideshow } from './HeroSlideshow';

// Hero: slideshow 3 gambar penuh layar, teks terang di atas gradasi gelap, tepi bawah melengkung
export function Hero({ content }: { content: SiteContent }) {
  const { hero, wa } = content;
  const slides: HeroSlide[] = heroImages.map((src, i) => ({
    src: imgLarge(src),
    alt: hero.slides[i]?.imageAlt ?? '',
    label: hero.slides[i]?.label ?? '',
    text: hero.slides[i]?.text ?? '',
  }));

  return (
    <section
      aria-labelledby="hero-title"
      className="theme-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pt-28 pb-24 sm:px-6 sm:pb-32">
        <HeroSlideshow
          slides={slides}
          labels={{ nav: hero.slideNav, pause: hero.pause, play: hero.play }}
          heading={
            <h1 id="hero-title" className="max-w-5xl">
              <span className="animate-in eyebrow">{hero.eyebrow}</span>
              <span
                className="animate-in mt-5 block font-serif text-[2.6rem] leading-[1.02] font-medium text-balance sm:text-7xl xl:text-[5.75rem]"
                style={{ '--delay': '120ms' } as React.CSSProperties}
              >
                {hero.title} <em className="text-accent-text">{hero.titleAccent}</em>
              </span>
            </h1>
          }
          actions={
            <div
              className="animate-in mt-6 flex flex-col gap-3 sm:flex-row"
              style={{ '--delay': '380ms' } as React.CSSProperties}
            >
              <WaButton href={waLink(wa.consultation)}>{hero.primaryCta}</WaButton>
              <LinkButton href={`#${sectionIds.work}`}>{hero.secondaryCta}</LinkButton>
            </div>
          }
          footer={
            <ol
              className="animate-in mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-line pt-5 text-xs font-semibold sm:text-sm"
              style={{ '--delay': '500ms' } as React.CSSProperties}
            >
              {hero.pillars.map((p, i) => (
                <li key={p} className="flex flex-col gap-1">
                  <span className="font-serif text-lg text-accent-text sm:text-xl">0{i + 1}</span>
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ol>
          }
        />
      </div>

      {/* Tepi bawah melengkung: gema plafon kayu melengkung proyek spa */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-12 w-full sm:h-20"
      >
        <path d="M0 90 V50 C 240 0, 420 0, 640 40 S 1080 90, 1440 20 V90 Z" fill="var(--page-bg)" />
        <path
          d="M0 50 C 240 0, 420 0, 640 40 S 1080 90, 1440 20"
          fill="none"
          stroke="var(--wood)"
          strokeWidth="2"
        />
      </svg>
    </section>
  );
}
