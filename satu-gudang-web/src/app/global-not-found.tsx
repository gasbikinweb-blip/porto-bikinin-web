import type { Metadata } from 'next';
import { Logo } from '@/components/site/Logo';
import { defaultLocale, getContent } from '@/content';
import { siteConfig } from '@/lib/config';
import { fraunces, manrope } from '@/lib/fonts';
import './globals.css';

// 404 global (berdiri sendiri, tidak memakai layout halaman). Teks dalam bahasa default.
const t = getContent(defaultLocale);

export const metadata: Metadata = {
  title: `404 — ${t.notFound.title} | ${siteConfig.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang={t.htmlLang}
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
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
          <h1 className="mt-4 font-serif text-3xl">{t.notFound.title}</h1>
          <p className="mt-3 text-muted">{t.notFound.text}</p>
          <div className="mt-8 flex justify-center text-sm font-bold">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="rounded-full bg-accent px-6 py-3 text-on-accent">
              {t.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
