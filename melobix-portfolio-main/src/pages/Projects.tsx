import { useMemo, useState } from "react";
import { Link } from "wouter";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import Tilt from "@/components/Tilt";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Logo slot. Real logos land in /public/logos/ and get referenced from
 * src/data/projects.ts (`logo: "/logos/trova.png"`). Until then this
 * renders a dashed placeholder with the project's initial.
 */
function LogoSlot({ project }: { project: Project }) {
  if (project.logo) {
    return (
      <img
        src={project.logo}
        alt={`${project.title} logo`}
        className="w-14 h-14 rounded-lg object-contain p-1"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
        }}
      />
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-lg flex items-center justify-center font-display text-2xl font-bold shrink-0"
      style={{
        border: "1.5px dashed var(--accent3)",
        color: "var(--accent3)",
      }}
      role="img"
      aria-label={`${project.title} logo coming soon`}
    >
      {project.title.charAt(0)}
    </div>
  );
}

export default function Projects() {
  useDocumentTitle("Projects");
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map(p => p.category)))],
    []
  );

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter(p => p.category === filter),
    [filter]
  );

  return (
    <>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-end pt-40 pb-16">
        <div className="container">
          <div className="max-w-3xl animate-fadeUp">
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--muted)" }}
            >
              {String(projects.length).padStart(2, "0")} shipped &amp; active —
              built in public
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-[0.95] tracking-tight">
              <ScrambleText
                text="Shipped & Active"
                as="span"
                delay={150}
                duration={1300}
              />
            </h1>
            <p className="text-xl" style={{ color: "var(--muted)" }}>
              Real products, in the wild — from Aba&apos;s markets to a global
              engagement board. The work is live; the logos are landing.
            </p>
          </div>
        </div>
      </section>

      {/* Name ticker */}
      <section
        className="border-b py-5"
        style={{ borderColor: "var(--border)" }}
      >
        <Marquee speed={32}>
          {projects.map(p => (
            <span
              key={p.title}
              className="font-display text-2xl font-extrabold uppercase tracking-tight opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {p.title}
            </span>
          ))}
          <span
            className="font-display text-2xl font-extrabold uppercase tracking-tight whitespace-nowrap"
            style={{ color: "var(--accent1)" }}
          >
            Built in public
          </span>
          <span
            aria-hidden="true"
            className="select-none"
            style={{ color: "var(--accent3)" }}
          >
            ✦
          </span>
        </Marquee>
      </section>

      {/* Filter */}
      <section>
        <div
          className="container py-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {categories.map(c => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className="px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-colors"
                style={{
                  background: active ? "var(--accent1)" : "transparent",
                  color: active ? "var(--bg)" : "var(--text)",
                  borderColor: active ? "var(--accent1)" : "var(--border)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visible.map((project, idx) => (
              <Reveal
                key={project.title}
                delay={(idx % 2) * 100}
                className="h-full"
              >
                <Tilt
                  maxTilt={5}
                  shimmer
                  className="h-full p-8 border-2 rounded-lg"
                  style={{
                    borderColor: "var(--accent1)",
                    background: "var(--card)",
                  }}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <LogoSlot project={project} />
                        <div>
                          <p
                            className="text-xs tracking-widest uppercase mb-2"
                            style={{ color: "var(--accent2)" }}
                          >
                            {project.category}
                          </p>
                          <h2 className="text-2xl font-extrabold">
                            {project.title}
                          </h2>
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 max-w-[45%]"
                        style={{
                          color: "var(--accent3)",
                          borderColor: "var(--accent3)",
                          background:
                            "color-mix(in srgb, var(--accent3) 10%, transparent)",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p
                      className="font-semibold mb-3"
                      style={{ color: "var(--text)" }}
                    >
                      {project.tagline}
                    </p>

                    <p className="mb-8" style={{ color: "var(--muted)" }}>
                      {project.description}
                    </p>

                    <div
                      className="mt-auto pt-4 flex items-center justify-between gap-4 border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <ul className="flex flex-wrap gap-2 list-none">
                        {project.stack.map(t => (
                          <li
                            key={t}
                            className="text-xs px-2 py-1 border"
                            style={{
                              borderColor: "var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={site.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw text-xs font-bold uppercase tracking-widest shrink-0"
                        style={{ color: "var(--accent1)" }}
                      >
                        Watch it build
                      </a>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center py-20" style={{ color: "var(--muted)" }}>
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container text-center">
          <Reveal variant="blur">
            <h2 className="text-4xl font-extrabold mb-6">
              Have a project in mind?
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--muted)" }}
            >
              Bring it — I&apos;ll run it through CTRIQUEST™ and tell you
              honestly whether it can work.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block px-12 py-4 font-bold rounded-lg transition-transform hover:scale-105"
                style={{ background: "var(--accent1)", color: "var(--bg)" }}
              >
                Start a Project
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
