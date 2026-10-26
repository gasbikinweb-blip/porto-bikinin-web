import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Karla } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { WelcomeModal } from '@/components/WelcomeModal';
import { site } from '@/data/site';
import { products } from '@/data/products';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Judul: Bodoni Moda (elegan, khas butik fashion). Teks & harga: Karla (bersih, mudah dibaca).
const heading = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});
const body = Karla({ subsets: ['latin'], variable: '--font-body' });

const title = `${site.name} | Hijab Premium Harga Grosir dari Bandung`;
const ogImage = products[0]?.images[0]?.src;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: ogImage ? [{ url: ogImage }] : [],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#17120f' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Tema tersimpan dipasang sebelum halaman digambar (anti kedip) */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-mocha focus:px-4 focus:py-3 focus:text-background"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <WelcomeModal />
        <RevealOnScroll />
      </body>
    </html>
  );
}
