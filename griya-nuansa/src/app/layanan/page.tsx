import { pageMeta } from '@/lib/seo';
import { servicesCopy, ServicesView } from '@/views/ServicesView';

export const metadata = pageMeta({
  lang: 'id',
  title: servicesCopy.id.metaTitle,
  description: servicesCopy.id.metaDesc,
  path: '/layanan/',
});

export default function ServicesPage() {
  return <ServicesView lang={'id'} />;
}
