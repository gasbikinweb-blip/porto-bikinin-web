// Lini produk (sesuai highlight IG). Klik kartu → katalog terfilter lini ini.
import { img } from './images';
import type { Collection } from './types';

export const collections: readonly Collection[] = [
  {
    slug: 'printed-shawl',
    name: 'Printed Shawl',
    tagline: 'Viscose motif marmer',
    cover: img('produk/printed-dusty-rose', 'Model memakai pashmina motif marmer Dusty Rose'),
  },
  {
    slug: 'khiban-viscose',
    name: 'Khiban Viscose',
    tagline: 'Kaleea · lembut & flowy',
    cover: img('produk/kaleea-dark-cocoa', 'Model memakai Kaleea Khiban Viscose Dark Cocoa'),
  },
  {
    slug: 'khiban-rayon',
    name: 'Khiban Rayon',
    tagline: 'Naleea · 20+ warna',
    cover: img('produk/naleea-model', 'Dua model memakai Naleea Khiban Rayon'),
  },
  {
    slug: 'two-tone',
    name: 'Two Tone',
    tagline: 'Khiban dua warna',
    cover: img('produk/twotone-vanilla-walnut', 'Khiban two tone Vanilla - Walnut'),
  },
  {
    slug: 'seera-shawl',
    name: 'Seera Shawl',
    tagline: 'Pashmina rayon tencel',
    cover: img('produk/seera-earth', 'Tumpukan Seera Shawl warna earth tone'),
  },
  {
    slug: 'eleera-viscose',
    name: 'Eleera Viscose',
    tagline: '26 warna',
    cover: img('produk/eleera-cover', 'Lipatan Eleera Viscose Shawl'),
  },
  {
    slug: 'paris-basic',
    name: 'Paris Basic',
    tagline: 'Voal ringan harian',
    cover: img('produk/paris-cover', 'Lipatan Plain Paris Basic'),
  },
  {
    slug: 'vela-bandana',
    name: 'Vela Bandana',
    tagline: 'Bandana instan',
    cover: img('produk/vela-medium', 'Manekin memakai Vela Instant Bandana'),
  },
  {
    slug: 'aleena-sport',
    name: 'Aleena Sport',
    tagline: 'Bergo instan sporty',
    cover: img('produk/aleena-cover', 'Manekin memakai Aleena Instant Sport'),
  },
  {
    slug: 'scrunchie-tulle',
    name: 'Scrunchie Tulle',
    tagline: 'Aksesoris rambut',
    cover: img('produk/scrunchie-cover', 'Scrunchie tulle SANARÉA'),
  },
  {
    slug: 'magnetic-pin',
    name: 'Magnetic Pin',
    tagline: 'Pin magnet anti geser',
    cover: img('produk/pin-cover', 'Magnetic pin SANARÉA'),
  },
];
