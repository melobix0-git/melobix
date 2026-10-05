import type { CSSProperties, MouseEvent, ReactElement } from "react";
import { Link, useLocation } from "wouter";
import Magnetic from "@/components/Magnetic";
import MatrixRain from "@/components/MatrixRain";
import ScrambleText from "@/components/ScrambleText";
import SplitText from "@/components/SplitText";
import Tilt from "@/components/Tilt";
import { aboutHero } from "@/data/about";
import { navLinks } from "@/data/navigation";
import { nextPages, type NextPageInfo } from "@/data/nextPage";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { useInView } from "@/hooks/useInView";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { portalTo } from "@/lib/pageTransition";
import type { ThemeName } from "@/lib/themes";

/* ---------------------------------------------------------------------------
   Per-theme artifacts: each destination brings its own visual language.
   ------------------------------------------------------------------------- */

/** Home: drifting neon orbs, film grain and the morphing "MB" blob. */
function NeonArtifacts() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute -top-24 -left-20 w-80 h-80 rounded-full blur-3xl opacity-40 animate-drift transition-opacity duration-700 group-hover:opacity-70"
        style={{ background: "var(--accent4)" }}
      />
      <div
        className="absolute -bottom-28 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-30 animate-drift transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: "var(--accent1)", animationDelay: "-5s" }}
      />
      <div
        className="absolute top-10 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-25 animate-drift"
        style={{ background: "var(--accent2)", animationDelay: "-9s" }}
      />

      <div className="hidden md:block absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 w-56 h-56 lg:w-64 lg:h-64 transition-transform duration-700 ease-out group-hover:scale-110">
        <div
          className="absolute inset-0 animate-morphBlob"
          style={{
            background:
              "linear-gradient(135deg, var(--accent4), var(--accent1))",
          }}
        />
        <div
          className="absolute inset-1.5 animate-morphBlob flex items-center justify-center"
          style={{ background: "var(--card)" }}
        >
          <span
            className="font-display text-6xl lg:text-7xl font-bold animate-breathe"
            style={{ color: "var(--accent2)" }}
          >
            {site.shortName}
          </span>
        </div>
        <span
          className="absolute -top-3 -right-4 px-3 py-1.5 rounded-full text-[11px] font-semibold animate-float"
          style={{ background: "var(--accent3)", color: "var(--bg)" }}
        >
          Design → Code
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
    </div>
  );
}

/** Projects: editorial grid paper and a deck of real project logos that fans out on hover. */
function MonoArtifacts() {
  const logos = projects.filter(p => p.logo).slice(0, 4);
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 90% at 70% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 90% at 70% 50%, black 30%, transparent 80%)",
        }}
      />
      <span
        className="absolute -bottom-8 right-6 font-display text-[9rem] lg:text-[12rem] font-extrabold leading-none text-outline opacity-[0.12] select-none"
        style={{ color: "var(--text)" }}
      >
        {String(projects.length).padStart(2, "0")}
      </span>

      <div className="hidden md:block absolute right-16 lg:right-28 top-1/2 -translate-y-1/2 w-40 h-40">
        {logos.map((p, i) => (
          <div
            key={p.title}
            className="fan-tile absolute inset-0 rounded-2xl p-4 flex items-center justify-center"
            style={
              {
                "--i": i,
                "--n": logos.length,
                background: "var(--bg)",
                border: "2px solid var(--text)",
                boxShadow: "6px 6px 0 var(--text)",
                zIndex: logos.length - i,
              } as CSSProperties
            }
          >
            <img
              src={p.logo}
              alt=""
              loading="lazy"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** About: warm organic shapes, a sun disc and the portrait in an arch. */
function EarthyArtifacts() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute -top-20 right-1/3 w-72 h-72 rounded-full opacity-30 animate-float"
        style={{ background: "var(--accent3)" }}
      />
      <div
        className="absolute -bottom-24 -left-10 w-64 h-64 opacity-25 animate-morphBlob"
        style={{ background: "var(--accent2)" }}
      />
      <div className="hidden md:block absolute right-12 lg:right-24 bottom-0 w-52 lg:w-60 h-[88%]">
        <div
          className="absolute -left-10 top-6 w-32 h-32 rounded-full transition-transform duration-700 ease-out group-hover:-translate-y-3"
          style={{ background: "var(--accent1)", opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 rounded-t-full overflow-hidden transition-transform duration-700 ease-out group-hover:-translate-y-2"
          style={{
            background:
              "linear-gradient(160deg, var(--accent1), var(--accent4))",
            boxShadow:
              "0 30px 60px -25px color-mix(in srgb, var(--accent4) 60%, transparent)",
          }}
        >
          <img
            src={aboutHero.portrait.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
            onError={e => (e.currentTarget.style.display = "none")}
          />
        </div>
      </div>
    </div>
  );
}

/** Services: soft light pools behind floating frosted-glass service chips. */
function GlassArtifacts() {
  const chips = services.slice(0, 6);
  const spots = [
    ["0%", "8%"],
    ["58%", "0%"],
    ["30%", "36%"],
    ["78%", "44%"],
    ["6%", "68%"],
    ["54%", "76%"],
  ];
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute -top-24 right-10 w-96 h-96 rounded-full blur-3xl opacity-70 animate-drift"
        style={{ background: "var(--accent3)" }}
      />
      <div
        className="absolute -bottom-32 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-70 animate-drift"
        style={{ background: "var(--accent4)", animationDelay: "-6s" }}
      />
      <div
        className="absolute top-1/4 -left-24 w-72 h-72 rounded-full blur-3xl opacity-40 animate-drift"
        style={{ background: "var(--accent1)", animationDelay: "-3s" }}
      />
      <div className="hidden md:block absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 w-72 h-64">
        {chips.map((s, i) => (
          <div
            key={s.title}
            className="glass-chip absolute"
            style={
              {
                left: spots[i][0],
                top: spots[i][1],
                "--dx": `${(i % 2 ? 1 : -1) * (10 + i * 3)}px`,
                "--dy": `${(i < 3 ? -1 : 1) * 12}px`,
              } as CSSProperties
            }
          >
            <div
              className="animate-float flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md text-xs font-semibold whitespace-nowrap"
              style={{
                animationDelay: `${-i * 0.7}s`,
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow:
                  "0 10px 30px -12px color-mix(in srgb, var(--accent2) 50%, transparent)",
              }}
            >
              <span className="text-lg">{s.icon}</span>
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Contact: live digital rain, CRT scanlines and a terminal readout. */
function MatrixArtifacts() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70">
        <MatrixRain contained opacity={1} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 30% 50%, color-mix(in srgb, var(--bg) 92%, transparent) 20%, transparent 75%)",
        }}
      />
      <div className="crt-scanlines absolute inset-0" />
      <div
        className="hidden md:block absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 w-72 rounded-lg border font-mono text-xs p-4 space-y-1.5 backdrop-blur-sm"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--card) 85%, transparent)",
          color: "var(--accent2)",
        }}
      >
        <p style={{ color: "var(--muted)" }}>melobix://contact — secure</p>
        <p>&gt; ping melobix</p>
        <p style={{ color: "var(--accent1)" }}>reply: online ✓</p>
        <p>&gt; open_channel --now</p>
        <p>
          &gt; _
          <span className="animate-blink" style={{ color: "var(--accent1)" }}>
            ▮
          </span>
        </p>
      </div>
    </div>
  );
}

const artifacts: Record<ThemeName, () => ReactElement> = {
  "dark-neon": NeonArtifacts,
  monochrome: MonoArtifacts,
  earthy: EarthyArtifacts,
  glass: GlassArtifacts,
  matrix: MatrixArtifacts,
  cyberpunk: NeonArtifacts,
};

/* ---------------------------------------------------------------------------
   Title treatments, also per theme.
   ------------------------------------------------------------------------- */

function Title({ info }: { info: NextPageInfo }) {
  const base =
    "block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] mb-6";
  switch (info.theme) {
    case "matrix":
      return (
        <span
          className={`${base} font-mono font-bold animate-neon-glow`}
          style={{ color: "var(--accent1)" }}
        >
          <ScrambleText
            text={info.label}
            charset="アイウエオカキクサシス01<>/#$%&*+"
            duration={1100}
          />
        </span>
      );
    case "monochrome":
      return (
        <SplitText
          text={info.label}
          by="chars"
          stagger={40}
          className={`${base} font-display font-extrabold uppercase tracking-tight`}
        />
      );
    case "earthy":
      return (
        <span className={`${base} relative w-fit`}>
          <SplitText
            text={info.label}
            effect="blur"
            className="font-display font-bold"
            style={{ color: "var(--accent1)" }}
          />
          <svg
            className="squiggle absolute left-0 -bottom-3 w-full h-4"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2 10 C 40 2, 70 16, 110 8 S 180 2, 220 9 S 280 14, 298 6"
              fill="none"
              stroke="var(--accent3)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
            />
          </svg>
        </span>
      );
    case "glass":
      return (
        <SplitText
          text={info.label}
          effect="blur"
          stagger={90}
          className={`${base} font-display font-bold`}
          style={{ color: "var(--text)" }}
        />
      );
    default:
      return (
        <SplitText
          text={info.label}
          effect="flip"
          by="chars"
          stagger={45}
          className={`${base} font-display font-bold animate-neon-glow`}
          style={{ color: "var(--text)" }}
        />
      );
  }
}

/* ---------------------------------------------------------------------------
   The portal
   ------------------------------------------------------------------------- */

function nextFor(path: string) {
  const normalized = path.replace(/\/+$/, "") || "/";
  const i = navLinks.findIndex(l => l.href === normalized);
  const next = i === -1 ? navLinks[0] : navLinks[(i + 1) % navLinks.length];
  const nextIndex = navLinks.indexOf(next);
  return { href: next.href, index: nextIndex, info: nextPages[next.href] };
}

/**
 * End-of-page "next page" portal. Rendered in the destination's own theme
 * (scoped via data-theme) with that page's signature artifacts, so visitors
 * get a taste of what's next. Scroll-linked entrance (it rises and grows
 * into place), 3D tilt + spotlight + shimmer on hover, a magnetic CTA, and
 * a themed circular wipe transition on click.
 */
export default function NextPage() {
  const [location, navigate] = useLocation();
  const { href, index, info } = nextFor(location);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.25,
  });

  const scrollRef = useScrollProgress<HTMLDivElement>(
    (p, el) => {
      const s = 0.88 + 0.12 * p;
      el.style.transform =
        p >= 0.999
          ? ""
          : `translate3d(0, ${Math.round((1 - p) * 60)}px, 0) scale(${s.toFixed(4)})`;
      el.style.opacity = (0.35 + 0.65 * p).toFixed(3);
    },
    { start: 1, end: 0.9, cssVar: null, reducedValue: 1, measureParent: true }
  );

  if (!info) return null;
  const Artifacts = artifacts[info.theme];
  const total = navLinks.length;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    portalTo(() => navigate(href), {
      theme: info.theme,
      label: info.label,
      x,
      y,
    });
  };

  return (
    <section className="relative z-10 py-16 md:py-24" aria-label="Next page">
      <div className="container">
        <div ref={scrollRef}>
          <div
            ref={viewRef}
            data-theme={info.theme}
            className={`next-portal ${inView ? "is-visible" : ""}`}
            style={{ color: "var(--text)" }}
          >
            <Tilt
              maxTilt={3}
              shimmer
              className="rounded-[2rem] overflow-hidden"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                boxShadow:
                  "0 40px 80px -40px color-mix(in srgb, var(--accent1) 55%, transparent)",
              }}
            >
              <Link
                href={href}
                onClick={onClick}
                className="relative block min-h-[440px] md:min-h-[500px] focus-visible:outline-offset-4"
                aria-label={`Next page: ${info.label} — ${info.teaser}`}
              >
                <Artifacts />

                <div className="relative z-10 flex flex-col justify-between min-h-[440px] md:min-h-[500px] p-8 sm:p-10 md:p-14 md:max-w-[62%]">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold">
                    <span className="flex items-center gap-3">
                      <span
                        className="rule-draw inline-block h-px w-10"
                        style={{ background: "var(--accent1)" }}
                      />
                      <span style={{ color: "var(--accent1)" }}>Next up</span>
                    </span>
                    <span style={{ color: "var(--muted)" }}>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full border tracking-widest"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                        background:
                          "color-mix(in srgb, var(--card) 70%, transparent)",
                      }}
                    >
                      {info.vibe}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="py-8">
                    <p
                      className="text-sm md:text-base uppercase tracking-[0.3em] mb-4"
                      style={{ color: "var(--accent2)" }}
                    >
                      {info.kicker}
                    </p>
                    <Title info={info} />
                    <p
                      className="text-lg md:text-xl max-w-md leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {info.teaser}
                    </p>
                  </div>

                  {/* CTA */}
                  <div>
                    <Magnetic strength={0.25} className="inline-block">
                      <span
                        className="next-cta relative inline-flex items-center gap-4 pl-7 pr-2 py-2 rounded-full font-bold text-base md:text-lg overflow-hidden animate-pulse-glow"
                        style={{
                          background: "var(--accent1)",
                          color: "var(--on-accent)",
                        }}
                      >
                        <span className="next-cta-fill" aria-hidden="true" />
                        <span className="relative">{info.cta}</span>
                        <span
                          className="next-cta-arrow relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl"
                          style={{
                            background: "var(--on-accent)",
                            color: "var(--accent1)",
                          }}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </Magnetic>
                  </div>
                </div>
              </Link>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
