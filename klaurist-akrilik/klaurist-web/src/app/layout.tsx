import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime). Maksimal 3 font.
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jost' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant',
});
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-pinyon' });

const title = 'Sewa Papan Akrilik & Bucket Bunga Non-Fresh Jogja | Klaurist';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title,
  description: site.description,
  keywords: [
    'sewa papan akrilik Jogja',
    'papan bunga akrilik wisuda Jogja',
    'bucket bunga wisuda murah Jogja',
    'buket bunga artificial Jogja',
    'bunga non-fresh Jogja',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Klaurist Jogja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: ['/images/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1418' },
  ],
};

// Pasang tema sebelum halaman tampil (pilihan tersimpan, atau ikut pengaturan perangkat)
const themeInit = `try{var t=localStorage.getItem('klaurist-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jost.variable} ${cormorant.variable} ${pinyon.variable}`}
    >
      <body className="font-sans antialiased">
        <Script id="tema" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-rose focus:px-4 focus:py-3 focus:text-on-rose"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
      </body>
    </html>
  );
}
