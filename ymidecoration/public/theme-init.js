// Pasang tema sebelum halaman digambar: pilihan tersimpan, kalau tidak ada ikuti sistem.
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = t;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
