import { useEffect, useRef } from "react";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]/\\$#*+=;:()_";

interface MatrixRainProps {
  /** CSS opacity of the whole canvas (kept subtle so copy stays readable). */
  opacity?: number;
  className?: string;
}

/**
 * Full-viewport "digital rain" canvas, straight out of the film. Columns of
 * glyphs fall with glowing heads and fading trails; colors are read from
 * the active theme's CSS variables so the effect is always on-theme.
 *
 * Performance: capped at 30fps, DPR capped at 2, paused while the tab is
 * hidden. Under prefers-reduced-motion it paints a single static frame.
 */
export default function MatrixRain({
  opacity = 0.5,
  className = "",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const css = getComputedStyle(document.documentElement);
    const mainColor = css.getPropertyValue("--accent1").trim() || "#00ff41";
    const dimColor = css.getPropertyValue("--accent4").trim() || "#0c8a3e";
    const headColor = `color-mix(in srgb, ${mainColor} 40%, white)`;
    const bgColor = css.getPropertyValue("--bg").trim() || "#020803";

    let raf = 0;
    let visible = !document.hidden;
    let w = 0;
    let h = 0;
    let fontSize = 16;
    let charW = 10;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let frame = 0;
    let lastTime = 0;
    const frameInterval = 1000 / 30;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = Math.max(13, Math.min(18, Math.floor(w / 95)));
      charW = fontSize * 0.62;
      cols = Math.ceil(w / charW) + 1;
      drops = Array.from({ length: cols }, () => Math.random() * -120);
      speeds = Array.from({ length: cols }, () => 0.6 + Math.random() * 1.1);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
    };

    const drawGlyph = (col: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillText(
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        col * charW,
        y
      );
    };

    const step = () => {
      frame += 1;

      // Fade the previous frame back toward the background → trails.
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      ctx.font = `${fontSize}px "Share Tech Mono", ui-monospace, monospace`;
      for (let col = 0; col < cols; col++) {
        const y = drops[col] * fontSize;
        if (y > -fontSize && y < h + fontSize * 4) {
          if (frame % 9 === 0) drawGlyph(col, y, dimColor);
          drawGlyph(col, y, Math.random() > 0.92 ? headColor : mainColor);
        }
        drops[col] += speeds[col] * 0.55;
        if (y > h && Math.random() > 0.976) {
          drops[col] = Math.random() * -40;
          speeds[col] = 0.6 + Math.random() * 1.1;
        }
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (t - lastTime < frameInterval) return;
      lastTime = t;
      step();
    };

    const staticFrame = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Share Tech Mono", ui-monospace, monospace`;
      ctx.globalAlpha = 0.35;
      for (let col = 0; col < cols; col += 2) {
        for (let i = 0; i < 3; i++) {
          drawGlyph(col, Math.floor(Math.random() * h), mainColor);
        }
      }
      ctx.globalAlpha = 1;
    };

    const onVisibility = () => {
      visible = !document.hidden;
    };

    resize();
    if (reduced) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
