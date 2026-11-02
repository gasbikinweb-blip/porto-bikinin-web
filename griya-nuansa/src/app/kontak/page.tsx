import { pageMeta } from '@/lib/seo';
import { contactCopy, ContactView } from '@/views/ContactView';

export const metadata = pageMeta({
  lang: 'id',
  title: contactCopy.id.metaTitle,
  description: contactCopy.id.metaDesc,
  path: '/kontak/',
});

export default function ContactPage() {
  return <ContactView lang={'id'} />;
}
