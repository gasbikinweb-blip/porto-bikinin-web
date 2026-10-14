// Data katalog Busr Mebel. 28 Produk furnitur ready-stock dan custom.
// Disesuaikan dari data aset asli Busr Mebel (foto, spesifikasi dimensi, dan material).

export type CategorySlug =
  | 'meja-kerja'
  | 'kursi-ergonomis'
  | 'lemari-penyimpanan'
  | 'sofa-lounge'
  | 'meja-meeting'
  | 'custom-furniture';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** Minimal satu gambar; gambar pertama dipakai sebagai sampul */
  images: readonly [ProductImage, ...ProductImage[]];
  specs: {
    material: string;
    dimensions: string;
    colors: readonly string[];
  };
  /** Harga dalam Rupiah. Kosongkan untuk "Hubungi kami untuk penawaran" */
  price?: number;
  featured: boolean;
  isCustomizable: boolean;
}

export const categories: readonly Category[] = [
  {
    slug: 'meja-kerja',
    name: 'Meja Kerja & Kantor',
    description: 'Meja direktur, manajer, workstation kantor, dan meja kerja rumah tangga yang ergonomis dan kokoh.',
  },
  {
    slug: 'kursi-ergonomis',
    name: 'Kursi & Barstool',
    description: 'Kursi kerja ergonomis, kursi makan kayu solid, cantilever chrome, hingga barchair modern.',
  },
  {
    slug: 'lemari-penyimpanan',
    name: 'Lemari & Rak Penyimpanan',
    description: 'Rak buku, display terbuka, credenza, dan laci penyimpanan presisi dari kayu solid dan HPL.',
  },
  {
    slug: 'sofa-lounge',
    name: 'Sofa & Lounge Chair',
    description: 'Sofa modular lengkung, armchair klasik, kursi santai outdoor anyaman, hingga bench panjang.',
  },
  {
    slug: 'meja-meeting',
    name: 'Meja Meeting & Resepsionis',
    description: 'Meja rapat konferensi, meja resepsionis front desk, dan meja makan oval berkapasitas besar.',
  },
  {
    slug: 'custom-furniture',
    name: 'Custom Furniture & Outdoor',
    description: 'Pembuatan furnitur custom sesuai ukuran denah ruangan (dipan kamar, meja kopi, dining outdoor).',
  },
];

// Helper pembuat daftar gambar
function makeImages(slug: string, count: number, name: string): readonly [ProductImage, ...ProductImage[]] {
  const list: ProductImage[] = [];
  for (let i = 1; i <= count; i++) {
    const pad = String(i).padStart(2, '0');
    list.push({
      src: `/products/${slug}/${pad}.webp`,
      alt: `${name} - Foto ${i} tampak detail buatan Busr Mebel`,
    });
  }
  return list as unknown as readonly [ProductImage, ...ProductImage[]];
}

const products: readonly Product[] = [
  {
    id: '001',
    slug: 'rak-jati-bersiluet',
    name: 'Rak Jati Bersiluet dengan Laci',
    category: 'lemari-penyimpanan',
    description: 'Rak multifungsi dari kayu jati solid bersiluet ramping berundak modern. Dilengkapi rak terbuka beraksen lengkung manis dan laci bawah luas untuk penyimpanan tertutup.',
    images: makeImages('rak-jati-bersiluet', 5, 'Rak Jati Bersiluet dengan Laci'),
    specs: {
      material: 'Kayu Jati Solid Pilihan, Rel Laci Besi Presisi',
      dimensions: 'P 100 × L 45 × T 195 cm',
      colors: ["Teak Natural Melamine","Dark Teak Oil","Walnut"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '002',
    slug: 'set-meja-bundar',
    name: 'Set Meja Kopi Bundar Bertingkat',
    category: 'meja-meeting',
    description: 'Set meja bundar memikat dengan kaki tebal melengkung kokoh. Desain dua tingkat dinamis memadukan serat kayu jati alami dengan gaya modern kontemporer.',
    images: makeImages('set-meja-bundar', 5, 'Set Meja Kopi Bundar Bertingkat'),
    specs: {
      material: 'Kayu Jati Solid Grade A',
      dimensions: 'D 85 / 60 cm × T 45 / 38 cm',
      colors: ["Natural Teak Polyurethane","Bleached Teak","Dark Brown"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '003',
    slug: 'kursi-makan-neva',
    name: 'Kursi Makan Neva Curve',
    category: 'kursi-ergonomis',
    description: 'Kursi makan bergaya scandinavian dengan sandaran lengkung ergonomis presisi tinggi. Mengalir mulus dari sandaran tangan hingga kaki ramping.',
    images: makeImages('kursi-makan-neva', 6, 'Kursi Makan Neva Curve'),
    specs: {
      material: 'Kayu Jati Solid Premium Finishing Satin',
      dimensions: 'P 54 × L 52 × T 78 cm',
      colors: ["Natural Teak Doff","Walnut Smooth","Black Stained Teak"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '004',
    slug: 'barchair-jati-minimalis',
    name: 'Kursi Bar Jati Modern Minimalis',
    category: 'kursi-ergonomis',
    description: 'Kursi bar ramping dengan pijakan kaki kokoh dan dudukan ergonomis. Cocok untuk island kitchen residensial, kafe komersial, maupun pantry kantor.',
    images: makeImages('barchair-jati-minimalis', 4, 'Kursi Bar Jati Modern Minimalis'),
    specs: {
      material: 'Kayu Jati Solid dengan Footrest Besi / Kayu',
      dimensions: 'P 42 × L 44 × T 95 cm (Tinggi Dudukan 75 cm)',
      colors: ["Natural Matte","Dark Oak","Custom Stain"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '005',
    slug: 'kursi-santai-paduan-rangka-jati',
    name: 'Kursi Santai Paduan Rangka Jati & Fabric',
    category: 'sofa-lounge',
    description: 'Kursi santai lounge dengan konstruksi rangka kayu jati terbuka berpadu bantalan empuk berlapis kain tenun premium yang adem dan nyaman.',
    images: makeImages('kursi-santai-paduan-rangka-jati', 5, 'Kursi Santai Paduan Rangka Jati & Fabric'),
    specs: {
      material: 'Kayu Jati Solid, Busa High Density Foam, Fabric Linen Pelapis',
      dimensions: 'P 72 × L 80 × T 75 cm',
      colors: ["Oatmeal Beige / Natural Teak","Charcoal Grey","Olive Green"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '006',
    slug: 'meja-kopi-stella-noir',
    name: 'Meja Kopi Stella Noir Solid',
    category: 'custom-furniture',
    description: 'Meja kopi geometris eksklusif dengan finishing gelap rustic noir. Menonjolkan siluet arsitektural yang berani sebagai centerpiece ruang tamu atau lounge kantor.',
    images: makeImages('meja-kopi-stella-noir', 6, 'Meja Kopi Stella Noir Solid'),
    specs: {
      material: 'Kayu Jati Solid Finishing Dark Rustic Noir',
      dimensions: 'P 120 × L 65 × T 40 cm',
      colors: ["Rustic Black","Dark Espresso Teak"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '007',
    slug: 'kursi-makan-viridian-emerald',
    name: 'Kursi Makan Viridian Emerald Upholstered',
    category: 'kursi-ergonomis',
    description: 'Kursi makan elegan dengan balutan kain beludru velvet hijau emerald tua dan kaki kayu jati ramping. Menghadirkan atmosfer mewah pada ruang makan dan restoran.',
    images: makeImages('kursi-makan-viridian-emerald', 5, 'Kursi Makan Viridian Emerald Upholstered'),
    specs: {
      material: 'Kayu Jati Solid, Velvet Fabric Viridian Green, Busa Tebal',
      dimensions: 'P 55 × L 58 × T 82 cm',
      colors: ["Emerald Green Velvet","Royal Navy","Sand Dune"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '008',
    slug: 'kursi-santai-anyaman-lipat-outdoor',
    name: 'Kursi Santai Anyaman Lipat Outdoor',
    category: 'sofa-lounge',
    description: 'Kursi santai outdoor model lipat praktis berbahan rangka jati oven anti-cuaca dipadu anyaman webbing sintetis tahan UV untuk area teras dan pool side.',
    images: makeImages('kursi-santai-anyaman-lipat-outdoor', 6, 'Kursi Santai Anyaman Lipat Outdoor'),
    specs: {
      material: 'Kayu Jati Pilihan Outdoor Grade, Anyaman Polyrope Weatherproof',
      dimensions: 'P 62 × L 78 × T 74 cm',
      colors: ["Natural Teak / Tali Hitam","Natural Teak / Tali Khaki"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '009',
    slug: 'kursi-makan-aster',
    name: 'Kursi Makan Aster Solid Wood',
    category: 'kursi-ergonomis',
    description: 'Kursi makan dengan struktur konstruksi tradisional tangguh tanpa banyak ornamen, mengutamakan kenyamanan duduk lama dan durabilitas pemakaian harian.',
    images: makeImages('kursi-makan-aster', 5, 'Kursi Makan Aster Solid Wood'),
    specs: {
      material: 'Kayu Jati Solid Grade Perhutani',
      dimensions: 'P 50 × L 52 × T 80 cm',
      colors: ["Natural Teak Doff","Medium Brown Lacquer"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '010',
    slug: 'kursi-makan-solenne-curve',
    name: 'Kursi Makan Solenne Curve Velvet',
    category: 'kursi-ergonomis',
    description: 'Kursi berstruktur kontemporer dengan lekukan punggung melingkar berbalut kain velvet lembut. Konstruksi kaki padat kokoh dengan bantalan super empuk.',
    images: makeImages('kursi-makan-solenne-curve', 6, 'Kursi Makan Solenne Curve Velvet'),
    specs: {
      material: 'Struktur Kayu Jati / Plywood Tebal, Velvet Pelapis Mewah',
      dimensions: 'P 58 × L 56 × T 76 cm',
      colors: ["Sage Velvet","Terracotta Velvet","Midnight Blue"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '011',
    slug: 'set-meja-makan-outdoor-anyaman-jati',
    name: 'Set Meja Makan Outdoor Anyaman Jati',
    category: 'custom-furniture',
    description: 'Paket meja makan taman outdoor lengkap beserta 4-6 kursi anyaman sintetis tahan air dan panas matahari. Ideal untuk teras villa, kafe alfresco, dan rooftop.',
    images: makeImages('set-meja-makan-outdoor-anyaman-jati', 5, 'Set Meja Makan Outdoor Anyaman Jati'),
    specs: {
      material: 'Kayu Jati Outdoor Treatment, Anyaman Sintetis All-Weather',
      dimensions: 'Meja: P 160 × L 90 × T 75 cm, Kursi: P 54 × L 56 × T 84 cm',
      colors: ["Natural Weather-Resistant Teak"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '012',
    slug: 'kursi-bar-jati-teak-counter-stool',
    name: 'Kursi Bar Jati Teak Counter Stool',
    category: 'kursi-ergonomis',
    description: 'Bangku bar tinggi dengan lekukan sadel anatomis yang pas di panggul, dilengkapi footrest kokoh bersambungan mortise-tenon.',
    images: makeImages('kursi-bar-jati-teak-counter-stool', 5, 'Kursi Bar Jati Teak Counter Stool'),
    specs: {
      material: 'Kayu Jati Solid Utuh',
      dimensions: 'P 40 × L 40 × T 70 cm',
      colors: ["Natural Teak Finishing Lilin Alami","Dark Walnut"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '013',
    slug: 'set-kursi-santai-outdoor-jati',
    name: 'Set Kursi Santai Outdoor Jati & Meja Teras',
    category: 'sofa-lounge',
    description: 'Set dua kursi santai sudut rendah dengan meja samping bundar. Didesain untuk kenyamanan bersantai maksimal di balkon maupun taman.',
    images: makeImages('set-kursi-santai-outdoor-jati', 6, 'Set Kursi Santai Outdoor Jati & Meja Teras'),
    specs: {
      material: 'Kayu Jati Solid Grade Outdoor',
      dimensions: 'Kursi: P 68 × L 72 × T 70 cm, Meja: D 50 × T 45 cm',
      colors: ["Natural Teak Doff","Teak Oil Finish"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '014',
    slug: 'kursi-santai-lounge-chair-ottoman',
    name: 'Kursi Santai Lounge Chair & Ottoman',
    category: 'sofa-lounge',
    description: 'Pasangan kursi santai bersudut rebah santai dilengkapi bangku tumpuan kaki (ottoman). Memberikan relaksasi sempurna saat membaca dan bersantai.',
    images: makeImages('kursi-santai-lounge-chair-ottoman', 5, 'Kursi Santai Lounge Chair & Ottoman'),
    specs: {
      material: 'Rangka Kayu Jati Solid, Bantalan Busa Rebound & Fabric Lembut',
      dimensions: 'Lounge: P 75 × L 85 × T 82 cm, Ottoman: P 60 × L 45 × T 40 cm',
      colors: ["Warm Grey Fabric","Cream Linen","Mustard Fabric"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '015',
    slug: 'dipan-tempat-tidur-jati-bedframe',
    name: 'Dipan Tempat Tidur Jati Bedframe Minimalis',
    category: 'custom-furniture',
    description: 'Tempat tidur kayu jati bergaya minimalis modern dengan headboard bilah kayu teratur dan konstruksi ambalan kokoh tanpa derit.',
    images: makeImages('dipan-tempat-tidur-jati-bedframe', 6, 'Dipan Tempat Tidur Jati Bedframe Minimalis'),
    specs: {
      material: 'Kayu Jati Solid Pilihan, Rangka Tulang Baja Penguat',
      dimensions: 'P 200 × L 180 × T 90 cm (Ukuran Kasur King)',
      colors: ["Natural Teak Semi-Gloss","Walnut Smooth","Bleached Teak"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '016',
    slug: 'kursi-santai-anyaman-tali-jati',
    name: 'Kursi Santai Anyaman Tali Jati',
    category: 'sofa-lounge',
    description: 'Sentuhan kriya lokal kontemporer: rangka kayu jati berpadu anyaman tali tambang poliester padat berpola silang ergonomis yang sejuk digunakan.',
    images: makeImages('kursi-santai-anyaman-tali-jati', 5, 'Kursi Santai Anyaman Tali Jati'),
    specs: {
      material: 'Kayu Jati Solid, Anyaman Tali Tambang Sintetis Premium',
      dimensions: 'P 64 × L 70 × T 72 cm',
      colors: ["Natural Teak / Tali Charcoal","Natural Teak / Tali Krem"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '017',
    slug: 'meja-kerja-jati-teak-desk',
    name: 'Meja Kerja Jati Teak Desk Kantor',
    category: 'meja-kerja',
    description: 'Meja kerja kayu jati dark finish dengan potongan sudut beveled halus dan panel samping padat. Memberikan kesan wibawa, kokoh, dan stabilitas tinggi di ruang kerja eksekutif.',
    images: makeImages('meja-kerja-jati-teak-desk', 5, 'Meja Kerja Jati Teak Desk Kantor'),
    specs: {
      material: 'Kayu Jati Solid Finishing Dark Teak Beveled',
      dimensions: 'P 150 × L 75 × T 75 cm',
      colors: ["Dark Teak Espresso","Natural Teak Matte","Classic Walnut"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '018',
    slug: 'armchair-klasik-eropa',
    name: 'Armchair Klasik Eropa Ukir Jati',
    category: 'sofa-lounge',
    description: 'Kursi santai bergaya klasik Eropa dengan ukiran motif bunga halus khas tangan perajin mebel berpengalaman. Rangka kokoh berbalut kain velvet putih bersih dengan bantal pelengkap.',
    images: makeImages('armchair-klasik-eropa', 5, 'Armchair Klasik Eropa Ukir Jati'),
    specs: {
      material: 'Kayu Jati Solid Ukir Halus, Kain Pelapis Mewah, Busa Royal Foam',
      dimensions: 'P 72 × L 75 × T 98 cm',
      colors: ["Natural Teak Ukir / Broken White Fabric","Gold Leaf Accents"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '019',
    slug: 'meja-makan-jati-peanut',
    name: 'Meja Makan Jati Peanut Organic Shape',
    category: 'meja-meeting',
    description: 'Meja berdesain organik kurva peanut (kacang) yang dinamis dan bersahabat. Sangat pas untuk meja meeting kolaboratif santai maupun ruang makan keluarga estetik.',
    images: makeImages('meja-makan-jati-peanut', 4, 'Meja Makan Jati Peanut Organic Shape'),
    specs: {
      material: 'Kayu Jati Solid Pilihan Sambungan Rapi',
      dimensions: 'P 210 × L 105 × T 75 cm',
      colors: ["Natural Teak Satin","Warm Honey Teak"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '020',
    slug: 'kursi-cantilever-chrome-bauhaus',
    name: 'Kursi Cantilever Chrome Bauhaus',
    category: 'kursi-ergonomis',
    description: 'Memadukan gaya arsitektur mid-century Bauhaus dengan kenyamanan kekinian. Rangka pipa besi tubular berlapis krom berkilau dipadu jok velvet oranye terracotta berdaya pantul elastis.',
    images: makeImages('kursi-cantilever-chrome-bauhaus', 5, 'Kursi Cantilever Chrome Bauhaus'),
    specs: {
      material: 'Pipa Besi Tubular Chrome Tebal Anti-Karat, Velvet Upholstery Terracotta',
      dimensions: 'P 52 × L 55 × T 79 cm',
      colors: ["Terracotta Orange Velvet","Mustard Velvet","Black Velvet"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '021',
    slug: 'meja-kerja-eksekutif-volo',
    name: 'Meja Kerja Eksekutif Volo Granite & Teak',
    category: 'meja-kerja',
    description: 'Meja arsitektural floating design yang memadukan kehangatan kayu jati pilihan, top granit tile hitam elegan, serta kaki tumpuan baja stainless industri. Tersedia celah laci bawah lapang.',
    images: makeImages('meja-kerja-eksekutif-volo', 6, 'Meja Kerja Eksekutif Volo Granite & Teak'),
    specs: {
      material: 'Kayu Jati Solid, Black Granit Tile Surface, Kaki Stainless Steel Hitam',
      dimensions: 'P 160 × L 90 × T 80 cm',
      colors: ["Teak Wood & Black Granite"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '022',
    slug: 'kursi-makan-jati-geometris',
    name: 'Kursi Makan Jati Geometris Minimal',
    category: 'kursi-ergonomis',
    description: 'Desain kursi makan tegas dengan garis-garis siluet geometris bersih. Dihaluskan hingga ke setiap sudut agar nyaman disentuh dan kokoh diduduki bertahun-tahun.',
    images: makeImages('kursi-makan-jati-geometris', 5, 'Kursi Makan Jati Geometris Minimal'),
    specs: {
      material: 'Kayu Jati Solid Grade Perhutani',
      dimensions: 'P 48 × L 50 × T 82 cm',
      colors: ["Natural Doff","Dark Walnut"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '023',
    slug: 'bangku-santai-jati-bench',
    name: 'Bangku Santai Jati Solid Bench',
    category: 'sofa-lounge',
    description: 'Bangku panjang serbaguna berkonstruksi tebal tanpa sandaran. Fleksibel ditaruh di lorong koridor kantor, foyer hotel, galeri, maupun meja makan panjang.',
    images: makeImages('bangku-santai-jati-bench', 5, 'Bangku Santai Jati Solid Bench'),
    specs: {
      material: 'Kayu Jati Solid Tebal Sambungan Presisi',
      dimensions: 'P 150 × L 40 × T 45 cm',
      colors: ["Natural Teak Doff","Smoked Teak"],
    },
    featured: false,
    isCustomizable: true,
  },
  {
    id: '024',
    slug: 'meja-kopi-the-kuro-low',
    name: 'Meja Kopi The Kuro Low Rustic Black',
    category: 'custom-furniture',
    description: 'Meja kopi jati solid berprofil rendah dengan top tepian beveled halus yang ditopang dua kaki balok kokoh. Finishing rustic black menonjolkan tekstur urat kayu yang dalam.',
    images: makeImages('meja-kopi-the-kuro-low', 4, 'Meja Kopi The Kuro Low Rustic Black'),
    specs: {
      material: 'Kayu Jati Solid Utuh Finishing Rustic Black',
      dimensions: 'P 170 × L 32 × T 19 cm',
      colors: ["Rustic Black Teak"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '025',
    slug: 'tempat-tidur-jati-tailored-serenity',
    name: 'Tempat Tidur Jati Tailored Serenity',
    category: 'custom-furniture',
    description: 'Tempat tidur jati dengan proporsi rapi dan visual melayang yang ringan. Dilengkapi sandaran headboard empuk berlapis kain tenun natural lembut.',
    images: makeImages('tempat-tidur-jati-tailored-serenity', 5, 'Tempat Tidur Jati Tailored Serenity'),
    specs: {
      material: 'Kayu Jati Solid Grade A, Headboard Pelapis Natural Linen',
      dimensions: 'P 205 × L 185 × T 100 cm',
      colors: ["Natural Teak & Sand Beige Linen","Walnut & Grey Linen"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '026',
    slug: 'kursi-geometris-rosso',
    name: 'Kursi Geometris Rosso Terrazzo Art',
    category: 'kursi-ergonomis',
    description: 'Kreasi unik perpaduan siluet kayu jati geometris bersudut lengkung dengan aksen corak terrazzo merah terra-rossa pada dudukan dan sandaran. Statment piece bernilai seni tinggi.',
    images: makeImages('kursi-geometris-rosso', 7, 'Kursi Geometris Rosso Terrazzo Art'),
    specs: {
      material: 'Kayu Jati Solid, Top Corak Terrazzo Motif Spesial',
      dimensions: 'P 55 × L 45 × T 83 cm',
      colors: ["Teak Natural & Rosso Red Terrazzo"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '027',
    slug: 'sofa-modular-aera-curve',
    name: 'Sofa Modular Aera Curve Sectional',
    category: 'sofa-lounge',
    description: 'Sofa lengkung modular modern yang fleksibel disusun sesuai denah ruangan. Busa density tinggi dibalut kain tenun lembut berdaya tahan gesek tinggi untuk ruang tunggu kantor atau lounge.',
    images: makeImages('sofa-modular-aera-curve', 5, 'Sofa Modular Aera Curve Sectional'),
    specs: {
      material: 'Rangka Kayu Solid Internal, Busa High Resilient, Fabric Soft Texture',
      dimensions: 'P 280 × L 210 × T 68 cm (Tinggi Dudukan 40 cm)',
      colors: ["Light Grey Heather","Warm Oat","Forest Green"],
    },
    featured: true,
    isCustomizable: true,
  },
  {
    id: '028',
    slug: 'meja-resepsionis-atrium',
    name: 'Meja Resepsionis Kantor Atrium V-Shape',
    category: 'meja-meeting',
    description: 'Sambut klien dan tamu dengan meja resepsionis asimetris berbahan kayu jati berdesain V-shape mewah. Memberi area kerja super lega dengan rak penyimpanan praktis di balik meja.',
    images: makeImages('meja-resepsionis-atrium', 6, 'Meja Resepsionis Kantor Atrium V-Shape'),
    specs: {
      material: 'Kayu Jati Solid Premium, Rangka Konstruksi Dalam Kokoh',
      dimensions: 'P 240 × L 120 × T 90 cm',
      colors: ["Dark Teak Matte","Natural Teak Finish","Custom HPL Woodgrain"],
    },
    featured: true,
    isCustomizable: true,
  },
];

export function getAllProducts(): readonly Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): readonly Product[] {
  return products.filter((p) => p.featured);
}

/** Kategori yang memiliki minimal satu produk */
export function getCategories(): readonly Category[] {
  return categories.filter((c) => products.some((p) => p.category === c.slug));
}

export function getCategory(slug: CategorySlug): Category {
  const found = categories.find((c) => c.slug === slug);
  return (found ?? categories[0])!;
}
