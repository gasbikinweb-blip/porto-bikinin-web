import Image from 'next/image';
import Link from 'next/link';
import { company, navLinks } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="bg-night text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Logo pakai "kartu" putih agar warna indigo tetap kontras di latar gelap */}
          <div className="inline-block rounded-lg bg-white px-4 py-3">
            <Image
              src="/brand/logo-400.webp"
              alt="Syroster Industrie"
              width={400}
              height={112}
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-5 max-w-sm leading-relaxed">{company.description}</p>
        </div>
        <nav aria-label="Navigasi footer">
          <h2 className="font-display text-sm font-bold tracking-wider text-gold uppercase">
            Jelajahi
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wider text-gold uppercase">
            Hubungi kami
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={buildWhatsAppLink(defaultQuoteMessage)}
                {...ext}
                className="hover:text-white hover:underline"
              >
                WhatsApp: {company.waDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white hover:underline">
                {company.email}
              </a>
            </li>
            <li>{company.address}</li>
            <li>
              <a href={company.shopee} {...ext} className="hover:text-white hover:underline">
                Toko Shopee
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Seluruh foto adalah milik{' '}
          {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
