import { getProjects } from '@/data/projects';
import { pageMeta } from '@/lib/seo';
import { projectsCopy, ProjectsView } from '@/views/ProjectsView';

export const metadata = pageMeta({
  lang: 'en',
  title: projectsCopy.en.metaTitle,
  description: projectsCopy.en.metaDesc,
  path: '/proyek/',
  image: getProjects().at(0)?.cover.src,
});

export default function ProjectsPage() {
  return <ProjectsView lang={'en'} />;
}
