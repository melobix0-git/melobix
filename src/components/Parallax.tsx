import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { prefersReducedMotion, subscribeScroll } from "@/lib/scroll";

interface ParallaxProps {
  children?: ReactNode;
  /**
   * Element mode: travel in px across the element's whole trip through the
   * viewport. Positive sinks back (slower than the page), negative rushes
   * forward. Page mode: px moved per px of page scroll (e.g. -0.3).
   */
  offset?: number;
  /** Optional rotation (deg) over the trip (page mode: per 1000px scrolled). */
  rotate?: number;
  /** Optional extra scale over the trip, e.g. 0.1 → grows 10%. */
  scale?: number;
  /** Optional horizontal travel in px (page mode: per px scrolled). */
  x?: number;
  /**
   * "element" (default) – driven by this element's position in the viewport.
   * "page" – driven by window scroll; use for position:fixed backdrops.
   */
  mode?: "element" | "page";
  className?: string;
  style?: CSSProperties;
}

/**
 * Whole-pixel translate (sub-pixel offsets make images/text look soft);
 * rotate/scale are only added when actually requested.
 */
function buildTransform(x: number, y: number, deg: number, grow: number) {
  let t = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  if (deg) t += ` rotate(${deg.toFixed(2)}deg)`;
  if (grow) t += ` scale(${(1 + grow).toFixed(4)})`;
  return t;
}

/**
 * Scroll-linked parallax layer. In element mode, progress runs 0 → 1 as the
 * element crosses the viewport and the transform is centred on 0.5, so it
 * sits at its natural position mid-screen. Frozen under reduced motion.
 */
export default function Parallax({
  children,
  offset = 80,
  rotate = 0,
  scale = 0,
  x = 0,
  mode = "element",
  className = "",
  style,
}: ParallaxProps) {
  const ref = useScrollProgress<HTMLDivElement>(
    (p, el) => {
      if (mode !== "element") return;
      const t = p - 0.5;
      el.style.transform = buildTransform(
        t * x,
        t * offset,
        t * rotate,
        p * scale
      );
    },
    // Measure the (untransformed) parent: measuring ourselves would feed
    // our own translate back into the progress and damp the motion.
    { cssVar: null, reducedValue: 0.5, measureParent: true }
  );

  useEffect(() => {
    const el = ref.current;
    if (mode !== "page" || !el || prefersReducedMotion()) return;
    return subscribeScroll(() => {
      const y = window.scrollY;
      el.style.transform = buildTransform(
        y * x,
        y * offset,
        (y / 1000) * rotate,
        Math.min(1, y / 2000) * scale
      );
    });
  }, [mode, offset, rotate, scale, x, ref]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
