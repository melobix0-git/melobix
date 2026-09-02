import { useEffect, useState, type CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

interface TypewriterProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Milliseconds per character. */
  speed?: number;
  /** Pause before typing starts, in ms. */
  delay?: number;
  /** Caret glyph. */
  caret?: string;
}

/**
 * Terminal typewriter: types the string out once when it enters the
 * viewport, then keeps a blinking caret. Screen readers get the full text.
 */
export default function Typewriter({
  text,
  className,
  style,
  speed = 34,
  delay = 350,
  caret = "▮",
}: TypewriterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let interval = 0;
    let i = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [inView, text, speed, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className="animate-blink ml-0.5"
          style={{ color: "var(--accent1)" }}
        >
          {caret}
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
