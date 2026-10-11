import { en } from './en';
import { id } from './id';
import type { Locale, SiteContent } from './types';

export const locales = ['en', 'id'] as const satisfies readonly Locale[];
/** Bahasa default (URL "/"). Indonesia ada di "/id". */
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, SiteContent> = { en, id };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

/** Path beranda untuk tiap bahasa */
export const homePath = (locale: Locale) => (locale === defaultLocale ? '/' : `/${locale}`);

export const otherLocale = (locale: Locale): Locale => (locale === 'en' ? 'id' : 'en');

export type { Locale, SiteContent };
