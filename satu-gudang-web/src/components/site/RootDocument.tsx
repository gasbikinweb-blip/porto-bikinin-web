import { FloatingWhatsApp } from '@/components/site/FloatingWhatsApp';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { getContent } from '@/content';
import type { Locale } from '@/content/types';
import { fraunces, manrope } from '@/lib/fonts';
import { waLink } from '@/lib/whatsapp';

// Kerangka <html> bersama untuk root layout tiap bahasa (atribut lang berbeda per bahasa)
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const content = getContent(locale);
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html
      lang={content.htmlLang}
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- ini root layout App Router (dipakai oleh layout tiap bahasa) */}
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {content.common.skipToContent}
        </a>
        <div aria-hidden="true" className="scroll-progress" />
        <Header content={content} />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer content={content} />
        <FloatingWhatsApp href={waLink(content.wa.general)} label={content.common.chatWhatsApp} />
        <RevealObserver />
      </body>
    </html>
  );
}
