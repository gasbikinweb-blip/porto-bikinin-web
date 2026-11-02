import Image from 'next/image';
import Link from 'next/link';
import { AboutStrip } from '@/components/AboutStrip';
import { ArrowUpRight } from '@/components/icons';
import { Container, Eyebrow, PageHeader } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { workflow } from '@/data/process';
import { getProject, getProjects } from '@/data/projects';
import { site } from '@/data/site';
import { type Lang, lp } from '@/i18n';
import { ui } from '@/i18n/ui';

// Foto tim hasil optimasi dari assets_baru (zip "GRIYA NUANSA WEBSITE"), lihat public/images/tim/
const TEAM = {
  story: { src: '/images/tim/tim-duduk.webp' },
  grid: [
    '/images/tim/tim-berdiri-thumb.webp',
    '/images/tim/tim-formasi-thumb.webp',
    '/images/tim/tim-kolaborasi-thumb.webp',
  ],
};

// TODO: tinjau ulang isi (ID & EN) bersama tim Griya Nuansa.
export const aboutCopy = {
  id: {
    metaTitle: 'Tentang Kami',
    metaDesc:
      'Mengenal Griya Nuansa, studio arsitektur dan desain interior di Serpong, Tangerang Selatan: cerita, filosofi desain, dan prinsip kerja kami.',
    eyebrow: 'Tentang',
    title: (
      <>
        Ruang yang tenang, <em>dirancang dengan teliti</em>
      </>
    ),
    photoCaption: 'Setiap ruang punya suasana yang ingin dirasakan penghuninya',
    why: (name: string) => `Mengapa ${name}`,
    whyIntro: (name: string, city: string) =>
      `${name} adalah studio arsitektur, desain interior, dan property management di ${city}. Nama “Nuansa” mewakili cara kami bekerja: menerjemahkan suasana menjadi tata ruang, material, dan cahaya yang tepat.`,
    reasons: (n: number, city: string, area: string) => [
      {
        title: 'Satu tim, desain hingga pengerjaan',
        text: 'Arsitektur, desain interior, kitchen set, hingga renovasi ditangani dalam satu alur, sehingga hasil akhir sesuai dengan gambar.',
      },
      {
        title: 'Fungsi lebih dulu, lalu rasa',
        text: 'Ruang yang baik terasa sederhana: alur geraknya jelas, cahaya alaminya cukup, dan materialnya jujur serta mudah dirawat. Dari dasar itu, nuansa dibangun lewat warna, tekstur, dan detail.',
      },
      {
        title: 'Beragam jenis ruang',
        text: `Portofolio kami mencakup ${n} proyek: rumah, apartemen, kost, kafe & bakery, gym, klinik, kantor, hingga industri.`,
      },
      {
        title: 'Dekat dengan Anda',
        text: `Berbasis di ${city} dan melayani seluruh Jabodetabek: ${area}.`,
      },
    ],
    principlesTitle: 'Prinsip kerja',
    principles: [
      {
        title: 'Detail',
        text: 'Setiap sambungan, material, dan ukuran diperhatikan sejak gambar kerja.',
      },
      { title: 'Transparan', text: 'Lingkup, biaya, dan progres disampaikan terbuka sejak awal.' },
      { title: 'Tepat Waktu', text: 'Jadwal disusun realistis dan dikawal sampai serah terima.' },
    ],
    ourServices: 'Layanan kami',
    banner: ['Merancang', 'ruang yang', 'bernuansa'],
    bannerText: 'Hunian dan ruang usaha di Jabodetabek, dari konsep hingga serah terima.',
    seeProjects: 'Lihat proyek kami',
    storyEyebrow: 'Tentang Griya Nuansa',
    storyTitle: 'Cerita Kami',
    // Sumber: Brief Web Griya Nuansa (bagian ABOUT)
    story: [
      'Sejak 2014, Griya Nuansa hadir untuk mendampingi mewujudkan ruang yang benar-benar terasa personal. Kami percaya bahwa setiap ruang memiliki cerita, kebutuhan, serta karakter yang berbeda. Karena itu, kami menghadirkan layanan terpadu dalam satu atap, mulai dari desain dan pembangunan arsitektur maupun interior, renovasi, hingga maintenance dan manajemen properti.',
      'Bagi kami, setiap proyek adalah sebuah kolaborasi. Kami meluangkan waktu untuk memahami kebutuhan, kebiasaan, dan harapan setiap klien, lalu menerjemahkannya menjadi ruang yang personal, fungsional, dan nyaman untuk dijalani.',
      'Dari gagasan pertama hingga bangunan berdiri dengan sempurna, kami mendampingi setiap proses dengan komunikasi yang terbuka, perhatian pada setiap detail, serta komitmen terhadap kualitas. Karena kami percaya, ruang yang dirancang dengan baik bukan hanya indah dipandang, tetapi juga mampu meningkatkan kualitas hidup orang-orang yang menggunakannya setiap hari.',
    ],
    storyAlt: 'Tim Griya Nuansa duduk bersama di studio berlatar putih',
    teamEyebrow: 'Tim Kami',
    teamTitle: 'Profesional di Balik Griya Nuansa',
    teamAlts: [
      'Tim Griya Nuansa berdiri berjajar di studio',
      'Tim Griya Nuansa berfoto bersama dengan formasi berdiri',
      'Tim Griya Nuansa menyatukan tangan sebagai simbol kolaborasi',
    ],
    teamCta: 'Ngobrol dengan tim',
    visionTitle: 'Visi',
    vision: [
      'Menjadi perusahaan kontraktor yang menyediakan service design terpercaya dan inovatif.',
      'Menjadi perusahaan konstruksi yang beradaptasi dengan perkembangan teknologi, material, maupun perkembangan dunia.',
      'Menjadi perusahaan konstruksi yang mengutamakan kualitas, kenyamanan penghuni dengan harga yang sepadan.',
    ],
    missionTitle: 'Misi',
    mission: [
      'Memberikan jasa konstruksi dan design dengan kualitas dan sesuai dengan kebutuhan klien.',
      'Menjaga kepuasan customer melalui layanan yang profesional dan tepercaya.',
      'Memberikan peluang dan lapangan pekerjaan dengan sistem kerja yang nyaman dan profesional.',
      'Berkembang bersama sumber daya manusia pilihan untuk terus melakukan inovasi dan meningkatkan kualitas layanan.',
    ],
    workflowEyebrow: 'Proses Kerja Kami',
    workflowTitle: 'Dari gagasan hingga serah terima',
    closing:
      'Karena sejauh apa pun perjalanan hidup membawa kita, rumah akan selalu menjadi tempat pulang. Tempat di mana keluarga menunggu dengan pelukan penuh kehangatan.',
  },
  en: {
    metaTitle: 'About Us',
    metaDesc:
      'Get to know Griya Nuansa, an architecture and interior design studio in Serpong, South Tangerang: our story, design philosophy, and working principles.',
    eyebrow: 'About',
    title: (
      <>
        Calm spaces, <em>carefully designed</em>
      </>
    ),
    photoCaption: 'Every space has a mood its occupants want to feel',
    why: (name: string) => `Why ${name}`,
    whyIntro: (name: string, city: string) =>
      `${name} is an architecture, interior design, and property management studio in ${city}. The name “Nuansa” (nuance) reflects how we work: translating a mood into the right layout, materials, and light.`,
    reasons: (n: number, city: string, area: string) => [
      {
        title: 'One team, from design to build',
        text: 'Architecture, interior design, kitchen sets, and renovation are handled in one workflow, so the finished result matches the drawings.',
      },
      {
        title: 'Function first, then feeling',
        text: 'A good space feels simple: clear circulation, enough natural light, and honest, easy-to-maintain materials. On that foundation, atmosphere is built through colour, texture, and detail.',
      },
      {
        title: 'Many kinds of spaces',
        text: `Our portfolio covers ${n} projects: homes, apartments, boarding houses, cafés & bakeries, gyms, clinics, offices, and industrial buildings.`,
      },
      {
        title: 'Close to you',
        text: `Based in ${city} and serving all of Greater Jakarta: ${area}.`,
      },
    ],
    principlesTitle: 'Working principles',
    principles: [
      {
        title: 'Detail',
        text: 'Every joint, material, and dimension is considered from the drawings onward.',
      },
      {
        title: 'Transparent',
        text: 'Scope, costs, and progress are communicated openly from the start.',
      },
      { title: 'On Time', text: 'Schedules are realistic and followed through to handover.' },
    ],
    ourServices: 'Our services',
    banner: ['Designing', 'spaces with', 'nuance'],
    bannerText: 'Homes and business spaces across Greater Jakarta, from concept to handover.',
    seeProjects: 'See our projects',
    storyEyebrow: 'About Griya Nuansa',
    storyTitle: 'Our Background Story',
    story: [
      'Since 2014, Griya Nuansa has been helping people create spaces that feel truly personal. We believe every space has its own story, needs, and character. That is why we offer integrated services under one roof, from architectural and interior design and construction to renovation, maintenance, and property management.',
      'For us, every project is a collaboration. We take the time to understand the needs, habits, and expectations of each client, then translate them into spaces that are personal, functional, and comfortable to live in.',
      'From the first idea to the finished building, we accompany every step with open communication, attention to detail, and a commitment to quality. Because we believe a well-designed space is not only beautiful to look at, but also improves the quality of life of the people who use it every day.',
    ],
    storyAlt: 'The Griya Nuansa team sitting together in a white studio',
    teamEyebrow: 'Our Team',
    teamTitle: 'Professionals Behind Griya Nuansa',
    teamAlts: [
      'The Griya Nuansa team standing in a row in the studio',
      'The Griya Nuansa team posing together in a standing formation',
      'The Griya Nuansa team joining hands as a symbol of collaboration',
    ],
    teamCta: 'Talk to the team',
    visionTitle: 'Vision',
    vision: [
      'To be a trusted and innovative design-service contractor.',
      'To be a construction company that adapts to technology, material, and global developments.',
      'To be a construction company that prioritises quality and resident comfort at a reasonable price.',
    ],
    missionTitle: 'Mission',
    mission: [
      'Provide quality construction and design services in accordance with client needs.',
      'Maintain customer satisfaction through professional and trusted services.',
      'Provide job opportunities with comfortable and professional working systems.',
      'Grow together with selected human resources to continue to innovate and improve service quality.',
    ],
    workflowEyebrow: 'Our Workflow',
    workflowTitle: 'From the first idea to handover',
    closing:
      'Because no matter how far life takes us, home will always be the place we return to. The place where family awaits with a warm embrace.',
  },
};

export function AboutView({ lang }: { lang: Lang }) {
  const c = aboutCopy[lang];
  const projects = getProjects(lang);
  const city = site.cityL[lang];
  const reasons = c.reasons(projects.length, city, site.serviceArea.join(', '));
  const img = getProject('al-house', lang)?.cover; // TODO: pilih foto untuk halaman Tentang
  const side = getProject('menteng-park-apartment', lang)?.cover ?? projects[1]?.cover;
  const banner = getProject('paradigm-fitness', lang)?.cover ?? projects[2]?.cover;

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} image={img} title={c.title} />

      {/* Cerita kami: foto tim duduk | teks latar belakang dari brief */}
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <Eyebrow>{c.storyEyebrow}</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{c.storyTitle}</h2>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[5/4] overflow-hidden rounded-md bg-bg">
              <Image
                src={TEAM.story.src}
                alt={c.storyAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
              {c.story.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Visi & Misi (sumber: brief) */}
      <section className="bg-surface pb-20 md:pb-28">
        <Container className="grid gap-5 md:grid-cols-2">
          {(
            [
              [c.visionTitle, c.vision],
              [c.missionTitle, c.mission],
            ] as const
          ).map(([title, items]) => (
            <div key={title} className="rounded-md bg-bg p-6 ring-1 ring-line md:p-10">
              <h2 className="font-serif text-3xl">{title}</h2>
              <ol className="mt-6 space-y-4">
                {items.map((item, i) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed text-muted">
                    <span className="font-serif text-base text-amber">{i + 1}</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </Container>
      </section>

      {/* Foto + akordeon "Mengapa Griya Nuansa" */}
      <section className="py-20 md:py-28">
        <Container>
          <AboutStrip lang={lang} image={getProject('aa-house', lang)?.cover} />
        </Container>
      </section>

      <Container className="grid gap-4 md:grid-cols-2">
        {side && (
          <div className="relative min-h-[420px] overflow-hidden rounded-md bg-surface">
            <Image
              src={side.src}
              alt={side.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <p className="absolute right-5 bottom-5 max-w-[16rem] rounded-xl bg-black/35 px-3 py-2 text-right text-[11px] leading-relaxed tracking-wider text-white uppercase backdrop-blur-md">
              {c.photoCaption}
            </p>
          </div>
        )}
        <div className="rounded-md bg-surface p-6 md:p-10">
          <h2 className="font-serif text-4xl leading-[1.1] md:text-5xl">{c.why(site.name)}</h2>
          {/* TODO: ganti dengan cerita studio yang asli (tahun berdiri, pendiri, perjalanan) */}
          <p className="mt-4 text-xs leading-relaxed tracking-wider text-muted uppercase">
            {c.whyIntro(site.name, city)}
          </p>
          <div className="mt-6 divide-y divide-line border-t border-line">
            {reasons.map((r, i) => (
              <details key={r.title} className="group py-4" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium tracking-wide uppercase">
                  {r.title}
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      {/* Prinsip kerja: tiga kartu, yang pertama gelap */}
      <Container className="mt-4">
        <h2 className="sr-only">{c.principlesTitle}</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {c.principles.map((p, i) => (
            <li
              key={p.title}
              className={`flex min-h-[240px] flex-col justify-between rounded-md p-6 md:p-8 ${
                i === 0 ? 'bg-ink text-white' : 'bg-surface'
              }`}
            >
              <div>
                <h3 className="font-serif text-3xl">{p.title}</h3>
                <p
                  className={`mt-4 text-xs leading-relaxed tracking-wider uppercase ${i === 0 ? 'text-white/70' : 'text-muted'}`}
                >
                  {p.text}
                </p>
              </div>
              <Link
                href={lp(lang, '/layanan/')}
                className="mt-8 inline-flex items-center gap-1 self-end text-[11px] tracking-[0.2em] uppercase hover:underline"
              >
                {c.ourServices} <ArrowUpRight className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* Banner lebar dengan judul besar */}
      {banner && (
        <Container className="mt-4">
          <div className="relative overflow-hidden rounded-md bg-surface">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 1536px) 1440px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/70 to-bg/10" />
            <div className="relative flex min-h-[420px] flex-col justify-between gap-10 p-6 md:flex-row md:items-center md:p-12">
              <div>
                <p className="font-serif text-4xl leading-[1.1] md:text-6xl">
                  {c.banner[0]}
                  <br />
                  {c.banner[1]}
                  <br />
                  {c.banner[2]}
                </p>
                <p className="mt-6 max-w-sm text-xs leading-relaxed tracking-wider text-muted uppercase">
                  {c.bannerText}
                </p>
              </div>
              <Link
                href={lp(lang, '/proyek/')}
                className="group flex h-28 w-28 shrink-0 items-center justify-center self-end rounded-full border border-current/40 md:h-36 md:w-36 md:self-auto"
              >
                <ArrowUpRight className="h-8 w-8 transition-transform group-hover:rotate-45" />
                <span className="sr-only">{c.seeProjects}</span>
              </Link>
            </div>
          </div>
        </Container>
      )}

      {/* Proses kerja 6 langkah (sumber: brief) */}
      <Container className="mt-24">
        <Eyebrow>{c.workflowEyebrow}</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{c.workflowTitle}</h2>
        <ol className="mt-10 grid gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {workflow[lang].map((step, i) => (
            <li key={step.title}>
              <span className="font-serif text-3xl text-amber">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* Tim: tiga foto tim (sumber: assets_baru, foto asli dari zip) */}
      <Container className="mt-24">
        <Eyebrow>{c.teamEyebrow}</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{c.teamTitle}</h2>
        {/* TODO: tambahkan profil per anggota (nama & peran) bila datanya tersedia */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.grid.map((src, i) => (
            <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface">
              <Image
                src={src}
                alt={c.teamAlts[i] ?? ''}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <WhatsAppButton lang={lang} message={ui[lang].defaultWa}>
            {c.teamCta}
          </WhatsAppButton>
        </div>
      </Container>

      {/* Penutup (sumber: brief) */}
      <Container className="mt-24 text-center">
        <span aria-hidden="true" className="mx-auto block h-px w-16 bg-amber" />
        <p className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-snug italic md:text-4xl">
          {c.closing}
        </p>
      </Container>
    </>
  );
}
