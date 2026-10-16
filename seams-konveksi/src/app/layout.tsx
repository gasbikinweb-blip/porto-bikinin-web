import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant',
});

const title = `${config.siteName} | Konveksi Abaya & Khimar`;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: title, template: `%s | ${config.siteName}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: config.siteName,
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
    <html lang="id" className={`${geist.variable} ${cormorant.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-plum focus:px-4 focus:py-2 focus:text-background"
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
