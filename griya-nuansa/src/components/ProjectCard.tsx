import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from './icons';
import { KindBadge } from './KindBadge';
import { getCategory } from '@/data/categories';
import type { Project } from '@/data/types';

// Kartu proyek membulat dengan bilah kaca (glass) berisi judul di bagian bawah
export function ProjectCard({
  project,
  aspect = 'aspect-[4/5]',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  headingLevel = 'h3',
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  headingLevel?: 'h2' | 'h3';
}) {
  const H = headingLevel;
  return (
    <Link
      href={`/proyek/${project.slug}/`}
      className={`group relative block overflow-hidden rounded-[1.5rem] bg-surface ${aspect}`}
    >
      <Image
        src={project.cover.thumb}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <KindBadge kind={project.cover.kind} />
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
        <div className="min-w-0">
          <H className="truncate font-serif text-xl leading-tight">{project.title}</H>
          <p className="mt-0.5 text-[11px] tracking-wider text-white/75 uppercase">
            {getCategory(project.category).label}
          </p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform group-hover:rotate-45">
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
