/**
 * Splits a text element into its rendered lines so each can be revealed from
 * behind a mask. This is measured, not guessed: the words are wrapped, their
 * offsetTop is read, and words sharing a top are grouped into one line. That
 * means it follows real line breaks at any width, including <br> and balanced
 * text-wrap, and it can be redone on resize when the breaks change.
 *
 * Markup goes from:   <h2>Days on the water.</h2>
 * to:                 <h2><span class="sl-line"><span class="sl-inner">…</span></span></h2>
 *
 * The outer span clips; the inner span is what moves.
 */

// Original markup, kept so a re-split starts from a clean slate.
const originals = new WeakMap<HTMLElement, string>();

/** Rebuilds `el` as masked lines and returns the inner spans to animate. */
export function splitLines(el: HTMLElement): HTMLElement[] {
  if (originals.has(el)) el.innerHTML = originals.get(el)!;
  else originals.set(el, el.innerHTML);

  // 1. Wrap every word so each has a measurable box, keeping <br> and any
  //    inline elements (<em>, <span>) intact.
  const words: HTMLElement[] = [];
  const build = (source: Node, target: Node) => {
    source.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        for (const part of (child.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            target.appendChild(document.createTextNode(' '));
            continue;
          }
          const word = document.createElement('span');
          word.style.display = 'inline-block';
          word.textContent = part;
          words.push(word);
          target.appendChild(word);
        }
      } else if (child.nodeName === 'BR') {
        target.appendChild(child.cloneNode(false));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const shell = child.cloneNode(false);
        target.appendChild(shell);
        build(child, shell);
      }
    });
  };

  const staging = document.createDocumentFragment();
  build(el, staging);
  el.textContent = '';
  el.appendChild(staging);

  // 2. Group words into lines by the top edge they share.
  const byTop = new Map<number, string[]>();
  for (const word of words) {
    const top = Math.round(word.offsetTop);
    if (!byTop.has(top)) byTop.set(top, []);
    byTop.get(top)!.push(word.textContent ?? '');
  }

  // 3. Rebuild as clip/inner pairs.
  el.textContent = '';
  const inners: HTMLElement[] = [];
  for (const [, lineWords] of [...byTop.entries()].sort((a, b) => a[0] - b[0])) {
    const clip = document.createElement('span');
    clip.className = 'sl-line';
    const inner = document.createElement('span');
    inner.className = 'sl-inner';
    inner.textContent = lineWords.join(' ');
    clip.appendChild(inner);
    el.appendChild(clip);
    inners.push(inner);
  }
  return inners;
}

/** Puts the element back exactly as it was authored. */
export function restore(el: HTMLElement) {
  const html = originals.get(el);
  if (html !== undefined) el.innerHTML = html;
}
