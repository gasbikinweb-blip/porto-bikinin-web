import Image from 'next/image';
import type { Content } from '@/content/types';
import { type Photo, stories } from '@/data/media';
import { Marquee } from '../Marquee';

// Dua baris foto berjalan berlawanan arah, kesan "banyak momen" sekali pandang
function Row({ photos, lang, reverse }: { photos: Photo[]; lang: Content['lang']; reverse?: boolean }) {
  return (
    <Marquee duration="70s" className={reverse ? 'marquee-reverse' : ''}>
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`relative mr-4 h-[30vh] min-h-48 shrink-0 overflow-hidden sm:mr-6 ${i % 3 === 1 ? 'arch' : 'rounded-sm'}`}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="25vw"
            className="object-cover grayscale-[35%] transition-[filter,transform] duration-700 hover:scale-105 hover:grayscale-0"
          />
        </div>
      ))}
    </Marquee>
  );
}

export function PhotoWall({ t }: { t: Content }) {
  const all = stories.flatMap((s) => s.photos);
  // Baris kedua diacak urutannya agar dua baris tidak terlihat kembar
  const second = [...all.slice(9), ...all.slice(0, 9)].reverse();

  return (
    <section aria-labelledby="dinding-judul" className="overflow-hidden py-24 sm:py-32">
      <Row photos={all} lang={t.lang} />
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
        <h2
          id="dinding-judul"
          className="reveal reveal-blur font-serif text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1] font-light"
        >
          {t.wall.title[0]} <span className="text-accent italic">{t.wall.title[1]}</span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-md leading-relaxed text-muted">{t.wall.body}</p>
      </div>
      <Row photos={second} lang={t.lang} reverse />
    </section>
  );
}
