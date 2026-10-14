'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type ClientType, type Project } from '@/data/projects';
import { ArrowIcon, CloseIcon, WhatsAppIcon } from './icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type Props = {
  projects: readonly Project[];
};

const filterTabs: readonly ('Semua' | ClientType)[] = [
  'Semua',
  'Perkantoran',
  'Komersial/Kafe',
  'Residensial',
];

export function ProjectPortfolio({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState<'Semua' | ClientType>('Semua');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = activeFilter === 'Semua'
    ? projects
    : projects.filter((p) => p.clientType === activeFilter);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    // Return focus to trigger button
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  // Next / Previous
  const nextProject = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [activeIndex, filteredProjects.length]);

  const prevProject = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredProjects.length - 1));
  }, [activeIndex, filteredProjects.length]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      } else if (e.key === 'Tab' && modalRef.current) {
        // Focus trap
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (first && last) {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, closeLightbox, nextProject, prevProject]);

  const currentProject = activeIndex !== null ? filteredProjects[activeIndex] : null;

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`cursor-pointer rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-foreground text-background shadow-md'
                  : 'border border-line bg-surface text-foreground/80 hover:border-accent hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid Portofolio */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((p, idx) => (
          <article
            key={p.id}
            className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-black/10"
          >
            {/* Foto Proyek */}
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Tag Render 3D atau Proyek Nyata */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
                  {p.clientType}
                </span>
                {p.kind === 'render 3D' && (
                  <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-semibold text-black backdrop-blur-sm shadow-sm">
                    Render 3D / Desain
                  </span>
                )}
              </div>

              {/* Tombol buka Lightbox */}
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActiveIndex(idx);
                }}
                aria-label={`Buka foto detail ${p.title}`}
                className="cursor-pointer absolute inset-0 size-full text-left focus:outline-none"
              >
                <span className="sr-only">Perbesar foto {p.title}</span>
              </button>

              <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background opacity-0 transition-all duration-300 group-hover:opacity-100">
                Lihat Detail <ArrowIcon className="size-3.5" />
              </span>
            </div>

            {/* Informasi Proyek */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-accent uppercase">
                  {p.roomType}
                </p>
                <h3 className="mt-1 font-serif text-xl font-medium text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  <strong className="text-foreground/90 font-medium">Item:</strong> {p.itemsSupplied}
                </p>
              </div>

              {p.location && (
                <p className="mt-4 border-t border-line/60 pt-3 text-[11px] text-muted flex items-center justify-between">
                  <span>Lokasi: {p.location}</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {currentProject && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentProject.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          {/* Overlay click to close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Tutup jendela pratinjau"
            className="absolute inset-0 size-full cursor-default"
          />

          <div className="relative z-10 mx-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface border border-line shadow-2xl">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <span className="text-xs font-semibold text-accent uppercase">
                  {currentProject.clientType} • {currentProject.roomType}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                  {currentProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Tutup pratinjau"
                className="cursor-pointer rounded-full p-2 text-muted hover:bg-surface-2 hover:text-foreground transition-colors"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            {/* Content Modal */}
            <div className="grid md:grid-cols-5 gap-6 p-5 overflow-y-auto max-h-[75vh]">
              {/* Image with Aspect Ratio */}
              <div className="relative aspect-[4/5] md:col-span-3 overflow-hidden rounded-xl bg-surface-2">
                <Image
                  src={currentProject.src}
                  alt={currentProject.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
                {currentProject.kind === 'render 3D' && (
                  <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black shadow-md">
                    Render 3D / Desain
                  </span>
                )}
              </div>

              {/* Info & WhatsApp CTA */}
              <div className="md:col-span-2 flex flex-col justify-between space-y-5">
                <div>
                  <h4 className="font-serif text-lg text-foreground font-medium">
                    Detail Pengadaan Furnitur
                  </h4>
                  <dl className="mt-3 divide-y divide-line text-sm">
                    <div className="py-2.5">
                      <dt className="text-xs text-muted">Kategori Klien</dt>
                      <dd className="font-medium text-foreground">{currentProject.clientType}</dd>
                    </div>
                    <div className="py-2.5">
                      <dt className="text-xs text-muted">Area Ruangan</dt>
                      <dd className="font-medium text-foreground">{currentProject.roomType}</dd>
                    </div>
                    <div className="py-2.5">
                      <dt className="text-xs text-muted">Item Furnitur Disuplai</dt>
                      <dd className="font-medium text-foreground">{currentProject.itemsSupplied}</dd>
                    </div>
                    {currentProject.location && (
                      <div className="py-2.5">
                        <dt className="text-xs text-muted">Lokasi</dt>
                        <dd className="font-medium text-foreground">{currentProject.location}</dd>
                      </div>
                    )}
                  </dl>

                  {currentProject.productSlug && (
                    <div className="mt-4">
                      <Link
                        href={`/produk/${currentProject.productSlug}`}
                        className="text-xs font-semibold text-accent hover:text-accent-strong underline inline-flex items-center gap-1"
                      >
                        Lihat produk serupa di katalog →
                      </Link>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-line">
                  <a
                    href={buildWhatsAppLink(
                      `Halo Busr Mebel, saya tertarik dengan proyek portofolio "${currentProject.title}" (${currentProject.itemsSupplied}). Bisakah kami konsultasi untuk proyek serupa?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
                  >
                    <WhatsAppIcon className="size-4" />
                    Konsultasi Proyek Serupa
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Modal dengan Navigasi Panah */}
            <div className="flex items-center justify-between border-t border-line px-5 py-3 bg-surface-2/40 text-xs text-muted">
              <span>Gunakan keyboard <strong>Esc</strong> untuk tutup, <strong>← / →</strong> untuk navigasi</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Proyek sebelumnya"
                  className="cursor-pointer rounded-lg border border-line px-3 py-1 hover:bg-surface hover:text-foreground"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Proyek berikutnya"
                  className="cursor-pointer rounded-lg border border-line px-3 py-1 hover:bg-surface hover:text-foreground"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
