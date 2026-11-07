import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { AtIcon, InstagramIcon, PinIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons';
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

const footerLinks = [
  { href: '#portofolio', label: 'Portofolio' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#cara-booking', label: 'Cara Booking' },
  { href: '#konsultasi', label: 'Konsultasi' },
  { href: '#faq', label: 'FAQ' },
];

const socials = [
  { href: site.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.threads, label: 'Threads', Icon: AtIcon },
  { href: site.tiktok, label: 'TikTok', Icon: TikTokIcon },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${body.variable} ${display.variable} ${script.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- harus jalan sebelum render agar tema tidak berkedip */}
        <script src="/theme-init.js" />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten">{children}</main>

        <footer className="on-dark bg-night px-4 pt-20 pb-28 text-night-text sm:px-8 sm:pb-24">
          <div
            data-stagger
            className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]"
          >
            <div className="reveal">
              <div className="flex items-center gap-4">
                <Image
                  src="/brand/monogram.png"
                  alt=""
                  width={190}
                  height={192}
                  className="h-14 w-auto brightness-0 invert"
                />
                <div className="leading-none">
                  <p className="font-serif text-2xl tracking-[0.2em]">YMIDECORATION</p>
                  <p className="mt-2 text-[0.65rem] tracking-[0.35em] text-night-muted uppercase">
                    event decoration
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-night-muted">
                Dekorasi wedding, akad, engagement, dan ulang tahun di {site.city} dan sekitarnya.
              </p>
            </div>

            <nav aria-label="Menu footer" className="reveal">
              <p className="eyebrow">Menu</p>
              <ul className="mt-5 grid gap-1 text-sm">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="inline-flex min-h-10 items-center hover:text-gold-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="reveal">
              <p className="eyebrow">Hubungi</p>
              <ul className="mt-5 grid gap-3 text-sm">
                <li>
                  <a
                    href={buildWhatsAppLink(generalMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-3 hover:text-gold-light"
                  >
                    <WhatsAppIcon className="size-4 shrink-0" />
                    {site.whatsappDisplay}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex gap-3 leading-relaxed text-night-muted hover:text-gold-light"
                  >
                    <PinIcon className="mt-1 size-4 shrink-0" />
                    {site.address}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="reveal">
              <p className="eyebrow">Ikuti</p>
              <ul className="mt-5 flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (tab baru)`}
                      className="grid size-11 place-items-center rounded-full border border-white/20 transition hover:border-gold-light hover:text-gold-light"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-night-muted">{site.handle}</p>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-8 text-xs text-night-muted sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. Semua hak dilindungi.
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
