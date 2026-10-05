import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  /** Split into words (default) or individual characters. */
  by?: "words" | "chars";
  /**
   * mask  – each piece rises out of an invisible baseline mask (editorial)
   * blur  – each piece fades in from a soft blur
   * flip  – each piece rotates up in 3D
   */
  effect?: "mask" | "blur" | "flip";
  /** Delay between pieces in ms. */
  stagger?: number;
  /** Delay before the first piece in ms. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Words (case-insensitive, punctuation ignored) to paint in an accent. */
  highlight?: string[];
  highlightColor?: string;
  /** Trailing content rendered after the split text (not animated). */
  after?: ReactNode;
}

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/**
 * Staggered split-text reveal, triggered when the heading scrolls into
 * view. Screen readers get the plain string via aria-label; the animated
 * pieces are aria-hidden.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  by = "words",
  effect = "mask",
  stagger = 60,
  delay = 0,
  className = "",
  style,
  highlight,
  highlightColor = "var(--accent1)",
  after,
}: SplitTextProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const marks = new Set((highlight ?? []).map(norm));
  const words = text.split(/(\s+)/);
  let i = 0;

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`split split-${effect} ${inView ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {words.map((word, w) => {
        if (/^\s+$/.test(word)) return " ";
        const color = marks.has(norm(word)) ? highlightColor : undefined;
        const pieces = by === "chars" ? Array.from(word) : [word];
        return (
          <span
            key={w}
            aria-hidden="true"
            className="split-word"
            style={color ? { color } : undefined}
          >
            {pieces.map((piece, c) => (
              <span key={c} className="split-mask">
                <span
                  className="split-piece"
                  style={{ transitionDelay: `${delay + i++ * stagger}ms` }}
                >
                  {piece}
                </span>
              </span>
            ))}
          </span>
        );
      })}
      {after}
    </Tag>
  );
}
