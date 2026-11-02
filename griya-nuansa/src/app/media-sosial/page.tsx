import { pageMeta } from '@/lib/seo';
import { socialCopy, SocialView } from '@/views/SocialView';

export const metadata = pageMeta({
  lang: 'id',
  title: socialCopy.id.metaTitle,
  description: socialCopy.id.metaDesc,
  path: '/media-sosial/',
});

export default function SocialPage() {
  return <SocialView lang="id" />;
}
