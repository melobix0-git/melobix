import { useEffect, useRef, type ReactNode } from "react";
import { clamp, prefersReducedMotion, subscribeScroll } from "@/lib/scroll";

interface StackCardsProps {
  items: ReactNode[];
  /** px from the top of the viewport where the first card pins. */
  top?: number;
  /** Extra px each subsequent card pins below the previous one. */
  step?: number;
  /** Scale lost per card stacked on top. */
  shrink?: number;
  /** Scroll gap between cards, as a fraction of viewport height. */
  gap?: number;
  className?: string;
}

/**
 * Sticky stacking cards. Each card pins near the top of the viewport and
 * the next one slides up over it; cards underneath scale back and dim a
 * little for every card that lands on top, giving a physical "deck" feel.
 *
 * Depth is computed from where each card will actually pin (natural offset
 * minus its sticky offset), so the shrink is perfectly synced with the
 * card arriving on top — on any screen size. Reduced motion: cards just pin.
 */
export default function StackCards({
  items,
  top = 120,
  step = 24,
  shrink = 0.05,
  gap = 0.28,
  className = "",
}: StackCardsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = items.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    return subscribeScroll(() => {
      const vh = window.innerHeight;
      const margin = gap * vh;
      const scrolled = top - root.getBoundingClientRect().top;

      // Scroll distance (past the first pin) at which card k pins.
      const pins: number[] = [];
      const windows: number[] = [];
      let natural = 0;
      cardRefs.current.forEach((card, k) => {
        pins[k] = natural - k * step;
        const h = card?.offsetHeight ?? 0;
        // A card "arrives" over the gap + previous card height before pinning.
        windows[k + 1] = h + margin - step;
        natural += h + margin;
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        let depth = 0;
        for (let k = i + 1; k < n; k++) {
          const w = Math.max(1, windows[k] ?? 1);
          depth += clamp((scrolled - (pins[k] - w)) / w);
        }
        card.style.transform = `scale(${(1 - depth * shrink).toFixed(4)})`;
        card.style.filter =
          depth > 0.01 ? `brightness(${(1 - depth * 0.05).toFixed(3)})` : "";
      });
    });
  }, [n, top, step, shrink, gap]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="sticky"
          style={{
            top: top + i * step,
            marginBottom: i === n - 1 ? 0 : `${gap * 100}vh`,
          }}
        >
          <div
            ref={el => {
              cardRefs.current[i] = el;
            }}
            className="origin-top"
            style={{ willChange: "transform" }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
