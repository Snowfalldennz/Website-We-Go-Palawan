// Creates scroll-scrub friendly derivatives of the hero video.
// The original in /Videos is never modified.
//
// ---------------------------------------------------------------------------
// About the source
// ---------------------------------------------------------------------------
// The current master ("... 3.mp4") was supplied as "4K, 60fps". Neither claim
// survived a check of the actual stream, which is what gets used, not what a
// filename or export dialog says:
//
//   Resolution — the container is 1920x1080, not 4K. Round-tripping through
//   1280x720 and back scores 33.9 dB PSNR (32.2 dB luma) — essentially the
//   same as the previous ("... 2.mp4") master's 34.1 dB — so it is genuine,
//   undownscaled 1080p detail. (A ~43+ dB result would mean upscaled, with no
//   fine detail left to lose in the round trip.)
//
//   Content — a 0.5s-interval contact sheet of this file is frame-for-frame
//   identical to one made from "... 2.mp4": same scenes, same order, same
//   20.97s length. This is that same edit re-exported at 60fps instead of
//   30fps, not new footage — which is why HeroScroll.astro's chapter timings
//   didn't need to change.
//
// Because the master is genuinely 1080p, there is no upscale to undo and no
// aggressive sharpening to compensate for one. Only a light unsharp pass to
// recover the edge definition that compression softens.
//
// ---------------------------------------------------------------------------
// Why these settings
// ---------------------------------------------------------------------------
// The hero never plays. Scroll position drives video.currentTime, so what the
// viewer perceives as smoothness is the rate at which seeks complete, not the
// frame rate. Keyframe spacing in *time* dominates seek latency far more than
// resolution or frame rate do (measured on the original 60fps master; see git
// history), so GOP length stays at the same ~0.27s here: g=16 at this
// master's 60fps (it was g=8 for the previous, 30fps master — same interval,
// different frame count).
//
// CRF is 26, not the 32/30/31 used previously. Comparing a shipped frame
// against the source at crf 32 measured only 31.0 dB PSNR — visibly soft,
// confirmed by eye (the sand texture and finger edges in the opening
// underwater shot were smeared). This footage has unusually high real detail
// (see the PSNR figures above), so it punishes a high CRF harder than typical
// stock footage does. crf 26 was the pipeline's own original quality
// reference (see the seek-latency table in git history) before later drift
// pushed production values up for size; restoring it measured 35.4 dB against
// source — a clear, visible improvement — at roughly double the file size
// (~35/13/20 MB vs ~16/8/9 MB for landscape/portrait/small-landscape). That
// trade favors quality deliberately: this is the flagship hero, fetched once
// via requestIdleCallback rather than blocking first paint, so the extra
// megabytes cost load-time smoothness, not perceived page speed.
//
// Usage: npm run video:optimize
import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import { mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC = resolve('Videos/WE_GO_PALAWAN_HERO_SILENT 3.mp4');
const OUT = resolve('public/video');
mkdirSync(OUT, { recursive: true });

const run = (args) =>
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

// g=16 at 60fps is a keyframe every 0.27s, so a seek decodes at most 15 frames.
// No B-frames, so there is never a backwards dependency to resolve mid-scrub.
// The deblocking filter stays ON (no -tune fastdecode): it improves quality and
// compression at once, and costs nothing noticeable at this GOP length.
const SCRUB = [
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-g', '16', '-keyint_min', '16', '-sc_threshold', '0', '-bf', '0',
  '-preset', 'slow', '-movflags', '+faststart',
];

// setsar=1 keeps pixels square; without it a crop or rescale can leave a
// slightly non-square aspect and browsers stretch the frame a fraction.
const sharpen = (amount) => `unsharp=5:5:${amount}:5:5:0.0,setsar=1`;

// A centred 9:16 crop of the 1080p frame is 608 wide, starting at x=656.
const PORTRAIT_CROP = 'crop=608:1080:656:0';

const encode = (name, { filter, crf }) =>
  run(['-i', SRC, '-an', '-vf', filter, ...SCRUB, '-crf', String(crf), resolve(OUT, name)]);

// Landscape, wide screens. Native resolution, no resampling at all.
encode('hero-scrub.mp4', { filter: sharpen(0.4), crf: 26 });

// Portrait phones. A native crop of the 1080p frame, so no upscale either.
encode('hero-scrub-portrait.mp4', { filter: `${PORTRAIT_CROP},${sharpen(0.5)}`, crf: 26 });

// Small landscape screens, e.g. a rotated phone. Kept light on data.
encode('hero-scrub-landscape-sm.mp4', {
  filter: `scale=1280:720:flags=lanczos,${sharpen(0.5)}`,
  crf: 26,
});

// Posters, shown while the video loads. Same framing as the file that follows,
// so there is no visible jump when the video takes over.
run(['-ss', '0.2', '-i', SRC, '-frames:v', '1', '-vf', sharpen(0.4),
  '-q:v', '3', resolve(OUT, 'hero-poster.jpg')]);
run(['-ss', '0.2', '-i', SRC, '-frames:v', '1', '-vf', `${PORTRAIT_CROP},${sharpen(0.5)}`,
  '-q:v', '3', resolve(OUT, 'hero-poster-portrait.jpg')]);

for (const f of [
  'hero-scrub.mp4',
  'hero-scrub-portrait.mp4',
  'hero-scrub-landscape-sm.mp4',
  'hero-poster.jpg',
  'hero-poster-portrait.jpg',
]) {
  console.log(f.padEnd(30), (statSync(resolve(OUT, f)).size / 1024 / 1024).toFixed(2), 'MB');
}
