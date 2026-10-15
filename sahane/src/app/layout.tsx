import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import { ogImage } from '@/lib/seo';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-geist-mono' });

const defaultTitle = `${siteConfig.name} | Abaya Premium & Baju Muslimah Elegan`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'sahane id',
    'abaya premium',
    'baju muslimah elegan',
    'dress muslimah',
    'fashion wanita',
    'abaya bordir',
    'pre order abaya',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [ogImage()],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
    images: [ogImage().url],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1814' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
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
