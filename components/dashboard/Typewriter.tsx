"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;
const SWAP_MS = 260;

/**
 * Cycles through `words` a character at a time. With reduced motion the words
 * swap on a timer instead of typing out. Every state update happens inside the
 * timer callback, never synchronously during the effect.
 */
export default function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  const word = words[wordIndex] ?? "";
  const atFullWord = !deleting && text === word;
  const atEmpty = deleting && text === "";

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(
        () => setWordIndex((i) => (i + 1) % words.length),
        HOLD_MS + 600,
      );
      return () => window.clearTimeout(t);
    }

    const delay = atFullWord
      ? HOLD_MS
      : atEmpty
        ? SWAP_MS
        : deleting
          ? DELETE_MS
          : TYPE_MS;

    const t = window.setTimeout(() => {
      if (atFullWord) {
        setDeleting(true);
        return;
      }
      if (atEmpty) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      setText((prev) =>
        deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(t);
  }, [atFullWord, atEmpty, deleting, word, words, reduce]);

  return (
    <span className={className}>
      {reduce ? word : text}
      <span className="caret ml-0.5 text-accent-ink" aria-hidden="true">
        |
      </span>
    </span>
  );
}
