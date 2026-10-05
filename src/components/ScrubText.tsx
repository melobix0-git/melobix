import type { CSSProperties, ElementType } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrubTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Words (case-insensitive, punctuation ignored) to paint in an accent once lit. */
  highlight?: string[];
  highlightColor?: string;
  /** Opacity of words that haven't been "read" yet. */
  dim?: number;
  /** Viewport fraction where scrubbing starts / ends (see useScrollProgress). */
  start?: number;
  end?: number;
}

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/**
 * Scroll-scrubbed reading highlight: words light up one after another as
 * the paragraph moves up the screen, as if being read aloud. Entirely CSS
 * driven from a single `--p` variable — each word computes its own opacity
 * from its index, so there's no per-word JS work on scroll.
 */
export default function ScrubText({
  text,
  as: Tag = "p",
  className = "",
  style,
  highlight,
  highlightColor = "var(--accent1)",
  dim = 0.16,
  start = 0.88,
  end = 0.45,
}: ScrubTextProps) {
  const ref = useScrollProgress<HTMLElement>(undefined, { start, end });
  const words = text.split(/\s+/).filter(Boolean);
  const marks = new Set((highlight ?? []).map(norm));

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`scrub ${className}`}
      style={{ "--n": words.length, "--dim": dim, ...style } as CSSProperties}
    >
      {words.map((word, i) => {
        const marked = marks.has(norm(word));
        return (
          <span key={i} aria-hidden="true">
            <span
              className={`scrub-word ${marked ? "scrub-mark" : ""}`}
              style={
                {
                  "--i": i,
                  ...(marked ? { "--mark": highlightColor } : null),
                } as CSSProperties
              }
            >
              {word}
            </span>{" "}
          </span>
        );
      })}
    </Tag>
  );
}
