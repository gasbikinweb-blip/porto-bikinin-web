import Image from 'next/image';
import Link from 'next/link';
import { KindBadge } from './KindBadge';
import { getCategory } from '@/data/categories';
import type { Project } from '@/data/types';

// Kartu proyek: foto dengan keterangan kecil (kategori/lokasi) dan judul di bawahnya
export function ProjectCard({
  project,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  headingLevel = 'h3',
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  headingLevel?: 'h2' | 'h3';
}) {
  const H = headingLevel;
  const caption = [project.location, getCategory(project.category).label]
    .filter(Boolean)
    .join(' · ');
  return (
    <Link href={`/proyek/${project.slug}/`} className="group block">
      <div className={`relative overflow-hidden rounded-md bg-surface ${aspect}`}>
        <Image
          src={project.cover.thumb}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <KindBadge kind={project.cover.kind} />
      </div>
      <p className="mt-4 text-[11px] tracking-[0.18em] text-muted uppercase">{caption}</p>
      <H className="mt-1 font-serif text-xl leading-tight group-hover:underline group-hover:underline-offset-4">
        {project.title}
      </H>
    </Link>
  );
}
