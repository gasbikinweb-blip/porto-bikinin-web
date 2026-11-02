'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { langs, switchLang } from '@/i18n';
import { useLang } from '@/i18n/client';

/** Pilihan bahasa "ID | EN": membuka halaman yang sama dalam bahasa lain */
export function LangSwitch({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const { lang, t } = useLang();

  return (
    <nav aria-label={t.langSwitch} className={className}>
      <ul className="flex items-center text-[11px] font-medium tracking-[0.18em]">
        {langs.map((l, i) => (
          <li key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="px-1.5 text-current/40">
                |
              </span>
            )}
            <Link
              href={switchLang(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? 'true' : undefined}
              className={`py-2 uppercase transition-colors ${
                l === lang ? 'text-current' : 'text-current/50 hover:text-current'
              }`}
            >
              {l}
              <span className="sr-only"> ({l === 'id' ? 'Bahasa Indonesia' : 'English'})</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
