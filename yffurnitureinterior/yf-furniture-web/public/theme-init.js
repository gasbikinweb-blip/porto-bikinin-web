// Pasang tema tersimpan sebelum halaman digambar (mencegah kedipan warna).
// File lokal kecil; diizinkan CSP script-src 'self'.
try {
  var t = localStorage.getItem('tema');
  if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
} catch {
  // storage diblokir: pakai tema sistem
}
