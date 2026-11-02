import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getProjectsByService } from '@/data/projects';
import { getService, services } from '@/data/services';
import { type Lang, lp } from '@/i18n';
import { pageMeta } from '@/lib/seo';

const copy = {
  id: {
    metaSuffix: 'Griya Nuansa, Serpong – Tangerang Selatan, melayani Jabodetabek.',
    eyebrow: 'Layanan',
    consultWa: (title: string) => `Halo Griya Nuansa, saya ingin konsultasi layanan ${title}.`,
    consult: (title: string) => `Konsultasi ${title}`,
    scope: 'Ruang lingkup',
    audience: 'Cocok untuk',
    examples: 'Contoh proyek',
    builder: 'Susun pesan konsultasi',
  },
  en: {
    metaSuffix: 'Griya Nuansa, Serpong – South Tangerang, serving Greater Jakarta.',
    eyebrow: 'Services',
    consultWa: (title: string) =>
      `Hello Griya Nuansa, I would like to consult about your ${title} service.`,
    consult: (title: string) => `Consult on ${title}`,
    scope: 'Scope of work',
    audience: 'Ideal for',
    examples: 'Example projects',
    builder: 'Compose your consultation message',
  },
};

export function serviceStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function serviceMeta(slug: string, lang: Lang) {
  const s = getService(slug);
  if (!s) return {};
  const sample = getProjectsByService(s.slug, lang)[0];
  return pageMeta({
    lang,
    title: s.title[lang],
    description: `${s.short[lang]} ${copy[lang].metaSuffix}`,
    path: `/layanan/${s.slug}/`,
    image: sample?.cover.src,
  });
}

export function ServiceDetailView({ slug, lang }: { slug: string; lang: Lang }) {
  const s = getService(slug);
  if (!s) notFound();
  const c = copy[lang];
  const title = s.title[lang];
  const related = getProjectsByService(s.slug, lang).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        title={title}
        intro={s.short[lang]}
        image={related[0]?.cover}
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <Link href={lp(lang, '/layanan/')} className="hover:text-fg">
              {c.eyebrow}
            </Link>{' '}
            / <span aria-current="page">{title}</span>
          </nav>
        }
      />
      <Container className="pt-16 md:pt-24">
        <div className="fade-up mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {s.description[lang].map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div className="mt-10">
              <WhatsAppButton lang={lang} message={c.consultWa(title)}>
                {c.consult(title)}
              </WhatsAppButton>
            </div>
          </div>
          <aside className="space-y-10 md:col-span-4 md:col-start-9">
            <div>
              <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{c.scope}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {s.scope[lang].map((x) => (
                  <li key={x} className="py-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs tracking-[0.2em] text-muted uppercase">{c.audience}</h2>
              <p className="mt-4">{s.audience[lang].join(', ')}</p>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-24">
          <h2 className="font-serif text-4xl">{c.examples}</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProjectCard lang={lang} project={p} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="mt-24">
        <h2 className="mb-10 font-serif text-4xl">{c.builder}</h2>
        <WaMessageBuilder defaultService={s.slug} />
      </Container>
    </>
  );
}
