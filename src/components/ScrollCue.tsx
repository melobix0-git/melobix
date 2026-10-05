import { useEffect, useRef } from "react";
import { prefersReducedMotion, subscribeScroll } from "@/lib/scroll";

interface ScrollCueProps {
  label?: string;
  className?: string;
}

/**
 * "Scroll" hint for hero sections: a small mouse with a dropping wheel dot.
 * Fades away as soon as the visitor starts scrolling.
 */
export default function ScrollCue({
  label = "Scroll",
  className = "",
}: ScrollCueProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return subscribeScroll(() => {
      el.style.opacity = String(Math.max(0, 1 - window.scrollY / 180));
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] ${className}`}
      style={{ color: "var(--muted)" }}
    >
      <span className="scroll-cue-mouse">
        <span className="scroll-cue-wheel" />
      </span>
      {label}
    </div>
  );
}
