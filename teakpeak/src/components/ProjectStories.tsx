'use client';

// Kartu story vertikal dari sorotan IG "Our Project", "Our Production" & "Delivered".
// Video diputar otomatis (tanpa suara) hanya saat terlihat; tidak autoplay bila "kurangi animasi".
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { stories, type Story } from '@/data/stories';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const filters = ['Semua', 'Our Project', 'Our Production', 'Delivered'] as const;

function StoryCard({ s }: { s: Story }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.6 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const msg = `Halo ${siteConfig.name}, saya lihat "${s.title}" di website. Saya mau konsultasi untuk pesanan serupa.`;

  return (
    <li className="animate-in w-[68vw] max-w-[250px] shrink-0 snap-start sm:w-[230px]">
      <div className="theme-dark relative aspect-[9/16] overflow-hidden rounded-2xl bg-surface-2 shadow-lg">
        {s.video ? (
          <video
            ref={ref}
            src={`/stories/${s.slug}.mp4`}
            poster={`/stories/${s.slug}.webp`}
            muted
            loop
            playsInline
            preload="none"
            aria-label={s.alt}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={`/stories/${s.slug}.webp`}
            alt={s.alt}
            fill
            sizes="250px"
            className="object-cover"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20"
        />
        <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-background">
          {s.tag}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 text-foreground">
          <p className="font-serif text-xl leading-tight font-medium">{s.title}</p>
          {s.place && <p className="mt-0.5 text-xs text-foreground/75">{s.place}</p>}
          <a
            href={buildWhatsAppLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-semibold text-background transition-colors hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4" /> Mau seperti ini
            <span className="sr-only"> (WhatsApp, tab baru)</span>
          </a>
        </div>
      </div>
    </li>
  );
}

export function ProjectStories() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Semua');
  const list = stories.filter((s) => filter === 'Semua' || s.tag === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter story">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {list.map((s) => (
          <StoryCard key={s.slug} s={s} />
        ))}
      </ul>
    </>
  );
}
