// Galeri poster pricelist asli dari IG. Klik membuka poster ukuran penuh di tab baru.
import Image from 'next/image';
import { Sparkle } from './decor';

const posters = [
  { slug: 'poster-papan', alt: 'Pricelist papan akrilik: Round, Kubah, Standing', w: 864, h: 1080 },
  { slug: 'poster-papan-baru-1', alt: 'Poster koleksi papan akrilik baru', w: 1080, h: 1080 },
  {
    slug: 'poster-papan-baru-2',
    alt: 'Poster papan akrilik baru dipakai di acara',
    w: 1080,
    h: 1080,
  },
  {
    slug: 'poster-bucket',
    alt: 'Pricelist Velvet Maroon, Blue Ocean, Blue Round Daisy',
    w: 864,
    h: 1080,
  },
  {
    slug: 'poster-round-daisy',
    alt: 'Pricelist Round Daisy Flower dan tambahan',
    w: 1080,
    h: 1350,
  },
  {
    slug: 'poster-paket',
    alt: 'Poster Paket 6 Tangkai: Paket Lilu dan Paket Limaw',
    w: 1080,
    h: 1350,
  },
  { slug: 'poster-bloom', alt: 'Pricelist Klaurist Bloom bunga satuan', w: 1080, h: 1350 },
  { slug: 'poster-kenapa', alt: 'Poster kenapa harus memilih Klaurist', w: 1080, h: 1350 },
];

export function Pricelist() {
  return (
    <section
      aria-labelledby="judul-pricelist"
      id="pricelist"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="reveal">
        <h2
          id="judul-pricelist"
          className="flex items-center gap-2 font-serif text-3xl font-medium sm:text-4xl"
        >
          Pricelist Lengkap <Sparkle className="size-4 text-rose" />
        </h2>
        <p className="mt-1 text-sm text-muted">
          Poster asli dari Instagram Klaurist. Ketuk untuk melihat ukuran penuh.
        </p>
      </div>
      <ul
        data-stagger
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4"
      >
        {posters.map((p) => (
          <li key={p.slug} className="reveal w-[70%] shrink-0 snap-start sm:w-auto">
            <a
              href={`/images/${p.slug}.webp`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[1.5rem] border border-line bg-blush-soft"
            >
              <span className="relative block aspect-[4/5]">
                <Image
                  src={`/images/${p.slug}-thumb.webp`}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 70vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="sr-only"> (buka di tab baru)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
