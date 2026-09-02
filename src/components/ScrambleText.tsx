import {
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type Ref,
} from "react";
import { useInView } from "@/hooks/useInView";

const DEFAULT_CHARSET = "!<>-_/[]{}=+*^?#01";

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Delay before decoding starts, in ms. */
  delay?: number;
  /** Total decode duration, in ms. */
  duration?: number;
  /** Glyph pool used while scrambling. */
  charset?: string;
}

/**
 * Decode-on-view text: the string starts as scrambled glyphs and resolves
 * left-to-right into the real copy the first time it enters the viewport.
 * Screen readers always get the final text.
 */
export default function ScrambleText({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  duration = 900,
  charset = DEFAULT_CHARSET,
}: ScrambleTextProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const resolved = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < resolved) {
          out += ch;
        } else {
          out += charset[Math.floor(Math.random() * charset.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay, duration, charset]);

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className} style={style}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
