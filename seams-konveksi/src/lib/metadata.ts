import type { Metadata } from 'next';

// Metadata per halaman: title, description, canonical, openGraph, dan twitter card
export function pageMetadata({
  title,
  description,
  path,
  image = '/og.jpg',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
