'use client';

// Tombol mode gelap/terang. Pilihan disimpan di localStorage (hanya di browser pengunjung).
import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const EVENT = 'sanarea:tema';
const KEY = 'sanarea-tema';
const query = '(prefers-color-scheme: dark)';

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'dark' || set === 'light') return set;
  return window.matchMedia(query).matches ? 'dark' : 'light';
}

// Dengarkan perubahan tema sistem dan klik tombol
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function ThemeToggle() {
  // Saat prerender tema belum diketahui → null
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);
  const dark = theme === 'dark';

  function toggle() {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Storage diblokir: tema tetap berlaku selama halaman terbuka
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme ? dark : undefined}
      className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-ink"
    >
      <span className="sr-only">Mode gelap</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dark ? (
          // Matahari: klik untuk kembali ke mode terang
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
        )}
      </svg>
    </button>
  );
}
