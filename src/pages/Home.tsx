import { useEffect, useState } from "react";
import { Link } from "wouter";
import Counter from "@/components/Counter";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import ScrollCue from "@/components/ScrollCue";
import ScrollExit from "@/components/ScrollExit";
import ScrubText from "@/components/ScrubText";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import { hero, stats, whatIDo } from "@/data/home";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only show the custom cursor on devices that actually have a pointer.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const onLeave = () => setCursor(null);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const featured = projects.slice(0, 3);
  const highlights = services.slice(0, 3);

  return (
    <>
      {/* Mesh background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Each blob sits on its own depth plane: they drift apart at
            different rates as you scroll, giving the mesh real parallax. */}
        <Parallax
          mode="page"
          offset={0.12}
          className="absolute"
          style={{ top: "-200px", left: "-150px" }}
        >
          <div
            className="w-96 h-96 rounded-full blur-3xl opacity-20 animate-drift"
            style={{ background: "var(--accent4)" }}
          />
        </Parallax>
        <Parallax
          mode="page"
          offset={-0.18}
          className="absolute"
          style={{ bottom: "-150px", right: "-100px" }}
        >
          <div
            className="w-80 h-80 rounded-full blur-3xl opacity-20 animate-drift"
            style={{ background: "var(--accent1)", animationDelay: "-4s" }}
          />
        </Parallax>
        <Parallax
          mode="page"
          offset={-0.08}
          x={0.04}
          className="absolute"
          style={{ top: "40%", left: "40%" }}
        >
          <div
            className="w-64 h-64 rounded-full blur-3xl opacity-20 animate-drift"
            style={{ background: "var(--accent2)", animationDelay: "-8s" }}
          />
        </Parallax>
      </div>

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-30 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Custom cursor */}
      {cursor && (
        <div
          className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
          aria-hidden="true"
          style={{
            background: "var(--accent2)",
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
            mixBlendMode: "difference",
          }}
        />
      )}

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center pt-32 pb-20 relative">
          <ScrollExit className="container" lift={-120} scaleTo={0.94} blur={4}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeUp">
                <div
                  className="flex items-center gap-2 mb-6 text-xs tracking-widest uppercase"
                  style={{ color: "var(--accent2)" }}
                >
                  <span
                    className="w-8 h-0.5"
                    style={{ background: "var(--accent2)" }}
                  />
                  {hero.eyebrow}
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]">
                  <ScrambleText
                    text={hero.headline[0]}
                    as="span"
                    className="block"
                    delay={100}
                    duration={1000}
                  />
                  <ScrambleText
                    text={hero.headline[1]}
                    as="span"
                    className="block"
                    delay={400}
                    duration={1200}
                    style={{ color: "var(--accent1)" }}
                  />
                </h1>

                <p
                  className="text-lg mb-8 max-w-lg leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {hero.subhead}
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Magnetic>
                    <Link
                      href="/projects"
                      className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
                      style={{
                        background: "var(--accent1)",
                        color: "var(--on-accent)",
                      }}
                    >
                      View My Work
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="px-8 py-3 rounded-lg font-semibold transition-transform border-2 hover:scale-105"
                      style={{
                        borderColor: "var(--accent2)",
                        color: "var(--accent2)",
                      }}
                    >
                      Get In Touch
                    </Link>
                  </Magnetic>
                </div>

                <p
                  className="mt-6 text-sm tracking-wide"
                  style={{ color: "var(--muted)" }}
                >
                  Building in public as{" "}
                  <a
                    href={site.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw font-semibold"
                    style={{ color: "var(--accent3)" }}
                  >
                    {site.handle}
                  </a>
                </p>

                <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
                  {stats.map(s => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-3xl font-bold">
                        <Counter value={s.value} />
                      </dd>
                      <dd
                        className="text-xs uppercase tracking-widest mt-1"
                        style={{ color: "var(--muted)" }}
                      >
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Visual — rushes ahead of the copy and spins a little on scroll */}
              <div className="hidden lg:flex items-center justify-center animate-fadeUp delay-2">
                <Parallax
                  offset={-260}
                  rotate={24}
                  className="relative w-80 h-80"
                >
                  <div
                    className="absolute inset-0 animate-morphBlob"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent4), var(--accent1))",
                    }}
                  />
                  <div
                    className="absolute inset-1.5 animate-morphBlob flex items-center justify-center font-display text-8xl font-bold animate-breathe"
                    style={{
                      background: "var(--card)",
                      color: "var(--accent2)",
                    }}
                  >
                    {site.shortName}
                  </div>

                  <span
                    className="absolute -top-4 -right-6 px-4 py-2 rounded-full text-xs font-semibold animate-float"
                    style={{
                      background: "var(--accent3)",
                      // var(--bg) is the page's ink in this theme.
                      color: "var(--bg)",
                    }}
                  >
                    Available for work
                  </span>
                  <span
                    className="absolute -bottom-3 -left-8 px-4 py-2 rounded-full text-xs font-semibold animate-float"
                    style={{
                      background: "var(--card)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      animationDelay: "-1.5s",
                    }}
                  >
                    Design → Code
                  </span>
                </Parallax>
              </div>
            </div>
          </ScrollExit>
          <ScrollCue className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex" />
        </section>

        {/* What I do — infinite marquee strip */}
        <section
          className="py-6 border-y overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <Marquee speed={26} reactive>
            <span
              className="text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border font-semibold whitespace-nowrap"
              style={{ color: "var(--accent2)", borderColor: "var(--accent2)" }}
            >
              // what i do
            </span>
            {whatIDo.map(item => (
              <Link
                key={item}
                href="/services"
                className="link-draw text-sm font-semibold uppercase tracking-widest opacity-80 hover:opacity-100 whitespace-nowrap"
                style={{ color: "var(--text)" }}
              >
                {item}
              </Link>
            ))}
            <span
              aria-hidden="true"
              className="select-none"
              style={{ color: "var(--accent3)" }}
            >
              ✦
            </span>
          </Marquee>
        </section>

        {/* Services preview */}
        <section
          className="py-20 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container">
            <SectionHeading
              eyebrow="// capabilities"
              title="My Services"
              effect="flip"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px p-px rounded-2xl overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              {highlights.map((service, idx) => (
                <Reveal
                  key={service.title}
                  variant="flip"
                  delay={idx * 140}
                  className="h-full"
                >
                  <Tilt
                    maxTilt={5}
                    className="h-full p-8"
                    style={{ background: "var(--card)" }}
                  >
                    <div
                      className="text-4xl mb-4 animate-breathe"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p style={{ color: "var(--muted)" }}>
                      {service.description}
                    </p>
                  </Tilt>
                </Reveal>
              ))}
            </div>

            <div className="mt-8">
              <Reveal variant="left">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest group"
                  style={{ color: "var(--accent2)" }}
                >
                  All services
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section
          className="py-20 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container">
            <SectionHeading
              eyebrow="// selected work"
              title="Shipped & Active"
              highlight={["Active"]}
              effect="blur"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((project, idx) => (
                // Columns float at slightly different speeds (middle one
                // lags) for a staggered, layered grid while scrolling.
                <Parallax
                  key={project.title}
                  offset={idx === 1 ? 70 : -30}
                  className="h-full"
                >
                  <Reveal variant="rise" delay={idx * 120} className="h-full">
                    <Tilt
                      maxTilt={6}
                      shimmer
                      className="h-full p-6 rounded-2xl border"
                      style={{
                        background: "var(--card)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <p
                        className="text-xs tracking-widest uppercase mb-3"
                        style={{ color: "var(--accent2)" }}
                      >
                        {project.category}
                      </p>
                      <h3 className="text-xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p
                        className="text-sm mb-6"
                        style={{ color: "var(--muted)" }}
                      >
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map(t => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{
                              border: "1px solid var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Tilt>
                  </Reveal>
                </Parallax>
              ))}
            </div>

            <div className="mt-8">
              <Reveal variant="left">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest group"
                  style={{ color: "var(--accent2)" }}
                >
                  View all projects
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-24 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container text-center">
            {/* Words light up neon one by one as the CTA scrolls into place */}
            <ScrubText
              as="h2"
              text="Let's build something remarkable."
              highlight={["remarkable"]}
              className="text-4xl lg:text-6xl font-bold mb-6 max-w-3xl mx-auto"
              dim={0.12}
              start={0.95}
              end={0.55}
            />
            <Reveal delay={150}>
              <p
                className="text-lg mb-8 max-w-xl mx-auto"
                style={{ color: "var(--muted)" }}
              >
                Have an idea — or a half-baked one? I&apos;m currently taking on
                new work.
              </p>
            </Reveal>
            <Reveal variant="pop" delay={300}>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-lg font-semibold transition-transform hover:scale-105 animate-pulse-glow"
                  style={{
                    background: "var(--accent2)",
                    // var(--bg) is the page's ink in this theme.
                    color: "var(--bg)",
                  }}
                >
                  Start a conversation
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
