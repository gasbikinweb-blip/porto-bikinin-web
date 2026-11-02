import Image from 'next/image';
import Link from 'next/link';
import { AboutStrip } from '@/components/AboutStrip';
import { ArrowUpRight } from '@/components/icons';
import { Container, PageHeader } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getProject, getProjects } from '@/data/projects';
import { site } from '@/data/site';
import { type Lang, lp } from '@/i18n';
import { ui } from '@/i18n/ui';

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
    teamTitle: (
      <>
        Arsitek, desainer interior, <em>dan tim lapangan</em>
      </>
    ),
    teamText:
      'Profil tim akan segera ditampilkan. Sementara itu, kenali kami lebih dekat lewat WhatsApp.',
    teamCta: 'Ngobrol dengan tim',
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
    teamTitle: (
      <>
        Architects, interior designers, <em>and site team</em>
      </>
    ),
    teamText: 'Team profiles are coming soon. In the meantime, get to know us via WhatsApp.',
    teamCta: 'Talk to the team',
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

      {/* Tim */}
      <Container className="mt-24 text-center">
        <h2 className="font-serif text-4xl font-light md:text-5xl">{c.teamTitle}</h2>
        {/* TODO: tambahkan profil tim (nama & peran). Foto tim tersedia di assets_baru (zip). */}
        <p className="mx-auto mt-4 max-w-2xl text-muted">{c.teamText}</p>
        <div className="mt-8">
          <WhatsAppButton lang={lang} message={ui[lang].defaultWa}>
            {c.teamCta}
          </WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
