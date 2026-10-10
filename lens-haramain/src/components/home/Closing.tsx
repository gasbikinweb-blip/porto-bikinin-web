import Image from 'next/image';
import type { Content } from '@/content/types';
import { photo as getPhoto } from '@/data/media';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

export function Closing({ t }: { t: Content }) {
  const photo = getPhoto('teduh-di-nabawi', 0);
  return (
    <section aria-labelledby="penutup-judul" className="theme-dark relative isolate overflow-hidden bg-background">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[50%_30%] opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/30 to-background/90" />
      <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6">
        <span className="logo-mark reveal size-12 text-accent" aria-hidden="true" />
        <h2
          id="penutup-judul"
          className="reveal mt-10 font-serif text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[1] font-light"
        >
          {t.closing.title[0]}
          <span className="block text-accent italic">{t.closing.title[1]}</span>
        </h2>
        <p className="reveal mt-8 max-w-md leading-relaxed text-foreground/80">{t.closing.body}</p>
        <a
          href={buildWhatsAppLink(t.wa.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-12 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          <WhatsAppIcon className="size-5" />
          {t.closing.cta}
          <span className="sr-only">{t.wa.newTab}</span>
        </a>
      </div>
    </section>
  );
}
