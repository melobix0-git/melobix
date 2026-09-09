/**
 * Shipped & active projects.
 *
 * Logos: drop an image (png/svg) into /public/logos/ and set the path on the
 * project, e.g. `logo: "/logos/trova.png"`. Until a logo is set, the card
 * renders a dashed placeholder with the project's initial.
 *
 * Links: set `href` once a project has a public URL. Until then the card is
 * not a link — it never points at something that doesn't exist.
 */

export interface Project {
  title: string;
  category: string;
  tagline: string;
  description: string;
  status: string;
  stack: string[];
  logo?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    title: "Trova",
    category: "Mobile",
    tagline: "Offline-first personal content organizer.",
    logo: "/logos/trova.png",
    description:
      "Capture, organize, and retrieve your content without a connection. Now being rebuilt as a native Flutter Android app, with a go-to-market strategy aimed at Nigerian universities.",
    status: "Shipped · rebuilding in Flutter",
    stack: ["Flutter", "Android", "Offline-first"],
  },
  {
    title: "Yimba",
    category: "E-commerce",
    tagline: "Free digital storefronts for Aba's traders and artisans.",
    logo: "/logos/yimba.jpeg",
    description:
      "Two surfaces under one roof: Yimbuy for peer-to-peer trade and Yimba Bulk Buy for RFQ-based bulk sourcing. Currently pitching Abia State's governor for institutional support.",
    status: "Shipped · pitching Abia State",
    stack: ["React", "Node.js", "P2P + RFQ"],
  },
  {
    title: "Tickr",
    category: "Web",
    tagline: "A live board where your placements grow with attention.",
    logo: "/logos/tickr.png",
    description:
      "Spots — image or link placements — compete on a shared global board, growing like bubbles driven by owner streaks and visitor traffic. Stripe-powered, so it's global from day one.",
    status: "Live · Stripe-powered",
    stack: ["React", "Stripe", "Real-time"],
  },
  {
    title: "Petro Prep",
    category: "Web",
    tagline: "Duolingo-style prep for petroleum engineering interviews.",
    logo: "/logos/Petro-Prep.png",
    description:
      "A gamified quiz app that turns interview prep into daily streaks — the study companion I wish I'd had coming out of petroleum engineering.",
    status: "Shipped",
    stack: ["Web app", "Gamification", "Quiz engine"],
  },
  {
    title: "Love Bomber",
    category: "Web",
    tagline: "Romantic messages, sent with flair.",
    logo: "/logos/love-bomber.png",
    description:
      "A monetized web app for crafting and sending romantic messages. Small, fun, and proof that small products can still make money.",
    status: "Shipped",
    stack: ["Web app", "Monetized"],
  },
];
