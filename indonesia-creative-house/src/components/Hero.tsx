import Image from 'next/image';
import { HeroSlides } from './HeroSlides';
import {
  ArrowIcon,
  ArrowUpRightIcon,
  BoxIcon,
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  WhatsAppIcon,
} from './icons';
import { getItem, menu } from '@/data/menu';
import { categories } from '@/data/categories';
import { site } from '@/data/site';

const side = [
  { slug: 'tampah-kue-jajanan-pasar', title: 'Tampah', sub: 'Jajanan Pasar', image: 0 },
  { slug: 'hantaran-lamaran', title: 'Hantaran', sub: 'Lamaran', image: 0 },
];

// Hanya fakta dari brief dan caption Instagram
const features = [
  {
    Icon: BoxIcon,
    title: 'Aneka Pilihan',
    text: `${categories.length} kategori, dari tampah sampai hantaran.`,
  },
  {
    Icon: CalendarIcon,
    title: 'Pesan untuk Acara',
    text: 'Arisan, pengajian, rapat, hingga lamaran.',
  },
  {
    Icon: WhatsAppIcon,
    title: 'Mudah via WhatsApp',
    text: 'Pilih menu, lalu kirim rinciannya ke admin.',
  },
  { Icon: ClockIcon, title: 'Buka Setiap Hari', text: `Melayani dari ${site.address}.` },
];

export function Hero() {
  const thumbs = ['snack-besekan', 'nasi-tumpeng', 'serabi-tart', 'pempek-tampah'].map(
    (s) => getItem(s)?.images[0],
  );

  return (
    <section id="beranda" className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:pt-12">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="animate-in">
          <p className="text-sm font-bold tracking-widest text-leaf uppercase">
            Jajanan Pasar & Snack Box
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.1] sm:text-6xl">
            Sajian Cantik untuk Setiap{' '}
            <span className="relative inline-block px-2">
              Acara
              <svg
                viewBox="0 0 200 80"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] text-accent"
              >
                <path
                  d="M30 62C4 48 8 20 56 10c50-10 124-4 136 26 9 24-44 38-104 38-30 0-62-4-74-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>
        </div>
        <div className="animate-in" style={{ animationDelay: '120ms' }}>
          <p className="max-w-sm leading-relaxed text-muted">
            Tampah, snack besek, nasi tumpeng, dan hantaran cantik dari ICH. Pilih menunya, lalu
            pesan lewat WhatsApp ya, Kak.
          </p>
          <a
            href="#menu"
            className="mt-5 inline-flex min-h-14 items-center gap-6 rounded-full bg-accent py-1.5 pr-1.5 pl-7 font-bold text-white hover:bg-accent-strong"
          >
            Lihat Menu
            <span className="grid size-11 place-items-center rounded-full bg-white text-accent">
              <ArrowIcon className="size-5" />
            </span>
          </a>
        </div>
      </div>

      <div
        className="animate-in mt-10 grid grid-cols-2 gap-4 lg:grid-cols-[1fr_170px_170px]"
        style={{ animationDelay: '240ms' }}
      >
        <div
          data-hero-card
          className="relative col-span-2 flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2rem] bg-foreground p-5 text-white sm:p-8 lg:col-span-1 lg:min-h-[440px]"
        >
          <HeroSlides />

          <div className="relative mt-8 flex items-end justify-between gap-3">
            <div className="grid w-full max-w-[290px] grid-cols-3 gap-2 rounded-3xl bg-white p-3 text-foreground sm:gap-3 sm:p-4">
              <a
                href="#pesan-acara"
                aria-label="Pesan untuk acara"
                className="grid aspect-square place-items-center rounded-full bg-accent text-white hover:bg-accent-strong"
              >
                <PlusIcon className="size-6" />
              </a>
              <div className="flex flex-col items-center justify-center rounded-2xl bg-blush text-center">
                <strong className="text-lg leading-tight">{site.since}</strong>
                <span className="text-xs text-muted">Sejak</span>
              </div>
              <div className="grid aspect-square place-items-center rounded-full bg-blush text-accent">
                <BoxIcon className="size-6" />
              </div>
              <div aria-hidden="true" className="grid aspect-square grid-cols-2 gap-1">
                {thumbs.map(
                  (t) =>
                    t && (
                      <span key={t.thumb} className="relative overflow-hidden rounded-full">
                        <Image src={t.thumb} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    ),
                )}
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl bg-blush text-center">
                <strong className="text-lg leading-tight">{menu.length}</strong>
                <span className="text-xs text-muted">Menu</span>
              </div>
              <div className="grid aspect-square place-items-center rounded-full bg-blush text-accent">
                <CalendarIcon className="size-6" />
              </div>
            </div>
            <a
              href="#menu"
              aria-label="Lihat semua menu"
              className="grid size-16 shrink-0 place-items-center rounded-full border-4 border-white/40 bg-accent text-white hover:bg-accent-strong"
            >
              <ArrowIcon className="size-6" />
            </a>
          </div>
        </div>

        {side.map((c) => {
          const img = getItem(c.slug)?.images[c.image];
          return (
            <a
              key={c.slug}
              href={`#menu-${c.slug}`}
              aria-label={`Lihat ${c.title} ${c.sub}`}
              className="group relative min-h-[320px] overflow-hidden rounded-[2rem] bg-foreground text-white"
            >
              {img && (
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 170px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span aria-hidden="true" className="side-shade absolute inset-0" />
              <span className="absolute bottom-20 left-4 flex rotate-180 gap-1 [writing-mode:vertical-rl]">
                <span className="font-serif text-4xl leading-none">{c.title}</span>
                <span className="text-lg leading-none">{c.sub}</span>
              </span>
              <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full border border-white">
                <ArrowUpRightIcon className="size-5" />
              </span>
            </a>
          );
        })}
      </div>

      <ul
        data-stagger
        className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-line"
      >
        {features.map(({ Icon, title, text }) => (
          <li key={title} className="reveal flex flex-col gap-3 sm:flex-row lg:px-5 lg:first:pl-0">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-blush text-accent">
              <Icon className="size-6" />
            </span>
            <div>
              <h2 className="font-bold">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
