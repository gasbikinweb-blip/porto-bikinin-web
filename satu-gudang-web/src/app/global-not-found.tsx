import type { Metadata } from 'next';
import { Logo } from '@/components/site/Logo';
import { getContent } from '@/content';
import { siteConfig } from '@/lib/config';
import { fraunces, manrope } from '@/lib/fonts';
import './globals.css';

// 404 global (ada dua root layout per bahasa, jadi 404 berdiri sendiri). Teks dua bahasa.
const en = getContent('en');
const id = getContent('id');

export const metadata: Metadata = {
  title: `404 — ${en.notFound.title} | ${siteConfig.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="grid min-h-dvh place-items-center px-4 font-sans antialiased">
        <main className="max-w-lg text-center">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- halaman 404 berdiri sendiri */}
          <a href="/" className="inline-block" aria-label={siteConfig.name}>
            <Logo name={siteConfig.name} />
          </a>
          <p className="mt-10 font-serif text-7xl text-accent-text">404</p>
          <h1 className="mt-4 font-serif text-3xl">{en.notFound.title}</h1>
          <p className="mt-3 text-muted">{en.notFound.text}</p>
          <p lang="id" className="mt-2 text-sm text-muted">
            {id.notFound.title} — {id.notFound.text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-bold">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="rounded-full bg-accent px-6 py-3 text-on-accent">
              {en.notFound.back}
            </a>
            <a href="/id" lang="id" className="rounded-full border border-line px-6 py-3">
              {id.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
