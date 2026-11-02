import { pageMeta } from '@/lib/seo';
import { servicesCopy, ServicesView } from '@/views/ServicesView';

export const metadata = pageMeta({
  lang: 'en',
  title: servicesCopy.en.metaTitle,
  description: servicesCopy.en.metaDesc,
  path: '/layanan/',
});

export default function ServicesPage() {
  return <ServicesView lang={'en'} />;
}
