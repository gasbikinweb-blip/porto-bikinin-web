import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { AtIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const body = Jost({ subsets: ['latin'], variable: '--font-body' });
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const script = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-script' });

const title = 'YMI Decoration | Dekorasi Wedding, Akad & Lamaran Surabaya';

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

export const viewport: Viewport = { themeColor: '#f6f1e9' };

const socials = [
  { href: site.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.threads, label: 'Threads', Icon: AtIcon },
  { href: site.tiktok, label: 'TikTok', Icon: TikTokIcon },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${body.variable} ${display.variable} ${script.variable}`}
    >
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten">{children}</main>

        <footer className="on-dark bg-night px-4 pt-20 pb-24 text-night-text sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Image
                src="/brand/monogram.png"
                alt=""
                width={190}
                height={192}
                className="h-16 w-auto brightness-0 invert"
              />
              <p className="mt-6 font-serif text-3xl tracking-[0.2em]">YMIDECORATION</p>
              <p className="mt-1 text-xs tracking-[0.35em] text-night-muted uppercase">
                event decoration
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-night-muted">
                Dekorasi wedding, akad, dan lamaran di {site.city}.
              </p>
            </div>
            <div>
              <p className="eyebrow">Hubungi</p>
              <a
                href={buildWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-3 hover:text-gold-light"
              >
                <WhatsAppIcon className="size-5" />
                {site.whatsappDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
              <p className="mt-2 text-sm leading-relaxed text-night-muted">{site.address}</p>
            </div>
            <div>
              <p className="eyebrow">Ikuti</p>
              <ul className="mt-4">
                {socials.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 hover:text-gold-light"
                    >
                      <Icon className="size-5" />
                      {label}
                      <span className="sr-only"> (tab baru)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-8 text-xs text-night-muted sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. {site.handle}
            </p>
            <p>Foto oleh vendor dokumentasi yang dikreditkan pada tiap acara.</p>
          </div>
        </footer>

        <a
          href={buildWhatsAppLink(generalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Konsultasi via WhatsApp (tab baru)"
          className="fixed right-4 bottom-4 z-20 grid size-14 place-items-center rounded-full bg-[#1f6f43] text-white shadow-lg ring-4 ring-white/40 sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-7" />
        </a>
        <RevealObserver />
      </body>
    </html>
  );
}
