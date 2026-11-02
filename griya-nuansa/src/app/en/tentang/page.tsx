import { pageMeta } from '@/lib/seo';
import { aboutCopy, AboutView } from '@/views/AboutView';

export const metadata = pageMeta({
  lang: 'en',
  title: aboutCopy.en.metaTitle,
  description: aboutCopy.en.metaDesc,
  path: '/tentang/',
});

export default function AboutPage() {
  return <AboutView lang={'en'} />;
}
