import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((n) => { const f = join(d, n); return statSync(f).isDirectory() ? walk(f) : [f]; });
for (const f of walk('src/assets/photos')) {
  const m = await sharp(f).metadata();
  console.log(`${m.width}x${m.height}\t${f.split(String.fromCharCode(92)).join('/').replace('src/assets/photos/', '')}`);
}
