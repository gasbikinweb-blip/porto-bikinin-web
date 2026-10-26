'use client';

// Modal detail produk dengan animasi buka/tutup ala macOS: panel "tumbuh" dari kartu yang diklik
// lalu mengecil kembali ke kartu itu saat ditutup. Berbasis <dialog> (fokus terkunci, Esc menutup).
// Animasi dimatikan bila pengguna memilih gerakan minimal.
import { useCallback, useEffect, useId, useRef } from 'react';
import { getCategory } from '@/data/categories';
import type { Product } from '@/data/products';
import { safeAnimate } from '@/lib/motion';
import { ProductView } from './ProductView';
import { ResellerCTA } from './ResellerCTA';

export type OpenProduct = { product: Product; origin: DOMRect | null };

// Transform awal: dari tengah kartu asal, kecil & sedikit miring ke bawah (efek "genie" sederhana)
function fromOrigin(panel: HTMLElement, origin: DOMRect | null): Keyframe {
  if (!origin) return { transform: 'translateY(24px) scale(0.92)', opacity: 0 };
  const box = panel.getBoundingClientRect();
  const dx = origin.left + origin.width / 2 - (box.left + box.width / 2);
  const dy = origin.top + origin.height / 2 - (box.top + box.height / 2);
  const scale = Math.max(0.08, Math.min(origin.width / box.width, origin.height / box.height));
  return {
    transform: `translate(${dx}px, ${dy}px) scale(${scale}) perspective(800px) rotateX(8deg)`,
    opacity: 0.2,
    borderRadius: '3rem',
    filter: 'blur(2px)',
  };
}

export function ProductModal({ open, onClose }: { open: OpenProduct; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const headingId = useId();

  useEffect(() => {
    const dialog = ref.current;
    const panel = panelRef.current;
    if (!dialog || !panel) return;
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    safeAnimate(
      panel,
      [
        fromOrigin(panel, open.origin),
        { transform: 'none', opacity: 1, borderRadius: '2rem', filter: 'none' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.2, 0.9, 0.25, 1)' },
    );
    safeAnimate(
      dialog,
      [{ backgroundColor: 'rgb(54 35 28 / 0)' }, { backgroundColor: 'rgb(54 35 28 / 0.55)' }],
      { duration: 400 },
    );
    return () => {
      document.body.style.overflow = '';
      if (dialog.open) dialog.close();
      trigger?.focus();
    };
  }, [open]);

  // Tutup dengan animasi kembali ke kartu asal
  const close = useCallback(() => {
    const panel = panelRef.current;
    if (closing.current) return;
    if (!panel) return onClose();
    closing.current = true;
    safeAnimate(
      ref.current,
      [{ backgroundColor: 'rgb(54 35 28 / 0.55)' }, { backgroundColor: 'rgb(54 35 28 / 0)' }],
      { duration: 380, fill: 'forwards' },
    );
    safeAnimate(
      panel,
      [{ transform: 'none', opacity: 1 }, fromOrigin(panel, open.origin)],
      { duration: 380, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' },
      () => {
        closing.current = false;
        onClose();
      },
    );
  }, [onClose, open.origin]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={headingId}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-transparent sm:p-6"
      // Latar gelap diatur lewat animasi agar ikut memudar
      style={{ backgroundColor: 'rgb(54 35 28 / 0.55)' }}
    >
      <div
        className="flex min-h-full items-start justify-center sm:items-center"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div
          ref={panelRef}
          className="relative w-full max-w-6xl rounded-none bg-background p-4 shadow-2xl will-change-transform sm:rounded-[2rem] sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            className="sticky top-2 z-10 float-right -mt-1 mb-2 grid size-11 place-items-center rounded-full bg-surface text-2xl leading-none hover:bg-surface-2"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Tutup detail produk</span>
          </button>
          <ProductView
            product={open.product}
            categoryName={getCategory(open.product.category)?.name ?? ''}
            headingLevel="h2"
            headingId={headingId}
          />
          <div className="mt-10 clear-both">
            <ResellerCTA compact />
          </div>
        </div>
      </div>
    </dialog>
  );
}
