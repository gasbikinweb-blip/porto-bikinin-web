'use client';

// Pengelola <dialog> modal yang dipakai bersama (produk, galeri, warna, buku sampel).
// - showModal() membuat konten di luar dialog inert; Esc ditangani browser.
// - Penutupan lewat tombol/klik luar langsung me-reset isi (tidak menunggu event "close",
//   yang di Chrome baru dikirim pada frame render berikutnya).
// - Fokus dikembalikan ke elemen pemicu; scroll halaman dikunci selama modal terbuka.
import { useCallback, useEffect, useRef, useState } from 'react';

export function useModal<T>() {
  const ref = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || value === null) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [value]);

  // Dipanggil saat dialog tertutup (Esc / tombol / klik luar); aman dipanggil berulang
  const finish = useCallback(() => {
    setValue(null);
    triggerRef.current?.focus();
  }, []);

  const open = (next: T, trigger?: HTMLElement | null) => {
    if (trigger) triggerRef.current = trigger;
    // Nilai sama tetapi dialog sudah tertutup: buka ulang langsung
    if (next === value && ref.current && !ref.current.open) ref.current.showModal();
    setValue(next);
  };

  const close = () => {
    if (ref.current?.open) ref.current.close();
    finish();
  };

  /** Props untuk elemen <dialog>: ref, onClose, dan klik area gelap di luar modal */
  const dialogProps = {
    ref,
    onClose: finish,
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) close();
    },
  };

  return { value, setValue, open, close, dialogProps };
}
