import type { Price } from './tours';

export interface Day { day: string; text: string; visits?: string[]; }
export interface Pkg {
  slug: string;
  name: string;
  nights: string;
  destinations: string[];
  tagline: string;
  hero: string;
  gallery: string[];
  price: Price | null;
  priceNote?: string;
  included: string[];
  itinerary: Day[];
  notIncluded: string[];
  notes?: string[];
  stay?: string[];
  featured?: boolean;
}

const TOUR_A_VISITS = ['Big Lagoon', 'Shimizu Island', 'Secret Lagoon', 'Seven Commando Beach', 'Payong-Payong Beach'];
const TOUR_C_VISITS = ['Secret Beach', 'Matinloc Shrine', 'Hidden Beach', 'Tapiutan Island', 'Helicopter Island'];
const CORON_ULTIMATE_VISITS = ['Kayangan Lake', 'Twin Lagoon', 'Siete Pecados', 'Marine Park', 'Skeleton Wreck / Malwawey Beach', 'Coral Garden', 'CYC Beach', 'Balinsasayaw Beach'];

export const packages: Pkg[] = [
  {
    slug: '3d2n-el-nido',
    name: '3D2N El Nido',
    nights: '3 days, 2 nights',
    destinations: ['el-nido'],
    tagline: 'Two nights in town, one day on the water.',
    hero: 'tours/el-nido/el-nido-tour-a/secret-lagoon.png',
    gallery: [
      'tours/el-nido/el-nido-tour-a/big-lagoon.png',
      'tours/el-nido/el-nido-tour-a/shimizu-island.png',
      'tours/el-nido/el-nido-tour-a/seven-commando-beach.png',
      'tours/el-nido/el-nido-tour-a/payong-payong-beach.png',
    ],
    price: { original: 4100, promo: 3899 },
    included: [
      'Standard air-conditioned room with breakfast',
      'Round-trip van transfer from Puerto Princesa Airport to El Nido',
      'El Nido Island Hopping Tour A with lunch',
      'Tour guide during tours',
      'Authorized boat with life vests',
    ],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Van transfer to El Nido, about 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Island Hopping Tour A with lunch. Pick-up 8:30 to 9:00 AM.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. Van transfer to Puerto Princesa Airport. Flight should be 3:00 PM onward.' },
    ],
    notIncluded: ['Eco-Tourism Development Fee: ₱400', 'Big Lagoon user’s fee: ₱200'],
    notes: ['Tour includes swimming, kayaking and snorkeling'],
    stay: ['faithrica-pension'],
    featured: true,
  },
  {
    slug: '3d2n-coron',
    name: '3D2N Coron',
    nights: '3 days, 2 nights',
    destinations: ['coron'],
    tagline: 'Kayangan Lake, Coral Garden and no hidden charges.',
    hero: 'tours/coron/coron-ultimate-tour/kayangan-lake.png',
    gallery: [
      'tours/coron/coron-a/green-lagoon.jpg',
      'tours/coron/coron-a/balinsasayaw-beach.jpg',
      'tours/coron/coron-a/quin-reef.jpg',
      'tours/coron/coron-a/coral-garden.png',
    ],
    price: { original: 3799, promo: 3499 },
    included: [
      'Standard air-conditioned room with breakfast',
      'Round-trip van transfer from Busuanga Airport',
      'Coron Tour A with picnic lunch',
      'All permits and fees',
      'No hidden charges',
    ],
    itinerary: [
      { day: 'Day 1', text: 'Arrival at Busuanga Airport. Van transfer to your accommodation. Optional Coron Town Tour, 4:00 to 8:00 PM, ₱700 per person.', visits: ['Lualhati Park', 'Coron Souvenir Shop', 'Cashew Factory', 'Mt. Tapyas', 'Maquinit Hot Spring'] },
      { day: 'Day 2', text: 'Breakfast. Coron Tour A with picnic lunch. Pick-up 9:00 AM.', visits: ['Kayangan Lake', 'Quin Reef', 'CYC Beach', 'Coral Garden', 'Balinsasayaw Beach'] },
      { day: 'Day 3', text: 'Breakfast. Airport transfer for departure.' },
    ],
    notIncluded: ['Anything not mentioned'],
    stay: ['ahras-place'],
    featured: true,
  },
  {
    slug: '3d2n-puerto-princesa',
    name: '3D2N Puerto Princesa',
    nights: '3 days, 2 nights',
    destinations: ['puerto-princesa'],
    tagline: 'The Underground River and the city.',
    hero: 'packages/puerto-princesa/3d2n-puerto-princesa/underground-river.jpg',
    gallery: [
      'packages/puerto-princesa/3d2n-puerto-princesa/cathedral.jpg',
      'packages/puerto-princesa/3d2n-puerto-princesa/plaza-cuartel.jpg',
      'packages/puerto-princesa/3d2n-puerto-princesa/mitras-ranch.jpg',
      'packages/puerto-princesa/3d2n-puerto-princesa/pasalubong-center.jpg',
    ],
    price: { original: 4100, promo: 3999 },
    included: [
      'Standard air-conditioned room with breakfast',
      'Underground River tour with buffet lunch (joining tour)',
      'City tour with light snacks (joining tour)',
      'Audio-visual guide during the Underground River tour',
      'Air-conditioned van during tours',
      'Professional tour guide',
      'Underground River permits',
      'Authorized boat with life vests',
      'Terminal and wharfage fees',
      'Entrance fees',
    ],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Check in, then the City Tour. Morning pick-up 7:00 to 7:30 AM, or afternoon 1:30 to 2:00 PM.', visits: ['Baywalk', 'Plaza Cuartel', 'Cathedral', 'Mitra’s Ranch', 'Baker’s Hill', 'Crocodile Farm or Butterfly Garden', 'Pasalubong Center'] },
      { day: 'Day 2', text: 'Breakfast. Underground River tour with buffet lunch. Pick-up 7:00 to 7:30 AM.' },
      { day: 'Day 3', text: 'Breakfast. Departure.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Airport transfers'],
    notes: ['Itinerary may change depending on flight details'],
    stay: ['buenas-pension'],
    featured: true,
  },
  {
    slug: 'port-barton-day-tour',
    name: 'Port Barton Day Tour',
    nights: 'Day trip from Puerto Princesa',
    destinations: ['port-barton'],
    tagline: 'Turtles and a sandbar, back by evening.',
    hero: 'packages/port-barton/port-barton-day-tour/sand-bar.jpg',
    gallery: [
      'packages/port-barton/port-barton-day-tour/maxima-island.jpg',
      'packages/port-barton/port-barton-day-tour/twin-reef.jpg',
      'packages/port-barton/port-barton-day-tour/pena-plata.jpg',
      'packages/port-barton/port-barton-day-tour/turtle-spot.jpg',
    ],
    price: { original: 2999, promo: 2799 },
    included: [
      'Round-trip van transfer from Puerto Princesa to Port Barton',
      'Port Barton Tour A island hopping with lunch',
      'Tour guide assistance during tours',
      'Boat with life vests',
      'Mask and snorkeling gear',
      'Kayak',
      'Complimentary underwater and drone shots',
    ],
    itinerary: [
      { day: 'Morning', text: 'Van leaves Puerto Princesa at 6:00 AM, about 3 hours. Tour pick-up 8:30 to 9:00 AM.' },
      { day: 'Day', text: 'Port Barton Tour A with lunch, 9:00 AM to 4–5 PM. Stops depend on the weather.', visits: ['Twin Reef', 'Exotic / Maxima Island', 'Turtle Spot', 'Paradise or Peña Plata Island or Calipayan', 'Fantastic Reef or Wide Reef', 'Starfish Island / Sand Bar'] },
      { day: 'Evening', text: 'Travel back to Puerto Princesa.' },
    ],
    notIncluded: ['Environmental fee', 'Anything not mentioned'],
    stay: ['two-seasons-inn'],
    featured: true,
  },

  /* ---------- Multi-destination ---------- */
  {
    slug: '3d2n-puerto-princesa-el-nido',
    name: '3D2N Puerto Princesa + El Nido',
    nights: '3 days, 2 nights',
    destinations: ['puerto-princesa', 'el-nido'],
    tagline: 'One night in El Nido, one in the city. Fast and full.',
    hero: 'tours/el-nido/el-nido-tour-a/shimizu-island.png',
    gallery: ['tours/el-nido/el-nido-tour-a/big-lagoon.png', 'tours/puerto-princesa/pps-tours/underground-river/entrance.jpg'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['1 night in El Nido and 1 night in Puerto Princesa with breakfast', 'Van transfers', 'El Nido Tour A', 'Underground River tour with buffet lunch, permits, guide, boat and wharf fees'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Van transfer to El Nido, 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Island Hopping Tour A. After the tour, freshen up and transfer to Puerto Princesa.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. Underground River tour with buffet lunch, pick-up 7:00 to 7:30 AM. Airport transfer after. Flight must be 5:00 PM onward.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱400', 'Big Lagoon user’s fee: ₱200'],
    stay: ['faithrica-pension', 'buenas-pension'],
  },
  {
    slug: '4d3n-puerto-princesa-el-nido',
    name: '4D3N Puerto Princesa + El Nido',
    nights: '4 days, 3 nights',
    destinations: ['puerto-princesa', 'el-nido'],
    tagline: 'Two El Nido tours and the Underground River.',
    hero: 'tours/el-nido/tour-c/hidden-beach.webp',
    gallery: ['tours/el-nido/el-nido-tour-a/secret-lagoon.png', 'tours/el-nido/tour-c/secret-beach.webp', 'tours/puerto-princesa/city-tour/underground-river.jpg'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['2 nights in El Nido and 1 night in Puerto Princesa with breakfast', 'Van transfers', 'El Nido Tour A and Tour C with lunch', 'Underground River tour with buffet lunch'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Van transfer to El Nido, 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Tour A with lunch. Pick-up 8:30 to 9:00 AM.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. El Nido Tour C with lunch. After the tour, transfer to Puerto Princesa.', visits: TOUR_C_VISITS },
      { day: 'Day 4', text: 'Breakfast. Underground River tour with buffet lunch, pick-up 7:00 to 7:30 AM. Airport transfer after.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱200', 'Big Lagoon user’s fee: ₱200'],
    stay: ['faithrica-pension', 'buenas-pension'],
  },
  {
    slug: '5d4n-puerto-princesa-el-nido',
    name: '5D4N Puerto Princesa + El Nido',
    nights: '5 days, 4 nights',
    destinations: ['puerto-princesa', 'el-nido'],
    tagline: 'The same route, with room to breathe.',
    hero: 'tours/el-nido/tour-c/helicopter-island.webp',
    gallery: ['tours/el-nido/el-nido-tour-a/seven-commando-beach.png', 'tours/el-nido/tour-c/hidden-beach.webp', 'tours/puerto-princesa/pps-tours/underground-river/mangrove.webp'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['2 nights in El Nido and 2 nights in Puerto Princesa with breakfast', 'Van transfers', 'El Nido Tour A and Tour C with lunch', 'Underground River tour with buffet lunch'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Van transfer to El Nido, 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Tour A with lunch.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. El Nido Tour C with lunch. Travel back to Puerto Princesa after.', visits: TOUR_C_VISITS },
      { day: 'Day 4', text: 'Breakfast. Underground River tour with buffet lunch, pick-up 7:00 to 7:30 AM.' },
      { day: 'Day 5', text: 'Breakfast. Departure.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱400', 'Big Lagoon user’s fee: ₱200', 'Optional Matinloc Shrine entrance: ₱200'],
    stay: ['faithrica-pension', 'buenas-pension'],
  },
  {
    slug: '6d5n-puerto-princesa-el-nido',
    name: '6D5N Puerto Princesa + El Nido',
    nights: '6 days, 5 nights',
    destinations: ['puerto-princesa', 'el-nido'],
    tagline: 'Three nights in El Nido, with a free day.',
    hero: 'tours/el-nido/el-nido-tour-a/payong-payong-beach.png',
    gallery: ['tours/el-nido/el-nido-tour-a/big-lagoon.png', 'tours/el-nido/tour-c/secret-beach.webp', 'tours/puerto-princesa/city-tour/underground-river.jpg'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['3 nights in El Nido and 2 nights in Puerto Princesa with breakfast', 'Van transfers', 'El Nido Tour A and Tour C with lunch', 'Underground River tour with buffet lunch'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival. Van transfer to El Nido, 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Tour A with lunch.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. El Nido Tour C with lunch.', visits: TOUR_C_VISITS },
      { day: 'Day 4', text: 'Breakfast. Van transfer back to Puerto Princesa.' },
      { day: 'Day 5', text: 'Breakfast. Underground River tour with buffet lunch, pick-up 7:00 to 7:30 AM.' },
      { day: 'Day 6', text: 'Breakfast. Departure.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱400', 'Big Lagoon user’s fee: ₱200'],
    stay: ['faithrica-pension', 'buenas-pension'],
  },
  {
    slug: '5d4n-el-nido-coron',
    name: '5D4N El Nido + Coron',
    nights: '5 days, 4 nights',
    destinations: ['el-nido', 'coron'],
    tagline: 'Lagoons in El Nido, lakes in Coron, ferry in between.',
    hero: 'tours/coron/coron-ultimate-tour/kayangan-lake.png',
    gallery: ['tours/el-nido/el-nido-tour-a/big-lagoon.png', 'tours/coron/coron-ultimate-tour/twin-lagoon.png', 'tours/coron/coron-ultimate-tour/skeleton-wreck.png'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['2 nights in El Nido and 2 nights in Coron with breakfast', 'Van and pier transfers', 'El Nido Tour A', 'Coron Ultimate Tour with picnic lunch'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival at Puerto Princesa Airport. Van transfer to El Nido, 5 to 6 hours.' },
      { day: 'Day 2', text: 'Breakfast. El Nido Tour A. Pick-up 8:30 to 9:00 AM.', visits: TOUR_A_VISITS },
      { day: 'Day 3', text: 'Breakfast. Ferry to Coron, 5 to 6 hours. Pick-up at Coron pier and drop at your accommodation.' },
      { day: 'Day 4', text: 'Breakfast. Coron Ultimate Tour with picnic lunch. Pick-up 9:00 AM.', visits: CORON_ULTIMATE_VISITS },
      { day: 'Day 5', text: 'Breakfast. Transfer to Busuanga Airport for departure.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱200', 'Big Lagoon user’s fee: ₱200'],
    stay: ['faithrica-pension', 'ahras-place'],
  },
  {
    slug: '6d5n-trio',
    name: '6D5N Trio: Puerto Princesa, El Nido and Coron',
    nights: '6 days, 5 nights',
    destinations: ['puerto-princesa', 'el-nido', 'coron'],
    tagline: 'The whole island, top to bottom.',
    hero: 'tours/coron/coron-ultimate-tour/twin-lagoon.png',
    gallery: ['tours/puerto-princesa/city-tour/underground-river.jpg', 'tours/el-nido/el-nido-tour-a/secret-lagoon.png', 'tours/coron/coron-ultimate-tour/kayangan-lake.png'],
    price: null,
    priceNote: 'Ask for current rates',
    included: ['1 night in Puerto Princesa, 2 in El Nido, 2 in Coron, with breakfast', 'Van and pier transfers', 'Underground River tour with buffet lunch', 'El Nido Tour A', 'Coron Ultimate Tour with picnic lunch'],
    itinerary: [
      { day: 'Day 1', text: 'Arrival at Puerto Princesa Airport. Drop at your accommodation.' },
      { day: 'Day 2', text: 'Breakfast. Underground River tour with buffet lunch, pick-up 7:00 to 7:30 AM. Van transfer to El Nido after, 5 to 6 hours.' },
      { day: 'Day 3', text: 'Breakfast. El Nido Tour A. Pick-up 8:30 to 9:00 AM.', visits: TOUR_A_VISITS },
      { day: 'Day 4', text: 'Breakfast. Ferry to Coron, 5 to 6 hours. Pick-up at Coron pier.' },
      { day: 'Day 5', text: 'Breakfast. Coron Ultimate Tour with picnic lunch. Pick-up 9:00 AM.', visits: CORON_ULTIMATE_VISITS },
      { day: 'Day 6', text: 'Breakfast. Transfer to Busuanga Airport for departure.' },
    ],
    notIncluded: ['Environmental fee: ₱150', 'Eco-Tourism Development Fee: ₱200', 'Big Lagoon user’s fee: ₱200'],
    stay: ['buenas-pension', 'faithrica-pension', 'ahras-place'],
  },
];

export interface Stay { slug: string; name: string; where: string; amenities: string[]; note: string; photos: string[]; }
export const stays: Stay[] = [
  {
    slug: 'faithrica-pension', name: 'Faithrica Pension', where: 'El Nido',
    amenities: ['Free breakfast', 'Air-conditioned room', 'Private bathroom', 'Television', 'Free Wi-Fi', 'Within town proper'],
    note: '5-minute walk to the beach, restaurants and convenience stores.',
    photos: ['packages/el-nido/accommodation-included/couple-room.jpg', 'packages/el-nido/accommodation-included/standard-triple.jpg', 'packages/el-nido/accommodation-included/family.jpg', 'packages/el-nido/accommodation-included/standard-2-single-bed.jpg'],
  },
  {
    slug: 'buenas-pension', name: 'Buenas Pension', where: 'Puerto Princesa',
    amenities: ['Air-conditioned rooms', 'Complimentary breakfast', 'Free Wi-Fi', 'Cable TV', 'Private bath with hot and cold shower', 'Toiletries', 'CCTV security'],
    note: '5 to 7 minutes from the airport and SM mall. Walking distance to restaurants and bars.',
    photos: ['packages/puerto-princesa/accommodation-included/outisde.jpg', 'packages/puerto-princesa/accommodation-included/lobby.webp', 'packages/puerto-princesa/accommodation-included/shower.jpg'],
  },
  {
    slug: 'two-seasons-inn', name: 'Two Seasons Inn', where: 'Port Barton',
    amenities: ['Free breakfast', 'Air-conditioned room', 'Private bathroom', 'Television', 'Within town proper'],
    note: '5-minute walk to the beach, restaurants and convenience stores.',
    photos: ['packages/port-barton/accommodation-included/outside.jpg', 'packages/port-barton/accommodation-included/two-season-barton.jpg', 'packages/port-barton/accommodation-included/room.jpg', 'packages/port-barton/accommodation-included/room2.jpg'],
  },
  {
    slug: 'ahras-place', name: 'Ahras Place', where: 'Coron',
    amenities: ['Breakfast', 'Air-conditioned rooms', 'Private bathroom', 'Terrace'],
    note: 'Simple, clean rooms in Coron town.',
    photos: ['packages/coron/ahras-place/ahras.jpg', 'packages/coron/ahras-place/couple-room.jpg', 'packages/coron/ahras-place/outside1.jpg', 'packages/coron/ahras-place/terrace.jpg'],
  },
];

export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);
export const stayBySlug = (slug: string) => stays.find((s) => s.slug === slug)!;
export const featuredPackages = packages.filter((p) => p.featured);
