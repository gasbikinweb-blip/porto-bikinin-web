import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { WaButton } from '@/components/ui/Button';
import { TimberArc } from '@/components/ui/TimberArc';
import type { SiteContent } from '@/content/types';
import { imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';

// Tentang kami: foto tim di lokasi + cerita singkat, fakta, dan nilai kerja
// TODO: ganti foto kedua dengan foto workshop/tim bila sudah ada
export function About({ content }: { content: SiteContent }) {
  const t = content.about;
  return (
    <section id={sectionIds.about} aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Komposisi dua foto: foto besar berujung lengkung + foto kecil menumpuk */}
        <div className="relative pb-16 sm:pb-24">
          <div className="reveal reveal-curtain parallax-soft relative aspect-[4/5] w-[85%] overflow-hidden rounded-t-[12rem] rounded-b-3xl">
            <Image
              src={imgSmall('/projects/spa-seminyak/07')}
              alt={t.secondImageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 85vw"
              className="object-cover"
            />
          </div>
          <div className="reveal reveal-zoom absolute right-0 bottom-0 aspect-[16/10] w-[62%] overflow-hidden rounded-3xl border-[6px] border-background shadow-[0_24px_50px_-20px_rgb(0_0_0/0.45)]">
            <Image
              src={imgSmall('/process/progress-kitchen')}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute top-6 right-[8%] size-6 rounded-full bg-accent sm:size-8"
          />
        </div>

        <div>
          <p className="reveal eyebrow">{t.eyebrow}</p>
          <h2
            id="about-title"
            className="reveal reveal-title mt-4 font-serif text-3xl leading-[1.08] font-medium text-balance sm:text-5xl"
          >
            {t.title}
          </h2>
          <TimberArc className="mt-5 max-w-56" />
          {t.paragraphs.map((p) => (
            <p
              key={p}
              className="reveal mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              {p}
            </p>
          ))}

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6" data-stagger>
            {t.facts.map((f) => (
              <div key={f.label} className="reveal">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-3xl text-accent-text sm:text-4xl">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{f.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-5" data-stagger>
            {t.values.map((v, i) => (
              <li key={v.title} className="reveal flex gap-4">
                <span className="font-serif text-sm text-accent-text">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-lg font-medium">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <WaButton href={waLink(content.wa.general)} variant="outline" className="reveal mt-10">
            {t.cta}
          </WaButton>
        </div>
      </div>
    </section>
  );
}
