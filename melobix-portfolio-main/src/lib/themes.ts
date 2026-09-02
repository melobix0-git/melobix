export type ThemeName =
  "dark-neon" | "monochrome" | "earthy" | "glass" | "cyberpunk" | "matrix";

/**
 * Each route gets its own visual theme. The theme name is applied as
 * `data-theme` on <html>, and `src/index.css` defines the CSS variables
 * for each one.
 */
const routeThemes: Record<string, ThemeName> = {
  "/": "dark-neon",
  "/projects": "monochrome",
  "/about": "earthy",
  "/services": "glass",
  "/contact": "matrix",
};

export function themeForPath(path: string): ThemeName {
  const normalized = path.replace(/\/+$/, "") || "/";
  return routeThemes[normalized] ?? "dark-neon";
}

export function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute("data-theme", theme);
}
