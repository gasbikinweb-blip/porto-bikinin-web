import Image from 'next/image';
import Link from 'next/link';
import { AboutStrip } from '@/components/AboutStrip';
import { BeforeAfter } from '@/components/BeforeAfter';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { ProjectCard } from '@/components/ProjectCard';
import { RotatingText } from '@/components/RotatingText';
import { ServiceCard } from '@/components/ServiceCard';
import { ButtonLink, Container, Eyebrow, SectionHeading } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { featuredProjects, getBeforeAfterPairs, getProject, projects } from '@/data/projects';
import { services } from '@/data/services';
import { defaultWaMessage, site } from '@/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  description:
    'Jasa arsitek dan desain interior di Serpong, Tangerang Selatan. Griya Nuansa merancang dan mengerjakan rumah, apartemen, kafe, gym, klinik, kantor, hingga industri di Jabodetabek.',
  path: '/',
});

// TODO: pilih foto panel hero & "Siapa Kami" terbaik (slug proyek)
const PANEL_SLUGS = ['al-house', 'aa-house', 'im-house', 'altuera-tower-southgate'];

// Judul hero yang berganti otomatis
const taglines = [
  'Merancang ruang yang bernuansa.',
  'Mewujudkan rumah impian.',
  'Interior yang hangat & fungsional.',
  'Dari konsep hingga serah terima.',
];
const ABOUT_SLUG = 'altuera-tower-southgate';

const steps = [
  { title: 'Konsultasi', text: 'Ceritakan kebutuhan, gaya, dan rencana Anda lewat WhatsApp.' },
  { title: 'Survei', text: 'Kami meninjau lokasi dan mengukur ruang secara langsung.' },
  { title: 'Konsep & Desain', text: 'Konsep, layout, dan visual 3D disusun bersama Anda.' },
  { title: 'Penawaran', text: 'Rincian lingkup dan biaya disampaikan secara transparan.' },
  { title: 'Pelaksanaan & Serah Terima', text: 'Pengerjaan diawasi hingga ruang siap digunakan.' },
]; // TODO: sesuaikan dengan alur kerja asli Griya Nuansa

export default function HomePage() {
  const panels = PANEL_SLUGS.map((s) => getProject(s)).filter((p) => p !== undefined);
  const about = getProject(ABOUT_SLUG)?.cover;
  // Proyek unggulan dulu, lalu sisanya: semua proyek bisa digeser di carousel
  const carousel = [...featuredProjects, ...projects.filter((p) => !p.featured)];
  const pairs = getBeforeAfterPairs();

  return (
    <>
      {/* Hero split: teks di kiri, panel-panel foto vertikal di kanan */}
      <section className="grid min-h-[calc(100svh-5rem)] bg-bg lg:grid-cols-2">
        <div className="flex items-center px-5 py-16 md:px-10 lg:py-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <div className="fade-up max-w-xl">
            <p className="text-sm text-muted">
              Tempat inovasi bertemu desain yang tak lekang waktu
            </p>
            <h1 className="mt-5 text-5xl leading-[1.02] font-semibold tracking-tight uppercase md:text-6xl xl:text-7xl">
              <span className="sr-only">
                Griya Nuansa, studio arsitektur dan desain interior di Serpong:{' '}
              </span>
              <RotatingText items={taglines} />
            </h1>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-fg">{site.name}</strong> adalah studio
              arsitektur dan desain interior di Serpong, Tangerang Selatan. Kami mendampingi setiap
              tahap, dari konsep hingga serah terima, untuk hunian dan ruang usaha di Jabodetabek.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/layanan/" variant="solid">
                Layanan Kami
              </ButtonLink>
              <WhatsAppButton message={defaultWaMessage} variant="outline">
                Konsultasi
              </WhatsAppButton>
            </div>
          </div>
        </div>
        {/* Panel foto: yang disorot melebar saat diarahkan kursor */}
        <ul className="group/panels flex h-[60svh] gap-1 lg:h-auto">
          {panels.map((p, i) => (
            <li
              key={p.slug}
              className={`relative overflow-hidden transition-[flex-grow] duration-700 ease-out hover:flex-[4] ${
                i === 0 ? 'flex-[3]' : 'flex-1'
              }`}
            >
              <Link href={`/proyek/${p.slug}/`} className="block h-full">
                <Image
                  src={i === 0 ? p.cover.src : p.cover.thumb}
                  alt={p.cover.alt}
                  fill
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  sizes={
                    i === 0 ? '(min-width: 1024px) 30vw, 60vw' : '(min-width: 1024px) 15vw, 30vw'
                  }
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-xs tracking-[0.15em] text-white uppercase opacity-0 transition-opacity duration-500 group-hover/panels:opacity-100">
                  {p.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Siapa kami: foto | teks | angka */}
      <section className="py-20 md:py-28">
        <Container>
          <AboutStrip
            image={about}
            action={<ButtonLink href="/tentang/">Tentang Studio</ButtonLink>}
          />
        </Container>
      </section>

      {/* Layanan */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            center
            eyebrow="Layanan Kami"
            title={
              <>
                Desain menyeluruh untuk ruang <em>yang bermakna</em>
              </>
            }
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-md bg-ink p-8 text-white">
              <div>
                <Eyebrow className="text-white/60">Belum yakin?</Eyebrow>
                <p className="mt-4 font-serif text-3xl leading-tight">
                  Ceritakan kebutuhan Anda, kami bantu memilih layanan yang tepat.
                </p>
              </div>
              <WhatsAppButton
                message={defaultWaMessage}
                variant="light"
                className="mt-8 self-start"
              >
                Tanya via WhatsApp
              </WhatsAppButton>
            </li>
          </ul>
        </Container>
      </section>

      {/* Proyek pilihan: judul di kiri, carousel di kanan */}
      <section className="pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3 lg:pt-14">
            <Eyebrow>Proyek Pilihan</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
              Ruang yang bercerita sendiri.
            </h2>
            <p className="mt-4 text-sm text-muted">
              {projects.length} proyek: rumah, apartemen, kafe, gym, klinik, kantor, hingga
              industri.
            </p>
            <ButtonLink href="/proyek/" className="mt-8">
              Semua Proyek
            </ButtonLink>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <FeaturedCarousel label="Proyek pilihan, geser untuk melihat lainnya">
              {carousel.map((p) => (
                <li
                  key={p.slug}
                  className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <ProjectCard project={p} sizes="(min-width: 1024px) 25vw, 80vw" />
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
            <Eyebrow>Cara Kerja</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
              Lima langkah.
              <br />
              Tanpa kejutan.
            </h2>
            <ButtonLink href="/faq/" className="mt-8">
              Pertanyaan Umum
            </ButtonLink>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {steps.map((s, i) => (
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
            <SectionHeading eyebrow="Sebelum & Sesudah" title="Transformasi ruang" />
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
    </>
  );
}
