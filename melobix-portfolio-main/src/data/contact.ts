import { site } from "./site";

export interface ContactChannel {
  icon: string;
  label: string;
  value: string;
  href: string;
}

/** Terminal line typed out on the contact hero. */
export const terminalCommand =
  "wonders@melobix:~$ ./secure_channel --target=you --status=open";

export const responseTime = {
  icon: "▮",
  label: "Response Time",
  value: "Usually within 24 hours",
} as const;

/** Channels shown on the contact page. Derived from site identity data. */
export const contacts: ContactChannel[] = [
  {
    icon: "✉️",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: "𝕏",
    label: "Twitter / X",
    value: site.handle,
    href: site.social.twitter,
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/melobix",
    href: site.social.linkedin,
  },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/melobix0-git",
    href: site.social.github,
  },
];
