export interface Destination {
  slug: string;
  name: string;
  short: string;
  intro: string;
  hero: string;
  cover: string;
  mood: string[];
  travel: string;
}

export const destinations: Destination[] = [
  {
    slug: 'el-nido',
    name: 'El Nido',
    short: 'Island hopping, clear lagoons and unforgettable days.',
    intro:
      'Limestone cliffs, hidden lagoons and quiet white-sand beaches. El Nido is the Palawan you have seen in photos, and it is better in person.',
    hero: 'tours/el-nido/el-nido-tour-a/secret-lagoon.png',
    cover: 'tours/el-nido/el-nido-tour-a/big-lagoon.png',
    mood: ['Lagoons', 'Island hopping', 'Kayaking'],
    travel: '5 to 6 hours by van from Puerto Princesa',
  },
  {
    slug: 'puerto-princesa',
    name: 'Puerto Princesa',
    short: 'The Underground River, Honda Bay and the city itself.',
    intro:
      'The gateway to Palawan. Home to the UNESCO-listed Underground River, the islands of Honda Bay, and an easy city to explore in an afternoon.',
    hero: 'tours/puerto-princesa/pps-tours/honda-bay/cowrie-island.jpg',
    cover: 'tours/puerto-princesa/city-tour/underground-river.jpg',
    mood: ['Underground River', 'Honda Bay', 'City'],
    travel: 'Direct flights from Manila, Cebu and Clark',
  },
  {
    slug: 'port-barton',
    name: 'Port Barton',
    short: 'Slow days, sandbars and turtles.',
    intro:
      'A small, laid-back village halfway up the island. Fewer boats, calmer water, and a sandbar that appears at low tide.',
    hero: 'packages/port-barton/port-barton-day-tour/sand-bar.jpg',
    cover: 'packages/port-barton/port-barton-day-tour/maxima-island.jpg',
    mood: ['Sandbar', 'Turtles', 'Quiet beaches'],
    travel: 'About 3 hours by van from Puerto Princesa',
  },
  {
    slug: 'coron',
    name: 'Coron',
    short: 'Crystal-clear lakes, ancient limestone, unforgettable views.',
    intro:
      'Kayangan Lake, Twin Lagoon and Japanese shipwrecks resting in warm, clear water. Coron is dramatic in a way no other place in Palawan is.',
    hero: 'tours/coron/coron-ultimate-tour/kayangan-lake.png',
    cover: 'tours/coron/coron-ultimate-tour/twin-lagoon.png',
    mood: ['Lakes', 'Wrecks', 'Limestone'],
    travel: 'Fly to Busuanga, or ferry from El Nido',
  },
];

export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug)!;
