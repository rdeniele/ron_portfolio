"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  /** positive drifts down as you scroll past, negative drifts up */
  speed?: number;
  className?: string;
  children: ReactNode;
};

export default function Parallax({
  speed = 0.15,
  className,
  children,
}: ParallaxProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // measure the untransformed wrapper so the offset never feeds back into itself
      const rect = outer.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      inner.style.transform = `translate3d(0, ${center * speed}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
