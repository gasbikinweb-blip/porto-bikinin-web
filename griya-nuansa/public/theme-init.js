// Terapkan tema (terang/gelap) dan bahasa sebelum halaman tergambar agar tidak berkedip.
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
  // Bahasa halaman: /en/... = Inggris, selain itu Indonesia (layout statis selalu menulis lang="id")
  if (/^\/en(\/|$)/.test(location.pathname)) document.documentElement.lang = 'en';
})();
