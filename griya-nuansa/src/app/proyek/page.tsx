import { ProjectFilter } from '@/components/ProjectFilter';
import { Container, PageHeader } from '@/components/ui';
import { projects } from '@/data/projects';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Portofolio Proyek',
  description:
    'Portofolio Griya Nuansa: desain interior dan arsitektur rumah, apartemen, kafe, gym, klinik, kantor, kost, dan industri di Jabodetabek.',
  path: '/proyek/',
  image: projects[0]?.cover.src,
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portofolio"
        title={
          <>
            Project <em>Showcase</em>
          </>
        }
        intro={`${projects.length} proyek arsitektur dan interior yang kami rancang dan kerjakan di Jabodetabek.`}
      />
      <Container>
        <ProjectFilter projects={projects} />
      </Container>
    </>
  );
}
