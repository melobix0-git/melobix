import type { ReactNode } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollTimelineProps {
  children: ReactNode;
  className?: string;
}

/**
 * Vertical timeline whose spine "grows" as you scroll through it. The fill
 * is a scaleY transform driven by `--p`; a glowing head rides the tip.
 * Children are expected to render their own markers (see .timeline-dot).
 */
export default function ScrollTimeline({
  children,
  className = "",
}: ScrollTimelineProps) {
  const ref = useScrollProgress<HTMLDivElement>(undefined, {
    start: 0.7,
    end: 0.6,
  });

  return (
    <div ref={ref} className={`timeline relative pl-10 md:pl-14 ${className}`}>
      <div className="timeline-rail" aria-hidden="true">
        <div className="timeline-fill" />
        <div className="timeline-head" />
      </div>
      {children}
    </div>
  );
}
