import { siteConfig } from '@/lib/config';
import type { Content } from './types';

const name = siteConfig.name;

export const en: Content = {
  lang: 'en',
  home: '/en',
  meta: {
    title: `${name} | Umrah Photographer & Videographer in Makkah and Madinah`,
    description:
      'Umrah photo and video sessions in Makkah & Madinah for solo pilgrims, couples, families and travel groups. Book directly via WhatsApp.',
    ogLocale: 'en_US',
  },
  skip: 'Skip to main content',
  nav: [
    { href: '#cerita', label: 'Stories' },
    { href: '#lokasi', label: 'Places' },
    { href: '#video', label: 'Films' },
    { href: '#paket', label: 'Packages' },
    { href: '#tanya', label: 'FAQ' },
  ],
  navCta: 'Book a Date',
  menu: { open: 'Open menu', close: 'Close menu', label: 'Main menu' },
  theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
  switchLang: { href: '/', label: 'ID', aria: 'Baca dalam Bahasa Indonesia' },
  wa: {
    general: `Assalamualaikum ${name}, I would like to ask about an Umrah photo/video session.`,
    floating: 'Chat on WhatsApp',
    newTab: '(opens in a new tab)',
  },

  hero: {
    eyebrow: 'Photo & Film · Makkah — Madinah',
    title: ['Once in a lifetime,', 'a journey', 'worth keeping.'],
    lead: 'You focus on your worship. We capture the tearful glance in the Nabawi courtyard, the slow steps towards the Kaaba, and the sunset you will want to describe when you are home.',
    cta: 'Book a Photo Session',
    secondary: 'See Our Work',
    caption: 'Our clients’ moments in the Holy Land',
    clips: {
      'senja-berdua': 'Sunset over a Makkah hill',
      'rindu-kembali': 'The Masjid al-Haram courtyard',
      'hati-tenang-jiwa-pulang': 'Abraj Al-Bait, Makkah',
      'langkah-di-tanah-haram': 'Walking together in Makkah',
      'berlandaskan-iman': 'Before the Kaaba',
      'berdampingan-di-rumah-nya': 'The gates of Masjid al-Haram',
    },
    scroll: 'Scroll',
  },
  places_marquee: [
    'Masjid an-Nabawi',
    'Masjid al-Haram',
    'The Green Dome',
    'Abraj Al-Bait',
    'Makkah Hills',
    'Nabawi Umbrella Courtyard',
  ],
  manifesto: {
    label: 'Why remember',
    before: 'The prayers you make are kept in the heavens.',
    middle: 'The faces beside you,',
    after: 'let us keep them here, for you to open again whenever you miss this place.',
  },

  stories: {
    label: 'Stories',
    title: 'Every guest of Allah carries a story of their own',
    intro: 'Not just a gallery. These are fragments of our clients’ journeys, from the Nabawi courtyard to sunset over Makkah.',
    photos: 'photos',
    items: {
      'senja-di-bukit-makkah': {
        title: 'Sunset over Makkah',
        place: 'Makkah',
        blurb: 'A rug, two lanterns and the clock tower slowly lighting up. A couple’s session before maghrib.',
      },
      'teduh-di-nabawi': {
        title: 'Shade of Nabawi',
        place: 'Madinah',
        blurb: 'Beneath the giant umbrellas, one quiet hour, woven into an album.',
      },
      'berdua-di-baitullah': {
        title: 'Together at the Haram',
        place: 'Makkah',
        blurb: 'They came as a couple and left with a deeper memory.',
      },
      'rindu-madinah': {
        title: 'Missing Madinah',
        place: 'Madinah',
        blurb: 'Morning in the city of the Prophet: the Green Dome, blue sky and an honest smile.',
      },
    },
    ask: 'I want a session like this',
    askMessage: 'Assalamualaikum Lens Haramain, I love the story "{story}". Could you arrange a similar session for me?',
    endTitle: 'The next chapter could be yours.',
  },

  places: {
    label: 'Places',
    title: 'Where we shoot most often',
    intro: 'Sessions are scheduled around your travel itinerary, outside prayer times and following local regulations.',
    items: [
      { name: 'Nabawi Umbrella Courtyard', arabic: 'المسجد النبوي', city: 'Madinah', note: 'Shaded, clean, with soft morning light.' },
      { name: 'The Green Dome', arabic: 'القبة الخضراء', city: 'Madinah', note: 'The icon of the Prophet’s city, beautiful under a blue sky.' },
      { name: 'Masjid al-Haram Courtyard', arabic: 'المسجد الحرام', city: 'Makkah', note: 'Grand minarets and gates around the Kaaba.' },
      { name: 'Abraj Al-Bait', arabic: 'أبراج البيت', city: 'Makkah', note: 'The gate and the clock tower, the most recognisable backdrop.' },
      { name: 'Makkah Panorama Hills', arabic: 'جبال مكة', city: 'Makkah', note: 'Sunset over the city and the clock tower.' },
    ],
    more: 'Have another dream location in mind? Tell us and we will check what is possible.',
  },

  reels: {
    label: 'Films',
    title: 'Because some moments need to move',
    intro: 'Vertical cinematic films, ready to share with family at home and on Instagram.',
    play: 'Play film',
    items: {
      'senja-berdua': 'Loving you for the rest of my life',
      'rindu-kembali': 'Let us return as Your guests',
      'hati-tenang-jiwa-pulang': 'A calm heart, a soul come home',
      'langkah-di-tanah-haram': 'Walking together in the Haram',
      'berlandaskan-iman': 'A love built on faith',
      'berdampingan-di-rumah-nya': 'Side by side in His house',
    },
  },

  wall: {
    title: ['Every frame,', 'a prayer.'],
    body: 'Hundreds of steps across two holy cities, kept one by one, so the memory never fades with time.',
  },

  testimonials: {
    label: 'Kind words',
    title: 'They came home with memories they can open again',
    // TODO: SAMPLE, not real testimonials. Replace with genuine client words (with permission),
    // then set sample to false so this section appears on the live site.
    sample: true,
    sampleNote: 'Sample — replace with real testimonials before going live',
    items: [
      {
        quote: 'We only had one hour between our group schedule, yet it felt like a full day. That sunset on the hill is now the main photo in our living room.',
        name: 'Client Name',
        detail: 'Couple · Honeymoon Umrah',
        story: 'senja-di-bukit-makkah',
      },
      {
        quote: 'I travelled alone and worried I would feel awkward. The direction was so respectful and never got in the way of my worship.',
        name: 'Client Name',
        detail: 'Solo pilgrim · Madinah',
        story: 'teduh-di-nabawi',
      },
      {
        quote: 'A selection of photos arrived while we were still in Makkah, so our family at home could share the moment.',
        name: 'Client Name',
        detail: 'Couple · Makkah',
        story: 'berdua-di-baitullah',
      },
      {
        quote: 'The spot was chosen for the morning light. The Green Dome in my photos looks exactly as I remember it.',
        name: 'Client Name',
        detail: 'Solo pilgrim · Madinah',
        story: 'rindu-madinah',
      },
      {
        quote: 'The film made us cry all over again at home. It feels like going back.',
        name: 'Client Name',
        detail: 'Couple · Video reel',
        story: 'senja-di-bukit-makkah',
      },
    ],
  },

  packages: {
    label: 'Packages',
    title: 'Choose how you want to remember',
    intro: 'Every package can be tailored in duration, location and group size.',
    price: 'Pricing via WhatsApp',
    popular: 'Most requested',
    cta: 'Ask about this package',
    message: `Assalamualaikum ${name}, I am interested in the {package} package. Could you share the price and available dates?`,
    custom: 'Travelling with an Umrah group or need multi-day coverage? We will prepare a custom offer.',
    // TODO: replace with the client's real packages & pricing
    items: [
      {
        name: 'Sakinah',
        arabic: 'سكينة',
        meaning: 'tranquillity',
        audience: 'For pilgrims travelling solo',
        features: ['Photo session at 1 location', 'All best shots edited', 'Modest, guided posing', 'Delivered via digital link'],
      },
      {
        name: 'Mawaddah',
        arabic: 'مودة',
        meaning: 'affection',
        audience: 'For couples & honeymoon Umrah',
        features: ['Photo session at 2 locations', 'Vertical cinematic reel', 'Rug & lantern props', 'All best shots edited'],
        featured: true,
      },
      {
        name: 'Barakah',
        arabic: 'بركة',
        meaning: 'blessing',
        audience: 'For families & groups',
        features: ['Family & group photos', 'Journey documentary film', 'Multiple sessions available', 'Scheduled around your itinerary'],
      },
    ],
  },

  process: {
    label: 'How to book',
    title: 'Four simple steps',
    steps: [
      { title: 'Message us', body: 'Tell us your dates in Makkah or Madinah and who is coming.' },
      { title: 'Set the schedule', body: 'We match it to your itinerary, outside the main worship times.' },
      { title: 'The session', body: 'Relaxed and respectful of your worship. We guide your poses.' },
      { title: 'Receive your files', body: 'Edited photos and films delivered through a digital link.' },
    ],
  },

  faq: {
    label: 'FAQ',
    title: 'Frequently asked',
    // TODO: align answers (especially turnaround time) with the client's policy
    items: [
      {
        q: 'Will the session interfere with my worship?',
        a: 'No. Sessions are scheduled outside prayer and main worship times, usually after sunrise or before maghrib.',
      },
      {
        q: 'Is photography allowed around the mosques?',
        a: 'We shoot in the courtyards and surroundings and always follow the instructions of on-site officers. We agree on exact spots before the session.',
      },
      {
        q: 'I am with a travel group and my schedule is tight. Is that okay?',
        a: 'Yes. Send us your itinerary and we will find a suitable gap. Even a short 30–60 minute session produces plenty of photos.',
      },
      {
        q: 'When will I receive the results?',
        a: 'A selection of photos can usually be sent while you are still in the Holy Land, with the rest following via a digital link.',
      },
      {
        q: 'Do I need special outfits or props?',
        a: 'Comfortable, matching outfits are enough. Some packages include props such as a rug and lanterns.',
      },
      {
        q: 'How do I pay?',
        a: 'Payment details and the deposit are explained on WhatsApp once your date is confirmed.',
      },
    ],
  },

  closing: {
    title: ['You focus on your prayers.', 'We will remember the moment.'],
    body: 'Weekly slots are limited because we follow pilgrims’ schedules. Secure your date now.',
    cta: 'Check Availability',
  },

  footer: {
    tagline: 'Umrah journey photographer & videographer in the Holy Land.',
    base: 'Based in Makkah & Madinah, Saudi Arabia',
    contact: 'Contact',
    follow: 'Follow',
    nav: 'Explore',
    rights: 'All photos & films belong to',
  },
};
