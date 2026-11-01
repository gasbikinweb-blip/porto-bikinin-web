import { relatedAccount } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <Logo size={72} />
          <p className="mt-3 text-sm text-white/80">{siteConfig.tagline}.</p>
        </div>
        <div className="text-sm">
          <h2 className="font-serif text-lg">Pesan & Kontak</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...ext}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                WhatsApp {siteConfig.waDisplay}
              </a>
            </li>
            <li>Area layanan: {siteConfig.serviceArea}</li>
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-serif text-lg">Ikuti Kami</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            <li>
              <a
                href={siteConfig.instagram}
                {...ext}
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 hover:bg-white/10"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.threads}
                {...ext}
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 hover:bg-white/10"
              >
                Threads
              </a>
            </li>
          </ul>
          {/* TODO: konfirmasi hubungan akun ini sebelum ditampilkan sebagai akun resmi */}
          <p className="mt-3 text-white/70">Akun terkait: {relatedAccount}</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}, {siteConfig.city}
          </p>
          {/* Nomor P-IRT hanya tampil bila sudah diisi di config (jangan dikarang) */}
          <p>{siteConfig.pirt ? `P-IRT No. ${siteConfig.pirt}` : 'P-IRT: segera dilengkapi'}</p>
        </div>
      </div>
    </footer>
  );
}
