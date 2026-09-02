import type { ReactNode } from "react";
import { useLocation } from "wouter";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ScrollProgress from "./ScrollProgress";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared page chrome. Every page renders inside this so the nav and footer
 * are only mounted once and don't flash between route changes. The keyed
 * wrapper gives each route a short fade/slide entrance (animate-pageIn).
 */
export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <ScrollProgress />
      <Navigation />
      <main className="flex-1 relative z-10">
        <div key={location} className="animate-pageIn">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
