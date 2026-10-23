'use client';

// Tombol ganti mode terang/gelap. Pilihan disimpan di localStorage (hanya di browser pengunjung).
// Tema awal diterapkan oleh public/theme-init.js sebelum halaman tergambar.
export function ThemeToggle({ className = '' }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('tema', next);
    } catch {
      // Penyimpanan diblokir (mode privat): tema tetap berlaku sampai halaman ditutup
    }
  }

  return (
    <button type="button" onClick={toggle} className={className}>
      <span className="sr-only">Ganti mode terang/gelap</span>
      {/* Bulan saat terang, matahari saat gelap (diatur lewat CSS di globals.css) */}
      <svg
        viewBox="0 0 24 24"
        className="ic-moon h-4 w-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="ic-sun h-4 w-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
