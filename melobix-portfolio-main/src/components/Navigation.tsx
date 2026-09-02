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

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on Escape and lock scroll while the menu is open. Send focus into
  // the menu on open; when it closes, return focus to the toggle only if the
  // browser focus was still inside the menu (keeps tap-close from stealing
  // focus back to the button).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus({
      preventScroll: true,
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      const focusInsideMenu =
        menuRef.current && menuRef.current.contains(document.activeElement);
      if (focusInsideMenu) toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border)", background: "var(--nav-bg)" }}
    >
      <nav
        className="container flex justify-between items-center py-5"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Melo<span style={{ color: "var(--accent2)" }}>Bix</span>
        </Link>

        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`link-draw text-sm tracking-widest uppercase transition-colors hover:opacity-100 ${
                  isActive(link.href) ? "font-semibold" : "opacity-80"
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

        <button
          type="button"
          className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ color: "var(--accent2)" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className="absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300"
              style={{
                top: open ? "7px" : "0px",
                transform: open ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300"
              style={{
                top: open ? "7px" : "14px",
                transform: open ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu — a scrollable fullscreen overlay. The scroll lives on
          the outer box and the centering on an inner min-h-full one, so on
          short viewports (landscape phones, zoomed text) links can never be
          clipped out of reach — the old flex+justify-center overlay clipped
          the first/last items with no way to scroll. Type size and tracking
          scale down with viewport width so long labels never touch the
          edges. */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 overflow-y-auto overscroll-contain transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "var(--bg)",
          paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4.5rem))",
          paddingBottom: "max(3rem, calc(env(safe-area-inset-bottom) + 2rem))",
        }}
        aria-hidden={!open}
        ref={menuRef}
      >
        <nav
          aria-label="Mobile"
          className="min-h-full w-full flex flex-col items-center justify-center gap-2 px-6 sm:px-10"
        >
          <ul className="list-none w-full max-w-sm flex flex-col">
            {navLinks.map((link, idx) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block w-full rounded-xl py-3 text-center font-display font-bold uppercase leading-tight tracking-wide sm:tracking-widest touch-manipulation transition-all duration-300 ${
                    isActive(link.href) ? "" : "opacity-85"
                  }`}
                  style={{
                    color: isActive(link.href)
                      ? "var(--accent2)"
                      : "var(--text)",
                    fontSize: "clamp(1.375rem, 6vw, 1.875rem)",
                    transform: open ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: open ? `${idx * 50}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            tabIndex={open ? 0 : -1}
            className="mt-6 max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-4 py-2 text-xs text-center uppercase sm:text-sm"
            style={{
              color: "var(--muted)",
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
