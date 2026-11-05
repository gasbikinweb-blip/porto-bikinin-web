// Footer lengkap. Semua isi dari data situs; jangan menambah fakta yang belum dikonfirmasi.
import Image from 'next/image';
import { ArrowIcon, AtIcon, ClockIcon, InstagramIcon, PinIcon, WhatsAppIcon } from './icons';
import { categories } from '@/data/categories';
import { getItem } from '@/data/menu';
import { eventTypes, LEAD_DAYS, site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const pages = [
  { href: '/#tentang', label: 'Tentang ICH' },
  { href: '/#menu', label: 'Menu & Paket' },
  { href: '/#video', label: 'Video' },
  { href: '/#pesan-acara', label: 'Pesan untuk Acara' },
  { href: '/#cara-pesan', label: 'Cara Pesan' },
  { href: '/#testimoni', label: 'Testimoni' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#kontak', label: 'Kontak & Lokasi' },
];

// Menu unggulan tiap kategori; link membuka detail menunya
const popular = categories.flatMap((c) => getItem(c.cover) ?? []);

const heading = 'font-serif text-lg';
const link = 'inline-flex min-h-11 items-center gap-2 hover:underline';

export function Footer() {
  return (
    <footer className="bg-accent-strong text-sm text-white">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        {/* Ajakan memesan */}
        <div className="flex flex-col items-start justify-between gap-5 border-b border-white/25 pb-10 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-3xl sm:text-4xl">Ada acara sebentar lagi, Kak?</p>
            <p className="mt-2 text-base text-white/90">
              Ceritakan acaranya, admin kami bantu pilihkan menunya.
            </p>
          </div>
          <a
            href={buildWhatsAppLink(generalMessage)}
            {...external}
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-bold text-accent-strong hover:bg-blush"
          >
            <WhatsAppIcon className="size-5" />
            Chat Admin<span className="sr-only"> (tab baru)</span>
          </a>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Image
              src="/images/logo.webp"
              alt="Logo ICH"
              width={88}
              height={88}
              className="size-22 rounded-full"
            />
            <p className="mt-3 font-bold">Indonesia Creative House</p>
            <p className="mt-3 leading-relaxed text-white/90">
              Pusat jajanan pasar di Cipete, Jakarta Selatan, sejak {site.since}. Snack box, tampah,
              nasi tumpeng, dan hantaran untuk berbagai acara.
            </p>
            <p className="mt-4 font-bold">Cocok untuk</p>
            <p className="mt-1 leading-relaxed text-white/90">
              {eventTypes.filter((e) => e !== 'Lainnya').join(', ')}.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className={heading}>Jelajahi</h2>
            <ul className="mt-2">
              {pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className={link}>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Menu populer">
            <h2 className={heading}>Pilihan Menu</h2>
            <ul className="mt-2">
              {popular.map((m) => (
                <li key={m.slug}>
                  <a href={`/#menu-${m.slug}`} className={link}>
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Hubungi Kami</h2>
            <ul className="mt-2">
              <li>
                <a href={site.mapsUrl} {...external} className={link}>
                  <PinIcon className="size-5 shrink-0" />
                  {site.address}
                  <span className="sr-only"> (tab baru)</span>
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2">
                <ClockIcon className="size-5 shrink-0" />
                {site.hours}
              </li>
              <li>
                <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                  <WhatsAppIcon className="size-5 shrink-0" />
                  {site.whatsappDisplay}
                  <span className="sr-only"> (WhatsApp, tab baru)</span>
                </a>
              </li>
              <li>
                <a href={site.instagram} {...external} className={link}>
                  <InstagramIcon className="size-5 shrink-0" />
                  Instagram<span className="sr-only"> (tab baru)</span>
                </a>
              </li>
              <li>
                <a href={site.threads} {...external} className={link}>
                  <AtIcon className="size-5 shrink-0" />
                  Threads<span className="sr-only"> (tab baru)</span>
                </a>
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-white/90">
              Pesan paling lambat H-{LEAD_DAYS}. {site.deliveryArea}.
            </p>
          </div>
        </div>

        {/* Ruang bawah agar tidak tertutup tombol WhatsApp mengambang */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-5 pb-20 sm:pb-8">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.handle}
          </p>
          <a href="#beranda" className={`${link} mr-16 font-bold sm:mr-20`}>
            Kembali ke atas
            <ArrowIcon className="size-4 -rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}
