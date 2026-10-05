import type { CSSProperties, ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollTrackProps {
  children: ReactNode;
  /** Horizontal travel as a % of the row's own width. Negative = leftwards. */
  distance?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * A row that slides horizontally in lock-step with vertical scroll — the
 * oversized editorial type band. Unlike a marquee it never moves on its
 * own; scroll up and it rewinds.
 */
export default function ScrollTrack({
  children,
  distance = -25,
  className = "",
  style,
}: ScrollTrackProps) {
  const ref = useScrollProgress<HTMLDivElement>(
    (p, el) => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner)
        inner.style.transform = `translate3d(${((p - 0.5) * distance).toFixed(2)}%, 0, 0)`;
    },
    { cssVar: null, reducedValue: 0.5 }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
