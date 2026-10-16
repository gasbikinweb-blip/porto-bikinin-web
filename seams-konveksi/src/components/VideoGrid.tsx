// Grid video produksi. Tanpa JavaScript: memakai <video> bawaan browser dengan kontrol,
// preload="none" agar video tidak diunduh sebelum diputar, dan poster sebagai pratinjau.
import type { Video } from '@/data/videos';

export function VideoGrid({ items }: { items: Video[] }) {
  return (
    <ul data-stagger className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {items.map((v) => (
        <li key={v.slug} className="reveal">
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
              className="aspect-[9/16] w-full rounded-lg bg-surface object-cover"
            >
              <source src={`/videos/${v.slug}.mp4`} type="video/mp4" />
            </video>
            <figcaption className="mt-2">
              <span className="block text-sm font-semibold">{v.title}</span>
              <span className="block text-xs text-muted">{v.description}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
