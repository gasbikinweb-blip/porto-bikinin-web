import type { Metadata } from 'next';
import { HomeSections } from '@/components/sections/HomeSections';
import { defaultLocale, getContent } from '@/content';
import { buildMetadata } from '@/lib/seo';

const content = getContent(defaultLocale);

export const metadata: Metadata = buildMetadata(content);

export default function HomePage() {
  return <HomeSections content={content} />;
}
