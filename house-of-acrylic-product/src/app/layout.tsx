import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Font condensed untuk judul besar (kesan teknis/industrial)
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  variable: '--font-oswald',
});

const title = `Jasa Akrilik Surabaya: Cutting Laser, Neon Box & Letter Signage | ${siteConfig.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: site.description,
  keywords: [
    'jasa akrilik surabaya',
    'cutting laser akrilik',
    'neon box surabaya',
    'letter signage surabaya',
    'akrilik custom',
    'uv printing akrilik',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
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

export const viewport: Viewport = {
  themeColor: '#0d0e10',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
      </body>
    </html>
  );
}
