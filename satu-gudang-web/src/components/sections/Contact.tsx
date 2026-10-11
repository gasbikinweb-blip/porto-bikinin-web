import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { WaButton } from '@/components/ui/Button';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { InstagramIcon, ThreadsIcon } from '@/components/ui/icons';
import { TimberArc } from '@/components/ui/TimberArc';
import type { SiteContent } from '@/content/types';
import { siteConfig } from '@/lib/config';
import { imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';

// CTA akhir: konsultasi gratis via WhatsApp
export function Contact({ content }: { content: SiteContent }) {
  const t = content.contact;
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="px-4 pb-20 sm:px-6 sm:pb-28"
    >
      <div className="theme-dark relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-line bg-surface lg:grid-cols-[1.2fr_1fr]">
        <div className="relative z-10 p-8 sm:p-14">
          <p className="reveal eyebrow">{t.eyebrow}</p>
          <h2
            id="contact-title"
            className="reveal reveal-title mt-4 font-serif text-4xl leading-[1.05] font-medium text-balance sm:text-6xl"
          >
            {t.title}
          </h2>
          <TimberArc className="mt-6 max-w-64" />
          <p className="reveal mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {t.lead}
          </p>

          <ol className="mt-8 space-y-3" data-stagger>
            {t.steps.map((s, i) => (
              <li key={s} className="reveal flex items-center gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line font-serif text-accent-text">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base">{s}</span>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10">
            <WaButton
              href={waLink(content.wa.consultation)}
              className="w-full sm:w-auto sm:px-8 sm:text-base"
            >
              {t.cta}
            </WaButton>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
                {t.whatsappLabel}
              </dt>
              <dd className="mt-2">
                <ExternalLink
                  href={waLink(content.wa.general)}
                  className="font-semibold hover:text-accent-text"
                >
                  {siteConfig.waDisplay}
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
                {t.socialLabel}
              </dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3">
                <ExternalLink
                  href={siteConfig.instagram}
                  aria-label={`Instagram ${siteConfig.socialHandle}`}
                  className="hover:text-accent-text"
                >
                  <InstagramIcon />
                </ExternalLink>
                <ExternalLink
                  href={siteConfig.threads}
                  aria-label={`Threads ${siteConfig.socialHandle}`}
                  className="hover:text-accent-text"
                >
                  <ThreadsIcon />
                </ExternalLink>
                <span className="font-semibold">{siteConfig.socialHandle}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
                {t.areaLabel}
              </dt>
              <dd className="mt-2 font-semibold">{t.area}</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden min-h-[28rem] lg:block">
          <Image
            src={imgSmall('/projects/spa-seminyak/04')}
            alt=""
            fill
            sizes="40vw"
            className="rounded-tl-[12rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
