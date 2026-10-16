// Peta lokasi workshop lewat embed Google Maps (tanpa API key).
// Iframe dimuat lazy agar tidak memperlambat halaman. Domain google.com diizinkan di CSP frame-src.
import { site } from '@/data/site';

export function MapEmbed() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <figure className="overflow-hidden rounded-sm border border-line bg-background">
      <iframe
        src={src}
        title={`Peta lokasi workshop Seams Konveksi: ${site.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full border-0 sm:h-[400px]"
      />
      <figcaption className="flex flex-col gap-2 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span>📍 {site.address}</span>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-semibold text-plum underline-offset-4 hover:underline"
        >
          Buka di Google Maps →
        </a>
      </figcaption>
    </figure>
  );
}
