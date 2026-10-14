'use client';

// Video dekoratif tanpa suara: hanya diputar saat terlihat di layar (hemat baterai & kuota),
// dan tidak diputar otomatis bila pengguna meminta gerakan minimal.
import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
};

export function AutoVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    />
  );
}
