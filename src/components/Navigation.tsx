import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";

export default function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location === path;

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Escape key support.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the first menu item when opening.
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLElement>("a")
        ?.focus({ preventScroll: true });
    }, 180);

    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
      style={{
        borderColor: "var(--border)",
        background: "var(--nav-bg)",
      }}
    >
      <nav
        className="container relative flex items-center justify-between py-5"
        aria-label="Main"
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 font-display text-2xl font-bold tracking-tight"
        >
          Melo<span style={{ color: "var(--accent2)" }}>Bix</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`link-draw text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-100 ${
                  isActive(link.href)
                    ? "font-semibold"
                    : "opacity-80"
                }`}
                style={{
                  color: isActive(link.href)
                    ? "var(--accent2)"
                    : "var(--muted)",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            color: "var(--accent2)",
            background: open
              ? "color-mix(in srgb, var(--accent2) 8%, transparent)"
              : "transparent",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>

          <span
            aria-hidden="true"
            className="relative block h-5 w-6"
          >
            {/* Top line */}
            <span
              className="absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out"
              style={{
                top: open ? "9px" : "1px",
                transform: open
                  ? "rotate(45deg)"
                  : "rotate(0deg)",
              }}
            />

            {/* Middle line */}
            <span
              className="absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-current transition-all duration-200"
              style={{
                opacity: open ? 0 : 1,
                transform: open
                  ? "translateX(8px)"
                  : "translateX(0)",
              }}
            />

            {/* Bottom line */}
            <span
              className="absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out"
              style={{
                top: open ? "9px" : "17px",
                transform: open
                  ? "rotate(-45deg)"
                  : "rotate(0deg)",
              }}
            />
          </span>
        </button>
      </nav>

      {/* 
        Mobile dropdown
        ----------------
        IMPORTANT:
        This is no longer a fullscreen fixed/scrollable overlay.
        It sits directly below the navbar.
      */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        className={`md:hidden absolute left-0 right-0 top-full overflow-hidden border-t transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-auto max-h-[520px] opacity-100 translate-y-0"
            : "pointer-events-none max-h-0 opacity-0 -translate-y-3"
        }`}
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--bg) 94%, transparent)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700 ${
            open ? "opacity-20" : "opacity-0"
          }`}
          style={{
            background: "var(--accent2)",
          }}
        />

        <nav
          aria-label="Mobile"
          className="relative px-5 py-5 sm:px-8 sm:py-7"
        >
          <ul className="mx-auto w-full max-w-md list-none">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center justify-between rounded-2xl px-5 py-4 font-display text-xl font-bold uppercase tracking-wide transition-all duration-300 sm:text-2xl ${
                      open
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-5 opacity-0"
                    }`}
                    style={{
                      color: active
                        ? "var(--accent2)"
                        : "var(--text)",
                      transitionDelay: open
                        ? `${index * 55 + 80}ms`
                        : "0ms",
                    }}
                  >
                    {/* Number */}
                    <span
                      className="mr-4 font-mono text-xs opacity-40"
                      style={{
                        color: active
                          ? "var(--accent2)"
                          : "var(--muted)",
                      }}
                    >
                      0{index + 1}
                    </span>

                    {/* Label */}
                    <span className="flex-1">{link.label}</span>

                    {/* Arrow */}
                    <span
                      className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{
                        color: "var(--accent2)",
                      }}
                    >
                      →
                    </span>

                    {/* Active indicator */}
                    {active && (
                      <span
                        className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                        style={{
                          background: "var(--accent2)",
                          boxShadow:
                            "0 0 12px var(--accent2)",
                        }}
                      />
                    )}

                    {/* Hover background */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "color-mix(in srgb, var(--accent2) 7%, transparent)",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom contact section */}
          <div
            className={`mx-auto mt-3 max-w-md border-t pt-4 transition-all duration-500 ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              borderColor: "var(--border)",
              transitionDelay: open ? "360ms" : "0ms",
            }}
          >
            <a
              href={`mailto:${site.email}`}
              tabIndex={open ? 0 : -1}
              className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-300 hover:opacity-100 sm:text-sm"
              style={{
                color: "var(--muted)",
              }}
            >
              <span className="truncate">
                {site.email}
              </span>

              <span
                className="ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  color: "var(--accent2)",
                }}
              >
                ↗
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}