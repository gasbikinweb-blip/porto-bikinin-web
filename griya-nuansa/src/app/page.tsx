import Image from 'next/image';
import Link from 'next/link';
import { BeforeAfter } from '@/components/BeforeAfter';
import { ArrowUpRight } from '@/components/icons';
import { CategoryBento, type BentoCategory } from '@/components/CategoryBento';
import { HeroShowcase, type ShowcaseItem } from '@/components/HeroShowcase';
import { ProjectFilter } from '@/components/ProjectFilter';
import { Container, Eyebrow, PillLink, SectionHeading } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { categories, categoryGroups, getCategory } from '@/data/categories';
import { faqs } from '@/data/faq';
import {
  featuredProjects,
  getBeforeAfterPairs,
  getProject,
  getProjectsByService,
  projects,
} from '@/data/projects';
import { services } from '@/data/services';
import { defaultWaMessage, site } from '@/data/site';
import type { Project } from '@/data/types';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  description:
    'Jasa arsitek dan desain interior di Serpong, Tangerang Selatan. Griya Nuansa merancang dan mengerjakan rumah, apartemen, kafe, gym, klinik, kantor, hingga industri di Jabodetabek.',
  path: '/',
});

// TODO: pilih foto hero terbaik (slug proyek)
const HERO_SLUG = 'monts-bakehouse';

const steps = [
  { title: 'Konsultasi', text: 'Ceritakan kebutuhan, gaya, dan rencana Anda lewat WhatsApp.' },
  { title: 'Survei', text: 'Kami meninjau lokasi dan mengukur ruang secara langsung.' },
  { title: 'Konsep & Desain', text: 'Konsep, layout, dan visual 3D disusun bersama Anda.' },
  { title: 'Penawaran', text: 'Rincian lingkup dan biaya disampaikan secara transparan.' },
  { title: 'Pelaksanaan & Serah Terima', text: 'Pengerjaan diawasi hingga ruang siap digunakan.' },
]; // TODO: sesuaikan dengan alur kerja asli Griya Nuansa

const marqueeWords = ['Arsitektur', 'Interior', 'Desain', 'Renovasi', 'Kitchen Set', 'Property'];

export default function HomePage() {
  const hero = getProject(HERO_SLUG) ?? projects[0];
  const featured = featuredProjects.filter((p) => p.slug !== hero?.slug).slice(0, 8);
  const toItem = (p: Project): ShowcaseItem => ({
    slug: p.slug,
    title: p.title,
    category: getCategory(p.category).label,
    scope: p.scope.join(', '),
    cover: p.cover,
  });
  // Hero memutar semua proyek, dimulai dari foto hero lalu proyek unggulan
  const showcase = [
    ...(hero ? [hero] : []),
    ...featured,
    ...projects.filter((p) => p !== hero && !featured.includes(p)),
  ].map(toItem);
  const bento: BentoCategory[] = categories
    .map((c) => ({
      slug: c.slug,
      label: c.label,
      description: categoryGroups.find((g) => g.slug === c.group)?.description ?? '',
      projects: projects.filter((p) => p.category === c.slug).map(toItem),
    }))
    .filter((c) => c.projects.length > 0);
  const totalPhotos = projects.reduce((n, p) => n + p.images.length, 0);
  const pairs = getBeforeAfterPairs();
  const categoryCount = categories.filter((c) =>
    projects.some((p) => p.category === c.slug),
  ).length;
  const stepsImage = featured[2] ?? projects[1];
  const faqImage = featured[3] ?? projects[2];

  return (
    <>
      {/* Hero terang: judul raksasa, foto utama, dan deretan proyek di sisi kanan */}
      <div className="hero-light px-2 pt-2 md:px-3 md:pt-3">
        <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-surface to-bg px-4 pt-24 pb-5 md:rounded-[2.25rem] md:px-10 md:pt-28 md:pb-10">
          <h1 className="fade-up text-center font-serif text-[16.5vw] leading-[0.85] font-light tracking-[-0.02em] uppercase md:text-[12.5vw]">
            Griya Nuansa
            <span className="sr-only"> · Studio arsitektur dan desain interior di Serpong</span>
          </h1>

          <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-12">
            {/* Kolom kiri: pengantar & CTA */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-3">
              <div>
                <p className="font-serif text-2xl leading-snug italic">
                  Merancang ruang yang bernuansa.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Studio arsitektur dan desain interior di Serpong, Tangerang Selatan. Dari konsep
                  hingga serah terima, untuk hunian dan ruang usaha di Jabodetabek.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5">
                <div>
                  <dt className="text-xs text-muted">Proyek</dt>
                  <dd className="font-serif text-4xl font-light">{projects.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Kategori ruang</dt>
                  <dd className="font-serif text-4xl font-light">{categoryCount}</dd>
                </div>
              </dl>
              <WhatsAppButton message={defaultWaMessage} className="self-start">
                Konsultasi via WhatsApp
              </WhatsAppButton>
            </div>

            {/* Foto utama + kartu samping (klik untuk mengganti foto) */}
            <HeroShowcase items={showcase} />
          </div>
        </section>
      </div>

      {/* Angka kepercayaan (dihitung dari data) */}
      <Container className="grid grid-cols-2 gap-8 py-16 text-center md:grid-cols-4 md:py-20">
        {[
          [String(projects.length), 'Proyek'],
          [String(categoryCount), 'Kategori ruang'],
          [String(totalPhotos), 'Foto dokumentasi'],
          // TODO: verifikasi angka pengikut saat rilis
          [site.instagramFollowers, 'Pengikut Instagram'],
        ].map(([n, label]) => (
          <div key={label}>
            <p className="font-serif text-5xl font-light md:text-6xl">{n}</p>
            <p className="mt-2 text-xs tracking-[0.25em] text-muted uppercase">{label}</p>
          </div>
        ))}
      </Container>

      {/* Kategori bergaya bento */}
      <section className="pb-24 md:pb-32">
        <Container>
          <CategoryBento categories={bento} />
        </Container>
      </section>

      {/* Karya kami: semua proyek, grid rapat dengan tab kategori */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-screen-2xl px-1 md:px-3">
          <h2 className="text-center font-serif text-4xl font-light md:text-6xl">
            Karya <em>Kami</em>
          </h2>
          <p className="mx-auto mt-4 mb-10 max-w-xl px-4 text-center text-muted">
            Seluruh {projects.length} proyek Griya Nuansa, dari rumah tinggal hingga fasilitas
            industri. <span className="text-fg">{site.hashtags[0]}</span>
          </p>
          <ProjectFilter projects={projects} headingLevel="h3" />
          <div className="mt-10 text-center">
            <PillLink href="/proyek/">Lihat Semua Proyek</PillLink>
          </div>
        </div>
      </section>

      {/* Layanan: blok krem dengan baris gambar-teks bergantian */}
      <Container>
        <section className="rounded-[2rem] bg-surface px-5 py-16 md:px-14 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-light md:text-6xl">
              Layanan <em>Kami</em>
            </h2>
            <p className="mt-4 text-muted">
              Dari gambar pertama hingga serah terima. Pilih satu layanan atau gabungkan sesuai
              kebutuhan proyek Anda.
            </p>
          </div>
          <ul className="mt-14 space-y-10 md:space-y-14">
            {services.map((s, i) => {
              const img = getProjectsByService(s.slug)[0]?.cover;
              return (
                <li
                  key={s.slug}
                  className="reveal grid items-center gap-6 md:grid-cols-12 md:gap-12"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-bg md:col-span-7 ${i % 2 ? 'md:order-last' : ''}`}
                  >
                    {img && (
                      <Image
                        src={img.thumb}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="md:col-span-5">
                    <span className="font-serif text-lg text-amber italic">0{i + 1}</span>
                    <h3 className="mt-2 font-serif text-3xl md:text-4xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{s.short}</p>
                    <Link
                      href={`/layanan/${s.slug}/`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      Lihat layanan <ArrowUpRight />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-14 text-center">
            <PillLink href="/layanan/">Semua Layanan</PillLink>
          </div>
        </section>
      </Container>

      {/* Pita teks berjalan (dekoratif) */}
      <div aria-hidden="true" className="mt-24 overflow-hidden bg-ink py-6 text-white md:mt-32">
        <div className="marquee flex w-max">
          {[0, 1].map((k) => (
            <p
              key={k}
              className="flex shrink-0 items-center font-serif text-5xl font-light uppercase md:text-7xl"
            >
              {marqueeWords.map((w) => (
                <span key={w} className="flex items-center">
                  <span className="px-6">{w}</span>
                  <span className="text-amber">/</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Cara kerja: foto besar dengan panel kaca */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="relative flex overflow-hidden rounded-[2rem] bg-ink p-3 pt-[60vw] md:min-h-[680px] md:justify-end md:p-8">
            {stepsImage && (
              <Image
                src={stepsImage.cover.src}
                alt={stepsImage.cover.alt}
                fill
                sizes="(min-width: 1536px) 1440px, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
            <div className="relative w-full rounded-[1.5rem] border border-white/20 bg-black/45 p-6 text-white backdrop-blur-xl md:w-[460px] md:p-8">
              <Eyebrow className="text-white/70">Cara Kerja</Eyebrow>
              <h2 className="mt-3 font-serif text-4xl font-light">
                Lima langkah, <em>tanpa kejutan</em>
              </h2>
              <ol className="mt-6 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 font-serif">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{s.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/75">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <WhatsAppButton message={defaultWaMessage} variant="light" className="mt-8">
                Mulai Konsultasi
              </WhatsAppButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Before-after: hanya tampil jika ada pasangan foto yang ditandai */}
      {pairs.length > 0 && (
        <section className="pb-24 md:pb-32">
          <Container>
            <SectionHeading eyebrow="Sebelum & Sesudah" title="Transformasi ruang" />
            <div className="mt-12 grid gap-10">
              {pairs.slice(0, 2).map((pair) => (
                <figure key={pair.after.src} className="overflow-hidden rounded-[1.5rem]">
                  <BeforeAfter before={pair.before} after={pair.after} />
                  <figcaption className="mt-3 text-sm text-muted">{pair.project.title}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ ringkas */}
      <section>
        <Container>
          <h2 className="text-center font-serif text-4xl font-light md:text-6xl">
            Pertanyaan yang <em>Sering Diajukan</em>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            {faqImage && (
              <div className="md:col-span-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={faqImage.cover.thumb}
                    alt={faqImage.cover.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Belum menemukan jawaban? Tanyakan langsung lewat WhatsApp, tim kami akan membantu.
                </p>
              </div>
            )}
            <div className="space-y-3 md:col-span-7 md:col-start-6">
              {faqs.slice(0, 5).map((f, i) => (
                <details key={f.q} className="group rounded-[1.5rem] border border-line">
                  <summary className="flex cursor-pointer items-center gap-4 rounded-full px-5 py-3.5 transition-colors group-open:bg-fg group-open:text-bg">
                    <span className="text-xs text-muted group-open:text-bg/70">/0{i + 1}</span>
                    <span className="flex-1 text-sm font-medium md:text-base">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/30 transition-transform group-open:rotate-90"
                    >
                      ›
                    </span>
                  </summary>
                  <p className="px-5 py-4 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
              <div className="pt-4">
                <PillLink href="/faq/">Semua FAQ</PillLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
