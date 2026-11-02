'use client';

import { WhatsAppIcon } from './WhatsApp';
import { useLang } from '@/i18n/client';
import { buildWhatsAppLink } from '@/lib/config';

export function FloatingWhatsApp() {
  const { t } = useLang();
  return (
    <a
      href={buildWhatsAppLink(t.defaultWa)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pulse fixed right-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="sr-only">{t.floatingWa}</span>
    </a>
  );
}
