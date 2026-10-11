import type { Viewport } from 'next';
import { RootDocument } from '@/components/site/RootDocument';
import { defaultLocale } from '@/content';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f1e9' },
    { media: '(prefers-color-scheme: dark)', color: '#171512' },
  ],
};

// Root layout bahasa default (saat ini Indonesia, URL "/"), atribut lang mengikuti bahasa tersebut
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale={defaultLocale}>{children}</RootDocument>;
}
