import Image from 'next/image';
import { WhatsAppIcon } from './icons';
import { InstagramIcon, ThreadsIcon } from './social-icons';
import { navLinks, site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const links = [
  ...navLinks,
  { href: '#pesan', label: 'Pesan Sekarang' },
  { href: '#kontak', label: 'Kontak' },
];

export function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <Image
            src="/images/logo.webp"
            alt="Logo Klaurist"
            width={88}
            height={88}
            className="size-22 rounded-full"
          />
          <p className="mt-3 font-script text-3xl text-blush">{site.tagline}</p>
          <p className="mt-1 text-sm text-ivory/80">
            Sewa papan akrilik &amp; bucket bunga non-fresh di {site.city}.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <p className="font-serif text-xl">Jelajahi</p>
          <ul className="mt-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-serif text-xl">Hubungi Kami</p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="inline-flex min-h-11 items-center gap-2 hover:underline"
              >
                <WhatsAppIcon className="size-5" /> {site.waDisplay}
                <span className="sr-only"> (WhatsApp, tab baru)</span>
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                {...external}
                className="inline-flex min-h-11 items-center gap-2 hover:underline"
              >
                <InstagramIcon className="size-5" /> {site.handle}
                <span className="sr-only"> (Instagram, tab baru)</span>
              </a>
            </li>
            <li>
              <a
                href={site.threads}
                {...external}
                className="inline-flex min-h-11 items-center gap-2 hover:underline"
              >
                <ThreadsIcon className="size-5" /> Threads
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-ivory/15 px-4 py-5 pb-24 text-center text-xs text-ivory/70 sm:pb-6">
        © {new Date().getFullYear()} {site.name}. Dibuat dengan cinta di Jogja.
      </p>
    </footer>
  );
}
