import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/data/site';
import './globals.css';

// Font di-self-host otomatis oleh next/font saat build (tidak ada request ke Google saat runtime)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Arsitek & Desain Interior Serpong, Tangerang Selatan`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1c1b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React berjalan
    <html
      lang="id"
      className={`${cormorant.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Skrip kecil sinkron agar tema tidak berkedip; file lokal, aman untuk CSP 'self' */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="min-h-screen">
        <a
          href="#konten"
          className="sr-only z-50 bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
