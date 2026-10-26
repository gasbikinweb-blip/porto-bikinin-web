import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { buildWhatsAppLink, resellerMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const photo = products.find((p) => p.slug === 'naima-plain-hijab-syari')?.images[4];

/** Ajakan reseller yang dipakai di beberapa halaman. `compact` untuk sela katalog/detail produk. */
export function ResellerCTA({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <aside className="flex flex-col items-start gap-4 rounded-[1.75rem] border border-dashed border-mocha/40 bg-rose-soft/50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-xl italic">Psst, mau jualan juga, Kak?</p>
          <p className="mt-1 text-sm text-muted">
            Gabung reseller Farwa: harga grosir, boleh mix model, free foto untuk jualan.
          </p>
        </div>
        <Link
          href="/#reseller"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-panel px-5 text-sm font-bold text-on-panel hover:bg-panel-strong"
        >
          Lihat program reseller →
        </Link>
      </aside>
    );
  }

  return (
    <section
      aria-labelledby="ajak-reseller"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="grid overflow-hidden rounded-[2.5rem] bg-panel text-on-panel md:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-12">
          <p className="eyebrow text-on-panel/70!">Open reseller & dropship</p>
          <h2 id="ajak-reseller" className="mt-4 font-serif text-section">
            Boleh banget loh, <em>jadi reseller</em> Farwa!
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-on-panel/80">
            Harga grosir khusus, boleh mix model, dapat foto untuk jualan, dan bisa visit lokasi
            kami di Bandung. Cocok untuk mulai usaha hijab dari rumah.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink(resellerMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-on-panel px-6 font-bold text-panel hover:bg-on-panel/85"
            >
              <WhatsAppIcon />
              Daftar Reseller
              <span className="sr-only"> (tab baru)</span>
            </a>
            <Link
              href="/#hitung-cuan"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-on-panel/40 px-6 font-bold hover:bg-on-panel/10"
            >
              Hitung cuanmu dulu
            </Link>
          </div>
        </div>
        {photo && (
          <div className="relative min-h-72">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
