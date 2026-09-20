"use client";

import { useEffect, useRef } from "react";

/** points in the tail; short enough to read as a stroke, not a comet */
const POINTS = 14;
/** how hard each point chases the one ahead of it */
const EASE = 0.34;
/** the loop parks itself once the pointer has been still this long */
const IDLE_MS = 900;

/**
 * A short trail that follows the pointer.
 *
 * Everything lives on one canvas and in plain refs: no React state is touched
 * on pointer movement, so moving the mouse never re-renders the tree. The
 * animation loop parks itself when the pointer stops and restarts on the next
 * move, so an idle page costs nothing.
 *
 * Pointer-only, and never on a touch screen or under reduced motion.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let running = false;
    let lastMove = 0;
    let teardown: (() => void) | null = null;

    const start = () => {
      if (teardown) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const pointer = { x: -200, y: -200, seen: false };
      const trail = Array.from({ length: POINTS }, () => ({ x: -200, y: -200 }));
      let width = 0;
      let height = 0;
      let accent = "255, 106, 0";

      const readAccent = () => {
        const raw = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim();
        const hex = raw.match(/^#([0-9a-f]{6})$/i)?.[1];
        if (!hex) return;
        accent = [0, 2, 4]
          .map((i) => parseInt(hex.slice(i, i + 2), 16))
          .join(", ");
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const draw = () => {
        ctx.clearRect(0, 0, width, height);

        // each point eases toward the one in front, the first toward the cursor
        let leadX = pointer.x;
        let leadY = pointer.y;
        let moved = 0;
        for (const point of trail) {
          const dx = leadX - point.x;
          const dy = leadY - point.y;
          point.x += dx * EASE;
          point.y += dy * EASE;
          moved += Math.abs(dx) + Math.abs(dy);
          leadX = point.x;
          leadY = point.y;
        }

        if (pointer.seen) {
          for (let i = 0; i < trail.length; i++) {
            const t = 1 - i / trail.length;
            ctx.beginPath();
            ctx.arc(trail[i].x, trail[i].y, 0.6 + t * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accent}, ${(t * 0.32).toFixed(3)})`;
            ctx.fill();
          }
        }

        // settled and untouched: stop burning frames until the pointer moves
        if (moved < 0.5 && performance.now() - lastMove > IDLE_MS) {
          running = false;
          ctx.clearRect(0, 0, width, height);
          return;
        }
        frame = requestAnimationFrame(draw);
      };

      const wake = () => {
        lastMove = performance.now();
        if (running) return;
        running = true;
        frame = requestAnimationFrame(draw);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (!pointer.seen) {
          pointer.seen = true;
          for (const point of trail) {
            point.x = e.clientX;
            point.y = e.clientY;
          }
        }
        wake();
      };

      const onLeave = () => {
        pointer.seen = false;
        wake();
      };

      readAccent();
      resize();

      const theme = new MutationObserver(readAccent);
      theme.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", resize);

      teardown = () => {
        cancelAnimationFrame(frame);
        running = false;
        theme.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", resize);
        ctx.clearRect(0, 0, width, height);
      };
    };

    const stop = () => {
      teardown?.();
      teardown = null;
    };

    /** a plugged-in mouse, an unplugged one, or a motion setting can all change */
    const sync = () => {
      if (fine.matches && !reduce.matches) start();
      else stop();
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden [@media(pointer:fine)]:block"
    />
  );
}
