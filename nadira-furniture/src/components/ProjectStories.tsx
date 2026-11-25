'use client';

// Kartu video vertikal dari Instagram @nadira.furniture.
// Video diputar otomatis tanpa suara saat terlihat; tombol speaker menyalakan suara (satu video
// bersuara sekaligus), klik kartu membuka pemutar layar penuh.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { stories, type Story } from '@/data/stories';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { VideoLightbox } from './VideoLightbox';

const filters = ['Semua', 'Kitchen Set', 'Lemari & Kamar', 'Proses'] as const;

function StoryCard({ s, onOpen }: { s: Story; onOpen?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

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

  // Bila video lain dinyalakan suaranya (atau pemutar layar penuh dibuka), video ini dibisukan
  useEffect(() => {
    const onOther = (e: Event) => {
      const v = ref.current;
      if (v && (e as CustomEvent<HTMLVideoElement | null>).detail !== v) {
        v.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener('reel-sound', onOther);
    return () => window.removeEventListener('reel-sound', onOther);
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      window.dispatchEvent(new CustomEvent('reel-sound', { detail: v }));
      v.play().catch(() => {});
    }
  };

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
        {s.video && onOpen && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Putar layar penuh: ${s.title}`}
            className="absolute inset-0 cursor-zoom-in"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-background">
          {s.tag}
        </span>
        {s.video && s.sound && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? `Nyalakan suara ${s.title}` : `Matikan suara ${s.title}`}
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur hover:bg-black/75 aria-pressed:bg-accent aria-pressed:text-background"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
              {muted ? (
                <path d="m22 9-6 6m0-6 6 6" />
              ) : (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              )}
            </svg>
          </button>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-foreground">
          <p className="font-serif text-xl leading-tight font-medium">{s.title}</p>
          {s.place && <p className="mt-0.5 text-xs text-foreground/75">{s.place}</p>}
          <a
            href={buildWhatsAppLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-semibold text-background transition-colors hover:bg-accent-strong"
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
  const [open, setOpen] = useState<number | null>(null);
  const list = stories.filter((s) => filter === 'Semua' || s.tag === filter);
  const videos = list.filter((s) => s.video);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter story">
        {filters.map((f) => {
          const n = f === 'Semua' ? stories.length : stories.filter((s) => s.tag === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background"
            >
              {f} <span className="ml-0.5 text-xs opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
      <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {list.map((s) => (
          <StoryCard
            key={s.slug}
            s={s}
            onOpen={s.video ? () => setOpen(videos.findIndex((v) => v.slug === s.slug)) : undefined}
          />
        ))}
      </ul>
      <VideoLightbox
        items={videos.map((s) => ({
          src: `/stories/${s.slug}.mp4`,
          poster: `/stories/${s.slug}.webp`,
          title: s.title,
          sub: s.place ?? s.tag,
        }))}
        index={open}
        onIndex={setOpen}
      />
    </>
  );
}
