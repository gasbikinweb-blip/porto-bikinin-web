import Image from 'next/image';
import type { Content } from '@/content/types';
import { photo } from '@/data/media';

// Testimoni klien. Selama content.testimonials.sample = true (teks masih contoh),
// section ini HANYA tampil di `npm run dev` dan tidak ikut ke website live.
export function Testimonials({ t }: { t: Content }) {
  const data = t.testimonials;
  if (data.sample && process.env.NODE_ENV === 'production') return null;

  const [featured, ...rest] = data.items;
  if (!featured) return null;
  const cover = photo(featured.story, 0);

  return (
    <section aria-labelledby="testimoni-judul" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
      {data.sample && (
        <p className="mb-10 inline-block rounded-full border border-dashed border-accent px-4 py-1.5 text-xs font-medium text-accent">
          {data.sampleNote}
        </p>
      )}

      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="arch reveal reveal-curtain relative mx-auto aspect-[3/4] max-w-xs overflow-hidden bg-surface-2 lg:max-w-none">
            <Image src={cover.src} alt={cover.alt[t.lang]} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
          </div>
        </div>

        <figure className="lg:col-span-8">
          <p className="eyebrow reveal text-accent">{data.label}</p>
          <h2 id="testimoni-judul" className="sr-only">
            {data.title}
          </h2>
          <span aria-hidden="true" className="reveal mt-6 block font-serif text-8xl leading-[0.5] text-accent">
            “
          </span>
          <blockquote className="reveal reveal-blur font-serif text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.18] font-light">
            {featured.quote}
          </blockquote>
          <figcaption className="reveal mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-accent" aria-hidden="true" />
            <span>
              <span className="block font-medium">{featured.name}</span>
              <span className="block text-sm text-muted">{featured.detail}</span>
            </span>
          </figcaption>
        </figure>
      </div>

      <ul className="mt-20 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {rest.map((item) => {
          const thumb = photo(item.story, 0);
          return (
            <li key={item.quote} className="reveal flex flex-col bg-background p-7">
              <span className="flex gap-1 text-accent" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="star8 text-[0.6rem]" />
                ))}
              </span>
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug">“{item.quote}”</blockquote>
              <div className="mt-7 flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-surface-2">
                  <Image src={thumb.src} alt="" fill sizes="44px" className="object-cover" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{item.name}</span>
                  <span className="block text-muted">{item.detail}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
