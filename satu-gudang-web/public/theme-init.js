// Dijalankan sebelum halaman tampil agar tema pilihan pengguna tidak "berkedip".
// Tanpa pilihan tersimpan, CSS mengikuti tema sistem (prefers-color-scheme).
// File eksternal (bukan inline) supaya aman untuk CSP script-src 'self'.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch {
    // localStorage diblokir (mode privat, dll.): ikuti tema sistem
  }
})();
