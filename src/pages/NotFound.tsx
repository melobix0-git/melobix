import { Link } from "wouter";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20">
      <div className="container text-center">
        <Reveal variant="zoom" duration={1200}>
          <p
            className="font-display text-[10rem] leading-none font-extrabold select-none"
            style={{
              background:
                "linear-gradient(135deg, var(--accent1), var(--accent4))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            404
          </p>
        </Reveal>
        <SplitText
          as="h1"
          text="Page not found"
          effect="flip"
          delay={300}
          className="block text-3xl font-bold mb-4"
        />
        <Reveal variant="blur" delay={500}>
          <p
            className="text-lg mb-10 max-w-md mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It may
            have been moved or deleted.
          </p>
        </Reveal>
        <Reveal variant="pop" delay={700}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{
                background: "var(--accent1)",
                color: "var(--on-accent)",
              }}
            >
              Back home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg font-semibold border-2 transition-transform hover:scale-105"
              style={{ borderColor: "var(--accent2)", color: "var(--accent2)" }}
            >
              Report a broken link
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
