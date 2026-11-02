import { pageMeta } from '@/lib/seo';
import { socialCopy, SocialView } from '@/views/SocialView';

export const metadata = pageMeta({
  lang: 'en',
  title: socialCopy.en.metaTitle,
  description: socialCopy.en.metaDesc,
  path: '/media-sosial/',
});

export default function SocialPage() {
  return <SocialView lang="en" />;
}
