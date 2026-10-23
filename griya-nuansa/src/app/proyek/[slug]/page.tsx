import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/Gallery';
import { KindBadge } from '@/components/KindBadge';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, PageHeader } from '@/components/ui';
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
  const gallery = p.images.slice(1);

  const details: [string, string][] = [
    ['Kategori', cat.label],
    ['Lingkup', p.scope.join(', ')],
    ['Lokasi', p.location ?? '—'],
  ];
  if (p.year) details.push(['Tahun', String(p.year)]);

  return (
    <article>
      <PageHeader
        eyebrow={cat.label}
        title={p.title}
        intro={p.summary}
        image={p.cover}
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <Link href="/proyek/" className="hover:text-white">
              Proyek
            </Link>{' '}
            / <span aria-current="page">{p.title}</span>
          </nav>
        }
      >
        <KindBadge kind={p.cover.kind} className="!top-24 !left-5 md:!top-28 md:!left-12" />
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {details.map(([k, v]) => (
            <div
              key={k}
              className="rounded-2xl border border-white/20 bg-black/30 px-4 py-3 backdrop-blur-md"
            >
              <dt className="text-[11px] tracking-[0.2em] text-white/60 uppercase">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Container className="py-16 md:py-24">
        {hasRender && (
          <p className="mb-8 text-sm text-muted">
            Sebagian gambar pada proyek ini adalah <strong>render desain 3D</strong>, bukan foto
            hasil pembangunan.
          </p>
        )}
        {gallery.length > 0 && (
          <>
            <h2 className="sr-only">Galeri foto</h2>
            <Gallery images={gallery} title={p.title} />
          </>
        )}

        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-surface px-6 py-10 md:flex-row md:px-12 md:items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Ingin ruang serupa?</h2>
            <p className="mt-2 text-muted">
              Layanan terkait:{' '}
              {p.services.map((s, i) => {
                const svc = getService(s);
                return svc ? (
                  <span key={s}>
                    {i > 0 && ', '}
                    <Link
                      href={`/layanan/${s}/`}
                      className="underline underline-offset-4 hover:text-sage"
                    >
                      {svc.title}
                    </Link>
                  </span>
                ) : null;
              })}
            </p>
          </div>
          <WhatsAppButton
            message={`Halo Griya Nuansa, saya melihat proyek ${p.title} di website dan ingin konsultasi untuk ${cat.label.toLowerCase()} saya.`}
          >
            Konsultasi via WhatsApp
          </WhatsAppButton>
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
