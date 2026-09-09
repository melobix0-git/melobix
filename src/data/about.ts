
export const aboutHero = {
  eyebrow: "Founder — Melobix Studio",
  title: "I'm Wonders.",
  lead: "Engineer & multidisciplinary creative-technologist — Petroluem Engineer, UI/UX designer, brand designer, web developer, and product thinker, building digital experiences for All.",
  second:
    "From brand identity to full-stack platforms, I turn ideas into things that actually exist.",

  portrait: {
    src: "/images/wonders.jpeg",
    alt: "Portrait of Wonders (Obioma Obinna), founder of Melobix Studio, in a navy suit and light-blue shirt against a teal backdrop.",
  },
} as const;

export const story = {
  eyebrow: "The story",
  title: "No single boxes",
  paragraphs: [
    "I don't like being restricted to one box. I move between brand identity, UI/UX, web/mobile development, motion design, and product strategy — because the best digital products live at the intersection of all of them, not inside just one.",
    "I came from a petroleum engineering background and i love to build — shipping real products in public.",
  ],
} as const;

export interface CtriquestLetter {
  letter: string;
  name: string;
  question: string;
}

export const ctriquest = {
  eyebrow: "How I think",
  name: "CTRIQUEST™",
  description:
    "Every idea I take seriously gets run through CTRIQUEST™ — my own framework for evaluating whether something is just a cool idea or could become something real: Clarity, Technology & Risk, Revenue, Innovation, Quality, User Need, Ecosystem, Sustainability.",
  outro: "It's how I move from “this sounds neat” to “this could work.”",
  letters: [
    { letter: "C", name: "Clarity", question: "Is the vision clear?" },
    {
      letter: "T",
      name: "Technology & Risk",
      question: "Can it actually be built, and what risks exist?",
    },
    {
      letter: "R",
      name: "Revenue",
      question: "How can it create sustainable value?",
    },
    {
      letter: "I",
      name: "Innovation",
      question: "What makes it meaningfully different?",
    },
    {
      letter: "Q",
      name: "Quality",
      question: "Can the experience be intuitive and memorable?",
    },
    {
      letter: "U",
      name: "User Need",
      question: "Does anyone genuinely need it?",
    },
    {
      letter: "E",
      name: "Ecosystem",
      question: "Can it grow beyond its initial use case?",
    },
    {
      letter: "S",
      name: "Sustainability",
      question: "Can it survive and adapt?",
    },
  ] satisfies CtriquestLetter[],
} as const;

export const shipped = {
  eyebrow: "In the wild",
  title: "Shipped & Active",
  items: [
    {
      name: "Trova",
      detail:
        "An offline-first personal content organizer, now being rebuilt as a native Flutter Android app with a Nigerian university go-to-market strategy.",
    },
    {
      name: "Yimba",
      detail:
        "A free digital storefront platform for Aba's traders and artisans, split into P2P trade and RFQ-based bulk sourcing. Currently pitching Abia State's governor for institutional support.",
    },
    {
      name: "Smaller shipped builds",
      detail:
        "A monetized romantic-message web app, a Duolingo-style petroleum-engineering interview prep quiz, and event tooling for Abia State's Tech Empowerment Program.",
    },
  ],
} as const;

export const concepts = {
  eyebrow: "Not everything ships",
  title: "Concepts & R&D",
  description:
    "Not everything needs to ship to be worth building out. I prototype product concepts to sharpen how I think about ecosystems, business models, and emerging tech.",
  items: [
    { name: "BotForge", detail: "AI-powered Telegram community intelligence." },
    { name: "Veil", detail: "A privacy-first, zero-knowledge digital vault." },
    {
      name: "Genbix",
      detail: "An AI brand and growth engine for African businesses.",
    },
    { name: "Cadentia", detail: "Rhythm-first, offline-first productivity." },
    {
      name: "Regix",
      detail:
        "Decentralized identity and proof-of-existence — combining AI, blockchain, and zero-knowledge proofs.",
    },
    { name: "Véra", detail: "A decentralized truth network." },
    { name: "Hexify", detail: "Social NFTs." },
    { name: "Fractland", detail: "Bitcoin-based digital land." },
    { name: "Lixt", detail: "An NFT marketplace." },
    { name: "Blinkers", detail: "Digital eye-health." },
  ],
} as const;

export const whatIBring = {
  eyebrow: "The pitch",
  title: "What I Bring",
  pillars: [
    "Design that understands technology.",
    "Technology that understands people.",
    "Branding that understands business.",
  ],
  closing:
    "I built the Melobix identity from scratch — logo, socials, motion — and I'd rather ship something real and iterate in public than wait for perfect.",
} as const;

export const skills = [
  {
    category: "Design",
    items: [
      "UI/UX Design",
      "Brand Identity",
      "Graphic Design",
      "Motion & Animation",
      "Figma",
    ],
  },
  {
    category: "Development",
    items: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS/JS",
      "Node.js",
      "Flutter",
    ],
  },
  {
    category: "Product",
    items: [
      "CTRIQUEST™ Evaluation",
      "Product Strategy",
      "Go-to-Market",
      "Prototyping",
      "MVP Scoping",
    ],
  },
  {
    category: "Foundations",
    items: [
      "Petroleum Engineering",
      "Git",
      "Stripe",
      "Paystack",
      "WhatsApp Tooling",
    ],
  },
];

export const journey = [
  {
    era: "Petroleum",
    title: "Engineering the mindset",
    desc: "A petroleum engineering background first — systems thinking, high-pressure environments, and a habit of questioning every assumption.",
  },
  {
    era: "The Tech",
    title: "Chose to build",
    desc: "Applying tech to oil fields and other stuffs, then started shipping real products in public.",
  },
  {
    era: "The Studio",
    title: "Founded Melobix Studio",
    desc: "Went independent — brand identity, design, code, and product strategy under one roof. Built the Melobix identity from scratch.",
  },
  {
    era: "Now",
    title: "Current digital timeline",
    desc: "Shipping Trova, Yimba, and Tickr — and running every serious idea through CTRIQUEST™ before it earns a line of code.",
  },
];

export const values = [
  {
    title: "Ship over perfect",
    desc: "I'd rather ship something real and iterate in public than wait for perfect. Momentum beats polish.",
  },
  {
    title: "No single boxes",
    desc: "The best products live at the intersection of design, code, and business — so I work across all three, not inside one.",
  },
  {
    title: "Build in public",
    desc: "I share the process, the misses, and the milestones. Accountability is a feature.",
  },
];
