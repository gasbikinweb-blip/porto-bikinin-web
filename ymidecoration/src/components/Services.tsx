'use client';

// Kartu layanan bergaya kartu destinasi. Klik kartu membuka modal detail layanan
// berisi penjelasan, unsur dekorasi, dan acara terkait dari portofolio.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowIcon, CloseIcon, PinIcon, WhatsAppIcon } from './icons';
import { services, type Service } from '@/data/content';
import { events, eventTypes, getEvent } from '@/data/events';
import { buildWhatsAppLink, config } from '@/lib/config';

const related = (s: Service) => events.filter((e) => e.type === s.type);
const cover = (s: Service) => getEvent(s.image[0])?.images[s.image[1]];

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
    document.body.style.overflow = selected ? 'hidden' : '';
    if (!selected) trigger.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const openEvent = (slug: string) => {
    trigger.current = null;
    setSelected(null);
    // Galeri acara dibuka oleh Portofolio lewat hash
    history.pushState(null, '', `#acara-${slug}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <section id="layanan" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Layanan</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Untuk setiap <em className="text-gold-text">momen berharga</em>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-muted lg:justify-self-end">
            Pilih jenis acara untuk melihat detail dekorasinya dan contoh dari portofolio kami.
          </p>
        </div>

        <ul
          data-stagger
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
        >
          {services.map((s) => {
            const img = cover(s);
            const count = related(s).length;
            return (
              <li key={s.type} className="reveal w-[70%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    trigger.current = e.currentTarget;
                    setSelected(s);
                  }}
                  aria-label={`Lihat detail layanan ${s.title}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-night text-left text-white"
                >
                  {img && (
                    <Image
                      src={img.thumb}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, 70vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-night/25"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-[0.65rem] tracking-[0.15em] text-ink uppercase backdrop-blur">
                    {eventTypes[s.type]}
                  </span>
                  <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-paper text-ink transition group-hover:bg-gold-light">
                    <ArrowIcon />
                  </span>
                  <span className="absolute inset-x-4 bottom-4">
                    <span className="block font-serif text-3xl leading-[1.05]">{s.title}</span>
                    <span className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                      <PinIcon className="size-3.5" />
                      {count > 0 ? `${count} acara di portofolio` : 'Surabaya & sekitarnya'}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="judul-layanan"
        onCancel={(e) => {
          e.preventDefault();
          setSelected(null);
        }}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-paper text-ink sm:m-auto sm:h-auto sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-3xl"
      >
        {selected && (
          <div key={selected.type} className="grid min-h-full sm:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-80 bg-night sm:min-h-full">
              {cover(selected) && (
                <Image
                  src={cover(selected)!.src}
                  alt={cover(selected)!.alt}
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
              )}
              <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.65rem] tracking-[0.15em] uppercase">
                {eventTypes[selected.type]}
              </span>
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <h3 id="judul-layanan" className="font-serif text-4xl leading-none sm:text-5xl">
                  {selected.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Tutup detail layanan"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:border-ink"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className="leading-relaxed text-muted">{selected.text}</p>

              <div>
                <p className="text-xs tracking-[0.2em] text-gold-text uppercase">
                  Yang bisa kami siapkan
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.includes.map((x) => (
                    <li key={x} className="rounded-full border border-line px-4 py-1.5 text-sm">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              {related(selected).length > 0 && (
                <div>
                  <p className="text-xs tracking-[0.2em] text-gold-text uppercase">
                    Dari portofolio
                  </p>
                  <ul className="mt-3 grid grid-cols-2 gap-3">
                    {related(selected).map((e) => (
                      <li key={e.slug}>
                        <button
                          type="button"
                          onClick={() => openEvent(e.slug)}
                          className="group block w-full text-left"
                        >
                          <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ivory">
                            <Image
                              src={e.cover.thumb}
                              alt=""
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </span>
                          <span className="mt-2 block font-serif text-xl">{e.title}</span>
                          <span className="block text-xs text-muted">
                            Lihat galeri · {e.images.length} foto
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={buildWhatsAppLink(
                  `Halo ${config.name}, saya ingin konsultasi dekorasi ${selected.title.toLowerCase()}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-ink px-6 text-sm tracking-[0.15em] text-paper uppercase hover:bg-gold-text"
              >
                <WhatsAppIcon className="size-5" />
                Konsultasi {selected.title}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
