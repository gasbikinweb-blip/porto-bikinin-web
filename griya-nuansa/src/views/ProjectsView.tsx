import { ProjectFilter } from '@/components/ProjectFilter';
import { Container, PageHeader } from '@/components/ui';
import { getProject, getProjects } from '@/data/projects';
import type { Lang } from '@/i18n';

export const projectsCopy = {
  id: {
    metaTitle: 'Portofolio Proyek',
    metaDesc:
      'Portofolio Griya Nuansa: desain interior dan arsitektur rumah, apartemen, kafe, gym, klinik, kantor, kost, dan industri di Jabodetabek.',
    eyebrow: 'Portofolio',
    intro: (n: number) =>
      `${n} proyek arsitektur dan interior yang kami rancang dan kerjakan di Jabodetabek.`,
  },
  en: {
    metaTitle: 'Project Portfolio',
    metaDesc:
      'Griya Nuansa portfolio: interior design and architecture for homes, apartments, cafés, gyms, clinics, offices, boarding houses, and industrial buildings in Greater Jakarta.',
    eyebrow: 'Portfolio',
    intro: (n: number) =>
      `${n} architecture and interior projects we have designed and built across Greater Jakarta.`,
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
        intro={c.intro(projects.length)}
      />
      <Container className="py-16 md:py-24">
        <ProjectFilter projects={projects} />
      </Container>
    </>
  );
}
