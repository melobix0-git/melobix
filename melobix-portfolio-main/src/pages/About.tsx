import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import SectionHeading from "@/components/SectionHeading";
import Tilt from "@/components/Tilt";
import {
  aboutHero,
  concepts,
  ctriquest,
  journey,
  shipped,
  skills,
  story,
  values,
  whatIBring,
} from "@/data/about";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Cycle the four theme accents across the CTRIQUEST grid. */
const accentCycle = [
  "var(--accent1)",
  "var(--accent2)",
  "var(--accent3)",
  "var(--accent4)",
];

export default function About() {
  useDocumentTitle("About");

  // If the headshot file is missing (404), fall back to the plain gradient
  // name card instead of showing a broken image.
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
        {/* soft organic shapes */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 animate-float pointer-events-none"
          style={{ background: "var(--accent3)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full opacity-20 animate-float pointer-events-none"
          style={{
            background: "var(--accent2)",
            animationDelay: "-1.5s",
          }}
          aria-hidden="true"
        />

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="max-w-3xl animate-fadeUp">
              <p
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--accent1)" }}
              >
                {aboutHero.eyebrow}
              </p>
              <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <ScrambleText
                  text={aboutHero.title}
                  as="span"
                  delay={150}
                  duration={1100}
                />
              </h1>
              <p
                className="text-xl leading-relaxed mb-8"
                style={{ color: "var(--muted)" }}
              >
                {aboutHero.lead}
              </p>
              <p className="text-lg leading-relaxed mb-6">{aboutHero.second}</p>
              <p
                className="text-sm tracking-widest uppercase"
                style={{ color: "var(--accent2)" }}
              >
                {site.person.location}
              </p>
            </div>

            {/* Portrait card — headshot with the name on a scrim; falls
                back to the pure gradient name card on very wide screens
                when no photo file is present. */}
            <div className="animate-fadeUp delay-2">
              <div
                className="relative mx-auto lg:mx-0 w-56 h-[17.5rem] sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-xl animate-float-slow"
                style={{
                  background:
                    "linear-gradient(160deg, var(--accent1), var(--accent4))",
                  boxShadow:
                    "0 30px 60px -20px color-mix(in srgb, var(--accent4) 35%, transparent)",
                }}
              >
                {!portraitFailed && (
                  <img
                    src={aboutHero.portrait.src}
                    alt={aboutHero.portrait.alt}
                    loading="eager"
                    decoding="async"
                    onError={() => setPortraitFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-5 sm:p-6">
                  <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {site.person.name}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {site.person.legalName}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    {site.studio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow={story.eyebrow} title={story.title} />
          </Reveal>

          <div className="max-w-3xl space-y-6">
            {story.paragraphs.map((p, idx) => (
              <Reveal key={p} delay={idx * 150}>
                <p className="text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTRIQUEST — the framework, as its own visual block */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={ctriquest.eyebrow}
              title={ctriquest.name}
              description={ctriquest.description}
            />
          </Reveal>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px p-px rounded-2xl overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            {ctriquest.letters.map((letter, idx) => {
              const accent = accentCycle[idx % accentCycle.length];
              return (
                <Reveal key={letter.letter} delay={idx * 70} className="h-full">
                  <Tilt
                    maxTilt={5}
                    className="h-full p-6"
                    style={
                      {
                        background: "var(--card)",
                        "--glow": accent,
                      } as CSSProperties
                    }
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span
                        className="text-xs font-bold tracking-widest"
                        style={{ color: accent }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-bold animate-pulse-glow"
                        style={{
                          color: accent,
                          border: `2px solid ${accent}`,
                          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                          animationDelay: `${-idx * 0.4}s`,
                        }}
                        aria-hidden="true"
                      >
                        {letter.letter}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{letter.name}</h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {letter.question}
                    </p>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="blur" delay={200}>
            <p className="mt-10 text-center text-xl font-semibold">
              {ctriquest.outro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Shipped & active */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow={shipped.eyebrow} title={shipped.title} />
          </Reveal>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 list-none">
            {shipped.items.map((item, idx) => (
              <li key={item.name}>
                <Reveal delay={idx * 80} className="flex gap-4">
                  <span
                    className="mt-2 w-2 h-2 rounded-full shrink-0 animate-pulse-glow"
                    style={
                      {
                        background: "var(--accent1)",
                        "--glow": "var(--accent1)",
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <p style={{ color: "var(--muted)" }}>{item.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Reveal>
              <Link
                href="/projects"
                className="link-draw inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent1)" }}
              >
                See the project pages
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Concepts & R&D */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={concepts.eyebrow}
              title={concepts.title}
              description={concepts.description}
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {concepts.items.map((item, idx) => (
              <Reveal key={item.name} delay={(idx % 5) * 60} className="h-full">
                <Tilt
                  maxTilt={5}
                  className="h-full p-6 rounded-[1.5rem]"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--accent1)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {item.detail}
                  </p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What I bring */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={whatIBring.eyebrow}
              title={whatIBring.title}
            />
          </Reveal>

          <div className="max-w-3xl space-y-6 mb-12">
            {whatIBring.pillars.map((pillar, idx) => (
              <Reveal key={pillar} variant="blur" delay={idx * 180}>
                <p
                  className="font-display text-2xl lg:text-3xl font-bold leading-snug"
                  style={{ color: accentCycle[idx % accentCycle.length] }}
                >
                  {pillar}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={250}>
            <p className="max-w-3xl text-lg leading-relaxed">
              {whatIBring.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Timeline" title="How I Got Here" />
          </Reveal>

          <ol className="space-y-12 list-none">
            {journey.map(item => (
              <li key={item.era}>
                <Reveal variant="left" className="flex gap-8 md:gap-16">
                  <div className="flex-shrink-0 w-28 md:w-32">
                    <p
                      className="text-2xl font-bold uppercase tracking-wide"
                      style={{ color: "var(--accent1)" }}
                    >
                      {item.era}
                    </p>
                  </div>
                  <div
                    className="flex-grow pb-8 border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Toolbox" title="Skills & Expertise" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skills.map((group, idx) => (
              <Reveal key={group.category} delay={idx * 100}>
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: "var(--accent1)" }}
                >
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-3 list-none">
                  {group.items.map(skill => (
                    <li
                      key={skill}
                      className="px-4 py-2 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Principles" title="My Values" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Reveal key={value.title} delay={idx * 120} className="h-full">
                <div
                  className="h-full p-8 rounded-[1.5rem]"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    boxShadow:
                      "0 12px 30px -18px color-mix(in srgb, var(--accent4) 40%, transparent)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--accent1)" }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: "var(--muted)" }}>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="container text-center">
          <Reveal variant="blur">
            <h2 className="text-4xl font-bold mb-6">Want to work together?</h2>
          </Reveal>
          <Reveal delay={150}>
            <p
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: "var(--muted)" }}
            >
              I&apos;m always open to interesting problems, good arguments, and
              ideas worth running through CTRIQUEST™.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 rounded-full font-semibold transition-transform hover:scale-105"
                style={{
                  background: "var(--accent1)",
                  color: "var(--on-accent)",
                }}
              >
                Say hello
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
