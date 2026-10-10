import Image from 'next/image';
import type { Content } from '@/content/types';
import { stories } from '@/data/media';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

// Cerita per bab, mengalir ke bawah: info bab menempel di kiri, foto turun di kanan
export function Stories({ t }: { t: Content }) {
  return (
    <section id="cerita" aria-labelledby="cerita-judul" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12">
        <p className="eyebrow reveal flex items-center gap-3 text-accent lg:col-span-4">
          <span className="star8" aria-hidden="true" />
          {t.stories.label}
        </p>
        <div className="lg:col-span-8">
          <h2 id="cerita-judul" className="reveal font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[1] font-light">
            {t.stories.title}
          </h2>
          <p className="reveal mt-6 max-w-xl leading-relaxed text-muted">{t.stories.intro}</p>
        </div>
      </div>

      <div className="mt-20 space-y-28 lg:mt-28 lg:space-y-40">
        {stories.map((story, s) => {
          const text = t.stories.items[story.slug];
          return (
            <article key={story.slug} className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              {/* Info bab: menempel saat foto di kanan di-scroll */}
              <header className="lg:col-span-4">
                <div className="reveal lg:sticky lg:top-32">
                  <span className="block font-serif text-[clamp(5rem,9vw,8.5rem)] leading-[0.8] font-light text-accent/90">
                    {String(s + 1).padStart(2, '0')}
                  </span>
                  <p className="eyebrow mt-6 text-muted">
                    {text.place} · {story.photos.length} {t.stories.photos}
                  </p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{text.title}</h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-muted">{text.blurb}</p>
                  <a
                    href={buildWhatsAppLink(t.stories.askMessage.replace('{story}', text.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <WhatsAppIcon className="size-4 text-accent group-hover:text-background" />
                    {t.stories.ask}
                    <span className="sr-only">{t.wa.newTab}</span>
                  </a>
                </div>
              </header>

              {/* Foto dua kolom; kolom kanan sedikit turun agar ritmenya tidak kaku */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-8">
                {[0, 1].map((col) => (
                  <div key={col} className={`space-y-3 sm:space-y-5 ${col === 1 ? 'pt-16 sm:pt-28' : ''}`}>
                    {story.photos
                      .filter((_, i) => i % 2 === col)
                      .map((photo, i) => (
                        <figure
                          key={photo.src}
                          className={`reveal reveal-curtain relative overflow-hidden bg-surface-2 ${col === 0 && i === 0 ? 'arch' : ''}`}
                          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt[t.lang]}
                            fill
                            sizes="(min-width: 1024px) 30vw, 50vw"
                            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:scale-[1.05]"
                          />
                        </figure>
                      ))}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="reveal mt-28 flex flex-col items-center gap-8 border-t border-line pt-16 text-center">
        <p className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.05] font-light">{t.stories.endTitle}</p>
        <a
          href={buildWhatsAppLink(t.wa.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          <WhatsAppIcon className="size-5" />
          {t.navCta}
          <span className="sr-only">{t.wa.newTab}</span>
        </a>
      </div>
    </section>
  );
}
