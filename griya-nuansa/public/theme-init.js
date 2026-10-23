// Terapkan tema (terang/gelap) sebelum halaman tergambar agar tidak berkedip.
// File terpisah (bukan inline) supaya lolos CSP script-src 'self'.
(function () {
  var t = null;
  try {
    t = localStorage.getItem('tema');
  } catch (_) {
    // localStorage diblokir: pakai preferensi sistem
  }
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', t);
})();
