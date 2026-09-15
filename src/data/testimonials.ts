/**
 * Guest reviews — real Facebook screenshots, shown as-is rather than
 * retyped, so visitors see the original post (name, date, reactions).
 * `alt` transcribes the text for screen readers and search engines, since
 * none of the words in a screenshot are otherwise machine-readable.
 *
 * Files live in src/assets/reviews/, named by reviewer. Add a new entry
 * there and below to add a review; there is no placeholder/sample state
 * for these, since a screenshot is either real or absent.
 *
 * `col` is which of the 3 desktop columns (see Testimonials.astro) a
 * review is placed in. It's set by hand rather than left to CSS
 * auto-balancing, because screenshot heights vary hugely (a text-only
 * review vs. one with a full photo grid) — auto-balancing reshuffles
 * everything whenever a review is added, which previously left an
 * uneven gap under Michelle's. Mobile ignores `col` and stacks every
 * review in array order.
 */
export interface Review {
  image: string; // filename in src/assets/reviews/
  alt: string;
  name: string;
  date?: string;
  col: 1 | 2 | 3;
}

export const reviews: Review[] = [
  {
    image: 'michelle-dela-cruz-tejada.png',
    name: 'Michelle Dela Cruz Tejada',
    date: 'June 2025',
    alt: 'Facebook review from Michelle Dela Cruz Tejada, June 11 2025, recommending We Go Palawan: "Smooth transaction and on time sila also mababait ang driver and tour guide nila na enjoy namin ang stay namin sa puerto princesa palawan always updated din, legit na le..." Attached photos show the group at the Underground River welcome sign, at the Luli Island welcome sign, a spread of grilled seafood and fruit, the group posing with the food spread, and guests on a tour boat wearing life vests.',
    col: 1,
  },
  {
    image: 'jo-an-cabatbat-san-jose.png',
    name: 'Jo-an Cabatbat San Jose',
    date: 'July 2025',
    alt: 'Facebook review from Jo-an Cabatbat San Jose, July 19 2025, recommending We Go Palawan: "We had an amazing tour with We Go Palawan in El Nido and Puerto Princesa. The guides were knowledgeable and friendly, making our experience unforgettable. Highly recommend for anyone looking for a stress-free tour! See you next time for our Palawan tour again!"',
    col: 1,
  },
  {
    image: 'jessy-pallasigue.png',
    name: 'Jessy Pallasigue',
    date: 'September 2025',
    alt: 'Facebook review from Jessy Pallasigue, September 26 2025, recommending We Go Palawan: "on time and super friendly si kuya driver sir onyok and guide sir Patrick! supper sulit ang city tour!" Attached photo shows the group seated with a Palawan tribe family in front of an Ibalnan alphabet chalkboard display.',
    col: 2,
  },
  {
    image: 'arianne-kaye-lee-jagmis.png',
    name: 'Arianne Kaye Lee Jagmis',
    date: 'November 2025',
    alt: 'Facebook review from Arianne Kaye Lee Jagmis, November 2 2025, recommending We Go Palawan: "5/5 rating, cozzzzzz why not!? Highly recommending We Go Palawan for an unforgettable and truly satisfying travel experience. Everything was handled smoothly and professionally from booking to the actual tour. Their Port Barton day tour was both affordable and high-quality. As a solo traveler, I genuinely appreciated how friendly and accommodating the whole team was. They went the extra mile. Definitely a travel agency worth recommending if you\'re after a stress-free and memorable Palawan adventure. I\'ll definitely be booking with them again for my future trips."',
    col: 2,
  },
  {
    image: 'ina-erin-flores-tibayan-ortaliz.png',
    name: 'Ina Erin Flores Tibayan-Ortaliz',
    date: 'February',
    alt: 'Facebook review from Ina Erin Flores Tibayan-Ortaliz, recommending We Go Palawan: "They were really amazing to deal with. Very accommodating and fast to respond. They even apologized whenever they replied late because they were busy with many clients. You can really feel that they care. Our tour guides and van drivers were all kind, and their prices were very affordable. Our Underground River tour got canceled because of strong waves, and even though it wasn\'t their fault, they sincerely apologized. We will definitely book with them again next time. 100 billion out of 10! Big thanks to Sir Erwin, Ma\'am Mitch, Ma\'am Aida, Sir Christian, and Ma\'am Christine for making our experience memorable. And thank you to the admin/owner for making my parents so happy. We\'ll be back and we\'ll still book with you for that Underground River tour!" Attached photo shows the extended family posing in front of the Ugong Rock Adventures sign.',
    col: 3,
  },
  {
    image: 'coeleen-mendoza-delos-reyes.png',
    name: 'Coeleen Mendoza Delos Reyes',
    alt: 'Facebook review from Coeleen Mendoza Delos Reyes recommending We Go Palawan: "Highly recommended! Very accommodating from inquiries til travel dates. We appreciate that our request for seats into the van was noted and our kid (4y) is free of charge in transpo. Low downpayment to book and payment will be collected during the day of your tour. Book now with we go palawan."',
    col: 3,
  },
];
