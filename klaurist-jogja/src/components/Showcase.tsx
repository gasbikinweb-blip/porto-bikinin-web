// Section di antara papan dan bucket: banner cerita, pilih berdasarkan acara, banner promo
import Image from 'next/image';
import { FlowerSprig, Sparkle } from './decor';
import { WhatsAppIcon } from './icons';
import { activePromos } from '@/data/promos';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const ico = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: 'size-10',
};

const occasions = [
  {
    name: 'Wisuda',
    icon: (
      <svg {...ico}>
        <path d="M3 12 16 6l13 6-13 6-13-6Z" />
        <path d="M9 15v6c3 3 11 3 14 0v-6M27 13v7" />
      </svg>
    ),
  },
  {
    name: 'Sidang',
    icon: (
      <svg {...ico}>
        <path d="M8 4h12l5 5v19H8z" />
        <path d="M20 4v5h5M12 15h9M12 19h9M12 23h5" />
      </svg>
    ),
  },
  {
    name: 'Ulang Tahun',
    icon: (
      <svg {...ico}>
        <path d="M6 27V17h20v10M4 27h24M6 21c3 2 5-2 7 0s4 2 6 0 4-2 7 0" />
        <path d="M11 17v-4M16 17v-4M21 17v-4M11 9.5c0-1.3 1-2.5 0-3.5M16 9.5c0-1.3 1-2.5 0-3.5M21 9.5c0-1.3 1-2.5 0-3.5" />
      </svg>
    ),
  },
  {
    name: 'Grand Opening',
    icon: (
      <svg {...ico}>
        <path d="M5 13 7 6h18l2 7M5 13h22M5 13c0 2 2 3 4 3s4-1 4-3c0 2 2 3 3 3s3-1 3-3c0 2 2 3 4 3s4-1 4-3" />
        <path d="M7 16v11h18V16M13 27v-6h6v6" />
      </svg>
    ),
  },
  {
    name: 'Ucapan Spesial',
    icon: (
      <svg {...ico}>
        <path d="M16 27S5 20 5 12a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 8-11 15-11 15Z" />
      </svg>
    ),
  },
];

export function Showcase() {
  const promo = activePromos()[0];
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-4 sm:space-y-20 sm:px-6">
      {/* Banner cerita */}
      <section
        aria-labelledby="judul-cerita"
        className="reveal grid overflow-hidden rounded-[2rem] bg-blush md:grid-cols-[1fr_1.2fr]"
      >
        <div className="relative flex flex-col justify-center p-7 sm:p-10">
          <h2
            id="judul-cerita"
            className="font-serif text-3xl leading-tight font-medium uppercase sm:text-4xl"
          >
            Ucapan yang Jadi
            <span className="block text-rose-strong">Kenangan Manis</span>
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">
            Setiap papan dirangkai dengan bunga non-fresh dan tile pilihan, jadi tetap cantik di
            foto dan bisa disimpan lama setelah acara.
          </p>
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-rose px-6 text-sm font-medium tracking-[0.15em] text-rose-strong uppercase hover:bg-ivory"
          >
            <WhatsAppIcon className="size-4" /> Tanya Admin
            <span className="sr-only"> (WhatsApp, tab baru)</span>
          </a>
          <Sparkle className="absolute right-6 bottom-6 size-5 text-rose" />
        </div>
        {/* Sisi foto dengan tepi melengkung ke kiri */}
        <div className="relative min-h-72 md:min-h-full">
          <div className="absolute inset-0 overflow-hidden md:rounded-l-[50%_100%]">
            <Image
              src="/images/papan-round-wisuda.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <FlowerSprig className="absolute bottom-3 left-3 w-14 text-ivory md:hidden" />
        </div>
      </section>

      {/* Pilih berdasarkan acara */}
      <section aria-labelledby="judul-acara">
        <h2
          id="judul-acara"
          className="reveal flex items-center gap-2 font-serif text-3xl font-medium sm:text-4xl"
        >
          Pilih Berdasarkan Acara <Sparkle className="size-4 text-rose" />
        </h2>
        <ul data-stagger className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {occasions.map((o) => (
            <li key={o.name} className="reveal">
              <a href="#pesan" className="group flex flex-col items-center gap-3 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-blush-soft text-rose transition-colors group-hover:bg-blush sm:size-28">
                  {o.icon}
                </span>
                <span className="text-xs font-medium tracking-[0.15em] uppercase">{o.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Banner promo (hilang otomatis setelah masa promo) */}
      {promo && (
        <section
          aria-label="Promo"
          className="reveal flex flex-col gap-5 rounded-[1.75rem] border border-sage/40 bg-sage-soft px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-4">
            <FlowerSprig className="hidden w-10 shrink-0 text-sage sm:block" />
            <div>
              <p className="font-serif text-2xl font-semibold uppercase">{promo.title}</p>
              <p className="mt-1 text-sm text-muted">{promo.text}</p>
            </div>
          </div>
          <a
            href={buildWhatsAppLink(`Halo Klaurist, saya mau pakai ${promo.title} ya, Kak.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-rose px-7 text-sm font-semibold tracking-[0.15em] text-on-rose uppercase hover:bg-rose-strong"
          >
            <WhatsAppIcon className="size-4" /> Klaim Promo
            <span className="sr-only"> (WhatsApp, tab baru)</span>
          </a>
        </section>
      )}
    </div>
  );
}
