'use client';

// Daftar proyek + filter kategori + popup detail proyek (situs satu halaman).
// Popup memakai <dialog> showModal: fokus terkunci, Esc menutup, fokus kembali ke kartu pemicu.
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category, Project } from '@/data/projects';
import { buildWhatsAppLink, config } from '@/lib/config';
import { BeforeAfter } from './BeforeAfter';
import { Gallery } from './Gallery';
import { RenderBadge } from './RenderBadge';
import { ArrowIcon, WhatsAppIcon } from './icons';

type Props = { projects: Project[]; categories: Category[] };

export function ProjectShowcase({ projects, categories }: Props) {
  const [active, setActive] = useState<Category | 'Semua'>('Semua');
  const [open, setOpen] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const shown = active === 'Semua' ? projects : projects.filter((p) => p.category === active);

  const show = useCallback((p: Project, el: HTMLElement | null) => {
    opener.current = el;
    setOpen(p);
    if (!dialog.current?.open) dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  }, []);

  // Link "#proyek/<slug>" (mis. dari hero) langsung membuka popup proyek tersebut
  useEffect(() => {
    const fromHash = () => {
      const m = /^#proyek\/([a-z0-9-]+)$/.exec(window.location.hash);
      const p = m && projects.find((x) => x.slug === m[1]);
      if (!p) return;
      document.getElementById('proyek')?.scrollIntoView();
      show(p, null);
      history.replaceState(null, '', '#proyek');
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [projects, show]);

  return (
    <>
      {/* Kartu kategori bernomor; klik untuk memfilter */}
      <div className="flex flex-wrap items-center justify-end gap-4">
        <button
          type="button"
          aria-pressed={active === 'Semua'}
          onClick={() => setActive('Semua')}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-foreground aria-pressed:border-foreground"
        >
          Semua kategori <ArrowIcon className="size-4" />
        </button>
      </div>
      <ul
        role="group"
        aria-label="Filter kategori proyek"
        data-stagger
        className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5"
      >
        {categories.map((c, i) => {
          const cover = projects.find((p) => p.category === c)?.cover;
          return (
            <li key={c} className="reveal">
              <button
                type="button"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-surface-2 text-left text-white ring-accent ring-offset-4 ring-offset-surface aria-pressed:ring-2"
              >
                {cover && (
                  <Image
                    src={cover.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-lg sm:text-xl">{c}</span>
                {/* Nomor di "takik" pojok kiri bawah */}
                <span className="absolute bottom-0 left-0 rounded-tr-3xl bg-surface px-4 pt-2 pb-1 text-xl text-foreground sm:text-2xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only" aria-live="polite">
        Menampilkan {shown.length} proyek
      </p>

      <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          // key menyertakan filter agar animasi muncul ulang saat kategori diganti
          <li
            key={`${active}-${p.slug}`}
            className="animate-in"
            style={{ '--delay': `${(i % 3) * 90}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={(e) => show(p, e.currentTarget)}
              className="group block w-full text-left"
              aria-haspopup="dialog"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={p.cover.thumb}
                  alt={p.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {p.cover.kind === 'render' && <RenderBadge />}
                <span className="absolute right-3 bottom-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Lihat detail
                </span>
              </div>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-serif text-2xl">{p.title}</span>
                <span className="shrink-0 text-xs tracking-[0.2em] text-muted uppercase">
                  {p.category}
                </span>
              </span>
              <span className="mt-1 block text-sm text-muted">
                {p.propertyType}
                {p.location && ` · ${p.location}`}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="proyek-judul"
        className="m-auto max-h-[92dvh] w-[min(72rem,94vw)] overflow-y-auto bg-background p-0 text-foreground"
        onClose={() => opener.current?.focus()}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        {open && <ProjectDetail project={open} onClose={() => dialog.current?.close()} />}
      </dialog>
    </>
  );
}

function ProjectDetail({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const before = p.images.find((i) => i.kind === 'before');
  const after = p.images.find((i) => i.kind === 'after');
  const gallery = p.images.filter((i) => i.kind !== 'before' && i.kind !== 'after');
  const message = `Halo ${config.siteName}, saya tertarik dengan proyek ${p.title} (${p.propertyType}) dan ingin konsultasi untuk ruangan serupa.`;
  const facts = [
    ['Tipe properti', p.propertyType],
    ['Lokasi', p.location],
    ['Gaya', p.style],
    ['Tahun', p.year?.toString()],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <article className="p-5 sm:p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-accent-ink uppercase">
            <span className="rule-motif" aria-hidden="true" />
            {p.category}
          </p>
          <h3 id="proyek-judul" className="mt-3 font-serif text-4xl sm:text-5xl">
            {p.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-accent"
          aria-label="Tutup detail proyek"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <p className="leading-relaxed text-muted lg:col-span-7">{p.summary}</p>
        <dl className="grid content-start gap-4 text-sm lg:col-span-5">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">{k}</dt>
              <dd className="mt-1 font-serif text-xl">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="text-xs tracking-[0.2em] text-muted uppercase">Lingkup</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {p.scope.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {before && after && (
        <section aria-label="Sebelum dan sesudah" className="mt-10">
          <h4 className="font-serif text-2xl">
            Sebelum &amp; <em>sesudah</em>
          </h4>
          <div className="mt-4">
            <BeforeAfter before={before} after={after} />
          </div>
        </section>
      )}

      <section aria-label="Galeri" className="mt-10">
        <h4 className="font-serif text-2xl">Galeri</h4>
        <div className="mt-4">
          <Gallery images={gallery} title={p.title} />
        </div>
      </section>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-ink"
      >
        <WhatsAppIcon className="size-5" />
        Konsultasikan Ruangan Serupa
        <span className="sr-only"> (membuka tab baru)</span>
      </a>
    </article>
  );
}
