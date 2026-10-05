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
    vibe: "Welcome · Let's build",
    kicker: "Back to the start",
    teaser:
      "Where design meets code — the full picture of what I build, in neon.",
    cta: "Back to Home",
  },
  "/projects": {
    label: "Jobs",
    theme: "monochrome",
    vibe: "I dey deliver · No worry",
    kicker: "See the work",
    teaser:
      "Real products in the wild — from Aba markets to a global engagement board.",
    cta: "View Projects",
  },
  "/about": {
    label: "About",
    theme: "earthy",
    vibe: "Engineer · Creative",
    kicker: "Meet the maker",
    teaser:
      "The engineer-turned-creative behind the work, and the framework he thinks with.",
    cta: "Meet Wonders",
  },
  "/services": {
    label: "Services",
    theme: "glass",
    vibe: "Branding · Everything A-Z",
    kicker: "Work with me",
    teaser:
      "Six ways I turn ideas into things that actually exist — with clear pricing.",
    cta: "Explore Services",
  },
  "/contact": {
    label: "Contact",
    theme: "matrix",
    vibe: "Let's Get Started",
    kicker: "Open a channel",
    teaser:
      "Got an idea — or a half-baked one? Let's run it through CTRIQUEST™.",
    cta: "Get in Touch",
  },
};
