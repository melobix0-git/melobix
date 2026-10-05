import Reveal from "./Reveal";
import SplitText from "./SplitText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** How the title animates in when scrolled into view. */
  effect?: "mask" | "blur" | "flip";
  /** Words in the title to paint with the page's primary accent. */
  highlight?: string[];
}

/**
 * Section heading with built-in scroll choreography: the eyebrow slides in
 * behind a self-drawing rule, the title rises word-by-word out of a mask,
 * and the description follows with a soft blur-in.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  effect = "mask",
  highlight,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <Reveal variant="left" duration={700}>
          <p
            className={`flex items-center gap-3 text-xs tracking-widest uppercase mb-4 ${
              centered ? "justify-center" : ""
            }`}
            style={{ color: "var(--accent3)" }}
          >
            <span
              className="rule-draw inline-block h-px w-8"
              style={{ background: "currentColor" }}
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitText
        as="h2"
        text={title}
        effect={effect}
        stagger={effect === "flip" ? 45 : 70}
        delay={120}
        highlight={highlight}
        className="font-display text-4xl font-bold"
      />
      {description && (
        <Reveal variant="blur" delay={250}>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
