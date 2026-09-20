"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;
const SWAP_MS = 260;

type Phase = "typing" | "deleting";

/**
 * Cycles through `words` a character at a time.
 *
 * The visible text is derived from a character count rather than stored as its
 * own string, so the loop can never stop a letter short: it types until the
 * count reaches the word's length, holds the whole word, then deletes. The
 * count is part of the effect's dependencies, which is what keeps the chain of
 * timers going.
 *
 * With reduced motion the words swap on a timer instead of typing out.
 */
export default function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const word = words[index % words.length] ?? "";
  /** the longest word holds the width open, so the line never jumps */
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(
        () => setIndex((i) => (i + 1) % words.length),
        HOLD_MS + 600,
      );
      return () => window.clearTimeout(t);
    }

    let delay: number;
    let next: () => void;

    if (phase === "typing") {
      if (count < word.length) {
        delay = TYPE_MS;
        next = () => setCount((c) => c + 1);
      } else {
        delay = HOLD_MS;
        next = () => setPhase("deleting");
      }
    } else if (count > 0) {
      delay = DELETE_MS;
      next = () => setCount((c) => c - 1);
    } else {
      delay = SWAP_MS;
      next = () => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      };
    }

    const t = window.setTimeout(next, delay);
    return () => window.clearTimeout(t);
  }, [count, phase, word, words.length, reduce]);

  return (
    <span className={`relative inline-grid align-bottom ${className}`}>
      {/* an invisible copy of the longest role reserves the line's width */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {widest}
      </span>
      <span className="col-start-1 row-start-1">
        {reduce ? word : word.slice(0, count)}
        <span className="caret ml-0.5 text-accent-ink" aria-hidden="true">
          |
        </span>
      </span>
    </span>
  );
}
