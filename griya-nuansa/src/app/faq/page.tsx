import { pageMeta } from '@/lib/seo';
import { faqCopy, FaqView } from '@/views/FaqView';

export const metadata = pageMeta({
  lang: 'id',
  title: faqCopy.id.metaTitle,
  description: faqCopy.id.metaDesc,
  path: '/faq/',
});

export default function FaqPage() {
  return <FaqView lang={'id'} />;
}
