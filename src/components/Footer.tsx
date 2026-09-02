import { Link } from "wouter";
import { site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.social.github },
  { label: "Twitter", href: site.social.twitter },
  { label: "LinkedIn", href: site.social.linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <span>
          © {year}{" "}
          <Link
            href="/"
            style={{ color: "var(--accent2)" }}
            className="hover:underline"
          >
            {site.name}
          </Link>
          . All rights reserved.
        </span>

        <ul className="flex gap-6 list-none">
          {socials.map(s => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase tracking-widest text-xs transition-colors hover:opacity-100 opacity-80"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <span>Designed &amp; built by {site.name}.</span>
      </div>
    </footer>
  );
}
