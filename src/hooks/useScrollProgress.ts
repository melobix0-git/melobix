import { useEffect, useRef, type RefObject } from "react";
import {
  elementProgress,
  prefersReducedMotion,
  subscribeScroll,
} from "@/lib/scroll";

interface UseScrollProgressOptions {
  /** Viewport fraction where progress starts (element top). Default 1 (bottom edge). */
  start?: number;
  /** Viewport fraction where progress ends (element bottom). Default 0 (top edge). */
  end?: number;
  /** Write progress to this CSS custom property on the element. Default "--p". Pass null to skip. */
  cssVar?: string | null;
  /** Value reported under prefers-reduced-motion (effects freeze here). Default 1. */
  reducedValue?: number;
  /** Measure this element instead of the one the ref points to. */
  targetRef?: RefObject<HTMLElement | null>;
  /** Measure the element's parent (e.g. the hero <section>) instead of itself. */
  measureParent?: boolean;
}

/**
 * Scroll-linked progress for an element, driven by the shared scroll engine.
 * Writes the value straight to a CSS variable (no React re-render) and
 * optionally calls `onProgress` for effects that need JS.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress?: (p: number, el: T) => void,
  options: UseScrollProgressOptions = {}
) {
  const {
    start = 1,
    end = 0,
    cssVar = "--p",
    reducedValue = 1,
    targetRef,
    measureParent = false,
  } = options;
  const ref = useRef<T | null>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      if (cssVar) el.style.setProperty(cssVar, String(reducedValue));
      cb.current?.(reducedValue, el);
      return;
    }

    let last = -1;
    return subscribeScroll(() => {
      const target =
        targetRef?.current ?? (measureParent ? el.parentElement : null) ?? el;
      const p = elementProgress(
        target.getBoundingClientRect(),
        window.innerHeight,
        start,
        end
      );
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      if (cssVar) el.style.setProperty(cssVar, p.toFixed(4));
      cb.current?.(p, el);
    });
  }, [start, end, cssVar, reducedValue, targetRef, measureParent]);

  return ref;
}
