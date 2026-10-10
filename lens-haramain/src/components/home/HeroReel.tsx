'use client';

// Video hero yang berganti otomatis seperti hasil editan: menjelang klip selesai,
// klip berikutnya "naik" seperti tirai (clip-path) sementara klip lama membesar & memudar.
// Hanya klip aktif dan klip berikutnya yang dimuat, agar hemat kuota.
// Reduced motion: durasi transisi dipangkas oleh aturan global di globals.css.
import { useEffect, useRef, useState } from 'react';
import { type ReelSlug, reels } from '@/data/media';

const TRANSITION_MS = 1200;
// Transisi dimulai sekian detik sebelum klip habis, agar klip lama masih bergerak selama wipe
const LEAD_S = TRANSITION_MS / 1000 + 0.1;
const EASE = 'cubic-bezier(0.65,0,0.35,1)';

export function HeroReel({ captions }: { captions: Record<ReelSlug, string> }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);

  // Klip pertama: putar saat komponen tampil
  useEffect(() => {
    void videos.current[0]?.play().catch(() => {
      // Autoplay diblokir (mis. mode hemat daya): poster tetap tampil
    });
  }, []);

  // Hentikan klip lama setelah transisi selesai
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => {
      videos.current[previous]?.pause();
      setPrevious(null);
    }, TRANSITION_MS + 100);
    return () => window.clearTimeout(timer);
  }, [previous]);

  // Satu loop per klip aktif: isi garis progres, dan mulai transisi SEBELUM klip habis.
  // Klip berikutnya diputar lebih dulu (masih tersembunyi) dan baru ditampilkan setelah
  // benar-benar berjalan, sehingga tidak ada frame beku / jeda saat perpindahan.
  useEffect(() => {
    const video = videos.current[active];
    const nextIndex = (active + 1) % reels.length;
    let frame = 0;
    let switching = false;

    const swap = () => {
      if (switching) return;
      switching = true;
      const upcoming = videos.current[nextIndex];
      let shown = false;
      const show = () => {
        if (shown) return;
        shown = true;
        setPrevious(active);
        setActive(nextIndex);
      };
      if (!upcoming) return show();
      upcoming.currentTime = 0;
      upcoming
        .play()
        .then(() => {
          // Tunggu frame pertama benar-benar tergambar (maks. 250 ms, agar tidak pernah macet)
          if ('requestVideoFrameCallback' in upcoming) upcoming.requestVideoFrameCallback(() => show());
          window.setTimeout(show, 250);
        })
        .catch(show);
    };

    const tick = () => {
      if (video && video.duration) {
        if (bar.current) bar.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
        if (video.duration - video.currentTime <= LEAD_S) swap();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Cadangan bila loop tertunda (tab di latar belakang)
    video?.addEventListener('ended', swap);
    return () => {
      cancelAnimationFrame(frame);
      video?.removeEventListener('ended', swap);
    };
  }, [active]);

  return (
    <div className="absolute inset-0">
      {reels.map((slug, i) => {
        const isActive = i === active;
        const isPrevious = i === previous;
        const isNext = i === (active + 1) % reels.length;
        return (
          <video
            key={slug}
            ref={(el) => {
              videos.current[i] = el;
            }}
            src={isActive || isPrevious || isNext ? `/videos/hero/${slug}.mp4` : undefined}
            poster={`/posters/hero-${slug}.webp`}
            muted
            playsInline
            autoPlay={i === 0}
            preload={isActive || isNext ? 'auto' : 'none'}
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            style={{
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
              opacity: isActive || isPrevious ? 1 : 0,
              clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
              // Klip masuk: dari sedikit membesar ke normal; klip keluar: membesar & meredup
              transform: isActive ? 'scale(1)' : isPrevious ? 'scale(1.08)' : 'scale(1.1)',
              filter: isPrevious ? 'brightness(0.55)' : 'none',
              transition: isActive
                ? `clip-path ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS + 400}ms ${EASE}`
                : isPrevious
                  ? `transform ${TRANSITION_MS}ms ${EASE}, filter ${TRANSITION_MS}ms ${EASE}`
                  : 'none',
              willChange: isActive || isPrevious || isNext ? 'clip-path, transform' : undefined,
            }}
          />
        );
      })}

      {/* Keterangan lokasi + garis penanda klip (seperti story Instagram) di atas gradasi gelap */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-6 pt-20 pb-6 text-right sm:pl-24 lg:pl-28">
        <p key={active} className="animate-[fade-up_0.8s_ease_both] font-serif text-xl text-white italic">
          {captions[reels[active]!]}
        </p>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {reels.map((slug, i) => (
            <span key={slug} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
              {i < active && <span className="absolute inset-0 bg-white" />}
              {i === active && <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-white" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
