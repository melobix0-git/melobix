import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop (default 30). */
  speed?: number;
  className?: string;
  /**
   * Make the loop react to scroll velocity: it speeds up while you scroll,
   * flips direction when you scroll up, and skews slightly with momentum,
   * then eases back to its idle drift.
   */
  reactive?: boolean;
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
  reactive = false,
}: MarqueeProps) {
  const skewRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const skewEl = skewRef.current;
    const track = trackRef.current;
    if (!reactive || !skewEl || !track || prefersReducedMotion()) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0; // px per ms, smoothed
    let direction = 1;
    let raf = 0;

    const tick = (t: number) => {
      const dt = Math.max(1, t - lastT);
      const y = window.scrollY;
      const instant = (y - lastY) / dt;
      lastY = y;
      lastT = t;
      velocity += (instant - velocity) * 0.12;
      if (Math.abs(instant) > 0.05) direction = Math.sign(instant);

      const anim = track.getAnimations?.()[0];
      const boost = Math.min(4, Math.abs(velocity) * 2.2);
      if (anim) anim.playbackRate = direction * (1 + boost);
      const skew = Math.max(-8, Math.min(8, -velocity * 3));
      skewEl.style.transform = `skewX(${skew.toFixed(2)}deg)`;

      // Keep ticking while there's momentum to bleed off.
      if (Math.abs(velocity) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        skewEl.style.transform = "";
        if (anim) anim.playbackRate = direction;
      }
    };

    const onScroll = () => {
      if (!raf) {
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reactive]);

  return (
    <div className={`marquee ${className}`}>
      <div ref={skewRef} className="marquee-skew">
        <div
          ref={trackRef}
          className="marquee-track"
          style={{ "--marquee-speed": `${speed}s` } as CSSProperties}
        >
          <div className="marquee-group">{children}</div>
          <div className="marquee-group" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
