import type { CSSProperties, ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollExitProps {
  children: ReactNode;
  /** px the content lifts by the time the section has scrolled away. */
  lift?: number;
  /** Scale reached at the end of the exit (1 = none). */
  scaleTo?: number;
  /** Max blur in px at the end of the exit. */
  blur?: number;
  /** How quickly it fades: 1 = fully transparent once the section is gone. */
  fade?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Hero "exit" choreography: as the section scrolls up and out, its content
 * drifts upward, fades, softly scales and (optionally) blurs — so the hero
 * hands off to the next section instead of just sliding off-screen.
 * Progress is measured on the parent element, so place it directly inside
 * the hero <section> (or its container).
 */
export default function ScrollExit({
  children,
  lift = -90,
  scaleTo = 0.96,
  blur = 0,
  fade = 1.15,
  className = "",
  style,
}: ScrollExitProps) {
  const ref = useScrollProgress<HTMLDivElement>(
    (p, el) => {
      // At rest, drop every effect so the content (photos especially)
      // renders on the normal crisp layer, not a resampled one.
      if (p < 0.002) {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
        return;
      }
      let t = `translate3d(0, ${Math.round(p * lift)}px, 0)`;
      if (scaleTo !== 1) t += ` scale(${(1 - (1 - scaleTo) * p).toFixed(4)})`;
      el.style.transform = t;
      el.style.opacity = Math.max(0, 1 - p * fade).toFixed(3);
      el.style.filter = blur ? `blur(${(p * blur).toFixed(2)}px)` : "";
    },
    { start: 0, end: 0, cssVar: null, reducedValue: 0, measureParent: true }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
