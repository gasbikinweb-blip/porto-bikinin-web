// Dijalankan sebelum halaman tampil agar tidak "berkedip" saat memakai mode terang.
// File eksternal (bukan inline) supaya aman untuk CSP script-src 'self'.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch {
    // localStorage diblokir (mode privat, dll.): pakai tema default
  }
})();
