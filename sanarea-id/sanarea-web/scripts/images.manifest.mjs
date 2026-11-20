// Daftar foto yang dipakai website. Sumber: ../assets (highlight & postingan IG @sanarea.id).
// out  : nama file di public/images/[dir]/
// y    : titik tengah crop vertikal (0 = atas, 1 = bawah) saat dipotong ke rasio 4:5
// kind : 'product' (4:5, 1200px + thumb 500px), 'editorial' (4:5, 1600px + thumb 500px)

const H = (folder) => `sorotan_${folder}`;

export const images = [
  // Editorial (hero, cerita brand)
  { dir: 'editorial', out: 'hero', src: '2026-09-18_Dda88IjGe2V/06.jpg', kind: 'editorial' },
  { dir: 'editorial', out: 'printed-duo', src: '2026-09-18_Dda88IjGe2V/07.jpg', kind: 'editorial' },
  { dir: 'editorial', out: 'naleea-duo', src: '2026-10-27_De-zSBrmRHD/05.jpg', kind: 'editorial' },
  { dir: 'editorial', out: 'kaleea-vanilla', src: '2026-10-26_De9iJOVmUiv/03.jpg', kind: 'editorial' },

  // Seera Shawl
  { dir: 'produk', out: 'seera-earth', src: `${H('Seera Shawl_18048641885290907')}/04.jpg`, y: 0.62 },
  { dir: 'produk', out: 'seera-neutral', src: `${H('Seera Shawl_18048641885290907')}/05.jpg`, y: 0.62 },
  { dir: 'produk', out: 'seera-pastel', src: `${H('Seera Shawl_18048641885290907')}/07.jpg`, y: 0.62 },
  { dir: 'produk', out: 'seera-cool', src: `${H('Seera Shawl_18048641885290907')}/08.jpg`, y: 0.62 },
  { dir: 'produk', out: 'seera-rack', src: `${H('Seera Shawl_18048641885290907')}/02.jpg`, y: 0.35 },

  // Vela Bandana
  { dir: 'produk', out: 'vela-small', src: `${H('Vela Bandana_17916879360428903')}/03.jpg`, y: 0.62 },
  { dir: 'produk', out: 'vela-medium', src: `${H('Vela Bandana_17916879360428903')}/05.jpg`, y: 0.62 },
  { dir: 'produk', out: 'vela-small-colors', src: `${H('Vela Bandana_17916879360428903')}/04.jpg`, y: 0.55 },
  { dir: 'produk', out: 'vela-medium-colors', src: `${H('Vela Bandana_17916879360428903')}/06.jpg`, y: 0.62 },

  // Two Tone (Naleea Khiban Two Tone)
  { dir: 'produk', out: 'twotone-cover', src: `${H('Two Tone_18082671260455134')}/01.jpg`, y: 0.5 },
  { dir: 'produk', out: 'twotone-pistachio-mahogany', src: `${H('Two Tone_18082671260455134')}/02.jpg`, y: 0.6 },
  { dir: 'produk', out: 'twotone-wine-soft-pink', src: `${H('Two Tone_18082671260455134')}/03.jpg`, y: 0.6 },
  { dir: 'produk', out: 'twotone-vanilla-walnut', src: `${H('Two Tone_18082671260455134')}/04.jpg`, y: 0.6 },
  { dir: 'produk', out: 'twotone-black-ivory', src: `${H('Two Tone_18082671260455134')}/05.jpg`, y: 0.62 },
  { dir: 'produk', out: 'twotone-silver-navy', src: `${H('Two Tone_18082671260455134')}/06.jpg`, y: 0.62 },

  // Khiban Rayon (Naleea Shawl)
  { dir: 'produk', out: 'naleea-model', src: '2026-10-27_De-zSBrmRHD/04.jpg' },
  { dir: 'produk', out: 'naleea-espresso-walnut', src: `${H('Khiban Rayon_17951080002321605')}/05.jpg`, y: 0.62 },
  { dir: 'produk', out: 'naleea-earth', src: `${H('Khiban Rayon_17951080002321605')}/07.jpg`, y: 0.62 },
  { dir: 'produk', out: 'naleea-colors', src: `${H('Khiban Rayon_17951080002321605')}/08.jpg`, y: 0.62 },

  // Khiban Viscose (Kaleea)
  { dir: 'produk', out: 'kaleea-vanilla', src: '2026-10-26_De9iJOVmUiv/04.jpg' },
  { dir: 'produk', out: 'kaleea-frappuccino', src: '2026-10-26_De9PufvmaBK/01.jpg' },
  { dir: 'produk', out: 'kaleea-espresso', src: '2026-10-26_De9sJKnGQDN/03.jpg' },
  { dir: 'produk', out: 'kaleea-dark-cocoa', src: '2026-09-24_DdqhxRSGa3R/05.jpg' },
  { dir: 'produk', out: 'kaleea-ivory', src: '2026-09-24_Ddq0g7kGc7n/02.jpg' },

  // Eleera Viscose Shawl
  { dir: 'produk', out: 'eleera-cover', src: `${H('Eleera Viscose_18368408182150749')}/01.jpg`, y: 0.5 },
  { dir: 'produk', out: 'eleera-brown', src: `${H('Eleera Viscose_18368408182150749')}/02.jpg`, y: 0.5 },
  { dir: 'produk', out: 'eleera-earth', src: `${H('Eleera Viscose_18368408182150749')}/03.jpg`, y: 0.5 },
  { dir: 'produk', out: 'eleera-cool', src: `${H('Eleera Viscose_18368408182150749')}/04.jpg`, y: 0.5 },
  { dir: 'produk', out: 'eleera-pink', src: `${H('Eleera Viscose_18368408182150749')}/05.jpg`, y: 0.55 },

  // Aleena Sport
  { dir: 'produk', out: 'aleena-cover', src: `${H('Aleena Sport_18133851778722477')}/01.jpg`, y: 0.55 },
  { dir: 'produk', out: 'aleena-colors', src: `${H('Aleena Sport_18133851778722477')}/02.jpg`, y: 0.5 },
  { dir: 'produk', out: 'aleena-look', src: `${H('SALE_17984615129862311')}/10.jpg`, y: 0.55 },

  // Paris Basic
  { dir: 'produk', out: 'paris-cover', src: `${H('Paris Basic_17978476820793942')}/05.jpg`, y: 0.6 },
  { dir: 'produk', out: 'paris-earth', src: `${H('Paris Basic_17978476820793942')}/06.jpg`, y: 0.55 },
  { dir: 'produk', out: 'paris-pink', src: `${H('Paris Basic_17978476820793942')}/07.jpg`, y: 0.55 },
  { dir: 'produk', out: 'paris-detail', src: `${H('Paris Basic_17978476820793942')}/01.jpg`, y: 0.55 },

  // Printed Shawl (Viscose Printed, Marble Series)
  { dir: 'produk', out: 'printed-rich-brown', src: '2026-09-18_Dda88IjGe2V/08.jpg' },
  { dir: 'produk', out: 'printed-midnight-blue', src: '2026-09-22_Ddlp5qKGaK7/03.jpg' },
  { dir: 'produk', out: 'printed-ash-brown', src: '2026-09-19_Dddqo4-maqe/04.jpg' },
  { dir: 'produk', out: 'printed-charcoal', src: '2026-09-18_DdbP2PImc7T/04.jpg' },
  { dir: 'produk', out: 'printed-dusty-rose', src: '2026-09-19_DddkpRGmcbO/03.jpg' },
  { dir: 'produk', out: 'printed-swatch', src: `${H('Printed Shawl_17983101486005133')}/15.jpg`, y: 0.55 },

  // Aksesoris
  { dir: 'produk', out: 'pin-cover', src: `${H('Magnetic Pin_18133415992506402')}/02.jpg`, y: 0.6 },
  { dir: 'produk', out: 'scrunchie-cover', src: `${H('Scrunchie Tulle_18130673416631485')}/02.jpg`, y: 0.45 },
  { dir: 'produk', out: 'scrunchie-sizes', src: `${H('Scrunchie Tulle_18130673416631485')}/04.jpg`, y: 0.55 },
  { dir: 'produk', out: 'scrunchie-black', src: `${H('Scrunchie Tulle_18130673416631485')}/03.jpg`, y: 0.62 },

  // Toko (foto depan toko dari pemilik: assets/Lokasi)
  { dir: 'toko', out: 'lokasi-1', src: 'Lokasi/lokasi_1.jpg', y: 0.55 },
  { dir: 'toko', out: 'lokasi-2', src: 'Lokasi/lokasi_2.jpg', y: 0.5 },
  { dir: 'toko', out: 'lokasi-3', src: 'Lokasi/lokasi_3.jpg', y: 0.45 },
  { dir: 'toko', out: 'lokasi-4', src: 'Lokasi/lokasi_4.jpg', y: 0.6 },

  // Sanaréa Moments (hanya foto tanpa wajah pengunjung yang jelas)
  { dir: 'moments', out: 'cfd-rack', src: `${H('C F D_18099728773808531')}/20.jpg`, y: 0.6 },
  { dir: 'moments', out: 'cfd-booth', src: `${H('C F D_18099728773808531')}/19.jpg`, y: 0.62 },
  { dir: 'moments', out: 'event-rack', src: `${H('Event_18318223717304841')}/03.jpg`, y: 0.6 },
  { dir: 'moments', out: 'event-table', src: `${H('Event_18318223717304841')}/06.jpg`, y: 0.5 },
  { dir: 'moments', out: 'event-welcome', src: `${H('Event_18318223717304841')}/04.jpg`, y: 0.62 },
  { dir: 'moments', out: 'cfd-restock', src: `${H('C F D_18099728773808531')}/12.jpg`, y: 0.62 },
];
