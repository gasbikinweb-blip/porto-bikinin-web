// Pasang tema tersimpan sebelum halaman digambar (mencegah kedipan warna).
// Kelas .js menandai JavaScript aktif (animasi muncul saat digulir). Diizinkan CSP script-src 'self'.
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('tema');
  if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
} catch {
  // storage diblokir: pakai tema sistem
}
