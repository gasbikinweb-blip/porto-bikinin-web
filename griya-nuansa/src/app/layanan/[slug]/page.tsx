import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getProjectsByService } from '@/data/projects';
import { getService, services } from '@/data/services';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const sample = getProjectsByService(s.slug)[0];
  return pageMeta({
    title: s.title,
    description: `${s.short} Griya Nuansa, Serpong – Tangerang Selatan, melayani Jabodetabek.`,
    path: `/layanan/${s.slug}/`,
    image: sample?.cover.src,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = getProjectsByService(s.slug).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Layanan"
        title={s.title}
        intro={s.short}
        image={related[0]?.cover}
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <Link href="/layanan/" className="hover:text-white">
              Layanan
            </Link>{' '}
            / <span aria-current="page">{s.title}</span>
          </nav>
        }
      />
      <Container className="pt-16 md:pt-24">
        <div className="fade-up mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {s.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div className="mt-10">
              <WhatsAppButton
                message={`Halo Griya Nuansa, saya ingin konsultasi layanan ${s.title}.`}
              >
                Konsultasi {s.title}
              </WhatsAppButton>
            </div>
          </div>
          <aside className="space-y-10 md:col-span-4 md:col-start-9">
            <div>
              <h2 className="text-xs tracking-[0.2em] text-muted uppercase">Ruang lingkup</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {s.scope.map((x) => (
                  <li key={x} className="py-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs tracking-[0.2em] text-muted uppercase">Cocok untuk</h2>
              <p className="mt-4">{s.audience.join(', ')}</p>
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-24">
          <h2 className="font-serif text-4xl">Contoh proyek</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="mt-24">
        <h2 className="mb-10 font-serif text-4xl">Susun pesan konsultasi</h2>
        <WaMessageBuilder defaultService={s.title} />
      </Container>
    </>
  );
}
