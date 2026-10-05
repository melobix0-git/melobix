import type { ThemeName } from "./themes";
import { prefersReducedMotion } from "./scroll";

const GROW_MS = 650;
const HOLD_MS = 320;
const FADE_MS = 420;

/**
 * "Portal" page transition. A circle painted in the destination theme grows
 * from the click point until it covers the screen, `navigate` runs
 * underneath it (theme swap + scroll reset happen while covered), then the
 * overlay fades to reveal the new page.
 *
 * Built imperatively on document.body so it survives the route change that
 * unmounts the component which started it.
 */
export function portalTo(
  navigate: () => void,
  opts: { theme: ThemeName; label: string; x: number; y: number }
) {
  if (prefersReducedMotion() || document.querySelector(".page-portal")) {
    navigate();
    return;
  }

  const el = document.createElement("div");
  el.className = "page-portal";
  el.setAttribute("data-theme", opts.theme);
  el.setAttribute("aria-hidden", "true");
  el.style.setProperty("--x", `${opts.x}px`);
  el.style.setProperty("--y", `${opts.y}px`);

  const title = document.createElement("span");
  title.className = "page-portal-title";
  title.textContent = opts.label;
  el.appendChild(title);
  document.body.appendChild(el);

  // Commit the closed state before opening so the transition runs.
  void el.offsetWidth;
  el.classList.add("is-open");

  window.setTimeout(() => {
    navigate();
    window.setTimeout(() => {
      el.classList.add("is-leaving");
      window.setTimeout(() => el.remove(), FADE_MS + 50);
    }, HOLD_MS);
  }, GROW_MS);
}
