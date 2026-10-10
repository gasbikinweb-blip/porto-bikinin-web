import type { Content } from '@/content/types';
import { Marquee } from '../Marquee';

export function Manifesto({ t }: { t: Content }) {
  return (
    <>
      <div className="border-y border-line py-5">
        <Marquee duration="55s">
          {t.places_marquee.map((place) => (
            <span key={place} className="flex items-center gap-8 pr-8 font-serif text-2xl italic sm:text-3xl">
              {place}
              <span className="star8 text-xs text-accent" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <section aria-labelledby="manifesto" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10">
        <h2 id="manifesto" className="eyebrow reveal text-center text-accent">
          {t.manifesto.label}
        </h2>
        <p className="reveal reveal-blur mt-10 text-center font-serif text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.15] font-light">
          {t.manifesto.before}{' '}
          <span className="text-accent italic">{t.manifesto.middle}</span>{' '}
          {t.manifesto.after}
        </p>
      </section>
    </>
  );
}
