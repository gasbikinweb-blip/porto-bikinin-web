// Dijalankan sebelum halaman tampil agar tidak "berkedip" saat memakai mode gelap.
// File eksternal (bukan inline) supaya aman untuk CSP script-src 'self'.
// Default: mode terang. Mode gelap hanya bila pengunjung memilihnya.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch {
    // localStorage diblokir (mode privat, dll.): pakai tema default
  }
})();
