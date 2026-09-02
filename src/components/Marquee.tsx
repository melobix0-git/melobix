import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop (default 30). */
  speed?: number;
  className?: string;
}

/**
 * Seamless infinite marquee. Children render twice (the second copy is
 * hidden from screen readers); the loop pauses on hover. Under
 * prefers-reduced-motion the global animation kill-switch leaves the first
 * copy statically visible.
 */
export default function Marquee({
  children,
  speed = 30,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{ "--marquee-speed": `${speed}s` } as CSSProperties}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
