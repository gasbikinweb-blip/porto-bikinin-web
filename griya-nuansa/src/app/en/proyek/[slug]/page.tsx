import { ProjectDetailView, projectMeta, projectStaticParams } from '@/views/ProjectDetailView';

export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return projectMeta((await params).slug, 'en');
}

export default async function ProjectDetailPage({ params }: Props) {
  return <ProjectDetailView slug={(await params).slug} lang={'en'} />;
}
