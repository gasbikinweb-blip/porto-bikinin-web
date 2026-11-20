import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { CartDrawer } from '@/components/CartDrawer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build. Judul & logo: Cormorant Garamond (serif tipis). Teks: Jost.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const body = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-body' });

const title = 'SANARÉA | Toko Hijab Cianjur · A Modest Soul Essentials';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: site.description,
  keywords: [
    'toko hijab Cianjur',
    'pashmina motif',
    'khimar viscose',
    'khiban rayon',
    'bandana instan sport',
    'hijab sport',
    'hijab modern Cianjur',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#faf7f2' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-background"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <CartDrawer />
        <RevealObserver />
      </body>
    </html>
  );
}
