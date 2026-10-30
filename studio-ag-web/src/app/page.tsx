// Situs satu halaman: semua section di sini, navigasi memakai anchor (#layanan, #proyek, ...).
// Setiap section memakai kelas reveal* sehingga muncul beranimasi saat di-scroll.
import Image from 'next/image';
import { BeforeAfter } from '@/components/BeforeAfter';
import { HeroCarousel, type HeroSlide } from '@/components/HeroCarousel';
import { ArrowIcon } from '@/components/icons';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SectionHeading } from '@/components/SectionHeading';
import { WaBuilder } from '@/components/WaBuilder';
import { faqs } from '@/data/faq';
import { process } from '@/data/process';
import { categories, getProject, projects, siteImage, siteImages } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta(
  'Studio AG | Jasa Desain Interior & Build Jakarta',
  'Jasa desain interior Jakarta dengan workshop sendiri: kitchen set custom, interior apartemen & rumah, furniture HPL custom, hingga renovasi di Jabodetabek.',
  '/',
);

// Visi & misi dari Portfolio.pdf
const misi = [
  'Menyediakan layanan desain dan pembangunan dengan manajemen yang efektif dan efisien.',
  'Mengutamakan kualitas material, presisi pengerjaan, dan ketepatan waktu.',
  'Menciptakan ruang yang estetis, fungsional, nyaman, dan bernilai jangka panjang.',
  'Menjadi mitra terpercaya dalam mewujudkan hunian, ruang komersial, dan perkantoran yang beridentitas.',
  'Mendorong profesionalisme serta inovasi berkelanjutan dalam setiap proyek.',
];

const workshopAlt = [
  'Suasana workshop produksi furnitur Studio AG',
  'Kabinet putih dirakit di workshop',
  'Detail sudut lengkung furnitur hasil workshop',
  'Detail tepi meja kerja custom',
];

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const textLink =
  'underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent';

export default function HomePage() {
  const hero = siteImage('hero');
  // Slide hero: foto landscape situs + sampul proyek pilihan
  const picks = ['b-a-house', 'a-f-house', 'kantor-jatiwarna', 'e-s-bedroom']
    .map(getProject)
    .filter((p) => p !== undefined);
  const slides: HeroSlide[] = picks.map((p, i) => ({
    src: i === 0 && hero ? hero.src : p.cover.src,
    thumb: p.cover.thumb,
    alt: p.cover.alt,
    title: p.title,
    caption: `${p.propertyType}${p.location ? ` · ${p.location}` : ''}`,
    href: `#proyek/${p.slug}`,
  }));
  const workshop = siteImages.filter((i) => i.kind === 'workshop').slice(0, 4);
  const es = getProject('e-s-bedroom');
  const before = es?.images.find((i) => i.kind === 'before');
  const after = es?.images.find((i) => i.kind === 'after');
  const aboutImg = getProject('a-f-house')?.images[1];
  const a = site.address;

  return (
    <>
      {/* Hero ala kartu (navbar tetap di atas) */}
      <HeroCarousel slides={slides} />

      {/* Strip di bawah hero */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-[auto_1fr_auto_1.4fr]">
        <a href="#layanan" className="group flex items-center">
          {workshop[0] && (
            <span className="relative size-16 overflow-hidden rounded-full">
              <Image src={workshop[0].thumb} alt="" fill sizes="64px" className="object-cover" />
            </span>
          )}
          <span className="-ml-4 grid size-16 place-items-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-45">
            <ArrowIcon className="size-5 -rotate-45" />
            <span className="sr-only">Lihat layanan</span>
          </span>
        </a>
        <p className="max-w-xs border-line text-sm leading-relaxed text-muted md:border-l md:pl-6">
          Desain interior, produksi furnitur di workshop sendiri, hingga renovasi dalam satu
          manajemen.
        </p>
        <span className="hidden h-px w-16 bg-line md:block" aria-hidden="true" />
        <p className="flex items-center gap-5 text-xl leading-snug sm:text-2xl">
          <Image
            src="/icon.png"
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-xl"
          />
          <span>{site.tagline} untuk hunian, kantor, dan ruang komersial di Jabodetabek.</span>
        </p>
      </section>

      {/* Layanan */}
      <section id="layanan" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Layanan"
          title="Satu tim, dari gambar hingga terpasang"
          description={`Berdiri sejak ${site.founded}, Studio AG menghadirkan layanan end-to-end dalam satu manajemen yang efisien.`}
        />
        <ol data-stagger className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="reveal reveal-zoom flex flex-col bg-background p-8">
              <span className="font-serif text-lg text-accent-ink italic">0{i + 1}</span>
              <h3 className="mt-6 font-serif text-3xl">{s.title}</h3>
              <p className="mt-3 text-muted">{s.intro}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
                {s.points.map((pt) => (
                  <li key={pt.title}>
                    <span className="font-semibold">{pt.title}.</span>{' '}
                    <span className="text-muted">{pt.text}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Proyek: filter + popup detail */}
      <section id="proyek" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Portofolio"
            title="Ruang yang tumbuh bersama penghuninya"
            description="Klik proyek untuk melihat detail dan galerinya. Gambar berlabel “Render Desain” adalah visual 3D, selebihnya foto hasil pengerjaan."
          />
          <div className="mt-10">
            <ProjectShowcase projects={projects} categories={categories} />
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section
        id="workshop"
        className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2"
      >
        <div className="reveal reveal-left">
          <SectionHeading
            eyebrow="Dari Workshop Kami"
            title="Built to Belong"
            description="Seluruh proses produksi dikerjakan melalui workshop kami sendiri dengan perhatian terhadap detail: persiapan, produksi, quality check, hingga instalasi dan finishing di lapangan."
          />
        </div>
        <ul data-stagger className="grid grid-cols-2 gap-3">
          {workshop.map((img, i) => (
            <li
              key={img.src}
              className={`reveal reveal-zoom relative aspect-[4/5] overflow-hidden bg-surface ${i % 2 ? 'mt-10' : ''}`}
            >
              <Image
                src={img.thumb}
                alt={workshopAlt[i] ?? 'Proses di workshop Studio AG'}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Sebelum & sesudah */}
      {before && after && (
        <section className="bg-surface py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Transformasi"
              title="Sebelum & sesudah"
              description="E+S Bedroom, Casa Jardin: kamar terbatas yang ditata ulang dengan wardrobe built-in dan tone material ringan. Geser garis atau gunakan tombol panah."
            />
            <div className="reveal reveal-blur mt-10">
              <BeforeAfter before={before} after={after} />
            </div>
          </div>
        </section>
      )}

      {/* Proses kerja (dari Portfolio.pdf) */}
      <section id="proses" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="How We Work" title="Proses kerja kami" />
        <ol data-stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
          {process.map((step, i) => (
            <li key={step.title} className="reveal border-t border-foreground pt-5">
              <span className="text-xs tracking-[0.2em] text-muted">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl italic">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tentang */}
      <section id="tentang" className="bg-foreground py-24 text-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          {aboutImg && (
            <div className="reveal reveal-left relative aspect-[4/5] overflow-hidden">
              <Image
                src={aboutImg.src}
                alt={aboutImg.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="reveal reveal-right">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="rule-motif text-accent" aria-hidden="true" />
              Tentang Kami
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              As we evolve, our <em>homes</em> should too.
            </h2>
            <p className="mt-6 leading-relaxed text-background/80">
              {site.name} adalah Interior Design &amp; Build studio yang berdiri pada tahun{' '}
              {site.founded} di Jakarta. Didukung tim desainer berpengalaman serta tenaga ahli
              konstruksi dan manufaktur, kami mengedepankan presisi, kualitas material, dan
              ketepatan waktu agar hasil akhir selaras dengan kebutuhan, anggaran, dan identitas
              klien.
            </p>
            <h3 className="mt-10 font-serif text-2xl italic">Visi</h3>
            <p className="mt-2 text-background/80">
              Menjadi Interior Design &amp; Build studio terpercaya yang menghadirkan ruang
              berkualitas tinggi, fungsional, dan merefleksikan karakter serta visi setiap klien.
            </p>
            <h3 className="mt-8 font-serif text-2xl italic">Misi</h3>
            <ol className="mt-3 space-y-2 text-sm text-background/80">
              {misi.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="font-serif text-base italic">0{i + 1}</span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
          <div data-stagger className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="reveal group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="text-2xl text-accent-ink transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak + penyusun pesan WA */}
      <section id="kontak" className="bg-surface py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Kontak"
              title="Let’s discuss your future space."
              description="Semua konsultasi dilayani melalui WhatsApp. Susun pesan Anda agar tim kami bisa langsung memahami kebutuhan ruangan."
            />
            <dl data-stagger className="mt-10 space-y-6">
              <div className="reveal">
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">WhatsApp</dt>
                <dd className="mt-1 font-serif text-2xl">
                  <a href={buildWhatsAppLink(generalMessage)} {...external} className={textLink}>
                    {site.waDisplay}
                  </a>
                </dd>
              </div>
              <div className="reveal">
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">Email</dt>
                <dd className="mt-1 font-serif text-2xl break-all">
                  <a href={`mailto:${site.email}`} className={textLink}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="reveal">
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">Alamat</dt>
                <dd className="mt-1 leading-relaxed">
                  <address className="not-italic">
                    {a.street}, {a.district}, {a.city}, {a.region} {a.postalCode}
                  </address>
                  <a
                    href={site.mapsUrl}
                    {...external}
                    className={`mt-2 inline-block text-sm ${textLink}`}
                  >
                    Buka di Google Maps<span className="sr-only"> (tab baru)</span>
                  </a>
                </dd>
              </div>
              {site.hours && (
                <div className="reveal">
                  <dt className="text-xs tracking-[0.2em] text-muted uppercase">Jam operasional</dt>
                  <dd className="mt-1">{site.hours}</dd>
                </div>
              )}
              <div className="reveal">
                <dt className="text-xs tracking-[0.2em] text-muted uppercase">Media sosial</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {site.social.map((s) => (
                    <a key={s.label} href={s.href} {...external} className={textLink}>
                      {s.label}
                      <span className="sr-only"> {s.handle} (tab baru)</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="reveal reveal-right lg:col-span-7">
            <h3 className="font-serif text-3xl">Susun pesan konsultasi</h3>
            <div className="mt-6">
              <WaBuilder />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
