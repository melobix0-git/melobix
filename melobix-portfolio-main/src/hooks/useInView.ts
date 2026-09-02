import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  rootMargin?: string;
  /** When true (default) the element latches into view and never resets. */
  once?: boolean;
}

/**
 * Tiny IntersectionObserver helper used by the scroll-reveal and
 * decode-on-view components. Falls back to "always visible" when the
 * API is unavailable.
 */
export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -8% 0px",
    once = true,
  } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
