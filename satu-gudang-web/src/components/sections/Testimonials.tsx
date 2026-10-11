import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { isProduction } from '@/lib/config';

// TODO: testimoni masih contoh. Section ini TIDAK dirender di build production sampai diisi testimoni asli
// (setelah diganti, hapus pengecekan isProduction di bawah).
export function Testimonials({ content }: { content: SiteContent }) {
  if (isProduction) return null;
  const t = content.testimonials;
  return (
    <section aria-labelledby="testimonials-title" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="testimonials-title" eyebrow={t.eyebrow} title={t.title} arc={false} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {t.items.map((q, i) => (
            <li key={i} className="rounded-[2rem] border border-dashed border-accent p-8">
              <blockquote className="font-serif text-xl">“{q.quote}”</blockquote>
              <p className="mt-4 text-sm font-bold">
                {q.name} <span className="font-normal text-muted">— {q.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
