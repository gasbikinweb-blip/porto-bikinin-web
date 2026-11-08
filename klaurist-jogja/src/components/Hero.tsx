// Hero berbentuk panel membulat: judul tiga baris di kiri, foto di kanan di atas lengkung sage,
// lalu strip keunggulan berupa 4 kartu kecil (layout terinspirasi referensi florist, tema Klaurist)
import Image from 'next/image';
import { FlowerSprig, Sparkle } from './decor';
import { ReasonIcon } from './ReasonIcon';
import { reasons } from '@/data/site';

export function Hero() {
  return (
    <section id="beranda" className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-blush-soft sm:rounded-[2.5rem]">
        {/* Lengkung sage di belakang foto */}
        <div
          aria-hidden="true"
          className="absolute -right-24 -bottom-40 size-[26rem] rounded-full bg-sage-soft sm:size-[34rem] md:-right-10 md:-bottom-56 md:size-[40rem]"
        />
        <div className="relative grid items-center gap-6 px-6 pt-10 pb-0 sm:px-10 md:grid-cols-[1fr_1.05fr] md:py-14 md:pr-0 lg:px-14">
          <div className="reveal">
            <p className="text-xs font-medium tracking-[0.3em] text-rose uppercase">
              Klaurist Jogja · Everlasting Love
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">
              <span className="block">Awet.</span>
              <span className="block text-rose">Aesthetic.</span>
              <span className="block">Bersahabat.</span>
            </h1>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              Sewa papan ucapan akrilik &amp; bucket bunga non-fresh di Jogja. Manis untuk wisuda,
              sidang, ulang tahun, sampai grand opening.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#papan"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-7 text-sm font-medium tracking-[0.15em] text-on-rose uppercase hover:bg-rose-strong"
              >
                Lihat Koleksi <Sparkle className="size-3.5" />
              </a>
              <a
                href="#pesan"
                className="inline-flex min-h-12 items-center rounded-full border border-rose px-7 text-sm font-medium tracking-[0.15em] text-rose uppercase hover:bg-ivory"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative mx-auto aspect-[4/5] w-4/5 overflow-hidden rounded-t-full border-[6px] border-ivory shadow-xl md:w-3/4">
              <Image
                src="/images/papan-round-wisuda.webp"
                alt="Papan ucapan akrilik bulat dihiasi bunga lily pink dan tile, terpasang di lobi kampus saat wisuda"
                fill
                priority
                sizes="(min-width: 768px) 400px, 80vw"
                className="object-cover object-[50%_48%]"
              />
            </div>
            <div className="absolute bottom-6 left-0 size-24 overflow-hidden rounded-full border-4 border-ivory shadow-lg sm:size-28">
              <Image src="/images/logo.webp" alt="" fill sizes="112px" className="object-cover" />
            </div>
            <FlowerSprig className="absolute top-2 right-2 w-16 text-rose/70 sm:w-20" />
            <Sparkle className="absolute top-1/3 left-2 size-5 text-rose" />
          </div>
        </div>
      </div>

      {/* Strip keunggulan */}
      <ul
        data-stagger
        aria-label="Keunggulan Klaurist"
        className="mx-auto mt-5 grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {reasons.map((r) => (
          <li
            key={r.title}
            className="reveal flex items-center gap-3 rounded-2xl border border-line bg-card p-3 sm:p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rose-strong">
              <ReasonIcon name={r.icon} className="size-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold tracking-[0.12em] uppercase sm:text-sm">
                {r.title}
              </span>
              <span className="mt-0.5 hidden text-xs leading-snug text-muted sm:block">
                {r.short}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
