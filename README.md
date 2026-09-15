# WE GO PALAWAN — website

Premium, photography-first travel site for We Go Palawan Tour Services.
Built with [Astro](https://astro.build) (static output), GSAP ScrollTrigger and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, cPanel, etc.).
Set the real domain in `astro.config.mjs` (`site`) before the final build so canonical and Open Graph URLs are right.

## Where things live

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, socials, location | `src/data/site.ts` |
| Destinations (names, intro copy, cover photos) | `src/data/destinations.ts` |
| Tours: prices, stops, inclusions, photos | `src/data/tours.ts` |
| Packages, itineraries, accommodation | `src/data/packages.ts` |
| Customer reviews | `src/data/testimonials.ts` |
| Hero video derivatives + poster | `public/video/` (generated, see below) |
| Optimized copies of your photos | `src/assets/photos/` (generated, see below) |
| Page sections | `src/components/` |
| Pages / routes | `src/pages/` |
| Design tokens and typography | `src/styles/global.css` |
| Scroll / reveal / parallax setup | `src/scripts/motion.ts` |

Prices, stops and inclusions were transcribed from the `Inclusions.txt` files in `Tours Only/` and `Complete Packages/`.
Edit the data files and rebuild; nothing is hardcoded in the pages.

## Your original assets are never modified

- `Videos/`, `Tours Only/` and `Complete Packages/` are read-only sources.
- `npm run assets:sync` copies photos into `src/assets/photos/` with URL-safe names.
  Run it again after adding or replacing photos in the source folders.
- `npm run video:optimize` reads `Videos/WE_GO_PALAWAN_HERO_SILENT.mp4` and writes
  scrub-friendly copies to `public/video/` (a keyframe every 8 frames so scrolling can seek instantly).
  Run it again whenever you replace the hero video.

  | File | Size | Used when |
  | --- | --- | --- |
  | `hero-scrub.mp4` 1920×1080 60fps | 12.6 MB | Desktop and wide screens |
  | `hero-scrub-portrait.mp4` 608×1080 60fps | 5.6 MB | Phones held upright |
  | `hero-scrub-landscape-sm.mp4` 1280×720 60fps | 8.2 MB | Small screens turned sideways |

  The portrait file is a centred 9:16 crop. Because the hero fills the screen with
  `object-fit: cover`, a phone in portrait only ever shows a narrow vertical slice of a
  16:9 frame. Cropping to 9:16 means every encoded pixel is one the phone actually
  displays, at under half the download.

### Verifying a new master

  Do not trust what the container reports. Two checks, both worth re-running whenever the
  hero video is replaced:

  **Is the resolution real?** Round-trip the video through 720p and measure how much is
  lost. Real detail above 720p shows up as a *lower* score.

  ```bash
  node_modules/ffmpeg-static/ffmpeg.exe -i "Videos/WE_GO_PALAWAN_HERO_SILENT.mp4" -lavfi "split=2[a][b];[b]scale=1280:720,scale=1920:1080:flags=bicubic[c];[a][c]psnr" -f null -
  ```

  The current master scores 37.2 dB, so it is genuinely 1080p. An earlier one scored
  43.5 dB, meaning the round trip lost nothing — that was a 720p generation upscaled into
  a 1080 container. Above roughly 42 dB, treat it as upscaled.

  **Is the frame rate real?** Count how many frames survive duplicate detection.

  ```bash
  node_modules/ffmpeg-static/ffmpeg.exe -i "Videos/WE_GO_PALAWAN_HERO_SILENT.mp4" -map 0:v:0 -vf mpdecimate -f null -
  ```

  1175 of 1204 frames are unique, so the 60fps is real. If roughly half were dropped, it
  would be 30fps content duplicated into a 60fps container, and there would be nothing to
  gain from keeping it at 60.

## The hero

`src/components/HeroScroll.astro` pins the video for 500vh of scrolling and maps scroll progress
to `video.currentTime` in a `requestAnimationFrame` loop (via GSAP's ticker). The file is fetched in full,
then handed to the `<video>` as a blob URL so seeking never waits on the network. Scrolling up reverses naturally.

Story overlays (El Nido, Coron, Palawan) are timed as scroll fractions at the top of that file (`chapters`).
If you re-cut the video, adjust `start`/`end` there to match the new scene boundaries.

The file is chosen at load from the viewport's aspect ratio, and swapped if the phone is rotated.
Users with `prefers-reduced-motion` get a static poster and a single-screen hero.

## Reviews

`src/data/testimonials.ts` ships with three clearly labelled sample entries.
Replace them with real guest reviews and set `placeholder: false`; the "Sample" labels disappear automatically.

## Booking

There is no payment or backend. The booking page composes a message from the form and opens WhatsApp
(number from `site.whatsapp`), or copies it to the clipboard. Every "Book" button links to `/book?trip=…`
so the right tour or package is pre-selected.

## Motion

All scroll motion is declarative. Add an attribute in the markup; `src/scripts/motion.ts`
wires it up. Nothing needs a bespoke script.

| Attribute | Effect |
| --- | --- |
| `data-split` | Rebuilds the text into one masked line per rendered line, each rising in turn. Add `="load"` to play on arrival instead of on scroll. |
| `data-reveal` | Fade and rise on entry. A number sets a delay, e.g. `data-reveal="0.55"`. |
| `data-reveal-group` | Staggers the `data-reveal` children inside it. |
| `data-reveal-img` | Clip-path mask reveal with a slow scale settle. |
| `data-parallax="0.15"` | Vertical parallax, value is strength. |
| `data-scale-in` | Image settles from 1.12 to 1 while scrolling through. |
| `data-bg="#071a24"` | The page background colour while this section is in view. |
| `data-nav-theme` | `light` or `dark`, the nav colour over this section. |

**Split lines** are measured, not guessed. Words are wrapped, their `offsetTop` is read, and
words sharing a top become a line. So it follows real line breaks at any width and is redone
on resize. The lines start hidden behind their mask, so there is a 4-second safety net that
forces them visible if the animation never runs. Copy must never be unreadable because an
effect failed.

**The page background** is one deterministic pass, not a chain of scrubbed tweens. Chained
tweens all write the same property, so the result depended on which rendered last and jumping
between sections could leave a stale colour. The colour is now derived from element positions
on every scroll update. The change happens while the empty padding between two sections is on
screen, so no text ever sits on a half-mixed colour.

**Page navigation** uses Astro's view transitions. Elements sharing a `transition:name` across
two pages travel between them, so clicking a tour card moves its image into the detail page
hero. Because the document is swapped rather than reloaded, module top-level code runs only
once: everything that touches the DOM is registered through `onPage()` from `motion.ts`, and
cleanup through `onLeave()`.

> **Careful with pinned sections.** Pinning inserts a spacer that makes the document taller
> *after* Lenis has measured it. Lenis then keeps a short cached limit and everything below
> the pin becomes unreachable by scrolling. `motion.ts` re-measures on every
> `ScrollTrigger` refresh to prevent this. If you add another pinned section and the page
> stops scrolling to the bottom, this is why.
