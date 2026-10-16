// Bagian-bagian halaman yang dipakai ulang (server component)
import type { Faq } from '@/data/faq';
import { productionSteps, site, type SlotStatus } from '@/data/site';
import { DownloadIcon, PlusIcon } from './icons';

export function ProcessSteps() {
  return (
    <ol data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {productionSteps.map((s, i) => (
        <li key={s.title} className="reveal rounded-xl border border-line bg-background p-5">
          <span className="font-serif text-3xl text-plum">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

const slotStyle: Record<SlotStatus, string> = {
  tersedia: 'bg-sage-strong',
  terbatas: 'bg-[#a8742a]',
  penuh: 'bg-[#9b2c2c]',
};

export function SlotInfo() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-line bg-background px-4 py-2 text-sm">
      <span aria-hidden="true" className={`size-2.5 rounded-full ${slotStyle[site.slot.status]}`} />
      <span>{site.slot.label}</span>
    </div>
  );
}

// Akordeon aksesibel memakai details/summary bawaan browser
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
            {f.question}
            <PlusIcon className="faq-icon size-5 shrink-0 text-plum transition-transform" />
          </summary>
          <p className="pb-5 text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CatalogDownload() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-serif text-2xl">Katalog layanan (PDF)</h2>
        <p className="mt-1 text-sm text-muted">
          Ringkasan produk dan alur kerja Seams Konveksi untuk dibaca atau dibagikan ke tim Anda.
        </p>
      </div>
      {site.catalogPdf ? (
        <a
          href={site.catalogPdf}
          download="katalog-seams-konveksi.pdf"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-plum px-6 text-sm font-semibold text-plum hover:bg-plum hover:text-background"
        >
          <DownloadIcon />
          Unduh katalog PDF
        </a>
      ) : (
        <p className="shrink-0 rounded-full border border-dashed border-line px-5 py-3 text-sm text-muted">
          Katalog PDF segera tersedia
        </p>
      )}
    </div>
  );
}
