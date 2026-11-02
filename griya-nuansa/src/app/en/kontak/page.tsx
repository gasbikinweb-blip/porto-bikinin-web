import { pageMeta } from '@/lib/seo';
import { contactCopy, ContactView } from '@/views/ContactView';

export const metadata = pageMeta({
  lang: 'en',
  title: contactCopy.en.metaTitle,
  description: contactCopy.en.metaDesc,
  path: '/kontak/',
});

export default function ContactPage() {
  return <ContactView lang={'en'} />;
}
