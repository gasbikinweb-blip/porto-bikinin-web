import { en } from './en';
import { id } from './id';
import type { Locale, SiteContent } from './types';

/**
 * Bahasa yang AKTIF di website. Saat ini hanya Indonesia (di "/").
 * Teks English tetap disimpan di en.ts; untuk mengaktifkan lagi lihat README ("Mengaktifkan bahasa Inggris").
 */
export const locales = ['id'] as const satisfies readonly Locale[];
/** Bahasa default (URL "/"). Bahasa lain ada di "/<kode>". */
export const defaultLocale: Locale = 'id';
/** True bila lebih dari satu bahasa aktif (tombol ganti bahasa & hreflang hanya muncul saat ini true) */
export const isMultilingual = (locales as readonly Locale[]).length > 1;

const dictionaries: Record<Locale, SiteContent> = { en, id };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

/** Path beranda untuk tiap bahasa */
export const homePath = (locale: Locale) => (locale === defaultLocale ? '/' : `/${locale}`);

/** Bahasa aktif lain (untuk tombol ganti bahasa); null bila hanya satu bahasa */
export const otherLocale = (locale: Locale): Locale | null =>
  (locales as readonly Locale[]).find((l) => l !== locale) ?? null;

export type { Locale, SiteContent };
