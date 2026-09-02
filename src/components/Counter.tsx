import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  /** A value like "5+" or "40" — the leading number counts up. */
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Counts the leading digits of `value` up from zero the first time the
 * element scrolls into view (ease-out). Non-numeric values render as-is.
 */
export default function Counter({
  value,
  className,
  duration = 1400,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const match = /^(\d+)(.*)$/.exec(value);
    if (!match) {
      setDisplay(value);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2] ?? "";
    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
