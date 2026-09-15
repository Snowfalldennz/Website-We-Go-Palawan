export interface Stop { name: string; image: string; }
export interface Price { original: number; promo: number; }
export interface Tour {
  slug: string;
  name: string;
  destination: 'el-nido' | 'coron' | 'puerto-princesa' | 'port-barton';
  kind: 'Island hopping' | 'Land tour' | 'City tour' | 'Evening tour' | 'Wildlife';
  tagline: string;
  description: string;
  hero: string;
  price: Price | null;
  priceNote?: string;
  duration: string;
  pickup?: string;
  stops: Stop[];
  activities?: string[];
  included: string[];
  notIncluded: string[];
  notes?: string[];
  featured?: boolean;
}

const EN_ACTIVITIES = ['Swimming', 'Kayaking', 'Snorkeling', 'Picture taking'];
const EN_INCLUDED = ['Lunch on the tour', 'Authorized boat with life vests', 'Tour guide'];
const EN_NOT_INCLUDED = [
  'Eco-Tourism Development Fee: ₱400',
  'Lagoon fee: ₱200',
  'Van transfer to El Nido: ₱1,800 (vice versa)',
];
const EN_NOTES = ['Reservation fee: ₱300 per person per tour'];

const CORON_ACTIVITIES = ['Swimming', 'Kayaking', 'Snorkeling'];
const CORON_NOT_INCLUDED = ['Environmental fee, paid at the airport: ₱200'];
const CORON_NOTES = ['Reservation fee: ₱200 per person per tour'];

export const tours: Tour[] = [
  /* ------------------------------------------------ EL NIDO */
  {
    slug: 'el-nido-tour-a',
    name: 'El Nido Tour A',
    destination: 'el-nido',
    kind: 'Island hopping',
    tagline: 'The classic lagoons.',
    description:
      'The most loved El Nido route. Kayak into the Big Lagoon, walk through a crack in the rock to the Secret Lagoon, and finish on the white sand of Seven Commando.',
    hero: 'tours/el-nido/el-nido-tour-a/big-lagoon.png',
    price: { original: 1200, promo: 1000 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Big Lagoon', image: 'tours/el-nido/el-nido-tour-a/big-lagoon.png' },
      { name: 'Shimizu Island', image: 'tours/el-nido/el-nido-tour-a/shimizu-island.png' },
      { name: 'Secret Lagoon', image: 'tours/el-nido/el-nido-tour-a/secret-lagoon.png' },
      { name: 'Seven Commando Beach', image: 'tours/el-nido/el-nido-tour-a/seven-commando-beach.png' },
      { name: 'Payong-Payong Beach', image: 'tours/el-nido/el-nido-tour-a/payong-payong-beach.png' },
    ],
    activities: EN_ACTIVITIES,
    included: EN_INCLUDED,
    notIncluded: EN_NOT_INCLUDED,
    notes: EN_NOTES,
    featured: true,
  },
  {
    slug: 'el-nido-tour-b',
    name: 'El Nido Tour B',
    destination: 'el-nido',
    kind: 'Island hopping',
    tagline: 'Caves, Snake Island and quiet sand.',
    description:
      'Caves you can swim into, a sandbar that snakes between two islands, and beaches with far fewer boats.',
    hero: 'tours/el-nido/tour-b/entalula-island.webp',
    price: { original: 1300, promo: 1100 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Entalula Island', image: 'tours/el-nido/tour-b/entalula-island.webp' },
      { name: 'Codugnon Cave', image: 'tours/el-nido/tour-b/codugnon-cave.jpg' },
      { name: 'Snake Island', image: 'tours/el-nido/tour-b/snake-island.jpg' },
      { name: 'Cathedral Cave', image: 'tours/el-nido/tour-b/cathedral-cave.jpg' },
      { name: 'Pinagbuyutan Island', image: 'tours/el-nido/tour-b/pinagbuyutan-island.webp' },
    ],
    activities: EN_ACTIVITIES,
    included: EN_INCLUDED,
    notIncluded: EN_NOT_INCLUDED,
    notes: EN_NOTES,
  },
  {
    slug: 'el-nido-tour-c',
    name: 'El Nido Tour C',
    destination: 'el-nido',
    kind: 'Island hopping',
    tagline: 'Hidden beaches and the open sea.',
    description:
      'The furthest route and, for many, the most beautiful. Swim through a gap in the rock into Secret Beach and end at Helicopter Island.',
    hero: 'tours/el-nido/tour-c/hidden-beach.webp',
    price: { original: 1500, promo: 1200 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Secret Beach', image: 'tours/el-nido/tour-c/secret-beach.webp' },
      { name: 'Matinloc Shrine', image: 'tours/el-nido/tour-c/matinloc-shrine-area.avif' },
      { name: 'Hidden Beach', image: 'tours/el-nido/tour-c/hidden-beach.webp' },
      { name: 'Tapiutan Island', image: 'tours/el-nido/tour-c/tapiutan-island.jpg' },
      { name: 'Helicopter Island', image: 'tours/el-nido/tour-c/helicopter-island.webp' },
    ],
    activities: EN_ACTIVITIES,
    included: EN_INCLUDED,
    notIncluded: [...EN_NOT_INCLUDED, 'Optional Matinloc Shrine entrance: ₱200'],
    notes: EN_NOTES,
    featured: true,
  },
  {
    slug: 'el-nido-tour-d',
    name: 'El Nido Tour D',
    destination: 'el-nido',
    kind: 'Island hopping',
    tagline: 'Beaches close to town.',
    description:
      'Cadlao Lagoon, the Small Lagoon and a string of beaches along the coast. Shorter boat rides and more time in the water.',
    hero: 'tours/el-nido/tour-d/cadlao-lagoon.jpg',
    price: { original: 1200, promo: 1000 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Small Lagoon', image: 'tours/el-nido/tour-d/small.jpg' },
      { name: 'Paradise Beach', image: 'tours/el-nido/tour-d/paradise-beach.avif' },
      { name: 'Pasandigan Beach', image: 'tours/el-nido/tour-d/pasandigan-beach.avif' },
      { name: 'Cadlao Lagoon', image: 'tours/el-nido/tour-d/cadlao-lagoon.jpg' },
      { name: 'Ipil Beach', image: 'tours/el-nido/tour-d/ipil-beach.webp' },
    ],
    activities: EN_ACTIVITIES,
    included: EN_INCLUDED,
    notIncluded: EN_NOT_INCLUDED,
    notes: EN_NOTES,
  },

  /* ------------------------------------------------ CORON */
  {
    slug: 'coron-tour-a',
    name: 'Coron Island Tour A',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'Kayangan Lake and the reefs.',
    description:
      'Climb to the viewpoint above Kayangan Lake, then swim in it. Snorkel Quin Reef and Coral Garden and finish at the beach.',
    hero: 'tours/coron/coron-a/kayangan-lake.jpg',
    price: { original: 1250, promo: 1000 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Kayangan Lake', image: 'tours/coron/coron-a/kayangan-lake.jpg' },
      { name: 'Quin Reef', image: 'tours/coron/coron-a/quin-reef.jpg' },
      { name: 'CYC Beach', image: 'tours/coron/coron-a/cyc-beach.jpg' },
      { name: 'Coral Garden', image: 'tours/coron/coron-a/coral-garden.png' },
      { name: 'Atwayan Beach', image: 'tours/coron/coron-a/atwayan-beach.jpg' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
    featured: true,
  },
  {
    slug: 'coron-tour-b',
    name: 'Coron Island Tour B',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'Barracuda Lake and the wreck.',
    description:
      'Swim in Barracuda Lake where warm and cold water meet, snorkel over the Skeleton Wreck and drift through Twin Lagoon.',
    hero: 'tours/coron/b/barracuda-lake.png',
    price: { original: 1650, promo: 1300 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Barracuda Lake', image: 'tours/coron/b/barracuda-lake.png' },
      { name: 'Twin Lagoon', image: 'tours/coron/b/twin-lagoon.png' },
      { name: 'Skeleton Wreck', image: 'tours/coron/b/skeleton-wreck.png' },
      { name: 'Malwawey Beach', image: 'tours/coron/b/malwawey-beach.png' },
      { name: 'Reef Garden', image: 'tours/coron/b/reef-garden.png' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
  },
  {
    slug: 'coron-escapade-tour-c',
    name: 'Coron Escapade Tour C',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'Long white beaches.',
    description:
      'A slower day on the outer islands. Malcapuya and Ditaytayan have some of the longest, whitest beaches in Palawan.',
    hero: 'tours/coron/escapde-tour-c/malcapuya-island.png',
    price: { original: 2200, promo: 1700 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Malcapuya Island', image: 'tours/coron/escapde-tour-c/malcapuya-island.png' },
      { name: 'Ditaytayan Island', image: 'tours/coron/escapde-tour-c/ditaytayan-island.png' },
      { name: 'Coco Beach', image: 'tours/coron/escapde-tour-c/coco-beach.png' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
  },
  {
    slug: 'calauit-safari-black-island',
    name: 'Calauit Safari with Black Island',
    destination: 'coron',
    kind: 'Wildlife',
    tagline: 'Giraffes, then a beach.',
    description:
      'An early start to see giraffes and zebras at the Calauit sanctuary, a stop at Conception Falls, and an afternoon on Black Island.',
    hero: 'tours/coron/caluit-safari-w-black-island/caluit-island.png',
    price: { original: 3200, promo: 2500 },
    duration: 'Full day, back by early evening',
    pickup: '7:00 AM',
    stops: [
      { name: 'Calauit Island', image: 'tours/coron/caluit-safari-w-black-island/caluit-island.png' },
      { name: 'Black Island', image: 'tours/coron/caluit-safari-w-black-island/black-island.png' },
      { name: 'Conception Falls', image: 'tours/coron/caluit-safari-w-black-island/conception-falls.png' },
    ],
    included: ['Lunch on the tour', 'Land and boat transfers', 'Tour guide'],
    notIncluded: [...CORON_NOT_INCLUDED, 'Safari environmental fee: ₱200'],
    notes: CORON_NOTES,
  },
  {
    slug: 'coron-ultimate-tour',
    name: 'Coron Ultimate Tour',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'Everything in one day.',
    description:
      'Kayangan Lake, Twin Lagoon, the Skeleton Wreck and the best reefs around Coron Island, with a picnic lunch on the beach.',
    hero: 'tours/coron/coron-ultimate-tour/twin-lagoon.png',
    price: { original: 1900, promo: 1500 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Kayangan Lake', image: 'tours/coron/coron-ultimate-tour/kayangan-lake.png' },
      { name: 'Twin Lagoon', image: 'tours/coron/coron-ultimate-tour/twin-lagoon.png' },
      { name: 'Smith Beach', image: 'tours/coron/coron-ultimate-tour/smith-beach.png' },
      { name: 'CYC Beach', image: 'tours/coron/coron-ultimate-tour/cyc-beach.png' },
      { name: 'Coral Garden', image: 'tours/coron/coron-ultimate-tour/coral-garden.png' },
      { name: 'Skeleton Wreck', image: 'tours/coron/coron-ultimate-tour/skeleton-wreck.png' },
      { name: 'Malwawey Beach', image: 'tours/coron/coron-ultimate-tour/malwawey-beach.png' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
    featured: true,
  },
  {
    slug: 'coron-super-ultimate-tour',
    name: 'Coron Super Ultimate Tour',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'The Ultimate route, plus Barracuda Lake.',
    description:
      'The longest island-hopping day we run. Everything on the Ultimate route, with Barracuda Lake added in, where a layer of warm water sits over cold.',
    hero: 'tours/coron/coron-ultimate-tour/smith-beach.png',
    price: { original: 2200, promo: 1700 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Kayangan Lake', image: 'tours/coron/coron-ultimate-tour/kayangan-lake.png' },
      { name: 'Barracuda Lake', image: 'tours/coron/b/barracuda-lake.png' },
      { name: 'Twin Lagoon', image: 'tours/coron/coron-ultimate-tour/twin-lagoon.png' },
      { name: 'CYC Beach', image: 'tours/coron/coron-ultimate-tour/cyc-beach.png' },
      { name: 'Smith Beach', image: 'tours/coron/coron-ultimate-tour/smith-beach.png' },
      { name: 'Coral Garden', image: 'tours/coron/coron-ultimate-tour/coral-garden.png' },
      { name: 'Skeleton Wreck', image: 'tours/coron/coron-ultimate-tour/skeleton-wreck.png' },
      { name: 'Malwawey Beach', image: 'tours/coron/coron-ultimate-tour/malwawey-beach.png' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
  },
  {
    slug: 'coron-reef-and-wrecks',
    name: 'Pass Island with Reef and Wrecks',
    destination: 'coron',
    kind: 'Island hopping',
    tagline: 'WWII wrecks in shallow water.',
    description:
      'Snorkel over Japanese shipwrecks from 1944 that rest close enough to the surface to see clearly, then rest on Pass Island.',
    hero: 'tours/coron/reef-and-wrecks/lusong-cortal-garden.jpg',
    price: { original: 2200, promo: 1700 },
    duration: '9:00 AM to 4–5 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Pass Island', image: 'tours/coron/reef-and-wrecks/pass-island.webp' },
      { name: 'East Tangat Wreck', image: 'tours/coron/reef-and-wrecks/east-tangat-wreck.jpg' },
      { name: 'Lusong Gunboat', image: 'tours/coron/reef-and-wrecks/lusong-gunboat.webp' },
      { name: 'Lusong Coral Garden', image: 'tours/coron/reef-and-wrecks/lusong-cortal-garden.jpg' },
    ],
    activities: CORON_ACTIVITIES,
    included: ['Lunch on the tour', 'Boat with life vests', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: CORON_NOTES,
  },
  {
    slug: 'coron-town-tour',
    name: 'Coron Town Tour',
    destination: 'coron',
    kind: 'Land tour',
    tagline: 'Sunset from Mt. Tapyas, then the hot spring.',
    description:
      'An easy afternoon around town. Climb the steps of Mt. Tapyas for sunset over the bay, then soak in Maquinit Hot Spring.',
    hero: 'tours/coron/town-tour/mt-tapyas.png',
    price: { original: 1000, promo: 800 },
    duration: '3:30 PM to about 8:00 PM',
    pickup: '3:30 – 4:00 PM',
    stops: [
      { name: 'Souvenir Shop', image: 'tours/coron/town-tour/souvenir-shop.png' },
      { name: 'Lualhati Park', image: 'tours/coron/town-tour/lualhati-park.png' },
      { name: 'Town Plaza', image: 'tours/coron/town-tour/town-plaza.png' },
      { name: 'St. Agustin Church', image: 'tours/coron/town-tour/st-agustin-church.png' },
      { name: 'Mt. Tapyas', image: 'tours/coron/town-tour/mt-tapyas.png' },
      { name: 'Cashew Factory', image: 'tours/coron/town-tour/cashew-factory.png' },
      { name: 'Maquinit Hot Spring', image: 'tours/coron/town-tour/maquinit-hot-spring.png' },
    ],
    included: ['Van transfers', 'Tour guide'],
    notIncluded: CORON_NOT_INCLUDED,
    notes: [
      ...CORON_NOTES,
      'A different, lower rate applies when this is booked as a Day 1 add-on to a Coron package — see that package for its price.',
    ],
  },

  /* ------------------------------------------------ PORT BARTON */
  {
    slug: 'port-barton-tour-a',
    name: 'Port Barton Island Hopping Tour A',
    destination: 'port-barton',
    kind: 'Island hopping',
    tagline: 'Turtles, reefs and a sandbar.',
    description:
      'Snorkel with sea turtles, visit two reefs, and walk out onto a sandbar in the middle of the bay. Drone and underwater shots included.',
    hero: 'packages/port-barton/port-barton-day-tour/maxima-island.jpg',
    price: { original: 1700, promo: 1400 },
    duration: '9:00 AM to 4:00 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Twin Reef', image: 'packages/port-barton/port-barton-day-tour/twin-reef.jpg' },
      { name: 'Exotic / Maxima Island', image: 'packages/port-barton/port-barton-day-tour/maxima-island.jpg' },
      { name: 'Turtle Spot', image: 'packages/port-barton/port-barton-day-tour/turtle-spot.jpg' },
      { name: 'Paradise or Peña Plata Island', image: 'packages/port-barton/port-barton-day-tour/pena-plata.jpg' },
      { name: 'Fantastic Reef or Wide Reef', image: 'packages/port-barton/port-barton-day-tour/fantastic-reef.jpg' },
      { name: 'Starfish Island / Sand Bar', image: 'packages/port-barton/port-barton-day-tour/sand-bar.jpg' },
    ],
    activities: ['Swimming', 'Snorkeling', 'Kayaking'],
    included: [
      'Licensed boat, captain and crew',
      'Local guide fees',
      'Island entrance fees',
      'Buffet lunch and refreshments',
      'Snorkeling mask',
      'Underwater and drone photos and video',
      'Towels',
    ],
    notIncluded: ['Environmental fee: ₱200', 'Van transfer: ₱650 per way'],
    notes: ['Reservation fee: ₱300 per person per tour', 'Stops may change with the weather'],
    featured: true,
  },
  {
    slug: 'san-vicente-land-tour',
    name: 'San Vicente Land Tour',
    destination: 'port-barton',
    kind: 'Land tour',
    tagline: 'Long Beach and the waterfall.',
    description:
      'By motorcycle or tricycle to Long Beach, one of the longest beaches in the Philippines, then up to the viewpoint and out to Bigaho Falls.',
    hero: 'tours/port-barton/san-vicente-land-tour/long-beach.jpg',
    price: { original: 2100, promo: 1700 },
    duration: '9:00 AM to 3–4 PM',
    pickup: '8:30 – 9:00 AM',
    stops: [
      { name: 'Long Beach', image: 'tours/port-barton/san-vicente-land-tour/long-beach.jpg' },
      { name: 'Bato ni Ningning', image: 'tours/port-barton/san-vicente-land-tour/bato-ni-ningning2.jpg' },
      { name: 'San Vicente View Point', image: 'tours/port-barton/san-vicente-land-tour/san-vic-view-point.jpg' },
      { name: 'Hundred Steps', image: 'tours/port-barton/san-vicente-land-tour/hundred-steps.jpg' },
      { name: 'Bigaho Waterfalls', image: 'tours/port-barton/san-vicente-land-tour/bigaho-waterfalls.jpg' },
      { name: 'Gilligan’s Port Barton Beach', image: 'tours/port-barton/san-vicente-land-tour/gilligan-s-port-barton-beach.webp' },
    ],
    included: ['Motorcycle, tuk-tuk or tricycle', 'Tour guide'],
    notIncluded: ['Lunch', 'Entrance fees', 'Environmental fee: ₱200'],
    notes: ['Reservation fee: ₱300 per person per tour'],
  },

  /* ------------------------------------------------ PUERTO PRINCESA */
  {
    slug: 'underground-river-tour',
    name: 'Underground River Tour',
    destination: 'puerto-princesa',
    kind: 'Island hopping',
    tagline: 'A UNESCO World Heritage Site, by paddle boat.',
    description:
      'Drive through the mountains to Sabang, cross by boat, and paddle into the cave. Buffet lunch afterwards. Optional zipline at Ugong Rock.',
    hero: 'tours/puerto-princesa/city-tour/underground-river.jpg',
    price: { original: 2500, promo: 2050 },
    duration: '8:00 AM to 3–4 PM, including travel',
    pickup: '7:00 – 7:30 AM',
    stops: [
      { name: 'Underground River entrance', image: 'tours/puerto-princesa/pps-tours/underground-river/entrance.jpg' },
      { name: 'Inside the cave', image: 'tours/puerto-princesa/pps-tours/underground-river/inside.jpg' },
      { name: 'Mangrove forest', image: 'tours/puerto-princesa/pps-tours/underground-river/mangrove.webp' },
      { name: 'Ugong Rock zipline (optional)', image: 'tours/puerto-princesa/pps-tours/underground-river/zipline.jpg' },
    ],
    included: [
      'Visitor entry permit',
      'Round-trip van transfer, about 1.5 hours each way',
      'DOT-accredited tour guide',
      'Boat, terminal and wharf fees',
      'Buffet lunch',
      'Audio guide fee',
    ],
    notIncluded: ['Environmental fee: ₱150', 'Ugong Rock zipline: ₱400, paid on site'],
    notes: ['Free pick-up and drop-off at your hotel in Puerto Princesa', 'Reservation fee: ₱300 per person'],
    featured: true,
  },
  {
    slug: 'honda-bay-island-hopping',
    name: 'Honda Bay Island Hopping',
    destination: 'puerto-princesa',
    kind: 'Island hopping',
    tagline: 'Three islands, close to the city.',
    description:
      'Snorkel Pambato Reef, walk the sandbar at Luli or Starfish Island, and have a buffet lunch on Cowrie Island.',
    hero: 'tours/puerto-princesa/pps-tours/honda-bay/cowrie-island.jpg',
    price: { original: 1800, promo: 1650 },
    duration: '8:00 AM to 3:00 PM',
    stops: [
      { name: 'Pambato Reef', image: 'tours/puerto-princesa/honda-bay/pambato-reef-puerto-princesa-jpeg.jpg' },
      { name: 'Luli Island', image: 'tours/puerto-princesa/honda-bay/luli-island.jpg' },
      { name: 'Starfish Island', image: 'tours/puerto-princesa/honda-bay/star-fish-island.jpg' },
      { name: 'Cowrie Island', image: 'tours/puerto-princesa/pps-tours/honda-bay/cowrie-island.jpg' },
    ],
    activities: ['Swimming', 'Kayaking', 'Snorkeling'],
    included: [
      'Round-trip van transfer',
      'DOT-accredited tour guide',
      'Boat, terminal and wharf fees',
      'Island entrance and shed fees',
      'Buffet lunch',
    ],
    notIncluded: ['Environmental fee: ₱150', 'Kayak rental (about ₱400) and snorkel gear (about ₱200)'],
    notes: ['Free pick-up and drop-off at your hotel', 'Reservation fee: ₱300 per person'],
    featured: true,
  },
  {
    slug: 'puerto-princesa-city-tour',
    name: 'Puerto Princesa City Tour',
    destination: 'puerto-princesa',
    kind: 'City tour',
    tagline: 'The city in an afternoon.',
    description:
      'A four-hour loop of the city: the Baywalk, Plaza Cuartel, the Cathedral, Mitra’s Ranch, Baker’s Hill and the pasalubong centers.',
    hero: 'tours/puerto-princesa/pps-tours/city-tour/baker-s-hill.jpg',
    price: { original: 800, promo: 650 },
    duration: '4 hours, starting 8:30 AM or 1:30 PM',
    stops: [
      { name: 'Baywalk', image: 'tours/puerto-princesa/pps-tours/city-tour/baywalk.jpg' },
      { name: 'Plaza Cuartel', image: 'tours/puerto-princesa/city-tour/plaza-cuartel.jpg' },
      { name: 'Cathedral', image: 'tours/puerto-princesa/city-tour/cathedral.jpg' },
      { name: 'Mitra’s Ranch', image: 'tours/puerto-princesa/city-tour/mitras-ranch.jpg' },
      { name: 'Baker’s Hill', image: 'tours/puerto-princesa/pps-tours/city-tour/baker-s-hill.jpg' },
      { name: 'Butterfly Garden or Crocodile Farm', image: 'tours/puerto-princesa/pps-tours/city-tour/crocodile-farm-in-puerto-princesa-palawan.jpg' },
      { name: 'Pasalubong Center', image: 'tours/puerto-princesa/city-tour/pasalubong-center.jpg' },
    ],
    included: ['Round-trip van transfer', 'DOT-accredited tour guide', 'Entrance fees', 'Light snacks'],
    notIncluded: ['Environmental fee: ₱150'],
    notes: ['Reservation fee: ₱200 per person'],
  },
  {
    slug: 'firefly-watching',
    name: 'Firefly Watching with Dinner',
    destination: 'puerto-princesa',
    kind: 'Evening tour',
    tagline: 'Dinner on the water, then the lights.',
    description:
      'A quiet evening paddle along the river as the mangroves fill with fireflies. Dinner is served on the boat.',
    hero: 'tours/puerto-princesa/pps-tours/firefly/fireflie-22.avif',
    price: { original: 1800, promo: 1500 },
    duration: '6:00 – 9:00 PM',
    pickup: '5:30 – 6:00 PM',
    stops: [
      { name: 'Firefly watching', image: 'tours/puerto-princesa/pps-tours/firefly/fireflie-22.avif' },
      { name: 'Dinner on the boat', image: 'tours/puerto-princesa/pps-tours/firefly/dinner.jpg' },
    ],
    included: ['Boat', 'Tour guide', 'Dinner on the boat', 'Hotel pick-up and drop-off'],
    notIncluded: ['Environmental fee: ₱150'],
    notes: ['Reservation fee: ₱300 per person'],
  },
];

export const tourBySlug = (slug: string) => tours.find((t) => t.slug === slug);
export const toursFor = (destination: string) => tours.filter((t) => t.destination === destination);
export const featuredTours = tours.filter((t) => t.featured);
export const peso = (n: number) => '₱' + n.toLocaleString('en-PH');
