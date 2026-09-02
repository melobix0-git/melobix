import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Variant = "up" | "left" | "right" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  /** Entrance direction/style. See the .reveal-* classes in index.css. */
  variant?: Variant;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps children in a scroll-triggered reveal. The element stays hidden
 * until it enters the viewport, then eases in (CSS does the work, see
 * .reveal in index.css). Under prefers-reduced-motion the global
 * transition kill-switch makes it appear instantly.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
