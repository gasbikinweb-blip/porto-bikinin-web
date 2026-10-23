import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/Gallery';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, Eyebrow } from '@/components/ui';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getCategory } from '@/data/categories';
import { getProject, projects } from '@/data/projects';
import { getService } from '@/data/services';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cat = getCategory(p.category).label;
  return pageMeta({
    title: `${p.title} · ${cat}`,
    description: `${p.title}: proyek ${p.scope.join(', ').toLowerCase()} ${cat.toLowerCase()} oleh Griya Nuansa${p.location ? ` di ${p.location}` : ''}.`,
    path: `/proyek/${p.slug}/`,
    image: p.cover.src,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const cat = getCategory(p.category);
  const hasRender = p.images.some((i) => i.kind === 'render');
  const related = projects
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);

  const details: [string, string][] = [
    ['Kategori', cat.label],
    ['Lingkup', p.scope.join(', ')],
    ['Lokasi', p.location ?? '—'],
  ];
  if (p.year) details.push(['Tahun', String(p.year)]);

  return (
    <article>
      <Container className="pt-10 pb-16 md:pt-14 md:pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <Link href="/" className="hover:text-fg">
            Beranda
          </Link>{' '}
          /{' '}
          <Link href="/proyek/" className="hover:text-fg">
            Proyek
          </Link>{' '}
          /{' '}
          <span aria-current="page" className="text-fg">
            {p.title}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Foto utama + thumbnail */}
          <div className="lg:col-span-7">
            <h2 className="sr-only">Galeri foto</h2>
            <Gallery images={p.images} title={p.title} />
          </div>

          {/* Info proyek */}
          <div className="lg:col-span-5">
            <Eyebrow className="text-amber">{cat.label}</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl leading-[1.1] md:text-5xl">{p.title}</h1>
            {p.summary && <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>}

            <h2 className="mt-10 font-serif text-2xl">Detail proyek</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 py-3.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-4 py-3.5">
                <dt className="text-muted">Layanan</dt>
                <dd className="col-span-2">
                  {p.services.map((sv, i) => {
                    const svc = getService(sv);
                    return svc ? (
                      <span key={sv}>
                        {i > 0 && ', '}
                        <Link
                          href={`/layanan/${sv}/`}
                          className="underline underline-offset-4 hover:text-amber"
                        >
                          {svc.title}
                        </Link>
                      </span>
                    ) : null;
                  })}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton
                message={`Halo Griya Nuansa, saya melihat proyek ${p.title} di website dan ingin konsultasi untuk ${cat.label.toLowerCase()} saya.`}
              >
                Konsultasi Proyek Serupa
              </WhatsAppButton>
              <WhatsAppButton
                variant="outline"
                message={`Halo Griya Nuansa, saya ingin minta penawaran untuk proyek seperti ${p.title}.`}
              >
                Minta Penawaran
              </WhatsAppButton>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {hasRender &&
                'Sebagian gambar adalah render desain 3D, bukan foto hasil pembangunan. '}
              Konsultasi dan penawaran dilakukan lewat WhatsApp.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl md:text-4xl">Proyek {cat.label} lainnya</h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard project={r} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
