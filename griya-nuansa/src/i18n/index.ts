// Dua bahasa: Indonesia (URL tanpa awalan, mis. /proyek/) dan Inggris (awalan /en, mis. /en/proyek/).
// Slug halaman sengaja sama di kedua bahasa agar perpindahan bahasa cukup menambah/menghapus "/en".

export const langs = ['id', 'en'] as const;
export type Lang = (typeof langs)[number];

/** Nilai dalam dua bahasa */
export type L<T = string> = Record<Lang, T>;

/** Tambahkan awalan bahasa ke path internal ("/proyek/" -> "/en/proyek/") */
export function lp(lang: Lang, path: string): string {
  if (lang === 'id') return path;
  return path === '/' ? '/en/' : `/en${path}`;
}

export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'id';
}

/** Path tanpa awalan bahasa ("/en/proyek/" -> "/proyek/") */
export function basePath(pathname: string): string {
  if (langFromPath(pathname) === 'id') return pathname;
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

/** Path yang sama dalam bahasa lain, untuk tombol ID | EN */
export function switchLang(pathname: string, to: Lang): string {
  const base = basePath(pathname);
  return lp(to, base.endsWith('/') ? base : `${base}/`);
}
