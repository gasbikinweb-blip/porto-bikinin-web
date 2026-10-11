import type { Metadata } from 'next';
import { HomeSections } from '@/components/sections/HomeSections';
import { getContent } from '@/content';
import { buildMetadata } from '@/lib/seo';

const content = getContent('id');

export const metadata: Metadata = buildMetadata(content);

export default function HomePageId() {
  return <HomeSections content={content} />;
}
