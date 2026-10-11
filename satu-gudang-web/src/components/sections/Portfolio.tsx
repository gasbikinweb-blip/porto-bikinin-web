import { sectionIds } from '@/components/site/nav';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { projects } from '@/data/projects';
import { imgLarge, imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';
import { PortfolioGallery, type ProjectView } from './PortfolioGallery';

// Server: menyiapkan data siap tampil (hanya string) untuk komponen client filter + lightbox
export function Portfolio({ content }: { content: SiteContent }) {
  const t = content.portfolio;

  const views: ProjectView[] = projects.map((p) => {
    const text = t.items[p.slug];
    // Jaga konsistensi: jumlah alt harus sama dengan jumlah foto
    if (text.alts.length !== p.images.length) {
      throw new Error(
        `Alt foto proyek "${p.slug}" (${content.locale}) tidak sama dengan jumlah foto.`,
      );
    }
    return {
      slug: p.slug,
      category: p.category,
      categoryLabel: t.categoryLabels[p.category],
      title: text.title,
      location: text.location,
      summary: text.summary,
      scope: text.scope,
      images: p.images.map((base, i) => ({
        small: imgSmall(base),
        large: imgLarge(base),
        alt: text.alts[i] ?? '',
      })),
      waHref: waLink(content.wa.project, { project: text.title }),
    };
  });

  return (
    <section
      id={sectionIds.work}
      aria-labelledby="projects-title"
      className="bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="projects-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <PortfolioGallery
          projects={views}
          labels={{
            filter: t.filterLabel,
            filters: t.filters,
            viewGallery: t.viewGallery,
            photos: t.photos,
            askSimilar: t.askSimilar,
            gallery: t.galleryLabel,
            close: content.common.close,
            previous: content.common.previous,
            next: content.common.next,
          }}
        />
      </div>
    </section>
  );
}
