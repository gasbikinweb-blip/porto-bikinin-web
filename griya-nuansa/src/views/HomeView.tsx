import Image from 'next/image';
import { AboutStrip } from '@/components/AboutStrip';
import { BeforeAfter } from '@/components/BeforeAfter';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { ProjectCard } from '@/components/ProjectCard';
import { ServiceCard } from '@/components/ServiceCard';
import { InstagramIcon, PinterestIcon, TiktokIcon, YoutubeIcon } from '@/components/icons';
import { ButtonLink, Container, Eyebrow, SectionHeading } from '@/components/ui';
import { ExternalLink, WhatsAppButton } from '@/components/WhatsApp';
import { getBeforeAfterPairs, getFeaturedProjects, getProject, getProjects } from '@/data/projects';
import { services } from '@/data/services';
import { workflow } from '@/data/process';
import { site, stats } from '@/data/site';
import { type Lang, lp } from '@/i18n';
import { ui } from '@/i18n/ui';

// TODO: ganti foto hero bila ada foto lanskap yang lebih kuat (minimal lebar 2000px)
const HERO_SLUG = 'marigold-tower';
const ABOUT_SLUG = 'altuera-tower-southgate';

const copy = {
  id: {
    // Teks hero sesuai Brief Web Griya Nuansa (assets_baru)
    heroLabel: ['Arsitektur', 'Interior', 'Manajemen Properti', 'Kontraktor', 'Konsultan'],
    heroTitle: (
      <>
        Rumah bukan hanya tentang <em>ruang</em>.
      </>
    ),
    heroText:
      'Griya Nuansa percaya, sejauh apa pun perjalanan hidup membawa kita, rumah akan selalu menjadi tempat pulang, tempat di mana keluarga menunggu dengan pelukan penuh kehangatan.',
    heroPortfolio: 'Lihat Portofolio',
    heroConsult: 'Konsultasi Sekarang',
    aboutCta: 'Tentang Studio',
    servicesEyebrow: 'Layanan Kami',
    servicesTitle: (
      <>
        Desain menyeluruh untuk ruang <em>yang bermakna</em>
      </>
    ),
    unsure: 'Belum yakin?',
    unsureText: 'Ceritakan kebutuhan Anda, kami bantu memilih layanan yang tepat.',
    askWa: 'Tanya via WhatsApp',
    featuredEyebrow: 'Proyek Pilihan',
    featuredTitle: 'Ruang yang bercerita sendiri.',
    featuredText: (n: number) =>
      `${n} proyek: rumah, apartemen, kafe, gym, klinik, kantor, hingga industri.`,
    allProjects: 'Semua Proyek',
    carouselLabel: 'Proyek pilihan, geser untuk melihat lainnya',
    howEyebrow: 'Cara Kerja',
    howTitle1: 'Enam langkah.',
    howTitle2: 'Tanpa kejutan.',
    faq: 'Pertanyaan Umum',
    baEyebrow: 'Sebelum & Sesudah',
    baTitle: 'Transformasi ruang',
    socialEyebrow: 'Media Sosial',
    socialTitle: (
      <>
        Ikuti karya kami <em>setiap hari</em>
      </>
    ),
    socialMore: 'Lihat Selengkapnya',
    social: {
      youtube: 'Video perjalanan proyek, dari konsep hingga serah terima.',
      instagram: 'Foto proyek terbaru dan inspirasi ruang.',
      tiktok: 'Cuplikan singkat proses dan hasil pengerjaan.',
      pinterest: 'Kumpulan inspirasi desain arsitektur dan interior.',
    },
  },
  en: {
    heroLabel: ['Architecture', 'Interior', 'Property Management', 'Contractor', 'Consultant'],
    heroTitle: (
      <>
        A house is <em>more</em> than just spaces.
      </>
    ),
    heroText:
      'Griya Nuansa believes that no matter how far life takes us, home will always be the place we return to, where family awaits with a warm embrace.',
    heroPortfolio: 'View Portfolio',
    heroConsult: 'Consult Now',
    aboutCta: 'About the Studio',
    servicesEyebrow: 'Our Services',
    servicesTitle: (
      <>
        Complete design for <em>meaningful spaces</em>
      </>
    ),
    unsure: 'Not sure yet?',
    unsureText: "Tell us what you need, and we'll help you choose the right service.",
    askWa: 'Ask via WhatsApp',
    featuredEyebrow: 'Selected Projects',
    featuredTitle: 'Spaces that tell their own story.',
    featuredText: (n: number) =>
      `${n} projects: homes, apartments, cafés, gyms, clinics, offices, and industrial buildings.`,
    allProjects: 'All Projects',
    carouselLabel: 'Selected projects, scroll to see more',
    howEyebrow: 'How We Work',
    howTitle1: 'Six steps.',
    howTitle2: 'No surprises.',
    faq: 'FAQ',
    baEyebrow: 'Before & After',
    baTitle: 'Space transformations',
    socialEyebrow: 'Social Media',
    socialTitle: (
      <>
        Follow our work <em>every day</em>
      </>
    ),
    socialMore: 'See More',
    social: {
      youtube: 'Project journey videos, from concept to handover.',
      instagram: 'Latest project photos and space inspiration.',
      tiktok: 'Short clips of our process and finished work.',
      pinterest: 'A collection of architecture and interior design inspiration.',
    },
  },
};

export function HomeView({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const t = ui[lang];
  const projects = getProjects(lang);
  const hero = getProject(HERO_SLUG, lang)?.cover;
  const about = getProject(ABOUT_SLUG, lang)?.cover;
  // Proyek unggulan dulu, lalu sisanya: semua proyek bisa digeser di carousel
  const carousel = [...getFeaturedProjects(lang), ...projects.filter((p) => !p.featured)];
  const pairs = getBeforeAfterPairs(lang);

  return (
    <>
      {/* Hero: foto penuh yang dipudarkan lapisan warna latar (terang/gelap ikut tema), teks gelap di atasnya */}
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden">
        {hero && (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="-z-20 object-cover"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/80" />
        <Container className="flex w-full flex-1 items-center py-20">
          <div className="fade-up mx-auto w-full max-w-4xl">
            <p className="text-[11px] font-light tracking-[0.22em] text-muted uppercase">
              {c.heroLabel.join(' | ')}
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">{c.heroTitle}</h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{c.heroText}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={lp(lang, '/proyek/')}>{c.heroPortfolio}</ButtonLink>
              <WhatsAppButton lang={lang} message={t.defaultWa}>
                {c.heroConsult}
              </WhatsAppButton>
            </div>
            {/* Statistik dari brief klien */}
            <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-6">
              {stats[lang].map(([n, label]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[10px] font-light tracking-[0.2em] text-muted uppercase">
                    {label}
                  </dt>
                  <dd className="font-serif text-4xl">{n}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
        <div aria-hidden="true" className="flex flex-col items-center gap-2 pb-8 text-muted">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="h-10 w-px bg-current/50" />
        </div>
      </section>

      {/* Siapa kami: foto | teks | angka */}
      <section className="py-20 md:py-28">
        <Container>
          <AboutStrip
            lang={lang}
            image={about}
            action={<ButtonLink href={lp(lang, '/tentang/')}>{c.aboutCta}</ButtonLink>}
          />
        </Container>
      </section>

      {/* Layanan */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading center eyebrow={c.servicesEyebrow} title={c.servicesTitle} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard lang={lang} service={s} />
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-md bg-ink p-8 text-white">
              <div>
                <Eyebrow className="text-white/60">{c.unsure}</Eyebrow>
                <p className="mt-4 font-serif text-3xl leading-tight">{c.unsureText}</p>
              </div>
              <WhatsAppButton
                lang={lang}
                message={t.defaultWa}
                variant="light"
                className="mt-8 self-start"
              >
                {c.askWa}
              </WhatsAppButton>
            </li>
          </ul>
        </Container>
      </section>

      {/* Proyek pilihan: judul di kiri, carousel di kanan */}
      <section className="pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3 lg:pt-14">
            <Eyebrow>{c.featuredEyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
              {c.featuredTitle}
            </h2>
            <p className="mt-4 text-sm text-muted">{c.featuredText(projects.length)}</p>
            <ButtonLink href={lp(lang, '/proyek/')} className="mt-8">
              {c.allProjects}
            </ButtonLink>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <FeaturedCarousel label={c.carouselLabel}>
              {carousel.map((p) => (
                <li
                  key={p.slug}
                  className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <ProjectCard lang={lang} project={p} sizes="(min-width: 1024px) 25vw, 80vw" />
                </li>
              ))}
            </FeaturedCarousel>
          </div>
        </Container>
      </section>

      {/* Cara kerja (slot ini bisa diganti testimoni asli bila sudah tersedia) */}
      <section className="bg-surface py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{c.howEyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
              {c.howTitle1}
              <br />
              {c.howTitle2}
            </h2>
            <ButtonLink href={lp(lang, '/faq/')} className="mt-8">
              {c.faq}
            </ButtonLink>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {workflow[lang].map((s, i) => (
              <li key={s.title} className="rounded-md bg-bg p-6">
                <span className="font-serif text-3xl text-amber">0{i + 1}</span>
                <h3 className="mt-4 font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Before-after: hanya tampil jika ada pasangan foto yang ditandai */}
      {pairs.length > 0 && (
        <section className="pt-20 md:pt-28">
          <Container>
            <SectionHeading eyebrow={c.baEyebrow} title={c.baTitle} />
            <div className="mt-12 grid gap-10">
              {pairs.slice(0, 2).map((pair) => (
                <figure key={pair.after.src} className="overflow-hidden rounded-md">
                  <BeforeAfter before={pair.before} after={pair.after} />
                  <figcaption className="mt-3 text-sm text-muted">{pair.project.title}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Preview media sosial (sesuai brief): tautan keluar, tanpa embed pihak ketiga */}
      <section className="pt-20 md:pt-28">
        <Container>
          <SectionHeading center eyebrow={c.socialEyebrow} title={c.socialTitle} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ['YouTube', site.social.youtube, YoutubeIcon, c.social.youtube, '@griyanuansaid'],
                [
                  'Instagram',
                  site.social.instagram,
                  InstagramIcon,
                  c.social.instagram,
                  '@griyanuansa.id',
                ],
                ['TikTok', site.social.tiktok, TiktokIcon, c.social.tiktok, '@griyanuansa.id'],
                [
                  'Pinterest',
                  site.social.pinterest,
                  PinterestIcon,
                  c.social.pinterest,
                  'griyanuansaid',
                ],
              ] as const
            ).map(([name, href, Icon, text, handle]) => (
              <li key={name}>
                <ExternalLink
                  lang={lang}
                  href={href}
                  className="group flex h-full flex-col rounded-md bg-surface p-6 transition-shadow hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg ring-1 ring-line">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-5 font-serif text-2xl">{name}</span>
                  <span className="mt-1 text-xs tracking-wider text-muted">{handle}</span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed font-light text-muted">
                    {text}
                  </span>
                  <span className="mt-6 text-[11px] font-medium tracking-[0.18em] uppercase group-hover:underline group-hover:underline-offset-4">
                    {c.socialMore} ↗
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
