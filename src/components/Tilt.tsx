import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
  /** Cursor-following radial glow in the page's second accent. */
  spotlight?: boolean;
  /** One-shot light sweep across the card on hover. */
  shimmer?: boolean;
}

/**
 * 3D tilt card. The element rotates in perspective toward the pointer and
 * springs back on leave; optionally adds a spotlight that tracks the cursor
 * and a shimmer sweep (needs the `group` class, included by default).
 * Inert under prefers-reduced-motion and on coarse pointers.
 */
export default function Tilt({
  children,
  className = "",
  style,
  maxTilt = 7,
  spotlight = true,
  shimmer = false,
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const enabled = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    el.style.transition = "transform 120ms ease-out";
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    if (spotlight) {
      el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--spot-o", "1");
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (spotlight) el.style.setProperty("--spot-o", "0");
  };

  return (
    <div
      ref={ref}
      className={`group relative ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ willChange: "transform", ...style }}
    >
      {children}
      {(spotlight || shimmer) && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={{
            opacity: "var(--spot-o, 0)",
            transition: "opacity 0.4s ease",
          }}
        >
          {spotlight && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent2) 16%, transparent), transparent 70%)",
              }}
            />
          )}
          {shimmer && (
            <div
              className="card-shimmer absolute inset-y-0 left-0 w-1/3"
              style={{
                background:
                  "linear-gradient(105deg, transparent, color-mix(in srgb, var(--accent3) 20%, transparent), transparent)",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
