// Data portofolio proyek Busr Mebel untuk klien B2B (kantor, hotel, kafe) dan B2C (residensial).
// Sesuai panduan: data placeholder yang perlu verifikasi ditandai // TODO.
// Foto berlabel 'render 3D' akan ditandai dengan badge "Render 3D / Desain" di UI.

export type ClientType = 'Perkantoran' | 'Komersial/Kafe' | 'Residensial';
export type ProjectKind = 'proyek nyata' | 'render 3D';

export interface Project {
  id: string;
  title: string;
  clientType: ClientType;
  roomType: string;
  itemsSupplied: string;
  location?: string;
  kind: ProjectKind;
  src: string;
  alt: string;
  width: number;
  height: number;
  productSlug?: string;
}

export const projects: readonly Project[] = [
  {
    id: 'proj-01',
    title: 'Lobby & Receptionist Area Perkantoran',
    clientType: 'Perkantoran',
    roomType: 'Lobby & Front Desk',
    itemsSupplied: 'Meja Resepsionis Kayu Jati Asimetris V-Shape 2.4m',
    kind: 'proyek nyata',
    src: '/products/meja-resepsionis-atrium/01.webp',
    alt: 'Pemasangan Meja Resepsionis Atrium di lobby kantor',
    width: 1080,
    height: 1350,
    productSlug: 'meja-resepsionis-atrium',
  },
  {
    id: 'proj-02',
    title: 'Ruang Kerja Direktur Eksekutif',
    clientType: 'Perkantoran',
    roomType: 'Executive Office',
    itemsSupplied: 'Meja Eksekutif Kayu Jati Top Granit Hitam & Kaki Stainless',
    kind: 'proyek nyata',
    src: '/products/meja-kerja-eksekutif-volo/01.webp',
    alt: 'Penataan Meja Kerja Eksekutif Volo di ruang direksi',
    width: 1080,
    height: 1350,
    productSlug: 'meja-kerja-eksekutif-volo',
  },
  {
    id: 'proj-03',
    title: 'Lounge Kolaboratif & Ruang Tunggu Eksekutif',
    clientType: 'Perkantoran',
    roomType: 'Executive Lounge & Waiting Area',
    itemsSupplied: 'Sofa Modular Lengkung Aera Curve 2.8m Fabric Grey',
    kind: 'proyek nyata',
    src: '/products/sofa-modular-aera-curve/01.webp',
    alt: 'Sofa modular curve terpasang di lounge perkantoran',
    width: 1080,
    height: 1350,
    productSlug: 'sofa-modular-aera-curve',
  },
  {
    id: 'proj-04',
    title: 'Ruang Kerja Manajer & Studio Desain',
    clientType: 'Perkantoran',
    roomType: 'Manager Workstation',
    itemsSupplied: 'Meja Kerja Solid Teak Dark Finish Beveled Edge',
    kind: 'proyek nyata',
    src: '/products/meja-kerja-jati-teak-desk/01.webp',
    alt: 'Meja kerja kayu jati solid di ruang manajer',
    width: 1080,
    height: 1350,
    productSlug: 'meja-kerja-jati-teak-desk',
  },
  {
    id: 'proj-05',
    title: 'Specialty Coffee Shop & Coworking Cafe',
    clientType: 'Komersial/Kafe',
    roomType: 'Indoor Dining & Cafe Lounge',
    itemsSupplied: '16 Unit Kursi Cantilever Chrome Bauhaus Velvet Terracotta',
    kind: 'proyek nyata',
    src: '/products/kursi-cantilever-chrome-bauhaus/01.webp',
    alt: 'Pengadaan kursi cantilever chrome di kafe modern',
    width: 1080,
    height: 1350,
    productSlug: 'kursi-cantilever-chrome-bauhaus',
  },
  {
    id: 'proj-06',
    title: 'Artisanal Cafe Interior Concept',
    clientType: 'Komersial/Kafe',
    roomType: 'Dining Area',
    itemsSupplied: 'Kursi Geometris Rosso Rangka Jati & Inlay Terrazzo Merah',
    kind: 'render 3D',
    src: '/products/kursi-geometris-rosso/01.webp',
    alt: 'Desain render 3D kursi geometris rosso terrazzo untuk kafe kontemporer',
    width: 1080,
    height: 1350,
    productSlug: 'kursi-geometris-rosso',
  },
  {
    id: 'proj-07',
    title: 'Boutique Hotel & Restoran Fine Dining',
    clientType: 'Komersial/Kafe',
    roomType: 'Fine Dining Restaurant',
    itemsSupplied: '24 Kursi Makan Viridian Emerald Upholstered Rangka Jati',
    kind: 'proyek nyata',
    src: '/products/kursi-makan-viridian-emerald/01.webp',
    alt: 'Kursi makan beludru hijau viridian di restoran fine dining',
    width: 1080,
    height: 1350,
    productSlug: 'kursi-makan-viridian-emerald',
  },
  {
    id: 'proj-08',
    title: 'Teras Outdoor Kafe & Rooftop Bar',
    clientType: 'Komersial/Kafe',
    roomType: 'Outdoor Rooftop Terrace',
    itemsSupplied: 'Set Meja Panjang & Kursi Anyaman Jati Weather-Resistant',
    kind: 'proyek nyata',
    src: '/products/set-meja-makan-outdoor-anyaman-jati/01.webp',
    alt: 'Set furnitur outdoor anyaman jati di teras kafe',
    width: 1080,
    height: 1350,
    productSlug: 'set-meja-makan-outdoor-anyaman-jati',
  },
  {
    id: 'proj-09',
    title: 'Bistronomi & Lounge Resto',
    clientType: 'Komersial/Kafe',
    roomType: 'VIP Dining Room',
    itemsSupplied: 'Kursi Makan Solenne Curve Velvet Fabric Sage',
    kind: 'proyek nyata',
    src: '/products/kursi-makan-solenne-curve/01.webp',
    alt: 'Kursi makan solenne curve di ruang makan VIP resto',
    width: 1080,
    height: 1350,
    productSlug: 'kursi-makan-solenne-curve',
  },
  {
    id: 'proj-10',
    title: 'Kamar Tidur Utama Villa Residensial',
    clientType: 'Residensial',
    roomType: 'Master Bedroom',
    itemsSupplied: 'Tempat Tidur Jati Tailored Serenity & Sepasang Nakas Bundar',
    kind: 'proyek nyata',
    src: '/products/tempat-tidur-jati-tailored-serenity/01.webp',
    alt: 'Tempat tidur jati minimalis dengan headboard linen di kamar utama',
    width: 1080,
    height: 1350,
    productSlug: 'tempat-tidur-jati-tailored-serenity',
  },
  {
    id: 'proj-11',
    title: 'Ruang Keluarga & Display Koleksi',
    clientType: 'Residensial',
    roomType: 'Living & Library Room',
    itemsSupplied: 'Rak Jati Bersiluet dengan Laci Bawah & Set Meja Bundar',
    kind: 'proyek nyata',
    src: '/products/rak-jati-bersiluet/01.webp',
    alt: 'Rak pajangan jati bersiluet di ruang keluarga minimalis',
    width: 1080,
    height: 1350,
    productSlug: 'rak-jati-bersiluet',
  },
  {
    id: 'proj-12',
    title: 'Ruang Santai Zen Living & Tea Room',
    clientType: 'Residensial',
    roomType: 'Zen Living Area',
    itemsSupplied: 'Meja Kopi The Kuro Low Jati Solid Rustic Black',
    kind: 'proyek nyata',
    src: '/products/meja-kopi-the-kuro-low/01.webp',
    alt: 'Meja kopi kayu jati hitam rustic di ruang santai',
    width: 1080,
    height: 1350,
    productSlug: 'meja-kopi-the-kuro-low',
  },
  {
    id: 'proj-13',
    title: 'Ruang Tamu Klasik Tropis',
    clientType: 'Residensial',
    roomType: 'Formal Living Room',
    itemsSupplied: 'Sepasang Armchair Klasik Eropa Ukir Jati Solid',
    kind: 'proyek nyata',
    src: '/products/armchair-klasik-eropa/01.webp',
    alt: 'Armchair kayu jati ukir klasik di ruang tamu formal',
    width: 1080,
    height: 1350,
    productSlug: 'armchair-klasik-eropa',
  },
  {
    id: 'proj-14',
    title: 'Konsep Ruang Makan Organik Modern',
    clientType: 'Residensial',
    roomType: 'Dining Area',
    itemsSupplied: 'Meja Makan Jati Peanut Organic Shape & Kursi Neva',
    kind: 'render 3D',
    src: '/products/meja-makan-jati-peanut/01.webp',
    alt: 'Desain render 3D meja makan jati bentuk kacang peanut untuk ruang makan modern',
    width: 1080,
    height: 1350,
    productSlug: 'meja-makan-jati-peanut',
  },
];

export function getAllProjects(): readonly Project[] {
  return projects;
}

export function getFeaturedProjects(limit = 6): readonly Project[] {
  return projects.slice(0, limit);
}
