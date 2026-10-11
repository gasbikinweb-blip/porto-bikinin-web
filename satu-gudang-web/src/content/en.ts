import type { SiteContent } from './types';

// Teks bahasa Inggris (bahasa default, URL "/").
export const en: SiteContent = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  meta: {
    title: 'Satu Gudang — Custom Furniture, Interior Design & Build in Bali',
    description:
      'Custom furniture, kitchen sets, interior design and build for villas, homes and spas in Bali. Designed, made in our own workshop and installed by one team. Free consultation.',
    keywords: [
      'custom furniture Bali',
      'interior design Bali',
      'kitchen set Bali',
      'spa interior design Bali',
      'villa interior Bali',
      'bedroom furniture package Bali',
    ],
  },
  common: {
    skipToContent: 'Skip to main content',
    mainMenu: 'Main menu',
    tagline: 'We design. We build. You live it.',
    freeConsultation: 'Free consultation',
    chatWhatsApp: 'Chat on WhatsApp',
    languageSwitch: { label: 'Bahasa Indonesia', target: 'ID' },
    themeToggle: 'Toggle light / dark mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    priceOnRequest: 'Price on request',
    priceFrom: 'From',
    todoBadge: 'Draft',
  },
  nav: {
    about: 'About',
    design: '3D Design',
    services: 'Services',
    work: 'Projects',
    packages: 'Bedroom packages',
    process: 'Process',
    faq: 'FAQ',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Custom furniture · Interior · Build — Bali',
    title: 'We design. We build.',
    titleAccent: 'You live it.',
    // TODO: konfirmasi visi & misi resmi Satu Gudang
    slides: [
      {
        label: 'Who we are',
        text: 'Satu Gudang is a Bali studio that designs your space, makes the furniture in our own workshop and installs it on site — one team from first sketch to the last screw.',
        imageAlt:
          'Spa foot-massage lounge by Satu Gudang: blue lounge chairs, timber ceiling, carved wooden screens and a green plant wall',
      },
      {
        label: 'Our vision',
        text: 'To be the studio Bali trusts to turn ideas into warm, honest spaces — homes, villas and businesses that feel good to live and work in every day.',
        imageAlt:
          '3D design of a calm bedroom with a curved upholstered bed, timber wall panels and warm cove lighting',
      },
      {
        label: 'Our mission',
        text: 'Design with you, build with care, and deliver on time — using real materials, clear quotations and a team that stays with you until handover.',
        imageAlt:
          '3D design of a dining area with a round timber table, terracotta cabinets and a paper pendant lamp',
      },
    ],
    slideNav: 'Choose slide',
    pause: 'Pause slideshow',
    play: 'Play slideshow',
    primaryCta: 'Get a free consultation',
    secondaryCta: 'See our projects',
    imageAlt:
      'Spa foot-massage lounge by Satu Gudang: blue lounge chairs, timber ceiling, carved wooden screens and a green plant wall',
    pillars: ['Design', 'Workshop production', 'Installation & build'],
    scrollHint: 'Scroll',
  },
  about: {
    eyebrow: 'About us',
    // TODO: tambahkan cerita singkat pendiri, tahun berdiri, dan arti nama "Satu Gudang" bila sudah dikonfirmasi
    title: 'A Bali studio where design, workshop and build sit under one roof',
    paragraphs: [
      'Satu Gudang Project designs interiors, makes the furniture in our own workshop and builds or renovates the space — so the people who draw your room are the same people who make and install it.',
      'We work on homes, villas and commercial spaces across Bali, from a single kitchen set to a full spa renovation. Warm wood, natural textures and plants are what we love working with.',
    ],
    facts: [
      { value: '3', label: 'services, one team' },
      { value: '1', label: 'own workshop for production' },
      { value: 'Bali', label: 'Seminyak · Benoa · Tabanan & beyond' },
    ],
    values: [
      {
        title: 'One team, one responsibility',
        text: 'No hand-offs between designer, carpenter and contractor.',
      },
      {
        title: 'Made to measure',
        text: 'Every piece is built for your room and your budget.',
      },
      {
        title: 'Real materials, real projects',
        text: 'What you see on this site are photos of our own work.',
      },
    ],
    cta: 'Talk to our team',
    imageAlt: 'Satu Gudang team installing white kitchen cabinets on site',
    secondImageAlt:
      'Reception desk under a curved timber ceiling in a spa renovated by Satu Gudang',
  },
  marquee: [
    'Custom furniture',
    'Interior design',
    '3D design',
    'Kitchen sets',
    'Wardrobes',
    'Villa interiors',
    'Spa & hospitality',
    'Renovation',
    'Made in Bali',
  ],
  design: {
    eyebrow: '3D design',
    title: 'See your room before a single board is cut',
    lead: 'Not sure what you want yet? We design it with you. Tell us your style, size and budget, and we turn it into realistic 3D visuals — then build exactly that.',
    points: [
      'Design based on your wishes, style and budget',
      'Realistic 3D visuals before production',
      'Revisions until it feels right',
    ],
    cta: 'Request a design',
    note: '3D design visuals by Satu Gudang.',
    alts: [
      '3D design of a playful bedroom with a red pendant lamp, blue wardrobe and checkered rug',
      '3D design of an open kitchen and dining area with wood cabinets, terrazzo backsplash and rattan chairs',
      '3D design of a sage green bedroom with a rattan wardrobe, upholstered wall panel and timber bed',
      '3D design of a dining area with terracotta cabinets, a round timber table and a paper pendant lamp',
      '3D design of a warm bedroom with a curved upholstered bed, timber wall panels and cove lighting',
    ],
  },
  services: {
    eyebrow: 'What we do',
    title: 'Three services, one team that owns the result',
    lead: 'Pick one or combine them. Because design, production and installation stay in one hand, what you approve on paper is what ends up in your room.',
    cta: 'Ask about this service',
    items: {
      furniture: {
        title: 'Custom Furniture',
        summary:
          'Kitchen sets, wardrobes, beds, vanities and display cabinets made to measure in our workshop.',
        points: [
          'Built to your exact room size',
          'Kitchen sets, wardrobes, beds, vanities',
          'Finishes chosen with you from samples',
        ],
        imageAlt: 'Custom glass-door display wardrobe with warm LED lighting and wood-grain frame',
      },
      interior: {
        title: 'Interior Design',
        summary:
          'Layouts, ceilings, lighting and materials for villas, homes and commercial spaces like spas and salons.',
        points: [
          'Concept, layout & material board',
          'Residential and commercial spaces',
          'Furniture designed to fit the concept',
        ],
        imageAlt: 'Spa wash corner under a curved timber ceiling with hanging plants',
      },
      build: {
        title: 'Architecture & Build',
        summary:
          'Renovation and construction work managed by our own team, so the building and the interior finish together.',
        points: [
          'Renovation of existing buildings',
          'Ceilings, walls, flooring & finishing',
          'One schedule from structure to styling',
        ],
        imageAlt: 'Renovated spa lounge with timber ceiling and carved wooden screens',
      },
    },
  },
  portfolio: {
    eyebrow: 'Selected work',
    title: 'Real projects, photographed after handover',
    lead: 'Commercial and residential spaces we designed, produced and installed across Bali.',
    filterLabel: 'Filter projects',
    filters: { all: 'All', commercial: 'Commercial', residential: 'Residential' },
    categoryLabels: { commercial: 'Commercial', residential: 'Residential' },
    viewGallery: 'View photos',
    photos: 'photos',
    askSimilar: 'I want something like this',
    galleryLabel: 'Project photo gallery',
    items: {
      'spa-seminyak': {
        title: 'Spa Renovation',
        location: 'Sunset Road, Seminyak',
        summary:
          'A tired, water-damaged shop space turned into a calm spa: curved timber ceiling with hanging plants, curtained treatment rooms, numbered guest lockers, a foot-massage lounge, nail care and styling areas.',
        scope: ['Interior design', 'Renovation', 'Custom furniture'],
        alts: [
          'Body massage area with curtained treatment beds, timber wall panels and a flowering plant wall',
          'Foot-massage lounge with four blue lounge chairs, timber ceiling and carved wooden screens',
          'Foot-massage lounge seen from the side, with a green plant wall and foot basins',
          'Corridor with a curved timber ceiling, hanging wisteria and cream curtains',
          'Wash corner with a round mirror and dark vanity under a curved timber ceiling with hanging plants',
          'Numbered wooden guest lockers next to a black vanity counter',
          'Reception desk with a large painting on a sage green wall under the curved ceiling',
          'Nail care area with a wooden desk, blue chairs and a curved timber ceiling with plants',
          'Styling area with a black mirror cabinet framed by hanging greenery',
        ],
      },
      'warm-wood-residence': {
        // TODO: konfirmasi nama klien/lokasi proyek ini (foto WhatsApp 11 Okt 2026, lokasi belum diketahui)
        title: 'Warm Wood Residence',
        location: 'Bali',
        summary:
          'A full set of custom joinery in warm wood grain: an open kitchen with island, a built-in display unit with LED shelves, a dressing room with glass wardrobes, a floating vanity and bedroom shelving.',
        scope: ['Custom furniture', 'Kitchen set', 'Wardrobes'],
        alts: [
          'Dressing room with an LED-backlit mirror, wooden dressing table and lit shelving',
          'Glass-door wardrobes with wood frames and warm LED strips',
          'Built-in wooden display unit with slatted top and orange-lit shelves',
          'Wood and white kitchen with a long counter and built-in fridge',
          'Kitchen peninsula with wooden base cabinets and a tall pantry unit',
          'Bedroom with built-in wooden shelving, a wood ceiling and a low platform bed',
          'Floating wood-grain vanity with open side shelves and a vessel basin',
          'Double-height kitchen with wood-grain cabinets and three glass pendant lights',
        ],
      },
      'kitchen-benoa': {
        title: 'White Kitchen Set',
        location: 'Benoa, South Kuta',
        summary:
          'An L-shaped kitchen in clean white with a black stone-look worktop, floating wood shelves and practical storage: pull-out corner unit and cutlery drawer inserts.',
        scope: ['Kitchen set', 'Installation'],
        alts: [
          'L-shaped white kitchen with black worktop, floating wooden shelves and a steel fridge',
          'The same white kitchen with all cabinets and drawers opened to show storage',
          'White kitchen with spiral staircase and copper pendant lights',
          'White upper cabinets with range hood above a freestanding cooker',
          'Open drawer with a white cutlery organiser insert',
          'Narrow pull-out storage unit beside the oven',
        ],
      },
      'bedroom-tabanan': {
        title: 'Bedroom Renovation',
        location: 'Tabanan',
        summary:
          'A bedroom refresh with an arched accent wall and LED trims, an upholstered headboard, a storage bed with drawers, a tall wardrobe and a matching chest of drawers.',
        scope: ['Interior renovation', 'Bedroom furniture'],
        alts: [
          'Bedroom with arched grey accent wall, upholstered headboard, storage bed and white wardrobe',
          'White chest of drawers under a wall-mounted TV with LED wall trims',
        ],
      },
    },
  },
  packages: {
    eyebrow: 'Start here',
    title: 'Complete bedroom furniture packages',
    lead: 'Bed, bedside tables, wardrobe and supporting pieces — designed as one set and adjusted to your budget and room size.',
    featuredBadge: 'Most requested',
    includesLabel: 'Includes',
    cta: 'Tell us your budget',
    note: 'Every package is made to measure. Share your room size and budget on WhatsApp and we will suggest the right set.',
    items: {
      essential: {
        name: 'Essential',
        forWho: 'For guest rooms, rentals and first homes',
        // TODO: konfirmasi isi paket
        includes: ['Bed frame', '2 bedside tables', '2-door wardrobe'],
        imageAlt: 'White chest of drawers and wood-tone floor in a renovated bedroom',
      },
      signature: {
        name: 'Signature',
        forWho: 'For main bedrooms that need more storage',
        // TODO: konfirmasi isi paket
        includes: [
          'Storage bed with drawers & upholstered headboard',
          '2 bedside tables',
          'Full-height wardrobe',
          'Chest of drawers or dressing table',
        ],
        imageAlt: 'Bedroom with upholstered headboard, storage bed and full-height white wardrobe',
      },
      villa: {
        name: 'Villa',
        forWho: 'For villas and premium suites',
        // TODO: konfirmasi isi paket
        includes: [
          'Custom bed & headboard wall',
          'Bedside tables',
          'Walk-in or glass wardrobe with LED',
          'Dressing table & mirror',
          'Built-in shelving',
        ],
        imageAlt: 'Dressing room with backlit mirror, wooden dressing table and lit shelves',
      },
    },
  },
  materials: {
    eyebrow: 'Materials',
    title: 'Finishes you can touch before you decide',
    lead: 'A few of the finishes from our recent projects. Ask us to bring physical samples to your consultation.',
    cta: 'Request material samples',
    note: 'Close-ups taken from our project photos.',
    sample: {
      title: 'Request colour samples before we start',
      text: 'Choose HPL and flooring finishes from physical sample boards before production — so the colour you approve is the colour you get.',
      cta: 'Request colour samples',
      gallery: 'Colour sample gallery',
      hint: 'Tap a photo to see the samples up close',
      alts: [
        'Hand holding wood-grain and black HPL sample boards in the Satu Gudang workshop',
        'Spread of HPL, SPC flooring and stone-look sample boards in many colours',
        'Open HPL colour catalogue showing solid colour swatches from neutral to bright',
      ],
    },
    items: {
      'wood-grain': {
        name: 'Warm wood grain',
        detail: 'Teak-tone grain for cabinets, vanities and wardrobes.', // TODO: konfirmasi (HPL / veneer / kayu solid)
        seenIn: 'Warm Wood Residence',
        imageAlt: 'Close-up of a teak-tone wood-grain cabinet door',
      },
      'slatted-timber': {
        name: 'Slatted timber',
        detail: 'Vertical slats for vents, screens and feature panels.',
        seenIn: 'Warm Wood Residence',
        imageAlt: 'Close-up of light timber vertical slats',
      },
      'matte-white': {
        name: 'Clean white cabinetry',
        detail: 'Smooth white fronts with organised drawer interiors.', // TODO: konfirmasi (HPL / duco)
        seenIn: 'White Kitchen Set',
        imageAlt: 'Open white drawer with cutlery organiser',
      },
      'glass-led': {
        name: 'Glass & LED lighting',
        detail: 'Glass doors and shelves lit with warm LED strips.',
        seenIn: 'Warm Wood Residence',
        imageAlt: 'Glass display shelves lit by warm LED strips in a wooden frame',
      },
      'curved-ceiling': {
        name: 'Curved timber ceiling',
        detail: 'Flowing timber-finish ceilings with hidden downlights.',
        seenIn: 'Spa Renovation',
        imageAlt: 'Curved timber ceiling with downlights around a hanging-plant opening',
      },
      'green-wall': {
        name: 'Green wall',
        detail: 'Low-maintenance green walls for a tropical, calm feel.', // TODO: konfirmasi (artificial / asli)
        seenIn: 'Spa Renovation',
        imageAlt: 'Close-up of a dense green plant wall',
      },
    },
  },
  process: {
    eyebrow: 'How we work',
    title: 'From empty room to handover, one team',
    lead: 'No hand-offs between designer, carpenter and contractor. You talk to the same people the whole way.',
    items: {
      consult: {
        title: 'Free consultation & site visit',
        text: 'Tell us about the space, your style and your budget. We look at the site and measure.',
        imageAlt: 'Empty room with damaged walls before the spa renovation',
      },
      design: {
        title: '3D design & quotation',
        text: 'You receive a 3D design, material choices and a clear quotation before anything is made.',
        imageAlt: '3D design of a sage green bedroom with a rattan wardrobe and timber bed',
      },
      produce: {
        title: 'Production in our workshop',
        text: 'Furniture and joinery are made in our own workshop, so quality and timing stay in our hands.',
        imageAlt: 'Choosing HPL colour samples in the workshop before production',
      },
      install: {
        title: 'Installation & handover',
        text: 'Our team installs, finishes and cleans up, then walks you through the result.',
        imageAlt: 'Satu Gudang team installing kitchen cabinets on site',
      },
    },
    beforeAfter: {
      title: 'Spa Renovation: before and after',
      before: 'Before',
      after: 'After',
      beforeAlt: 'Spa space before renovation: bare tiled room with peeling, water-stained walls',
      afterAlt:
        'The same space after renovation: foot-massage lounge with timber ceiling and plant wall',
    },
  },
  testimonials: {
    eyebrow: 'Client words',
    title: 'What clients say',
    // TODO: testimoni contoh — ganti dengan testimoni asli (tersembunyi di build production)
    items: [
      {
        quote: 'Sample testimonial — replace with a real client quote.',
        name: 'Client name',
        role: 'Villa owner',
      },
      {
        quote: 'Sample testimonial — replace with a real client quote.',
        name: 'Client name',
        role: 'Spa owner',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions we hear often',
    lead: 'Can’t find your answer? Ask us on WhatsApp.',
    // TODO: konfirmasi semua jawaban FAQ (durasi, area layanan, pembayaran, garansi) dengan Satu Gudang
    items: [
      {
        q: 'Is the consultation really free?',
        a: 'Yes. The first consultation to discuss your space, style and budget is free and without obligation.',
      },
      {
        q: 'Which areas in Bali do you serve?',
        a: 'We work across Bali — our recent projects are in Seminyak, Benoa (South Kuta) and Tabanan. Tell us your location and we will confirm.',
      },
      {
        q: 'Do I have to use all three services?',
        a: 'No. You can order only custom furniture, only interior design, or the full design-and-build package.',
      },
      {
        q: 'How long does a project take?',
        a: 'It depends on the size and materials. We give you a timeline together with the quotation, before production starts.',
      },
      {
        q: 'Can the bedroom package fit my budget?',
        a: 'Yes. The packages are a starting point; we adjust sizes, materials and pieces to match your budget.',
      },
      {
        q: 'Can I see the materials first?',
        a: 'Yes. Ask for samples during the consultation so you can choose finishes in person.',
      },
    ],
  },
  contact: {
    eyebrow: 'Free consultation',
    title: 'Tell us about your space',
    lead: 'Send a message on WhatsApp — a photo of the room, rough size and budget are enough to start.',
    cta: 'Start the conversation',
    steps: ['Send room photos & size', 'Share your style and budget', 'Get ideas and a quotation'],
    whatsappLabel: 'WhatsApp',
    socialLabel: 'Instagram & Threads',
    areaLabel: 'Service area',
    area: 'All of Bali',
  },
  footer: {
    blurb:
      'Custom furniture, interior design and build studio in Bali. Designed, made and installed by one team.',
    servicesTitle: 'Services',
    exploreTitle: 'Explore',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home',
  },
  wa: {
    general: 'Hi Satu Gudang, I would like to ask about your services.',
    consultation:
      'Hi Satu Gudang, I would like a free consultation.\n\nProject type: \nLocation: \nRough budget: ',
    service:
      'Hi Satu Gudang, I am interested in {service}. Could we discuss my project?\n\nLocation: \nRough budget: ',
    project:
      'Hi Satu Gudang, I saw the "{project}" project on your website and would like something similar.',
    bedroomPackage:
      'Hi Satu Gudang, I am interested in the {package} bedroom package. My budget is around ... and my room size is about ...',
    material: 'Hi Satu Gudang, could I see material samples during a consultation?',
    design:
      'Hi Satu Gudang, I would like you to design my space in 3D.\n\nRoom type: \nRough size: \nStyle I like: \nRough budget: ',
    sample:
      'Hi Satu Gudang, I would like to request colour samples (HPL / flooring) before production.',
  },
};
