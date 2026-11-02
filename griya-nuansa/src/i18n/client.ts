'use client';

import { usePathname } from 'next/navigation';
import { langFromPath } from './index';
import { ui } from './ui';

/** Bahasa aktif untuk komponen klien (header, footer, form), dibaca dari URL */
export function useLang() {
  const lang = langFromPath(usePathname());
  return { lang, t: ui[lang] };
}
