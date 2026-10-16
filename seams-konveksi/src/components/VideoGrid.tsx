// Deretan video produksi yang bisa digeser ke samping (scroll-snap, tanpa JavaScript).
// <video> bawaan browser dengan kontrol; preload="none" agar video baru diunduh saat diputar.
import type { Video } from '@/data/videos';

export function VideoGrid({ items, onDark = false }: { items: Video[]; onDark?: boolean }) {
  return (
    <div>
      <ul
        aria-label="Video proses produksi"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:gap-5 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {items.map((v) => (
          <li key={v.slug} className="w-[62vw] shrink-0 snap-start sm:w-64 lg:w-72">
            <figure>
              <video
                controls
                muted
                playsInline
                preload="none"
                poster={`/videos/${v.slug}-poster.jpg`}
                width={v.width}
                height={v.height}
                aria-label={`Video: ${v.title}`}
                className="aspect-[9/16] w-full rounded-sm bg-surface object-cover"
              >
                <source src={`/videos/${v.slug}.mp4`} type="video/mp4" />
              </video>
              <figcaption className="mt-3">
                <span className="block text-sm font-semibold">{v.title}</span>
                <span className={`block text-xs ${onDark ? 'text-background/75' : 'text-muted'}`}>
                  {v.description}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p
        aria-hidden="true"
        className={`mx-auto mt-2 max-w-6xl px-4 text-xs sm:px-6 ${onDark ? 'text-background/60' : 'text-muted'}`}
      >
        Geser untuk melihat video lainnya →
      </p>
    </div>
  );
}
