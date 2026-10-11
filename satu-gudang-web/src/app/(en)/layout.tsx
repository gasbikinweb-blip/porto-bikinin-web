import type { Viewport } from 'next';
import { RootDocument } from '@/components/site/RootDocument';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f1e9' },
    { media: '(prefers-color-scheme: dark)', color: '#171512' },
  ],
};

// Root layout bahasa Inggris (default, URL "/")
export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
