// Copies the real project photos from "Tours Only" and "Complete Packages" into
// src/assets/photos with URL-safe names so Astro can optimize them.
//
// Only photos referenced somewhere in src/ (data files, components, pages) are
// copied, so the build does not ship unused originals. Originals are never
// modified. Zips and txt files are skipped.
//
// Usage: npm run assets:sync
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, relative } from 'node:path';

const ROOTS = [['Tours Only', 'tours'], ['Complete Packages', 'packages']];
const OUT = 'src/assets/photos';
const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\.(jpg|jpeg)\.webp$/i, '.webp')
  .replace(/[^a-zA-Z0-9.\-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();

const walk = (d) => readdirSync(d).flatMap((n) => { const f = join(d, n); return statSync(f).isDirectory() ? walk(f) : [f]; });

// 1. Collect every photo path referenced in src/ (excluding the assets folder itself).
const refs = new Set();
const RE = /(?:tours|packages)\/[a-z0-9\-\/.]+?\.(?:jpe?g|png|webp|avif)/g;
for (const f of walk('src')) {
  if (f.replace(/\\/g, '/').startsWith(OUT)) continue;
  if (!/\.(ts|js|mjs|astro|md|mdx|json)$/.test(f)) continue;
  for (const m of readFileSync(f, 'utf8').matchAll(RE)) refs.add(m[0]);
}

// 2. Map source files to their slugged destination and copy the referenced ones.
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
const available = new Map();
for (const [from, to] of ROOTS) {
  for (const f of walk(from)) {
    if (!IMG.has(extname(f).toLowerCase())) continue;
    const rel = relative(from, f).split(/[\\/]/).map((seg, i, a) => (i === a.length - 1 ? slug(basename(seg)) : slug(seg))).join('/');
    available.set(`${to}/${rel}`, f);
  }
}

let n = 0;
const missing = [];
for (const ref of refs) {
  const src = available.get(ref);
  if (!src) { missing.push(ref); continue; }
  const dst = join(OUT, ref);
  mkdirSync(join(dst, '..'), { recursive: true });
  cpSync(src, dst);
  n++;
}
console.log(`copied ${n} referenced photos to ${OUT} (${available.size} available in source folders)`);
if (missing.length) {
  console.warn('WARNING: referenced but not found in source folders:');
  for (const m of missing) console.warn('  ' + m);
  process.exitCode = 1;
}
