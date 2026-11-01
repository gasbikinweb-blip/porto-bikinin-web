import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { products } from '@/data/products';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' });

const title = `${site.name} | Toko Keramik Murah Jakarta Timur`;
const ogImage = products.find((p) => p.id === 'keramik-40x40-fremont')?.image.src;

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title,
  description: site.description,
  alternates: { canonical: '/' },
  keywords: [
    'toko keramik Jakarta Timur',
    'keramik murah Jakarta',
    'distributor keramik Jakarta',
    'granit 60x60 murah',
    'keramik teras 40x40',
    'keramik kamar mandi 25x25',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: ogImage ? [{ url: ogImage, width: 800, height: 800 }] : [],
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
};

export const viewport: Viewport = { themeColor: '#c4161c' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={body.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-red focus:px-4 focus:py-3 focus:font-bold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
