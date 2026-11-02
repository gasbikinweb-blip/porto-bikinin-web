import { pageMeta } from '@/lib/seo';
import { aboutCopy, AboutView } from '@/views/AboutView';

export const metadata = pageMeta({
  lang: 'id',
  title: aboutCopy.id.metaTitle,
  description: aboutCopy.id.metaDesc,
  path: '/tentang/',
});

export default function AboutPage() {
  return <AboutView lang={'id'} />;
}
