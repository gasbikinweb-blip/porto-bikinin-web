import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/Gallery';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, Eyebrow } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getCategory } from '@/data/categories';
import { getProject, getProjects } from '@/data/projects';
import { getService } from '@/data/services';
import { type Lang, lp } from '@/i18n';
import { pageMeta } from '@/lib/seo';

const copy = {
  id: {
    metaDesc: (title: string, scope: string, cat: string, loc?: string) =>
      `${title}: proyek ${scope.toLowerCase()} ${cat.toLowerCase()} oleh Griya Nuansa${loc ? ` di ${loc}` : ''}.`,
    home: 'Beranda',
    projects: 'Proyek',
    gallery: 'Galeri foto',
    details: 'Detail proyek',
    category: 'Kategori',
    scope: 'Lingkup',
    location: 'Lokasi',
    year: 'Tahun',
    services: 'Layanan',
    consult: 'Konsultasi Proyek Serupa',
    consultWa: (title: string, cat: string) =>
      `Halo Griya Nuansa, saya melihat proyek ${title} di website dan ingin konsultasi untuk ${cat.toLowerCase()} saya.`,
    quote: 'Minta Penawaran',
    quoteWa: (title: string) =>
      `Halo Griya Nuansa, saya ingin minta penawaran untuk proyek seperti ${title}.`,
    renderNote: 'Sebagian gambar adalah render desain 3D, bukan foto hasil pembangunan. ',
    waNote: 'Konsultasi dan penawaran dilakukan lewat WhatsApp.',
    related: (cat: string) => `Proyek ${cat} lainnya`,
  },
  en: {
    metaDesc: (title: string, scope: string, cat: string, loc?: string) =>
      `${title}: ${scope.toLowerCase()} for a ${cat.toLowerCase()} project by Griya Nuansa${loc ? ` in ${loc}` : ''}.`,
    home: 'Home',
    projects: 'Projects',
    gallery: 'Photo gallery',
    details: 'Project details',
    category: 'Category',
    scope: 'Scope',
    location: 'Location',
    year: 'Year',
    services: 'Services',
    consult: 'Consult a Similar Project',
    consultWa: (title: string, cat: string) =>
      `Hello Griya Nuansa, I saw the ${title} project on your website and would like to consult about my ${cat.toLowerCase()}.`,
    quote: 'Request a Quote',
    quoteWa: (title: string) =>
      `Hello Griya Nuansa, I would like to request a quotation for a project like ${title}.`,
    renderNote: 'Some images are 3D design renders, not photos of the finished build. ',
    waNote: 'Consultations and quotations are handled via WhatsApp.',
    related: (cat: string) => `More ${cat} projects`,
  },
};

export function projectStaticParams() {
  return getProjects('id').map((p) => ({ slug: p.slug }));
}

export function projectMeta(slug: string, lang: Lang) {
  const p = getProject(slug, lang);
  if (!p) return {};
  const cat = getCategory(p.category).label[lang];
  return pageMeta({
    lang,
    title: `${p.title} · ${cat}`,
    description: copy[lang].metaDesc(p.title, p.scope.join(', '), cat, p.location),
    path: `/proyek/${p.slug}/`,
    image: p.cover.src,
  });
}

export function ProjectDetailView({ slug, lang }: { slug: string; lang: Lang }) {
  const p = getProject(slug, lang);
  if (!p) notFound();
  const c = copy[lang];

  const cat = getCategory(p.category).label[lang];
  const hasRender = p.images.some((i) => i.kind === 'render');
  const related = getProjects(lang)
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);

  const details: [string, string][] = [
    [c.category, cat],
    [c.scope, p.scope.join(', ')],
    [c.location, p.location ?? '—'],
  ];
  if (p.year) details.push([c.year, String(p.year)]);

  return (
    <article>
      <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <Link href={lp(lang, '/')} className="hover:text-fg">
            {c.home}
          </Link>{' '}
          /{' '}
          <Link href={lp(lang, '/proyek/')} className="hover:text-fg">
            {c.projects}
          </Link>{' '}
          /{' '}
          <span aria-current="page" className="text-fg">
            {p.title}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Foto utama + thumbnail */}
          <div className="lg:col-span-7">
            <h2 className="sr-only">{c.gallery}</h2>
            <Gallery images={p.images} title={p.title} />
          </div>

          {/* Info proyek */}
          <div className="lg:col-span-5">
            <Eyebrow className="text-amber">{cat}</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{p.title}</h1>
            {p.summary && <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>}

            <h2 className="mt-10 font-serif text-2xl">{c.details}</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 py-3.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-4 py-3.5">
                <dt className="text-muted">{c.services}</dt>
                <dd className="col-span-2">
                  {p.services.map((sv, i) => {
                    const svc = getService(sv);
                    return svc ? (
                      <span key={sv}>
                        {i > 0 && ', '}
                        <Link
                          href={lp(lang, `/layanan/${sv}/`)}
                          className="underline underline-offset-4 hover:text-amber"
                        >
                          {svc.title[lang]}
                        </Link>
                      </span>
                    ) : null;
                  })}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton lang={lang} message={c.consultWa(p.title, cat)}>
                {c.consult}
              </WhatsAppButton>
              <WhatsAppButton lang={lang} variant="outline" message={c.quoteWa(p.title)}>
                {c.quote}
              </WhatsAppButton>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {hasRender && c.renderNote}
              {c.waNote}
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl md:text-4xl">{c.related(cat)}</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard lang={lang} project={r} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
