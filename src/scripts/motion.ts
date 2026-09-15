/**
 * Shared motion setup: Lenis smooth scroll + GSAP ScrollTrigger, the
 * declarative scroll hooks used across the site, and the scroll-driven page
 * background.
 *
 *  data-reveal            fade + rise when entering the viewport
 *  data-reveal-group      staggers its [data-reveal] children
 *  data-reveal-img        clip-path mask reveal with slow scale settle
 *  data-split             rebuild into masked lines, each rising in turn
 *                         ("load" to play on arrival instead of on scroll)
 *  data-parallax="0.15"   vertical parallax, value = strength
 *  data-scale-in          image settles from 1.12 to 1 while scrolling through
 *  data-nav-theme         'light' | 'dark' — nav colour under this section
 *  data-bg="#071a24"      this section's page background colour
 *
 * Lifecycle: with the view transition router active the document is swapped
 * without a reload, so module top-level code runs only once. Everything that
 * touches the DOM is therefore registered through onPage() and torn down
 * again on the way out.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { splitLines } from './split';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True when Astro's view transition router is handling navigation. */
const hasRouter = !!document.querySelector('meta[name="astro-view-transitions-enabled"]');

/** Run `fn` for the current page, and again after every view transition. */
export function onPage(fn: () => void) {
  if (hasRouter) {
    document.addEventListener('astro:page-load', fn);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

/** Register cleanup to run before the next page replaces this one. */
const leaveHandlers: Array<() => void> = [];
export function onLeave(fn: () => void) {
  leaveHandlers.push(fn);
}

/* ---------------- Smooth scroll (created once, kept across pages) --------- */
export let lenis: Lenis | null = null;

if (!reducedMotion) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Pinning a section inserts a spacer, which makes the document taller after
  // Lenis has already measured it. Without this the cached limit stays short
  // and everything below the pin becomes unreachable by scrolling.
  ScrollTrigger.addEventListener('refresh', () => lenis!.resize());
  window.addEventListener('menu:toggle', (e) => {
    (e as CustomEvent).detail.open ? lenis!.stop() : lenis!.start();
  });
  if (import.meta.env.DEV) (window as any).__lenis = lenis;
}

/* ---------------- Teardown between pages ---------------- */
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  for (const fn of leaveHandlers.splice(0)) fn();
  splitRecords.length = 0;
});

document.addEventListener('astro:after-swap', () => {
  // Land where a fresh page load would: top of page, or the hash target if
  // the link pointed at one. Done explicitly rather than left to the
  // router's own default, since Lenis owns the visible scroll position here
  // and a native reset alone does not guarantee Lenis's internal value
  // agrees with it.
  //
  // location.hash is not reliably updated by the time this event fires —
  // checking it immediately here was making every /#section link land at
  // the top instead of at its target. One rAF is enough for the URL to
  // settle without being a visible delay.
  requestAnimationFrame(() => {
    const hash = location.hash && document.querySelector(location.hash);
    if (hash) lenis ? lenis.scrollTo(hash as HTMLElement, { immediate: true }) : hash.scrollIntoView();
    else if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    lenis?.resize();
  });
});

/* ---------------- Anchor links ---------------- */
function setupAnchors() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href')!;
      if (location.pathname !== '/' && href.startsWith('/#')) return;
      const target = document.querySelector(href.replace(/^\//, ''));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -60, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ---------------- Nav behaviour ---------------- */
function setupNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  const initialTheme = nav.dataset.initialTheme as 'light' | 'dark';
  const initialTransparent = nav.dataset.initialTransparent === 'true';

  const setTheme = (theme: 'light' | 'dark') => {
    nav.classList.toggle('nav--light', theme === 'light');
    nav.classList.toggle('nav--dark', theme === 'dark');
  };
  const setSolid = (solid: boolean) => {
    nav.classList.toggle('nav--solid', solid);
    nav.classList.toggle('nav--transparent', !solid);
  };

  document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach((section) => {
    const theme = section.dataset.navTheme as 'light' | 'dark';
    ScrollTrigger.create({
      trigger: section,
      start: 'top 40px',
      end: 'bottom 40px',
      onEnter: () => setTheme(theme),
      onEnterBack: () => setTheme(theme),
    });
  });

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (initialTransparent && hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom 80px',
      onLeave: () => setSolid(true),
      onEnterBack: () => { setSolid(false); setTheme(initialTheme); },
    });
  } else {
    setSolid(true);
  }

  let lastY = window.scrollY;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      if (y > 200 && y > lastY + 4) nav.classList.add('nav--hidden');
      else if (y < lastY - 4 || y <= 200) nav.classList.remove('nav--hidden');
      lastY = y;
    },
  });
}

/* ---------------- Split-line headline reveals ---------------- */
interface SplitRecord { el: HTMLElement; inners: HTMLElement[]; shown: boolean; }
const splitRecords: SplitRecord[] = [];

function setupSplits() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const record: SplitRecord = { el, inners: splitLines(el), shown: false };
    splitRecords.push(record);
    gsap.set(record.inners, { yPercent: 110 });
    gsap.set(el, { opacity: 1 });

    const play = () => {
      record.shown = true;
      const tween = gsap.to(record.inners, {
        yPercent: 0,
        duration: 1.25,
        ease: 'power3.out',
        stagger: 0.08,
        delay: parseFloat(el.dataset.splitDelay ?? '0'),
      });
      // Safety net. These lines start hidden behind their mask, so if the
      // ticker is ever throttled hard enough that the tween does not finish
      // (a backgrounded tab, a stalled compositor) the text would be left
      // invisible. Never leave copy unreadable for the sake of an effect.
      window.setTimeout(() => {
        if (tween.progress() < 1) tween.progress(1);
      }, 4000);
    };

    if (el.dataset.split === 'load') play();
    else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play });
  });
}

// Line breaks move when the window resizes, so the split has to be redone.
let resplitTimer = 0;
window.addEventListener('resize', () => {
  if (!splitRecords.length) return;
  clearTimeout(resplitTimer);
  resplitTimer = window.setTimeout(() => {
    for (const record of splitRecords) {
      record.inners = splitLines(record.el);
      gsap.set(record.inners, { yPercent: record.shown ? 0 : 110 });
    }
    ScrollTrigger.refresh();
  }, 250);
});

/* ---------------- Reveals, parallax, scale ---------------- */
function setupReveals() {
  const claimed = new Set<Element>();

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = [...group.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (i) => !('split' in i.dataset),
    );
    items.forEach((i) => claimed.add(i));
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (claimed.has(el) || 'split' in el.dataset) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay: parseFloat(el.dataset.reveal || '0'),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power3.inOut' });
    if (img) tl.to(img, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0);
  });

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '0.15');
    const target = el.querySelector('img') ?? el;
    gsap.fromTo(
      target,
      { yPercent: -strength * 50 },
      {
        yPercent: strength * 50,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-scale-in]').forEach((el) => {
    const target = el.querySelector('img') ?? el;
    gsap.fromTo(
      target,
      { scale: 1.12 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 20%', scrub: true } },
    );
  });
}

/* ---------------- Scroll-driven page background ----------------
 * Each section declares the colour the page should be while it is in view.
 * The change is scrubbed across the gap above the section, which is empty
 * padding, so no text is ever sitting on a half-mixed colour.
 */
function setupBackground() {
  // Opt-in via Base.astro's `bgDriven` prop (only the homepage sets it), not
  // "does this page happen to have 2+ [data-bg] elements". Every page carries
  // one on the shared FinalCTA and Footer near its tail, which is correct on
  // the homepage but is not, by itself, evidence that the *rest* of some
  // other page's content is meant to be driven the same way — the first
  // matching section is used as the page's starting colour, applied
  // immediately regardless of scroll position, so counting sections alone
  // was painting entire tour/destination/package pages navy from the top.
  //
  // <html> is never torn down across a soft navigation, so a page that
  // doesn't opt in must still actively clear any "bg-driven" class and inline
  // body colour a *previous* page left behind — otherwise every .off/.dark
  // section here renders transparent (see the CSS rule below) over that
  // leaked colour, with dark text sitting on top of it.
  if (!document.body.hasAttribute('data-bg-page')) {
    document.documentElement.classList.remove('bg-driven');
    document.body.style.backgroundColor = '';
    return;
  }

  const sections = [...document.querySelectorAll<HTMLElement>('[data-bg]')];
  if (sections.length < 2) return;

  document.documentElement.classList.add('bg-driven');

  const rgb = (hex: string): [number, number, number] => {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const stops = sections.map((el) => ({ el, color: rgb(el.dataset.bg!) }));

  // One deterministic pass instead of a chain of scrubbed tweens. Chained
  // tweens all write the same property, so the result depended on which one
  // rendered last, and jumping between sections could leave a stale colour.
  // Here the colour is derived from element positions every update, so it is
  // always right no matter how the visitor got to this scroll position.
  let last = '';
  const apply = () => {
    const vh = window.innerHeight;
    const begin = vh * 0.92; // colour starts changing when the next section's
    const finish = vh * 0.55; // top crosses this band, which is empty padding
    let color = stops[0].color;

    for (let i = 1; i < stops.length; i++) {
      const top = stops[i].el.getBoundingClientRect().top;
      const t = Math.max(0, Math.min(1, (begin - top) / (begin - finish)));
      if (t <= 0) break;
      const [a, b] = [stops[i - 1].color, stops[i].color];
      color = t >= 1 ? b : (a.map((v, k) => Math.round(v + (b[k] - v) * t)) as [number, number, number]);
      if (t < 1) break;
    }

    const next = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    if (next !== last) {
      last = next;
      document.body.style.backgroundColor = next;
    }
  };

  apply();
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: apply, onRefresh: apply });
}

/* ---------------- Boot ---------------- */
onPage(() => {
  setupAnchors();
  setupNav();
  if (reducedMotion) return;
  setupSplits();
  setupReveals();
  setupBackground();
  // Pinned sections change page height as they initialise, so measure last.
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

window.addEventListener('load', () => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
