'use client';

import { useEffect } from 'react';
import { useLang } from '@/i18n/client';

/**
 * Link "lewati ke konten" + penyelaras atribut <html lang>.
 * theme-init.js mengatur lang saat halaman pertama dimuat; efek ini menjaganya tetap benar
 * saat berpindah bahasa lewat navigasi tanpa reload.
 */
export function SkipLink() {
  const { lang, t } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <a
      href="#konten"
      className="sr-only z-50 bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {t.skip}
    </a>
  );
}
