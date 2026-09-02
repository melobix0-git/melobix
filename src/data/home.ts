/**
 * Content for the home page. Everything on the page is rendered from this
 * file — keep copy here, not in the component.
 */

export const hero = {
  eyebrow: "Wonders — Multidisciplinary Creative-Technologist",
  /** Two display lines. Line two is painted with the page's first accent. */
  headline: ["I'm a multidisciplinary", "creative-technologist"],
  subhead:
    "Designer, developer, and product thinker — building digital experiences for African markets. From brand identity to full-stack platforms, I turn ideas into things that actually exist.",
} as const;

/** The short "what I do" strip below the hero. */
export const whatIDo = [
  "Graphic Design",
  "UI/UX Design",
  "Web Development",
  "Brand Identity",
  "Animation & Motion",
  "Product Thinking",
] as const;

export const stats = [
  { value: "5+", label: "Products shipped" },
  { value: "10+", label: "Concepts prototyped" },
  { value: "6", label: "Disciplines, one mind" },
] as const;
