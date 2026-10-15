import Image from 'next/image';
import { flashSale } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Countdown } from './Countdown';
import { ArrowIcon } from './icons';

// Banner promo (data contoh di src/data/site.ts)
export function FlashSale() {
  if (!flashSale.enabled) return null;

  return (
    <section aria-labelledby="flash-sale" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="reveal mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
          <h2 id="flash-sale" className="font-serif text-4xl font-semibold sm:text-5xl">
            {flashSale.title}
          </h2>
          <p className="mt-3 text-muted">{flashSale.subtitle}</p>
          <div className="mt-8">
            <Countdown hours={flashSale.hours} />
          </div>
          <a
            href={buildWhatsAppLink(
              `Halo ${siteConfig.name}, saya ingin klaim promo flash sale. Apakah masih berlaku?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm text-background transition-colors hover:bg-accent-strong"
          >
            Klaim Promo <ArrowIcon />
            <span className="sr-only"> (WhatsApp, tab baru)</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4">
          {flashSale.images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] ring-1 ring-line ring-offset-4 ring-offset-surface lg:aspect-auto lg:min-h-[420px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
