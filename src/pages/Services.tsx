import { Link } from "wouter";
import Magnetic from "@/components/Magnetic";
import Parallax from "@/components/Parallax";
import Reveal, { type RevealVariant } from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import ScrollExit from "@/components/ScrollExit";
import SectionHeading from "@/components/SectionHeading";
import StackCards from "@/components/StackCards";
import Tilt from "@/components/Tilt";
import {
  pricingPlans,
  processSteps,
  services,
  type PricingPlan,
} from "@/data/services";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Pricing card content, shared by the plain and the featured
 * (animated conic-border) wrappers.
 */
function PlanContent({ plan }: { plan: PricingPlan }) {
  return (
    <>
      {plan.featured && (
        <span
          className="absolute -top-3 left-8 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "var(--accent1)",
            color: "var(--on-accent)",
          }}
        >
          Most popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="mb-4" style={{ color: "var(--muted)" }}>
        {plan.desc}
      </p>
      <div className="text-3xl font-extrabold mb-6">
        {plan.price}
        {plan.price !== "Custom" && (
          <span
            className="text-sm font-normal ml-1"
            style={{ color: "var(--muted)" }}
          >
            from
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8 list-none">
        {plan.items.map(item => (
          <li key={item} className="flex items-center gap-2">
            <span style={{ color: "var(--accent1)" }} aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Magnetic className="mt-auto w-full" strength={0.15}>
        <Link
          href={`/contact?plan=${encodeURIComponent(plan.name)}`}
          className="block w-full py-3 rounded-lg font-bold text-center transition-transform hover:scale-105"
          style={{
            background: plan.featured ? "var(--accent1)" : "transparent",
            border: `2px solid ${plan.featured ? "var(--accent1)" : "var(--border)"}`,
            color: plan.featured ? "var(--on-accent)" : "var(--text)",
          }}
        >
          {plan.price === "Custom" ? "Talk to me" : "Get Started"}
        </Link>
      </Magnetic>
    </>
  );
}

/** Pricing fans in from the centre: outer cards swing in, the middle rises. */
const pricingEntrance: RevealVariant[] = ["tilt-left", "rise", "tilt-right"];

export default function Services() {
  useDocumentTitle("Services");

  return (
    <>
      {/* Soft gradient backdrop for the glass effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Light pools drift against each other as you scroll, so the
            frosted cards always have something moving behind the glass. */}
        <Parallax
          mode="page"
          offset={0.15}
          x={0.03}
          className="absolute -top-40 -left-32"
        >
          <div
            className="w-[32rem] h-[32rem] rounded-full blur-3xl opacity-60 animate-drift"
            style={{ background: "var(--accent3)" }}
          />
        </Parallax>
        <Parallax
          mode="page"
          offset={-0.22}
          x={-0.04}
          className="absolute top-1/3 -right-40"
        >
          <div
            className="w-[28rem] h-[28rem] rounded-full blur-3xl opacity-60 animate-drift"
            style={{ background: "var(--accent4)", animationDelay: "-6s" }}
          />
        </Parallax>
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center pt-32 pb-20">
          {/* Hero frosts over (blurs) as it scrolls away — glass, misting up */}
          <ScrollExit className="container" lift={-60} scaleTo={0.97} blur={10}>
            <div className="max-w-3xl animate-fadeUp">
              <p
                className="text-xs tracking-widest uppercase mb-6"
                style={{ color: "var(--accent2)" }}
              >
                What I offer
              </p>
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <ScrambleText
                  text="Services"
                  as="span"
                  delay={150}
                  duration={900}
                />
              </h1>
              <p
                className="text-xl leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Six ways I turn ideas into things that actually exist — from a
                single brand asset to a full-stack platform. Every engagement
                starts with a conversation.
              </p>
            </div>
          </ScrollExit>
        </section>

        {/* Services grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                // "Frosted focus": each pane starts oversized and blurred, then
                // settles crisp. Diagonal stagger (row + column) sweeps the grid.
                <Reveal
                  key={service.title}
                  variant="zoom"
                  delay={((idx % 3) + Math.floor(idx / 3)) * 110}
                  className="h-full"
                >
                  <Tilt
                    maxTilt={6}
                    spotlight
                    shimmer
                    className="h-full flex flex-col p-8 rounded-2xl backdrop-blur-xl"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow:
                        "0 8px 32px -16px color-mix(in srgb, var(--accent1) 35%, transparent)",
                    }}
                  >
                    <div
                      className="text-4xl mb-4 animate-breathe"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </div>
                    <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                    <p className="mb-6" style={{ color: "var(--muted)" }}>
                      {service.description}
                    </p>

                    <ul className="space-y-2 list-none mb-8">
                      {service.features.map(feature => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            style={{ color: "var(--accent1)" }}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Magnetic className="mt-auto w-full" strength={0.15}>
                      <Link
                        href={`/contact?plan=${encodeURIComponent(service.title)}`}
                        className="block w-full py-3 rounded-lg font-bold text-center border-2 transition-transform hover:scale-105"
                        style={{
                          borderColor: "var(--accent1)",
                          color: "var(--text)",
                        }}
                      >
                        Get Started →
                      </Link>
                    </Magnetic>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process — sticky stacking deck */}
        <section
          className="py-20 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHeading
                eyebrow="How I work"
                title="My Process"
                description="Four steps, every time. Scroll through them — each one builds on the one before."
              />
            </div>

            <div role="list" aria-label="Process steps">
              <StackCards
                top={128}
                step={22}
                items={processSteps.map((item, idx) => (
                  <div
                    key={item.step}
                    role="listitem"
                    className="relative overflow-hidden rounded-3xl p-8 md:p-10 backdrop-blur-xl"
                    style={{
                      background:
                        "color-mix(in srgb, var(--card) 88%, var(--bg))",
                      border: "1px solid var(--border)",
                      boxShadow:
                        "0 24px 60px -30px color-mix(in srgb, var(--accent2) 45%, transparent)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-6 mb-8">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "var(--accent2)" }}
                      >
                        Step {idx + 1} of {processSteps.length}
                      </span>
                      <span
                        className="font-display text-6xl md:text-7xl font-extrabold leading-none"
                        style={{
                          color: "var(--accent1)",
                          opacity: 0.35,
                        }}
                        aria-hidden="true"
                      >
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                    <div
                      className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-3xl opacity-50 pointer-events-none"
                      style={{
                        background:
                          idx % 2 ? "var(--accent4)" : "var(--accent3)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          className="py-20 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="container">
            <SectionHeading
              eyebrow="Packages"
              title="Pricing"
              effect="blur"
              description="Transparent starting points. Every project is scoped individually, so treat these as a guide rather than a quote."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {pricingPlans.map((plan, idx) => (
                <Reveal
                  key={plan.name}
                  variant={pricingEntrance[idx % pricingEntrance.length]}
                  delay={idx === 1 ? 0 : 180}
                  duration={1100}
                  className="h-full"
                >
                  <div
                    className={`h-full rounded-2xl transition-transform ${
                      plan.featured
                        ? "conic-border animate-border-flow p-[2px] md:scale-105"
                        : "p-px"
                    }`}
                    style={
                      plan.featured
                        ? undefined
                        : { background: "var(--border)" }
                    }
                  >
                    <article
                      className="relative h-full flex flex-col p-8 rounded-[inherit] border-2 backdrop-blur-xl"
                      style={{
                        borderColor: "transparent",
                        background: "var(--card)",
                      }}
                    >
                      <PlanContent plan={plan} />
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
