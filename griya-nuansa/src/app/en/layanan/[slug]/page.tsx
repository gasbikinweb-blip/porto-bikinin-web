import { ServiceDetailView, serviceMeta, serviceStaticParams } from '@/views/ServiceDetailView';

export const dynamicParams = false;
export const generateStaticParams = serviceStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return serviceMeta((await params).slug, 'en');
}

export default async function ServiceDetailPage({ params }: Props) {
  return <ServiceDetailView slug={(await params).slug} lang={'en'} />;
}
