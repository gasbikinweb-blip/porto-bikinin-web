import type { Metadata } from 'next';
import { HomeSections } from '@/components/sections/HomeSections';
import { getContent } from '@/content';
import { buildMetadata } from '@/lib/seo';

const content = getContent('en');

export const metadata: Metadata = buildMetadata(content);

export default function HomePage() {
  return <HomeSections content={content} />;
}
