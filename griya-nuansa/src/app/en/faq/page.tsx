import { pageMeta } from '@/lib/seo';
import { faqCopy, FaqView } from '@/views/FaqView';

export const metadata = pageMeta({
  lang: 'en',
  title: faqCopy.en.metaTitle,
  description: faqCopy.en.metaDesc,
  path: '/faq/',
});

export default function FaqPage() {
  return <FaqView lang={'en'} />;
}
