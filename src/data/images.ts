import type { ImageMetadata } from 'astro';

// Every real project photo, synced from "Tours Only" and "Complete Packages"
// by scripts/sync-assets.mjs. Keys are paths relative to src/assets/photos.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byPath = new Map<string, ImageMetadata>();
for (const [k, v] of Object.entries(modules)) {
  byPath.set(k.replace('/src/assets/photos/', ''), v.default);
}

export function photo(path: string): ImageMetadata {
  const img = byPath.get(path);
  if (!img) throw new Error(`Photo not found: ${path}`);
  return img;
}

export function photosIn(prefix: string): ImageMetadata[] {
  return [...byPath.entries()].filter(([k]) => k.startsWith(prefix)).map(([, v]) => v);
}

// Guest review screenshots. Kept in their own folder rather than photos/,
// since scripts/sync-assets.mjs deletes and rebuilds photos/ from the
// "Tours Only" / "Complete Packages" source folders on every run — anything
// placed inside it that isn't a synced tour photo would get wiped out.
const reviewModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/reviews/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const reviewsByPath = new Map<string, ImageMetadata>();
for (const [k, v] of Object.entries(reviewModules)) {
  reviewsByPath.set(k.replace('/src/assets/reviews/', ''), v.default);
}

export function reviewPhoto(filename: string): ImageMetadata {
  const img = reviewsByPath.get(filename);
  if (!img) throw new Error(`Review screenshot not found: ${filename}`);
  return img;
}
