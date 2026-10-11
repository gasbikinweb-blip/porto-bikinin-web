'use client';

// Foto request sample warna: tiap foto bisa diklik → galeri lightbox (geser antar foto + tombol request via WA)
import Image from 'next/image';
import {
  Lightbox,
  type LightboxImage,
  type LightboxLabels,
  useLightbox,
} from '@/components/ui/Lightbox';

export function SampleGallery({
  images,
  title,
  hint,
  cta,
  labels,
}: {
  images: LightboxImage[];
  title: string;
  hint: string;
  cta: { href: string; label: string };
  labels: LightboxLabels;
}) {
  const lightbox = useLightbox();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {images.map((img, i) => (
          <button
            key={img.small}
            type="button"
            onClick={() => lightbox.open({ title, images, cta }, i)}
            aria-label={`${title} ${i + 1}/${images.length}: ${img.alt}`}
            className={`reveal reveal-curtain parallax-soft group relative block aspect-[9/14] overflow-hidden rounded-3xl text-left ${i === 1 ? 'mt-8 sm:mt-14' : ''}`}
          >
            <Image
              src={img.small}
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, 32vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Ikon perbesar: muncul saat disorot (desktop), selalu terlihat di HP */}
            <span className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition-transform duration-300 group-hover:scale-110 sm:right-3 sm:bottom-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="size-4"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">{hint}</p>
      <Lightbox ctl={lightbox} labels={labels} />
    </div>
  );
}
