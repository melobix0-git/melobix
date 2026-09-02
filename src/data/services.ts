/**
 * Services are derived from the home page's "what I do" strip. Each card
 * links to /contact?plan=<service name> using the same pattern as the
 * pricing cards below.
 */

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: "🎨",
    title: "Graphic Design",
    description:
      "Posters, social kits, campaign visuals, and print — graphics that carry the message and look good doing it.",
    features: [
      "Social media kits",
      "Posters & print",
      "Campaign visuals",
      "Editorial & presentations",
    ],
  },
  {
    icon: "🧩",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces from first sketch to pixel-tight handoff — usable, accessible, and hard to ignore.",
    features: [
      "User research",
      "Wireframes & prototypes",
      "Design systems",
      "Usability testing",
    ],
  },
  {
    icon: "💻",
    title: "Web Development",
    description:
      "Fast, accessible sites and apps in HTML, CSS, JavaScript, and React — built to perform, not just to pass review.",
    features: [
      "React & TypeScript",
      "HTML/CSS/JS",
      "Responsive & accessible",
      "Performance-first builds",
    ],
  },
  {
    icon: "🏷️",
    title: "Brand Identity",
    description:
      "Logos, voice, and full identity systems built from strategy up — the same way I built Melobix from scratch.",
    features: [
      "Logo & identity systems",
      "Brand guidelines",
      "Visual language",
      "Launch-ready asset packs",
    ],
  },
  {
    icon: "🎬",
    title: "Animation & Motion",
    description:
      "Micro-interactions, brand motion, and explainers that make products feel alive and give brands a pulse.",
    features: [
      "UI micro-interactions",
      "Brand motion identity",
      "Product explainers",
      "Social-ready loops",
    ],
  },
  {
    icon: "🧭",
    title: "Product Thinking / Strategy",
    description:
      "Every idea run through CTRIQUEST™ before a line of code — positioning, MVP scope, and a go-to-market that survives contact with users.",
    features: [
      "CTRIQUEST™ evaluation",
      "Positioning & strategy",
      "MVP scoping",
      "Go-to-market planning",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understand the goals, the audience, and the problem actually worth solving.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Run the idea through CTRIQUEST™, plan the approach, and define what winning looks like.",
  },
  {
    step: "03",
    title: "Execution",
    desc: "Design and build in visible increments, with feedback loops at every step.",
  },
  {
    step: "04",
    title: "Launch",
    desc: "Ship it, measure it, and iterate — then grow the ecosystem around it.",
  },
];

export interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  items: string[];
  featured?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$2,500",
    desc: "Perfect for small projects",
    items: [
      "Up to 5 pages",
      "Basic design",
      "Mobile responsive",
      "2 revisions",
    ],
  },
  {
    name: "Professional",
    price: "$7,500",
    desc: "For growing businesses",
    items: [
      "Up to 15 pages",
      "Custom design",
      "Advanced features",
      "Unlimited revisions",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Large-scale solutions",
    items: [
      "Unlimited pages",
      "Full customization",
      "API integration",
      "Dedicated support",
    ],
  },
];
