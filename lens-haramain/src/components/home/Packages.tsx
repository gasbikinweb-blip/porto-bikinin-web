import type { Content } from '@/content/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

export function Packages({ t }: { t: Content }) {
  const p = t.packages;
  return (
    <section id="paket" aria-labelledby="paket-judul" className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow reveal text-accent">{p.label}</p>
          <h2 id="paket-judul" className="reveal mt-6 font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-light">
            {p.title}
          </h2>
          <p className="reveal mt-6 leading-relaxed text-muted">{p.intro}</p>
        </div>

        <ul className="mt-20 grid items-stretch gap-6 md:grid-cols-3" data-stagger>
          {p.items.map((pkg) => (
            <li
              key={pkg.name}
              className={`reveal arch relative flex flex-col border px-7 pt-20 pb-8 sm:px-9 ${
                pkg.featured
                  ? 'theme-dark border-accent/50 bg-background md:-translate-y-6'
                  : 'border-line bg-page/60'
              }`}
            >
              {pkg.featured && (
                <span className="eyebrow absolute top-6 left-1/2 -translate-x-1/2 text-[0.6rem] whitespace-nowrap text-accent">
                  {p.popular}
                </span>
              )}
              <p lang="ar" aria-hidden="true" className="text-center font-arabic text-5xl text-accent">
                {pkg.arabic}
              </p>
              <h3 className="mt-6 text-center font-serif text-4xl">{pkg.name}</h3>
              <p className="mt-1 text-center font-serif text-lg text-muted italic">{pkg.meaning}</p>
              <p className="mt-6 border-y border-line py-4 text-center text-sm">{pkg.audience}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="star8 mt-1.5 shrink-0 text-[0.6rem] text-accent" aria-hidden="true" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center font-serif text-xl italic">{p.price}</p>
              <a
                href={buildWhatsAppLink(p.message.replace('{package}', pkg.name))}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                  pkg.featured
                    ? 'bg-accent text-background hover:bg-accent-strong'
                    : 'border border-foreground/25 hover:border-foreground hover:bg-foreground hover:text-background'
                }`}
              >
                <WhatsAppIcon className="size-4" />
                {p.cta}
                <span className="sr-only">
                  {pkg.name} {t.wa.newTab}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="reveal mx-auto mt-14 max-w-xl text-center font-serif text-xl leading-snug italic">{p.custom}</p>
      </div>
    </section>
  );
}
