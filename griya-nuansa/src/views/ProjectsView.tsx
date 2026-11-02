import { ProjectFilter } from '@/components/ProjectFilter';
import { Container, PageHeader } from '@/components/ui';
import { getProject, getProjects } from '@/data/projects';
import { stats } from '@/data/site';
import type { Lang } from '@/i18n';

export const projectsCopy = {
  id: {
    metaTitle: 'Portofolio Proyek',
    metaDesc:
      'Portofolio Griya Nuansa: desain interior dan arsitektur rumah, apartemen, kafe, gym, klinik, kantor, kost, dan industri di Jabodetabek.',
    eyebrow: 'Portofolio',
    // Sumber: Brief Web Griya Nuansa (bagian PORTFOLIO)
    intro: () =>
      'Jelajahi berbagai karya Griya Nuansa, mulai dari hunian, bangunan komersial, hingga desain interior. Setiap proyek dirancang dengan pendekatan yang personal untuk menghadirkan ruang yang selaras dengan kebutuhan, karakter, dan cara hidup penggunanya.',
  },
  en: {
    metaTitle: 'Project Portfolio',
    metaDesc:
      'Griya Nuansa portfolio: interior design and architecture for homes, apartments, cafés, gyms, clinics, offices, boarding houses, and industrial buildings in Greater Jakarta.',
    eyebrow: 'Portfolio',
    intro: () =>
      'Explore the works of Griya Nuansa, from homes and commercial buildings to interior design. Each project is designed with a personal approach to create spaces in harmony with the needs, character, and lifestyle of the people who use them.',
  },
};

export function ProjectsView({ lang }: { lang: Lang }) {
  const c = projectsCopy[lang];
  const projects = getProjects(lang);
  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        image={getProject('altuera-tower-southgate', lang)?.cover}
        title={
          <>
            Project <em>Showcase</em>
          </>
        }
        intro={c.intro()}
      >
        {/* Statistik sesuai brief: 200+ proyek, 12+ tahun pengalaman */}
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {stats[lang].map(([n, label]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="mt-2 text-[10px] font-light tracking-[0.2em] text-muted uppercase">
                {label}
              </dt>
              <dd className="font-serif text-4xl">{n}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>
      <Container className="py-16 md:py-24">
        <ProjectFilter projects={projects} />
      </Container>
    </>
  );
}
