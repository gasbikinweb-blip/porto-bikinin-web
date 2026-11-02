import { getProjects } from '@/data/projects';
import { pageMeta } from '@/lib/seo';
import { projectsCopy, ProjectsView } from '@/views/ProjectsView';

export const metadata = pageMeta({
  lang: 'id',
  title: projectsCopy.id.metaTitle,
  description: projectsCopy.id.metaDesc,
  path: '/proyek/',
  image: getProjects().at(0)?.cover.src,
});

export default function ProjectsPage() {
  return <ProjectsView lang={'id'} />;
}
