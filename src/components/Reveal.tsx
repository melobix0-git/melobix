import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Entrance styles (see the `.reveal-*` classes in index.css):
 *
 *  up / left / right   – classic slide + fade
 *  scale               – gentle grow-in
 *  blur                – de-focus → focus
 *  rise                – long, slow lift for headline-sized blocks
 *  flip                – 3D card flipping up from its top edge
 *  pop                 – springy scale with overshoot (chips, badges)
 *  zoom                – "frosted focus": oversized + blurred → crisp (glass)
 *  clip-up             – editorial curtain wipe from the bottom
 *  clip-left/right     – horizontal wipe
 *  tilt-left/right     – slide in with a slight rotation (fanned cards)
 *  scan                – stepped CRT scanline wipe + glitch flicker (terminal)
 */
export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "rise"
  | "flip"
  | "pop"
  | "zoom"
  | "clip-up"
  | "clip-left"
  | "clip-right"
  | "tilt-left"
  | "tilt-right"
  | "scan";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Override the transition duration in milliseconds. */
  duration?: number;
  /** Fraction of the element that must be visible to trigger. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_DURATION = 900;

const CLIPPED = new Set<RevealVariant>([
  "clip-up",
  "clip-left",
  "clip-right",
  "scan",
]);

/**
 * Scroll-triggered reveal. The element stays hidden until it enters the
 * viewport, then eases in (CSS does the work). Once the entrance finishes
 * it gains `.is-done`, which drops clip-paths/filters/will-change so the
 * wrapper never clips hover effects or breaks backdrop-filter children.
 * Under prefers-reduced-motion the global kill-switch makes it instant.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration,
  threshold = 0.12,
  className = "",
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(
      () => setDone(true),
      delay + (duration ?? DEFAULT_DURATION) + 80
    );
    return () => window.clearTimeout(t);
  }, [inView, delay, duration]);

  const classes = `reveal reveal-${variant} ${inView ? "is-visible" : ""} ${
    done ? "is-done" : ""
  } ${className}`;
  const motionStyle = {
    transitionDelay: done ? "0ms" : `${delay}ms`,
    animationDelay: `${delay}ms`,
    ...(duration ? { "--reveal-dur": `${duration}ms` } : null),
    ...style,
  } as CSSProperties;

  // Wipe-style variants start fully clipped (zero visible area). Browsers
  // treat a fully clipped element as "not intersecting", so it would never
  // be told to reveal itself. For those, observe an unclipped outer box and
  // put the clip on an inner element instead.
  if (CLIPPED.has(variant)) {
    return (
      <div ref={ref} className={/\bh-full\b/.test(className) ? "h-full" : ""}>
        <div className={classes} style={motionStyle}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={classes} style={motionStyle}>
      {children}
    </div>
  );
}
