/**
 * Shared scroll engine.
 *
 * Every scroll-linked effect on the site (parallax, scrubbed text, sticky
 * stacks, velocity marquees…) subscribes here instead of attaching its own
 * listener. All subscribers run inside one requestAnimationFrame per frame,
 * so we never read layout more than once per frame per element and never
 * thrash on scroll events.
 */

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame = 0;

function flush() {
  frame = 0;
  subscribers.forEach(fn => fn());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

export function subscribeScroll(fn: Subscriber) {
  subscribers.add(fn);
  if (subscribers.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  schedule();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/** Force every subscriber to re-measure on the next frame (e.g. after a layout change). */
export function requestScrollUpdate() {
  schedule();
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/**
 * Progress of an element through the viewport, 0 → 1.
 *
 * `start` / `end` are viewport fractions (0 = top edge, 1 = bottom edge):
 *  - progress is 0 when the element's TOP crosses `start`
 *  - progress is 1 when the element's BOTTOM crosses `end`
 *
 * Presets:
 *  - [1, 0]  "through": enters at the bottom, leaves at the top (parallax)
 *  - [0, 0]  "exit":    hero scrolling up and out of view
 *  - [0, 1]  "pinned":  tall wrapper with a sticky child
 */
export function elementProgress(
  rect: DOMRect,
  vh: number,
  start: number,
  end: number
) {
  const from = start * vh;
  const distance = from - end * vh + rect.height;
  if (distance <= 0) return rect.top < from ? 1 : 0;
  return clamp((from - rect.top) / distance);
}
