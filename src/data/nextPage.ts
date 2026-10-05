import type { ThemeName } from "@/lib/themes";

/**
 * Copy for the "next page" portal shown at the end of every page. The
 * order follows the main navigation (src/data/navigation.ts); the last page
 * loops back to Home.
 */
export interface NextPageInfo {
  label: string;
  theme: ThemeName;
  /** Small tag describing the destination's look. */
  vibe: string;
  /** Line above the big title. */
  kicker: string;
  teaser: string;
  cta: string;
}

export const nextPages: Record<string, NextPageInfo> = {
  "/": {
    label: "Home",
    theme: "dark-neon",
    vibe: "Dark neon",
    kicker: "Back to the start",
    teaser:
      "Where design meets code — the full picture of what I build, in neon.",
    cta: "Back to Home",
  },
  "/projects": {
    label: "Projects",
    theme: "monochrome",
    vibe: "Monochrome · Editorial",
    kicker: "See the work",
    teaser:
      "Real products in the wild — from Aba's markets to a global engagement board.",
    cta: "View Projects",
  },
  "/about": {
    label: "About",
    theme: "earthy",
    vibe: "Warm · Earthy",
    kicker: "Meet the maker",
    teaser:
      "The engineer-turned-creative behind the work, and the framework he thinks with.",
    cta: "Meet Wonders",
  },
  "/services": {
    label: "Services",
    theme: "glass",
    vibe: "Glass · Frosted",
    kicker: "Work with me",
    teaser:
      "Six ways I turn ideas into things that actually exist — with clear pricing.",
    cta: "Explore Services",
  },
  "/contact": {
    label: "Contact",
    theme: "matrix",
    vibe: "Matrix · Terminal",
    kicker: "Open a channel",
    teaser:
      "Got an idea — or a half-baked one? Let's run it through CTRIQUEST™.",
    cta: "Get in Touch",
  },
};
