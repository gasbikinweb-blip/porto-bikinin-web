import type { Metadata, Viewport } from 'next';
import { Jost, Newsreader } from 'next/font/google';
import { WhatsAppIcon } from '@/components/icons';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const body = Jost({ subsets: ['latin'], variable: '--font-body' });
const heading = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});

const title = 'Abika Furniture | Furnitur Kayu Jati dari Jepara';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: ['/images/og.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#faf8f5' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${body.variable} ${heading.variable}`}
    >
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten">{children}</main>
        <Footer />
        <a
          href={buildWhatsAppLink(generalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp (tab baru)"
          className="animate-wa-pulse fixed right-4 bottom-4 z-20 grid size-14 place-items-center rounded-full bg-[#1f7a46] text-white"
        >
          <WhatsAppIcon className="size-7" />
        </a>
        <RevealObserver />
      </body>
    </html>
  );
}
